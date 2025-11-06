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
import {
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { Link, useRoute, useLocation } from "wouter";
import { toast } from "sonner";

export default function ResetPassword() {
  const [, params] = useRoute("/reset-password/:token");
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
    }
    if (!/[A-Z]/.test(password)) {
      return "يجب أن تحتوي على حرف كبير واحد على الأقل";
    }
    if (!/[a-z]/.test(password)) {
      return "يجب أن تحتوي على حرف صغير واحد على الأقل";
    }
    if (!/[0-9]/.test(password)) {
      return "يجب أن تحتوي على رقم واحد على الأقل";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setErrors({ ...errors, password: passwordError });
      toast.error(passwordError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "كلمات المرور غير متطابقة" });
      toast.error("كلمات المرور غير متطابقة");
      return;
    }

    if (!params?.token) {
      toast.error("رابط غير صالح");
      return;
    }

    setIsLoading(true);
    setErrors({ password: "", confirmPassword: "" });

    // Simulate API call - TODO: Implement actual password reset
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      toast.success("تم تغيير كلمة المرور بنجاح!");

      // Redirect to login after 3 seconds
      setTimeout(() => {
        setLocation("/login");
      }, 3000);
    }, 2000);
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { label: "", color: "" };
    if (password.length < 8) return { label: "ضعيفة", color: "text-red-500" };
    if (password.length < 12)
      return { label: "متوسطة", color: "text-yellow-500" };
    return { label: "قوية", color: "text-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 flex items-center justify-center p-4">
      <BackButton />

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">إعادة تعيين كلمة المرور</CardTitle>
          <CardDescription>
            {success
              ? "تم تغيير كلمة المرور بنجاح"
              : "أدخل كلمة مرور جديدة لحسابك"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {success ? (
            <div className="text-center space-y-6">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-lg">تم التغيير بنجاح!</p>
                <p className="text-muted-foreground">
                  تم تغيير كلمة المرور الخاصة بك بنجاح
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
                <p>جاري تحويلك إلى صفحة تسجيل الدخول...</p>
              </div>

              <Link href="/login">
                <Button className="w-full group">
                  تسجيل الدخول الآن
                  <ArrowRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور الجديدة</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة مرور قوية"
                    className="pr-10 pl-10"
                    value={formData.password}
                    onChange={e => {
                      setFormData({ ...formData, password: e.target.value });
                      setErrors({ ...errors, password: "" });
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          formData.password.length < 8
                            ? "w-1/3 bg-red-500"
                            : formData.password.length < 12
                              ? "w-2/3 bg-yellow-500"
                              : "w-full bg-green-500"
                        }`}
                      />
                    </div>
                    <span className={`font-medium ${passwordStrength.color}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                )}

                {errors.password && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="أعد إدخال كلمة المرور"
                    className="pr-10 pl-10"
                    value={formData.confirmPassword}
                    onChange={e => {
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      });
                      setErrors({ ...errors, confirmPassword: "" });
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
                <p className="font-medium">متطلبات كلمة المرور:</p>
                <ul className="text-muted-foreground space-y-1 text-right">
                  <li
                    className={
                      formData.password.length >= 8 ? "text-green-600" : ""
                    }
                  >
                    • 8 أحرف على الأقل
                  </li>
                  <li
                    className={
                      /[A-Z]/.test(formData.password) ? "text-green-600" : ""
                    }
                  >
                    • حرف كبير واحد على الأقل
                  </li>
                  <li
                    className={
                      /[a-z]/.test(formData.password) ? "text-green-600" : ""
                    }
                  >
                    • حرف صغير واحد على الأقل
                  </li>
                  <li
                    className={
                      /[0-9]/.test(formData.password) ? "text-green-600" : ""
                    }
                  >
                    • رقم واحد على الأقل
                  </li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={
                  isLoading || !formData.password || !formData.confirmPassword
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري التحديث...
                  </>
                ) : (
                  <>
                    تحديث كلمة المرور
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="text-center">
                <Link href="/login">
                  <Button variant="ghost" className="text-sm">
                    العودة لتسجيل الدخول
                  </Button>
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Trust Indicators */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border">
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-green-600" />
          <span>تشفير 256-bit</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-green-600" />
          <span>آمن 100%</span>
        </div>
      </div>
    </div>
  );
}
