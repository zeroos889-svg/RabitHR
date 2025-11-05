# 🔧 دليل استكشاف الأخطاء - النشر على Vercel

<div dir="rtl">

## 📖 المحتويات

1. [أخطاء البناء (Build Errors)](#أخطاء-البناء-build-errors)
2. [أخطاء قاعدة البيانات](#أخطاء-قاعدة-البيانات)
3. [أخطاء المتغيرات البيئية](#أخطاء-المتغيرات-البيئية)
4. [أخطاء التوجيه والصفحات](#أخطاء-التوجيه-والصفحات)
5. [أخطاء المصادقة (Authentication)](#أخطاء-المصادقة-authentication)
6. [أخطاء الأداء](#أخطاء-الأداء)
7. [أخطاء البريد الإلكتروني](#أخطاء-البريد-الإلكتروني)
8. [أخطاء تخزين الملفات](#أخطاء-تخزين-الملفات)
9. [نصائح متقدمة](#نصائح-متقدمة)

---

## 🏗️ أخطاء البناء (Build Errors)

### ❌ خطأ: "pnpm: command not found"

**الأعراض:**

```
Error: pnpm: command not found
Build failed with exit code 127
```

**السبب:**
Vercel لم يتعرف على pnpm كمدير حزم.

**الحل:**

1. اذهب إلى **Settings → General**
2. في قسم **Build & Development Settings**:
   ```
   Install Command: npm install -g pnpm && pnpm install
   ```
   أو:
   ```
   Install Command: pnpm install
   ```
3. احفظ وأعد النشر

---

### ❌ خطأ: "Module not found"

**الأعراض:**

```
Error: Cannot find module '@/components/ui/button'
Module not found: Can't resolve '@/lib/utils'
```

**السبب:**
مشكلة في مسارات الاستيراد (import paths) أو tsconfig.json.

**الحل:**

1. تحقق من ملف `tsconfig.json`:

   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./client/src/*"],
         "@shared/*": ["./shared/*"]
       }
     }
   }
   ```

2. تأكد من أن الملفات موجودة في المسارات الصحيحة

3. امسح الـ cache وأعد البناء:
   ```bash
   # محلياً
   rm -rf node_modules
   rm -rf dist
   pnpm install
   pnpm build
   ```

---

### ❌ خطأ: "TypeScript compilation errors"

**الأعراض:**

```
Error: Type 'string | undefined' is not assignable to type 'string'
Found 15 errors in 8 files
```

**السبب:**
أخطاء نوع البيانات في TypeScript.

**الحل:**

1. شغّل فحص TypeScript محلياً:

   ```bash
   npm run check
   ```

2. أصلح الأخطاء المذكورة

3. إذا كانت الأخطاء في المكتبات:
   ```json
   // في tsconfig.json
   {
     "compilerOptions": {
       "skipLibCheck": true
     }
   }
   ```

---

### ❌ خطأ: "Out of memory"

**الأعراض:**

```
FATAL ERROR: Reached heap limit Allocation failed
JavaScript heap out of memory
```

**السبب:**
المشروع يحتاج ذاكرة أكثر أثناء البناء.

**الحل:**

1. في ملف `package.json`، عدّل أمر البناء:

   ```json
   {
     "scripts": {
       "build": "NODE_OPTIONS='--max-old-space-size=4096' vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist"
     }
   }
   ```

2. أو في Vercel Dashboard:
   ```
   Settings → Environment Variables
   Key: NODE_OPTIONS
   Value: --max-old-space-size=4096
   ```

---

## 💾 أخطاء قاعدة البيانات

### ❌ خطأ: "Failed to connect to database"

**الأعراض:**

```
Error: connect ETIMEDOUT
Error: ER_ACCESS_DENIED_ERROR
Cannot connect to MySQL server
```

**السبب:**
مشكلة في الاتصال بقاعدة البيانات.

**الحل:**

1. **تحقق من DATABASE_URL**:

   ```bash
   # يجب أن يكون بهذا الشكل:
   mysql://username:password@host:port/database

   # مثال صحيح:
   mysql://root:mypassword123@containers-us-west-123.railway.app:3306/railway
   ```

2. **اختبر الاتصال محلياً**:

   ```bash
   # ضع DATABASE_URL في ملف .env
   echo "DATABASE_URL=mysql://..." > .env

   # جرّب الاتصال
   pnpm db:push
   ```

3. **تحقق من Railway**:
   - افتح Railway Dashboard
   - تأكد من أن قاعدة البيانات تعمل (Status: Active)
   - تحقق من Metrics (CPU/Memory)

4. **تحقق من Network**:
   - Railway قد يكون خلف IP Allowlist
   - Vercel IPs قد تحتاج للإضافة

---

### ❌ خطأ: "Table doesn't exist"

**الأعراض:**

```
Error: ER_NO_SUCH_TABLE: Table 'railway.users' doesn't exist
```

**السبب:**
الجداول لم يتم إنشاؤها بعد (الهجرات لم تُشغَّل).

**الحل:**

1. **شغّل الهجرات**:

   ```bash
   # من جهازك المحلي
   echo "DATABASE_URL=mysql://[من Railway]" > .env
   pnpm db:push
   ```

2. **تحقق من إنشاء الجداول**:

   ```bash
   # في Railway Query Editor
   SHOW TABLES;

   # يجب أن ترى:
   # - users
   # - companies
   # - employees
   # - attendance
   # إلخ...
   ```

3. **إذا فشلت الهجرات**:

   ```bash
   # احذف جميع الجداول وأعد المحاولة
   DROP DATABASE railway;
   CREATE DATABASE railway;

   # ثم
   pnpm db:push
   ```

---

### ❌ خطأ: "Too many connections"

**الأعراض:**

```
Error: ER_TOO_MANY_USER_CONNECTIONS
Error: ER_CON_COUNT_ERROR
```

**السبب:**
تجاوز عدد الاتصالات المسموح به.

**الحل:**

1. **استخدم Connection Pooling**:

   ```typescript
   // في server/_core/db/index.ts
   export const db = drizzle(
     mysql.createPool({
       uri: process.env.DATABASE_URL,
       connectionLimit: 10,
     })
   );
   ```

2. **استخدم Redis للـ caching**:

   ```bash
   # في Vercel Environment Variables
   Key: REDIS_URL
   Value: [من Railway Redis]
   ```

3. **ترقية خطة Railway**:
   - الخطة المجانية: 100 اتصال
   - الخطة المدفوعة: 1000+ اتصال

---

## 🔐 أخطاء المتغيرات البيئية

### ❌ خطأ: "JWT_SECRET is required"

**الأعراض:**

```
Error: Environment variable JWT_SECRET is required
Application failed to start
```

**السبب:**
متغير بيئة مطلوب غير موجود.

**الحل:**

1. **اذهب إلى Vercel Dashboard**:

   ```
   Settings → Environment Variables
   ```

2. **أضف المتغير الناقص**:

   ```
   Key: JWT_SECRET
   Value: [أنشئ مفتاح قوي باستخدام: openssl rand -base64 32]
   ```

3. **أعد النشر**:
   ```
   Deployments → أحدث Deployment → ... → Redeploy
   ```

---

### ❌ خطأ: "Environment variable not found in build"

**الأعراض:**

```
Warning: VITE_APP_TITLE is not defined
Undefined variable in production
```

**السبب:**
المتغيرات التي تبدأ بـ VITE\_ يجب أن تكون موجودة أثناء البناء.

**الحل:**

1. **تأكد من إضافة المتغير في Vercel**:

   ```
   Key: VITE_APP_TITLE
   Value: رابِط - منصة إدارة الموارد البشرية
   ```

2. **اختر البيئة الصحيحة**:

   ```
   ✅ Production
   ✅ Preview
   ✅ Development
   ```

   (اختر الثلاثة)

3. **أعد النشر** بعد إضافة المتغير

---

## 🌐 أخطاء التوجيه والصفحات

### ❌ خطأ: "404 على جميع الصفحات غير الرئيسية"

**الأعراض:**

```
https://app.vercel.app/ ← يعمل ✅
https://app.vercel.app/dashboard ← 404 ❌
https://app.vercel.app/employees ← 404 ❌
```

**السبب:**
مشكلة في إعدادات التوجيه (routing) في Vercel.

**الحل:**

1. **تحقق من وجود vercel.json**:

   ```bash
   ls -la vercel.json
   ```

2. **تأكد من محتوى vercel.json**:

   ```json
   {
     "rewrites": [
       {
         "source": "/api/trpc/:path*",
         "destination": "/server/_core/index.ts"
       },
       {
         "source": "/api/:path*",
         "destination": "/server/_core/index.ts"
       }
     ]
   }
   ```

3. **إذا كان الملف مفقوداً، أنشئه وأعد النشر**

---

### ❌ خطأ: "API routes return 404"

**الأعراض:**

```
GET /api/trpc/users.list → 404
POST /api/auth/login → 404
```

**السبب:**
مشكلة في إعدادات Functions في vercel.json.

**الحل:**

1. **تحقق من vercel.json**:

   ```json
   {
     "functions": {
       "server/_core/index.ts": {
         "runtime": "nodejs18.x",
         "maxDuration": 60,
         "memory": 1024
       }
     },
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "/server/_core/index.ts"
       }
     ]
   }
   ```

2. **تأكد من بناء الـ server**:
   ```json
   // في package.json
   {
     "scripts": {
       "build": "vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist"
     }
   }
   ```

---

## 🔑 أخطاء المصادقة (Authentication)

### ❌ خطأ: "Invalid token"

**الأعراض:**

```
Error: jwt malformed
Error: invalid signature
Session expired immediately after login
```

**السبب:**
مشكلة في JWT_SECRET أو تعارض بين Deployments.

**الحل:**

1. **تحقق من JWT_SECRET**:

   ```bash
   # يجب أن يكون نفس المفتاح في جميع البيئات
   Vercel → Settings → Environment Variables → JWT_SECRET
   ```

2. **تأكد من قوة المفتاح**:

   ```bash
   # يجب أن يكون 32 حرف على الأقل
   openssl rand -base64 32
   ```

3. **امسح Cookies وجرّب مرة أخرى**:

   ```
   F12 → Application → Cookies → Clear All
   ```

4. **أعد النشر بعد تحديث المفتاح**

---

### ❌ خطأ: "CSRF token mismatch"

**الأعراض:**

```
Error: CSRF token invalid
Form submission failed
```

**السبب:**
مشكلة في CSRF protection.

**الحل:**

1. **تحقق من VITE_APP_URL**:

   ```bash
   # يجب أن يطابق رابط الـ domain
   VITE_APP_URL=https://your-app.vercel.app
   ```

2. **تأكد من إعدادات CORS**:
   ```typescript
   // في server/_core/index.ts
   app.use(
     cors({
       origin: process.env.VITE_APP_URL,
       credentials: true,
     })
   );
   ```

---

## ⚡ أخطاء الأداء

### ❌ خطأ: "Function execution timeout"

**الأعراض:**

```
Error: Function execution timed out after 10s
504 Gateway Timeout
```

**السبب:**
الدالة تستغرق وقتاً طويلاً جداً.

**الحل:**

1. **زد مدة التنفيذ**:

   ```json
   // في vercel.json
   {
     "functions": {
       "server/_core/index.ts": {
         "maxDuration": 60
       }
     }
   }
   ```

2. **استخدم Redis للـ caching**:

   ```bash
   Key: REDIS_URL
   Value: [من Railway]
   ```

3. **حسّن الاستعلامات**:

   ```typescript
   // بدلاً من:
   const users = await db.select().from(users);

   // استخدم:
   const users = await db.select().from(users).limit(100);
   ```

---

### ❌ خطأ: "Slow page load"

**الأعراض:**

```
صفحة بطيئة جداً
Time to First Byte (TTFB) > 3s
```

**السبب:**
عدة أسباب محتملة.

**الحل:**

1. **فعّل Redis**:

   ```bash
   REDIS_URL=redis://...
   ```

2. **استخدم CDN للملفات الكبيرة**:

   ```bash
   AWS_S3_BUCKET=...
   ```

3. **فعّل Compression**:

   ```typescript
   // في server/_core/index.ts
   import compression from "compression";
   app.use(compression());
   ```

4. **راقب الأداء**:
   ```bash
   Vercel Dashboard → Analytics
   ```

---

## 📧 أخطاء البريد الإلكتروني

### ❌ خطأ: "Failed to send email"

**الأعراض:**

```
Error: Failed to send email via Resend
Email not delivered
```

**السبب:**
مشكلة في إعدادات Resend.

**الحل:**

1. **تحقق من API Key**:

   ```bash
   Vercel → Environment Variables → RESEND_API_KEY
   # يجب أن يبدأ بـ: re_
   ```

2. **تحقق من البريد المرسل**:

   ```bash
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   # يجب أن يكون domain مفعّل في Resend
   ```

3. **فعّل Domain في Resend**:

   ```
   Resend Dashboard → Domains → Add Domain
   أضف DNS Records حسب التعليمات
   ```

4. **اختبر الإرسال**:
   ```bash
   # في Resend Dashboard → API Keys → Test
   curl -X POST https://api.resend.com/emails \
     -H "Authorization: Bearer re_xxx" \
     -H "Content-Type: application/json" \
     -d '{"from":"test@yourdomain.com","to":"you@example.com","subject":"Test","html":"Hello"}'
   ```

---

## 📁 أخطاء تخزين الملفات

### ❌ خطأ: "Failed to upload file to S3"

**الأعراض:**

```
Error: Access Denied
Error: SignatureDoesNotMatch
Cannot upload files
```

**السبب:**
مشكلة في إعدادات AWS S3.

**الحل:**

1. **تحقق من Credentials**:

   ```bash
   AWS_ACCESS_KEY_ID=AKIA...
   AWS_SECRET_ACCESS_KEY=...
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=your-bucket-name
   ```

2. **تحقق من IAM Permissions**:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject"],
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

3. **تحقق من Bucket Policy**:
   - Bucket يجب أن لا يكون public
   - استخدم Presigned URLs

---

## 🚀 نصائح متقدمة

### تفعيل الـ Debug Logs

```bash
# في Vercel Environment Variables
Key: DEBUG
Value: *

# أو أكثر تحديداً
Key: DEBUG
Value: trpc:*,express:*
```

### استخدام Vercel CLI للـ Debugging

```bash
# ثبّت Vercel CLI
npm install -g vercel

# سجّل دخول
vercel login

# اربط المشروع
vercel link

# شاهد السجلات مباشرة
vercel logs --follow

# جرّب محلياً بنفس بيئة Vercel
vercel dev
```

### فحص Function Logs

```bash
1. Vercel Dashboard → Deployments
2. اختر أحدث Deployment
3. انقر على Function
4. شاهد Real-time Logs
```

### اختبار Build محلياً

```bash
# ثبّت vercel
npm install -g vercel

# شغّل build محلياً
vercel build

# شغّل المشروع المبني
vercel dev --prod
```

---

## 🆘 الحصول على المساعدة

إذا لم تحل المشكلة بعد كل هذه الخطوات:

### 1. جمع المعلومات

```bash
✅ وصف المشكلة بالتفصيل
✅ رسالة الخطأ الكاملة
✅ Build Logs من Vercel
✅ Function Logs من Vercel
✅ لقطة شاشة للخطأ
✅ المتغيرات البيئية (بدون القيم السرية!)
```

### 2. التواصل مع الدعم

```bash
📧 البريد: info@rabithr.com
📱 الجوال: 0570700355
🌐 الموقع: rabit.sa

# أو افتح Issue على GitHub
```

### 3. مصادر إضافية

```bash
📚 Vercel Docs: vercel.com/docs
📚 Railway Docs: docs.railway.app
📚 Drizzle ORM Docs: orm.drizzle.team
📚 tRPC Docs: trpc.io/docs
```

---

## ✅ Checklist استكشاف الأخطاء

عند مواجهة أي مشكلة، اتبع هذا الترتيب:

- [ ] 1. اقرأ رسالة الخطأ بالكامل
- [ ] 2. ابحث عن الخطأ في هذا الملف
- [ ] 3. تحقق من Build Logs في Vercel
- [ ] 4. تحقق من Function Logs في Vercel
- [ ] 5. تحقق من المتغيرات البيئية
- [ ] 6. جرّب البناء محلياً: `pnpm build`
- [ ] 7. جرّب التشغيل محلياً: `pnpm dev`
- [ ] 8. امسح Cache وأعد البناء
- [ ] 9. تحقق من قاعدة البيانات في Railway
- [ ] 10. اقرأ الوثائق الرسمية
- [ ] 11. ابحث في Google عن رسالة الخطأ
- [ ] 12. اتصل بالدعم

---

<div align="center">

**💡 تذكّر: معظم المشاكل سببها متغيرات البيئة!**

تحقق دائماً من Environment Variables أولاً 🔐

**صُنع بـ ❤️ في المملكة العربية السعودية 🇸🇦**

</div>

</div>
