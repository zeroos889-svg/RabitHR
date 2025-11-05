# 🔧 توصيات إعادة الهيكلة - خطة عملية

## 🎯 الهدف

تحويل قاعدة الكود لتتوافق مع أفضل الممارسات العالمية

---

## 1️⃣ تقسيم server/db.ts (1917 سطر)

### البنية المقترحة:

```
server/
├── db/
│   ├── index.ts              # Connection & exports only
│   ├── users.ts              # User-related queries
│   ├── consultants.ts        # Consultant queries
│   ├── bookings.ts           # Booking queries
│   ├── subscriptions.ts      # Subscription queries
│   ├── notifications.ts      # Notification queries
│   └── analytics.ts          # Analytics queries
```

### مثال التقسيم:

**db/index.ts** (القديم db.ts - الجزء الرئيسي فقط):

```typescript
import { drizzle } from "drizzle-orm/mysql2";
import { logger } from "../_core/logger";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  // Connection logic only
}

// Re-export all functions
export * from "./users";
export * from "./consultants";
export * from "./bookings";
```

**db/users.ts**:

```typescript
import { getDb } from "./index";
import { users, passwords } from "../../drizzle/schema";

export async function createUserWithPassword(
  data: InsertUser & { password: string }
) {
  // User creation logic
}

export async function getUserByEmail(email: string) {
  // Get user logic
}

export async function verifyUserLogin(email: string, password: string) {
  // Verify login logic
}
```

---

## 2️⃣ تقسيم server/routers.ts (1646 سطر)

### البنية المقترحة:

```
server/
├── routers/
│   ├── index.ts              # Main router (combines all)
│   ├── auth.ts               # Authentication
│   ├── eosb.ts               # End of service
│   ├── users.ts              # User management
│   ├── subscriptions.ts      # Subscriptions
│   ├── consultants.ts        # Consultants
│   ├── bookings.ts           # Bookings
│   ├── documents.ts          # Documents
│   └── ai.ts                 # AI features
```

### مثال التقسيم:

**routers/index.ts**:

```typescript
import { router } from "../_core/trpc";
import { authRouter } from "./auth";
import { eosbRouter } from "./eosb";
import { usersRouter } from "./users";
// ... imports

export const appRouter = router({
  system: systemRouter,
  auth: authRouter,
  eosb: eosbRouter,
  users: usersRouter,
  subscriptions: subscriptionsRouter,
  // ...
});
```

**routers/auth.ts**:

```typescript
import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import * as db from "../db";

export const authRouter = router({
  me: publicProcedure.query(opts => opts.ctx.user),

  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(8),
      })
    )
    .mutation(async ({ input }) => {
      // Registration logic
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      // Login logic
    }),
});
```

---

## 3️⃣ إزالة التكرار - Tasks & Tickets

### البنية المقترحة:

```
client/src/components/
├── shared/
│   ├── ItemList.tsx          # Generic list component
│   ├── ItemCard.tsx          # Generic card component
│   ├── ItemFilters.tsx       # Filters component
│   └── ItemActions.tsx       # Actions component
```

### مثال المكون المشترك:

**components/shared/ItemList.tsx**:

```typescript
interface ItemListProps<T> {
  items: T[];
  type: 'task' | 'ticket';
  onStatusChange: (id: number, status: string) => void;
  onDelete: (id: number) => void;
  renderItem: (item: T) => React.ReactNode;
}

export function ItemList<T extends { id: number }>({
  items,
  type,
  onStatusChange,
  onDelete,
  renderItem
}: ItemListProps<T>) {
  return (
    <div className="grid gap-4">
      {items.map(item => (
        <ItemCard
          key={item.id}
          type={type}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        >
          {renderItem(item)}
        </ItemCard>
      ))}
    </div>
  );
}
```

**استخدام المكون في Tasks.tsx**:

```typescript
import { ItemList } from '@/components/shared/ItemList';

export default function Tasks() {
  return (
    <ItemList
      items={tasks}
      type="task"
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
      renderItem={(task) => (
        <TaskDetails task={task} />
      )}
    />
  );
}
```

---

## 4️⃣ استبدال console.log بـ logger

### البحث والاستبدال:

```bash
# Find all console.log
grep -r "console\.log" --include="*.ts" --include="*.tsx" server/ client/

# Replace pattern:
# Before:
console.log("User logged in", userId);

# After:
import { logger } from '@/server/_core/logger';
logger.info("User logged in", { userId, context: "Auth" });
```

### إنشاء logger للـ client:

**client/src/lib/logger.ts**:

```typescript
const isDev = import.meta.env.DEV;

export const logger = {
  info: (message: string, data?: any) => {
    if (isDev) console.info(`[INFO] ${message}`, data);
  },
  warn: (message: string, data?: any) => {
    if (isDev) console.warn(`[WARN] ${message}`, data);
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
    // Send to monitoring service in production
  },
};
```

---

## 5️⃣ استبدال any بـ unknown

### الأنماط الشائعة:

**Pattern 1: Error Handling**

```typescript
// ❌ Before
} catch (error: any) {
  throw new TRPCError({
    code: "BAD_REQUEST",
    message: error.message
  });
}

// ✅ After
} catch (error) {
  const err = error instanceof Error ? error : new Error("Unknown error");
  throw new TRPCError({
    code: "BAD_REQUEST",
    message: err.message
  });
}
```

**Pattern 2: Generic Data**

```typescript
// ❌ Before
function processData(data: any) {
  return data.value;
}

// ✅ After
function processData(data: unknown): string {
  if (typeof data === "object" && data !== null && "value" in data) {
    return String((data as { value: unknown }).value);
  }
  throw new Error("Invalid data format");
}
```

---

## 6️⃣ إكمال TODO الأمنية

### Admin Check Middleware:

**server/\_core/middleware/adminCheck.ts**:

```typescript
import { TRPCError } from "@trpc/server";
import { middleware } from "../trpc";

export const adminOnly = middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "يجب تسجيل الدخول",
    });
  }

  if (ctx.user.role !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "غير مصرح لك بالوصول",
    });
  }

  return next({ ctx });
});

export const adminProcedure = publicProcedure.use(adminOnly);
```

### استخدام:

```typescript
// في الـ routers
export const adminRouter = router({
  deleteUser: adminProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ input }) => {
      // Admin only action
    }),
});
```

---

## 7️⃣ تقسيم الملفات الكبيرة الأخرى

### ComponentShowcase.tsx (1440 سطر)

```
client/src/pages/showcase/
├── index.tsx                 # Main page (routing)
├── ButtonsShowcase.tsx       # Buttons section
├── FormsShowcase.tsx         # Forms section
├── CardsShowcase.tsx         # Cards section
├── NavigationShowcase.tsx    # Navigation section
└── DataShowcase.tsx          # Data display section
```

### Home.tsx (1195 سطر)

```
client/src/pages/home/
├── index.tsx                 # Main page
├── Hero.tsx                  # Hero section
├── Features.tsx              # Features section
├── Testimonials.tsx          # Testimonials
├── Pricing.tsx               # Pricing section
└── CTA.tsx                   # Call to action
```

---

## 8️⃣ إضافة ESLint Configuration

**eslint.config.js**:

```javascript
export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "max-lines": ["error", { max: 500, skipBlankLines: true }],
      "max-lines-per-function": ["warn", { max: 100 }],
      complexity: ["warn", 10],
      "no-console": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "no-duplicate-imports": "error",
    },
  },
];
```

---

## 📝 أولوية التنفيذ

### Week 1: Critical Refactoring

1. ✅ تقسيم server/db.ts
2. ✅ تقسيم server/routers.ts
3. ✅ إكمال admin checks

### Week 2: Code Quality

4. ✅ إزالة Tasks/Tickets duplication
5. ✅ استبدال console.log
6. ✅ استبدال any types

### Week 3: Optimization

7. ✅ تقسيم ملفات client كبيرة
8. ✅ إضافة ESLint rules
9. ✅ تحسين type safety

### Week 4: Testing & Documentation

10. ✅ إضافة unit tests
11. ✅ تحديث documentation
12. ✅ Code review

---

## 🎯 النتيجة المتوقعة

بعد التنفيذ:

- ✅ متوسط حجم الملف: < 300 سطر
- ✅ التكرار: < 5%
- ✅ Type safety: 100%
- ✅ Console.log: 0 (production)
- ✅ TODO: 0
- ✅ Maintainability: ممتاز
- ✅ Code quality: 9/10

---

**ملاحظة:** جميع هذه التوصيات قابلة للتنفيذ تدريجياً بدون كسر الكود الموجود.
