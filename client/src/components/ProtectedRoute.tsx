import { ReactNode } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string | string[];
  fallback?: ReactNode;
}

/**
 * Component لحماية الصفحات
 * يتحقق من تسجيل الدخول والدور المطلوب
 */
export function ProtectedRoute({
  children,
  requiredRole,
  fallback,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();

  // عرض محمل أثناء التحقق من الحالة
  if (loading) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )
    );
  }

  // إذا لم يكن مسجل دخول، إعادة توجيه إلى تسجيل الدخول
  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  // إذا كان هناك دور مطلوب، التحقق منه
  if (requiredRole && user) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

    if (!roles.includes(user.role)) {
      return (
        fallback || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">غير مصرح</h1>
              <p className="text-muted-foreground">
                ليس لديك صلاحية للوصول إلى هذه الصفحة
              </p>
            </div>
          </div>
        )
      );
    }
  }

  // إذا كان كل شيء صحيح، عرض المحتوى
  return <>{children}</>;
}
