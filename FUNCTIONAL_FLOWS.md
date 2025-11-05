# توثيق التدفقات الوظيفية - Functional Flows Documentation

## نظرة عامة

هذا المستند يوثق جميع التدفقات الوظيفية الرئيسية في منصة رابِط لإدارة الموارد البشرية.

---

## 1. تدفق التسجيل (Sign Up Flow)

### 1.1 اختيار نوع الحساب

**المسار:** `/signup` → `AccountType.tsx`

**الخطوات:**

1. المستخدم يزور `/signup`
2. يظهر له خيارات نوع الحساب:
   - موظف (Employee)
   - مستشار (Consultant)
   - شركة (Company)

**الروابط:**

- `/signup/employee` - تسجيل موظف
- `/signup/consultant` - تسجيل مستشار
- `/signup` (نموذج الشركة في نفس الصفحة)

---

### 1.2 تسجيل موظف

**المسار:** `/signup/employee` → `SignupEmployee.tsx`

**الحقول المطلوبة:**

- الاسم الكامل
- البريد الإلكتروني
- رقم الجوال
- كلمة المرور
- تأكيد كلمة المرور
- اسم الشركة
- رقم الهوية الوطنية

**التحقق:**

- تحقق من صحة البريد الإلكتروني
- تحقق من تطابق كلمات المرور
- تحقق من طول كلمة المرور (8 أحرف على الأقل)

**عند النجاح:**

```typescript
// API: trpc.auth.signupEmployee.useMutation()
// Response: { success: true, message, user }
// Redirect: /employee/dashboard
```

---

### 1.3 تسجيل مستشار

**المسار:** `/signup/consultant` → `SignupConsultant.tsx`

**المراحل:**

#### المرحلة 1: المعلومات الأساسية

- الاسم الكامل (عربي + إنجليزي)
- البريد الإلكتروني
- رقم الجوال
- كلمة المرور
- المدينة

#### المرحلة 2: المعلومات المهنية

- التخصص الرئيسي
- التخصصات الفرعية
- سنوات الخبرة
- المؤهلات العلمية
- الشهادات المهنية
- السيرة الذاتية (عربي + إنجليزي)

#### المرحلة 3: المعلومات البنكية (اختياري)

- رقم IBAN
- اسم البنك
- اسم صاحب الحساب

#### المرحلة 4: المستندات

- صورة الهوية الوطنية
- الشهادات
- السيرة الذاتية PDF

**عند النجاح:**

```typescript
// API: trpc.consultant.register.useMutation()
// Status: "pending" - في انتظار موافقة الإدارة
// Redirect: /consultant/dashboard
// Message: "تم تسجيلك بنجاح. سيتم مراجعة حسابك من قبل الإدارة"
```

---

### 1.4 تسجيل شركة

**المسار:** `/signup` → `Signup.tsx`

**الحقول المطلوبة:**

- اسم الشركة
- البريد الإلكتروني
- رقم الجوال
- كلمة المرور
- السجل التجاري (اختياري)
- المدينة

**عند النجاح:**

```typescript
// API: trpc.auth.signupCompany.useMutation()
// Response: { success: true, message, user }
// Redirect: /dashboard
```

---

## 2. تدفق تسجيل الدخول (Login Flow)

### 2.1 تسجيل دخول عام

**المسار:** `/login` → `Login.tsx`

**الحقول:**

- البريد الإلكتروني
- كلمة المرور
- تذكرني (Remember Me)

**أنواع المستخدمين المدعومة:**

- شركة → `/dashboard`
- موظف → `/employee/dashboard`
- مدير النظام → `/admin`
- مستخدم عادي → `/profile`

**API:**

```typescript
trpc.auth.login.useMutation({
  onSuccess: data => {
    // حفظ بيانات المستخدم
    localStorage.setItem("currentUser", JSON.stringify(data.user));

    // إعادة التوجيه حسب النوع
    if (data.user.role === "admin") {
      setLocation("/admin");
    } else if (data.user.userType === "company") {
      setLocation("/dashboard");
    } else if (data.user.userType === "employee") {
      setLocation("/employee/dashboard");
    }
  },
});
```

---

### 2.2 تسجيل دخول المستشار

**المسار:** `/consultant/login` → `ConsultantLogin.tsx`

**الحقول:**

- البريد الإلكتروني
- كلمة المرور

**التحقق الخاص:**

```typescript
// يجب أن يكون userType === 'consultant'
if (data.user.userType === "consultant") {
  setLocation("/consultant/dashboard");
} else {
  toast.error("هذا الحساب ليس حساب مستشار");
}
```

---

## 3. تدفق الحجوزات الاستشارية

### 3.1 استعراض الخدمات

**المسار:** `/consulting` → `Consulting.tsx`

**المحتوى:**

- قائمة أنواع الاستشارات
- المستشارين المتاحين
- الأسعار والباقات

**API:**

```typescript
// جلب أنواع الاستشارات
trpc.consultant.getConsultationTypes.useQuery();
// Response: { types: ConsultationType[] }

// جلب المستشارين
trpc.consultant.getApprovedConsultants.useQuery();
// Response: { consultants: Consultant[] }
```

---

### 3.2 حجز استشارة جديدة

**المسار:** `/consulting/booking` → `ConsultingBookingNew.tsx`

**المراحل:**

#### الخطوة 1: اختيار نوع الاستشارة

```typescript
const typesData = trpc.consultant.getConsultationTypes.useQuery();
// عرض البطاقات مع الأسعار والتفاصيل
```

#### الخطوة 2: اختيار المستشار

```typescript
const consultantsData = trpc.consultant.getConsultantsBySpecialization.useQuery(
  { specializationId },
  { enabled: step >= 2 }
);
// عرض المستشارين المتاحين للتخصص المختار
```

#### الخطوة 3: اختيار التاريخ والوقت

- تقويم لاختيار التاريخ
- أوقات متاحة حسب جدول المستشار

#### الخطوة 4: تفاصيل الحجز

- وصف المشكلة/الاستشارة
- المستندات المطلوبة
- معلومات إضافية

#### الخطوة 5: الدفع

- ملخص الحجز
- طريقة الدفع
- تطبيق كود الخصم (إن وجد)

**API للحجز:**

```typescript
trpc.consultant.createBooking.useMutation({
  onSuccess: data => {
    toast.success("تم إنشاء الحجز بنجاح!");
    setLocation(`/consultations/${data.bookingId}`);
  },
});
```

---

### 3.3 عرض تفاصيل الحجز

**المسار:** `/consultations/:id` → `ConsultationDetail.tsx`

**المحتوى:**

- معلومات المستشار
- تاريخ ووقت الاستشارة
- الحالة (pending, confirmed, in-progress, completed, cancelled)
- تفاصيل الحجز
- المستندات المرفقة
- التقييم (بعد الانتهاء)

**الإجراءات المتاحة:**

- بدء الدردشة (إذا كانت confirmed)
- إلغاء الحجز (قبل بدء الاستشارة)
- تقييم الاستشارة (بعد الانتهاء)

---

### 3.4 التقييم

**المسار:** ضمن `ConsultationDetail.tsx`

**الحقول:**

- التقييم (1-5 نجوم) ⭐
- التعليق/المراجعة (اختياري)

**API:**

```typescript
trpc.consultant.rateConsultation.useMutation({
  onSuccess: () => {
    toast.success("تم إرسال التقييم بنجاح!");
    // يتم تحديث متوسط تقييم المستشار تلقائياً
  },
});
```

**معالجة في الخادم:**

```typescript
// في server/db.ts
await rateConsultation({
  bookingId: input.bookingId,
  consultantId: booking.consultantId,
  clientId: ctx.user.id,
  rating: input.rating, // 1-5
  review: input.comment,
});

// يتم تلقائياً:
// 1. حفظ التقييم في consultantReviews
// 2. حساب متوسط جديد لجميع تقييمات المستشار
// 3. تحديث averageRating في جدول consultants (scaled to 0-500)
```

---

## 4. لوحة تحكم المستشار

**المسار:** `/consultant/dashboard` → `ConsultantDashboard.tsx`

**المحتوى:**

- إحصائيات (الحجوزات، التقييم، الأرباح)
- الحجوزات القادمة
- الحجوزات السابقة
- التقييمات المستلمة
- الإعدادات الشخصية

**الحالات:**

- **pending**: في انتظار الموافقة من الإدارة
- **approved**: تم الموافقة ويمكن استقبال الحجوزات
- **rejected**: تم رفض التسجيل
- **suspended**: معلق مؤقتاً

---

## 5. الحماية والأمان

### 5.1 المسارات المحمية

**Component:** `ProtectedRoute.tsx`

```typescript
<ProtectedRoute requiredRole="employee">
  <ComponentName />
</ProtectedRoute>
```

**التحقق:**

1. التحقق من وجود session
2. التحقق من نوع المستخدم (userType)
3. التحقق من الصلاحية (role) إن كانت مطلوبة

**إعادة التوجيه:**

- إذا لم يكن مسجل دخول → `/login`
- إذا لم يملك الصلاحية → رسالة خطأ

---

### 5.2 التحقق من الجلسة

**في كل طلب API:**

```typescript
// server/_core/context.ts
export async function createContext({ req, res }: CreateContextOptions) {
  const user = await getCurrentUser(req);
  return { req, res, user };
}
```

---

## 6. معالجة الأخطاء

### 6.1 رسائل Toast

```typescript
// نجاح
toast.success("تم بنجاح!");

// خطأ
toast.error("حدث خطأ ما");

// معلومات
toast.info("معلومة مهمة");

// تحذير
toast.warning("تحذير!");
```

### 6.2 صفحة الخطأ 404

**المسار:** `/404` → `NotFound.tsx`

---

## 7. التحسينات المطبقة في هذا الـ PR

### 7.1 تحسينات قاعدة البيانات

- ✅ إعادة محاولة الاتصال التلقائية (3 محاولات)
- ✅ معالجة شاملة للأخطاء
- ✅ تسجيل مفصل للأخطاء

### 7.2 تحسينات الأمان

- ✅ استخدام nanoid لتوليد أرقام الحجز (غير قابلة للتنبؤ)
- ✅ التحقق من صحة التقييمات (1-5)
- ✅ عدم كشف معلومات حساسة في رسائل الأخطاء

### 7.3 تحسينات الكود

- ✅ إضافة JSDoc شاملة
- ✅ ثوابت موثقة
- ✅ دوال مساعدة منفصلة
- ✅ تناسق في أسماء المتغيرات

---

## 8. نقاط الاختبار الموصى بها

### 8.1 تدفق التسجيل

- [ ] تسجيل موظف جديد
- [ ] تسجيل مستشار جديد (جميع المراحل)
- [ ] تسجيل شركة جديدة
- [ ] التحقق من البريد الإلكتروني المكرر
- [ ] التحقق من صحة كلمة المرور

### 8.2 تدفق الدخول

- [ ] تسجيل دخول موظف
- [ ] تسجيل دخول مستشار
- [ ] تسجيل دخول شركة
- [ ] تسجيل دخول مدير
- [ ] تسجيل دخول ببيانات خاطئة

### 8.3 تدفق الحجوزات

- [ ] عرض قائمة الخدمات
- [ ] اختيار نوع استشارة
- [ ] اختيار مستشار
- [ ] إكمال الحجز
- [ ] عرض تفاصيل الحجز
- [ ] تقييم الاستشارة

### 8.4 اختبارات الأمان

- [ ] الوصول للمسارات المحمية بدون تسجيل
- [ ] محاولة الوصول لمسار بصلاحية غير مناسبة
- [ ] SQL injection في نماذج الإدخال
- [ ] XSS في حقول النصوص

---

## 9. الخطوات التالية

### عالية الأولوية

1. إضافة اختبارات تكامل (Integration Tests)
2. إضافة Rate Limiting لـ APIs
3. تطبيق CSRF Protection
4. إضافة نظام إشعارات فورية

### متوسطة الأولوية

1. تحسين UX في عملية الحجز
2. إضافة فلترة وبحث متقدم
3. تطبيق نظام الخصومات
4. إضافة تقارير للمستشارين

### منخفضة الأولوية

1. تطبيق PWA
2. إضافة وضع داكن كامل
3. دعم اللغة الإنجليزية
4. إضافة مدونة

---

## ملاحظات إضافية

### التناسق في API Responses

```typescript
// نموذج موحد للاستجابة
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
```

### التناسق في تسمية المتغيرات

- `consultationTypes` → تغيير إلى `types` في API response
- `consultantId` → متسق في جميع الملفات
- `bookingId` → متسق في جميع الملفات

### قاعدة بيانات Railway

- الاتصال عبر `DATABASE_URL` من `.env`
- إعادة محاولة تلقائية عند الفشل
- logging مفصل للأخطاء

---

**آخر تحديث:** 2024-11-04
**الإصدار:** 1.0
**الحالة:** ✅ تم المراجعة والتحديث
