# ▲ نشر Frontend على Vercel

## نظرة سريعة

يتم نشر الـ Frontend فقط (مجلد `client/`) على Vercel كتطبيق React ثابت.

## 📋 متطلبات النشر

### 1. حساب Vercel
- سجل في [vercel.com](https://vercel.com)
- اربط حساب GitHub الخاص بك

### 2. استيراد المشروع

```bash
# من خلال Vercel Dashboard
1. انقر على "Add New" > "Project"
2. اختر مستودع zeroos889-svg/RabitHR
3. Vercel سيكتشف إعدادات Vite تلقائياً
```

## ⚙️ إعدادات المشروع

### Build & Output Settings
```
Framework Preset: Vite
Build Command: pnpm vercel-build
Output Directory: dist/public
Install Command: pnpm install
```

### Root Directory
```
. (root)
```

## 🔐 متغيرات البيئة

في Vercel Dashboard > Settings > Environment Variables، أضف:

### ✅ متغيرات مطلوبة

```env
# Frontend URL (يتم توليده تلقائياً من Vercel)
VITE_APP_URL=https://your-app.vercel.app

# Backend API URL (من Railway)
VITE_API_URL=https://rabithr-backend-production.up.railway.app

# Application Info
VITE_APP_TITLE=رابِط - منصة إدارة الموارد البشرية
VITE_APP_LOGO=/logo.png
```

### 🔧 متغيرات اختيارية

```env
# Analytics
VITE_ANALYTICS_ENDPOINT=your-analytics-endpoint
VITE_ANALYTICS_WEBSITE_ID=your-website-id

# Error Tracking (Sentry)
VITE_SENTRY_DSN=your-sentry-dsn
```

## 🚀 النشر

### نشر تلقائي
Vercel يقوم بالنشر التلقائي:
- **Production**: عند push إلى `main`
- **Preview**: عند إنشاء Pull Request

```bash
git push origin main
# Vercel سيكتشف التغييرات ويبدأ النشر
```

### نشر يدوي
```bash
# باستخدام Vercel CLI
npm i -g vercel
vercel --prod
```

## 🔄 إعدادات Proxy (API Routing)

ملف `vercel.json` يحتوي على rewrites للـ API:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-railway-backend.railway.app/api/:path*"
    },
    {
      "source": "/trpc/:path*",
      "destination": "https://your-railway-backend.railway.app/api/trpc/:path*"
    }
  ]
}
```

**⚠️ مهم**: قم بتحديث URL في `vercel.json` بعد نشر Backend على Railway!

## 🔒 رؤوس الأمان

Vercel يطبق رؤوس الأمان التالية تلقائياً (من `vercel.json`):

- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-Frame-Options: DENY`
- ✅ `X-XSS-Protection: 1; mode=block`
- ✅ `Strict-Transport-Security: max-age=31536000`
- ✅ `Content-Security-Policy: ...`
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`

## 📊 الأداء

### تحسينات تلقائية من Vercel
- ✅ Edge Network (CDN عالمي)
- ✅ Automatic Compression (Gzip/Brotli)
- ✅ Smart Caching
- ✅ Image Optimization
- ✅ HTTP/2 & HTTP/3

### تحسينات في الكود
- ✅ Code Splitting (React, UI components, Charts)
- ✅ Lazy Loading للمكونات الكبيرة
- ✅ Asset Caching (1 year للـ assets)

## 🌐 النطاقات المخصصة

### إضافة نطاق مخصص

```bash
# من Vercel Dashboard
1. اذهب إلى Settings > Domains
2. أضف نطاقك (مثال: app.rabit.sa)
3. أضف DNS records حسب التعليمات:
   - Type: A
   - Name: @
   - Value: 76.76.21.21
   
   أو CNAME:
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com
```

### تحديث متغيرات البيئة
بعد إضافة النطاق المخصص، حدّث:
```env
VITE_APP_URL=https://app.rabit.sa
```

## 📱 Preview Deployments

كل Pull Request يحصل على preview URL فريد:
```
https://rabithr-pr-123.vercel.app
```

يمكنك اختبار التغييرات قبل الدمج في main.

## 🔍 المراقبة

### Vercel Analytics
```bash
# تفعيل في Dashboard
1. اذهب إلى Analytics
2. انقر على "Enable Analytics"
```

### الـ Logs
```bash
# عرض deployment logs
1. اذهب إلى Deployments
2. انقر على deployment
3. اذهب إلى "Logs" tab
```

## ❗ استكشاف الأخطاء

### المشكلة: Build يفشل
**الحل**:
```bash
# تحقق محلياً
pnpm install
pnpm check        # TypeScript check
pnpm vercel-build # Build

# إذا نجح محلياً، تحقق من:
1. Environment Variables في Vercel
2. Build logs في Vercel Dashboard
```

### المشكلة: API calls تفشل
**الحل**:
1. تحقق من `VITE_API_URL` في Environment Variables
2. تأكد من أن Railway backend يعمل
3. تحقق من CORS settings في Backend
4. تحقق من rewrites في `vercel.json`

### المشكلة: Assets لا تحمّل
**الحل**:
1. تأكد من `outputDirectory: dist/public` في settings
2. تحقق من مسارات الملفات في الكود
3. تحقق من build logs

## 🔄 التكامل مع Railway

### خطوات الربط الكامل

1. **نشر Backend على Railway أولاً**
   - اتبع تعليمات `RAILWAY_DEPLOYMENT.md`
   - احصل على Railway URL

2. **تحديث vercel.json**
   ```json
   {
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "https://your-railway-url.railway.app/api/:path*"
       }
     ]
   }
   ```

3. **إضافة متغيرات البيئة في Vercel**
   ```env
   VITE_API_URL=https://your-railway-url.railway.app
   ```

4. **اختبار الاتصال**
   ```bash
   # افتح Frontend URL
   # تحقق من Console للأخطاء
   # جرّب تسجيل الدخول
   ```

## 💰 التكلفة

Vercel يقدم:
- **Hobby Plan**: مجاني
  - Unlimited deployments
  - 100 GB bandwidth/month
  - Automatic HTTPS

- **Pro Plan**: $20/month
  - Unlimited bandwidth
  - Advanced analytics
  - Password protection

### للاستخدام الشخصي أو الشركات الصغيرة
**Hobby Plan** كافٍ تماماً! 🎉

## 🎯 نصائح للأداء الأفضل

1. **استخدم Edge Config للإعدادات الديناميكية**
2. **فعّل Vercel Analytics للمراقبة**
3. **استخدم Image Optimization API**
4. **راقب Core Web Vitals**

## 📚 مصادر إضافية

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- `DEPLOYMENT_ARCHITECTURE.md` - نظرة عامة على المعمارية
- `vercel.json` - ملف التكوين الكامل
