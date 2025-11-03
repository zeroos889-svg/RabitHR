# دليل المطور - منصة رابِط

**الإصدار:** 1.0.0  
**التاريخ:** نوفمبر 2025  
**المؤلف:** فريق رابِط التقني  
**الفريق المؤسس:** صالح العقيل، منصور الجابر

---

## مقدمة

يوفر هذا الدليل معلومات شاملة للمطورين الذين يرغبون في المساهمة في تطوير منصة رابِط أو بناء تطبيقات تتكامل معها. المنصة مبنية على أحدث التقنيات والممارسات في تطوير البرمجيات، مع التركيز على الأداء والأمان وقابلية التوسع.

## البنية المعمارية

تتبع منصة رابِط معمارية حديثة متعددة الطبقات تضمن الفصل الواضح بين المكونات وسهولة الصيانة والتطوير.

### نظرة عامة على البنية

المنصة مقسمة إلى ثلاث طبقات رئيسية تعمل بشكل متكامل:

**طبقة العرض (Frontend)**: مبنية باستخدام React 19 مع TypeScript، وتوفر واجهة مستخدم حديثة وسريعة الاستجابة. تستخدم الطبقة Tailwind CSS 4 للتصميم وshadcn/ui للمكونات الجاهزة، مما يضمن تجربة مستخدم متسقة واحترافية عبر جميع الأجهزة.

**طبقة الخادم (Backend)**: تعتمد على Express 4 مع tRPC 11 لتوفير APIs آمنة ومكتوبة بشكل كامل. يتيح tRPC التواصل السلس بين Frontend و Backend مع ضمان سلامة الأنواع (Type Safety) في كلا الطرفين، مما يقلل الأخطاء ويسرع التطوير.

**طبقة البيانات (Database)**: تستخدم MySQL/TiDB كقاعدة بيانات رئيسية مع Drizzle ORM لإدارة البيانات. تحتوي قاعدة البيانات على 55 جدولاً تغطي جميع جوانب إدارة الموارد البشرية، من بيانات الموظفين إلى الاستشارات والدورات التدريبية.

### المكونات الأساسية

| المكون | التقنية | الوصف |
|--------|---------|-------|
| Frontend Framework | React 19 | مكتبة JavaScript لبناء واجهات المستخدم |
| Type System | TypeScript 5.3 | نظام الأنواع الثابتة لـ JavaScript |
| Styling | Tailwind CSS 4 | إطار عمل CSS utility-first |
| UI Components | shadcn/ui | مكونات واجهة مستخدم جاهزة |
| Backend Framework | Express 4 | إطار عمل Node.js للخادم |
| API Layer | tRPC 11 | طبقة APIs مكتوبة بالكامل |
| Database | MySQL 8 / TiDB 7 | قاعدة بيانات علائقية |
| ORM | Drizzle ORM | أداة ربط قاعدة البيانات |
| Authentication | Manus OAuth + JWT | نظام المصادقة المتكامل |
| Package Manager | pnpm 9 | مدير الحزم السريع |

## هيكل المشروع

يتبع المشروع هيكلاً منظماً يسهل التنقل والصيانة:

```
rabit-hr-platform/
├── client/                 # تطبيق Frontend
│   ├── public/            # الملفات الثابتة
│   │   └── rabit-logo.svg # شعار المنصة
│   ├── src/
│   │   ├── pages/         # صفحات التطبيق (49 صفحة)
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── About.tsx
│   │   │   ├── dashboard/  # لوحة تحكم الشركات
│   │   │   ├── admin/      # لوحة تحكم المدير
│   │   │   └── consultant-dashboard/ # لوحة المستشارين
│   │   ├── components/    # المكونات القابلة لإعادة الاستخدام
│   │   │   ├── ui/        # مكونات shadcn/ui
│   │   │   ├── BackButton.tsx
│   │   │   ├── CookieConsent.tsx
│   │   │   ├── ChatWidget.tsx
│   │   │   └── DashboardLayout.tsx
│   │   ├── contexts/      # React Contexts
│   │   ├── hooks/         # Custom Hooks
│   │   ├── lib/
│   │   │   └── trpc.ts    # إعداد tRPC Client
│   │   ├── App.tsx        # المسارات والتخطيط
│   │   ├── main.tsx       # نقطة الدخول
│   │   └── index.css      # الأنماط العامة
│   └── index.html
├── server/                # تطبيق Backend
│   ├── _core/            # الوظائف الأساسية
│   │   ├── context.ts    # سياق tRPC
│   │   ├── trpc.ts       # إعداد tRPC Server
│   │   ├── oauth.ts      # نظام OAuth
│   │   ├── llm.ts        # تكامل الذكاء الاصطناعي
│   │   ├── map.ts        # تكامل الخرائط
│   │   └── notification.ts # نظام الإشعارات
│   ├── routers.ts        # tRPC Procedures (35+ API)
│   └── db.ts             # دوال قاعدة البيانات
├── drizzle/              # إعدادات قاعدة البيانات
│   └── schema.ts         # هيكل قاعدة البيانات (55 جدول)
├── shared/               # الثوابت والأنواع المشتركة
├── storage/              # دوال التخزين S3
├── scripts/              # سكريبتات الصيانة
│   └── seed-test-users.mjs # إنشاء بيانات تجريبية
├── docs/                 # التوثيق
└── package.json
```

## البدء في التطوير

### إعداد بيئة التطوير

بعد تثبيت المتطلبات الأساسية واستنساخ المستودع، اتبع الخطوات التالية:

```bash
# تثبيت الاعتماديات
pnpm install

# نسخ ملف البيئة
cp .env.example .env

# تحرير ملف .env وإضافة القيم المناسبة
nano .env

# تطبيق هيكل قاعدة البيانات
pnpm db:push

# إنشاء بيانات تجريبية
npx tsx scripts/seed-test-users.mjs

# تشغيل خادم التطوير
pnpm dev
```

سيعمل خادم التطوير على المنفذ 3000 بشكل افتراضي، مع تفعيل Hot Module Replacement (HMR) لإعادة التحميل التلقائي عند تعديل الملفات.

### دورة التطوير

يتبع المشروع دورة تطوير منظمة تضمن جودة الكود:

**التخطيط**: قبل البدء في أي ميزة جديدة، يجب تحديد المتطلبات بوضوح وتوثيقها في ملف `TODO.md`. يساعد هذا في تتبع التقدم وضمان عدم نسيان أي متطلب.

**التطوير**: عند تطوير ميزة جديدة، ابدأ بتحديث Schema في `drizzle/schema.ts` إذا لزم الأمر، ثم أضف الدوال المساعدة في `server/db.ts`، وبعدها أنشئ Procedures في `server/routers.ts`، وأخيراً قم ببناء واجهة المستخدم في `client/src/pages/`.

**الاختبار**: اختبر الميزة بشكل شامل في المتصفح، تأكد من عمل جميع الحالات (success, error, loading)، وتحقق من responsive design على مختلف الأجهزة.

**المراجعة**: قبل الدمج، راجع الكود للتأكد من اتباع معايير الكتابة، وتحقق من عدم وجود أخطاء TypeScript، وتأكد من تحديث التوثيق.

## تطوير Frontend

### إنشاء صفحة جديدة

لإنشاء صفحة جديدة في التطبيق:

```typescript
// client/src/pages/NewFeature.tsx
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

export default function NewFeature() {
  // استخدام tRPC لجلب البيانات
  const { data, isLoading } = trpc.feature.list.useQuery();
  
  // استخدام mutation للتعديل
  const mutation = trpc.feature.create.useMutation({
    onSuccess: () => {
      // تحديث البيانات بعد النجاح
      trpc.useUtils().feature.list.invalidate();
    },
  });

  if (isLoading) return <div>جاري التحميل...</div>;

  return (
    <div className="container py-8">
      <BackButton />
      <h1 className="text-3xl font-bold mb-6">الميزة الجديدة</h1>
      {/* محتوى الصفحة */}
    </div>
  );
}
```

ثم سجل المسار في `client/src/App.tsx`:

```typescript
import NewFeature from "./pages/NewFeature";

<Route path="/new-feature" component={NewFeature} />
```

### استخدام المكونات الجاهزة

المنصة توفر مكونات جاهزة يمكن استخدامها مباشرة:

**DashboardLayout**: للوحات التحكم والتطبيقات الإدارية:

```typescript
import DashboardLayout from "@/components/DashboardLayout";

export default function MyDashboard() {
  return (
    <DashboardLayout>
      {/* محتوى لوحة التحكم */}
    </DashboardLayout>
  );
}
```

**BackButton**: لإضافة زر الرجوع في أي صفحة:

```typescript
import { BackButton } from "@/components/BackButton";

<BackButton />
```

**ChatWidget**: لإضافة نافذة الدردشة:

```typescript
import ChatWidget from "@/components/ChatWidget";

<ChatWidget />
```

### التعامل مع النماذج

استخدم React Hook Form مع Zod للتحقق من صحة البيانات:

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
});

type FormData = z.infer<typeof schema>;

export default function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // معالجة البيانات
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}
      {/* باقي الحقول */}
    </form>
  );
}
```

## تطوير Backend

### إنشاء Procedure جديد

لإضافة API جديد في `server/routers.ts`:

```typescript
import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";

export const appRouter = router({
  feature: router({
    // API عام (لا يحتاج تسجيل دخول)
    list: publicProcedure.query(async () => {
      const db = await getDb();
      return db.select().from(features);
    }),
    
    // API محمي (يحتاج تسجيل دخول)
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        description: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        await db.insert(features).values({
          ...input,
          userId: ctx.user.id,
        });
        return { success: true };
      }),
  }),
});
```

### التعامل مع قاعدة البيانات

أضف دوال مساعدة في `server/db.ts`:

```typescript
import { eq } from "drizzle-orm";
import { features } from "../drizzle/schema";

export async function getFeatureById(id: number) {
  const db = await getDb();
  const result = await db
    .select()
    .from(features)
    .where(eq(features.id, id))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

export async function createFeature(data: InsertFeature) {
  const db = await getDb();
  await db.insert(features).values(data);
}
```

### نظام المصادقة

المنصة تدعم طريقتين للمصادقة:

**Manus OAuth**: للتسجيل السريع عبر Google, Apple, Microsoft:

```typescript
// يتم التعامل معه تلقائياً عبر getLoginUrl()
import { getLoginUrl } from "@/const";

<Button onClick={() => window.location.href = getLoginUrl()}>
  تسجيل الدخول
</Button>
```

**Email/Password**: للتسجيل التقليدي:

```typescript
// التسجيل
const register = trpc.auth.register.useMutation();

await register.mutateAsync({
  name: "أحمد محمد",
  email: "ahmad@example.com",
  password: "secure_password",
  userType: "company",
});

// تسجيل الدخول
const login = trpc.auth.login.useMutation();

await login.mutateAsync({
  email: "ahmad@example.com",
  password: "secure_password",
});
```

## قاعدة البيانات

### هيكل الجداول

تحتوي قاعدة البيانات على 55 جدولاً مقسمة إلى مجموعات:

| المجموعة | الجداول | الوصف |
|----------|---------|-------|
| المستخدمون | users, passwords, companies | بيانات المستخدمين والشركات |
| الموظفون | employees, contracts, salaries | إدارة الموظفين والعقود |
| التوظيف | jobs, candidates, applications | نظام تتبع المتقدمين (ATS) |
| الاستشارات | consultationTypes, consultations, bookings | خدمات الاستشارات |
| التدريب | courses, enrollments, certificates | الدورات والشهادات |
| الإجازات | leaveRequests, leaveBalances | إدارة الإجازات |
| الحضور | attendance, shifts | نظام الحضور والانصراف |
| التذاكر | tickets, ticketMessages | نظام الدعم الفني |
| المهام | tasks, taskAssignments | إدارة المهام |
| التقارير | reports, analytics | التقارير والإحصائيات |

### إضافة جدول جديد

لإضافة جدول جديد، عدّل `drizzle/schema.ts`:

```typescript
export const myNewTable = mysqlTable("my_new_table", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  userId: int("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type MyNewTable = typeof myNewTable.$inferSelect;
export type InsertMyNewTable = typeof myNewTable.$inferInsert;
```

ثم طبق التغييرات:

```bash
pnpm db:push
```

## التكامل مع الخدمات الخارجية

### الذكاء الاصطناعي (LLM)

استخدم الدالة المدمجة للتكامل مع نماذج اللغة:

```typescript
import { invokeLLM } from "./server/_core/llm";

const response = await invokeLLM({
  messages: [
    { role: "system", content: "أنت مساعد موارد بشرية محترف" },
    { role: "user", content: "ما هي أفضل ممارسات التوظيف؟" },
  ],
});

console.log(response.choices[0].message.content);
```

### الخرائط (Google Maps)

استخدم مكون الخريطة المدمج:

```typescript
import { MapView } from "@/components/Map";

<MapView
  onMapReady={(map, services) => {
    // استخدام خدمات الخرائط
    const geocoder = new services.Geocoder();
    geocoder.geocode({ address: "الرياض، السعودية" }, (results) => {
      console.log(results);
    });
  }}
/>
```

### التخزين السحابي (S3)

استخدم دوال التخزين المدمجة:

```typescript
import { storagePut, storageGet } from "./server/storage";

// رفع ملف
const { url } = await storagePut(
  `documents/${userId}/file.pdf`,
  fileBuffer,
  "application/pdf"
);

// الحصول على رابط الملف
const { url } = await storageGet(`documents/${userId}/file.pdf`);
```

## معايير الكتابة

### TypeScript

- استخدم أنواع صريحة دائماً، تجنب `any`
- استخدم interfaces للأشياء المعقدة
- استخدم enums للقيم الثابتة
- فعّل strict mode في tsconfig.json

### React

- استخدم Functional Components مع Hooks
- تجنب استخدام useEffect إلا عند الضرورة
- استخدم useMemo و useCallback للتحسين
- اتبع قاعدة Hooks (لا تستخدمها داخل loops أو conditions)

### CSS/Tailwind

- استخدم Tailwind classes بدلاً من CSS مخصص
- اتبع نظام الألوان المعرف في index.css
- استخدم responsive classes (md:, lg:)
- تجنب !important إلا عند الضرورة القصوى

### Git

- اكتب commit messages واضحة بالعربية أو الإنجليزية
- استخدم branches للميزات الجديدة
- اعمل pull request قبل الدمج في main
- اختبر الكود قبل الـ commit

## الاختبار

### اختبار الوحدة (Unit Testing)

استخدم Vitest لاختبار الوظائف:

```typescript
import { describe, it, expect } from 'vitest';
import { calculateEndOfService } from './calculations';

describe('calculateEndOfService', () => {
  it('should calculate correctly for 5 years', () => {
    const result = calculateEndOfService(5, 10000);
    expect(result).toBe(50000);
  });
});
```

### اختبار التكامل (Integration Testing)

اختبر tRPC procedures:

```typescript
import { appRouter } from './server/routers';
import { createContext } from './server/_core/context';

const caller = appRouter.createCaller(await createContext());

const result = await caller.feature.list();
expect(result).toHaveLength(10);
```

## الأمان

### أفضل الممارسات

**التحقق من المدخلات**: استخدم Zod للتحقق من جميع المدخلات من المستخدم قبل معالجتها.

**تشفير كلمات المرور**: استخدم bcrypt لتشفير كلمات المرور، لا تخزنها أبداً بشكل نصي.

**حماية من SQL Injection**: استخدم Drizzle ORM دائماً، لا تستخدم raw SQL queries.

**حماية من XSS**: React يحمي تلقائياً، لكن تجنب dangerouslySetInnerHTML.

**HTTPS**: استخدم HTTPS دائماً في الإنتاج.

**Rate Limiting**: طبق حدود للطلبات لمنع الهجمات.

## الأداء

### تحسين Frontend

- استخدم lazy loading للصفحات الكبيرة
- قلل حجم الصور باستخدام WebP
- استخدم code splitting
- فعّل caching للـ assets الثابتة

### تحسين Backend

- استخدم indexes في قاعدة البيانات
- طبق caching للبيانات المتكررة
- استخدم pagination للقوائم الطويلة
- راقب أداء الـ queries

## الدعم والمساعدة

للحصول على المساعدة في التطوير:

- **التوثيق**: راجع ملفات docs/
- **الأمثلة**: انظر إلى الكود الموجود في client/src/pages/
- **المجتمع**: انضم إلى Discord Server
- **الدعم الفني**: support@rabit.sa

---

**ملاحظة**: هذا الدليل يتم تحديثه بشكل مستمر. تأكد من الرجوع إلى أحدث إصدار.
