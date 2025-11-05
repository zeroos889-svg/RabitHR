import { useState } from "react";
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
  User,
  Mail,
  Lock,
  Phone,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function SignupEmployee() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: data => {
      toast.success("تم إنشاء الحساب بنجاح! 🎉");

      // Save user data
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      // Redirect to employee dashboard
      setTimeout(() => {
        setLocation("/employee/dashboard");
        setIsLoading(false);
      }, 1500);
    },
    onError: error => {
      toast.error(error.message || "فشل في إنشاء الحساب");
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    // Name validation (at least 2 characters)
    if (formData.name.length < 2) {
      toast.error("الاسم يجب أن يكون حرفين على الأقل");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("البريد الإلكتروني غير صحيح");
      return;
    }

    // Password validation
    if (formData.password.length < 8) {
      toast.error("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return;
    }

    // Password match
    if (formData.password !== formData.confirmPassword) {
      toast.error("كلمة المرور غير متطابقة");
      return;
    }

    // Terms agreement
    if (!formData.agreeToTerms) {
      toast.error("يرجى الموافقة على الشروط والأحكام");
      return;
    }

    setIsLoading(true);

    // Register
    registerMutation.mutate({
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber || undefined,
      password: formData.password,
      userType: "employee",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit(e as any);
    }
  };

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
            <CardTitle className="text-3xl">تسجيل حساب موظف</CardTitle>
            <CardDescription className="text-base">
              انضم إلى منصة رابِط مجاناً وابدأ في إدارة شؤونك الوظيفية
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Benefits */}
            <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg space-y-2">
              <p className="text-sm font-medium text-center mb-3">
                مميزات حساب الموظف:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>عرض بياناتك الوظيفية</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>طلب الإجازات إلكترونياً</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>عرض كشوف الرواتب</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>طلب الشهادات والوثائق</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">الاسم الكامل *</Label>
                <div className="relative">
                  <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="أحمد محمد"
                    className="pr-10"
                    value={formData.name}
                    onChange={e =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني *</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ahmed@example.com"
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

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الجوال (اختياري)</Label>
                <div className="relative">
                  <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="05xxxxxxxx"
                    className="pr-10"
                    value={formData.phoneNumber}
                    onChange={e =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور *</Label>
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
                    autoComplete="new-password"
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
                <p className="text-xs text-muted-foreground">
                  يجب أن تحتوي على 8 أحرف على الأقل
                </p>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور *</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pr-10 pl-10"
                    value={formData.confirmPassword}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={checked =>
                    setFormData({
                      ...formData,
                      agreeToTerms: checked as boolean,
                    })
                  }
                  disabled={isLoading}
                  className="mt-1"
                />
                <label
                  htmlFor="terms"
                  className="text-sm cursor-pointer leading-relaxed"
                >
                  أوافق على{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    الشروط والأحكام
                  </Link>{" "}
                  و{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    سياسة الخصوصية
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                className="w-full gradient-primary text-white"
                size="lg"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري إنشاء الحساب...
                  </>
                ) : (
                  <>إنشاء حساب مجاني</>
                )}
              </Button>
            </form>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground">
              لديك حساب بالفعل؟{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                تسجيل الدخول
              </Link>
            </p>
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
