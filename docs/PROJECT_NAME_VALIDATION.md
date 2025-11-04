# التحقق من صحة أسماء المشاريع
# Project Name Validation

## نظرة عامة / Overview

تم إضافة دالة `validateProjectName` للتحقق من صحة أسماء المشاريع وفقاً لمتطلبات Vercel.

A `validateProjectName` function has been added to validate project names according to Vercel requirements.

## المتطلبات / Requirements

أسماء المشاريع يجب أن تتوافق مع القواعد التالية:

Project names must comply with the following rules:

- **الطول / Length**: حتى 100 حرف (up to 100 characters)
- **الأحرف / Case**: أحرف صغيرة فقط (lowercase only)
- **الأحرف المسموحة / Allowed characters**: 
  - أحرف إنجليزية صغيرة (lowercase letters): `a-z`
  - أرقام (digits): `0-9`
  - نقطة (period): `.`
  - شرطة سفلية (underscore): `_`
  - شرطة (hyphen): `-`
- **الأحرف الممنوعة / Forbidden sequences**: لا يمكن أن تحتوي على `---` (cannot contain `---`)

## الاستخدام / Usage

### من جانب العميل / Client-side

```typescript
import { validateProjectName } from '@/lib/validation';

const result = validateProjectName('my-project-123');

if (result.isValid) {
  console.log('اسم المشروع صحيح / Project name is valid');
} else {
  console.log('أخطاء / Errors:', result.errors);
}
```

### من جانب الخادم / Server-side

```typescript
import { validateProjectName } from '@/shared/types';

const result = validateProjectName('my-project-123');

if (result.isValid) {
  // معالجة اسم المشروع / Process project name
} else {
  // إرجاع أخطاء التحقق / Return validation errors
  return { errors: result.errors };
}
```

## أمثلة / Examples

### أسماء صحيحة / Valid Names ✅

```typescript
validateProjectName('myproject')           // { isValid: true, errors: [] }
validateProjectName('my-project-123')      // { isValid: true, errors: [] }
validateProjectName('my.project.name')     // { isValid: true, errors: [] }
validateProjectName('my_project_name')     // { isValid: true, errors: [] }
validateProjectName('a1-b2.c3_d4')        // { isValid: true, errors: [] }
```

### أسماء غير صحيحة / Invalid Names ❌

```typescript
// أحرف كبيرة / Uppercase letters
validateProjectName('MyProject')
// { isValid: false, errors: ['اسم المشروع يجب أن يحتوي على أحرف صغيرة فقط'] }

// رموز غير مسموحة / Invalid characters
validateProjectName('my project')
// { isValid: false, errors: ['اسم المشروع يمكن أن يحتوي فقط على أحرف صغيرة، أرقام، والرموز: . _ -'] }

// التسلسل --- / Sequence ---
validateProjectName('my---project')
// { isValid: false, errors: ['اسم المشروع لا يمكن أن يحتوي على التسلسل ---'] }

// أطول من 100 حرف / Longer than 100 characters
validateProjectName('a'.repeat(101))
// { isValid: false, errors: ['اسم المشروع يجب أن يكون حتى 100 حرف'] }

// فارغ / Empty
validateProjectName('')
// { isValid: false, errors: ['اسم المشروع مطلوب'] }
```

## الاختبارات / Tests

تم إضافة 26 اختبار شامل في `shared/_core/__tests__/validation.test.ts` لضمان عمل الدالة بشكل صحيح.

26 comprehensive tests have been added in `shared/_core/__tests__/validation.test.ts` to ensure proper functionality.

لتشغيل الاختبارات:

To run tests:

```bash
npm test -- shared/_core/__tests__/validation.test.ts
```

## الملفات المتأثرة / Files Changed

- `shared/_core/validation.ts` - التنفيذ الرئيسي / Main implementation
- `client/src/lib/validation.ts` - إعادة تصدير للاستخدام في العميل / Re-export for client use
- `shared/types.ts` - تصدير الدالة / Export function
- `shared/_core/__tests__/validation.test.ts` - الاختبارات / Tests
- `vitest.config.ts` - إعدادات الاختبار / Test configuration
