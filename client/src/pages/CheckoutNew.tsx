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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  Building2,
  CheckCircle2,
  Shield,
  Lock,
  ArrowRight,
  Loader2,
  Sparkles,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

// Plan definitions
const PLANS = {
  basic: {
    key: "basic" as const,
    name: "Basic",
    nameAr: "الأساسية",
    price: 799,
    features: [
      "حتى 20 موظف",
      "أدوات HR أساسية",
      "تقارير شهرية",
      "دعم فني عبر البريد",
    ],
  },
  pro: {
    key: "pro" as const,
    name: "Professional",
    nameAr: "الاحترافية",
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
  enterprise: {
    key: "enterprise" as const,
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
};

type PlanKey = keyof typeof PLANS;

export default function CheckoutNew() {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("pro");
  const [paymentGateway, setPaymentGateway] = useState<"moyasar" | "tap">("moyasar");
  const [isProcessing, setIsProcessing] = useState(false);

  // Moyasar payment mutation
  const createMoyasarPayment = trpc.payment.createMoyasarPayment.useMutation({
    onSuccess: (data) => {
      if (data.redirectUrl) {
        // Redirect to Moyasar payment page
        window.location.href = data.redirectUrl;
      } else {
        toast.error("لم يتم إرجاع رابط الدفع");
        setIsProcessing(false);
      }
    },
    onError: (error) => {
      toast.error(error.message || "فشل إنشاء عملية الدفع");
      setIsProcessing(false);
    },
  });

  // Tap payment mutation
  const createTapPayment = trpc.payment.createTapPayment.useMutation({
    onSuccess: (data) => {
      if (data.redirectUrl) {
        // Redirect to Tap payment page
        window.location.href = data.redirectUrl;
      } else {
        toast.error("لم يتم إرجاع رابط الدفع");
        setIsProcessing(false);
      }
    },
    onError: (error) => {
      toast.error(error.message || "فشل إنشاء عملية الدفع");
      setIsProcessing(false);
    },
  });

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      if (paymentGateway === "moyasar") {
        await createMoyasarPayment.mutateAsync({
          planKey: selectedPlan,
        });
      } else {
        await createTapPayment.mutateAsync({
          planKey: selectedPlan,
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      setIsProcessing(false);
    }
  };

  const selectedPlanData = PLANS[selectedPlan];
  const vatAmount = selectedPlanData.price * 0.15;
  const totalAmount = selectedPlanData.price + vatAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 py-12">
      <BackButton />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">اختر باقتك وادفع الآن</h1>
          <p className="text-muted-foreground">
            اختر الباقة المناسبة لك وأكمل عملية الدفع بأمان
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Plan Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  اختر الباقة
                </CardTitle>
                <CardDescription>
                  اختر الباقة التي تناسب احتياجات شركتك
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {(Object.keys(PLANS) as PlanKey[]).map((planKey) => {
                    const plan = PLANS[planKey];
                    const isSelected = selectedPlan === planKey;

                    return (
                      <Card
                        key={planKey}
                        className={`relative cursor-pointer transition-all hover:shadow-lg ${
                          isSelected
                            ? "border-primary ring-2 ring-primary"
                            : ""
                        }`}
                        onClick={() => setSelectedPlan(planKey)}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <Badge className="bg-primary text-white">
                              <Sparkles className="w-3 h-3 ml-1" />
                              الأكثر شعبية
                            </Badge>
                          </div>
                        )}

                        <CardHeader>
                          <CardTitle className="text-lg">
                            {plan.nameAr}
                          </CardTitle>
                          <div className="text-3xl font-bold text-primary">
                            {plan.price} ﷼
                            <span className="text-sm text-muted-foreground">
                              /شهر
                            </span>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            {plan.features.map((feature, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>

                        {isSelected && (
                          <div className="absolute top-4 right-4">
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Payment Gateway Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  بوابة الدفع
                </CardTitle>
                <CardDescription>
                  اختر بوابة الدفع المفضلة لديك
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={paymentGateway}
                  onValueChange={(value) =>
                    setPaymentGateway(value as "moyasar" | "tap")
                  }
                >
                  {/* Moyasar */}
                  <div
                    className={`flex items-center space-x-2 space-x-reverse p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentGateway === "moyasar"
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setPaymentGateway("moyasar")}
                  >
                    <RadioGroupItem value="moyasar" id="moyasar" />
                    <Label
                      htmlFor="moyasar"
                      className="flex-1 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">Moyasar</p>
                          <p className="text-xs text-muted-foreground">
                            بطاقة الائتمان، مدى، Apple Pay
                          </p>
                        </div>
                        <Badge variant="secondary">موصى به</Badge>
                      </div>
                    </Label>
                  </div>

                  {/* Tap Payment */}
                  <div
                    className={`flex items-center space-x-2 space-x-reverse p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentGateway === "tap"
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setPaymentGateway("tap")}
                  >
                    <RadioGroupItem value="tap" id="tap" />
                    <Label htmlFor="tap" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-semibold">Tap Payment</p>
                        <p className="text-xs text-muted-foreground">
                          جميع طرق الدفع المحلية والدولية
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="bg-muted/50 p-4 rounded-lg text-sm">
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    سيتم تحويلك لصفحة الدفع الآمنة الخاصة بـ{" "}
                    {paymentGateway === "moyasar" ? "Moyasar" : "Tap Payment"}
                  </p>
                </div>

                <Button
                  onClick={handlePayment}
                  className="w-full"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      جاري التحويل...
                    </>
                  ) : (
                    <>
                      <Zap className="ml-2 h-5 w-5" />
                      الدفع عبر{" "}
                      {paymentGateway === "moyasar" ? "Moyasar" : "Tap"}
                      <ArrowRight className="mr-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    <span>تشفير SSL آمن</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>PCI DSS معتمد</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Selected Plan */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">
                        باقة {selectedPlanData.nameAr}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        اشتراك شهري
                      </p>
                    </div>
                    <p className="font-semibold">{selectedPlanData.price} ﷼</p>
                  </div>

                  <ul className="text-sm text-muted-foreground space-y-1">
                    {selectedPlanData.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {selectedPlanData.features.length > 3 && (
                      <li className="text-primary">
                        +{selectedPlanData.features.length - 3} ميزة أخرى
                      </li>
                    )}
                  </ul>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>المجموع الفرعي</span>
                    <span>{selectedPlanData.price.toFixed(2)} ﷼</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>الضريبة المضافة (15%)</span>
                    <span>{vatAmount.toFixed(2)} ﷼</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>المجموع الإجمالي</span>
                    <span>{totalAmount.toFixed(2)} ﷼</span>
                  </div>
                </div>

                <div className="bg-primary/5 p-3 rounded-lg text-sm text-center">
                  <p className="text-muted-foreground">
                    سيتم تجديد الاشتراك تلقائياً كل شهر
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card className="bg-muted/30">
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">
                      معاملات آمنة 100%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      جميع البيانات مشفرة بتقنية SSL
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">ضمان استرجاع الأموال</p>
                    <p className="text-xs text-muted-foreground">
                      في حال عدم الرضا خلال 14 يوم
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
