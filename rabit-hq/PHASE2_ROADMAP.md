# 🎯 Rabit HQ - Implementation Roadmap

**المرحلة الأولى: ✅ المصادقة والأمان (مكتملة)**

---

## المرحلة الثانية: إكمال API Routes

### API Routes المتبقية:

1. **`/api/expense` - إدارة النفقات**
   - POST: Create expense (same pattern as capital)
   - GET: List all expenses
   - Required permission: `finance:write` / `finance:read`

2. **`/api/phase` - مراحل المشروع**
   - POST: Create phase
   - GET: List phases
   - Required permission: `phases:write` / `phases:read`

3. **`/api/milestone` - المحطات الرئيسية**
   - POST: Create milestone
   - GET: List milestones
   - Required permission: Same as phases

### نمط التنفيذ (استخدم كقالب):
```typescript
// 1. Import requirements
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { can } from '@/lib/rbac'

// 2. Define Zod schema
const CreateExpenseSchema = z.object({
  category: z.string(),
  amount: z.number().positive(),
  date: z.string().datetime(),
  paidBy: z.string(),
  // ... more fields
})

// 3. POST handler (Create)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  
  const user = session.user as any
  if (!can({ id: user.id, role: user.role }, 'finance:write')) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  const validated = CreateExpenseSchema.parse(await req.json())
  const expense = await prisma.expense.create({ data: validated })
  
  await prisma.auditLog.create({
    data: {
      actorId: user.id,
      action: 'CREATE_EXPENSE',
      resource: 'Expense',
      resourceId: expense.id,
      details: JSON.stringify(validated),
    },
  })
  
  return Response.json(expense, { status: 201 })
}

// 4. GET handler (List)
export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  
  const user = session.user as any
  if (!can({ id: user.id, role: user.role }, 'finance:read')) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  const expenses = await prisma.expense.findMany({ orderBy: { date: 'desc' } })
  return Response.json(expenses)
}
```

---

## المرحلة الثالثة: المحليات (i18n)

### التثبيت:
```bash
npm install next-intl
```

### البنية:
- `app/[locale]/page.tsx` - Root page with locale segment
- `messages/ar.json` - Arabic translations
- `messages/en.json` - English translations
- `i18n.config.ts` - i18n configuration
- RTL support for Arabic

### الخطوات:
1. Move all pages under `[locale]` folder
2. Create `messages/ar.json` and `messages/en.json`
3. Wrap app with IntlProvider
4. Add language toggle in header
5. Use `useTranslations()` hook for dynamic text

---

## المرحلة الرابعة: مكونات UI

### مكونات shadcn/ui للإضافة:
- Card (عرض KPI)
- Button (تفاعلي)
- Dialog (تأكيد/إدخال البيانات)
- Form (نماذج آمنة)
- Table (عرض البيانات)
- Chart (رسوم بيانية)

### مكتبات الرسوم البيانية:
- Recharts (حرق المعدل، الإنفاق)

---

## المرحلة الخامسة: الميزات الإدارية

### صفحة التبديل (Admin Toggles):
- عرض جميع FEATURE_* toggles
- زر لتفعيل/تعطيل الميزات
- حفظ في قاعدة البيانات (جدول جديد: `FeatureToggle`)

### صفحة إدارة المستخدمين:
- إنشاء مستخدم جديد
- تعديل الأدوار
- حذف المستخدمين

---

## كيفية الإجراء

اختر مرحلة واحدة، وأخبرني:
- **أي API route تريد أولاً؟** (expense / phase / milestone)
- **هل تريد اختبار محلي أم بناء فوري؟**
- **هل تفضل Arabic-first أم English-first للترجمات؟**

سأقوم بـ:
1. تنفيذ الميزة المطلوبة
2. اختبارها محلياً
3. التحقق من البناء
4. توثيقها بالكامل
