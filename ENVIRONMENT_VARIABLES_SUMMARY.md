# 📋 ملخص المتغيرات البيئية - مرجع سريع

## 🎯 أين أذهب؟

| إذا كنت تريد...        | اذهب إلى                                     |
| ---------------------- | -------------------------------------------- |
| **البدء السريع**       | [ENV_README.md](./ENV_README.md)             |
| **إعداد Railway**      | [ENV_RAILWAY.md](./ENV_RAILWAY.md)           |
| **إعداد Vercel**       | [ENV_VERCEL.md](./ENV_VERCEL.md)             |
| **إعداد GitHub**       | [ENV_GITHUB.md](./ENV_GITHUB.md)             |
| **دليل شامل بالعربية** | [ENV_VARIABLES_AR.md](./ENV_VARIABLES_AR.md) |
| **English guide**      | [ENV_VARIABLES_EN.md](./ENV_VARIABLES_EN.md) |

---

## 🚂 Railway (Backend) - نسخ ولصق

```env
# المطلوبة - انسخ والصق في Railway Variables
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=<استخدم: openssl rand -base64 32>
SESSION_SECRET=<استخدم: openssl rand -base64 32>
ADMIN_EMAIL=admin@rabit.sa
ADMIN_PASSWORD=<كلمة مرور قوية>

# الموصى بها
NODE_ENV=production
REDIS_URL=redis://default:password@host:6379
RESEND_API_KEY=re_your_key_here
RESEND_FROM_EMAIL=noreply@rabit.sa
VITE_APP_URL=https://your-app.vercel.app
PORT=3000
```

---

## ▲ Vercel (Frontend) - نسخ ولصق

```env
# المطلوبة - انسخ والصق في Vercel Environment Variables
VITE_APP_URL=https://your-app.vercel.app
VITE_API_URL=https://your-backend.railway.app

# الموصى بها
NODE_ENV=production
VITE_APP_TITLE=رابِط - منصة إدارة الموارد البشرية
VITE_APP_LOGO=/logo.png

# الاختيارية
VITE_SENTRY_DSN=https://key@sentry.io/project-id
VITE_SENTRY_DEBUG=false
```

---

## 🐙 GitHub Secrets - نسخ ولصق

```env
# للاختبارات - انسخ والصق في GitHub Secrets
DATABASE_URL=mysql://test:test@localhost:3306/test_db
JWT_SECRET=test-jwt-secret-for-ci-min-32-chars
SESSION_SECRET=test-session-secret

# للنشر التلقائي (اختياري)
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=team_xxx
VERCEL_PROJECT_ID=prj_xxx
RAILWAY_TOKEN=your_railway_token
```

---

## 📊 جدول المتغيرات الكامل

| المتغير                       | Railway | Vercel | GitHub  | الوصف                           |
| ----------------------------- | :-----: | :----: | :-----: | ------------------------------- |
| `NODE_ENV`                    |   ✅    |   ✅   |   ✅    | بيئة التشغيل                    |
| `DATABASE_URL`                |   ✅    |   ❌   | ✅ test | رابط قاعدة البيانات             |
| `JWT_SECRET`                  |   ✅    |   ❌   | ✅ test | مفتاح JWT (32+ حرف)             |
| `SESSION_SECRET`              |   ✅    |   ❌   | ✅ test | مفتاح الجلسات                   |
| `SESSION_MAX_AGE`             |   ✅    |   ❌   |   ❌    | مدة الجلسة (default: 604800000) |
| `ADMIN_EMAIL`                 |   ✅    |   ❌   |   ❌    | بريد المدير                     |
| `ADMIN_PASSWORD`              |   ✅    |   ❌   |   ❌    | كلمة مرور المدير                |
| `PORT`                        |   ✅    |   ❌   |   ❌    | منفذ الخادم (default: 3000)     |
| `VITE_APP_URL`                |   ⚠️    |   ✅   |   ❌    | رابط Frontend                   |
| `VITE_API_URL`                |   ❌    |   ✅   |   ❌    | رابط Backend API                |
| `VITE_APP_TITLE`              |   ❌    |   ✅   |   ❌    | عنوان التطبيق                   |
| `VITE_APP_LOGO`               |   ❌    |   ✅   |   ❌    | شعار التطبيق                    |
| `REDIS_URL`                   |   ✅    |   ❌   |   ❌    | Redis للتخزين المؤقت            |
| `RESEND_API_KEY`              |   ✅    |   ❌   |   ❌    | Resend للبريد                   |
| `RESEND_FROM_EMAIL`           |   ✅    |   ❌   |   ❌    | البريد المرسل                   |
| `AWS_ACCESS_KEY_ID`           |   ✅    |   ❌   |   ❌    | AWS S3                          |
| `AWS_SECRET_ACCESS_KEY`       |   ✅    |   ❌   |   ❌    | AWS S3                          |
| `AWS_REGION`                  |   ✅    |   ❌   |   ❌    | AWS Region                      |
| `AWS_S3_BUCKET`               |   ✅    |   ❌   |   ❌    | S3 Bucket                       |
| `MOYASAR_API_KEY`             |   ✅    |   ❌   |   ❌    | بوابة دفع                       |
| `MOYASAR_SECRET_KEY`          |   ✅    |   ❌   |   ❌    | بوابة دفع                       |
| `MOYASAR_WEBHOOK_SECRET`      |   ✅    |   ❌   |   ❌    | بوابة دفع                       |
| `TAP_API_KEY`                 |   ✅    |   ❌   |   ❌    | بوابة دفع                       |
| `TAP_SECRET_KEY`              |   ✅    |   ❌   |   ❌    | بوابة دفع                       |
| `SMS_API_KEY`                 |   ✅    |   ❌   |   ❌    | الرسائل النصية                  |
| `SMS_SENDER_ID`               |   ✅    |   ❌   |   ❌    | معرف المرسل                     |
| `TWILIO_PHONE_NUMBER`         |   ✅    |   ❌   |   ❌    | Twilio SMS                      |
| `TWILIO_AUTH_TOKEN`           |   ✅    |   ❌   |   ❌    | Twilio SMS                      |
| `UNIFONIC_APP_SID`            |   ✅    |   ❌   |   ❌    | Unifonic SMS                    |
| `SMTP_HOST`                   |   ✅    |   ❌   |   ❌    | SMTP البديل                     |
| `SMTP_PORT`                   |   ✅    |   ❌   |   ❌    | SMTP البديل                     |
| `SMTP_USER`                   |   ✅    |   ❌   |   ❌    | SMTP البديل                     |
| `SMTP_PASSWORD`               |   ✅    |   ❌   |   ❌    | SMTP البديل                     |
| `SMTP_FROM`                   |   ✅    |   ❌   |   ❌    | SMTP البديل                     |
| `GOOGLE_MAPS_API_KEY`         |   ✅    |   ❌   |   ❌    | خرائط جوجل                      |
| `OPENAI_API_KEY`              |   ✅    |   ❌   |   ❌    | الذكاء الاصطناعي                |
| `BUILT_IN_FORGE_API_URL`      |   ✅    |   ❌   |   ❌    | Forge Backend                   |
| `BUILT_IN_FORGE_API_KEY`      |   ✅    |   ❌   |   ❌    | Forge Backend                   |
| `VITE_FRONTEND_FORGE_API_URL` |   ❌    |   ✅   |   ❌    | Forge Frontend                  |
| `VITE_FRONTEND_FORGE_API_KEY` |   ❌    |   ✅   |   ❌    | Forge Frontend                  |
| `VITE_ANALYTICS_ENDPOINT`     |   ❌    |   ✅   |   ❌    | التحليلات                       |
| `VITE_ANALYTICS_WEBSITE_ID`   |   ❌    |   ✅   |   ❌    | التحليلات                       |
| `VITE_SENTRY_DSN`             |   ❌    |   ✅   |   ❌    | Sentry Frontend                 |
| `VITE_SENTRY_DEBUG`           |   ❌    |   ✅   |   ❌    | Sentry Debug                    |
| `SENTRY_AUTH_TOKEN`           |   ✅    |   ❌   |   ✅    | Sentry Backend                  |
| `VITE_OAUTH_PORTAL_URL`       |   ❌    |   ✅   |   ❌    | OAuth Portal                    |
| `VITE_APP_ID`                 |   ❌    |   ✅   |   ❌    | OAuth App ID                    |
| `VERCEL_TOKEN`                |   ❌    |   ❌   |   ✅    | Vercel Deploy                   |
| `VERCEL_ORG_ID`               |   ❌    |   ❌   |   ✅    | Vercel Deploy                   |
| `VERCEL_PROJECT_ID`           |   ❌    |   ❌   |   ✅    | Vercel Deploy                   |
| `RAILWAY_TOKEN`               |   ❌    |   ❌   |   ✅    | Railway Deploy                  |
| `MYSQL_ROOT_PASSWORD`         |   ❌    |   ❌   |   ❌    | Docker فقط                      |

**الرموز:**

- ✅ = يجب وضعه هنا
- ⚠️ = اختياري لكن موصى به
- ❌ = لا تضعه هنا

---

## 🔑 إنشاء المفاتيح الآمنة

```bash
# إنشاء JWT_SECRET
openssl rand -base64 32

# إنشاء SESSION_SECRET
openssl rand -base64 32

# أو استخدم أي مولد مفاتيح عشوائي (32+ حرف)
```

---

## ⚠️ تحذيرات مهمة

### ❌ لا تفعل:

1. لا تضع `JWT_SECRET` في Vercel
2. لا تضع `DATABASE_URL` في Vercel
3. لا تنسى `VITE_` للمتغيرات في Vercel
4. لا تستخدم القيم الافتراضية في الإنتاج

### ✅ افعل:

1. استخدم `openssl rand -base64 32` لإنشاء المفاتيح
2. غير `ADMIN_PASSWORD` فوراً بعد أول تسجيل دخول
3. استخدم قواعد بيانات منفصلة للتطوير والإنتاج
4. احفظ نسخة احتياطية آمنة من جميع المتغيرات

---

## 📞 المساعدة

**مشاكل شائعة:**

| المشكلة                          | الحل                                  |
| -------------------------------- | ------------------------------------- |
| "Database connection failed"     | تحقق من `DATABASE_URL` في Railway     |
| "JWT Secret not configured"      | أضف `JWT_SECRET` في Railway (32+ حرف) |
| "Cannot connect to API"          | صحح `VITE_API_URL` في Vercel          |
| "Environment variable undefined" | أضف `VITE_` في بداية المتغير (Vercel) |

**للمزيد من المساعدة:**

- راجع [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md) - قسم "مشاكل شائعة"
- اقرأ الأدلة التفصيلية حسب المنصة

---

## ✅ قائمة التحقق السريعة

### قبل النشر:

- [ ] أضفت `DATABASE_URL` في Railway
- [ ] أضفت `JWT_SECRET` في Railway (32+ حرف)
- [ ] أضفت `SESSION_SECRET` في Railway
- [ ] أضفت `ADMIN_EMAIL` و `ADMIN_PASSWORD` في Railway
- [ ] أضفت `VITE_APP_URL` في Vercel
- [ ] أضفت `VITE_API_URL` في Vercel
- [ ] تحققت أن جميع المتغيرات في Vercel تبدأ بـ `VITE_`
- [ ] حفظت نسخة احتياطية من جميع المتغيرات

### بعد النشر:

- [ ] اختبرت تسجيل الدخول
- [ ] تحققت من اتصال Frontend بـ Backend
- [ ] غيّرت كلمة مرور المدير
- [ ] راجعت السجلات (logs)

---

**آخر تحديث:** 2025-11-05  
**إجمالي المتغيرات:** 44 متغير بيئي  
**المنصات:** Railway, Vercel, GitHub
