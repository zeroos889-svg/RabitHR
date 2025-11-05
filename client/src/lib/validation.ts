/**
 * Utility functions لـ Input Validation
 */

// التحقق من البريد الإلكتروني
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// التحقق من كلمة المرور (8 أحرف على الأقل، حرف كبير، حرف صغير، رقم)
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("كلمة المرور يجب أن تحتوي على حرف كبير");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("كلمة المرور يجب أن تحتوي على حرف صغير");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("كلمة المرور يجب أن تحتوي على رقم");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// التحقق من رقم الهاتف السعودي
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^(05|966)[0-9]{8}$/;
  const cleanPhone = phone.replace(/\D/g, "");
  return phoneRegex.test(cleanPhone);
}

// التحقق من الاسم
export function validateName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 100;
}

// التحقق من عدم وجود XSS
export function sanitizeInput(input: string): string {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

// التحقق من البيانات الشاملة
export function validateSignupData(data: {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (data.name && !validateName(data.name)) {
    errors.name = "الاسم يجب أن يكون بين 2 و 100 حرف";
  }

  if (data.email && !validateEmail(data.email)) {
    errors.email = "البريد الإلكتروني غير صحيح";
  }

  if (data.phone && !validatePhoneNumber(data.phone)) {
    errors.phone = "رقم الهاتف غير صحيح";
  }

  if (data.password) {
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors.join(", ");
    }
  }

  if (
    data.password &&
    data.confirmPassword &&
    data.password !== data.confirmPassword
  ) {
    errors.confirmPassword = "كلمات المرور غير متطابقة";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
