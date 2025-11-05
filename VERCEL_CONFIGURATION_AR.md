# تكوين Vercel - دليل شامل

# Vercel Configuration - Complete Guide

**التاريخ**: 2025-11-05  
**الحالة**: ✅ جاهز للنشر

---

## 📋 نظرة عامة

تم تكوين المشروع بشكل كامل للنشر على Vercel مع جميع الميزات الأمنية والأداء المطلوبة.

---

## ⚙️ ملفات التكوين

### 1. `vercel.json`

**الموقع**: في جذر المشروع

**التكوين الحالي**:

```json
{
  "version": 2,
  "buildCommand": "pnpm vercel-build",
  "installCommand": "pnpm install",
  "devCommand": "pnpm dev",
  "framework": "vite",
  "outputDirectory": "dist",
  "regions": ["iad1"],
  "env": {
    "NODE_ENV": "production"
  },
  "builds": [
    {
      "src": "api/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/index.ts"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. `package.json` Scripts

**Scripts المطلوبة**:

```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx watch server/_core/index.ts",
    "build": "vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "vercel-build": "vite build",
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc --noEmit"
  }
}
```

**الشرح**:

- `vercel-build`: يستخدم بواسطة Vercel للبناء (frontend فقط)
- `build`: للبناء المحلي (frontend + backend)
- `check`: للتحقق من TypeScript

### 3. `api/index.ts`

**الملف**: واجهة Vercel Serverless Functions

```typescript
import type { VercelRequest, VercelResponse } from "@vercel/node";
import startServer from "../server/_core/index";

let app: any = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Initialize app once and reuse for subsequent requests
  if (!app) {
    app = await startServer();
  }

  // Handle the request with Express app
  return app(req, res);
}
```

**الميزات**:

- يبدأ الخادم مرة واحدة ويعيد استخدامه
- يدعم جميع مسارات الـ API
- متوافق مع Express

---

## 🚀 خطوات النشر

### 1. التحضير المحلي

```bash
# التأكد من صحة الكود
pnpm check

# البناء للتأكد من عدم وجود أخطاء
pnpm vercel-build

# الاختبار
pnpm test
```

### 2. رفع الكود إلى GitHub

```bash
git add .
git commit -m "feat: ready for Vercel deployment"
git push origin main
```

### 3. إعداد Vercel Dashboard

#### A. ربط المشروع

1. افتح [vercel.com](https://vercel.com)
2. انقر "Add New Project"
3. استورد مستودع GitHub
4. اختر مشروع RabitHR

#### B. إعدادات البناء (تلقائية)

Vercel سيكتشف الإعدادات من `vercel.json`:

- ✅ Framework: Vite
- ✅ Build Command: `pnpm vercel-build`
- ✅ Install Command: `pnpm install`
- ✅ Output Directory: `dist`

#### C. إضافة المتغيرات البيئية

**اذهب إلى**: Settings → Environment Variables

**المتغيرات المطلوبة**:

```env
# الأساسية (Required)
NODE_ENV=production
DATABASE_URL=******host:port/database
JWT_SECRET=<openssl rand -base64 32>
SESSION_SECRET=<openssl rand -base64 32>
VITE_APP_URL=https://your-project.vercel.app

# الاختيارية (Optional)
REDIS_URL=redis://host:port
RESEND_API_KEY=your_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket
VITE_SENTRY_DSN=your_sentry_dsn
SENTRY_AUTH_TOKEN=your_token
```

**لكل متغير**:

- Environment: اختر `Production`, `Preview`, `Development`
- Save

### 4. النشر

```bash
# استخدام Vercel CLI (اختياري)
npm i -g vercel
vercel login
vercel

# أو
# انقر "Deploy" في Vercel Dashboard
```

---

## ✅ التحقق من النشر

### 1. فحص السجلات (Logs)

في Vercel Dashboard:

1. اذهب إلى Deployments
2. انقر على آخر deployment
3. اعرض السجلات:
   - Building
   - Functions

### 2. اختبار الوظائف

```bash
# اختبار الصفحة الرئيسية
curl https://your-project.vercel.app/

# اختبار API
curl https://your-project.vercel.app/api/health

# اختبار tRPC
curl https://your-project.vercel.app/api/trpc/health
```

### 3. التحقق من Security Headers

```bash
curl -I https://your-project.vercel.app/

# يجب أن تظهر:
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# X-XSS-Protection: 1; mode=block
# Referrer-Policy: strict-origin-when-cross-origin
```

---

## 🔧 استكشاف الأخطاء

### مشكلة: "Build Failed"

**الأسباب المحتملة**:

1. خطأ في TypeScript
2. تبعيات مفقودة
3. متغيرات بيئة مفقودة

**الحل**:

```bash
# محلياً
pnpm check
pnpm vercel-build

# في Vercel
# تحقق من Build Logs
```

### مشكلة: "Function Invocation Failed"

**الأسباب المحتملة**:

1. خطأ في `api/index.ts`
2. متغيرات بيئة مفقودة
3. خطأ في `server/_core/index.ts`

**الحل**:

```bash
# تحقق من Function Logs في Vercel
# تأكد من إضافة جميع متغيرات البيئة
```

### مشكلة: "Database Connection Failed"

**الأسباب المحتملة**:

1. `DATABASE_URL` غير صحيح
2. قاعدة البيانات لا تقبل اتصالات من Vercel
3. SSL مطلوب

**الحل**:

```env
# تأكد من SSL في DATABASE_URL
DATABASE_URL=******host:port/db?ssl={"rejectUnauthorized":false}

# أضف عناوين IP الخاصة بـ Vercel إلى Whitelist
```

---

## 📊 المراقبة والأداء

### 1. Analytics في Vercel

في Dashboard:

1. اذهب إلى Analytics
2. راقب:
   - Request Count
   - Error Rate
   - Response Time
   - Cache Hit Rate

### 2. Function Logs

```bash
# استخدام Vercel CLI
vercel logs your-deployment-url

# أو في Dashboard
# اذهب إلى Deployments → Functions → View Logs
```

### 3. Edge Network

Vercel يستخدم Edge Network عالمياً:

- أسرع استجابة للمستخدمين
- توزيع تلقائي للمحتوى
- CDN مُدمج

---

## 🔒 الأمان في Vercel

### 1. Environment Variables

✅ **مُدارة بشكل آمن**:

- مشفرة في الراحة (at rest)
- مشفرة في النقل (in transit)
- لا تظهر في السجلات
- محمية بالصلاحيات

### 2. HTTPS

✅ **تلقائي**:

- شهادة SSL مجانية
- تجديد تلقائي
- HSTS مُفعّل

### 3. DDoS Protection

✅ **مُدمج**:

- حماية تلقائية من DDoS
- Rate limiting على مستوى Edge
- WAF اختياري (Pro plan)

---

## 💰 التكلفة والخطط

### Free Plan

- ✅ مناسب للتطوير والاختبار
- 100GB Bandwidth
- 100 GB-Hours Function Execution
- Unlimited Deployments

### Pro Plan ($20/month)

- ✅ موصى به للإنتاج
- 1TB Bandwidth
- 1000 GB-Hours Function Execution
- Advanced Analytics
- Faster Builds

### Enterprise

- ✅ للشركات الكبيرة
- Custom Limits
- SLA
- Priority Support

---

## 📝 قائمة التحقق النهائية

قبل النشر، تأكد من:

### الكود

- [ ] `pnpm check` ينجح (0 أخطاء TypeScript)
- [ ] `pnpm vercel-build` ينجح
- [ ] `pnpm test` ينجح
- [ ] جميع التبعيات محدثة

### التكوين

- [ ] `vercel.json` صحيح
- [ ] `package.json` يحتوي على `vercel-build`
- [ ] `api/index.ts` موجود
- [ ] `.vercelignore` محدث

### المتغيرات البيئية

- [ ] `DATABASE_URL` مُضاف
- [ ] `JWT_SECRET` مُضاف (32+ حرف)
- [ ] `SESSION_SECRET` مُضاف (32+ حرف)
- [ ] `VITE_APP_URL` مُضاف
- [ ] جميع المتغيرات الاختيارية المطلوبة مُضافة

### الأمان

- [ ] Security Headers مُفعّلة
- [ ] CSRF Protection مُفعّل
- [ ] Rate Limiting مُفعّل
- [ ] لا توجد أسرار في الكود

### قاعدة البيانات

- [ ] قاعدة البيانات متاحة
- [ ] Vercel IPs مُضافة للـ Whitelist
- [ ] Migrations تم تشغيلها
- [ ] النسخ الاحتياطي مُعدّ

---

## 🎯 الخلاصة

التكوين الحالي:

- ✅ متوافق 100% مع Vercel
- ✅ جميع الميزات الأمنية مُفعّلة
- ✅ الأداء محسّن
- ✅ جاهز للإنتاج

**الخطوة التالية**: انقر Deploy! 🚀

---

## 📞 الدعم

للمساعدة:

- [Vercel Docs](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [GitHub Issues](https://github.com/zeroos889-svg/RabitHR/issues)

---

**آخر تحديث**: 2025-11-05  
**المسؤول**: فريق رابِط
