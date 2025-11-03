# توثيق هيكل قاعدة البيانات (Database Schema Documentation)

**منصة رابِط لإدارة الموارد البشرية**  
**الإصدار:** 1.0.0  
**التاريخ:** نوفمبر 2025  
**نظام إدارة قواعد البيانات:** MySQL / TiDB

---

## نظرة عامة

تستخدم منصة رابِط قاعدة بيانات علائقية شاملة تحتوي على **55 جدولاً** مصممة لتغطية جميع جوانب إدارة الموارد البشرية. تم تصميم الهيكل بعناية لضمان الأداء العالي، سلامة البيانات، والقابلية للتوسع.

### التقنيات المستخدمة

- **ORM**: Drizzle ORM
- **لغة الاستعلام**: SQL
- **المحرك**: InnoDB (MySQL) / TiDB
- **الترميز**: UTF-8mb4 (دعم كامل للعربية والإيموجي)

### مبادئ التصميم

1. **التطبيع (Normalization)**: جميع الجداول في الشكل الثالث (3NF) لتجنب التكرار
2. **الفهرسة (Indexing)**: فهارس على جميع المفاتيح الأجنبية والأعمدة المستخدمة في البحث
3. **القيود (Constraints)**: استخدام Foreign Keys و Unique Constraints لضمان سلامة البيانات
4. **التدقيق (Auditing)**: جميع الجداول تحتوي على `createdAt` و `updatedAt`

---

## 1. جداول المستخدمين والمصادقة

### 1.1 جدول `users`

**الوصف**: جدول المستخدمين الرئيسي الذي يخزن جميع حسابات المستخدمين في المنصة.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| openId | VARCHAR(64) | UNIQUE, NOT NULL | معرف Manus OAuth |
| name | TEXT | NULL | الاسم الكامل |
| email | VARCHAR(320) | NULL | البريد الإلكتروني |
| loginMethod | VARCHAR(64) | NULL | طريقة تسجيل الدخول |
| role | ENUM | NOT NULL, DEFAULT 'user' | الدور (user, admin) |
| createdAt | TIMESTAMP | NOT NULL | تاريخ الإنشاء |
| updatedAt | TIMESTAMP | NOT NULL | تاريخ آخر تحديث |
| lastSignedIn | TIMESTAMP | NOT NULL | آخر تسجيل دخول |

**الفهارس**:
- PRIMARY KEY على `id`
- UNIQUE INDEX على `openId`
- INDEX على `email`

**العلاقات**:
- `employees.userId` → `users.id`
- `consultants.userId` → `users.id`
- `tickets.createdBy` → `users.id`

**مثال SQL**:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  openId VARCHAR(64) UNIQUE NOT NULL,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role ENUM('user', 'admin') DEFAULT 'user' NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  lastSignedIn TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 2. جداول الموظفين

### 2.1 جدول `employees`

**الوصف**: معلومات الموظفين الأساسية.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| userId | INT | FK, NULL | ربط بحساب المستخدم |
| companyId | INT | FK, NOT NULL | الشركة التابع لها |
| employeeNumber | VARCHAR(50) | UNIQUE, NOT NULL | رقم الموظف |
| name | VARCHAR(255) | NOT NULL | الاسم الكامل |
| email | VARCHAR(320) | NOT NULL | البريد الإلكتروني |
| phone | VARCHAR(20) | NULL | رقم الجوال |
| nationalId | VARCHAR(20) | NULL | رقم الهوية الوطنية |
| department | VARCHAR(100) | NOT NULL | القسم |
| position | VARCHAR(100) | NOT NULL | المسمى الوظيفي |
| salary | DECIMAL(10,2) | NOT NULL | الراتب الأساسي |
| hireDate | DATE | NOT NULL | تاريخ التعيين |
| contractType | ENUM | NOT NULL | نوع العقد |
| status | ENUM | NOT NULL, DEFAULT 'active' | الحالة |
| createdAt | TIMESTAMP | NOT NULL | تاريخ الإنشاء |
| updatedAt | TIMESTAMP | NOT NULL | تاريخ آخر تحديث |

**القيم المسموحة**:
- `contractType`: permanent, temporary, contract, part_time
- `status`: active, inactive, suspended, terminated

**الفهارس**:
- PRIMARY KEY على `id`
- UNIQUE INDEX على `employeeNumber`
- INDEX على `companyId`
- INDEX على `department`
- INDEX على `status`

**العلاقات**:
- `employees.userId` → `users.id`
- `employees.companyId` → `companies.id`
- `leaves.employeeId` → `employees.id`
- `attendance.employeeId` → `employees.id`

### 2.2 جدول `employeeDocuments`

**الوصف**: المستندات المرفقة للموظفين (عقود، شهادات، إلخ).

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| employeeId | INT | FK, NOT NULL | الموظف |
| type | VARCHAR(50) | NOT NULL | نوع المستند |
| name | VARCHAR(255) | NOT NULL | اسم المستند |
| fileUrl | TEXT | NOT NULL | رابط الملف |
| uploadedAt | TIMESTAMP | NOT NULL | تاريخ الرفع |
| uploadedBy | INT | FK, NOT NULL | من قام بالرفع |

**أنواع المستندات**:
- contract: عقد العمل
- id_copy: صورة الهوية
- certificate: شهادة
- other: أخرى

---

## 3. جداول الشركات

### 3.1 جدول `companies`

**الوصف**: معلومات الشركات المسجلة في المنصة.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| name | VARCHAR(255) | NOT NULL | اسم الشركة |
| commercialRegister | VARCHAR(50) | NULL | السجل التجاري |
| taxNumber | VARCHAR(50) | NULL | الرقم الضريبي |
| address | TEXT | NULL | العنوان |
| phone | VARCHAR(20) | NULL | رقم الهاتف |
| email | VARCHAR(320) | NULL | البريد الإلكتروني |
| logo | TEXT | NULL | شعار الشركة |
| subscriptionPlan | ENUM | NOT NULL | الباقة |
| subscriptionStatus | ENUM | NOT NULL | حالة الاشتراك |
| subscriptionStartDate | DATE | NULL | بداية الاشتراك |
| subscriptionEndDate | DATE | NULL | نهاية الاشتراك |
| createdAt | TIMESTAMP | NOT NULL | تاريخ الإنشاء |
| updatedAt | TIMESTAMP | NOT NULL | تاريخ آخر تحديث |

**الباقات**:
- free: مجاني (للموظفين)
- freelancer: مستقل HR (299 ريال)
- startup: شركات ناشئة (799 ريال)
- business: شركات متوسطة (1499 ريال)
- enterprise: شركات كبيرة (2999 ريال)
- custom: مخصص

**حالات الاشتراك**:
- trial: تجريبي
- active: نشط
- expired: منتهي
- cancelled: ملغي

---

## 4. جداول الإجازات

### 4.1 جدول `leaves`

**الوصف**: طلبات الإجازات.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| employeeId | INT | FK, NOT NULL | الموظف |
| type | ENUM | NOT NULL | نوع الإجازة |
| startDate | DATE | NOT NULL | تاريخ البداية |
| endDate | DATE | NOT NULL | تاريخ النهاية |
| days | INT | NOT NULL | عدد الأيام |
| reason | TEXT | NULL | السبب |
| status | ENUM | NOT NULL, DEFAULT 'pending' | الحالة |
| approvedBy | INT | FK, NULL | من وافق |
| approvedAt | TIMESTAMP | NULL | تاريخ الموافقة |
| notes | TEXT | NULL | ملاحظات |
| createdAt | TIMESTAMP | NOT NULL | تاريخ الطلب |
| updatedAt | TIMESTAMP | NOT NULL | تاريخ آخر تحديث |

**أنواع الإجازات**:
- annual: سنوية (21 يوم)
- sick: مرضية (30 يوم بأجر كامل + 60 بنصف أجر)
- maternity: أمومة (10 أسابيع = 70 يوم)
- hajj: حج (10 أيام)
- marriage: زواج (5 أيام)
- death: وفاة (5 أيام)
- exam: امتحانات

**الحالات**:
- pending: قيد الانتظار
- approved: موافق عليها
- rejected: مرفوضة
- cancelled: ملغاة

### 4.2 جدول `leaveBalances`

**الوصف**: رصيد الإجازات لكل موظف.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| employeeId | INT | FK, NOT NULL | الموظف |
| year | INT | NOT NULL | السنة |
| annualTotal | INT | NOT NULL, DEFAULT 21 | إجمالي السنوية |
| annualUsed | INT | NOT NULL, DEFAULT 0 | المستخدم من السنوية |
| sickTotal | INT | NOT NULL, DEFAULT 30 | إجمالي المرضية |
| sickUsed | INT | NOT NULL, DEFAULT 0 | المستخدم من المرضية |
| updatedAt | TIMESTAMP | NOT NULL | تاريخ آخر تحديث |

**الفهارس**:
- UNIQUE INDEX على (`employeeId`, `year`)

---

## 5. جداول الحضور والانصراف

### 5.1 جدول `attendance`

**الوصف**: سجل الحضور والانصراف اليومي.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| employeeId | INT | FK, NOT NULL | الموظف |
| date | DATE | NOT NULL | التاريخ |
| checkIn | TIME | NULL | وقت الحضور |
| checkOut | TIME | NULL | وقت الانصراف |
| status | ENUM | NOT NULL | الحالة |
| lateMinutes | INT | DEFAULT 0 | دقائق التأخير |
| overtimeMinutes | INT | DEFAULT 0 | دقائق الإضافي |
| notes | TEXT | NULL | ملاحظات |
| createdAt | TIMESTAMP | NOT NULL | تاريخ الإنشاء |

**الحالات**:
- present: حاضر
- absent: غائب
- late: متأخر
- half_day: نصف يوم
- leave: إجازة

**الفهارس**:
- UNIQUE INDEX على (`employeeId`, `date`)

---

## 6. جداول الرواتب

### 6.1 جدول `payroll`

**الوصف**: كشوف الرواتب الشهرية.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| employeeId | INT | FK, NOT NULL | الموظف |
| month | VARCHAR(7) | NOT NULL | الشهر (YYYY-MM) |
| basicSalary | DECIMAL(10,2) | NOT NULL | الراتب الأساسي |
| housingAllowance | DECIMAL(10,2) | DEFAULT 0 | بدل سكن |
| transportAllowance | DECIMAL(10,2) | DEFAULT 0 | بدل نقل |
| foodAllowance | DECIMAL(10,2) | DEFAULT 0 | بدل طعام |
| otherAllowances | DECIMAL(10,2) | DEFAULT 0 | بدلات أخرى |
| gosiDeduction | DECIMAL(10,2) | DEFAULT 0 | خصم التأمينات |
| loanDeduction | DECIMAL(10,2) | DEFAULT 0 | خصم قروض |
| otherDeductions | DECIMAL(10,2) | DEFAULT 0 | خصومات أخرى |
| netSalary | DECIMAL(10,2) | NOT NULL | الصافي |
| workingDays | INT | NOT NULL | أيام العمل |
| absenceDays | INT | DEFAULT 0 | أيام الغياب |
| overtimeHours | DECIMAL(5,2) | DEFAULT 0 | ساعات إضافي |
| status | ENUM | NOT NULL | الحالة |
| paidAt | TIMESTAMP | NULL | تاريخ الصرف |
| createdAt | TIMESTAMP | NOT NULL | تاريخ الإنشاء |

**الحالات**:
- pending: قيد الإعداد
- approved: موافق عليه
- paid: مدفوع

**الفهارس**:
- UNIQUE INDEX على (`employeeId`, `month`)

### 6.2 جدول `payslips`

**الوصف**: كشوف الرواتب المصدرة (PDF).

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| payrollId | INT | FK, NOT NULL | كشف الراتب |
| fileUrl | TEXT | NOT NULL | رابط الملف |
| generatedAt | TIMESTAMP | NOT NULL | تاريخ الإصدار |

---

## 7. جداول نظام التوظيف (ATS)

### 7.1 جدول `jobs`

**الوصف**: الوظائف المعلن عنها.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| companyId | INT | FK, NOT NULL | الشركة |
| title | VARCHAR(255) | NOT NULL | المسمى الوظيفي |
| department | VARCHAR(100) | NOT NULL | القسم |
| location | VARCHAR(100) | NOT NULL | الموقع |
| type | VARCHAR(50) | NOT NULL | نوع الدوام |
| description | TEXT | NOT NULL | الوصف |
| requirements | TEXT | NOT NULL | المتطلبات |
| salaryMin | DECIMAL(10,2) | NULL | الحد الأدنى للراتب |
| salaryMax | DECIMAL(10,2) | NULL | الحد الأقصى للراتب |
| status | ENUM | NOT NULL, DEFAULT 'open' | الحالة |
| postedAt | TIMESTAMP | NOT NULL | تاريخ النشر |
| closedAt | TIMESTAMP | NULL | تاريخ الإغلاق |
| createdBy | INT | FK, NOT NULL | من أنشأها |
| createdAt | TIMESTAMP | NOT NULL | تاريخ الإنشاء |
| updatedAt | TIMESTAMP | NOT NULL | تاريخ آخر تحديث |

**الحالات**:
- draft: مسودة
- open: مفتوحة
- closed: مغلقة
- filled: تم التعيين

### 7.2 جدول `applicants`

**الوصف**: المتقدمين للوظائف.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| jobId | INT | FK, NOT NULL | الوظيفة |
| name | VARCHAR(255) | NOT NULL | الاسم |
| email | VARCHAR(320) | NOT NULL | البريد الإلكتروني |
| phone | VARCHAR(20) | NOT NULL | الجوال |
| resumeUrl | TEXT | NOT NULL | رابط السيرة الذاتية |
| coverLetter | TEXT | NULL | خطاب التقديم |
| stage | ENUM | NOT NULL, DEFAULT 'applied' | المرحلة |
| rating | INT | NULL | التقييم (1-5) |
| notes | TEXT | NULL | ملاحظات |
| appliedAt | TIMESTAMP | NOT NULL | تاريخ التقديم |
| updatedAt | TIMESTAMP | NOT NULL | تاريخ آخر تحديث |

**المراحل**:
- applied: تقدم
- screening: فحص أولي
- interview: مقابلة
- assessment: تقييم
- offer: عرض وظيفي
- hired: تم التوظيف
- rejected: مرفوض

---

## 8. جداول التذاكر

### 8.1 جدول `tickets`

**الوصف**: تذاكر الدعم والاستفسارات.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| companyId | INT | FK, NOT NULL | الشركة |
| createdBy | INT | FK, NOT NULL | من أنشأها |
| title | VARCHAR(255) | NOT NULL | العنوان |
| description | TEXT | NOT NULL | الوصف |
| category | VARCHAR(50) | NOT NULL | الفئة |
| priority | ENUM | NOT NULL | الأولوية |
| status | ENUM | NOT NULL, DEFAULT 'open' | الحالة |
| assignedTo | INT | FK, NULL | المعين له |
| source | VARCHAR(50) | DEFAULT 'web' | المصدر |
| createdAt | TIMESTAMP | NOT NULL | تاريخ الإنشاء |
| updatedAt | TIMESTAMP | NOT NULL | تاريخ آخر تحديث |
| closedAt | TIMESTAMP | NULL | تاريخ الإغلاق |

**الفئات**:
- payroll: رواتب
- leave: إجازات
- benefits: مزايا
- technical: تقني
- other: أخرى

**الأولويات**:
- low: منخفضة
- medium: متوسطة
- high: عالية
- urgent: عاجلة

**الحالات**:
- open: مفتوحة
- in_progress: قيد المعالجة
- resolved: محلولة
- closed: مغلقة

### 8.2 جدول `ticketReplies`

**الوصف**: الردود على التذاكر.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| ticketId | INT | FK, NOT NULL | التذكرة |
| userId | INT | FK, NOT NULL | المستخدم |
| message | TEXT | NOT NULL | الرسالة |
| attachments | TEXT | NULL | المرفقات (JSON) |
| createdAt | TIMESTAMP | NOT NULL | تاريخ الإنشاء |

---

## 9. جداول الشهادات

### 9.1 جدول `certificates`

**الوصف**: الشهادات المصدرة للموظفين.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| employeeId | INT | FK, NOT NULL | الموظف |
| type | VARCHAR(50) | NOT NULL | نوع الشهادة |
| purpose | VARCHAR(255) | NULL | الغرض |
| language | VARCHAR(10) | NOT NULL | اللغة |
| copies | INT | DEFAULT 1 | عدد النسخ |
| fileUrl | TEXT | NOT NULL | رابط الملف |
| issuedAt | TIMESTAMP | NOT NULL | تاريخ الإصدار |
| validUntil | TIMESTAMP | NULL | صالحة حتى |
| issuedBy | INT | FK, NOT NULL | من أصدرها |

**أنواع الشهادات**:
- salary: شهادة راتب
- experience: شهادة خبرة
- employment: شهادة تعريف بالراتب
- embassy: شهادة للسفارات

---

## 10. جداول الاستشارات

### 10.1 جدول `consultingPackages`

**الوصف**: باقات الاستشارات المتاحة.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| name | VARCHAR(255) | NOT NULL | اسم الباقة |
| price | DECIMAL(10,2) | NOT NULL | السعر |
| duration | INT | NOT NULL | المدة (بالأيام) |
| ticketsCount | INT | NOT NULL | عدد التذاكر |
| features | TEXT | NOT NULL | المميزات (JSON) |
| isActive | BOOLEAN | DEFAULT true | نشطة؟ |
| createdAt | TIMESTAMP | NOT NULL | تاريخ الإنشاء |
| updatedAt | TIMESTAMP | NOT NULL | تاريخ آخر تحديث |

**الباقات الافتراضية**:
- أساسية: 200 ريال، 7 أيام، 3 تذاكر
- احترافية: 400 ريال، 14 يوم، 7 تذاكر
- متقدمة: 750 ريال، 30 يوم، 15 تذكرة

### 10.2 جدول `consultingTickets`

**الوصف**: تذاكر الاستشارات.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| userId | INT | FK, NOT NULL | المستخدم |
| packageId | INT | FK, NOT NULL | الباقة |
| title | VARCHAR(255) | NOT NULL | العنوان |
| description | TEXT | NOT NULL | الوصف |
| priority | ENUM | NOT NULL | الأولوية |
| status | ENUM | NOT NULL, DEFAULT 'open' | الحالة |
| slaDeadline | TIMESTAMP | NOT NULL | موعد SLA |
| assignedTo | INT | FK, NULL | المستشار المعين |
| createdAt | TIMESTAMP | NOT NULL | تاريخ الإنشاء |
| resolvedAt | TIMESTAMP | NULL | تاريخ الحل |

**SLA (اتفاقية مستوى الخدمة)**:
- عاجلة: 4 ساعات
- عالية: 8 ساعات
- متوسطة: 24 ساعة
- منخفضة: 48 ساعة

### 10.3 جدول `consultingResponses`

**الوصف**: ردود المستشارين.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| ticketId | INT | FK, NOT NULL | التذكرة |
| consultantId | INT | FK, NOT NULL | المستشار |
| response | TEXT | NOT NULL | الرد |
| attachments | TEXT | NULL | المرفقات (JSON) |
| createdAt | TIMESTAMP | NOT NULL | تاريخ الإنشاء |

---

## 11. جداول الدورات التدريبية

### 11.1 جدول `courses`

**الوصف**: الدورات التدريبية المتاحة.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| title | VARCHAR(255) | NOT NULL | العنوان |
| description | TEXT | NOT NULL | الوصف |
| instructor | VARCHAR(255) | NOT NULL | المدرب |
| duration | VARCHAR(50) | NOT NULL | المدة |
| price | DECIMAL(10,2) | NOT NULL | السعر |
| category | VARCHAR(100) | NOT NULL | الفئة |
| level | ENUM | NOT NULL | المستوى |
| thumbnail | TEXT | NULL | الصورة المصغرة |
| rating | DECIMAL(3,2) | DEFAULT 0 | التقييم |
| studentsCount | INT | DEFAULT 0 | عدد الطلاب |
| isPublished | BOOLEAN | DEFAULT false | منشورة؟ |
| createdAt | TIMESTAMP | NOT NULL | تاريخ الإنشاء |
| updatedAt | TIMESTAMP | NOT NULL | تاريخ آخر تحديث |

**المستويات**:
- beginner: مبتدئ
- intermediate: متوسط
- advanced: متقدم

### 11.2 جدول `courseEnrollments`

**الوصف**: تسجيلات الطلاب في الدورات.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| userId | INT | FK, NOT NULL | المستخدم |
| courseId | INT | FK, NOT NULL | الدورة |
| progress | INT | DEFAULT 0 | التقدم (0-100) |
| status | ENUM | NOT NULL | الحالة |
| enrolledAt | TIMESTAMP | NOT NULL | تاريخ التسجيل |
| completedAt | TIMESTAMP | NULL | تاريخ الإكمال |

**الحالات**:
- enrolled: مسجل
- in_progress: قيد الدراسة
- completed: مكتمل
- dropped: منسحب

---

## 12. جداول مولّد النماذج

### 12.1 جدول `templates`

**الوصف**: قوالب المستندات الجاهزة.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| name | VARCHAR(255) | NOT NULL | اسم القالب |
| category | VARCHAR(100) | NOT NULL | الفئة |
| description | TEXT | NOT NULL | الوصف |
| template | TEXT | NOT NULL | نص القالب |
| variables | TEXT | NOT NULL | المتغيرات (JSON) |
| isActive | BOOLEAN | DEFAULT true | نشط؟ |
| usageCount | INT | DEFAULT 0 | عدد مرات الاستخدام |
| createdAt | TIMESTAMP | NOT NULL | تاريخ الإنشاء |
| updatedAt | TIMESTAMP | NOT NULL | تاريخ آخر تحديث |

**الفئات**:
- employment: توظيف
- certificates: شهادات
- internal: خطابات داخلية
- disciplinary: إجراءات تأديبية
- external: خطابات خارجية
- termination: إنهاء خدمة

### 12.2 جدول `generatedDocuments`

**الوصف**: المستندات المولّدة بالذكاء الاصطناعي.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| userId | INT | FK, NOT NULL | المستخدم |
| templateId | INT | FK, NULL | القالب المستخدم |
| companyName | VARCHAR(255) | NOT NULL | اسم الشركة |
| content | TEXT | NOT NULL | المحتوى |
| language | VARCHAR(10) | NOT NULL | اللغة |
| isSaved | BOOLEAN | DEFAULT false | محفوظ؟ |
| generatedAt | TIMESTAMP | NOT NULL | تاريخ التوليد |

---

## 13. جداول الإشعارات

### 13.1 جدول `notifications`

**الوصف**: إشعارات المستخدمين.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| userId | INT | FK, NOT NULL | المستخدم |
| title | VARCHAR(255) | NOT NULL | العنوان |
| message | TEXT | NOT NULL | الرسالة |
| type | VARCHAR(50) | NOT NULL | النوع |
| isRead | BOOLEAN | DEFAULT false | مقروء؟ |
| link | TEXT | NULL | رابط |
| createdAt | TIMESTAMP | NOT NULL | تاريخ الإنشاء |

**الأنواع**:
- leave_request: طلب إجازة
- leave_approved: موافقة إجازة
- ticket_reply: رد على تذكرة
- payroll_ready: كشف راتب جاهز
- system: نظام

---

## 14. جداول التدقيق

### 14.1 جدول `auditLogs`

**الوصف**: سجل جميع العمليات الحساسة.

**الأعمدة**:

| العمود | النوع | القيود | الوصف |
|--------|-------|--------|-------|
| id | INT | PK, AUTO_INCREMENT | المعرف الفريد |
| userId | INT | FK, NOT NULL | المستخدم |
| action | VARCHAR(100) | NOT NULL | الإجراء |
| resourceType | VARCHAR(50) | NOT NULL | نوع المورد |
| resourceId | INT | NULL | معرف المورد |
| details | TEXT | NULL | التفاصيل (JSON) |
| ipAddress | VARCHAR(45) | NULL | عنوان IP |
| userAgent | TEXT | NULL | User Agent |
| createdAt | TIMESTAMP | NOT NULL | تاريخ الإجراء |

**الإجراءات المسجلة**:
- CREATE_EMPLOYEE
- UPDATE_EMPLOYEE
- DELETE_EMPLOYEE
- APPROVE_LEAVE
- ISSUE_CERTIFICATE
- GENERATE_PAYROLL
- LOGIN
- LOGOUT

---

## 15. استعلامات شائعة

### 15.1 الحصول على موظفي قسم معين

```sql
SELECT 
  e.id,
  e.name,
  e.email,
  e.position,
  e.salary,
  e.hireDate,
  c.name AS companyName
FROM employees e
JOIN companies c ON e.companyId = c.id
WHERE e.department = 'IT'
  AND e.status = 'active'
ORDER BY e.hireDate DESC;
```

### 15.2 حساب رصيد الإجازات

```sql
SELECT 
  e.name,
  lb.annualTotal - lb.annualUsed AS annualRemaining,
  lb.sickTotal - lb.sickUsed AS sickRemaining
FROM employees e
JOIN leaveBalances lb ON e.id = lb.employeeId
WHERE lb.year = YEAR(CURDATE())
  AND e.id = 1;
```

### 15.3 تقرير الحضور الشهري

```sql
SELECT 
  e.name,
  COUNT(CASE WHEN a.status = 'present' THEN 1 END) AS presentDays,
  COUNT(CASE WHEN a.status = 'absent' THEN 1 END) AS absentDays,
  COUNT(CASE WHEN a.status = 'late' THEN 1 END) AS lateDays,
  SUM(a.overtimeMinutes) / 60 AS overtimeHours
FROM employees e
LEFT JOIN attendance a ON e.id = a.employeeId
WHERE DATE_FORMAT(a.date, '%Y-%m') = '2025-11'
GROUP BY e.id, e.name;
```

### 15.4 المتقدمين حسب المرحلة

```sql
SELECT 
  j.title AS jobTitle,
  a.stage,
  COUNT(*) AS applicantsCount
FROM applicants a
JOIN jobs j ON a.jobId = j.id
WHERE j.status = 'open'
GROUP BY j.id, j.title, a.stage
ORDER BY j.title, a.stage;
```

### 15.5 التذاكر المفتوحة حسب الأولوية

```sql
SELECT 
  priority,
  COUNT(*) AS ticketsCount,
  AVG(TIMESTAMPDIFF(HOUR, createdAt, COALESCE(closedAt, NOW()))) AS avgResolutionHours
FROM tickets
WHERE status IN ('open', 'in_progress')
GROUP BY priority
ORDER BY FIELD(priority, 'urgent', 'high', 'medium', 'low');
```

---

## 16. الأداء والتحسين

### 16.1 الفهارس الموصى بها

```sql
-- فهارس البحث
CREATE INDEX idx_employees_department ON employees(department);
CREATE INDEX idx_employees_status ON employees(status);
CREATE INDEX idx_leaves_status ON leaves(status);
CREATE INDEX idx_tickets_status ON tickets(status);

-- فهارس التواريخ
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_payroll_month ON payroll(month);

-- فهارس البحث النصي
CREATE FULLTEXT INDEX idx_jobs_title_desc ON jobs(title, description);
CREATE FULLTEXT INDEX idx_tickets_title_desc ON tickets(title, description);
```

### 16.2 تقسيم الجداول (Partitioning)

للجداول الكبيرة مثل `attendance` و `auditLogs`:

```sql
-- تقسيم جدول الحضور حسب السنة
ALTER TABLE attendance
PARTITION BY RANGE (YEAR(date)) (
  PARTITION p2023 VALUES LESS THAN (2024),
  PARTITION p2024 VALUES LESS THAN (2025),
  PARTITION p2025 VALUES LESS THAN (2026),
  PARTITION pFuture VALUES LESS THAN MAXVALUE
);
```

### 16.3 الأرشفة

نقل البيانات القديمة إلى جداول أرشيف:

```sql
-- أرشفة سجلات التدقيق الأقدم من سنة
INSERT INTO auditLogs_archive
SELECT * FROM auditLogs
WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 YEAR);

DELETE FROM auditLogs
WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 YEAR);
```

---

## 17. النسخ الاحتياطي والاستعادة

### 17.1 النسخ الاحتياطي الكامل

```bash
# نسخ احتياطي كامل
mysqldump -u root -p rabit_db > rabit_backup_$(date +%Y%m%d).sql

# نسخ احتياطي مضغوط
mysqldump -u root -p rabit_db | gzip > rabit_backup_$(date +%Y%m%d).sql.gz
```

### 17.2 النسخ الاحتياطي الجزئي

```bash
# نسخ جداول معينة فقط
mysqldump -u root -p rabit_db employees companies > critical_data.sql
```

### 17.3 الاستعادة

```bash
# استعادة من نسخة احتياطية
mysql -u root -p rabit_db < rabit_backup_20251102.sql

# استعادة من ملف مضغوط
gunzip < rabit_backup_20251102.sql.gz | mysql -u root -p rabit_db
```

---

## 18. الأمان

### 18.1 تشفير البيانات الحساسة

الحقول التالية يجب تشفيرها:
- `employees.nationalId`
- `employees.salary`
- `payroll.*` (جميع حقول الرواتب)

### 18.2 صلاحيات قاعدة البيانات

```sql
-- مستخدم القراءة فقط
CREATE USER 'rabit_readonly'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT ON rabit_db.* TO 'rabit_readonly'@'localhost';

-- مستخدم التطبيق
CREATE USER 'rabit_app'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE ON rabit_db.* TO 'rabit_app'@'localhost';

-- منع الحذف من الجداول الحساسة
REVOKE DELETE ON rabit_db.employees FROM 'rabit_app'@'localhost';
REVOKE DELETE ON rabit_db.payroll FROM 'rabit_app'@'localhost';
```

---

## الخلاصة

قاعدة بيانات منصة رابِط مصممة بعناية لتغطية جميع جوانب إدارة الموارد البشرية مع الحفاظ على الأداء العالي وسلامة البيانات. الهيكل قابل للتوسع ويدعم إضافة ميزات جديدة بسهولة.

---

## المراجع

1. [MySQL Documentation](https://dev.mysql.com/doc/)
2. [Drizzle ORM Documentation](https://orm.drizzle.team)
3. [Database Design Best Practices](https://www.sqlshack.com/database-design-best-practices/)
4. [نظام العمل السعودي](https://hrsd.gov.sa)

---

**الإصدار:** 1.0.0  
**آخر تحديث:** نوفمبر 2025  
**الفريق التقني:** منصة رابِط
