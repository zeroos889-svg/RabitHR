import { useState } from "react";
import { useLocation } from "wouter";
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CreditCard,
  Building2,
  CheckCircle2,
  Shield,
  Lock,
  ArrowRight,
  Loader2,
  Sparkles,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"credit_card" | "bank_transfer">("credit_card");
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    discount: number;
    discountType: "percentage" | "fixed";
  } | null>(null);

  // Selected package (from previous step)
  const [selectedPackage] = useState({
    id: "professional",
    name: "الباقة الاحترافية",
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    features: [
      "حتى 50 موظف",
      "جميع أدوات HR",
      "تقارير متقدمة",
      "دعم فني مباشر",
      "استشارة مجانية شهرياً",
      "تكامل مع الأنظمة الحكومية",
    ],
  });

  // Form data
  const [billingData, setBillingData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    taxNumber: "",
    address: "",
  });

  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  // Discount code mutation
  const validateDiscountMutation = trpc.discountCodes.validate.useMutation({
    onSuccess: (data) => {
      setAppliedDiscount({
        code: discountCode,
        discount: data.discount,
        discountType: data.discountType as "percentage" | "fixed",
      });
      toast.success("تم تطبيق كود الخصم بنجاح!");
    },
    onError: (error) => {
      toast.error(error.message || "كود الخصم غير صالح");
    },
  });

  // Calculate final price
  const calculateFinalPrice = () => {
    let price = selectedPackage.price;
    
    if (appliedDiscount) {
      if (appliedDiscount.discountType === "percentage") {
        price -= (price * appliedDiscount.discount) / 100;
      } else {
        price -= appliedDiscount.discount;
      }
    }
    
    return Math.max(0, price);
  };

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      toast.error("الرجاء إدخال كود الخصم");
      return;
    }

    await validateDiscountMutation.mutateAsync({
      code: discountCode,
      packageId: selectedPackage.id,
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!billingData.fullName || !billingData.email || !billingData.phone) {
      toast.error("الرجاء إكمال جميع البيانات المطلوبة");
      return;
    }

    if (paymentMethod === "credit_card") {
      if (!cardData.cardNumber || !cardData.cardName || !cardData.expiryDate || !cardData.cvv) {
        toast.error("الرجاء إكمال بيانات البطاقة");
        return;
      }
    }

    setIsLoading(true);

    try {
      // Simulate payment processing - TODO: Integrate with Moyasar/Tap Payment
      await new Promise(resolve => setTimeout(resolve, 3000));

      toast.success("تمت عملية الدفع بنجاح!");
      
      // Redirect to success page
      setTimeout(() => {
        setLocation("/payment-success");
      }, 1500);
    } catch (error) {
      toast.error("حدث خطأ أثناء معالجة الدفع");
    } finally {
      setIsLoading(false);
    }
  };

  const finalPrice = calculateFinalPrice();
  const vatAmount = finalPrice * 0.15; // 15% VAT
  const totalAmount = finalPrice + vatAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 py-12">
      <BackButton />
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">إتمام عملية الدفع</h1>
          <p className="text-muted-foreground">
            أنت على بعد خطوة واحدة من الانضمام إلى منصة رابِط
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  معلومات الفوترة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        الاسم الكامل <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        value={billingData.fullName}
                        onChange={(e) =>
                          setBillingData({ ...billingData, fullName: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        البريد الإلكتروني <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={billingData.email}
                        onChange={(e) =>
                          setBillingData({ ...billingData, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        رقم الجوال <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="05xxxxxxxx"
                        value={billingData.phone}
                        onChange={(e) =>
                          setBillingData({ ...billingData, phone: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companyName">اسم الشركة</Label>
                      <Input
                        id="companyName"
                        value={billingData.companyName}
                        onChange={(e) =>
                          setBillingData({ ...billingData, companyName: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="taxNumber">الرقم الضريبي</Label>
                      <Input
                        id="taxNumber"
                        placeholder="300xxxxxxxxx"
                        value={billingData.taxNumber}
                        onChange={(e) =>
                          setBillingData({ ...billingData, taxNumber: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">العنوان</Label>
                      <Input
                        id="address"
                        value={billingData.address}
                        onChange={(e) =>
                          setBillingData({ ...billingData, address: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  طريقة الدفع
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value as "credit_card" | "bank_transfer")}
                >
                  <div className="flex items-center space-x-2 space-x-reverse p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="credit_card" id="credit_card" />
                    <Label htmlFor="credit_card" className="flex-1 cursor-pointer">
                      بطاقة الائتمان / مدى
                    </Label>
                    <div className="flex gap-2">
                      <Badge variant="secondary">Visa</Badge>
                      <Badge variant="secondary">Mastercard</Badge>
                      <Badge variant="secondary">مدى</Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                    <Label htmlFor="bank_transfer" className="flex-1 cursor-pointer">
                      تحويل بنكي
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "credit_card" && (
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">رقم البطاقة</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        value={cardData.cardNumber}
                        onChange={(e) =>
                          setCardData({ ...cardData, cardNumber: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">اسم حامل البطاقة</Label>
                      <Input
                        id="cardName"
                        placeholder="كما هو مكتوب على البطاقة"
                        value={cardData.cardName}
                        onChange={(e) =>
                          setCardData({ ...cardData, cardName: e.target.value })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={cardData.expiryDate}
                          onChange={(e) =>
                            setCardData({ ...cardData, expiryDate: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="password"
                          placeholder="123"
                          maxLength={4}
                          value={cardData.cvv}
                          onChange={(e) =>
                            setCardData({ ...cardData, cvv: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "bank_transfer" && (
                  <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                    <p className="font-semibold">معلومات الحساب البنكي:</p>
                    <div className="space-y-1 text-sm">
                      <p>اسم البنك: البنك الأهلي السعودي</p>
                      <p>رقم الحساب: SA1234567890123456789012</p>
                      <p>اسم المستفيد: شركة رابِط للتقنية</p>
                      <p className="text-muted-foreground mt-2">
                        يرجى إرفاق إثبات التحويل عند التواصل معنا
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  type="button"
                  onClick={handlePayment}
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      جاري معالجة الدفع...
                    </>
                  ) : (
                    <>
                      إتمام الدفع - {totalAmount.toFixed(2)} ﷼
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
                {/* Package Details */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{selectedPackage.name}</h3>
                      <p className="text-sm text-muted-foreground">اشتراك شهري</p>
                    </div>
                    <div className="text-left">
                      {selectedPackage.discount > 0 && (
                        <p className="text-sm text-muted-foreground line-through">
                          {selectedPackage.originalPrice} ﷼
                        </p>
                      )}
                      <p className="font-semibold">{selectedPackage.price} ﷼</p>
                    </div>
                  </div>

                  {selectedPackage.discount > 0 && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <Sparkles className="w-3 h-3 ml-1" />
                      خصم {selectedPackage.discount}%
                    </Badge>
                  )}

                  <ul className="text-sm text-muted-foreground space-y-1">
                    {selectedPackage.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {selectedPackage.features.length > 3 && (
                      <li className="text-primary">
                        +{selectedPackage.features.length - 3} ميزة أخرى
                      </li>
                    )}
                  </ul>
                </div>

                <Separator />

                {/* Discount Code */}
                <div className="space-y-2">
                  <Label htmlFor="discount">كود الخصم</Label>
                  <div className="flex gap-2">
                    <Input
                      id="discount"
                      placeholder="أدخل الكود"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                      disabled={!!appliedDiscount}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleApplyDiscount}
                      disabled={validateDiscountMutation.isPending || !!appliedDiscount}
                    >
                      {validateDiscountMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Tag className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {appliedDiscount && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" />
                      تم تطبيق خصم {appliedDiscount.discount}
                      {appliedDiscount.discountType === "percentage" ? "%" : " ﷼"}
                    </p>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>المجموع الفرعي</span>
                    <span>{selectedPackage.price.toFixed(2)} ﷼</span>
                  </div>

                  {appliedDiscount && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>الخصم</span>
                      <span>
                        -{" "}
                        {appliedDiscount.discountType === "percentage"
                          ? ((selectedPackage.price * appliedDiscount.discount) / 100).toFixed(2)
                          : appliedDiscount.discount.toFixed(2)}{" "}
                        ﷼
                      </span>
                    </div>
                  )}

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
                    <p className="font-semibold text-sm">معاملات آمنة 100%</p>
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
