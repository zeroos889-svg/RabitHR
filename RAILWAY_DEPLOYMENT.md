# 🚂 نشر RabitHR على Railway

## نظرة سريعة

يتم نشر الـ Backend بالكامل على Railway، بما في ذلك Express server وقاعدة البيانات.

## 📋 متطلبات النشر

### 1. حساب Railway

- سجل في [railway.app](https://railway.app)
- اربط حساب GitHub الخاص بك

### 2. إنشاء مشروع جديد

```bash
# من خلال Railway Dashboard
1. New Project
2. Deploy from GitHub repo
3. اختر مستودع zeroos889-svg/RabitHR
4. اختر فرع main
```

### 3. إضافة قاعدة بيانات MySQL

```bash
# في Railway Dashboard
1. انقر على "+ New"
2. اختر "Database"
3. اختر "MySQL"
4. سيتم توليد DATABASE_URL تلقائياً
```

### 4. إعداد متغيرات البيئة

في Railway Dashboard > Variables، أضف المتغيرات التالية:

#### ✅ متغيرات مطلوبة

```env
# Node Environment
NODE_ENV=production

# Database (يتم توليده تلقائياً عند إضافة MySQL)
DATABASE_URL=${{MySQL.DATABASE_URL}}

# JWT & Sessions
JWT_SECRET=<generate-using-openssl-rand-base64-32>
SESSION_SECRET=<generate-random-secret>
SESSION_MAX_AGE=604800000

# Admin User (للإعداد الأولي)
ADMIN_EMAIL=admin@rabit.sa
ADMIN_PASSWORD=<secure-password>

# Application
PORT=3000
```

#### 🔧 متغيرات اختيارية

```env
# Redis Cache (للأداء الأفضل)
REDIS_URL=redis://default:password@redis.railway.internal:6379

# AWS S3 Storage
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=rabithr-storage

# Email Service (Resend)
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=noreply@rabit.sa

# SMS Services
SMS_API_KEY=your-sms-api-key
SMS_SENDER_ID=Rabit

# Payment Gateways
MOYASAR_API_KEY=your-moyasar-key
MOYASAR_SECRET_KEY=your-moyasar-secret
TAP_API_KEY=your-tap-key

# Monitoring (Sentry)
SENTRY_DSN=your-sentry-dsn
```

## 🚀 النشر

### نشر تلقائي

Railway يقوم بالنشر التلقائي عند كل push إلى GitHub:

```bash
git push origin main
# Railway سيكتشف التغييرات ويبدأ النشر تلقائياً
```

### نشر يدوي

من Railway Dashboard:

1. اذهب إلى Deployments
2. انقر على "Deploy"

## 📊 المراقبة

### الوصول إلى Logs

```bash
# من Railway Dashboard
1. اذهب إلى مشروعك
2. انقر على service
3. اذهب إلى "Logs" tab
```

### المقاييس

Railway يوفر مقاييس تلقائية:

- CPU Usage
- Memory Usage
- Network Traffic
- Response Times

## 🔧 الصيانة

### تحديث التطبيق

```bash
# تحديث الكود
git pull origin main
git add .
git commit -m "Update application"
git push origin main
```

### تشغيل Migrations

```bash
# Railway يقوم بتشغيل migrations تلقائياً عند البدء
# إذا احتجت تشغيلها يدوياً:
railway run pnpm db:push
```

### إعادة التشغيل

من Railway Dashboard:

1. انقر على service
2. انقر على "..." (More options)
3. اختر "Restart"

## 🌐 الربط مع Vercel Frontend

### 1. احصل على Railway URL

```bash
# من Railway Dashboard
1. انقر على service
2. اذهب إلى "Settings"
3. انسخ "Public URL"
# مثال: https://rabithr-backend-production.up.railway.app
```

### 2. حدّث Vercel Configuration

```bash
# في vercel.json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://rabithr-backend-production.up.railway.app/api/:path*"
    }
  ]
}
```

### 3. أضف متغيرات البيئة في Vercel

```env
VITE_API_URL=https://rabithr-backend-production.up.railway.app
```

## ❗ استكشاف الأخطاء

### المشكلة: البناء يفشل

**الحل**:

1. تحقق من logs في Railway Dashboard
2. تأكد من أن `pnpm-lock.yaml` موجود في المستودع
3. تأكد من أن `railway.json` موجود

### المشكلة: قاعدة البيانات لا تتصل

**الحل**:

1. تحقق من `DATABASE_URL` في Variables
2. تأكد من أن MySQL service يعمل
3. تحقق من أن SSL معطل في الاتصال (Railway MySQL لا يحتاج SSL)

### المشكلة: خطأ في الذاكرة

**الحل**:

1. ترقية Railway plan للحصول على ذاكرة أكبر
2. تحسين استعلامات قاعدة البيانات
3. استخدام Redis caching

## 💰 التكلفة

Railway يقدم:

- **Developer Plan**: $5/month
- **Team Plan**: $20/month
- **استخدام مجاني**: $5 credit شهرياً

### تقدير التكلفة الشهرية

- Backend Service: ~$3-5
- MySQL Database: ~$2-3
- Redis (اختياري): ~$1-2
- **المجموع**: ~$6-10/month

## 📚 مصادر إضافية

- [Railway Documentation](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- ملف `.env.example` - جميع المتغيرات المطلوبة
- `DEPLOYMENT_ARCHITECTURE.md` - نظرة عامة على المعمارية
