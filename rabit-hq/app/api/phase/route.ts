import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { can } from '@/lib/rbac'

const CreatePhaseSchema = z.object({
  name: z.string().min(1, 'Phase name required'),
  description: z.string().optional(),
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']).default('NOT_STARTED'),
  plannedStartDate: z.string().datetime().optional(),
  plannedEndDate: z.string().datetime().optional(),
  order: z.number().int().default(0),
})

// Mock data for demo mode
const mockPhases: any[] = []

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = session.user as any
    if (!can({ id: user.id, role: user.role }, 'phases:write')) {
      return Response.json({ error: 'Forbidden: insufficient permissions' }, { status: 403 })
    }

    const body = await req.json()
    const validated = CreatePhaseSchema.parse(body)

    try {
      const phase = await prisma.projectPhase.create({
        data: {
          name: validated.name,
          description: validated.description,
          status: validated.status,
          order: validated.order,
          plannedStartDate: validated.plannedStartDate ? new Date(validated.plannedStartDate) : null,
          plannedEndDate: validated.plannedEndDate ? new Date(validated.plannedEndDate) : null,
        },
      })

      // Audit log
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: 'CREATE_PHASE',
          resource: 'ProjectPhase',
          resourceId: phase.id,
          details: `Created phase: ${validated.name}`,
        },
      })

      return Response.json(phase, { status: 201 })
    } catch (dbError: any) {
      if (dbError.message?.includes('ECONNREFUSED') || dbError.message?.includes('database')) {
        const newPhase = {
          id: Math.random().toString(36).substring(7),
          name: validated.name,
          description: validated.description,
          status: validated.status,
          order: validated.order,
          plannedStartDate: validated.plannedStartDate ? new Date(validated.plannedStartDate) : null,
          plannedEndDate: validated.plannedEndDate ? new Date(validated.plannedEndDate) : null,
          actualStartDate: null,
          actualEndDate: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        mockPhases.push(newPhase)
        console.log('[PHASE] Database unavailable, using demo mode')
        return Response.json(newPhase, { status: 201 })
      }
      throw dbError
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Validation error', details: error.errors }, { status: 400 })
    }

    console.error('POST /api/phase error:', error)
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
    if (!can({ id: user.id, role: user.role }, 'phases:read')) {
      return Response.json({ error: 'Forbidden: insufficient permissions' }, { status: 403 })
    }

    try {
      const phases = await prisma.projectPhase.findMany({
        orderBy: { order: 'asc' },
      })
      return Response.json(phases)
    } catch (dbError: any) {
      if (dbError.message?.includes('ECONNREFUSED') || dbError.message?.includes('database')) {
        console.log('[PHASE] Database unavailable, using demo mode')
        return Response.json(mockPhases)
      }
      throw dbError
    }
  } catch (error) {
    console.error('GET /api/phase error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
