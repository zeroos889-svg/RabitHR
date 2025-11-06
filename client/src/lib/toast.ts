import { toast as sonnerToast } from "sonner";

// Enhanced toast utilities with Arabic support and better UX

interface ToastOptions {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const toast = {
  success: (message: string, options?: ToastOptions) => {
    return sonnerToast.success(message, {
      duration: options?.duration || 4000,
      action: options?.action,
      className: "rtl:text-right",
      style: {
        direction: "rtl",
      },
    });
  },

  error: (message: string, options?: ToastOptions) => {
    return sonnerToast.error(message, {
      duration: options?.duration || 5000,
      action: options?.action,
      className: "rtl:text-right",
      style: {
        direction: "rtl",
      },
    });
  },

  info: (message: string, options?: ToastOptions) => {
    return sonnerToast.info(message, {
      duration: options?.duration || 4000,
      action: options?.action,
      className: "rtl:text-right",
      style: {
        direction: "rtl",
      },
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    return sonnerToast.warning(message, {
      duration: options?.duration || 4500,
      action: options?.action,
      className: "rtl:text-right",
      style: {
        direction: "rtl",
      },
    });
  },

  loading: (message: string) => {
    return sonnerToast.loading(message, {
      className: "rtl:text-right",
      style: {
        direction: "rtl",
      },
    });
  },

  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((_data: T) => string);
      error: string | ((_error: unknown) => string);
    }
  ) => {
    return sonnerToast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
      className: "rtl:text-right",
      style: {
        direction: "rtl",
      },
    });
  },

  dismiss: (toastId?: string | number) => {
    sonnerToast.dismiss(toastId);
  },
};

// Pre-defined success messages in Arabic
export const successMessages = {
  save: "تم الحفظ بنجاح ✓",
  update: "تم التحديث بنجاح ✓",
  delete: "تم الحذف بنجاح ✓",
  create: "تم الإنشاء بنجاح ✓",
  submit: "تم الإرسال بنجاح ✓",
  upload: "تم الرفع بنجاح ✓",
  download: "تم التنزيل بنجاح ✓",
  login: "تم تسجيل الدخول بنجاح ✓",
  logout: "تم تسجيل الخروج بنجاح ✓",
  register: "تم التسجيل بنجاح ✓",
  verify: "تم التحقق بنجاح ✓",
  send: "تم الإرسال بنجاح ✓",
  copy: "تم النسخ إلى الحافظة ✓",
  share: "تم المشاركة بنجاح ✓",
  payment: "تم الدفع بنجاح ✓",
  booking: "تم الحجز بنجاح ✓",
};

// Pre-defined error messages in Arabic
export const errorMessages = {
  save: "فشل الحفظ. الرجاء المحاولة مرة أخرى.",
  update: "فشل التحديث. الرجاء المحاولة مرة أخرى.",
  delete: "فشل الحذف. الرجاء المحاولة مرة أخرى.",
  create: "فشل الإنشاء. الرجاء المحاولة مرة أخرى.",
  submit: "فشل الإرسال. الرجاء المحاولة مرة أخرى.",
  upload: "فشل الرفع. الرجاء المحاولة مرة أخرى.",
  download: "فشل التنزيل. الرجاء المحاولة مرة أخرى.",
  login: "فشل تسجيل الدخول. تحقق من بياناتك.",
  logout: "فشل تسجيل الخروج. الرجاء المحاولة مرة أخرى.",
  register: "فشل التسجيل. الرجاء المحاولة مرة أخرى.",
  verify: "فشل التحقق. الرجاء المحاولة مرة أخرى.",
  send: "فشل الإرسال. الرجاء المحاولة مرة أخرى.",
  copy: "فشل النسخ. الرجاء المحاولة مرة أخرى.",
  network: "خطأ في الاتصال. تحقق من اتصالك بالإنترنت.",
  unauthorized: "جلستك انتهت. الرجاء تسجيل الدخول مرة أخرى.",
  forbidden: "ليس لديك صلاحية للقيام بهذا الإجراء.",
  notFound: "المورد المطلوب غير موجود.",
  server: "خطأ في الخادم. فريق الدعم يعمل على حل المشكلة.",
  payment: "فشلت عملية الدفع. الرجاء المحاولة مرة أخرى.",
};
