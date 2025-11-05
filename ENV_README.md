# 🔐 دليل المتغيرات البيئية

## 📖 اختر دليلك

### 🚀 البداية السريعة

**[ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md)** - دليل الإعداد الكامل مع جداول وأمثلة  
👉 **ابدأ من هنا** إذا كنت تريد فهم سريع وشامل

---

### 📱 حسب المنصة

#### 🚂 Railway (Backend)

**[ENV_RAILWAY.md](./ENV_RAILWAY.md)**  
جميع المتغيرات التي يجب وضعها في Railway Dashboard

**المتغيرات الأساسية:**

```env
DATABASE_URL=...
JWT_SECRET=...
SESSION_SECRET=...
ADMIN_EMAIL=...
ADMIN_PASSWORD=...
```

---

#### ▲ Vercel (Frontend)

**[ENV_VERCEL.md](./ENV_VERCEL.md)**  
جميع المتغيرات التي يجب وضعها في Vercel Dashboard

**المتغيرات الأساسية:**

```env
VITE_APP_URL=...
VITE_API_URL=...
VITE_APP_TITLE=...
```

---

#### 🐙 GitHub (CI/CD)

**[ENV_GITHUB.md](./ENV_GITHUB.md)**  
الأسرار المطلوبة في GitHub Secrets

**الأسرار الأساسية:**

```env
DATABASE_URL (للاختبار)
VERCEL_TOKEN
RAILWAY_TOKEN
```

---

### 📚 التوثيق الشامل

#### 🇸🇦 بالعربية

**[ENV_VARIABLES_AR.md](./ENV_VARIABLES_AR.md)**  
دليل شامل لجميع المتغيرات البيئية بالعربية

#### 🇬🇧 بالإنجليزية

**[ENV_VARIABLES_EN.md](./ENV_VARIABLES_EN.md)**  
Comprehensive guide for all environment variables in English

---

### 📄 ملف المثال

**[.env.example](./.env.example)**  
ملف مثال محدّث بجميع المتغيرات مع شرح لكل واحد

---

## 🎯 ماذا أقرأ؟

### إذا كنت تريد...

**✅ فهم سريع لكل شيء:**  
→ اقرأ [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md)

**✅ إعداد Railway فقط:**  
→ اقرأ [ENV_RAILWAY.md](./ENV_RAILWAY.md)

**✅ إعداد Vercel فقط:**  
→ اقرأ [ENV_VERCEL.md](./ENV_VERCEL.md)

**✅ إعداد GitHub Actions:**  
→ اقرأ [ENV_GITHUB.md](./ENV_GITHUB.md)

**✅ شرح تفصيلي لكل متغير:**  
→ اقرأ [ENV_VARIABLES_AR.md](./ENV_VARIABLES_AR.md)

**✅ English documentation:**  
→ Read [ENV_VARIABLES_EN.md](./ENV_VARIABLES_EN.md)

---

## 📊 ملخص المتغيرات

### المطلوبة (لا يعمل بدونها)

- `DATABASE_URL` - قاعدة البيانات
- `JWT_SECRET` - مفتاح JWT (32+ حرف)
- `SESSION_SECRET` - مفتاح الجلسات
- `ADMIN_EMAIL` - بريد المدير
- `ADMIN_PASSWORD` - كلمة المرور
- `VITE_APP_URL` - رابط Frontend
- `VITE_API_URL` - رابط Backend

### الموصى بها

- `REDIS_URL` - للأداء الأفضل
- `RESEND_API_KEY` - للبريد الإلكتروني
- `NODE_ENV=production` - بيئة الإنتاج

### الاختيارية (حسب الحاجة)

- Payment Gateways (Moyasar, Tap)
- SMS Services (Twilio, Unifonic)
- Cloud Storage (AWS S3)
- AI (OpenAI)
- Maps (Google Maps)
- Analytics & Monitoring (Sentry)

---

## 🔗 الملفات

| الملف                                        | الحجم   | الوصف                      |
| -------------------------------------------- | ------- | -------------------------- |
| [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md)   | ~12 KB  | دليل الإعداد الرئيسي       |
| [ENV_RAILWAY.md](./ENV_RAILWAY.md)           | ~5.4 KB | دليل Railway               |
| [ENV_VERCEL.md](./ENV_VERCEL.md)             | ~7 KB   | دليل Vercel                |
| [ENV_GITHUB.md](./ENV_GITHUB.md)             | ~11 KB  | دليل GitHub                |
| [ENV_VARIABLES_AR.md](./ENV_VARIABLES_AR.md) | ~11 KB  | توثيق شامل بالعربية        |
| [ENV_VARIABLES_EN.md](./ENV_VARIABLES_EN.md) | ~8.7 KB | Comprehensive English docs |
| [.env.example](./.env.example)               | محدّث   | ملف مثال محدّث             |

---

## 🆘 المساعدة

إذا واجهت أي مشاكل:

1. راجع [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md) - قسم "مشاكل شائعة"
2. تأكد من إضافة جميع المتغيرات المطلوبة
3. تحقق من صحة القيم (خاصة URLs)
4. راجع سجلات الأخطاء (logs)

---

**آخر تحديث:** 2025-11-05  
**إجمالي المتغيرات:** 44 متغير بيئي
