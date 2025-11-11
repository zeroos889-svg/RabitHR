import { prisma } from './db'
import { Decimal } from '@prisma/client/runtime/library'

type MonthlyBurnPoint = {
  label: string
  total: number
}

export type BurnRunway = {
  totalCapital: number
  totalExpenses: number
  remaining: number
  monthlyBurn: number
  runwayMonths: number | null
  lookbackMonths: number
  monthlyBurnHistory: MonthlyBurnPoint[]
  status: 'healthy' | 'warning' | 'critical'
  source: 'database' | 'fallback'
  note?: string
}

export async function calculateFinancials(lookbackMonths = 3): Promise<BurnRunway> {
  try {
    const since = new Date()
    since.setMonth(since.getMonth() - lookbackMonths)

    const [capitalAgg, expenseAgg, expenseSamples] = await Promise.all([
      prisma.capitalEvent.aggregate({ _sum: { amount: true } }),
      prisma.expense.aggregate({ _sum: { amount: true } }),
      prisma.expense.findMany({
        where: { date: { gte: since } },
        select: { amount: true, date: true },
        orderBy: { date: 'asc' },
      }),
    ])

    const totalCapital = decimalToNumber(capitalAgg._sum.amount)
    const totalExpenses = decimalToNumber(expenseAgg._sum.amount)
    const remaining = totalCapital - totalExpenses

    const monthlyBurnHistory = buildMonthlyBurnHistory(expenseSamples, lookbackMonths)
    const monthlyTotals = monthlyBurnHistory.map((point) => point.total)
    const monthlyBurn = monthlyTotals.length ? average(monthlyTotals) : 0

    const runwayRaw = monthlyBurn > 0 ? remaining / monthlyBurn : null
    const runwayMonths = runwayRaw === null ? null : Number(runwayRaw.toFixed(1))

    return {
      totalCapital,
      totalExpenses,
      remaining,
      monthlyBurn,
      runwayMonths,
      lookbackMonths,
      monthlyBurnHistory,
      status: classifyRunway(runwayMonths),
      source: 'database',
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(
      'calculateFinancials: database not available; returning snapshot defaults.',
      (err as any)?.message ?? err,
    )
    return buildFallbackSnapshot(lookbackMonths)
  }
}

function decimalToNumber(value?: Decimal | null) {
  return Number((value ?? new Decimal(0)).toString())
}

function average(values: number[]) {
  if (!values.length) return 0
  const sum = values.reduce((acc, value) => acc + value, 0)
  return Number((sum / values.length).toFixed(2))
}

function buildMonthlyBurnHistory(
  expenses: Array<{ amount: Decimal; date: Date }>,
  lookbackMonths: number,
): MonthlyBurnPoint[] {
  const template = seedMonthBuckets(lookbackMonths)

  for (const expense of expenses) {
    const key = monthKey(expense.date)
    if (!template.has(key)) {
      template.set(key, {
        label: formatMonthLabel(expense.date),
        total: 0,
      })
    }

    const current = template.get(key)
    if (current) {
      current.total += decimalToNumber(expense.amount)
    }
  }

  return Array.from(template.entries())
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .map(([, value]) => ({
      label: value.label,
      total: Number(value.total.toFixed(0)),
    }))
}

function seedMonthBuckets(lookbackMonths: number) {
  const template = new Map<string, { label: string; total: number }>()
  const cursor = new Date()
  cursor.setDate(1)

  for (let i = lookbackMonths - 1; i >= 0; i--) {
    const reference = new Date(cursor.getFullYear(), cursor.getMonth() - i, 1)
    template.set(monthKey(reference), {
      label: formatMonthLabel(reference),
      total: 0,
    })
  }

  return template
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}`
}

function formatMonthLabel(date: Date) {
  return date.toLocaleString('en-US', { month: 'short' }) + ' ' + String(date.getFullYear()).slice(-2)
}

function classifyRunway(runwayMonths: number | null): BurnRunway['status'] {
  if (runwayMonths === null) return 'warning'
  if (runwayMonths >= 12) return 'healthy'
  if (runwayMonths >= 6) return 'warning'
  return 'critical'
}

function buildFallbackSnapshot(lookbackMonths: number): BurnRunway {
  const monthlyBurnHistory = buildPlaceholderHistory(lookbackMonths)
  const monthlyBurn = monthlyBurnHistory.length ? average(monthlyBurnHistory.map((p) => p.total)) : 0

  return {
    totalCapital: 0,
    totalExpenses: 0,
    remaining: 0,
    monthlyBurn,
    runwayMonths: null,
    lookbackMonths,
    monthlyBurnHistory,
    status: 'warning',
    source: 'fallback',
    note: 'Live financial data is temporarily unavailable. Displaying safe placeholders for the UI.',
  }
}

function buildPlaceholderHistory(lookbackMonths: number): MonthlyBurnPoint[] {
  const template = seedMonthBuckets(lookbackMonths)
  const base = 18000

  let index = 0
  for (const entry of template.values()) {
    const variance = (lookbackMonths - index) * 600
    entry.total = base - variance
    if (entry.total < 9000) entry.total = 9000 + index * 250
    index++
  }

  return Array.from(template.entries())
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .map(([, value]) => value)
}
