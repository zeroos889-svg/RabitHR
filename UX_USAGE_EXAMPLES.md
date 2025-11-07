# أمثلة استخدام تحسينات UX

## UX Components Usage Examples

**تاريخ الإنشاء:** 2025-11-06

---

## 📚 جدول المحتويات

1. [Loading States](#loading-states)
2. [Error Messages](#error-messages)
3. [Toast Notifications](#toast-notifications)
4. [Best Practices](#best-practices)

---

## Loading States

### LoadingSpinner

#### الاستخدام الأساسي

```tsx
import { LoadingSpinner } from "@/components/LoadingSpinner";

// Loading بسيط
<LoadingSpinner />

// مع رسالة
<LoadingSpinner text="جاري تحميل البيانات..." />

// بحجم محدد
<LoadingSpinner size="lg" text="جاري الحفظ..." />
```

#### Variants مختلفة

```tsx
// Default spinner
<LoadingSpinner variant="default" />

// مع Pulse effect
<LoadingSpinner variant="pulse" />

// Dots animation
<LoadingSpinner variant="dots" />
```

#### Full Screen Loading

```tsx
// ملء الشاشة
<LoadingSpinner
  fullScreen
  size="lg"
  text="جاري تحميل التطبيق..."
  variant="pulse"
/>
```

---

### LoadingState

#### الاستخدام في الصفحات

```tsx
import { LoadingState } from "@/components/LoadingState";

function MyPage() {
  if (isLoading) {
    return (
      <LoadingState
        title="جاري تحميل البيانات"
        message="الرجاء الانتظار..."
        size="lg"
      />
    );
  }

  return <PageContent />;
}
```

#### مع React Query

```tsx
import { useQuery } from "@tanstack/react-query";
import { LoadingState } from "@/components/LoadingState";

function DataPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <LoadingState message="جاري تحميل البيانات..." />;
  }

  if (error) {
    return <ErrorMessage message={getErrorMessage(error)} />;
  }

  return <DataDisplay data={data} />;
}
```

---

## Error Messages

### ErrorMessage Component

#### الاستخدام الأساسي

```tsx
import { ErrorMessage } from "@/components/ErrorMessage";

// رسالة خطأ بسيطة
<ErrorMessage message="حدث خطأ ما" />

// مع عنوان
<ErrorMessage
  title="فشل التحميل"
  message="لم نتمكن من تحميل البيانات"
/>
```

#### مع زر إعادة المحاولة

```tsx
<ErrorMessage
  title="فشل حفظ البيانات"
  message="حدث خطأ أثناء الحفظ"
  onRetry={() => saveData()}
  retryText="إعادة المحاولة"
/>
```

#### Variants مختلفة

```tsx
// Error (default)
<ErrorMessage
  variant="destructive"
  message="حدث خطأ حرج"
/>

// Warning
<ErrorMessage
  variant="warning"
  message="تحذير: البيانات غير محدثة"
/>
```

#### Full Screen Error

```tsx
<ErrorMessage
  fullScreen
  title="فشل تحميل التطبيق"
  message="لم نتمكن من الاتصال بالخادم"
  onRetry={() => window.location.reload()}
/>
```

---

### getErrorMessage() Utility

#### استخدام في Error Handling

```tsx
import { getErrorMessage } from "@/components/ErrorMessage";

try {
  await saveData();
} catch (error) {
  const message = getErrorMessage(error);
  toast.error(message);
}
```

#### مع React Query

```tsx
const { mutate } = useMutation({
  mutationFn: saveData,
  onError: error => {
    toast.error(getErrorMessage(error));
  },
});
```

---

## Toast Notifications

### Toast Utilities

#### Success Messages

```tsx
import { toast, successMessages } from "@/lib/toast";

// رسالة نجاح بسيطة
toast.success("تم الحفظ بنجاح");

// استخدام رسائل معرّفة مسبقاً
toast.success(successMessages.save);
toast.success(successMessages.update);
toast.success(successMessages.delete);
```

#### Error Messages

```tsx
import { toast, errorMessages } from "@/lib/toast";

// رسالة خطأ
toast.error("فشلت العملية");

// استخدام رسائل معرّفة مسبقاً
toast.error(errorMessages.network);
toast.error(errorMessages.unauthorized);
toast.error(errorMessages.server);
```

#### Info & Warning

```tsx
// معلومة
toast.info("تم تحديث البيانات");

// تحذير
toast.warning("البيانات قديمة، يرجى التحديث");
```

#### Loading State

```tsx
// عرض loading
const loadingToast = toast.loading("جاري الحفظ...");

// إخفاء بعد الانتهاء
await saveData();
toast.dismiss(loadingToast);
toast.success("تم الحفظ");
```

---

### Promise Toast

#### مع Async Operations

```tsx
import { toast } from "@/lib/toast";

// Toast تلقائي لـ promise
toast.promise(saveData(), {
  loading: "جاري الحفظ...",
  success: "تم الحفظ بنجاح ✓",
  error: "فشل الحفظ",
});
```

#### مع Dynamic Messages

```tsx
toast.promise(uploadFile(file), {
  loading: "جاري رفع الملف...",
  success: data => `تم رفع ${data.filename} بنجاح ✓`,
  error: error => getErrorMessage(error),
});
```

#### مع Action Button

```tsx
toast.success("تم حذف العنصر", {
  duration: 5000,
  action: {
    label: "تراجع",
    onClick: () => restoreItem(),
  },
});
```

---

## Best Practices

### 1. Consistent Loading States

```tsx
// ❌ سيئ: loading بدون رسالة
if (isLoading) return <LoadingSpinner />;

// ✅ جيد: loading مع رسالة واضحة
if (isLoading) {
  return <LoadingSpinner text="جاري تحميل البيانات..." />;
}
```

### 2. User-Friendly Errors

```tsx
// ❌ سيئ: عرض خطأ تقني
<ErrorMessage message={error.message} />

// ✅ جيد: ترجمة الخطأ
<ErrorMessage message={getErrorMessage(error)} />
```

### 3. Contextual Feedback

```tsx
// ❌ سيئ: toast عام
toast.success("تم");

// ✅ جيد: toast واضح
toast.success("تم حفظ البيانات بنجاح ✓");
```

### 4. Error Recovery

```tsx
// ❌ سيئ: خطأ بدون حل
<ErrorMessage message="فشل التحميل" />

// ✅ جيد: خطأ مع إعادة محاولة
<ErrorMessage
  message="فشل التحميل"
  onRetry={refetch}
/>
```

### 5. Accessibility

```tsx
// ✅ دائماً استخدم ARIA labels
<LoadingSpinner
  text="جاري التحميل..."
  // يضيف تلقائياً: role="status" aria-live="polite"
/>
```

---

## Complete Example

### صفحة كاملة مع Error Handling

```tsx
import { useQuery, useMutation } from "@tanstack/react-query";
import { LoadingState } from "@/components/LoadingState";
import { ErrorMessage, getErrorMessage } from "@/components/ErrorMessage";
import { toast, successMessages, errorMessages } from "@/lib/toast";

function UserProfile() {
  // Fetch data
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  // Save mutation
  const { mutate: saveUser, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success(successMessages.save);
    },
    onError: error => {
      toast.error(getErrorMessage(error));
    },
  });

  // Loading state
  if (isLoading) {
    return (
      <LoadingState
        title="جاري تحميل الملف الشخصي"
        message="الرجاء الانتظار..."
        variant="pulse"
      />
    );
  }

  // Error state
  if (error) {
    return (
      <ErrorMessage
        title="فشل تحميل الملف الشخصي"
        message={getErrorMessage(error)}
        onRetry={refetch}
      />
    );
  }

  // Success state
  return (
    <div>
      <h1>{data.name}</h1>
      <button onClick={() => saveUser(data)} disabled={isPending}>
        {isPending ? (
          <>
            <LoadingSpinner size="sm" />
            جاري الحفظ...
          </>
        ) : (
          "حفظ"
        )}
      </button>
    </div>
  );
}
```

---

## 📝 ملاحظات مهمة

### Performance

- استخدم `variant="pulse"` للعمليات السريعة
- استخدم `variant="dots"` للعمليات الطويلة
- تجنب `fullScreen` إلا عند الضرورة

### Accessibility

- جميع المكونات تدعم ARIA labels تلقائياً
- استخدم `text` prop دائماً للـ context
- تجنب الرسائل الفارغة

### RTL Support

- جميع المكونات تدعم RTL تلقائياً
- Toast messages تظهر من اليمين
- Text direction يتم ضبطه تلقائياً

---

_آخر تحديث: 2025-11-06_
