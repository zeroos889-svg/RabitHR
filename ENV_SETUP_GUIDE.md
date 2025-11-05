# 🚀 دليل إعداد المتغيرات البيئية - منصة رابِط

## 📋 نظرة عامة

هذا الدليل يشرح **بالضبط** أين تضع كل متغير بيئي في المنصات المختلفة:

- **🚂 Railway** - الواجهة الخلفية (Backend API)
- **▲ Vercel** - الواجهة الأمامية (Frontend)
- **🐙 GitHub** - CI/CD والأسرار

---

## 🎯 ملخص سريع

| المنصة      | ما تستضيفه  | المتغيرات المطلوبة                             | الدليل الكامل                         |
| ----------- | ----------- | ---------------------------------------------- | ------------------------------------- |
| **Railway** | Backend API | `DATABASE_URL`, `JWT_SECRET`, `SESSION_SECRET` | [📖 ENV_RAILWAY.md](./ENV_RAILWAY.md) |
| **Vercel**  | Frontend    | `VITE_APP_URL`, `VITE_API_URL`                 | [📖 ENV_VERCEL.md](./ENV_VERCEL.md)   |
| **GitHub**  | CI/CD       | `DATABASE_URL` (test), Deployment Tokens       | [📖 ENV_GITHUB.md](./ENV_GITHUB.md)   |

---

## 📚 الأدلة التفصيلية

### 🚂 [Railway - Backend](./ENV_RAILWAY.md)

**ما يجب وضعه:** جميع المتغيرات المتعلقة بالخادم، قاعدة البيانات، والخدمات الخلفية

**المتغيرات الأساسية:**

- قاعدة البيانات والأمان
- خدمات البريد والرسائل النصية
- بوابات الدفع
- التخزين السحابي
- الذكاء الاصطناعي

**[اقرأ الدليل الكامل →](./ENV_RAILWAY.md)**

---

### ▲ [Vercel - Frontend](./ENV_VERCEL.md)

**ما يجب وضعه:** فقط المتغيرات التي تبدأ بـ `VITE_*` للواجهة الأمامية

**المتغيرات الأساسية:**

- عناوين التطبيق (URLs)
- إعدادات واجهة المستخدم
- التحليلات وتتبع الأخطاء
- خرائط Forge (Frontend)

**[اقرأ الدليل الكامل →](./ENV_VERCEL.md)**

---

### 🐙 [GitHub - Secrets](./ENV_GITHUB.md)

**ما يجب وضعه:** أسرار CI/CD والنشر التلقائي

**الأسرار الأساسية:**

- متغيرات للاختبارات
- Tokens للنشر (Vercel, Railway)
- أسرار المراقبة (Sentry, CodeCov)

**[اقرأ الدليل الكامل →](./ENV_GITHUB.md)**

---

## 🔑 جدول المتغيرات - أين أضعها؟

### المتغيرات المطلوبة

| المتغير          | Railway | Vercel | GitHub  | الوصف               |
| ---------------- | :-----: | :----: | :-----: | ------------------- |
| `NODE_ENV`       |   ✅    |   ✅   |   ✅    | بيئة التشغيل        |
| `DATABASE_URL`   |   ✅    |   ❌   | ✅ test | رابط قاعدة البيانات |
| `JWT_SECRET`     |   ✅    |   ❌   | ✅ test | مفتاح JWT           |
| `SESSION_SECRET` |   ✅    |   ❌   | ✅ test | مفتاح الجلسات       |
| `ADMIN_EMAIL`    |   ✅    |   ❌   |   ❌    | بريد المدير         |
| `ADMIN_PASSWORD` |   ✅    |   ❌   |   ❌    | كلمة مرور المدير    |
| `VITE_APP_URL`   |   ⚠️    |   ✅   |   ❌    | رابط Frontend       |
| `VITE_API_URL`   |   ❌    |   ✅   |   ❌    | رابط Backend        |

### متغيرات النشر والـ CI/CD

| المتغير             | Railway | Vercel | GitHub | الوصف        |
| ------------------- | :-----: | :----: | :----: | ------------ |
| `VERCEL_TOKEN`      |   ❌    |   ❌   |   ✅   | نشر Vercel   |
| `VERCEL_ORG_ID`     |   ❌    |   ❌   |   ✅   | معرف المنظمة |
| `VERCEL_PROJECT_ID` |   ❌    |   ❌   |   ✅   | معرف المشروع |
| `RAILWAY_TOKEN`     |   ❌    |   ❌   |   ✅   | نشر Railway  |

### الخدمات الخارجية (اختيارية)

| الخدمة              | المتغيرات                               | أين؟             |
| ------------------- | --------------------------------------- | ---------------- |
| **Redis**           | `REDIS_URL`                             | Railway          |
| **البريد (Resend)** | `RESEND_API_KEY`, `RESEND_FROM_EMAIL`   | Railway          |
| **البريد (SMTP)**   | `SMTP_*`                                | Railway          |
| **SMS**             | `SMS_API_KEY`, `TWILIO_*`, `UNIFONIC_*` | Railway          |
| **AWS S3**          | `AWS_*`                                 | Railway          |
| **الدفع (Moyasar)** | `MOYASAR_*`                             | Railway          |
| **الدفع (Tap)**     | `TAP_*`                                 | Railway          |
| **OpenAI**          | `OPENAI_API_KEY`                        | Railway          |
| **Google Maps**     | `GOOGLE_MAPS_API_KEY`                   | Railway          |
| **Forge Backend**   | `BUILT_IN_FORGE_API_*`                  | Railway          |
| **Forge Frontend**  | `VITE_FRONTEND_FORGE_API_*`             | Vercel           |
| **Sentry Frontend** | `VITE_SENTRY_DSN`, `VITE_SENTRY_DEBUG`  | Vercel           |
| **Sentry Backend**  | `SENTRY_AUTH_TOKEN`                     | Railway + GitHub |
| **Analytics**       | `VITE_ANALYTICS_*`                      | Vercel           |
| **OAuth**           | `VITE_OAUTH_*`, `VITE_APP_ID`           | Vercel           |

**الرموز:**

- ✅ = يجب وضعه هنا
- ⚠️ = اختياري لكن موصى به
- ❌ = لا تضعه هنا

---

## 📝 خطوات الإعداد السريع

### 1️⃣ Railway (Backend)

```bash
# في Railway Dashboard → Variables

# الأساسيات (مطلوبة)
DATABASE_URL=mysql://user:pass@host:3306/db
JWT_SECRET=<استخدم: openssl rand -base64 32>
SESSION_SECRET=<استخدم: openssl rand -base64 32>
ADMIN_EMAIL=admin@rabit.sa
ADMIN_PASSWORD=<كلمة مرور قوية>

# موصى به
NODE_ENV=production
REDIS_URL=redis://default:pass@host:6379
RESEND_API_KEY=re_your_key
VITE_APP_URL=https://your-app.vercel.app
```

### 2️⃣ Vercel (Frontend)

```bash
# في Vercel Dashboard → Settings → Environment Variables

# مطلوب
VITE_APP_URL=https://your-app.vercel.app
VITE_API_URL=https://your-backend.railway.app

# موصى به
NODE_ENV=production
VITE_APP_TITLE=رابِط - منصة إدارة الموارد البشرية
VITE_APP_LOGO=/logo.png

# اختياري
VITE_SENTRY_DSN=https://key@sentry.io/project
```

### 3️⃣ GitHub (Secrets)

```bash
# في GitHub → Settings → Secrets → Actions

# للاختبارات
DATABASE_URL=mysql://test:test@localhost:3306/test
JWT_SECRET=test-secret-min-32-chars
SESSION_SECRET=test-session-secret

# للنشر التلقائي (اختياري)
VERCEL_TOKEN=your_token
VERCEL_ORG_ID=team_xxx
VERCEL_PROJECT_ID=prj_xxx
RAILWAY_TOKEN=your_railway_token
```

---

## 🎓 أمثلة كاملة

### مثال: Railway Environment

```env
# الأساسيات
NODE_ENV=production
DATABASE_URL=mysql://root:SecurePass123@containers-us-west.railway.app:5432/railway
JWT_SECRET=8x9y2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z
SESSION_SECRET=9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r
SESSION_MAX_AGE=604800000
ADMIN_EMAIL=admin@rabit.sa
ADMIN_PASSWORD=AdminSecure123!
PORT=3000

# الخدمات
REDIS_URL=redis://default:RedisPass@redis.railway.internal:6379
RESEND_API_KEY=re_123abc456def789ghi
RESEND_FROM_EMAIL=noreply@rabit.sa

# اختياري
VITE_APP_URL=https://rabit-hr.vercel.app
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtn...
MOYASAR_API_KEY=sk_test_...
OPENAI_API_KEY=sk-proj-...
```

### مثال: Vercel Environment

```env
# الأساسيات
NODE_ENV=production
VITE_APP_URL=https://rabit-hr.vercel.app
VITE_API_URL=https://rabithr-production.up.railway.app

# UI
VITE_APP_TITLE=رابِط - منصة إدارة الموارد البشرية
VITE_APP_LOGO=/logo.png

# المراقبة
VITE_SENTRY_DSN=https://abc123@o456789.ingest.sentry.io/123456
VITE_SENTRY_DEBUG=false

# الخرائط
VITE_FRONTEND_FORGE_API_URL=https://forge.butterfly-effect.dev
VITE_FRONTEND_FORGE_API_KEY=your_forge_key
```

---

## ⚠️ تحذيرات مهمة

### 🚫 لا تفعل هذا أبداً:

1. **لا تضع `JWT_SECRET` في Vercel** ❌
   - هذا سر الخادم فقط
   - ضعه في Railway فقط

2. **لا تضع `DATABASE_URL` في Vercel** ❌
   - Frontend لا يحتاج قاعدة بيانات
   - هذا للـ Backend فقط

3. **لا تنسى `VITE_` في Vercel** ❌
   - المتغيرات بدون `VITE_` لن تظهر في Frontend
   - تأكد أن كل متغير في Vercel يبدأ بـ `VITE_`

4. **لا تستخدم القيم الافتراضية في الإنتاج** ❌
   - غير جميع المفاتيح والأسرار
   - استخدم `openssl rand -base64 32` لإنشاء مفاتيح قوية

### ✅ افعل هذا دائماً:

1. **غير `ADMIN_PASSWORD` فوراً** ✅
   - بعد أول تسجيل دخول
   - استخدم كلمة مرور قوية

2. **استخدم HTTPS في الإنتاج** ✅
   - تأكد أن `VITE_APP_URL` و `VITE_API_URL` يستخدمان `https://`

3. **احفظ نسخة احتياطية آمنة** ✅
   - احفظ المتغيرات في مكان آمن
   - استخدم Password Manager

4. **راجع المتغيرات كل 90 يوم** ✅
   - حدّث المفاتيح والأسرار
   - احذف المتغيرات غير المستخدمة

---

## 🔍 التحقق من الإعداد

### Railway

```bash
# من CLI
railway variables

# أو من Dashboard
Railway → Your Project → Variables
```

### Vercel

```bash
# من CLI
vercel env ls

# أو من Dashboard
Vercel → Settings → Environment Variables
```

### GitHub

```bash
# من CLI
gh secret list

# أو من Dashboard
GitHub → Settings → Secrets → Actions
```

---

## 🆘 مشاكل شائعة وحلولها

| المشكلة                          | السبب المحتمل          | الحل                          |
| -------------------------------- | ---------------------- | ----------------------------- |
| "Database connection failed"     | `DATABASE_URL` خطأ     | تحقق من الرابط في Railway     |
| "JWT Secret not configured"      | `JWT_SECRET` غير موجود | أضفه في Railway (32+ حرف)     |
| "Cannot connect to API"          | `VITE_API_URL` خطأ     | صحح الرابط في Vercel          |
| "Environment variable undefined" | نسيت `VITE_`           | أضف `VITE_` في بداية المتغير  |
| "Session expired quickly"        | `SESSION_MAX_AGE` قصير | زد المدة (default: 604800000) |

---

## 📚 موارد إضافية

### الأدلة الكاملة (مفصّلة)

- 🚂 **[ENV_RAILWAY.md](./ENV_RAILWAY.md)** - دليل Railway الكامل
- ▲ **[ENV_VERCEL.md](./ENV_VERCEL.md)** - دليل Vercel الكامل
- 🐙 **[ENV_GITHUB.md](./ENV_GITHUB.md)** - دليل GitHub الكامل

### التوثيق الشامل

- 📖 **[ENV_VARIABLES_AR.md](./ENV_VARIABLES_AR.md)** - دليل شامل بالعربية
- 📖 **[ENV_VARIABLES_EN.md](./ENV_VARIABLES_EN.md)** - دليل شامل بالإنجليزية

### ملفات المساعدة

- 📄 **[.env.example](./.env.example)** - ملف مثال محدّث
- 📝 **[INSTALLATION.md](./INSTALLATION.md)** - دليل التثبيت
- 🚀 **[DEPLOYMENT_GUIDE_FULL.md](./DEPLOYMENT_GUIDE_FULL.md)** - دليل النشر

---

## ✅ قائمة التحقق النهائية

### قبل النشر:

- [ ] أضفت جميع المتغيرات المطلوبة في Railway
- [ ] أضفت `VITE_APP_URL` و `VITE_API_URL` في Vercel
- [ ] أنشأت مفاتيح آمنة باستخدام `openssl rand -base64 32`
- [ ] غيّرت `ADMIN_PASSWORD` من القيمة الافتراضية
- [ ] تحققت أن جميع المتغيرات في Vercel تبدأ بـ `VITE_`
- [ ] أضفت `REDIS_URL` للأداء الأفضل (موصى به)
- [ ] حفظت نسخة احتياطية آمنة من جميع المتغيرات

### بعد النشر:

- [ ] اختبرت تسجيل الدخول بحساب المدير
- [ ] تحققت من اتصال Frontend بـ Backend
- [ ] غيّرت كلمة مرور المدير من حساب المدير
- [ ] اختبرت خدمة البريد الإلكتروني (إذا مفعّلة)
- [ ] راجعت سجلات الأخطاء (logs)

---

**آخر تحديث:** 2025-11-05  
**الإصدار:** 1.0.0

**ملاحظة:** هذا الدليل يغطي جميع المتغيرات المستخدمة في التطبيق. لا تحتاج لإضافة كل المتغيرات الاختيارية - فقط أضف ما تحتاجه حسب الميزات التي تريد تفعيلها.
