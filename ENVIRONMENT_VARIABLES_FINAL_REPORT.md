# 📊 التقرير النهائي الشامل للمتغيرات البيئية

## منصة رابِط للموارد البشرية

<div align="center">

**تاريخ التقرير:** 2025-11-05  
**الإصدار:** 1.0.0  
**إجمالي المتغيرات:** 44 متغير بيئي

---

</div>

## 📋 جدول المحتويات

1. [نظرة عامة](#نظرة-عامة)
2. [الإحصائيات الشاملة](#الإحصائيات-الشاملة)
3. [التوزيع حسب المنصة](#التوزيع-حسب-المنصة)
4. [التصنيف حسب الأهمية](#التصنيف-حسب-الأهمية)
5. [التصنيف حسب الوظيفة](#التصنيف-حسب-الوظيفة)
6. [الدليل الكامل لكل متغير](#الدليل-الكامل-لكل-متغير)
7. [أمثلة الإعداد الكاملة](#أمثلة-الإعداد-الكاملة)
8. [الأمان وأفضل الممارسات](#الأمان-وأفضل-الممارسات)
9. [خطة النشر](#خطة-النشر)
10. [المراجع والموارد](#المراجع-والموارد)

---

## 🌟 نظرة عامة

### ملخص تنفيذي

تم استخراج وتوثيق **44 متغير بيئي** من منصة رابِط للموارد البشرية، موزعة على ثلاث منصات رئيسية:

- **Railway** (Backend) - 30 متغير
- **Vercel** (Frontend) - 12 متغير
- **GitHub** (CI/CD) - 7 متغيرات

تم إنشاء **10 ملفات توثيق** شاملة بحجم إجمالي ~70 KB، تغطي جميع جوانب الإعداد والتكوين.

### الهدف من التقرير

هذا التقرير يوفر:

- 📊 تحليل شامل لجميع المتغيرات البيئية
- 🎯 إرشادات واضحة للإعداد حسب كل منصة
- 🔒 توجيهات أمنية وأفضل الممارسات
- 📚 مرجع كامل لكل متغير
- 🚀 خطط جاهزة للنشر

---

## 📊 الإحصائيات الشاملة

### الأرقام الرئيسية

```
┌─────────────────────────────────────────┐
│  إجمالي المتغيرات البيئية: 44        │
│  ملفات التوثيق المنشأة: 10            │
│  حجم التوثيق: ~70 KB                  │
│  اللغات المدعومة: 2 (عربي/إنجليزي)  │
└─────────────────────────────────────────┘
```

### التوزيع حسب الأهمية

| الأهمية                    | العدد | النسبة |
| -------------------------- | ----- | ------ |
| **مطلوبة (Required)**      | 7     | 16%    |
| **موصى بها (Recommended)** | 6     | 14%    |
| **اختيارية (Optional)**    | 31    | 70%    |

### التوزيع حسب المنصة

| المنصة      | العدد | النسبة | الاستخدام   |
| ----------- | ----- | ------ | ----------- |
| **Railway** | 30    | 68%    | Backend API |
| **Vercel**  | 12    | 27%    | Frontend    |
| **GitHub**  | 7     | 16%    | CI/CD       |
| **Docker**  | 1     | 2%     | Local Dev   |

_ملاحظة: بعض المتغيرات تستخدم في أكثر من منصة_

### التوزيع حسب الفئة

```
قاعدة البيانات والأمان:     8 متغيرات (18%)
الخدمات الخارجية:           17 متغير (39%)
واجهة المستخدم:              8 متغيرات (18%)
النشر والـ CI/CD:            7 متغيرات (16%)
البيئة التشغيلية:           4 متغيرات (9%)
```

---

## 🎯 التوزيع حسب المنصة

### 🚂 Railway (Backend) - 30 متغير

**الغرض:** استضافة الواجهة الخلفية (Backend API) والخدمات

#### المطلوبة (5 متغيرات)

```env
DATABASE_URL          # رابط قاعدة بيانات MySQL
JWT_SECRET           # مفتاح تشفير JWT (32+ حرف)
SESSION_SECRET       # مفتاح تشفير الجلسات
ADMIN_EMAIL          # بريد المدير الأول
ADMIN_PASSWORD       # كلمة مرور المدير
```

#### الموصى بها (3 متغيرات)

```env
NODE_ENV=production  # بيئة الإنتاج
REDIS_URL            # للتخزين المؤقت والأداء
RESEND_API_KEY       # لخدمة البريد الإلكتروني
```

#### الاختيارية (22 متغير)

- **AWS S3** (4): التخزين السحابي
- **Payment Gateways** (5): Moyasar و Tap
- **SMS Services** (5): Twilio و Unifonic
- **Email SMTP** (5): بريد بديل
- **AI & Maps** (2): OpenAI و Google Maps
- **Forge API** (2): واجهة التخزين

---

### ▲ Vercel (Frontend) - 12 متغير

**الغرض:** استضافة الواجهة الأمامية (Frontend)

#### المطلوبة (2 متغيرات)

```env
VITE_APP_URL         # رابط الواجهة الأمامية
VITE_API_URL         # رابط الواجهة الخلفية
```

#### الموصى بها (3 متغيرات)

```env
NODE_ENV=production  # بيئة الإنتاج
VITE_APP_TITLE      # عنوان التطبيق
VITE_APP_LOGO       # شعار التطبيق
```

#### الاختيارية (7 متغيرات)

- **Sentry** (2): تتبع الأخطاء
- **Analytics** (2): التحليلات
- **Forge Maps** (2): الخرائط
- **OAuth** (2): المصادقة الخارجية

---

### 🐙 GitHub (CI/CD) - 7 متغيرات

**الغرض:** الاختبار التلقائي والنشر المستمر

#### للاختبارات (3 متغيرات)

```env
DATABASE_URL         # قاعدة بيانات اختبار
JWT_SECRET          # للاختبارات
SESSION_SECRET      # للاختبارات
```

#### للنشر (4 متغيرات)

```env
VERCEL_TOKEN        # نشر Vercel
VERCEL_ORG_ID       # معرف المنظمة
VERCEL_PROJECT_ID   # معرف المشروع
RAILWAY_TOKEN       # نشر Railway
```

---

### 🐳 Docker (Local) - 1 متغير

**الغرض:** التطوير المحلي

```env
MYSQL_ROOT_PASSWORD=rootpassword  # كلمة مرور MySQL
```

---

## 📑 التصنيف حسب الأهمية

### ✅ متغيرات مطلوبة (7)

هذه المتغيرات **ضرورية** لتشغيل التطبيق الأساسي:

| المتغير          | المنصة  | الوصف               |
| ---------------- | ------- | ------------------- |
| `DATABASE_URL`   | Railway | رابط قاعدة البيانات |
| `JWT_SECRET`     | Railway | مفتاح JWT (32+ حرف) |
| `SESSION_SECRET` | Railway | مفتاح الجلسات       |
| `ADMIN_EMAIL`    | Railway | بريد المدير         |
| `ADMIN_PASSWORD` | Railway | كلمة مرور المدير    |
| `VITE_APP_URL`   | Vercel  | رابط Frontend       |
| `VITE_API_URL`   | Vercel  | رابط Backend        |

**التأثير:** بدون هذه المتغيرات، التطبيق **لن يعمل**.

---

### 🎨 متغيرات موصى بها (6)

هذه المتغيرات **تحسن الأداء** والتجربة:

| المتغير               | المنصة           | الفائدة         |
| --------------------- | ---------------- | --------------- |
| `NODE_ENV=production` | Railway + Vercel | تحسين الأداء    |
| `REDIS_URL`           | Railway          | تخزين مؤقت أسرع |
| `RESEND_API_KEY`      | Railway          | بريد موثوق      |
| `VITE_APP_TITLE`      | Vercel           | عنوان مخصص      |
| `VITE_APP_LOGO`       | Vercel           | شعار مخصص       |
| `VITE_SENTRY_DSN`     | Vercel           | تتبع الأخطاء    |

**التأثير:** التطبيق يعمل بدونها، لكن التجربة **ستكون أفضل** معها.

---

### 📦 متغيرات اختيارية (31)

تفعّل ميزات إضافية حسب الحاجة:

#### خدمات الدفع (5 متغيرات)

- `MOYASAR_API_KEY`, `MOYASAR_SECRET_KEY`, `MOYASAR_WEBHOOK_SECRET`
- `TAP_API_KEY`, `TAP_SECRET_KEY`

#### الرسائل النصية (5 متغيرات)

- `SMS_API_KEY`, `SMS_SENDER_ID`
- `TWILIO_PHONE_NUMBER`, `TWILIO_AUTH_TOKEN`
- `UNIFONIC_APP_SID`

#### التخزين السحابي (4 متغيرات)

- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`, `AWS_S3_BUCKET`

#### البريد SMTP (5 متغيرات)

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`
- `SMTP_PASSWORD`, `SMTP_FROM`

#### الذكاء الاصطناعي والخرائط (4 متغيرات)

- `OPENAI_API_KEY`
- `GOOGLE_MAPS_API_KEY`
- `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY`

#### واجهات إضافية (8 متغيرات)

- Analytics, Sentry, Forge Frontend, OAuth

**التأثير:** التطبيق يعمل بدونها، تُفعّل **حسب احتياجات العميل**.

---

## 🗂️ التصنيف حسب الوظيفة

### 1️⃣ قاعدة البيانات والأمان (8 متغيرات)

| المتغير               | النوع   | الوصف                           |
| --------------------- | ------- | ------------------------------- |
| `DATABASE_URL`        | مطلوب   | **\*\***host:port/db            |
| `JWT_SECRET`          | مطلوب   | مفتاح JWT (32+ حرف)             |
| `SESSION_SECRET`      | مطلوب   | مفتاح الجلسات                   |
| `SESSION_MAX_AGE`     | اختياري | مدة الجلسة (default: 604800000) |
| `ADMIN_EMAIL`         | مطلوب   | بريد المدير                     |
| `ADMIN_PASSWORD`      | مطلوب   | كلمة المرور                     |
| `REDIS_URL`           | موصى به | التخزين المؤقت                  |
| `MYSQL_ROOT_PASSWORD` | Docker  | للتطوير المحلي                  |

**الأهمية:** 🔴 حرجة - أساس أمان وعمل التطبيق

---

### 2️⃣ واجهة المستخدم (8 متغيرات)

| المتغير                 | النوع   | الوصف              |
| ----------------------- | ------- | ------------------ |
| `VITE_APP_URL`          | مطلوب   | رابط Frontend      |
| `VITE_API_URL`          | مطلوب   | رابط Backend       |
| `VITE_APP_TITLE`        | موصى به | عنوان التطبيق      |
| `VITE_APP_LOGO`         | موصى به | شعار التطبيق       |
| `VITE_OAUTH_PORTAL_URL` | اختياري | OAuth URL          |
| `VITE_APP_ID`           | اختياري | OAuth App ID       |
| `NODE_ENV`              | موصى به | بيئة التشغيل       |
| `PORT`                  | اختياري | منفذ الخادم (3000) |

**الأهمية:** 🟡 مهمة - تؤثر على تجربة المستخدم

---

### 3️⃣ الخدمات الخارجية (17 متغير)

#### البريد الإلكتروني (7 متغيرات)

```
✅ Resend (موصى به):
   - RESEND_API_KEY
   - RESEND_FROM_EMAIL

📧 SMTP (بديل):
   - SMTP_HOST, SMTP_PORT
   - SMTP_USER, SMTP_PASSWORD
   - SMTP_FROM
```

#### الرسائل النصية (5 متغيرات)

```
📱 Twilio:
   - TWILIO_PHONE_NUMBER
   - TWILIO_AUTH_TOKEN

📲 Unifonic (السعودية):
   - UNIFONIC_APP_SID

🔧 عام:
   - SMS_API_KEY
   - SMS_SENDER_ID
```

#### الدفع (5 متغيرات)

```
💳 Moyasar:
   - MOYASAR_API_KEY
   - MOYASAR_SECRET_KEY
   - MOYASAR_WEBHOOK_SECRET

💰 Tap:
   - TAP_API_KEY
   - TAP_SECRET_KEY
```

**الأهمية:** 🟢 اختيارية - حسب احتياجات العميل

---

### 4️⃣ البنية التحتية (7 متغيرات)

#### التخزين (4 متغيرات)

```
☁️ AWS S3:
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
   - AWS_REGION
   - AWS_S3_BUCKET
```

#### الذكاء والخرائط (3 متغيرات)

```
🤖 AI:
   - OPENAI_API_KEY

🗺️ Maps:
   - GOOGLE_MAPS_API_KEY
   - BUILT_IN_FORGE_API_KEY
```

**الأهمية:** 🟢 اختيارية - ميزات إضافية

---

### 5️⃣ المراقبة والتحليلات (5 متغيرات)

```
📊 Analytics:
   - VITE_ANALYTICS_ENDPOINT
   - VITE_ANALYTICS_WEBSITE_ID

🔍 Sentry:
   - VITE_SENTRY_DSN
   - VITE_SENTRY_DEBUG
   - SENTRY_AUTH_TOKEN
```

**الأهمية:** 🟡 مهمة - لتتبع الأداء والأخطاء

---

### 6️⃣ النشر والـ CI/CD (7 متغيرات)

```
▲ Vercel:
   - VERCEL_TOKEN
   - VERCEL_ORG_ID
   - VERCEL_PROJECT_ID

🚂 Railway:
   - RAILWAY_TOKEN

🧪 Testing:
   - DATABASE_URL (test)
   - JWT_SECRET (test)
   - SESSION_SECRET (test)
```

**الأهمية:** 🟡 مهمة - للنشر التلقائي

---

## 📖 الدليل الكامل لكل متغير

### قاعدة البيانات

#### DATABASE_URL

```yaml
الاسم: DATABASE_URL
النوع: مطلوب
المنصة: Railway, GitHub (test)
الصيغة: mysql://user:password@host:port/database
المثال: mysql://root:password@containers-us-west.railway.app:3306/railway
الوصف: رابط الاتصال بقاعدة بيانات MySQL
الحصول عليه:
  - Railway MySQL: من Dashboard
  - TiDB Cloud: من Dashboard
  - Local: mysql://root:password@localhost:3306/rabithr_dev
الأمان: ⚠️ حساس - لا تشاركه أو تضعه في Frontend
```

---

### الأمان والمصادقة

#### JWT_SECRET

```yaml
الاسم: JWT_SECRET
النوع: مطلوب
المنصة: Railway, GitHub (test)
الحد الأدنى: 32 حرف
المثال: 8x9y2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s
الوصف: مفتاح سري لتشفير JWT tokens
الحصول عليه: openssl rand -base64 32
الأمان: 🔴 حرج - غيّره كل 90 يوم
ملاحظات:
  - يجب أن يكون عشوائي تماماً
  - لا تستخدم نفس القيمة بين البيئات
  - احفظ نسخة احتياطية آمنة
```

#### SESSION_SECRET

```yaml
الاسم: SESSION_SECRET
النوع: مطلوب
المنصة: Railway, GitHub (test)
الحد الأدنى: 32 حرف
المثال: 9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6i7j8k
الوصف: مفتاح سري لتشفير الجلسات
الحصول عليه: openssl rand -base64 32
الأمان: 🔴 حرج - غيّره عند مغادرة عضو
```

#### ADMIN_EMAIL & ADMIN_PASSWORD

```yaml
الاسم: ADMIN_EMAIL, ADMIN_PASSWORD
النوع: مطلوب
المنصة: Railway
الوصف: حساب المدير الأول
التنسيق:
  ADMIN_EMAIL: email صحيح
  ADMIN_PASSWORD: كلمة مرور قوية
الأمان: 🔴 حرج
ملاحظات:
  - غيّر ADMIN_PASSWORD فوراً بعد أول تسجيل دخول
  - لا تستخدم القيم الافتراضية في الإنتاج
```

---

### البيئة التشغيلية

#### NODE_ENV

```yaml
الاسم: NODE_ENV
النوع: موصى به
المنصة: Railway, Vercel, GitHub
القيم: development, production, test
الافتراضي: development
الوصف: بيئة تشغيل Node.js
التأثير:
  - production: تحسين الأداء، تعطيل debug
  - development: تمكين debug، hot reload
```

#### PORT

```yaml
الاسم: PORT
النوع: اختياري
المنصة: Railway
الافتراضي: 3000
الوصف: منفذ الخادم
ملاحظات: Railway يعين القيمة تلقائياً
```

---

### واجهة المستخدم

#### VITE_APP_URL

```yaml
الاسم: VITE_APP_URL
النوع: مطلوب
المنصة: Vercel (Railway اختياري)
المثال: https://rabit-hr.vercel.app
الوصف: رابط الواجهة الأمامية
الاستخدام: في الإيميلات والروابط
ملاحظات: يجب أن يبدأ بـ VITE_ للظهور في Frontend
```

#### VITE_API_URL

```yaml
الاسم: VITE_API_URL
النوع: مطلوب
المنصة: Vercel
المثال: https://rabithr-production.up.railway.app
الوصف: رابط Backend API
الاستخدام: للاتصال بالـ Backend
ملاحظات: يجب أن يكون HTTPS في الإنتاج
```

---

### التخزين المؤقت

#### REDIS_URL

```yaml
الاسم: REDIS_URL
النوع: موصى به
المنصة: Railway
الصيغة: redis://host:port
المثال: redis://redis.railway.internal:6379
الوصف: رابط Redis للتخزين المؤقت
الفوائد:
  - تخزين الجلسات
  - تخزين مؤقت للبيانات
  - تحسين الأداء بنسبة 50%+
الحصول عليه: أضف Redis service في Railway
```

---

### البريد الإلكتروني

#### RESEND_API_KEY (موصى به)

```yaml
الاسم: RESEND_API_KEY
النوع: موصى به
المنصة: Railway
المثال: re_123abc456def789ghi
الوصف: مفتاح Resend API
الحصول عليه: https://resend.com/api-keys
الميزات:
  - سهل الإعداد
  - موثوق وسريع
  - تقارير مفصلة
الاستخدام: إرسال الإيميلات التلقائية
```

#### SMTP\_\* (بديل)

```yaml
الاسم: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM
النوع: اختياري
المنصة: Railway
الوصف: إعدادات SMTP بديلة
الاستخدام: إذا كنت تريد استخدام Gmail أو خادم SMTP آخر
مثال Gmail:
  SMTP_HOST: smtp.gmail.com
  SMTP_PORT: 587
  SMTP_USER: your-email@gmail.com
  SMTP_PASSWORD: app-specific-password
```

---

### الرسائل النصية

#### SMS_API_KEY & SMS_SENDER_ID

```yaml
الاسم: SMS_API_KEY, SMS_SENDER_ID
النوع: اختياري
المنصة: Railway
الوصف: مفتاح عام للرسائل النصية
SENDER_ID المثال: Rabit
```

#### TWILIO\_\*

```yaml
الاسم: TWILIO_PHONE_NUMBER, TWILIO_AUTH_TOKEN
النوع: اختياري
المنصة: Railway
الوصف: Twilio SMS service
الحصول عليه: https://www.twilio.com/
الاستخدام: رسائل SMS عالمية
```

#### UNIFONIC_APP_SID

```yaml
الاسم: UNIFONIC_APP_SID
النوع: اختياري
المنصة: Railway
الوصف: Unifonic SMS (السعودية)
الحصول عليه: https://www.unifonic.com/
الميزات: متخصص في السوق السعودي
```

---

### بوابات الدفع

#### MOYASAR\_\*

```yaml
الاسم: MOYASAR_API_KEY, MOYASAR_SECRET_KEY, MOYASAR_WEBHOOK_SECRET
النوع: اختياري
المنصة: Railway
الوصف: بوابة دفع Moyasar
الحصول عليه: https://moyasar.com/
الميزات:
  - دعم mada و Apple Pay
  - متوافق مع السوق السعودي
```

#### TAP\_\*

```yaml
الاسم: TAP_API_KEY, TAP_SECRET_KEY
النوع: اختياري
المنصة: Railway
الوصف: بوابة دفع Tap
الحصول عليه: https://www.tap.company/
```

---

### التخزين السحابي

#### AWS\_\*

```yaml
الاسم: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET
النوع: اختياري
المنصة: Railway
الوصف: تخزين الملفات على AWS S3
الحصول عليه: AWS IAM Console
الاستخدام: تخزين المرفقات والصور
مثال:
  AWS_REGION: us-east-1
  AWS_S3_BUCKET: rabithr-storage
```

---

### الذكاء الاصطناعي والخرائط

#### OPENAI_API_KEY

```yaml
الاسم: OPENAI_API_KEY
النوع: اختياري
المنصة: Railway
المثال: sk-proj-...
الوصف: مفتاح OpenAI API
الحصول عليه: https://platform.openai.com/api-keys
الاستخدام: مولد الخطابات AI، مساعد AI
```

#### GOOGLE_MAPS_API_KEY

```yaml
الاسم: GOOGLE_MAPS_API_KEY
النوع: اختياري
المنصة: Railway
الوصف: مفتاح Google Maps
الحصول عليه: Google Cloud Console
الاستخدام: عرض الخرائط والمواقع
```

---

### المراقبة والتحليلات

#### VITE_SENTRY_DSN

```yaml
الاسم: VITE_SENTRY_DSN
النوع: موصى به
المنصة: Vercel
المثال: https://abc123@o456789.ingest.sentry.io/123456
الوصف: تتبع أخطاء Frontend
الحصول عليه: https://sentry.io/settings/projects/
الفوائد: اكتشاف وإصلاح الأخطاء بسرعة
```

#### SENTRY_AUTH_TOKEN

```yaml
الاسم: SENTRY_AUTH_TOKEN
النوع: اختياري
المنصة: Railway, GitHub
الوصف: رفع Source Maps لـ Sentry
الاستخدام: في CI/CD فقط
```

---

### النشر والـ CI/CD

#### VERCEL\_\*

```yaml
الاسم: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID
النوع: اختياري (للنشر التلقائي)
المنصة: GitHub
الوصف: أسرار نشر Vercel
الحصول عليه:
  - TOKEN: Vercel Dashboard → Settings → Tokens
  - ORG_ID & PROJECT_ID: ملف .vercel/project.json
الاستخدام: نشر تلقائي من GitHub Actions
```

#### RAILWAY_TOKEN

```yaml
الاسم: RAILWAY_TOKEN
النوع: اختياري (للنشر التلقائي)
المنصة: GitHub
الوصف: سر نشر Railway
الحصول عليه: Railway → Account Settings → Tokens
الاستخدام: نشر Backend تلقائياً
```

---

## 📝 أمثلة الإعداد الكاملة

### بيئة التطوير (Development)

```env
# ========================================
# Development Environment
# ========================================

# Node
NODE_ENV=development

# Database - Local MySQL
DATABASE_URL=mysql://root:password@localhost:3306/rabithr_dev

# Security - Development Keys
JWT_SECRET=dev-jwt-secret-use-openssl-rand-in-production-min-32-chars
SESSION_SECRET=dev-session-secret-use-openssl-rand-in-production
SESSION_MAX_AGE=604800000

# Admin - Development Account
ADMIN_EMAIL=admin@localhost
ADMIN_PASSWORD=DevPassword123!

# URLs - Local
VITE_APP_URL=http://localhost:3000
VITE_API_URL=http://localhost:3000
VITE_APP_TITLE=رابِط - Dev
VITE_APP_LOGO=/logo.png
PORT=3000

# Redis - Local
REDIS_URL=redis://localhost:6379

# Email - تعطيل في التطوير أو استخدام Mailtrap
# RESEND_API_KEY=re_dev_key

# Sentry - Debug Mode
VITE_SENTRY_DEBUG=true

# Optional - حسب الحاجة
# OPENAI_API_KEY=sk-...
# AWS_ACCESS_KEY_ID=...
```

---

### بيئة الإنتاج (Production)

#### Railway (Backend)

```env
# ========================================
# Production - Railway Backend
# ========================================

# Node Environment
NODE_ENV=production
PORT=3000

# Database - Railway MySQL or TiDB
DATABASE_URL=mysql://root:SECURE_PASSWORD@containers-us-west-123.railway.app:3306/railway

# Security - Strong Random Keys
JWT_SECRET=8x9y2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c
SESSION_SECRET=9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v
SESSION_MAX_AGE=604800000

# Admin Account - CHANGE PASSWORD AFTER FIRST LOGIN!
ADMIN_EMAIL=admin@rabit.sa
ADMIN_PASSWORD=SecureProductionPassword123!@#

# Frontend URL
VITE_APP_URL=https://rabit-hr.vercel.app

# Redis - Railway Redis
REDIS_URL=redis://default:password@redis.railway.internal:6379

# Email - Resend
RESEND_API_KEY=re_prod_abc123def456ghi789jkl012mno345
RESEND_FROM_EMAIL=noreply@rabit.sa

# AWS S3 - Production Bucket
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
AWS_S3_BUCKET=rabithr-production-storage

# Payment Gateways - Production Keys
MOYASAR_API_KEY=pk_live_moyasar_production_key
MOYASAR_SECRET_KEY=sk_live_moyasar_production_secret
MOYASAR_WEBHOOK_SECRET=whsec_moyasar_webhook_secret

TAP_API_KEY=sk_live_tap_production_key
TAP_SECRET_KEY=tap_secret_production_key

# SMS - Unifonic (Saudi Arabia)
UNIFONIC_APP_SID=unifonic_production_app_sid
SMS_SENDER_ID=Rabit

# AI & Maps
OPENAI_API_KEY=sk-proj-production_openai_key
GOOGLE_MAPS_API_KEY=AIzaSy...production_google_maps_key

# Forge API - Backend
BUILT_IN_FORGE_API_URL=https://forge-api.production.com
BUILT_IN_FORGE_API_KEY=forge_production_backend_key

# Monitoring
SENTRY_AUTH_TOKEN=sentry_auth_token_for_backend
```

#### Vercel (Frontend)

```env
# ========================================
# Production - Vercel Frontend
# ========================================

# Node Environment
NODE_ENV=production

# URLs
VITE_APP_URL=https://rabit-hr.vercel.app
VITE_API_URL=https://rabithr-production.up.railway.app

# Application Info
VITE_APP_TITLE=رابِط - منصة إدارة الموارد البشرية
VITE_APP_LOGO=/logo.png

# Error Tracking - Sentry
VITE_SENTRY_DSN=https://abc123def456@o789012.ingest.sentry.io/345678
VITE_SENTRY_DEBUG=false

# Analytics
VITE_ANALYTICS_ENDPOINT=https://analytics.rabit.sa
VITE_ANALYTICS_WEBSITE_ID=website_id_production

# Forge API - Frontend Maps
VITE_FRONTEND_FORGE_API_URL=https://forge.butterfly-effect.dev
VITE_FRONTEND_FORGE_API_KEY=forge_production_frontend_key

# OAuth (Optional)
VITE_OAUTH_PORTAL_URL=https://oauth.rabit.sa
VITE_APP_ID=rabit_hr_production_app_id
```

#### GitHub Secrets (CI/CD)

```env
# ========================================
# GitHub Secrets - CI/CD
# ========================================

# Testing Database - Separate Test DB
DATABASE_URL=mysql://test_user:test_pass@test-db.example.com:3306/rabithr_test

# Testing Secrets
JWT_SECRET=test-jwt-secret-for-ci-min-32-chars-random-string
SESSION_SECRET=test-session-secret-for-ci-random-string

# Deployment Tokens
VERCEL_TOKEN=vercel_deployment_token_abc123def456
VERCEL_ORG_ID=team_abc123def456
VERCEL_PROJECT_ID=prj_xyz789abc012

RAILWAY_TOKEN=railway_deployment_token_xyz789

# Monitoring
SENTRY_AUTH_TOKEN=sentry_auth_token_for_ci
```

---

### بيئة التجهيز (Staging)

```env
# ========================================
# Staging Environment
# ========================================

# Same structure as Production but with:
# - Separate database
# - Staging domain names
# - Test payment keys
# - Separate AWS bucket

NODE_ENV=production
DATABASE_URL=mysql://staging_db_url
JWT_SECRET=staging-jwt-secret-different-from-prod
VITE_APP_URL=https://staging-rabit-hr.vercel.app
VITE_API_URL=https://rabithr-staging.up.railway.app

# Use test/sandbox keys for payment gateways
MOYASAR_API_KEY=pk_test_moyasar_staging
TAP_API_KEY=sk_test_tap_staging

# Separate S3 bucket
AWS_S3_BUCKET=rabithr-staging-storage
```

---

## 🔒 الأمان وأفضل الممارسات

### 🛡️ المبادئ الأساسية

#### 1. إنشاء مفاتيح آمنة

```bash
# إنشاء JWT_SECRET آمن
openssl rand -base64 32

# إنشاء SESSION_SECRET آمن
openssl rand -base64 32

# أو استخدم Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# أو Python
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

**القواعد:**

- ✅ استخدم 32 حرف على الأقل
- ✅ استخدم أحرف وأرقام ورموز عشوائية
- ✅ لا تستخدم كلمات أو تواريخ
- ❌ لا تستخدم القيم الافتراضية

---

#### 2. الفصل بين البيئات

```
Development  ➜  مفاتيح تطوير
Staging      ➜  مفاتيح تجهيز
Production   ➜  مفاتيح إنتاج

❌ لا تستخدم نفس المفاتيح!
```

**السبب:** إذا تسربت مفاتيح التطوير، الإنتاج يبقى آمن.

---

#### 3. تدوير الأسرار (Secret Rotation)

```
كل 90 يوم:
  ✅ غيّر JWT_SECRET
  ✅ غيّر SESSION_SECRET
  ✅ راجع جميع API Keys

عند مغادرة عضو:
  ✅ غيّر جميع المفاتيح المشتركة
  ✅ احذف صلاحياته
  ✅ راجع السجلات (logs)

عند الاشتباه بتسريب:
  ✅ غيّر المفتاح فوراً
  ✅ راجع السجلات
  ✅ أبلغ الفريق
```

---

### 🚫 ما يجب تجنبه

#### ❌ لا تفعل هذا أبداً

```bash
# 1. لا تضع أسرار في الكود
const secret = "my-secret-key";  # ❌ خطأ!

# 2. لا تحفظ .env في Git
git add .env  # ❌ خطير!

# 3. لا تشارك .env عبر البريد
# ❌ استخدم أدوات آمنة بدلاً

# 4. لا تطبع الأسرار في logs
console.log(process.env.JWT_SECRET)  # ❌ خطر أمني!

# 5. لا تضع أسرار Backend في Frontend
# ❌ JWT_SECRET في Vercel
# ❌ DATABASE_URL في Vercel
```

---

### ✅ ما يجب فعله

#### 1. استخدم .gitignore

```gitignore
# .gitignore
.env
.env.local
.env.*.local
.env.production
.env.staging
```

#### 2. استخدم أدوات إدارة الأسرار

```
✅ Railway Variables
✅ Vercel Environment Variables
✅ GitHub Secrets
✅ AWS Secrets Manager
✅ 1Password / BitWarden
```

#### 3. قلل الصلاحيات

```
Principle of Least Privilege:

AWS IAM User:
  ❌ AdministratorAccess
  ✅ S3 Read/Write فقط

API Tokens:
  ❌ Full Access
  ✅ Scoped Access
```

#### 4. راقب الاستخدام

```
✅ فعّل Audit Logs
✅ راجع Access Logs دورياً
✅ استخدم Alerts لأنشطة مشبوهة
```

---

### 🔍 فحص الأمان

#### قائمة التحقق الأمنية

```
قبل النشر:
□ جميع المفاتيح محدثة وعشوائية
□ لا توجد أسرار في الكود
□ .env في .gitignore
□ DATABASE_URL يستخدم SSL/TLS
□ HTTPS مفعل في جميع URLs
□ ADMIN_PASSWORD قوية
□ تم تفعيل CORS صحيحاً

بعد النشر:
□ غير ADMIN_PASSWORD من حساب المدير
□ فعّل 2FA للحسابات المهمة
□ راجع logs للتأكد من عدم وجود أخطاء
□ اختبر جميع الخدمات

صيانة دورية:
□ دوّر المفاتيح كل 90 يوم
□ راجع Access Logs شهرياً
□ حدّث التبعيات (dependencies)
□ راجع Security Advisories
```

---

## 🚀 خطة النشر

### المرحلة 1: الإعداد الأولي (قبل النشر)

#### الأسبوع 1: جمع المعلومات

```
اليوم 1-2: تحديد الخدمات
□ ما هي خدمات الدفع المطلوبة؟
□ هل نحتاج SMS؟
□ هل نحتاج تخزين سحابي؟
□ هل نحتاج AI features؟

اليوم 3-4: الحصول على المفاتيح
□ سجل في الخدمات المطلوبة
□ احصل على API Keys
□ احفظها في مكان آمن

اليوم 5: إعداد قواعد البيانات
□ أنشئ قاعدة بيانات Production
□ أنشئ قاعدة بيانات Staging
□ أنشئ قاعدة بيانات Testing
□ احفظ روابط الاتصال
```

---

### المرحلة 2: إعداد Railway (Backend)

#### خطوات مفصلة

```bash
# 1. أنشئ مشروع في Railway
Railway Dashboard → New Project

# 2. أضف MySQL Service
Add Service → Database → MySQL
→ احفظ DATABASE_URL

# 3. أضف Redis Service (موصى به)
Add Service → Database → Redis
→ احفظ REDIS_URL

# 4. أضف المتغيرات المطلوبة
Railway → Variables → Add Variable

DATABASE_URL=<من MySQL Service>
JWT_SECRET=<openssl rand -base64 32>
SESSION_SECRET=<openssl rand -base64 32>
ADMIN_EMAIL=admin@rabit.sa
ADMIN_PASSWORD=<كلمة مرور قوية>

# 5. أضف المتغيرات الموصى بها
NODE_ENV=production
REDIS_URL=<من Redis Service>
RESEND_API_KEY=<من Resend>
VITE_APP_URL=https://your-app.vercel.app

# 6. أضف الخدمات الاختيارية (حسب الحاجة)
AWS_ACCESS_KEY_ID=...
MOYASAR_API_KEY=...
OPENAI_API_KEY=...

# 7. Deploy
Railway → Deploy
```

#### التحقق من Railway

```bash
# تحقق من المتغيرات
railway variables

# تحقق من الخدمة
curl https://your-backend.railway.app/health

# راجع اللوجات
railway logs
```

---

### المرحلة 3: إعداد Vercel (Frontend)

#### خطوات مفصلة

```bash
# 1. استيراد المشروع
Vercel Dashboard → Add New → Project
→ اختر GitHub Repository

# 2. تكوين المشروع
Framework Preset: Vite
Build Command: pnpm build
Output Directory: dist/public
Install Command: pnpm install

# 3. أضف المتغيرات
Settings → Environment Variables

# المطلوبة
VITE_APP_URL=https://your-app.vercel.app
VITE_API_URL=https://your-backend.railway.app

# الموصى بها
NODE_ENV=production
VITE_APP_TITLE=رابِط - منصة إدارة الموارد البشرية
VITE_APP_LOGO=/logo.png

# الاختيارية
VITE_SENTRY_DSN=...
VITE_ANALYTICS_ENDPOINT=...

# 4. اختر البيئات
✅ Production
✅ Preview
✅ Development

# 5. Deploy
Vercel → Deploy
```

#### التحقق من Vercel

```bash
# تحقق من المتغيرات
vercel env ls

# تحقق من الموقع
curl https://your-app.vercel.app

# راجع اللوجات
vercel logs
```

---

### المرحلة 4: إعداد GitHub (CI/CD)

#### خطوات مفصلة

```bash
# 1. إعداد Secrets
GitHub → Settings → Secrets → Actions

# للاختبارات
DATABASE_URL=<قاعدة بيانات اختبار>
JWT_SECRET=<test secret>
SESSION_SECRET=<test secret>

# للنشر (اختياري)
VERCEL_TOKEN=<من Vercel Dashboard>
VERCEL_ORG_ID=<من .vercel/project.json>
VERCEL_PROJECT_ID=<من .vercel/project.json>
RAILWAY_TOKEN=<من Railway Dashboard>

# 2. إنشاء Workflows (إذا لم توجد)
.github/workflows/ci.yml
.github/workflows/deploy.yml

# 3. تفعيل GitHub Actions
Settings → Actions → General
→ Allow all actions
```

---

### المرحلة 5: الاختبار

#### قائمة الاختبار

```
□ اختبار تسجيل الدخول
  → admin@rabit.sa + كلمة المرور

□ اختبار الاتصال بقاعدة البيانات
  → إنشاء موظف جديد
  → عرض البيانات

□ اختبار Backend API
  → /api/health
  → /api/trpc/employee.list

□ اختبار Frontend
  → تحميل الصفحة الرئيسية
  → التنقل بين الصفحات

□ اختبار الخدمات الخارجية
  → البريد الإلكتروني (إذا مفعل)
  → الدفع (إذا مفعل)
  → SMS (إذا مفعل)

□ اختبار الأمان
  → HTTPS مفعل
  → CORS صحيح
  → لا أخطاء في Console
```

---

### المرحلة 6: ما بعد النشر

#### الأسبوع الأول

```
اليوم 1:
□ راقب اللوجات (logs)
□ راقب الأداء (performance)
□ راجع الأخطاء (errors)

اليوم 2-3:
□ غيّر ADMIN_PASSWORD من حساب المدير
□ أنشئ حسابات اختبار
□ اختبر جميع الميزات

اليوم 4-5:
□ راجع feedback المستخدمين
□ أصلح أي مشاكل
□ حسّن الأداء

اليوم 6-7:
□ احفظ نسخة احتياطية من قاعدة البيانات
□ وثّق أي تغييرات
□ احتفل بالإطلاق! 🎉
```

#### الصيانة الدورية

```
أسبوعياً:
□ راجع اللوجات
□ راجع الأداء
□ احفظ نسخة احتياطية

شهرياً:
□ راجع Access Logs
□ حدّث التبعيات
□ راجع الفواتير

كل 90 يوم:
□ دوّر المفاتيح السرية
□ راجع الصلاحيات
□ مراجعة أمنية شاملة
```

---

## 📚 المراجع والموارد

### 📁 ملفات التوثيق

| الملف                                     | الحجم     | الوصف           | الاستخدام      |
| ----------------------------------------- | --------- | --------------- | -------------- |
| **ENV_README.md**                         | 4.0 KB    | نقطة البداية    | ابدأ من هنا    |
| **ENVIRONMENT_VARIABLES_SUMMARY.md**      | 6.3 KB    | مرجع سريع       | نسخ ولصق       |
| **ENV_SETUP_GUIDE.md**                    | 12 KB     | دليل الإعداد    | إعداد شامل     |
| **ENV_RAILWAY.md**                        | 5.4 KB    | دليل Railway    | Backend        |
| **ENV_VERCEL.md**                         | 7.0 KB    | دليل Vercel     | Frontend       |
| **ENV_GITHUB.md**                         | 11 KB     | دليل GitHub     | CI/CD          |
| **ENV_VARIABLES_AR.md**                   | 11 KB     | توثيق عربي      | مرجع شامل      |
| **ENV_VARIABLES_EN.md**                   | 8.7 KB    | English docs    | Full reference |
| **.env.example**                          | 4.6 KB    | ملف مثال        | نسخ محلي       |
| **ENVIRONMENT_VARIABLES_FINAL_REPORT.md** | هذا الملف | التقرير النهائي | مرجع كامل      |

---

### 🔗 روابط الخدمات الخارجية

#### قواعد البيانات

- **Railway MySQL**: https://railway.app/
- **TiDB Cloud**: https://tidbcloud.com/
- **PlanetScale**: https://planetscale.com/

#### التخزين المؤقت

- **Railway Redis**: https://railway.app/
- **Upstash Redis**: https://upstash.com/

#### البريد الإلكتروني

- **Resend** (موصى به): https://resend.com/
- **SendGrid**: https://sendgrid.com/
- **Mailgun**: https://www.mailgun.com/

#### الرسائل النصية

- **Twilio**: https://www.twilio.com/
- **Unifonic** (السعودية): https://www.unifonic.com/

#### بوابات الدفع

- **Moyasar**: https://moyasar.com/
- **Tap**: https://www.tap.company/

#### التخزين السحابي

- **AWS S3**: https://aws.amazon.com/s3/
- **Cloudflare R2**: https://www.cloudflare.com/products/r2/

#### الذكاء الاصطناعي

- **OpenAI**: https://platform.openai.com/

#### الخرائط

- **Google Maps API**: https://console.cloud.google.com/

#### المراقبة

- **Sentry**: https://sentry.io/
- **LogRocket**: https://logrocket.com/

#### النشر

- **Vercel**: https://vercel.com/
- **Railway**: https://railway.app/
- **GitHub Actions**: https://github.com/features/actions

---

### 📖 مصادر إضافية

#### مقالات وأدلة

- [The Twelve-Factor App](https://12factor.net/) - مبادئ بناء التطبيقات
- [OWASP API Security](https://owasp.org/www-project-api-security/) - أمان APIs
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices) - أفضل الممارسات

#### أدوات مفيدة

- **dotenv**: مكتبة لإدارة `.env`
- **1Password**: لإدارة الأسرار
- **Git-secrets**: لمنع commit الأسرار
- **Doppler**: لإدارة المتغيرات البيئية

---

### 🆘 الدعم والمساعدة

#### المشاكل الشائعة

**المشكلة: "Database connection failed"**

```
الحل:
1. تحقق من DATABASE_URL صحيح
2. تأكد من أن قاعدة البيانات تعمل
3. تحقق من Firewall settings
4. راجع السجلات (logs)
```

**المشكلة: "JWT Secret not configured"**

```
الحل:
1. تحقق من وجود JWT_SECRET في Railway
2. تأكد أنه 32 حرف على الأقل
3. أعد نشر التطبيق
```

**المشكلة: "Cannot connect to API"**

```
الحل:
1. تحقق من VITE_API_URL في Vercel
2. تأكد أن Backend يعمل
3. افحص CORS settings
4. تحقق من Network tab في المتصفح
```

**المشكلة: "Environment variable undefined"**

```
الحل:
1. تأكد أن المتغير يبدأ بـ VITE_ (للـ Frontend)
2. أعد نشر التطبيق بعد إضافة المتغير
3. امسح Build Cache
4. تحقق من Environment في Vercel
```

---

## ✅ الخلاصة

### النقاط الرئيسية

1. **44 متغير بيئي** موزعة على 3 منصات
2. **7 متغيرات مطلوبة** لتشغيل التطبيق الأساسي
3. **6 متغيرات موصى بها** لتحسين الأداء
4. **31 متغير اختياري** لميزات إضافية

### الأولويات

```
المرحلة 1 (ضرورية):
✅ DATABASE_URL
✅ JWT_SECRET
✅ SESSION_SECRET
✅ ADMIN_EMAIL, ADMIN_PASSWORD
✅ VITE_APP_URL, VITE_API_URL

المرحلة 2 (موصى بها):
⭐ NODE_ENV=production
⭐ REDIS_URL
⭐ RESEND_API_KEY
⭐ VITE_SENTRY_DSN

المرحلة 3 (حسب الحاجة):
📦 Payment Gateways
📦 SMS Services
📦 AWS S3
📦 AI Features
```

### خطوات العمل التالية

```
☑️ تم: توثيق جميع المتغيرات
☑️ تم: إنشاء أدلة شاملة
☑️ تم: توفير أمثلة كاملة

□ التالي: تطبيق المتغيرات في Railway
□ التالي: تطبيق المتغيرات في Vercel
□ التالي: اختبار التطبيق
□ التالي: النشر للإنتاج
```

---

## 📞 معلومات الاتصال

للأسئلة أو الدعم:

- 📧 البريد: info@rbithr.com
- 🌐 الموقع: https://rabit.sa
- 📚 التوثيق: راجع الملفات المذكورة أعلاه

---

<div align="center">

**🎉 جاهز للنشر! 🎉**

جميع المتغيرات موثقة ومنظمة  
اتبع الأدلة خطوة بخطوة  
نتمنى لك تجربة نشر سلسة!

---

**آخر تحديث:** 2025-11-05  
**الإصدار:** 1.0.0  
**الحالة:** ✅ مكتمل

</div>
