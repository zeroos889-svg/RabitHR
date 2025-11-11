import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { can } from '@/lib/rbac'

const CreateCapitalEventSchema = z.object({
  type: z.enum(['FOUNDER_CONTRIBUTION', 'INVESTMENT_ROUND', 'OTHER']),
  investorName: z.string().nullable().optional(),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().default('SAR'),
  date: z.string().datetime(),
  notes: z.string().nullable().optional(),
})

// Mock data for demo mode
const mockCapitals: any[] = [
  {
    id: '1',
    type: 'FOUNDER_CONTRIBUTION',
    investorName: 'Founders',
    amount: '50000',
    currency: 'SAR',
    date: new Date('2024-01-01'),
    notes: 'Initial founder contribution',
  },
]

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
    const validated = CreateCapitalEventSchema.parse(body)

    try {
      const capital = await prisma.capitalEvent.create({
        data: {
          type: validated.type,
          investorName: validated.investorName,
          amount: validated.amount.toString(),
          currency: validated.currency,
          date: new Date(validated.date),
          notes: validated.notes,
        },
      })

      // Audit log
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: 'CREATE_CAPITAL_EVENT',
          resource: 'CapitalEvent',
          resourceId: capital.id,
          details: `Created capital event: ${validated.type} for ${validated.amount} ${validated.currency}`,
        },
      })

      return Response.json(capital, { status: 201 })
    } catch (dbError: any) {
      if (dbError.message?.includes('ECONNREFUSED') || dbError.message?.includes('database')) {
        // Demo mode: add to mock data
        const newCapital = {
          id: Math.random().toString(36).substring(7),
          type: validated.type,
          investorName: validated.investorName,
          amount: validated.amount.toString(),
          currency: validated.currency,
          date: new Date(validated.date),
          notes: validated.notes,
        }
        mockCapitals.push(newCapital)
        console.log('[CAPITAL] Database unavailable, using demo mode')
        return Response.json(newCapital, { status: 201 })
      }
      throw dbError
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Validation error', details: error.errors }, { status: 400 })
    }

    console.error('POST /api/capital error:', error)
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
      const capitals = await prisma.capitalEvent.findMany({
        orderBy: { date: 'desc' },
      })
      return Response.json(capitals)
    } catch (dbError: any) {
      if (dbError.message?.includes('ECONNREFUSED') || dbError.message?.includes('database')) {
        // Demo mode: return mock data
        console.log('[CAPITAL] Database unavailable, using demo mode')
        return Response.json(mockCapitals)
      }
      throw dbError
    }
  } catch (error) {
    console.error('GET /api/capital error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
