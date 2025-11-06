import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Download,
  Home,
  Mail,
  FileText,
  Calendar,
  CreditCard,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "wouter";
import confetti from "canvas-confetti";

export default function PaymentSuccess() {
  // Success animation
  useEffect(() => {
    // Fire confetti on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#8B5CF6", "#EC4899", "#F59E0B"],
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#8B5CF6", "#EC4899", "#F59E0B"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  // Mock transaction data - should come from URL params or state
  const transaction = {
    id: "TRX" + Date.now(),
    amount: 1499,
    vat: 224.85,
    total: 1723.85,
    date: new Date().toLocaleDateString("ar-SA"),
    time: new Date().toLocaleTimeString("ar-SA"),
    packageName: "الباقة الاحترافية",
    paymentMethod: "بطاقة مدى",
    cardLast4: "1234",
  };

  const handleDownloadReceipt = () => {
    // TODO: Generate and download PDF receipt
    console.log("Downloading receipt...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-primary/5 to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Success Message */}
        <Card className="border-2 border-green-500">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-green-600 mb-2">
                  تمت عملية الدفع بنجاح!
                </h1>
                <p className="text-muted-foreground">
                  شكراً لك على الاشتراك في منصة رابِط
                </p>
              </div>

              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Sparkles className="w-4 h-4 ml-2" />
                رقم العملية: {transaction.id}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              تفاصيل العملية
            </CardTitle>
            <CardDescription>معلومات الدفع والاشتراك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Package Info */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">الباقة</span>
                <span className="font-semibold">{transaction.packageName}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">المبلغ</span>
                <span className="font-semibold">{transaction.amount} ﷼</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">
                  ضريبة القيمة المضافة (15%)
                </span>
                <span className="font-semibold">{transaction.vat} ﷼</span>
              </div>

              <Separator />

              <div className="flex justify-between items-center text-lg">
                <span className="font-bold">المجموع الإجمالي</span>
                <span className="font-bold text-primary">
                  {transaction.total} ﷼
                </span>
              </div>
            </div>

            <Separator />

            {/* Payment Method */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  طريقة الدفع
                </span>
                <span className="font-semibold">
                  {transaction.paymentMethod} •••• {transaction.cardLast4}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  التاريخ والوقت
                </span>
                <span className="font-semibold">
                  {transaction.date} - {transaction.time}
                </span>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4" />
                تم إرسال إيصال الدفع
              </p>
              <p className="text-sm text-muted-foreground">
                تم إرسال إيصال الدفع التفصيلي إلى بريدك الإلكتروني المسجل. يمكنك
                أيضاً تحميله من هنا.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle>الخطوات التالية</CardTitle>
            <CardDescription>ابدأ رحلتك مع رابِط الآن</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                1
              </div>
              <div>
                <p className="font-semibold">قم بإعداد حسابك</p>
                <p className="text-sm text-muted-foreground">
                  أضف معلومات شركتك وقم بتخصيص الإعدادات
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                2
              </div>
              <div>
                <p className="font-semibold">أضف فريق العمل</p>
                <p className="text-sm text-muted-foreground">
                  ابدأ بإضافة موظفيك وإدارة بياناتهم
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                3
              </div>
              <div>
                <p className="font-semibold">استكشف الأدوات</p>
                <p className="text-sm text-muted-foreground">
                  جرّب أدوات HR المتقدمة والتقارير الذكية
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleDownloadReceipt}
            variant="outline"
            className="flex-1"
            size="lg"
          >
            <Download className="ml-2 h-5 w-5" />
            تحميل الإيصال
          </Button>

          <Link href="/dashboard" className="flex-1">
            <Button className="w-full" size="lg">
              <Home className="ml-2 h-5 w-5" />
              الانتقال إلى لوحة التحكم
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Support */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                هل تحتاج إلى مساعدة؟
              </p>
              <Link href="/contact">
                <Button variant="ghost" size="sm">
                  تواصل مع الدعم الفني
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
