import { useState } from "react";
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
import { Mail, Lock, Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";

export default function ConsultantLogin() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: data => {
      toast.success("تم تسجيل الدخول بنجاح! 🎉");

      // Save user data
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      // Redirect based on user type
      setTimeout(() => {
        if ((data.user as any).userType === "consultant") {
          setLocation("/consultant/dashboard");
        } else {
          setLocation("/dashboard");
        }
        setIsLoading(false);
      }, 1500);
    },
    onError: error => {
      const errorMessage = error.message || "فشل في تسجيل الدخول";
      setError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      setError("يرجى ملء جميع الحقول");
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("البريد الإلكتروني غير صحيح");
      toast.error("البريد الإلكتروني غير صحيح");
      return;
    }

    setIsLoading(true);
    loginMutation.mutate({
      email: formData.email,
      password: formData.password,
      rememberMe,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit(e as any);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to signup */}
        <div className="mb-6 text-center">
          <Link href="/signup">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-primary"
            >
              ← العودة إلى الاختيار
            </Button>
          </Link>
        </div>

        {/* Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-2 pb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white text-xl font-bold">💼</span>
              </div>
            </div>
            <CardTitle className="text-2xl text-center">
              تسجيل دخول المستشار
            </CardTitle>
            <CardDescription className="text-center">
              أدخل بيانات حسابك للدخول إلى لوحة التحكم
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Alert */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  البريد الإلكتروني
                </Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="pr-10"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  كلمة المرور
                </Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="pr-10"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={checked =>
                      setRememberMe(checked as boolean)
                    }
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm cursor-pointer font-normal"
                  >
                    تذكرني
                  </Label>
                </div>
                <Link href="/forgot-password">
                  <Button
                    variant="link"
                    className="text-sm p-0 h-auto text-primary hover:underline"
                  >
                    نسيت كلمة المرور؟
                  </Button>
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold gradient-primary text-white hover-lift"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                    جاري تسجيل الدخول...
                  </>
                ) : (
                  "تسجيل الدخول"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">
                  أو
                </span>
              </div>
            </div>

            {/* OAuth Login */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base font-semibold"
              onClick={() => (window.location.href = getLoginUrl())}
              disabled={isLoading}
            >
              <svg
                className="h-5 w-5 ml-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.002 12.002 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              تسجيل الدخول عبر GitHub
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-muted-foreground">
              ليس لديك حساب؟{" "}
              <Link href="/signup/consultant">
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary hover:underline"
                >
                  إنشاء حساب
                </Button>
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Support */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>هل تواجه مشكلة؟</p>
          <Link href="/support">
            <Button
              variant="link"
              className="p-0 h-auto text-primary hover:underline"
            >
              تواصل مع الدعم الفني
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
