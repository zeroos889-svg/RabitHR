import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { can } from '@/lib/rbac'

const CreateExpenseSchema = z.object({
  category: z.enum(['DEVELOPMENT', 'MARKETING', 'LEGAL', 'OPERATIONS', 'INFRASTRUCTURE', 'SALARIES', 'CONSULTING', 'OTHER']),
  amount: z.number().positive('Amount must be positive'),
  date: z.string().datetime(),
  paidByName: z.string(),
  paymentMethod: z.enum(['BANK_TRANSFER', 'CARD', 'CASH', 'OTHER']).default('BANK_TRANSFER'),
  notes: z.string().optional(),
  currency: z.string().default('SAR'),
})

// Mock data for demo mode
const mockExpenses: any[] = []

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = session.user as any
    if (!can({ id: user.id, role: user.role }, 'finance:write')) {
      return Response.json({ error: 'Forbidden: insufficient permissions' }, { status: 403 })
    }

    const body = await req.json()
    const validated = CreateExpenseSchema.parse(body)

    try {
      const expense = await prisma.expense.create({
        data: {
          category: validated.category,
          amount: validated.amount.toString(),
          date: new Date(validated.date),
          paidByName: validated.paidByName,
          paymentMethod: validated.paymentMethod,
          notes: validated.notes,
          currency: validated.currency,
        },
      })

      // Audit log
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: 'CREATE_EXPENSE',
          resource: 'Expense',
          resourceId: expense.id,
          details: `Created expense: ${validated.category} for ${validated.amount} ${validated.currency}`,
        },
      })

      return Response.json(expense, { status: 201 })
    } catch (dbError: any) {
      if (dbError.message?.includes('ECONNREFUSED') || dbError.message?.includes('database')) {
        const newExpense = {
          id: Math.random().toString(36).substring(7),
          category: validated.category,
          amount: validated.amount.toString(),
          date: new Date(validated.date),
          paidByName: validated.paidByName,
          paymentMethod: validated.paymentMethod,
          notes: validated.notes,
          currency: validated.currency,
        }
        mockExpenses.push(newExpense)
        console.log('[EXPENSE] Database unavailable, using demo mode')
        return Response.json(newExpense, { status: 201 })
      }
      throw dbError
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Validation error', details: error.errors }, { status: 400 })
    }

    console.error('POST /api/expense error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = session.user as any
    if (!can({ id: user.id, role: user.role }, 'finance:read')) {
      return Response.json({ error: 'Forbidden: insufficient permissions' }, { status: 403 })
    }

    try {
      const expenses = await prisma.expense.findMany({
        orderBy: { date: 'desc' },
      })
      return Response.json(expenses)
    } catch (dbError: any) {
      if (dbError.message?.includes('ECONNREFUSED') || dbError.message?.includes('database')) {
        console.log('[EXPENSE] Database unavailable, using demo mode')
        return Response.json(mockExpenses)
      }
      throw dbError
    }
  } catch (error) {
    console.error('GET /api/expense error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
