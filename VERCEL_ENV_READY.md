# ⚡ متغيرات البيئة الجاهزة لـ Vercel

## 🎯 نسخ ولصق مباشر

استخدم هذه المتغيرات في Vercel Dashboard → Settings → Environment Variables

---

## ✅ المتغيرات الأساسية (مطلوبة)

انسخ والصق كل سطر في Vercel:

### 1. NODE_ENV
```
production
```

### 2. DATABASE_URL

**اختر واحدة من الخيارات التالية:**

#### الخيار 1: Railway MySQL (موصى به - جاهز للاستخدام)
```
mysql://root:<RAILWAY_PASSWORD>@shortline.proxy.rlwy.net:18829/railway
```

#### الخيار 2: TiDB Cloud (للمشاريع الكبيرة)
⚠️ **مهم**: استبدل `<PASSWORD>` بكلمة المرور من TiDB Dashboard
```
mysql://3aDHzR1a2i2PxnQ.root:<PASSWORD>@gateway01.eu-central-1.prod.aws.tidbcloud.com:4000/test
```

📚 **للمقارنة**: راجع [DATABASE_OPTIONS.md](./DATABASE_OPTIONS.md)

### 3. JWT_SECRET
⚠️ **مهم**: أنشئ مفتاح قوي خاص بك!

لإنشاء مفتاح:
```bash
openssl rand -base64 32
```

أو استخدم هذا المفتاح التجريبي (غيّره لاحقاً):
```
rabit-hr-jwt-secret-key-2025-change-this-in-production-now
```

### 4. SESSION_SECRET
```
rabit-hr-session-secret-key-2025-change-this-later
```

### 5. VITE_APP_TITLE
```
رابِط - منصة إدارة الموارد البشرية
```

### 6. VITE_APP_LOGO
```
/logo.png
```

### 7. VITE_APP_URL
⚠️ سنحدثه بعد النشر الأول
```
https://your-vercel-app.vercel.app
```

---

## 📋 جدول المتغيرات (للنسخ السريع)

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | `[اختر من الخيارين أدناه]` |
| `JWT_SECRET` | `[أنشئ مفتاحك الخاص]` |
| `SESSION_SECRET` | `[أنشئ مفتاحك الخاص]` |
| `VITE_APP_TITLE` | `رابِط - منصة إدارة الموارد البشرية` |
| `VITE_APP_LOGO` | `/logo.png` |
| `VITE_APP_URL` | `[سيتم تحديثه بعد النشر]` |

---

## ⭐ متغيرات اختيارية (للميزات المتقدمة)

### Redis (للأداء الأفضل)
إذا أنشأت Redis في Railway، أضف:
```
Key: REDIS_URL
Value: redis://default:password@redis.railway.internal:6379
```

### OpenAI (للذكاء الاصطناعي)
للحصول على مولد الخطابات والمساعد الذكي:
```
Key: OPENAI_API_KEY
Value: sk-your-openai-api-key-here
```

### Resend (للبريد الإلكتروني)
```
Key: RESEND_API_KEY
Value: re_your_resend_api_key

Key: RESEND_FROM_EMAIL
Value: noreply@yourdomain.com
```

### AWS S3 (لتخزين الملفات)
```
Key: AWS_ACCESS_KEY_ID
Value: your_access_key_id

Key: AWS_SECRET_ACCESS_KEY
Value: your_secret_access_key

Key: AWS_REGION
Value: us-east-1

Key: AWS_S3_BUCKET
Value: rabithr-storage
```

### Sentry (لتتبع الأخطاء)
```
Key: VITE_SENTRY_DSN
Value: https://your-sentry-dsn

Key: SENTRY_AUTH_TOKEN
Value: your_sentry_token
```

---

## 🔐 أمان: إنشاء مفاتيح قوية

### لـ JWT_SECRET و SESSION_SECRET:

#### الطريقة 1: OpenSSL (الأفضل)
```bash
openssl rand -base64 32
```

#### الطريقة 2: Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### الطريقة 3: Python
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

#### الطريقة 4: موقع إلكتروني
اذهب إلى: https://generate-secret.vercel.app

---

## 📝 خطوات الإضافة في Vercel

### الطريقة المرئية (GUI):

1. **افتح مشروعك** في Vercel Dashboard
2. **اذهب إلى** Settings → Environment Variables
3. **لكل متغير:**
   - في **Key**: اكتب اسم المتغير (مثل: `DATABASE_URL`)
   - في **Value**: الصق القيمة
   - في **Environments**: اختر `Production`, `Preview`, `Development`
   - انقر **Add**

### الطريقة السريعة (CLI):

```bash
# ثبّت Vercel CLI
npm i -g vercel

# سجّل دخول
vercel login

# اربط المشروع
vercel link

# أضف المتغيرات
vercel env add NODE_ENV production
# للخيار 1: Railway
vercel env add DATABASE_URL "mysql://root:<RAILWAY_PASSWORD>@shortline.proxy.rlwy.net:18829/railway"

# أو للخيار 2: TiDB
vercel env add DATABASE_URL "mysql://3aDHzR1a2i2PxnQ.root:YOUR_PASSWORD@gateway01.eu-central-1.prod.aws.tidbcloud.com:4000/test"
vercel env add JWT_SECRET "your-secret-here"
# ... بقية المتغيرات
```

---

## ✅ قائمة التحقق

قبل النشر، تأكد من:

- [ ] أضفت `NODE_ENV=production`
- [ ] أضفت `DATABASE_URL` الصحيح
- [ ] أنشأت `JWT_SECRET` قوي (32+ حرف)
- [ ] أنشأت `SESSION_SECRET` قوي
- [ ] أضفت `VITE_APP_TITLE`
- [ ] أضفت `VITE_APP_LOGO`
- [ ] جهزت `VITE_APP_URL` للتحديث بعد النشر
- [ ] اخترت جميع Environments (Production, Preview, Development)

---

## 🔄 بعد النشر الأول

### حدّث VITE_APP_URL:

1. انسخ رابط المشروع من Vercel (مثل: `https://rabit-hr-abc123.vercel.app`)
2. اذهب إلى **Settings → Environment Variables**
3. ابحث عن `VITE_APP_URL`
4. انقر **Edit**
5. غيّر القيمة إلى الرابط الجديد
6. احفظ
7. اذهب إلى **Deployments** → انقر على آخر نشر → **Redeploy**

---

## 🎯 أولويات الإضافة

### المرحلة 1: الأساسيات (للبدء)
```
✅ NODE_ENV
✅ DATABASE_URL
✅ JWT_SECRET
✅ SESSION_SECRET
✅ VITE_APP_TITLE
✅ VITE_APP_LOGO
✅ VITE_APP_URL
```

### المرحلة 2: تحسين الأداء
```
⭐ REDIS_URL (يحسّن السرعة 70%)
```

### المرحلة 3: الميزات الذكية
```
🤖 OPENAI_API_KEY (مولد الخطابات + المساعد الذكي)
```

### المرحلة 4: الإشعارات
```
📧 RESEND_API_KEY + RESEND_FROM_EMAIL
📱 SMS_API_KEY + SMS_SENDER_ID
```

### المرحلة 5: التخزين والمراقبة
```
☁️ AWS_* (تخزين الملفات)
🔍 VITE_SENTRY_DSN (تتبع الأخطاء)
```

---

## 🆘 مشاكل شائعة

### المشكلة: المتغيرات لا تعمل
**الحل:**
- تأكد من اختيار جميع Environments
- أعد النشر (Redeploy) بعد إضافة المتغيرات
- المتغيرات التي تبدأ بـ `VITE_` تحتاج Redeploy

### المشكلة: قاعدة البيانات لا تتصل
**الحل:**
- تحقق من عدم وجود مسافات في `DATABASE_URL`
- تأكد من أن الرابط يبدأ بـ `mysql://`
- جرّب الاتصال من Railway Dashboard أولاً

---

## 📚 المراجع

- [VERCEL_SETUP_WITH_DATABASE.md](./VERCEL_SETUP_WITH_DATABASE.md) - دليل تفصيلي
- [VERCEL_SETUP.md](./VERCEL_SETUP.md) - الدليل الكامل
- [VERCEL_QUICKSTART_AR.md](./VERCEL_QUICKSTART_AR.md) - البدء السريع

---

<div align="center">

**🚀 جاهز للنشر؟ ابدأ الآن! 🚀**

</div>
