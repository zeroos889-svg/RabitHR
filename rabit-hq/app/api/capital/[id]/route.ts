import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { can } from '@/lib/rbac'

const updateSchema = z.object({
  type: z.enum(['FOUNDER_CONTRIBUTION', 'INVESTMENT_ROUND', 'OTHER']).optional(),
  investorName: z.string().min(1).optional(),
  amount: z.number().positive().optional(),
  currency: z.string().min(1).optional(),
  date: z.string().optional(),
  notes: z.string().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const capitalEvent = await prisma.capitalEvent.findUnique({
      where: { id: params.id },
    })

    if (!capitalEvent) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(capitalEvent)
  } catch (error) {
    console.error('Error fetching capital event:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = session.user as any
    if (!can(user.role, 'capital:update')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validation = updateSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.issues },
        { status: 400 }
      )
    }

    const capitalEvent = await prisma.capitalEvent.update({
      where: { id: params.id },
      data: validation.data,
    })

    // Audit log
    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        action: 'UPDATE',
        resource: 'capital',
        resourceId: params.id,
        details: JSON.stringify(validation.data),
      },
    })

    return NextResponse.json(capitalEvent)
  } catch (error) {
    console.error('Error updating capital event:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = session.user as any
    if (!can(user.role, 'capital:delete')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.capitalEvent.delete({
      where: { id: params.id },
    })

    // Audit log
    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        action: 'DELETE',
        resource: 'capital',
        resourceId: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting capital event:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
