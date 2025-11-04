# GitHub Copilot Instructions for RabitHR

## Project Overview

**RabitHR (رابِط)** is a comprehensive AI-powered Human Resources management platform specifically designed for Saudi Arabian companies. The platform provides all the tools and services HR departments need in one place, fully compliant with Saudi labor laws.

### Key Features
- 🤖 **AI-powered tools**: Smart generation of letters, contracts, and documents
- 📊 **Complete management**: Integrated system for managing employees and payroll
- ⚖️ **Legal compliance**: 100% compliant with Saudi labor law
- 🛠️ **Advanced tools**: 10+ smart calculators and reporting tools
- 🌍 **Bilingual support**: Full Arabic and English support
- 🔒 **High security**: Data encryption and secure authentication

### Target Users
- **Companies**: Managing employees, payroll, recruitment (ATS), reports, and consultations
- **Employees**: View profiles, request leaves, upload documents, access smart tools
- **HR Consultants**: Provide consultations to companies, manage sessions, earn additional income

## Tech Stack

### Frontend
- **React 19** - Modern UI library
- **TypeScript** - Strongly typed language
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Pre-built UI components using Radix UI
- **Vite** - Fast build tool
- **Wouter** - Lightweight routing (patched version)
- **TanStack Query** - Data fetching and caching
- **i18next** - Internationalization (Arabic/English)
- **Framer Motion** - Animations
- **Recharts** - Data visualization

### Backend
- **Express 4** - Node.js framework
- **tRPC 11** - Type-safe API framework
- **Drizzle ORM** - TypeScript ORM for database operations
- **MySQL/TiDB** - Relational database (55 tables)
- **Zod** - Schema validation
- **SuperJSON** - Data serialization

### Authentication & Security
- **OAuth 2.0** - Secure authentication
- **JWT (jose)** - Access tokens
- **bcryptjs** - Password encryption
- **Rate Limiting** - Protection against attacks
- **CSRF & XSS protection**

## Project Structure

```
/home/runner/work/RabitHR/RabitHR/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── pages/      # 80+ pages (dashboard, admin, auth, tools, etc.)
│   │   ├── components/ # 100+ reusable components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── lib/        # Utilities and helpers
│   │   └── i18n/       # Internationalization files
│   └── public/         # Static assets
├── server/             # Backend Express/tRPC application
│   ├── _core/          # Core server files (index.ts)
│   ├── routers.ts      # tRPC routers (35+ endpoints)
│   ├── db.ts           # Database functions
│   ├── adminDb.ts      # Admin-specific database functions
│   ├── adminRouter.ts  # Admin-specific routes
│   ├── chatDb.ts       # Chat database functions
│   ├── chatRouter.ts   # Chat routes
│   └── storage.ts      # AWS S3 file storage integration
├── drizzle/            # Database schema and migrations
│   └── schema.ts       # 55 database tables
├── shared/             # Shared code between client and server
│   ├── types/          # TypeScript types and interfaces
│   └── validations/    # Zod schemas for validation
├── docs/               # Comprehensive documentation
├── scripts/            # Utility scripts
└── *.mjs               # Seed scripts for data initialization
```

## Coding Guidelines

### TypeScript Best Practices
- Always use TypeScript for all new files (`.ts`, `.tsx`)
- Avoid using `any` - use proper types or `unknown` if necessary
- Use interfaces for object shapes, types for unions/intersections
- Export types from `shared/` directory for reuse between client/server
- Leverage Zod schemas for runtime validation and TypeScript type inference

### React Best Practices
- Use functional components with hooks
- Use React 19 features appropriately
- Follow component composition patterns
- Keep components focused and single-responsibility
- Use `@/` imports for client code, `@shared/` for shared code
- Prefer `const` components over function declarations
- Use proper TypeScript props typing

### Code Style
- Use **2 spaces** for indentation
- Use **semicolons** at the end of statements
- Use **Prettier** for automatic formatting (`pnpm format`)
- Use **camelCase** for variables and functions
- Use **PascalCase** for components and type names
- Use **UPPER_CASE** for constants
- Write clear, descriptive variable and function names

### Naming Conventions
- React components: `MyComponent.tsx`
- Hooks: `useMyHook.ts`
- Utils: `myUtil.ts`
- Types: `MyType` or `MyInterface`
- Database functions: `getUser`, `createEmployee`, `updateCompany`
- API routes: Use descriptive names like `getEmployeesByCompanyId`

### Comments and Documentation
- Write comments in **Arabic or English** (prefer Arabic for domain-specific terms)
- Use JSDoc for important functions and complex logic
- Add comments for non-obvious code or business logic
- Document Saudi labor law compliance requirements where applicable
- Include examples in JSDoc when helpful

### tRPC and API Development
- Define all API routes in `server/routers.ts` using tRPC
- Use Zod schemas for input validation
- Keep database logic in `server/db.ts`, separate from routers
- Return meaningful error messages
- Use proper HTTP status codes via tRPC errors
- Implement proper authentication checks using middleware

### Database (Drizzle ORM)
- Define all schemas in `drizzle/schema.ts`
- Use descriptive table and column names (Arabic and English versions where applicable)
- Follow existing patterns for enums and relationships
- Run migrations with `pnpm db:push`
- Write database functions in `server/db.ts`
- Use transactions for multi-step database operations
- Always handle NULL values properly

### State Management
- Use TanStack Query for server state
- Use React state (useState, useReducer) for local UI state
- Avoid prop drilling - use context when needed
- Keep state as close to where it's used as possible

### Internationalization (i18n)
- Support both **Arabic (RTL)** and **English (LTR)**
- Use i18next for all user-facing text
- Add translations to both language files
- Test RTL layout for Arabic
- Use semantic keys: `common.submit`, `dashboard.employees.title`

### Security Best Practices
- Never commit secrets or API keys (use `.env`)
- Always validate and sanitize user input
- Use parameterized queries (Drizzle handles this)
- Implement proper authentication checks
- Use HTTPS in production
- Follow OWASP security guidelines
- Sanitize file uploads
- Implement rate limiting for sensitive endpoints

### Error Handling
- Use try-catch blocks for async operations
- Provide user-friendly error messages
- Log errors appropriately
- Return proper error responses from API
- Handle edge cases and validation errors

### Testing
- Write tests using Vitest (`pnpm test`)
- Test critical business logic
- Test API endpoints
- Test utility functions
- Aim for meaningful test coverage, not just high percentages

## Development Workflow

### Running the Project
```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
pnpm db:push

# Start development server
pnpm dev

# Access at http://localhost:3000
```

### Build and Deploy
```bash
# Type check
pnpm check

# Format code
pnpm format

# Build for production
pnpm build

# Start production server
pnpm start
```

### Database Operations
- Schema changes: Edit `drizzle/schema.ts`, then run `pnpm db:push`
- Seed data: Run seed scripts like `node seed-consulting-data.mjs`
- See `drizzle.config.ts` for configuration

## Important Context

### Saudi Labor Law Compliance
This platform is specifically designed to comply with Saudi labor laws. When working on features related to:
- **End of service calculations** (Article 84)
- **Leave types** (7 types including annual, sick, maternity, etc.)
- **Employee contracts**
- **Payroll and insurance**

Always ensure compliance with Saudi labor regulations. Refer to existing implementations in the codebase.

### Key Domain Concepts
- **موظف (Employee)**: Platform users who are employees
- **شركة (Company)**: Organizations using the platform
- **مستشار (Consultant)**: HR consultants providing services
- **نهاية الخدمة (End of Service)**: Termination benefits calculation
- **الإجازات (Leaves)**: Various leave types as per Saudi law
- **التأمينات الاجتماعية (Social Insurance)**: GOSI calculations
- **ATS**: Applicant Tracking System for recruitment

### Smart Tools Available
1. End of service calculator (Article 84 compliance)
2. Leave calculator (7 leave types)
3. AI letter generator (55+ letter types)
4. Salary calculator (net and gross)
5. Insurance calculator
6. Template generator (12+ templates)
7. AI assistant for HR questions

### User Roles
- **user/admin**: System-level roles
- **employee/individual/company**: User types
- Companies can manage their employees
- Consultants can offer consulting services
- Employees can access tools and their data

### Authentication Flow
- Supports OAuth 2.0 (Google, Apple)
- Email/password authentication
- JWT-based session management
- Role-based access control (RBAC)

## Resources and References

### Documentation
- Main README: `/home/runner/work/RabitHR/RabitHR/README.md`
- Installation Guide: `/home/runner/work/RabitHR/RabitHR/INSTALLATION.md`
- Deployment Guide: `/home/runner/work/RabitHR/RabitHR/DEPLOYMENT_GUIDE.md`
- Contributing Guide: `/home/runner/work/RabitHR/RabitHR/CONTRIBUTING.md`
- Test Users: `/home/runner/work/RabitHR/RabitHR/TEST_USERS.md`

### External Resources
- React 19 Docs: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs/
- tRPC: https://trpc.io/docs
- Drizzle ORM: https://orm.drizzle.team/docs/overview
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com

### Package Manager
- Always use **pnpm** (not npm or yarn)
- Package manager is locked to `pnpm@10.4.1`

## Examples and Patterns

### Example: Creating a new tRPC endpoint
```typescript
// In server/routers.ts
export const appRouter = router({
  // ... existing routes
  getEmployeeDetails: protectedProcedure
    .input(z.object({ employeeId: z.number() }))
    .query(async ({ input, ctx }) => {
      const employee = await getEmployeeById(input.employeeId);
      if (!employee) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Employee not found',
        });
      }
      return employee;
    }),
});
```

### Example: Creating a new React component
```typescript
// In client/src/components/EmployeeCard.tsx
import { Card } from "@/components/ui/card";
import type { Employee } from "@shared/types";

interface EmployeeCardProps {
  employee: Employee;
  onSelect?: (id: number) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ 
  employee, 
  onSelect 
}) => {
  return (
    <Card onClick={() => onSelect?.(employee.id)}>
      <h3>{employee.fullName}</h3>
      <p>{employee.jobTitle}</p>
    </Card>
  );
};
```

### Example: Database query with Drizzle
```typescript
// In server/db.ts
export async function getEmployeesByCompanyId(companyId: number) {
  return await db
    .select()
    .from(employees)
    .where(eq(employees.companyId, companyId))
    .orderBy(desc(employees.createdAt));
}
```

### Example: Using i18n
```typescript
// In a React component
import { useTranslation } from "react-i18next";

export function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      <p>{t('dashboard.description')}</p>
    </div>
  );
}
```

## Common Pitfalls to Avoid

1. **Don't use `any` type** - Be explicit with types
2. **Don't bypass authentication** - Always check user permissions
3. **Don't hardcode strings** - Use i18n for all user-facing text
4. **Don't forget RTL support** - Test Arabic layout
5. **Don't skip input validation** - Use Zod schemas
6. **Don't commit `.env` files** - Use `.env.example`
7. **Don't use npm or yarn** - Use pnpm only
8. **Don't modify database schema without migrations** - Use `pnpm db:push`
9. **Don't forget error handling** - Always handle edge cases
10. **Don't violate Saudi labor law requirements** - Follow existing patterns

## Getting Help

If you need clarification on:
- Saudi labor law requirements: Check existing implementations or ask the team
- Database schema: See `drizzle/schema.ts` with 55 tables
- API endpoints: See `server/routers.ts` with 35+ endpoints
- Components: Check `client/src/components/` for 100+ examples
- Pages: See `client/src/pages/` for 80+ page examples

---

**This platform serves Saudi companies and must maintain the highest standards of code quality, security, and labor law compliance.**
