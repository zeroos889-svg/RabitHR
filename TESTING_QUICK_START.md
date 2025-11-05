# دليل البدء السريع للاختبار - Testing Quick Start

## 🚀 اختبار سريع لقاعدة البيانات

### خطوة 1: تعيين DATABASE_URL
```bash
export DATABASE_URL="mysql://root:CMMyDTJYozRfFgTcccnMfcEpwRbqqWMz@shortline.proxy.rlwy.net:18829/railway"
```

### خطوة 2: تشغيل سكريبت الاختبار
```bash
node scripts/test-database-connection.mjs
```

### النتيجة المتوقعة ✅
```
╔════════════════════════════════════════════════════════════════╗
║         Database Connection Test Suite                        ║
║         مجموعة اختبارات الاتصال بقاعدة البيانات               ║
╚════════════════════════════════════════════════════════════════╝

━━━ 1. Testing Database Connection ━━━
✅ Successfully connected to MySQL database
✅ Database ping successful
✅ MySQL Version: 8.x.x

━━━ 2. Testing Database Tables ━━━
✅ Table 'users' exists
✅ Table 'consultants' exists
✅ Table 'consultationBookings' exists
...

Test Summary:
Passed: 7/7
✅ All tests passed! Database is properly connected and working.
```

---

## 📝 الاختبارات المتاحة

### 1. اختبار قاعدة البيانات الشامل
```bash
node scripts/test-database-connection.mjs
```

**يختبر:**
- ✅ الاتصال بـ MySQL
- ✅ وجود الجداول
- ✅ عمليات المستخدمين
- ✅ المستشارين
- ✅ الحجوزات
- ✅ القوالب
- ✅ الأداء

### 2. اختبارات الوحدة (Unit Tests)
```bash
pnpm test server/db.test.ts
```

لا تحتاج اتصال حقيقي بقاعدة البيانات.

### 3. اختبارات التكامل (Integration Tests)
```bash
export DATABASE_URL="..."
pnpm test server/__tests__/db-integration.test.ts
```

تحتاج اتصال حقيقي بقاعدة البيانات.

### 4. جميع الاختبارات
```bash
pnpm test
```

---

## 🔧 استكشاف الأخطاء السريع

### خطأ: `ENOTFOUND shortline.proxy.rlwy.net`
**السبب:** لا يمكن الوصول إلى Railway من البيئة الحالية

**الحل:**
1. جرب من جهازك المحلي
2. تأكد من اتصالك بالإنترنت
3. في CI: هذا متوقع - Railway غير متاح من GitHub Actions

### خطأ: `Access denied`
**السبب:** كلمة المرور خاطئة

**الحل:**
1. تحقق من DATABASE_URL
2. احصل على credentials جديدة من Railway dashboard

### خطأ: `pnpm: command not found`
**الحل:**
```bash
corepack enable
pnpm install
```

---

## 📚 المزيد من الوثائق

- **دليل الاختبار الكامل:** [DATABASE_TESTING_GUIDE.md](./DATABASE_TESTING_GUIDE.md)
- **دليل CI Workflow:** [CI_WORKFLOW_GUIDE.md](./CI_WORKFLOW_GUIDE.md)
- **دليل CI بالإنجليزية:** [CI_WORKFLOW_README.md](./CI_WORKFLOW_README.md)

---

## ⚡ اختصارات مفيدة

```bash
# اختبار سريع
export DATABASE_URL="mysql://..." && node scripts/test-database-connection.mjs

# تشغيل التطبيق محلياً
pnpm dev

# بناء التطبيق
pnpm build

# فحص TypeScript
pnpm tsc --noEmit

# فحص التنسيق
pnpm lint
```

---

**تم الإنشاء:** 2025-11-05  
**الإصدار:** 1.0
