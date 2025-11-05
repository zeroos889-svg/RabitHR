import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

/**
 * Hook للتوجيه الذكي بناءً على نوع المستخدم
 * يوجه المستخدم إلى الصفحة المناسبة حسب دوره
 */
export function useSmartRedirect() {
  const { user, isAuthenticated, loading } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (loading) return;

    // إذا كان المستخدم غير مسجل دخول
    if (!isAuthenticated) {
      // توجيه من صفحات محمية إلى تسجيل الدخول
      if (
        location.startsWith("/dashboard") ||
        location.startsWith("/admin") ||
        location.startsWith("/consultant")
      ) {
        setLocation("/login");
      }
      return;
    }

    // إذا كان المستخدم مسجل دخول
    if (user) {
      // توجيه من صفحات التسجيل إلى لوحة التحكم المناسبة
      if (location === "/signup" || location === "/login") {
        redirectBasedOnRole(user.role);
      }
    }
  }, [isAuthenticated, user, loading, location, setLocation]);

  const redirectBasedOnRole = (role: string) => {
    switch (role) {
      case "admin":
        setLocation("/admin");
        break;
      case "company":
        setLocation("/dashboard");
        break;
      case "consultant":
        setLocation("/consultant-dashboard");
        break;
      case "employee":
        setLocation("/employee/dashboard");
        break;
      default:
        setLocation("/");
    }
  };

  return { user, isAuthenticated, loading };
}
