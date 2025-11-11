# Rabit HQ - Architecture

This document explains the foundation of Rabit HQ.

Modules
- Auth & RBAC: NextAuth (pluggable) + `lib/rbac.ts` exposes `can(user, action, resource)` for UI and API checks.
- Data: Prisma models are in `prisma/schema.prisma`. Core models: User, CapitalEvent, Expense, ProjectPhase, Milestone, AuditLog.
- Financials: `lib/finance.ts` exposes calculation functions (total capital, total expenses, monthly burn, runway).
- AI: `lib/ai.ts` is a thin wrapper that checks `FEATURE_ENABLE_AI` and `OPENAI_API_KEY` before making calls. Only aggregated metrics are sent.
- Feature toggles: `lib/config.ts` reads environment toggles; an admin UI can persist toggles later.

Entry points
- `app/` contains Next.js App Router pages. Key routes:
  - `/dashboard` - Founder command center
  - `/investor` - Read-only investor portal (controlled by feature toggle)

Extension points
- Add more `can` policies in `lib/rbac.ts`. Use `can` across API routes/mutations.
- Add new KPIs in `lib/finance.ts` and expose via server APIs for React Query.
- To enable AI, set `FEATURE_ENABLE_AI=true` and `OPENAI_API_KEY`.
