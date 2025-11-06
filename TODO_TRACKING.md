# TODO Tracking - RabitHR Platform

## تتبع المهام المؤجلة والتحسينات المستقبلية

**تاريخ التحديث:** 2025-11-06  
**إجمالي المهام:** 37

---

## 🔴 High Priority (5 مهام)

### Backend - Authentication & Authorization

#### 1. Admin Role Checks (3 locations)

**الملف:** `server/routers.ts`  
**السطور:** 648, 679, 1495

```typescript
// TODO: Add admin check
// TODO: Add admin check
// TODO: Add admin role check
```

**الوصف:** إضافة فحص صلاحيات الأدمن في endpoints حساسة  
**الأولوية:** عالية جداً  
**التأثير:** أمان  
**الإجراء المقترح:**

```typescript
if (!req.user || req.user.role !== "admin") {
  throw new TRPCError({
    code: "UNAUTHORIZED",
    message: "Admin access required",
  });
}
```

---

#### 2. Payment Ownership Check

**الملف:** `server/paymentRouter.ts:228`  
**الوصف:** التحقق من ملكية الدفع قبل السماح بالوصول  
**الأولوية:** عالية  
**التأثير:** أمان

---

### Frontend - Authentication

#### 3. Password Reset Implementation

**الملفات:**

- `client/src/pages/ResetPassword.tsx:84`
- `client/src/pages/ForgotPassword.tsx:32`

**الوصف:** تطبيق API calls فعلية لإعادة تعيين كلمة المرور  
**الأولوية:** عالية  
**التأثير:** وظيفة أساسية

---

## 🟡 Medium Priority (15 مهمة)

### Payment Integration

#### 4-12. Payment Webhook Handling (9 locations)

**الملف:** `server/paymentRouter.ts`  
**السطور:** 282-297, 307, 334

```typescript
// TODO: Update payment status in database
// TODO: Activate subscription
// TODO: Send confirmation email
// TODO: Send failure notification
// TODO: Deactivate subscription
// TODO: Send refund confirmation
// TODO: Implement Tap webhook verification
// TODO: Implement db.getUserPayments()
```

**الوصف:** تطبيق معالجة كاملة لـ webhooks من Moyasar/Tap  
**الأولوية:** متوسطة  
**التأثير:** نظام الدفع

**خطة التطبيق:**

1. إنشاء دوال DB للـ payment status updates
2. تطبيق تفعيل/إلغاء Subscriptions
3. إضافة إرسال emails تلقائي
4. تطبيق Tap webhook signature verification

---

#### 13. Discount Code Validation

**الملفات:**

- `client/src/pages/Checkout.tsx:78, 114`

**الوصف:** تطبيق التحقق من كود الخصم  
**الأولوية:** متوسطة

---

### Email & SMS Integration

#### 14. Email Service Integration

**الملف:** `server/_core/email.ts:32`

```typescript
// TODO: Integrate with actual email service (Resend, SendGrid, etc.)
```

**الوصف:** التكامل مع خدمة email حقيقية  
**الأولوية:** متوسطة  
**الخيارات:** Resend, SendGrid, AWS SES

---

#### 15. SMS Service Integration

**الملف:** `server/_core/sms.ts:29`

```typescript
// TODO: Integrate with actual SMS service (Twilio, Unifonic, etc.)
```

**الوصف:** التكامل مع خدمة SMS حقيقية  
**الأولوية:** متوسطة  
**الخيارات:** Twilio, Unifonic, AWS SNS

---

### Consultant System

#### 16-17. Consultant Registration & Redirect

**الملفات:**

- `client/src/pages/ConsultantRegister.tsx:61`
- `client/src/pages/SignupConsultant.tsx:69, 144`

**الوصف:**

- تطبيق API call لتسجيل الاستشاريين
- رفع الملفات إلى S3
- التوجيه لصفحة الدفع

**الأولوية:** متوسطة

---

#### 18. Feature Module Expansion

**الملف:** `server/db/index.ts:86`

```typescript
// TODO: Add more modules as they are created
```

**الوصف:** إضافة modules جديدة مع نمو النظام  
**الأولوية:** متوسطة (مستمر)

---

## 🟢 Low Priority (17 مهمة)

### UI Improvements

#### 19. PDF Receipt Generation

**الملف:** `client/src/pages/PaymentSuccess.tsx:72`

```typescript
// TODO: Generate and download PDF receipt
```

**الوصف:** إنشاء وتحميل إيصالات PDF  
**الأولوية:** منخفضة  
**المكتبات المقترحة:** jsPDF, react-pdf

---

#### 20. Payment Processing Integration

**الملف:** `client/src/pages/Checkout.tsx:146`

```typescript
// Simulate payment processing - TODO: Integrate with Moyasar/Tap Payment
```

**الوصف:** التكامل الكامل مع بوابات الدفع  
**الأولوية:** منخفضة (جزئياً مُنفذ)

---

### Google Maps Integration

#### 21-22. Map Services Implementation

**الملف:** `client/src/components/Map.tsx:132-142`

```typescript
// TODO: Initialize services here if needed
// TODO: Add event listeners
// TODO: Update map properties when props change
```

**الوصف:** تحسين تكامل Google Maps  
**الأولوية:** منخفضة

---

### Backend Enhancements

#### 23-24. Feature Queries Expansion

**الملف:** `server/db.ts:422, 1742`

```typescript
// TODO: add feature queries here as your schema grows.
// TODO: إضافة بيانات إضافية حسب الحاجة
```

**الوصف:** إضافة queries جديدة مع نمو التطبيق  
**الأولوية:** منخفضة (مستمر)

---

#### 25-26. Unimplemented Routes

**الملف:** `server/routers.ts:1592, 1601`

```typescript
// TODO: Implement
// TODO: Implement
```

**الوصف:** تطبيق routes غير مكتملة  
**الأولوية:** منخفضة (يعتمد على الميزة)

---

### Contact & Support

#### 27. Contact Form Backend

**الملف:** `client/src/pages/Contact.tsx:23`

```typescript
// TODO: Backend integration
```

**الوصف:** ربط نموذج الاتصال بالـ backend  
**الأولوية:** منخفضة

---

### Display Issues (Non-functional)

#### 28-37. Phone Number & ID Placeholders (10 locations)

**الملفات:**

- `client/src/pages/dashboard/Tools.tsx:502` (-XXXXX)
- `client/src/pages/RefundPolicy.tsx:253` (+966 XX XXX XXXX)
- `client/src/pages/LetterGenerator.tsx:383` (XXX/2025)

**الوصف:** استبدال placeholders بقيم حقيقية من البيانات  
**الأولوية:** منخفضة جداً  
**التأثير:** عرض فقط

---

## 📊 إحصائيات

| الفئة              | العدد  |
| ------------------ | ------ |
| 🔴 High Priority   | 5      |
| 🟡 Medium Priority | 15     |
| 🟢 Low Priority    | 17     |
| **الإجمالي**       | **37** |

### حسب الموضوع:

- **Authentication & Authorization:** 5 مهام
- **Payment System:** 10 مهام
- **Integration (Email/SMS):** 2 مهام
- **Consultant System:** 3 مهام
- **UI/UX:** 7 مهام
- **Backend Expansion:** 5 مهام
- **Display Placeholders:** 5 مهام

---

## 🎯 خطة التنفيذ المقترحة

### Sprint 1 (أسبوع)

- [ ] تطبيق Admin Role Checks (3 مواقع)
- [ ] تطبيق Payment Ownership Check
- [ ] تطبيق Password Reset APIs

### Sprint 2 (أسبوعين)

- [ ] معالجة Payment Webhooks كاملة
- [ ] تكامل Email Service (Resend)
- [ ] تكامل SMS Service (Unifonic)

### Sprint 3 (أسبوعين)

- [ ] Consultant Registration System
- [ ] Discount Code System
- [ ] PDF Receipt Generation

### Backlog (حسب الحاجة)

- [ ] Google Maps Enhancements
- [ ] Backend Query Expansion
- [ ] استبدال Display Placeholders

---

## 📝 ملاحظات للمطورين

### أفضل الممارسات:

1. ✅ **لا تترك TODO بدون Issue** - أنشئ GitHub Issue لكل TODO
2. ✅ **حدد الأولوية والتأثير** - وضح مدى أهمية المهمة
3. ✅ **أضف تاريخ** - متى تم إضافة TODO
4. ✅ **ربط بـ Documentation** - إذا كان هناك تصميم أو خطة

### Template لـ TODO جديد:

```typescript
// TODO: [وصف المهمة]
// Priority: High/Medium/Low
// Impact: Security/Feature/UX
// Created: YYYY-MM-DD
// Issue: #123 (if exists)
```

---

## 🔄 التحديثات

### 2025-11-06

- ✅ تم توثيق جميع الـ 37 TODO
- ✅ تم تصنيفها حسب الأولوية
- ✅ تم إنشاء خطة تنفيذ

---

_آخر تحديث: 2025-11-06 بواسطة GitHub Copilot_
