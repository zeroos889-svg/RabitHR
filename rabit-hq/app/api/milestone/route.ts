import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { can } from '@/lib/rbac'

const CreateMilestoneSchema = z.object({
  phaseId: z.string().min(1, 'Phase ID required'),
  title: z.string().min(1, 'Title required'),
  description: z.string().optional(),
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']).default('NOT_STARTED'),
  plannedDate: z.string().datetime().optional(),
  ownerId: z.string().optional(),
})

// Mock data for demo mode
const mockMilestones: any[] = []

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
    const validated = CreateMilestoneSchema.parse(body)

    try {
      const milestone = await prisma.milestone.create({
        data: {
          phaseId: validated.phaseId,
          title: validated.title,
          description: validated.description,
          status: validated.status,
          plannedDate: validated.plannedDate ? new Date(validated.plannedDate) : null,
          ownerId: validated.ownerId,
        },
      })

      // Audit log
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: 'CREATE_MILESTONE',
          resource: 'Milestone',
          resourceId: milestone.id,
          details: `Created milestone: ${validated.title}`,
        },
      })

      return Response.json(milestone, { status: 201 })
    } catch (dbError: any) {
      if (dbError.message?.includes('ECONNREFUSED') || dbError.message?.includes('database')) {
        const newMilestone = {
          id: Math.random().toString(36).substring(7),
          phaseId: validated.phaseId,
          title: validated.title,
          description: validated.description,
          status: validated.status,
          plannedDate: validated.plannedDate ? new Date(validated.plannedDate) : null,
          ownerId: validated.ownerId,
          completedDate: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        mockMilestones.push(newMilestone)
        console.log('[MILESTONE] Database unavailable, using demo mode')
        return Response.json(newMilestone, { status: 201 })
      }
      throw dbError
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Validation error', details: error.errors }, { status: 400 })
    }

    console.error('POST /api/milestone error:', error)
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
      const milestones = await prisma.milestone.findMany({
        orderBy: { plannedDate: 'asc' },
      })
      return Response.json(milestones)
    } catch (dbError: any) {
      if (dbError.message?.includes('ECONNREFUSED') || dbError.message?.includes('database')) {
        console.log('[MILESTONE] Database unavailable, using demo mode')
        return Response.json(mockMilestones)
      }
      throw dbError
    }
  } catch (error) {
    console.error('GET /api/milestone error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
