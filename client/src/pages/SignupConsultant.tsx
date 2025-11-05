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
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  Lock,
  Phone,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle2,
  Briefcase,
  Upload,
  FileText,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function SignupConsultant() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",

    // Step 2: Professional Info
    companyName: "",
    yearsOfExperience: "",
    specialization: "",
    bio: "",

    // Step 3: Documents & Agreement
    cvFile: null as File | null,
    certificationFile: null as File | null,
    agreeToTerms: false,
  });

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: data => {
      toast.success("تم إنشاء الحساب بنجاح! 🎉");

      // Save user data
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      // Redirect to payment page (will be implemented later)
      setTimeout(() => {
        toast.info("سيتم توجيهك إلى صفحة الدفع...");
        // TODO: Redirect to payment page
        setLocation("/consultant/dashboard");
        setIsLoading(false);
      }, 1500);
    },
    onError: error => {
      toast.error(error.message || "فشل في إنشاء الحساب");
      setIsLoading(false);
    },
  });

  const handleNext = () => {
    if (currentStep === 1) {
      // Validate Step 1
      if (!formData.name || !formData.email || !formData.password) {
        toast.error("يرجى ملء جميع الحقول المطلوبة");
        return;
      }

      if (formData.name.length < 2) {
        toast.error("الاسم يجب أن يكون حرفين على الأقل");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("البريد الإلكتروني غير صحيح");
        return;
      }

      if (formData.password.length < 8) {
        toast.error("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("كلمة المرور غير متطابقة");
        return;
      }

      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate Step 2
      if (!formData.yearsOfExperience || !formData.specialization) {
        toast.error("يرجى ملء جميع الحقول المطلوبة");
        return;
      }

      const years = parseInt(formData.yearsOfExperience);
      if (isNaN(years) || years < 0 || years > 50) {
        toast.error("سنوات الخبرة غير صحيحة");
        return;
      }

      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate Step 3
    if (!formData.agreeToTerms) {
      toast.error("يرجى الموافقة على الشروط والأحكام");
      return;
    }

    setIsLoading(true);

    // TODO: Upload files to S3 first
    // For now, we'll just register without files

    // Register
    registerMutation.mutate({
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber || undefined,
      password: formData.password,
      userType: "consultant" as any,
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "cvFile" | "certificationFile"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("حجم الملف يجب أن يكون أقل من 5 ميجابايت");
        return;
      }
      setFormData({ ...formData, [field]: file });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="container max-w-2xl py-8">
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
            <CardTitle className="text-3xl">تسجيل حساب مستقل HR</CardTitle>
            <CardDescription className="text-base">
              انضم إلى شبكة مستشاري الموارد البشرية المحترفين
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map(step => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      currentStep >= step
                        ? "bg-primary border-primary text-white"
                        : "border-muted-foreground/30 text-muted-foreground"
                    }`}
                  >
                    {currentStep > step ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <span className="font-bold">{step}</span>
                    )}
                  </div>
                  {step < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${
                        currentStep > step
                          ? "bg-primary"
                          : "bg-muted-foreground/20"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">المعلومات الشخصية</h3>
                  <p className="text-sm text-muted-foreground">
                    أدخل بياناتك الأساسية لإنشاء الحساب
                  </p>
                </div>

                {/* Name */}
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
                      required
                      autoComplete="name"
                    />
                  </div>
                </div>

                {/* Email */}
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
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الجوال *</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="05xxxxxxxx"
                      className="pr-10"
                      value={formData.phoneNumber}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value,
                        })
                      }
                      required
                      autoComplete="tel"
                    />
                  </div>
                </div>

                {/* Password */}
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
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
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

                {/* Confirm Password */}
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
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute left-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  className="w-full gradient-primary text-white"
                  size="lg"
                  onClick={handleNext}
                  type="button"
                >
                  التالي
                </Button>
              </div>
            )}

            {/* Step 2: Professional Info */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">المعلومات المهنية</h3>
                  <p className="text-sm text-muted-foreground">
                    أخبرنا المزيد عن خبرتك في الموارد البشرية
                  </p>
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName">
                    اسم الشركة / المكتب (اختياري)
                  </Label>
                  <div className="relative">
                    <Briefcase className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="مكتب أحمد للاستشارات"
                      className="pr-10"
                      value={formData.companyName}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          companyName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Years of Experience */}
                <div className="space-y-2">
                  <Label htmlFor="experience">سنوات الخبرة *</Label>
                  <Input
                    id="experience"
                    type="number"
                    placeholder="5"
                    min="0"
                    max="50"
                    value={formData.yearsOfExperience}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        yearsOfExperience: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* Specialization */}
                <div className="space-y-2">
                  <Label htmlFor="specialization">التخصص *</Label>
                  <Input
                    id="specialization"
                    type="text"
                    placeholder="استشارات الموارد البشرية، التوظيف، التدريب..."
                    value={formData.specialization}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        specialization: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">نبذة تعريفية (اختياري)</Label>
                  <Textarea
                    id="bio"
                    placeholder="اكتب نبذة مختصرة عن خبرتك وخدماتك..."
                    rows={4}
                    value={formData.bio}
                    onChange={e =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    ستظهر هذه النبذة في ملفك الشخصي
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={handleBack}
                    type="button"
                  >
                    السابق
                  </Button>
                  <Button
                    className="w-full gradient-primary text-white"
                    size="lg"
                    onClick={handleNext}
                    type="button"
                  >
                    التالي
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Documents & Agreement */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">
                    المستندات والموافقة
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    ارفع مستنداتك ووافق على الشروط
                  </p>
                </div>

                {/* CV Upload */}
                <div className="space-y-2">
                  <Label htmlFor="cv">السيرة الذاتية (اختياري)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <input
                      id="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={e => handleFileChange(e, "cvFile")}
                      className="hidden"
                    />
                    <label htmlFor="cv" className="cursor-pointer">
                      {formData.cvFile ? (
                        <div className="flex items-center justify-center gap-2 text-primary">
                          <FileText className="h-5 w-5" />
                          <span className="text-sm font-medium">
                            {formData.cvFile.name}
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            اضغط لرفع السيرة الذاتية
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PDF, DOC, DOCX (حتى 5MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Certification Upload */}
                <div className="space-y-2">
                  <Label htmlFor="certification">الشهادات (اختياري)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <input
                      id="certification"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={e => handleFileChange(e, "certificationFile")}
                      className="hidden"
                    />
                    <label htmlFor="certification" className="cursor-pointer">
                      {formData.certificationFile ? (
                        <div className="flex items-center justify-center gap-2 text-primary">
                          <FileText className="h-5 w-5" />
                          <span className="text-sm font-medium">
                            {formData.certificationFile.name}
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            اضغط لرفع الشهادات
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PDF, JPG, PNG (حتى 5MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Pricing Info */}
                <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">الاشتراك الشهري:</span>
                    <span className="text-2xl font-bold text-gradient-primary">
                      299 ريال
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>جميع الأدوات الذكية</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>إصدار شهادات غير محدودة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>مولّد خطابات بالذكاء الاصطناعي</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>دعم فني مخصص</span>
                    </div>
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
                    className="mt-1"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm cursor-pointer leading-relaxed"
                  >
                    أوافق على{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      الشروط والأحكام
                    </Link>{" "}
                    و{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      سياسة الخصوصية
                    </Link>{" "}
                    وأوافق على الاشتراك الشهري بقيمة 299 ريال
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={handleBack}
                    type="button"
                    disabled={isLoading}
                  >
                    السابق
                  </Button>
                  <Button
                    className="w-full gradient-primary text-white"
                    size="lg"
                    onClick={handleSubmit}
                    type="button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        جاري الإنشاء...
                      </>
                    ) : (
                      "إنشاء الحساب والمتابعة للدفع"
                    )}
                  </Button>
                </div>
              </div>
            )}

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
