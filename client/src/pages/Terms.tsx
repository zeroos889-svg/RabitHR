import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Scale,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import { Link } from "wouter";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1 text-center">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
              <Scale className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              الشروط والأحكام
            </h1>
            <p className="text-muted-foreground">
              آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
            </p>
          </div>
        </div>

        {/* Commercial Register Notice */}
        <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4 rounded-lg mb-6">
          <p className="text-sm text-yellow-800">
            <strong>ملاحظة:</strong> السجل التجاري تحت الإصدار. هذه النسخة
            التجريبية من المنصة.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                مقدمة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                مرحباً بك في <strong className="text-foreground">رابِط</strong>.
                هذه الشروط والأحكام تحكم استخدامك لمنصتنا وخدماتنا. باستخدامك
                للمنصة، فإنك توافق على الالتزام بهذه الشروط.
              </p>
              <p>
                إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام
                خدماتنا. نحتفظ بالحق في تعديل هذه الشروط في أي وقت، وسنخطرك بأي
                تغييرات جوهرية.
              </p>
            </CardContent>
          </Card>

          {/* Definitions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                التعريفات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
              <div>
                <strong className="text-foreground">المنصة:</strong> منصة رابِط
                الإلكترونية وجميع خدماتها وميزاتها
              </div>
              <div>
                <strong className="text-foreground">المستخدم:</strong> أي شخص أو
                كيان يستخدم المنصة
              </div>
              <div>
                <strong className="text-foreground">الحساب:</strong> حساب
                المستخدم المسجل على المنصة
              </div>
              <div>
                <strong className="text-foreground">المحتوى:</strong> جميع
                البيانات والمعلومات والملفات المرفوعة
              </div>
              <div>
                <strong className="text-foreground">الخدمات:</strong> جميع
                الأدوات والميزات المتاحة على المنصة
              </div>
            </CardContent>
          </Card>

          {/* Account Registration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                التسجيل والحساب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  1. شروط التسجيل:
                </h3>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>يجب أن يكون عمرك 18 عاماً أو أكثر</li>
                  <li>تقديم معلومات صحيحة ودقيقة</li>
                  <li>الاحتفاظ بسرية كلمة المرور</li>
                  <li>إخطارنا فوراً بأي استخدام غير مصرح به</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  2. مسؤولية الحساب:
                </h3>
                <p>
                  أنت مسؤول عن جميع الأنشطة التي تتم من خلال حسابك. نحن غير
                  مسؤولين عن أي خسائر ناتجة عن الاستخدام غير المصرح به لحسابك.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  3. تعليق الحساب:
                </h3>
                <p>
                  نحتفظ بالحق في تعليق أو إنهاء حسابك في حالة انتهاك هذه الشروط
                  أو أي سلوك مسيء أو غير قانوني.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Acceptable Use */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                الاستخدام المقبول
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>يُسمح لك باستخدام المنصة للأغراض التالية:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>إدارة الموارد البشرية لشركتك أو عملائك</li>
                <li>استخدام الأدوات الذكية للحسابات والخطابات</li>
                <li>تخزين ومعالجة بيانات الموظفين</li>
                <li>التواصل مع فريق الدعم</li>
              </ul>
            </CardContent>
          </Card>

          {/* Prohibited Use */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                الاستخدام المحظور
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>يُحظر عليك القيام بما يلي:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>انتهاك أي قوانين أو لوائح محلية أو دولية</li>
                <li>رفع محتوى غير قانوني أو مسيء أو ضار</li>
                <li>محاولة اختراق أو تعطيل المنصة</li>
                <li>استخدام المنصة لإرسال رسائل تسويقية غير مرغوبة</li>
                <li>نسخ أو توزيع أو تعديل أي جزء من المنصة دون إذن</li>
                <li>استخدام أدوات آلية (bots) للوصول للمنصة</li>
                <li>انتحال شخصية أو تمثيل كيان آخر</li>
                <li>جمع معلومات المستخدمين الآخرين</li>
              </ul>
            </CardContent>
          </Card>

          {/* Subscription & Payment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-orange-600" />
                الاشتراك والدفع
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  1. الباقات:
                </h3>
                <p>
                  نوفر باقات مختلفة (مجانية ومدفوعة). الميزات والأسعار موضحة في
                  صفحة الباقات وقابلة للتغيير بإشعار مسبق.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  2. الدفع:
                </h3>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>
                    جميع الأسعار بالريال السعودي وغير شاملة لضريبة القيمة
                    المضافة (15%)
                  </li>
                  <li>الدفع يتم عبر بوابات دفع آمنة ومعتمدة</li>
                  <li>يتم تجديد الاشتراك تلقائياً ما لم تقم بإلغائه</li>
                  <li>نرسل إشعار قبل 7 أيام من التجديد</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  3. الفترة التجريبية:
                </h3>
                <p>
                  نوفر فترة تجريبية 14 يوم للباقات المدفوعة. يمكنك الإلغاء في أي
                  وقت خلال الفترة التجريبية دون رسوم.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  4. استرجاع الأموال:
                </h3>
                <p>
                  نوفر ضمان استرجاع الأموال خلال 30 يوم من الاشتراك إذا لم تكن
                  راضياً عن الخدمة. للتفاصيل، راجع صفحة سياسة الاسترجاع.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-indigo-600" />
                الملكية الفكرية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  1. ملكيتنا:
                </h3>
                <p>
                  جميع حقوق الملكية الفكرية للمنصة (الشعار، التصميم، الكود،
                  المحتوى) مملوكة لنا أو لمرخصينا. لا يحق لك استخدامها دون إذن
                  كتابي.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  2. ملكيتك:
                </h3>
                <p>
                  تحتفظ بملكية جميع البيانات والمحتوى الذي ترفعه. بتحميل
                  المحتوى، تمنحنا ترخيصاً لاستخدامه لتقديم الخدمة فقط.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Liability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                المسؤولية وإخلاء المسؤولية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  1. الخدمة "كما هي":
                </h3>
                <p>
                  نوفر المنصة "كما هي" دون أي ضمانات صريحة أو ضمنية. لا نضمن أن
                  الخدمة ستكون خالية من الأخطاء أو متاحة دائماً.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  2. حدود المسؤولية:
                </h3>
                <p>
                  لن نكون مسؤولين عن أي أضرار غير مباشرة أو عرضية أو خاصة ناتجة
                  عن استخدام أو عدم القدرة على استخدام المنصة، بما في ذلك فقدان
                  البيانات أو الأرباح.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  3. مسؤوليتك:
                </h3>
                <p>
                  أنت مسؤول عن نسخ بياناتك احتياطياً والتأكد من دقة المعلومات
                  التي تدخلها. نوصي بشدة بمراجعة جميع المخرجات (الحسابات،
                  الخطابات) قبل استخدامها رسمياً.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-red-600" />
                الإنهاء
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  1. إنهاء من قبلك:
                </h3>
                <p>
                  يمكنك إلغاء حسابك في أي وقت من الإعدادات. ستبقى بياناتك محفوظة
                  لمدة 90 يوم بعد الإلغاء.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  2. إنهاء من قبلنا:
                </h3>
                <p>
                  نحتفظ بالحق في تعليق أو إنهاء حسابك فوراً في حالة انتهاك هذه
                  الشروط، دون إشعار مسبق أو استرداد.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-teal-600" />
                القانون الحاكم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                تخضع هذه الشروط وتفسر وفقاً لأنظمة المملكة العربية السعودية. أي
                نزاع ينشأ عن هذه الشروط يخضع للاختصاص الحصري للمحاكم السعودية.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-purple-600" />
                التعديلات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سنخطرك بأي تغييرات
                جوهرية عبر البريد الإلكتروني أو إشعار على المنصة. استمرارك في
                استخدام المنصة بعد التعديلات يعني موافقتك على الشروط الجديدة.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
            <CardContent className="py-8 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">
                هل لديك استفسار قانوني؟
              </h2>
              <p className="text-lg mb-6 text-white/90">
                تواصل معنا للحصول على توضيح حول أي بند من الشروط والأحكام
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    تواصل معنا
                  </Button>
                </Link>
                <a href="mailto:info@rbithr.com">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    info@rbithr.com
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
