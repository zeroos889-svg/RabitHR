# إعداد قاعدة البيانات (PostgreSQL + Prisma)

يدعم المشروع PostgreSQL كقاعدة بيانات افتراضية باستخدام Prisma ORM.

## 1) إعداد متغيرات البيئة

أنشئ ملف `.env` من المثال ثم حدّث رابط الاتصال:

```bash
cp .env.example .env
```

داخل `.env`:

```properties
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/rabit_hq?schema=public
```

إن كنت تستخدم خدمة سحابية (Neon / Supabase / Railway Postgres)، استبدل القيم بما يطابق مزودك.

## 2) تشغيل Postgres محلياً (اختياري عبر Docker)

نوفر ملف `rabit-hq/docker-compose.dev.yml` لتشغيل Postgres + pgAdmin:

```bash
docker compose -f rabit-hq/docker-compose.dev.yml up -d
```

pgAdmin متاح على: <http://localhost:5050> (email: `admin@local`, password: `admin`).

## 3) مزامنة المخطط (Schema) مع القاعدة

```bash
cd rabit-hq
npx prisma db push
npm run seed   # اختياري: تهيئة بيانات تجريبية
```

## 4) التحقق وتشغيل التطبيق

```bash
npm run dev
```

ستجد الرسائل في الطرفية عند الاتصال. عند نجاح `db push` ستكون الجداول جاهزة.

## استكشاف الأخطاء

- تأكد أن Postgres يعمل محلياً (`docker ps`) أو أن بيانات الاتصال السحابية صحيحة.
- تحقق من سماحية الشبكة/الجدار الناري.
- استخدم Prisma Studio للفحص:

```bash
npx prisma studio
```

## ملاحظات أمنية

- لا تُشارك `.env` أو `DATABASE_URL` علناً.
- استخدم SSL في الإنتاج (أضف `sslmode=require` عند الحاجة).
- غيّر كلمات المرور بشكل دوري.
 
## دعم

عند مواجهة مشكلة:

1. تحقق من حالة Postgres محلياً أو من مزود الخدمة السحابي.
2. راجع سجلات التطبيق.
3. جرّب `npx prisma db push` مجدداً بعد التأكد من الوصول.
