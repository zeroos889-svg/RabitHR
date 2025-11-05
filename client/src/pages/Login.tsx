import { useState, useEffect } from "react";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Mail,
  Lock,
  ArrowRight,
  Shield,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Login() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isAdminMode, setIsAdminMode] = useState(false);

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: data => {
      toast.success(data.message || "تم تسجيل الدخول بنجاح!");

      // Save user data to localStorage
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      // Redirect based on user type
      setTimeout(() => {
        if (data.user.role === "admin" || isAdminMode) {
          setLocation("/admin");
        } else if (data.user.userType === "company") {
          setLocation("/dashboard");
        } else if ((data.user as any).userType === "consultant") {
          setLocation("/consultant/dashboard");
        } else if (data.user.userType === "employee") {
          setLocation("/employee/dashboard");
        } else {
          setLocation("/profile");
        }
        setIsLoading(false);
      }, 1000);
    },
    onError: error => {
      toast.error(error.message || "فشل في تسجيل الدخول");
      setIsLoading(false);
    },
  });

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("البريد الإلكتروني غير صحيح");
      return;
    }

    setIsLoading(true);

    // Login with database
    loginMutation.mutate({
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe,
    });
  };

  const handleSocialLogin = (provider: string) => {
    const socialData = {
      provider,
      isAdminMode,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("pendingSocialLogin", JSON.stringify(socialData));

    // Redirect to OAuth
    window.location.href = getLoginUrl();
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleLogin();
    }
  };

  // Check for OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error) {
      toast.error("فشل في تسجيل الدخول عبر OAuth");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="container max-w-md py-8">
        <BackButton />

        <Card className="mt-6 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 mb-4 hover:opacity-80 transition-opacity"
            >
              <img src="/rabit-logo.svg" alt="Rabit" className="h-10 w-10" />
              <span className="text-2xl font-bold text-gradient-primary">
                رابِط
              </span>
            </Link>
            <CardTitle className="text-3xl">
              {isAdminMode ? "دخول المدير" : "تسجيل الدخول"}
            </CardTitle>
            <CardDescription className="text-base">
              {isAdminMode
                ? "مرحباً بك في لوحة التحكم الإدارية"
                : "مرحباً بعودتك! سجّل الدخول للمتابعة"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Admin Mode Toggle */}
            <div className="flex items-center justify-center gap-2 p-3 bg-muted/50 rounded-lg transition-colors hover:bg-muted/70">
              <Checkbox
                id="admin-mode"
                checked={isAdminMode}
                onCheckedChange={checked => setIsAdminMode(checked as boolean)}
                disabled={isLoading}
              />
              <label
                htmlFor="admin-mode"
                className="text-sm font-medium cursor-pointer flex items-center gap-2"
              >
                <Shield className="h-4 w-4 text-primary" />
                دخول كمدير المشروع
              </label>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@company.com"
                    className="pr-10"
                    value={formData.email}
                    onChange={e =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pr-10 pl-10"
                    value={formData.password}
                    onChange={e =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember-me"
                  checked={formData.rememberMe}
                  onCheckedChange={checked =>
                    setFormData({ ...formData, rememberMe: checked as boolean })
                  }
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="text-sm cursor-pointer">
                  تذكرني
                </label>
              </div>

              {/* Login Button */}
              <Button
                className="w-full gradient-primary text-white"
                size="lg"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري تسجيل الدخول...
                  </>
                ) : (
                  <>
                    تسجيل الدخول
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  أو الدخول عبر
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full hover:bg-muted/50 transition-colors"
                onClick={() => handleSocialLogin("google")}
                type="button"
                disabled={isLoading}
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="h-4 w-4 ml-2"
                />
                الدخول عبر Google
              </Button>

              <Button
                variant="outline"
                className="w-full hover:bg-muted/50 transition-colors"
                onClick={() => handleSocialLogin("apple")}
                type="button"
                disabled={isLoading}
              >
                <svg
                  className="h-4 w-4 ml-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                الدخول عبر Apple
              </Button>

              <Button
                variant="outline"
                className="w-full hover:bg-muted/50 transition-colors"
                onClick={() => handleSocialLogin("microsoft")}
                type="button"
                disabled={isLoading}
              >
                <svg
                  className="h-4 w-4 ml-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
                </svg>
                الدخول عبر Microsoft
              </Button>

              <Button
                variant="outline"
                className="w-full hover:bg-muted/50 transition-colors"
                onClick={() => handleSocialLogin("manus")}
                type="button"
                disabled={isLoading}
              >
                <svg
                  className="h-4 w-4 ml-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
                تسجيل الدخول عبر حسابك
              </Button>
            </div>

            {/* Signup Link */}
            <p className="text-center text-sm text-muted-foreground">
              ليس لديك حساب؟{" "}
              <Link
                href="/signup"
                className="text-primary hover:underline font-medium"
              >
                إنشاء حساب جديد
              </Link>
            </p>

            {/* Admin Note */}
            {isAdminMode && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg animate-in fade-in duration-300">
                <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
                  <Shield className="h-3 w-3 inline ml-1" />
                  أنت تقوم بتسجيل الدخول كمدير للمشروع. ستحصل على صلاحيات إدارية
                  كاملة.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Note */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          🔒 جميع البيانات محمية ومشفرة. نحن نحترم خصوصيتك.
        </p>
      </div>
    </div>
  );
}
