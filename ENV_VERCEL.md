# ▲ متغيرات Vercel - الواجهة الأمامية (Frontend)

## نظرة عامة

Vercel تستضيف **الواجهة الأمامية (Frontend)** للتطبيق. يجب إضافة هذه المتغيرات في:

```
Vercel Dashboard → Your Project → Settings → Environment Variables
```

---

## ✅ المتغيرات المطلوبة (Required)

### 🌐 عناوين URL

```env
VITE_APP_URL=https://your-app.vercel.app
VITE_API_URL=https://your-backend.railway.app
```

**ملاحظات:**

- `VITE_APP_URL` = رابط تطبيق Vercel الخاص بك
- `VITE_API_URL` = رابط Backend في Railway
- استبدلهما بالعناوين الفعلية بعد النشر

---

## 🎨 المتغيرات الموصى بها (Recommended)

### 📱 إعدادات التطبيق

```env
NODE_ENV=production
VITE_APP_TITLE=رابِط - منصة إدارة الموارد البشرية
VITE_APP_LOGO=/logo.png
```

---

## 📊 التحليلات والمراقبة (اختياري)

### Analytics

```env
VITE_ANALYTICS_ENDPOINT=https://your-analytics-endpoint.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

### Sentry (تتبع الأخطاء)

```env
VITE_SENTRY_DSN=https://your-key@o123456.ingest.sentry.io/123456
VITE_SENTRY_DEBUG=false
```

**احصل على DSN من:** https://sentry.io/settings/projects/

---

## 🗺️ خرائط (اختياري)

### Forge API للخرائط

```env
VITE_FRONTEND_FORGE_API_URL=https://forge.butterfly-effect.dev
VITE_FRONTEND_FORGE_API_KEY=your_frontend_forge_api_key
```

**ملاحظة:** هذه المتغيرات للواجهة الأمامية فقط (للخرائط)

---

## 🔐 OAuth (اختياري)

```env
VITE_OAUTH_PORTAL_URL=https://your-oauth-portal.com
VITE_APP_ID=your-app-id
```

---

## 📋 كيفية إضافة المتغيرات في Vercel

### الطريقة 1: من Dashboard (موصى بها)

1. افتح مشروعك في Vercel
2. اذهب إلى **Settings** → **Environment Variables**
3. أضف كل متغير:
   - **Key**: اسم المتغير (مثل `VITE_APP_URL`)
   - **Value**: القيمة
   - **Environment**: اختر `Production`, `Preview`, `Development` حسب الحاجة
4. اضغط **Save**

### الطريقة 2: من CLI

```bash
# تسجيل الدخول
vercel login

# إضافة متغيرات
vercel env add VITE_APP_URL production
vercel env add VITE_API_URL production
vercel env add VITE_APP_TITLE production
```

### الطريقة 3: استيراد من ملف

```bash
vercel env pull .env.local
# ثم عدل الملف وارفعه
vercel env push .env.local
```

---

## 🎯 تكوين حسب البيئة

### Production

```env
NODE_ENV=production
VITE_APP_URL=https://rabit-hr.vercel.app
VITE_API_URL=https://rabithr-backend.railway.app
VITE_APP_TITLE=رابِط - منصة إدارة الموارد البشرية
VITE_SENTRY_DSN=https://your-key@sentry.io/project-id
```

### Preview (للمراجعة)

```env
NODE_ENV=production
VITE_APP_URL=https://your-app-git-branch.vercel.app
VITE_API_URL=https://rabithr-backend.railway.app
VITE_APP_TITLE=رابِط - Preview
```

### Development (محلي)

```env
NODE_ENV=development
VITE_APP_URL=http://localhost:3000
VITE_API_URL=http://localhost:3000
VITE_SENTRY_DEBUG=true
```

---

## ⚠️ ملاحظات مهمة

### ✅ افعل:

1. **استخدم VITE\_ فقط** - جميع المتغيرات في Vercel يجب أن تبدأ بـ `VITE_`
2. **أضف للبيئات الثلاث** - Production, Preview, Development
3. **لا تضع أسرار حساسة** - المتغيرات هنا مكشوفة في Frontend
4. **حدث VITE_API_URL** - بعد نشر Backend في Railway

### ❌ لا تفعل:

1. **لا تضع JWT_SECRET** - هذا للـ Backend فقط
2. **لا تضع DATABASE_URL** - هذا للـ Backend فقط
3. **لا تضع مفاتيح API حساسة** - Frontend مكشوف للعامة
4. **لا تنسى VITE\_** - المتغيرات بدون `VITE_` لن تعمل

---

## 🔄 بعد إضافة المتغيرات

### إعادة النشر

```bash
vercel --prod
```

أو من Dashboard:

1. اذهب إلى **Deployments**
2. اضغط **Redeploy** على آخر deployment
3. فعّل **Use existing Build Cache** إذا لم تغير الكود

---

## ✅ قائمة التحقق السريعة

**المتغيرات الضرورية (لا يعمل بدونها):**

- [ ] `VITE_APP_URL` (رابط Vercel الخاص بك)
- [ ] `VITE_API_URL` (رابط Railway Backend)

**المتغيرات الموصى بها:**

- [ ] `NODE_ENV=production`
- [ ] `VITE_APP_TITLE`
- [ ] `VITE_APP_LOGO`

**المتغيرات الاختيارية (حسب الحاجة):**

- [ ] `VITE_SENTRY_DSN` (تتبع الأخطاء)
- [ ] `VITE_ANALYTICS_*` (التحليلات)
- [ ] `VITE_FRONTEND_FORGE_API_*` (الخرائط)
- [ ] `VITE_OAUTH_*` (OAuth)

---

## 🔍 كيفية التحقق من المتغيرات

### في المتصفح:

```javascript
// افتح Console في المتصفح
console.log(import.meta.env.VITE_APP_URL);
console.log(import.meta.env.VITE_API_URL);
```

### في الكود:

```typescript
// client/src/test-env.ts
export function logEnvVars() {
  console.log("Environment Variables:");
  console.log("VITE_APP_URL:", import.meta.env.VITE_APP_URL);
  console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
  console.log("VITE_APP_TITLE:", import.meta.env.VITE_APP_TITLE);
}
```

---

## 🆘 مشاكل شائعة

### المشكلة: المتغيرات غير محددة (undefined)

**الحل:**

1. تأكد أن المتغير يبدأ بـ `VITE_`
2. أعد نشر التطبيق بعد إضافة المتغيرات
3. امسح Build Cache وأعد البناء

### المشكلة: API لا يعمل

**الحل:**

1. تحقق من `VITE_API_URL` صحيح
2. تأكد أن Backend في Railway يعمل
3. افحص CORS settings في Backend

### المشكلة: الصور/الشعار لا يظهر

**الحل:**

1. تأكد أن `VITE_APP_LOGO` يشير لمسار صحيح
2. الملف موجود في `client/public/`

---

## 📚 مثال كامل

```env
# Production Environment Variables for Vercel

# Required - Application URLs
VITE_APP_URL=https://rabit-hr.vercel.app
VITE_API_URL=https://rabithr-production.up.railway.app

# Required - Application Info
NODE_ENV=production
VITE_APP_TITLE=رابِط - منصة إدارة الموارد البشرية
VITE_APP_LOGO=/logo.png

# Optional - Error Tracking
VITE_SENTRY_DSN=https://abc123@o123456.ingest.sentry.io/123456
VITE_SENTRY_DEBUG=false

# Optional - Analytics
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id

# Optional - Maps (Forge API)
VITE_FRONTEND_FORGE_API_URL=https://forge.butterfly-effect.dev
VITE_FRONTEND_FORGE_API_KEY=your_forge_frontend_key
```

---

## 🔗 روابط مفيدة

- [Vercel Documentation](https://vercel.com/docs)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
