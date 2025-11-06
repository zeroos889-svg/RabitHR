import { AlertCircle, RefreshCw, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface ErrorMessageProps {
  title?: string;
  message: string;
  variant?: "default" | "destructive";
  onRetry?: () => void;
  retryText?: string;
  fullScreen?: boolean;
  showIcon?: boolean;
}

export function ErrorMessage({
  title,
  message,
  variant = "destructive",
  onRetry,
  retryText = "إعادة المحاولة",
  fullScreen = false,
  showIcon = true,
}: ErrorMessageProps) {
  const getIcon = () => {
    if (!showIcon) return null;

    if (variant === "default") {
      return <AlertCircle className="h-5 w-5" />;
    }
    return <XCircle className="h-5 w-5" />;
  };

  const content = (
    <Alert
      variant={variant}
      className="animate-in slide-in-from-top-4 duration-500 max-w-2xl mx-auto"
    >
      {getIcon()}
      <div className="flex-1">
        {title && <AlertTitle className="text-lg mb-2">{title}</AlertTitle>}
        <AlertDescription className="text-base leading-relaxed">
          {message}
        </AlertDescription>
      </div>
      {onRetry && (
        <div className="mt-4 flex gap-2">
          <Button
            onClick={onRetry}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            {retryText}
          </Button>
        </div>
      )}
    </Alert>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm z-50 animate-in fade-in duration-300">
        <div className="w-full max-w-2xl">{content}</div>
      </div>
    );
  }

  return <div className="p-4">{content}</div>;
}

// Utility function to convert error objects to user-friendly Arabic messages
export function getErrorMessage(error: unknown): string {
  if (typeof error === "string") {
    return translateErrorMessage(error);
  }

  if (error instanceof Error) {
    return translateErrorMessage(error.message);
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return translateErrorMessage(error.message);
  }

  return "حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.";
}

// Translate common error messages to Arabic
function translateErrorMessage(message: string): string {
  const errorMap: Record<string, string> = {
    // Network errors
    "Network Error": "خطأ في الاتصال بالشبكة. تحقق من اتصالك بالإنترنت.",
    "Failed to fetch": "فشل الاتصال بالخادم. تحقق من اتصالك بالإنترنت.",
    timeout: "انتهت مهلة الاتصال. الرجاء المحاولة مرة أخرى.",

    // Authentication errors
    Unauthorized: "جلستك انتهت. الرجاء تسجيل الدخول مرة أخرى.",
    "Invalid credentials": "بيانات الدخول غير صحيحة.",
    "Token expired": "انتهت صلاحية جلستك. الرجاء تسجيل الدخول مرة أخرى.",

    // Validation errors
    "Validation failed":
      "البيانات المدخلة غير صحيحة. الرجاء التحقق من المعلومات.",
    "Required field": "هذا الحقل مطلوب.",
    "Invalid email": "البريد الإلكتروني غير صحيح.",
    "Password too short": "كلمة المرور قصيرة جداً.",

    // Server errors
    "Internal Server Error": "خطأ في الخادم. فريق الدعم يعمل على حل المشكلة.",
    "Service Unavailable": "الخدمة غير متوفرة حالياً. الرجاء المحاولة لاحقاً.",
    "Bad Gateway": "خطأ في الاتصال بالخادم. الرجاء المحاولة لاحقاً.",

    // Resource errors
    "Not Found": "المورد المطلوب غير موجود.",
    "Already exists": "هذا العنصر موجود مسبقاً.",
    "Permission denied": "ليس لديك صلاحية للقيام بهذا الإجراء.",

    // Payment errors
    "Payment failed": "فشلت عملية الدفع. الرجاء المحاولة مرة أخرى.",
    "Insufficient funds": "الرصيد غير كافٍ.",
    "Card declined": "تم رفض البطاقة. تحقق من معلومات البطاقة.",
  };

  // Check for exact match
  if (errorMap[message]) {
    return errorMap[message];
  }

  // Check for partial match
  for (const [key, value] of Object.entries(errorMap)) {
    if (message.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }

  // Return original message if no translation found
  return message || "حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.";
}
