import { config } from './config'
import type { BurnRunway } from './finance'

type InsightResponse = {
  enabled: boolean
  source: 'ai' | 'heuristic'
  insights: string[]
  actions: string[]
  message?: string
  rawText?: string
  error?: string
}

export async function generateInsights(metrics: BurnRunway): Promise<InsightResponse> {
  const heuristic = buildHeuristicInsights(metrics)

  if (!config.featureEnableAI || !config.openAiKey) {
    return {
      ...heuristic,
      enabled: false,
      source: 'heuristic',
      message: 'AI insights are disabled or not configured. Showing rule-based guidance instead.',
    }
  }

  const prompt = [
    'You are an operator coach. Use the provided metrics to craft short insights.',
    `Total capital: ${metrics.totalCapital}`,
    `Total expenses: ${metrics.totalExpenses}`,
    `Remaining: ${metrics.remaining}`,
    `Monthly burn: ${metrics.monthlyBurn}`,
    `Runway months: ${metrics.runwayMonths}`,
    '',
    'Return three numbered insights followed by two action items.',
  ].join('\n')

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 4000)

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.openAiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 320,
        temperature: 0.2,
      }),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!res.ok) {
      return {
        ...heuristic,
        enabled: true,
        source: 'ai',
        error: await res.text(),
        message: 'AI service returned an error. Showing heuristics instead.',
      }
    }

    const data = await res.json()
    const rawText = data?.choices?.[0]?.message?.content ?? ''
    const parsed = parseAiText(rawText)

    return {
      enabled: true,
      source: 'ai',
      insights: parsed.insights.length ? parsed.insights : heuristic.insights,
      actions: parsed.actions.length ? parsed.actions : heuristic.actions,
      rawText,
    }
  } catch (error) {
    clearTimeout(timeout)
    return {
      ...heuristic,
      enabled: true,
      source: 'ai',
      error: (error as Error).message,
      message: 'AI request timed out; heuristics shown.',
    }
  }
}

function buildHeuristicInsights(metrics: BurnRunway): InsightResponse {
  const insights: string[] = []
  const actions: string[] = []

  if (metrics.remaining <= 0) {
    insights.push('Expenses are at parity with capital, so the remaining buffer is depleted.')
    actions.push('Pause discretionary spend until the next round closes.')
  } else {
    insights.push(`You have SAR ${formatNumber(metrics.remaining)} remaining in dry powder.`)
  }

  if (metrics.monthlyBurn > 0) {
    insights.push(
      `Average monthly burn is SAR ${formatNumber(metrics.monthlyBurn)} over the last ${metrics.lookbackMonths} months.`,
    )
  } else {
    insights.push('Burn rate data is unavailable; review data sync jobs.')
  }

  if (metrics.runwayMonths) {
    const bucket = metrics.runwayMonths >= 12 ? 'comfortable' : metrics.runwayMonths >= 6 ? 'moderate' : 'tight'
    insights.push(`Runway is ${bucket} at ~${metrics.runwayMonths} months.`)
  } else {
    insights.push('Runway cannot be calculated yet because burn data is incomplete.')
  }

  if (metrics.status === 'critical') {
    actions.push('Schedule a finance review this week to locate contraction opportunities.')
    actions.push('Trigger investor updates with transparent burn and runway charts.')
  } else {
    actions.push('Keep operating cadence stable; monitor burn each Friday.')
    actions.push('Validate hiring plan against the latest runway scenario.')
  }

  return {
    enabled: false,
    source: 'heuristic',
    insights: uniqueStrings(insights),
    actions: uniqueStrings(actions),
  }
}

function parseAiText(rawText: string) {
  const lines = rawText
    .split('\n')
    .map((line) => line.trim().replace(/^[\-\*\d\.\)]\s*/u, ''))
    .filter(Boolean)

  const insights = lines.slice(0, 3)
  const actions = lines.slice(3)
  return { insights, actions }
}

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values)).filter(Boolean)
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(Math.round(value))
}
