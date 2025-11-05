# دليل اختبار قاعدة البيانات - Database Testing Guide

## نظرة عامة - Overview

هذا الدليل يشرح كيفية اختبار الاتصال بقاعدة البيانات والتأكد من أن النظام يعمل بشكل صحيح.

This guide explains how to test the database connection and ensure the system is working properly.

---

## 🔗 معلومات الاتصال - Connection Info

**قاعدة البيانات الحالية - Current Database:**

- **المزود / Provider:** Railway
- **النوع / Type:** MySQL
- **الاتصال / Connection:** Via `DATABASE_URL` environment variable

**DATABASE_URL Format:**

```
mysql://root:CMMyDTJYozRfFgTcccnMfcEpwRbqqWMz@shortline.proxy.rlwy.net:18829/railway
```

---

## ⚠️ ملاحظة مهمة - Important Note

**في بيئة CI/GitHub Actions:**

- قاعدة البيانات على Railway **غير متاحة** مباشرة من GitHub Actions
- السبب: قيود الشبكة وعدم إمكانية الوصول إلى خوادم Railway الخارجية
- الحل: الاختبارات تُشغل **محلياً** أو في **بيئة staging** لها وصول للشبكة

**In CI/GitHub Actions environment:**

- Railway database is **NOT accessible** directly from GitHub Actions
- Reason: Network restrictions and inability to reach external Railway servers
- Solution: Tests run **locally** or in a **staging environment** with network access

---

## 🧪 اختبار الاتصال محلياً - Test Connection Locally

### الطريقة 1: استخدام سكريبت الاختبار الشامل

```bash
# تعيين DATABASE_URL
export DATABASE_URL="mysql://root:CMMyDTJYozRfFgTcccnMfcEpwRbqqWMz@shortline.proxy.rlwy.net:18829/railway"

# تشغيل سكريبت الاختبار
node scripts/test-database-connection.mjs
```

**ما يختبره السكريبت:**

- ✅ الاتصال بقاعدة البيانات
- ✅ وجود الجداول المطلوبة (users, consultants, etc.)
- ✅ عمليات المستخدمين (إنشاء، قراءة)
- ✅ نظام الاستشارات
- ✅ القوالب
- ✅ أداء قاعدة البيانات

### الطريقة 2: اختبار يدوي بـ MySQL Client

```bash
# الاتصال بقاعدة البيانات
mysql -h shortline.proxy.rlwy.net -P 18829 -u root -pCMMyDTJYozRfFgTcccnMfcEpwRbqqWMz railway

# أو استخدام mycli (أفضل)
mycli mysql://root:CMMyDTJYozRfFgTcccnMfcEpwRbqqWMz@shortline.proxy.rlwy.net:18829/railway
```

**استعلامات مفيدة:**

```sql
-- عرض جميع الجداول
SHOW TABLES;

-- عدد المستخدمين
SELECT COUNT(*) FROM users;

-- عدد المستشارين حسب الحالة
SELECT status, COUNT(*) as count FROM consultants GROUP BY status;

-- عدد الحجوزات حسب الحالة
SELECT status, COUNT(*) as count FROM consultationBookings GROUP BY status;

-- القوالب النشطة
SELECT code, titleAr, category FROM templates WHERE isActive = 1;
```

### الطريقة 3: اختبار عبر تطبيق Node.js

إنشاء ملف `test-db.mjs`:

```javascript
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const DATABASE_URL =
  "mysql://root:CMMyDTJYozRfFgTcccnMfcEpwRbqqWMz@shortline.proxy.rlwy.net:18829/railway";

async function test() {
  try {
    const connection = await mysql.createConnection(DATABASE_URL);
    console.log("✅ Connected to database successfully!");

    const [result] = await connection.query(
      "SELECT COUNT(*) as count FROM users"
    );
    console.log(`Found ${result[0].count} users`);

    await connection.end();
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
  }
}

test();
```

تشغيله:

```bash
node test-db.mjs
```

---

## 📊 نتائج الاختبار المتوقعة - Expected Test Results

### ✅ نجاح الاختبار - Successful Test

عند نجاح الاختبار، يجب أن ترى:

```
╔════════════════════════════════════════════════════════════════╗
║         Database Connection Test Suite                        ║
║         مجموعة اختبارات الاتصال بقاعدة البيانات               ║
╚════════════════════════════════════════════════════════════════╝

━━━ 1. Testing Database Connection ━━━
✅ Successfully connected to MySQL database
✅ Database ping successful
✅ MySQL Version: 8.x.x
✅ Current Database: railway

━━━ 2. Testing Database Tables ━━━
ℹ️  Found XX tables in database
✅ Table 'users' exists
✅ Table 'consultants' exists
✅ Table 'consultationBookings' exists
...

━━━ Test Summary ━━━
Total Tests: 7
Passed: 7
Failed: 0

✅ All tests passed! Database is properly connected and working.
✅ جميع الاختبارات نجحت! قاعدة البيانات متصلة وتعمل بشكل صحيح.
```

### ❌ فشل الاتصال - Connection Failure

إذا فشل الاتصال، ستحصل على:

```
❌ Connection failed: getaddrinfo ENOTFOUND shortline.proxy.rlwy.net
```

**الأسباب المحتملة:**

1. **قيود الشبكة**: البيئة الحالية لا تستطيع الوصول إلى Railway
2. **انتهاء الـ credentials**: يجب تحديث DATABASE_URL
3. **قاعدة البيانات متوقفة**: تحقق من Railway dashboard
4. **Firewall**: قد يمنع الـ firewall الاتصال

---

## 🏗️ بنية قاعدة البيانات - Database Schema

### الجداول الرئيسية - Main Tables

| جدول / Table           | الوصف / Description                        |
| ---------------------- | ------------------------------------------ |
| `users`                | المستخدمون - Users                         |
| `passwords`            | كلمات المرور المشفرة - Encrypted passwords |
| `consultants`          | المستشارون - Consultants                   |
| `consultationBookings` | حجوزات الاستشارات - Consultation bookings  |
| `consultationTypes`    | أنواع الاستشارات - Consultation types      |
| `specializations`      | التخصصات - Specializations                 |
| `templates`            | القوالب - Templates                        |
| `generatedDocuments`   | المستندات المولدة - Generated documents    |
| `consultingPackages`   | باقات الاستشارات - Consulting packages     |
| `consultingTickets`    | تذاكر الاستشارات - Consulting tickets      |
| `notifications`        | الإشعارات - Notifications                  |
| `discountCodes`        | أكواد الخصم - Discount codes               |

---

## 🔐 متغيرات البيئة المطلوبة - Required Environment Variables

### في GitHub Actions:

```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  JWT_SECRET: ${{ secrets.JWT_SECRET }}
  SESSION_SECRET: ${{ secrets.SESSION_SECRET }}
  NODE_ENV: ${{ secrets.NODE_ENV }}
  PORT: ${{ secrets.PORT }}
```

### محلياً (Local):

إنشاء ملف `.env`:

```bash
DATABASE_URL="mysql://root:CMMyDTJYozRfFgTcccnMfcEpwRbqqWMz@shortline.proxy.rlwy.net:18829/railway"
JWT_SECRET="your-jwt-secret"
SESSION_SECRET="your-session-secret"
NODE_ENV="development"
PORT="3000"
```

---

## 🚀 تشغيل التطبيق محلياً - Run Application Locally

### 1. تثبيت الاعتماديات

```bash
pnpm install
```

### 2. إعداد متغيرات البيئة

```bash
cp .env.example .env
# ثم عدل .env وأضف DATABASE_URL
```

### 3. تشغيل الخادم

```bash
pnpm dev
```

### 4. اختبار الاتصال

```bash
node scripts/test-database-connection.mjs
```

---

## 📝 الاختبارات المتاحة - Available Tests

### 1. اختبارات الوحدة (Unit Tests)

```bash
pnpm test server/db.test.ts
```

هذه الاختبارات **لا تحتاج** اتصال حقيقي بقاعدة البيانات.

### 2. اختبارات التكامل (Integration Tests)

```bash
pnpm test server/__tests__/db-integration.test.ts
```

هذه الاختبارات **تحتاج** اتصال حقيقي بقاعدة البيانات.

### 3. سكريبت الاختبار الشامل

```bash
node scripts/test-database-connection.mjs
```

هذا السكريبت يختبر **كل شيء** ويعطي تقرير مفصل.

---

## 🔧 استكشاف الأخطاء - Troubleshooting

### المشكلة: `ENOTFOUND shortline.proxy.rlwy.net`

**السبب:** البيئة الحالية لا تستطيع الوصول إلى الإنترنت أو Railway servers.

**الحل:**

1. تأكد من أنك متصل بالإنترنت
2. جرب من جهازك المحلي
3. تحقق من إعدادات الـ firewall
4. في CI: هذا **متوقع** - لا تقلق

### المشكلة: `Access denied for user`

**السبب:** كلمة المرور خاطئة أو المستخدم غير موجود.

**الحل:**

1. تحقق من DATABASE_URL
2. تأكد من عدم وجود مسافات زائدة
3. احصل على credentials جديدة من Railway

### المشكلة: `Connection timeout`

**السبب:** قاعدة البيانات بطيئة أو غير متاحة.

**الحل:**

1. تحقق من Railway dashboard - هل الخدمة تعمل؟
2. انتظر قليلاً وحاول مرة أخرى
3. تحقق من حالة Railway على [status.railway.app](https://status.railway.app)

---

## ✅ خلاصة - Summary

### للتطوير المحلي (Local Development):

1. ✅ استخدم `DATABASE_URL` من Railway
2. ✅ شغل `node scripts/test-database-connection.mjs`
3. ✅ شغل التطبيق بـ `pnpm dev`

### لـ CI/GitHub Actions:

1. ✅ المتغيرات موجودة في GitHub Secrets
2. ✅ الاختبارات تعمل (اختبارات الوحدة فقط)
3. ⚠️ اختبارات قاعدة البيانات الحقيقية تُشغل محلياً

### لـ Production:

1. ✅ المتغيرات محفوظة على Railway
2. ✅ التطبيق متصل تلقائياً
3. ✅ لا حاجة لإعدادات إضافية

---

## 📞 الدعم - Support

إذا واجهت مشاكل:

1. **تحقق من Railway Dashboard**: هل الخدمة تعمل؟
2. **راجع الـ logs**: `railway logs`
3. **اختبر الاتصال محلياً** أولاً
4. **تأكد من متغيرات البيئة** صحيحة

---

**تاريخ الإنشاء:** 2025-11-05  
**الإصدار:** 1.0  
**المؤلف:** GitHub Copilot Agent
