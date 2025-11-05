# 🚂 متغيرات Railway - الواجهة الخلفية (Backend)

## نظرة عامة
Railway تستضيف **الواجهة الخلفية (Backend API)** للتطبيق. يجب إضافة هذه المتغيرات في:
```
Railway Dashboard → Your Project → Variables
```

---

## ✅ المتغيرات المطلوبة (Required)

### 🗄️ قاعدة البيانات
```env
DATABASE_URL=mysql://user:password@host:port/database
```
**كيفية الحصول عليها:**
- إذا كنت تستخدم Railway MySQL: انسخها من Railway MySQL Service
- إذا كنت تستخدم TiDB Cloud: انسخها من TiDB Dashboard
- **مثال:** `mysql://root:password@containers-us-west-123.railway.app:5432/railway`

### 🔒 الأمان
```env
JWT_SECRET=your-super-secure-jwt-secret-min-32-chars
SESSION_SECRET=your-super-secure-session-secret
```
**كيفية إنشائها:**
```bash
openssl rand -base64 32
```
⚠️ **مهم:** غير القيم الافتراضية في الإنتاج!

### 👤 المدير الأول
```env
ADMIN_EMAIL=admin@rabit.sa
ADMIN_PASSWORD=SecurePassword123!
```
**ملاحظة:** غير كلمة المرور بعد أول تسجيل دخول

---

## 🎨 المتغيرات الموصى بها (Recommended)

### 🌐 إعدادات التطبيق
```env
NODE_ENV=production
PORT=3000
SESSION_MAX_AGE=604800000
```

### 🔗 عناوين URL
```env
VITE_APP_URL=https://your-app.vercel.app
VITE_API_URL=https://your-backend.railway.app
```
**ملاحظة:** استبدل بعناوين النشر الفعلية

---

## 📧 خدمات البريد الإلكتروني (اختر واحدة)

### الخيار 1: Resend (موصى به) ⭐
```env
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@rabit.sa
```
**احصل على المفتاح من:** https://resend.com/api-keys

### الخيار 2: SMTP
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@rabit.sa
```

---

## 🚀 Redis (موصى به للأداء)
```env
REDIS_URL=redis://default:password@host:port
```
**كيفية الحصول عليه:**
- أضف Redis Service في Railway
- انسخ `REDIS_URL` من Railway Redis Dashboard

---

## 💳 بوابات الدفع (اختياري)

### Moyasar
```env
MOYASAR_API_KEY=your_moyasar_api_key
MOYASAR_SECRET_KEY=your_moyasar_secret_key
MOYASAR_WEBHOOK_SECRET=your_webhook_secret
```

### Tap Payments
```env
TAP_API_KEY=your_tap_api_key
TAP_SECRET_KEY=your_tap_secret_key
```

---

## ☁️ التخزين السحابي (اختياري)

### AWS S3
```env
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
AWS_S3_BUCKET=rabithr-storage
```
**احصل عليها من:** AWS IAM Console

---

## 💬 الرسائل النصية SMS (اختياري)

### Unifonic (السعودية)
```env
UNIFONIC_APP_SID=your_unifonic_app_sid
SMS_SENDER_ID=Rabit
```

### Twilio
```env
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_AUTH_TOKEN=your_twilio_auth_token
SMS_API_KEY=your_sms_api_key
```

---

## 🤖 الذكاء الاصطناعي (اختياري)
```env
OPENAI_API_KEY=sk-your_openai_api_key
```
**احصل عليه من:** https://platform.openai.com/api-keys

---

## 🗺️ خرائط جوجل (اختياري)
```env
GOOGLE_MAPS_API_KEY=AIzaSy...
```
**احصل عليه من:** Google Cloud Console

---

## 🔧 Forge Storage API (اختياري)
```env
BUILT_IN_FORGE_API_URL=https://your-forge-api.com
BUILT_IN_FORGE_API_KEY=your_forge_api_key
```

---

## 📊 تتبع الأخطاء (اختياري)
```env
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

---

## 📋 كيفية إضافة المتغيرات في Railway

### الطريقة 1: من Dashboard
1. افتح مشروعك في Railway
2. اذهب إلى **Variables** tab
3. اضغط **+ New Variable**
4. أضف الاسم والقيمة
5. اضغط **Add**

### الطريقة 2: من CLI
```bash
railway variables set DATABASE_URL="mysql://..."
railway variables set JWT_SECRET="your-secret"
railway variables set ADMIN_EMAIL="admin@rabit.sa"
```

### الطريقة 3: استيراد من ملف
```bash
railway variables set --file .env.production
```

---

## ⚠️ ملاحظات مهمة

1. **لا تضع متغيرات VITE_* في Railway** - هذه للواجهة الأمامية فقط (Vercel)
2. **استخدم قيم آمنة** - لا تستخدم القيم الافتراضية في الإنتاج
3. **Redis اختياري** لكنه يحسن الأداء بشكل كبير
4. **Redeploy بعد التغيير** - Railway سيعيد النشر تلقائياً بعد تغيير المتغيرات

---

## ✅ قائمة التحقق السريعة

**المتغيرات الضرورية (لا يعمل بدونها):**
- [ ] `DATABASE_URL`
- [ ] `JWT_SECRET`
- [ ] `SESSION_SECRET`
- [ ] `ADMIN_EMAIL`
- [ ] `ADMIN_PASSWORD`

**المتغيرات الموصى بها:**
- [ ] `NODE_ENV=production`
- [ ] `REDIS_URL`
- [ ] `RESEND_API_KEY` أو `SMTP_*`
- [ ] `VITE_APP_URL`

**المتغيرات الاختيارية (حسب الحاجة):**
- [ ] Payment Gateways
- [ ] AWS S3
- [ ] SMS Services
- [ ] OpenAI
- [ ] Google Maps

---

## 🔗 روابط مفيدة
- [Railway Documentation](https://docs.railway.app/)
- [Environment Variables Guide](https://docs.railway.app/deploy/variables)
