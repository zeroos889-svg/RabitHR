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
  Building2,
  Mail,
  Phone,
  MapPin,
  User,
  Briefcase,
  FileText,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function SignupCompany() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form data for all steps
  const [companyData, setCompanyData] = useState({
    // Step 1: Company Info
    companyName: "",
    companyNameEn: "",
    commercialRegister: "",
    taxNumber: "",
    address: "",
    city: "",

    // Step 2: Admin Info
    adminName: "",
    jobTitle: "",
    email: "",
    phone: "",

    // Step 3: Package Selection
    packageId: "",
  });

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    cookies: false,
  });

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: () => {
      toast.success("تم التسجيل بنجاح! جاري تحويلك إلى صفحة الدفع...");
      setTimeout(() => {
        setLocation("/payment");
      }, 2000);
    },
    onError: error => {
      toast.error(error.message || "حدث خطأ أثناء التسجيل");
    },
  });

  const handleSubmit = async () => {
    // Validate agreements
    if (!agreements.terms || !agreements.privacy || !agreements.cookies) {
      toast.error("يجب الموافقة على جميع الشروط للمتابعة");
      return;
    }

    setIsLoading(true);

    try {
      await registerMutation.mutateAsync({
        email: companyData.email,
        password: Math.random().toString(36).slice(-8), // Generate temporary password
        name: companyData.adminName,
        phoneNumber: companyData.phone,
        userType: "company",
      });
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!companyData.companyName || !companyData.email) {
        toast.error("الرجاء إكمال جميع الحقول المطلوبة");
        return;
      }
    } else if (currentStep === 2) {
      if (!companyData.adminName || !companyData.phone) {
        toast.error("الرجاء إكمال جميع الحقول المطلوبة");
        return;
      }
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const packages = [
    {
      id: "starter",
      name: "Starter",
      nameAr: "المبتدئ",
      price: 799,
      features: [
        "حتى 20 موظف",
        "أدوات HR أساسية",
        "تقارير شهرية",
        "دعم فني عبر البريد",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      nameAr: "الاحترافي",
      price: 1499,
      features: [
        "حتى 50 موظف",
        "جميع أدوات HR",
        "تقارير متقدمة",
        "دعم فني مباشر",
        "استشارة مجانية شهرياً",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      nameAr: "الشركات الكبرى",
      price: 2999,
      features: [
        "عدد غير محدود من الموظفين",
        "جميع الميزات المتقدمة",
        "تقارير مخصصة",
        "دعم فني مخصص 24/7",
        "استشارات غير محدودة",
        "API مخصص",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 flex items-center justify-center p-4">
      <BackButton />

      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">تسجيل حساب شركة</CardTitle>
          <CardDescription>
            أكمل الخطوات التالية لإنشاء حساب شركتك على منصة رابِط
          </CardDescription>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    currentStep >= step
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    step
                  )}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 ${
                      currentStep > step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>بيانات الشركة</span>
            <span>بيانات المسؤول</span>
            <span>اختيار الباقة</span>
          </div>
        </CardHeader>

        <CardContent>
          {/* Step 1: Company Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">معلومات الشركة</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">
                    اسم الشركة (بالعربي) <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="companyName"
                      placeholder="مثال: شركة رابِط للتقنية"
                      className="pr-10"
                      value={companyData.companyName}
                      onChange={e =>
                        setCompanyData({
                          ...companyData,
                          companyName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyNameEn">اسم الشركة (بالإنجليزي)</Label>
                  <Input
                    id="companyNameEn"
                    placeholder="Example: Rabit Technology Co."
                    value={companyData.companyNameEn}
                    onChange={e =>
                      setCompanyData({
                        ...companyData,
                        companyNameEn: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commercialRegister">السجل التجاري</Label>
                  <div className="relative">
                    <FileText className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="commercialRegister"
                      placeholder="1010xxxxxx"
                      className="pr-10"
                      value={companyData.commercialRegister}
                      onChange={e =>
                        setCompanyData({
                          ...companyData,
                          commercialRegister: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxNumber">الرقم الضريبي</Label>
                  <Input
                    id="taxNumber"
                    placeholder="300xxxxxxxxx"
                    value={companyData.taxNumber}
                    onChange={e =>
                      setCompanyData({
                        ...companyData,
                        taxNumber: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">
                    المدينة <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="city"
                      placeholder="الرياض"
                      className="pr-10"
                      value={companyData.city}
                      onChange={e =>
                        setCompanyData({
                          ...companyData,
                          city: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    البريد الإلكتروني <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="info@company.com"
                      className="pr-10"
                      value={companyData.email}
                      onChange={e =>
                        setCompanyData({
                          ...companyData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">العنوان التفصيلي</Label>
                <Input
                  id="address"
                  placeholder="الشارع، الحي، المدينة"
                  value={companyData.address}
                  onChange={e =>
                    setCompanyData({
                      ...companyData,
                      address: e.target.value,
                    })
                  }
                />
              </div>

              <Button onClick={nextStep} className="w-full" size="lg">
                التالي
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Step 2: Admin Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">معلومات المسؤول</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adminName">
                    الاسم الكامل <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="adminName"
                      placeholder="أحمد محمد"
                      className="pr-10"
                      value={companyData.adminName}
                      onChange={e =>
                        setCompanyData({
                          ...companyData,
                          adminName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobTitle">المسمى الوظيفي</Label>
                  <div className="relative">
                    <Briefcase className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="jobTitle"
                      placeholder="مدير الموارد البشرية"
                      className="pr-10"
                      value={companyData.jobTitle}
                      onChange={e =>
                        setCompanyData({
                          ...companyData,
                          jobTitle: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    رقم الجوال <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="05xxxxxxxx"
                      className="pr-10"
                      value={companyData.phone}
                      onChange={e =>
                        setCompanyData({
                          ...companyData,
                          phone: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
                <p>
                  سيتم استخدام هذه المعلومات لإنشاء حساب المسؤول الرئيسي على
                  المنصة
                </p>
              </div>

              <div className="flex gap-3">
                <Button onClick={prevStep} variant="outline" className="flex-1">
                  <ArrowLeft className="ml-2 h-5 w-5" />
                  السابق
                </Button>
                <Button onClick={nextStep} className="flex-1">
                  التالي
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Package Selection */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">اختر الباقة المناسبة</h3>

              <div className="grid md:grid-cols-3 gap-4">
                {packages.map(pkg => (
                  <Card
                    key={pkg.id}
                    className={`relative cursor-pointer transition-all hover:shadow-lg ${
                      companyData.packageId === pkg.id
                        ? "border-primary ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() =>
                      setCompanyData({ ...companyData, packageId: pkg.id })
                    }
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                          الأكثر شعبية
                        </span>
                      </div>
                    )}

                    <CardHeader>
                      <CardTitle className="text-lg">{pkg.nameAr}</CardTitle>
                      <div className="text-3xl font-bold text-primary">
                        {pkg.price} ﷼
                        <span className="text-sm text-muted-foreground">
                          /شهر
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Agreements */}
              <div className="space-y-4 border-t pt-6">
                <h4 className="font-semibold">الموافقة على الشروط</h4>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={agreements.terms}
                      onCheckedChange={checked =>
                        setAgreements({ ...agreements, terms: !!checked })
                      }
                    />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      أوافق على{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:underline"
                      >
                        الشروط والأحكام
                      </Link>
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="privacy"
                      checked={agreements.privacy}
                      onCheckedChange={checked =>
                        setAgreements({ ...agreements, privacy: !!checked })
                      }
                    />
                    <Label htmlFor="privacy" className="text-sm cursor-pointer">
                      أوافق على{" "}
                      <Link
                        href="/privacy"
                        className="text-primary hover:underline"
                      >
                        سياسة الخصوصية
                      </Link>
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="cookies"
                      checked={agreements.cookies}
                      onCheckedChange={checked =>
                        setAgreements({ ...agreements, cookies: !!checked })
                      }
                    />
                    <Label htmlFor="cookies" className="text-sm cursor-pointer">
                      أوافق على{" "}
                      <Link
                        href="/cookies"
                        className="text-primary hover:underline"
                      >
                        سياسة ملفات تعريف الارتباط
                      </Link>
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={prevStep} variant="outline" className="flex-1">
                  <ArrowLeft className="ml-2 h-5 w-5" />
                  السابق
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1"
                  disabled={
                    isLoading ||
                    !companyData.packageId ||
                    !agreements.terms ||
                    !agreements.privacy ||
                    !agreements.cookies
                  }
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      جاري التسجيل...
                    </>
                  ) : (
                    <>
                      إكمال التسجيل
                      <ArrowRight className="mr-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trust Indicators */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border">
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-green-600" />
          <span>آمن 100%</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-green-600" />
          <span>مشفر</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-green-600" />
          <span>محمي</span>
        </div>
      </div>
    </div>
  );
}
