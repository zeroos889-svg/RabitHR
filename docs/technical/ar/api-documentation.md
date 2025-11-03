# توثيق واجهات برمجة التطبيقات (API Documentation)

**منصة رابِط لإدارة الموارد البشرية**  
**الإصدار:** 1.0.0  
**التاريخ:** نوفمبر 2025  
**المؤلف:** فريق رابِط التقني

---

## نظرة عامة

توفر منصة رابِط مجموعة شاملة من واجهات برمجة التطبيقات (APIs) المبنية على بروتوكول **tRPC** الذي يوفر Type-Safety كاملة من الخادم إلى العميل. تستخدم المنصة **Superjson** لضمان نقل البيانات المعقدة (مثل التواريخ والأرقام الكبيرة) بدون فقدان للنوع.

جميع الطلبات تمر عبر نقطة النهاية الموحدة `/api/trpc` مع دعم كامل للمصادقة والتفويض المبني على الأدوار.

## البنية المعمارية

### نقطة النهاية الرئيسية

```
https://api.rabit.sa/api/trpc
```

### آلية المصادقة

تستخدم المنصة نظام مصادقة مزدوج:

1. **Manus OAuth**: للمصادقة عبر حسابات Manus
2. **Email/Password**: للمصادقة التقليدية مع تشفير bcrypt

يتم تخزين الجلسة في ملف تعريف ارتباط (Cookie) موقّع باستخدام JWT، ويتم التحقق من الجلسة تلقائياً في كل طلب.

### أنواع الإجراءات (Procedures)

#### Public Procedure
إجراءات متاحة للجميع بدون مصادقة:

```typescript
publicProcedure.query(async ({ ctx }) => {
  // لا يتطلب مصادقة
  return data;
});
```

#### Protected Procedure
إجراءات تتطلب مصادقة المستخدم:

```typescript
protectedProcedure.query(async ({ ctx }) => {
  // ctx.user متاح ومضمون
  const userId = ctx.user.id;
  return userData;
});
```

#### Admin Procedure
إجراءات محصورة على المدراء:

```typescript
adminProcedure.query(async ({ ctx }) => {
  // ctx.user.role === 'admin'
  return adminData;
});
```

---

## 1. نظام المصادقة (Authentication)

### 1.1 الحصول على بيانات المستخدم الحالي

**النوع:** Query  
**الحماية:** Public (يعيد null إذا لم يكن مسجلاً)

```typescript
const { data: user } = trpc.auth.me.useQuery();
```

**الاستجابة:**

```json
{
  "id": 1,
  "openId": "user_abc123",
  "name": "أحمد محمد",
  "email": "ahmed@company.sa",
  "role": "user",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "lastSignedIn": "2025-11-02T00:00:00.000Z"
}
```

### 1.2 تسجيل الخروج

**النوع:** Mutation  
**الحماية:** Public

```typescript
const logout = trpc.auth.logout.useMutation();
await logout.mutateAsync();
```

**الاستجابة:**

```json
{
  "success": true
}
```

---

## 2. إدارة الموظفين (Employees)

### 2.1 الحصول على قائمة الموظفين

**النوع:** Query  
**الحماية:** Protected

```typescript
const { data: employees } = trpc.employees.list.useQuery({
  department: "IT", // اختياري
  status: "active", // اختياري
  page: 1,
  limit: 20
});
```

**المعاملات:**

| المعامل | النوع | مطلوب | الوصف |
|---------|-------|-------|-------|
| department | string | لا | تصفية حسب القسم |
| status | enum | لا | active, inactive, suspended |
| page | number | نعم | رقم الصفحة (يبدأ من 1) |
| limit | number | نعم | عدد النتائج في الصفحة |

**الاستجابة:**

```json
{
  "employees": [
    {
      "id": 1,
      "name": "أحمد محمد",
      "email": "ahmed@company.sa",
      "department": "IT",
      "position": "مطور برمجيات",
      "salary": 15000,
      "hireDate": "2024-01-01",
      "status": "active"
    }
  ],
  "total": 150,
  "page": 1,
  "totalPages": 8
}
```

### 2.2 إضافة موظف جديد

**النوع:** Mutation  
**الحماية:** Protected (HR أو Admin)

```typescript
const addEmployee = trpc.employees.create.useMutation();

await addEmployee.mutateAsync({
  name: "سارة أحمد",
  email: "sara@company.sa",
  department: "HR",
  position: "أخصائي موارد بشرية",
  salary: 12000,
  hireDate: "2025-01-01",
  contractType: "permanent"
});
```

**المعاملات:**

```typescript
{
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string; // YYYY-MM-DD
  contractType: "permanent" | "temporary" | "contract";
  nationalId?: string;
  phone?: string;
}
```

### 2.3 تحديث بيانات موظف

**النوع:** Mutation  
**الحماية:** Protected

```typescript
const updateEmployee = trpc.employees.update.useMutation();

await updateEmployee.mutateAsync({
  id: 1,
  salary: 16000,
  position: "مطور أول"
});
```

### 2.4 حذف موظف

**النوع:** Mutation  
**الحماية:** Protected (Admin فقط)

```typescript
const deleteEmployee = trpc.employees.delete.useMutation();

await deleteEmployee.mutateAsync({ id: 1 });
```

---

## 3. نظام تتبع المتقدمين (ATS)

### 3.1 الحصول على الوظائف المفتوحة

**النوع:** Query  
**الحماية:** Public

```typescript
const { data: jobs } = trpc.ats.jobs.list.useQuery({
  status: "open",
  department: "IT"
});
```

**الاستجابة:**

```json
{
  "jobs": [
    {
      "id": 1,
      "title": "مطور Full Stack",
      "department": "IT",
      "location": "الرياض",
      "type": "دوام كامل",
      "description": "نبحث عن مطور...",
      "requirements": ["خبرة 3 سنوات", "React", "Node.js"],
      "salary": "15,000 - 20,000 ريال",
      "status": "open",
      "applicantsCount": 45,
      "createdAt": "2025-10-01"
    }
  ]
}
```

### 3.2 إضافة وظيفة جديدة

**النوع:** Mutation  
**الحماية:** Protected (HR أو Admin)

```typescript
const createJob = trpc.ats.jobs.create.useMutation();

await createJob.mutateAsync({
  title: "مطور Frontend",
  department: "IT",
  location: "جدة",
  type: "دوام كامل",
  description: "وصف الوظيفة...",
  requirements: ["React", "TypeScript", "3+ سنوات خبرة"],
  salaryMin: 12000,
  salaryMax: 18000
});
```

### 3.3 الحصول على المتقدمين

**النوع:** Query  
**الحماية:** Protected

```typescript
const { data: applicants } = trpc.ats.applicants.list.useQuery({
  jobId: 1,
  stage: "interview"
});
```

**الاستجابة:**

```json
{
  "applicants": [
    {
      "id": 1,
      "name": "خالد عبدالله",
      "email": "khaled@email.com",
      "phone": "0501234567",
      "resumeUrl": "https://storage.rabit.sa/resumes/123.pdf",
      "stage": "interview",
      "rating": 4,
      "appliedAt": "2025-10-15",
      "notes": "مرشح قوي"
    }
  ]
}
```

### 3.4 تحديث مرحلة المتقدم

**النوع:** Mutation  
**الحماية:** Protected

```typescript
const updateStage = trpc.ats.applicants.updateStage.useMutation();

await updateStage.mutateAsync({
  applicantId: 1,
  stage: "offer",
  notes: "تم قبوله للوظيفة"
});
```

**المراحل المتاحة:**
- `applied`: تقدم للوظيفة
- `screening`: فحص أولي
- `interview`: مقابلة
- `assessment`: تقييم
- `offer`: عرض وظيفي
- `hired`: تم التوظيف
- `rejected`: مرفوض

---

## 4. نظام التذاكر (Tickets)

### 4.1 إنشاء تذكرة جديدة

**النوع:** Mutation  
**الحماية:** Protected

```typescript
const createTicket = trpc.tickets.create.useMutation();

await createTicket.mutateAsync({
  title: "مشكلة في الراتب",
  description: "لم أستلم راتب الشهر الحالي",
  category: "payroll",
  priority: "high"
});
```

**الفئات المتاحة:**
- `payroll`: الرواتب
- `leave`: الإجازات
- `benefits`: المزايا
- `technical`: تقني
- `other`: أخرى

**الأولويات:**
- `low`: منخفضة
- `medium`: متوسطة
- `high`: عالية
- `urgent`: عاجلة

### 4.2 الحصول على التذاكر

**النوع:** Query  
**الحماية:** Protected

```typescript
const { data: tickets } = trpc.tickets.list.useQuery({
  status: "open",
  category: "payroll"
});
```

**الاستجابة:**

```json
{
  "tickets": [
    {
      "id": 1,
      "title": "مشكلة في الراتب",
      "status": "open",
      "priority": "high",
      "category": "payroll",
      "createdAt": "2025-11-01",
      "assignedTo": "أحمد محمد",
      "responseTime": "2 ساعات"
    }
  ]
}
```

### 4.3 الرد على تذكرة

**النوع:** Mutation  
**الحماية:** Protected

```typescript
const replyTicket = trpc.tickets.reply.useMutation();

await replyTicket.mutateAsync({
  ticketId: 1,
  message: "تم حل المشكلة",
  attachments: ["https://storage.rabit.sa/files/proof.pdf"]
});
```

---

## 5. الإجازات (Leaves)

### 5.1 طلب إجازة

**النوع:** Mutation  
**الحماية:** Protected

```typescript
const requestLeave = trpc.leaves.request.useMutation();

await requestLeave.mutateAsync({
  type: "annual",
  startDate: "2025-12-01",
  endDate: "2025-12-05",
  reason: "سفر عائلي"
});
```

**أنواع الإجازات:**
- `annual`: سنوية (21 يوم)
- `sick`: مرضية (30 يوم بأجر كامل + 60 يوم بنصف أجر)
- `maternity`: أمومة (10 أسابيع)
- `hajj`: حج (10 أيام)
- `marriage`: زواج (5 أيام)
- `death`: وفاة (5 أيام)
- `exam`: امتحانات (حسب الحاجة)

### 5.2 الحصول على رصيد الإجازات

**النوع:** Query  
**الحماية:** Protected

```typescript
const { data: balance } = trpc.leaves.balance.useQuery();
```

**الاستجابة:**

```json
{
  "annual": {
    "total": 21,
    "used": 5,
    "remaining": 16
  },
  "sick": {
    "total": 30,
    "used": 2,
    "remaining": 28
  },
  "maternity": {
    "total": 70,
    "used": 0,
    "remaining": 70
  }
}
```

### 5.3 الموافقة/رفض إجازة

**النوع:** Mutation  
**الحماية:** Protected (Manager أو HR)

```typescript
const approveLeave = trpc.leaves.approve.useMutation();

await approveLeave.mutateAsync({
  leaveId: 1,
  status: "approved",
  notes: "موافق عليها"
});
```

---

## 6. الرواتب (Payroll)

### 6.1 حساب الراتب

**النوع:** Query  
**الحماية:** Protected

```typescript
const { data: salary } = trpc.payroll.calculate.useQuery({
  employeeId: 1,
  month: "2025-11"
});
```

**الاستجابة:**

```json
{
  "basicSalary": 15000,
  "allowances": {
    "housing": 3000,
    "transport": 1000,
    "food": 500
  },
  "deductions": {
    "gosi": 1500,
    "tax": 0,
    "loans": 500
  },
  "netSalary": 17500,
  "workingDays": 22,
  "absences": 0,
  "overtime": 2
}
```

### 6.2 إصدار كشف راتب

**النوع:** Mutation  
**الحماية:** Protected (HR أو Admin)

```typescript
const generatePayslip = trpc.payroll.generatePayslip.useMutation();

await generatePayslip.mutateAsync({
  employeeId: 1,
  month: "2025-11"
});
```

**الاستجابة:**

```json
{
  "payslipUrl": "https://storage.rabit.sa/payslips/emp1_2025-11.pdf",
  "generatedAt": "2025-11-02T10:00:00.000Z"
}
```

---

## 7. الشهادات (Certificates)

### 7.1 إصدار شهادة

**النوع:** Mutation  
**الحماية:** Protected

```typescript
const issueCertificate = trpc.certificates.issue.useMutation();

await issueCertificate.mutateAsync({
  employeeId: 1,
  type: "salary",
  purpose: "للبنك",
  language: "ar",
  copies: 1
});
```

**أنواع الشهادات:**
- `salary`: شهادة راتب
- `experience`: شهادة خبرة
- `employment`: شهادة تعريف بالراتب
- `embassy`: شهادة للسفارات

**الاستجابة:**

```json
{
  "certificateId": 123,
  "certificateUrl": "https://storage.rabit.sa/certificates/cert_123.pdf",
  "issuedAt": "2025-11-02T10:00:00.000Z",
  "validUntil": "2025-12-02T10:00:00.000Z"
}
```

### 7.2 الحصول على الشهادات المصدرة

**النوع:** Query  
**الحماية:** Protected

```typescript
const { data: certificates } = trpc.certificates.list.useQuery({
  employeeId: 1,
  type: "salary"
});
```

---

## 8. التقارير (Reports)

### 8.1 تقرير الموظفين

**النوع:** Query  
**الحماية:** Protected (HR أو Admin)

```typescript
const { data: report } = trpc.reports.employees.useQuery({
  startDate: "2025-01-01",
  endDate: "2025-11-02",
  department: "IT"
});
```

**الاستجابة:**

```json
{
  "totalEmployees": 150,
  "newHires": 12,
  "terminations": 3,
  "byDepartment": {
    "IT": 45,
    "HR": 10,
    "Finance": 15
  },
  "averageSalary": 14500,
  "turnoverRate": 2.5
}
```

### 8.2 تقرير الحضور

**النوع:** Query  
**الحماية:** Protected

```typescript
const { data: attendance } = trpc.reports.attendance.useQuery({
  employeeId: 1,
  month: "2025-11"
});
```

**الاستجابة:**

```json
{
  "workingDays": 22,
  "present": 20,
  "absent": 2,
  "late": 1,
  "overtime": 5,
  "attendanceRate": 90.9
}
```

### 8.3 تقرير الإجازات

**النوع:** Query  
**الحماية:** Protected

```typescript
const { data: leavesReport } = trpc.reports.leaves.useQuery({
  startDate: "2025-01-01",
  endDate: "2025-11-02"
});
```

---

## 9. الاستشارات (Consultations)

### 9.1 حجز استشارة

**النوع:** Mutation  
**الحماية:** Protected

```typescript
const bookConsultation = trpc.consultations.book.useMutation();

await bookConsultation.mutateAsync({
  consultantId: 1,
  packageId: 2,
  preferredDate: "2025-11-10",
  preferredTime: "10:00",
  topic: "تطوير سياسات الموارد البشرية"
});
```

### 9.2 إنشاء تذكرة استشارية

**النوع:** Mutation  
**الحماية:** Protected

```typescript
const createConsultingTicket = trpc.consultations.createTicket.useMutation();

await createConsultingTicket.mutateAsync({
  packageId: 1,
  title: "استفسار عن نظام العمل",
  description: "ما هي حقوق الموظف في حالة...",
  priority: "medium"
});
```

### 9.3 الحصول على الاستشارات

**النوع:** Query  
**الحماية:** Protected

```typescript
const { data: consultations } = trpc.consultations.list.useQuery({
  status: "active"
});
```

---

## 10. الدورات التدريبية (Courses)

### 10.1 التسجيل في دورة

**النوع:** Mutation  
**الحماية:** Protected

```typescript
const enrollCourse = trpc.courses.enroll.useMutation();

await enrollCourse.mutateAsync({
  courseId: 1,
  paymentMethod: "credit_card"
});
```

### 10.2 الحصول على الدورات المتاحة

**النوع:** Query  
**الحماية:** Public

```typescript
const { data: courses } = trpc.courses.list.useQuery({
  category: "hr-management",
  level: "intermediate"
});
```

**الاستجابة:**

```json
{
  "courses": [
    {
      "id": 1,
      "title": "إدارة الموارد البشرية الاستراتيجية",
      "instructor": "د. أحمد محمد",
      "duration": "8 ساعات",
      "price": 1200,
      "rating": 4.8,
      "studentsCount": 450,
      "level": "intermediate"
    }
  ]
}
```

---

## 11. مولّد النماذج الذكي (Document Generator)

### 11.1 الحصول على القوالب

**النوع:** Query  
**الحماية:** Public

```typescript
const { data: templates } = trpc.documents.templates.list.useQuery({
  category: "employment"
});
```

### 11.2 توليد مستند

**النوع:** Mutation  
**الحماية:** Protected

```typescript
const generateDoc = trpc.documents.generate.useMutation();

await generateDoc.mutateAsync({
  templateId: 1,
  data: {
    employeeName: "أحمد محمد",
    position: "مطور برمجيات",
    salary: 15000,
    startDate: "2025-01-01"
  },
  language: "ar",
  style: "formal"
});
```

**الاستجابة:**

```json
{
  "documentId": 456,
  "content": "نص المستند المولّد...",
  "generatedAt": "2025-11-02T10:00:00.000Z"
}
```

### 11.3 حفظ مستند في المكتبة

**النوع:** Mutation  
**الحماية:** Protected

```typescript
const saveDoc = trpc.documents.toggleSave.useMutation();

await saveDoc.mutateAsync({
  documentId: 456
});
```

### 11.4 الحصول على المستندات المحفوظة

**النوع:** Query  
**الحماية:** Protected

```typescript
const { data: myDocs } = trpc.documents.saved.list.useQuery({
  search: "شهادة"
});
```

---

## 12. الإشعارات (Notifications)

### 12.1 الحصول على الإشعارات

**النوع:** Query  
**الحماية:** Protected

```typescript
const { data: notifications } = trpc.notifications.list.useQuery({
  unreadOnly: true
});
```

**الاستجابة:**

```json
{
  "notifications": [
    {
      "id": 1,
      "title": "طلب إجازة جديد",
      "message": "أحمد محمد قدم طلب إجازة سنوية",
      "type": "leave_request",
      "read": false,
      "createdAt": "2025-11-02T09:00:00.000Z"
    }
  ],
  "unreadCount": 5
}
```

### 12.2 تعليم كمقروء

**النوع:** Mutation  
**الحماية:** Protected

```typescript
const markRead = trpc.notifications.markRead.useMutation();

await markRead.mutateAsync({
  notificationId: 1
});
```

---

## معالجة الأخطاء

تستخدم المنصة نظام أخطاء موحد مع رموز HTTP قياسية:

### رموز الأخطاء

| الرمز | الوصف | المعنى |
|-------|-------|--------|
| 400 | BAD_REQUEST | طلب غير صحيح |
| 401 | UNAUTHORIZED | غير مصادق |
| 403 | FORBIDDEN | غير مصرح |
| 404 | NOT_FOUND | غير موجود |
| 409 | CONFLICT | تعارض في البيانات |
| 429 | TOO_MANY_REQUESTS | طلبات كثيرة جداً |
| 500 | INTERNAL_SERVER_ERROR | خطأ في الخادم |

### مثال على الخطأ

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "يجب تسجيل الدخول للوصول إلى هذا المورد"
  }
}
```

### معالجة الأخطاء في الكود

```typescript
const createEmployee = trpc.employees.create.useMutation({
  onError: (error) => {
    if (error.data?.code === 'UNAUTHORIZED') {
      // إعادة توجيه لصفحة تسجيل الدخول
      router.push('/login');
    } else if (error.data?.code === 'CONFLICT') {
      // عرض رسالة خطأ للمستخدم
      toast.error('البريد الإلكتروني مستخدم بالفعل');
    }
  }
});
```

---

## الحدود والقيود (Rate Limiting)

لحماية المنصة من الاستخدام المفرط، يتم تطبيق حدود على الطلبات:

| النوع | الحد | الفترة |
|-------|------|--------|
| تسجيل الدخول | 5 محاولات | 15 دقيقة |
| APIs العامة | 100 طلب | دقيقة |
| APIs المحمية | 1000 طلب | ساعة |
| رفع الملفات | 10 ملفات | ساعة |

عند تجاوز الحد، سيتم إرجاع خطأ `429 TOO_MANY_REQUESTS` مع رأس `Retry-After` يحدد متى يمكن المحاولة مرة أخرى.

---

## أمثلة كاملة

### مثال 1: إضافة موظف وإصدار شهادة راتب

```typescript
import { trpc } from '@/lib/trpc';

async function addEmployeeAndIssueCertificate() {
  // 1. إضافة موظف جديد
  const newEmployee = await trpc.employees.create.mutateAsync({
    name: "سارة أحمد",
    email: "sara@company.sa",
    department: "HR",
    position: "أخصائي موارد بشرية",
    salary: 12000,
    hireDate: "2025-01-01",
    contractType: "permanent"
  });

  console.log('تم إضافة الموظف:', newEmployee.id);

  // 2. إصدار شهادة راتب
  const certificate = await trpc.certificates.issue.mutateAsync({
    employeeId: newEmployee.id,
    type: "salary",
    purpose: "للبنك",
    language: "ar",
    copies: 1
  });

  console.log('تم إصدار الشهادة:', certificate.certificateUrl);
  
  return { employee: newEmployee, certificate };
}
```

### مثال 2: نظام طلب إجازة كامل

```typescript
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

function LeaveRequestForm() {
  const requestLeave = trpc.leaves.request.useMutation({
    onSuccess: () => {
      toast.success('تم تقديم طلب الإجازة بنجاح');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const { data: balance } = trpc.leaves.balance.useQuery();

  const handleSubmit = async (data: LeaveFormData) => {
    await requestLeave.mutateAsync({
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
      reason: data.reason
    });
  };

  return (
    <div>
      <h2>رصيد الإجازات</h2>
      <p>السنوية: {balance?.annual.remaining} يوم</p>
      <p>المرضية: {balance?.sick.remaining} يوم</p>
      
      {/* نموذج طلب الإجازة */}
    </div>
  );
}
```

### مثال 3: لوحة تحكم ATS

```typescript
import { trpc } from '@/lib/trpc';

function ATSDashboard() {
  const { data: jobs } = trpc.ats.jobs.list.useQuery({ status: 'open' });
  const { data: applicants } = trpc.ats.applicants.list.useQuery({});
  
  const updateStage = trpc.ats.applicants.updateStage.useMutation({
    onSuccess: () => {
      // تحديث القائمة
      trpc.useUtils().ats.applicants.list.invalidate();
    }
  });

  const handleMoveToInterview = async (applicantId: number) => {
    await updateStage.mutateAsync({
      applicantId,
      stage: 'interview',
      notes: 'انتقل للمقابلة'
    });
  };

  return (
    <div>
      <h2>الوظائف المفتوحة: {jobs?.length}</h2>
      <h2>المتقدمين: {applicants?.length}</h2>
      
      {/* عرض البيانات */}
    </div>
  );
}
```

---

## الأمان وأفضل الممارسات

### 1. التحقق من الصلاحيات

دائماً تحقق من صلاحيات المستخدم قبل تنفيذ العمليات الحساسة:

```typescript
// في الخادم (server/routers.ts)
deleteEmployee: protectedProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ ctx, input }) => {
    // التحقق من الصلاحية
    if (ctx.user.role !== 'admin') {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'غير مصرح لك بحذف الموظفين'
      });
    }
    
    return await deleteEmployeeById(input.id);
  })
```

### 2. التحقق من صحة البيانات

استخدم Zod للتحقق من صحة البيانات المدخلة:

```typescript
import { z } from 'zod';

const createEmployeeSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  salary: z.number().positive().max(1000000),
  hireDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
});
```

### 3. تشفير البيانات الحساسة

الرواتب والبيانات الشخصية يجب تشفيرها في قاعدة البيانات.

### 4. سجلات التدقيق

جميع العمليات الحساسة يتم تسجيلها في جدول `auditLogs`:

```typescript
await logAuditEvent({
  userId: ctx.user.id,
  action: 'DELETE_EMPLOYEE',
  resourceId: employeeId,
  details: { reason: 'تم الفصل' }
});
```

---

## الخلاصة

توفر منصة رابِط مجموعة شاملة من APIs المبنية على tRPC مع Type-Safety كاملة. جميع APIs موثقة بالكامل ومحمية بنظام مصادقة وتفويض قوي. للحصول على دعم إضافي أو الإبلاغ عن مشاكل، يرجى التواصل مع الفريق التقني.

---

## المراجع

1. [tRPC Documentation](https://trpc.io/docs)
2. [نظام العمل السعودي](https://hrsd.gov.sa)
3. [Drizzle ORM Documentation](https://orm.drizzle.team)
4. [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

**الإصدار:** 1.0.0  
**آخر تحديث:** نوفمبر 2025  
**الفريق التقني:** منصة رابِط
