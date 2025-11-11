import { Role } from '@prisma/client'

type UserRef = { id: string; role: Role }

// Very small RBAC helper. Extend this mapping for more fine-grained checks.
export function can(user: UserRef | null, action: string, resource?: string) {
  if (!user) return false

  const role = user.role

  // founders can do everything
  if (role === 'FOUNDER') return true

  const permissions: Record<string, Array<Role>> = {
    'finance:write': ['FINANCE'],
    'finance:read': ['FINANCE', 'FOUNDER'],
    'phases:write': ['TECH', 'FOUNDER'],
    'phases:read': ['TECH', 'FOUNDER', 'OPERATIONS', 'FINANCE'],
    'investor:read': ['INVESTOR', 'FOUNDER', 'FINANCE'],
    'admin:toggle': ['FOUNDER'],
  }

  const allowedRoles = permissions[action]
  if (!allowedRoles) return false
  return allowedRoles.includes(role)
}
