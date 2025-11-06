import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  XCircle,
  RefreshCcw,
  HelpCircle,
  Phone,
  Mail,
  AlertCircle,
  CreditCard,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { Link } from "wouter";

export default function PaymentFailed() {
  // Mock error data - should come from URL params or state
  const error = {
    code: "INSUFFICIENT_FUNDS",
    message: "رصيد غير كافٍ في البطاقة",
    transactionId: "TRX" + Date.now(),
    date: new Date().toLocaleDateString("ar-SA"),
    time: new Date().toLocaleTimeString("ar-SA"),
  };

  const commonErrors = [
    {
      code: "INSUFFICIENT_FUNDS",
      title: "رصيد غير كافٍ",
      description: "تأكد من وجود رصيد كافٍ في حسابك البنكي",
      solution: "حاول استخدام بطاقة أخرى أو قم بتعبئة الرصيد",
    },
    {
      code: "CARD_EXPIRED",
      title: "البطاقة منتهية الصلاحية",
      description: "تاريخ انتهاء البطاقة قد مضى",
      solution: "استخدم بطاقة سارية المفعول",
    },
    {
      code: "INVALID_CVV",
      title: "رمز CVV غير صحيح",
      description: "الرمز المكون من 3 أو 4 أرقام خلف البطاقة",
      solution: "تحقق من إدخال رمز CVV بشكل صحيح",
    },
    {
      code: "CARD_DECLINED",
      title: "البطاقة مرفوضة",
      description: "البنك رفض العملية",
      solution: "تواصل مع البنك للحصول على مزيد من التفاصيل",
    },
    {
      code: "NETWORK_ERROR",
      title: "خطأ في الاتصال",
      description: "مشكلة في الاتصال بالشبكة",
      solution: "تحقق من اتصالك بالإنترنت وحاول مرة أخرى",
    },
  ];

  const currentError = commonErrors.find(e => e.code === error.code) || {
    title: "فشلت عملية الدفع",
    description: error.message,
    solution: "يرجى المحاولة مرة أخرى أو استخدام طريقة دفع أخرى",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-primary/5 to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Error Message */}
        <Card className="border-2 border-red-500">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-red-600 mb-2">
                  {currentError.title}
                </h1>
                <p className="text-muted-foreground">
                  {currentError.description}
                </p>
              </div>

              <Badge variant="destructive" className="text-lg px-4 py-2">
                <AlertCircle className="w-4 h-4 ml-2" />
                رقم العملية: {error.transactionId}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Error Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              تفاصيل المشكلة
            </CardTitle>
            <CardDescription>ما الذي حدث ولماذا؟</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-red-900">
                    {currentError.title}
                  </p>
                  <p className="text-sm text-red-700 mt-1">
                    {currentError.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">رمز الخطأ</span>
                <span className="font-mono font-semibold">{error.code}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">التاريخ والوقت</span>
                <span className="font-semibold">
                  {error.date} - {error.time}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Solution */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              الحل المقترح
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{currentError.solution}</p>
          </CardContent>
        </Card>

        {/* Common Reasons */}
        <Card>
          <CardHeader>
            <CardTitle>أسباب شائعة لفشل الدفع</CardTitle>
            <CardDescription>تحقق من النقاط التالية</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {commonErrors.slice(0, 4).map((err, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{err.title}</p>
                    <p className="text-muted-foreground text-xs">
                      {err.solution}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/checkout" className="flex-1">
            <Button className="w-full" size="lg">
              <RefreshCcw className="ml-2 h-5 w-5" />
              المحاولة مرة أخرى
            </Button>
          </Link>

          <Link href="/pricing" className="flex-1">
            <Button variant="outline" className="w-full" size="lg">
              <ArrowLeft className="ml-2 h-5 w-5" />
              العودة إلى الباقات
            </Button>
          </Link>
        </div>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>هل تحتاج إلى مساعدة؟</CardTitle>
            <CardDescription>فريق الدعم جاهز لمساعدتك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">اتصل بنا</p>
                  <p className="text-xs text-muted-foreground">0570700355</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    الأحد - الخميس: 9ص - 5م
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">راسلنا</p>
                  <p className="text-xs text-muted-foreground">
                    info@rbithr.com
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    الرد خلال 24 ساعة
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                💡 نصيحة: احتفظ برقم العملية ({error.transactionId}) للمراجعة
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Alternative Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              طرق دفع بديلة
            </CardTitle>
            <CardDescription>جرّب إحدى الطرق التالية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                <p className="font-semibold text-sm">بطاقة ائتمان أخرى</p>
                <p className="text-xs text-muted-foreground mt-1">
                  استخدم بطاقة مختلفة
                </p>
              </div>

              <div className="p-3 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                <p className="font-semibold text-sm">تحويل بنكي</p>
                <p className="text-xs text-muted-foreground mt-1">
                  الدفع عبر التحويل المباشر
                </p>
              </div>

              <div className="p-3 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                <p className="font-semibold text-sm">Apple Pay</p>
                <p className="text-xs text-muted-foreground mt-1">
                  دفع سريع وآمن
                </p>
              </div>

              <div className="p-3 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                <p className="font-semibold text-sm">فواتير لاحقة</p>
                <p className="text-xs text-muted-foreground mt-1">
                  ادفع لاحقاً مع الفاتورة
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
