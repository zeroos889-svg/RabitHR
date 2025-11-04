/**
 * دوال التحقق من صحة البيانات - جانب الخادم
 * Validation utilities - Server side
 */

/**
 * التحقق من صحة اسم المشروع
 * Validates project name according to Vercel specifications:
 * - Maximum 100 characters
 * - Lowercase only
 * - Can include letters, digits, '.', '_', '-'
 * - Cannot contain '---' sequence
 */
export function validateProjectName(projectName: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // التحقق من الطول (حتى 100 حرف)
  if (projectName.length === 0) {
    errors.push('اسم المشروع مطلوب');
  } else if (projectName.length > 100) {
    errors.push('اسم المشروع يجب أن يكون حتى 100 حرف');
  }

  // التحقق من أن جميع الأحرف صغيرة
  if (projectName !== projectName.toLowerCase()) {
    errors.push('اسم المشروع يجب أن يحتوي على أحرف صغيرة فقط');
  }

  // التحقق من الأحرف المسموحة: أحرف، أرقام، '.', '_', '-'
  const validPattern = /^[a-z0-9._-]+$/;
  if (projectName.length > 0 && !validPattern.test(projectName)) {
    errors.push('اسم المشروع يمكن أن يحتوي فقط على أحرف صغيرة، أرقام، والرموز: . _ -');
  }

  // التحقق من عدم وجود '---'
  if (projectName.includes('---')) {
    errors.push('اسم المشروع لا يمكن أن يحتوي على التسلسل ---');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
