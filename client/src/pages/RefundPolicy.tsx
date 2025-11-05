import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
} from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              رابِط
            </a>
          </Link>
          <Link href="/">
            <a className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowRight className="h-4 w-4" />
              العودة للرئيسية
            </a>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              سياسة الاسترجاع والاستبدال
            </h1>
            <p className="text-muted-foreground">آخر تحديث: 1 يناير 2025</p>
          </div>

          <div className="prose prose-lg max-w-none">
            {/* مقدمة */}
            <section className="mb-8">
              <p className="text-lg leading-relaxed text-gray-700">
                نحن في <strong>منصة رابِط</strong> نسعى دائماً لتقديم أفضل تجربة
                لعملائنا. نلتزم بتوفير خدمات عالية الجودة، ونضع رضاكم في المقام
                الأول. هذه السياسة توضح شروط وأحكام الاسترجاع والاستبدال للخدمات
                المقدمة عبر منصتنا.
              </p>
            </section>

            {/* الخدمات القابلة للاسترجاع */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                الخدمات القابلة للاسترجاع
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>الاستشارات المدفوعة:</strong> يمكن طلب استرجاع
                      المبلغ خلال 14 يوماً من تاريخ الحجز إذا لم يتم البدء في
                      تقديم الخدمة.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>الباقات الشهرية/السنوية:</strong> يمكن إلغاء
                      الاشتراك واسترجاع المبلغ المتبقي (نسبياً) خلال 7 أيام من
                      تاريخ الاشتراك.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>الدورات التدريبية:</strong> يمكن طلب الاسترجاع
                      خلال 7 أيام من تاريخ الشراء إذا لم يتم حضور أكثر من 20% من
                      المحتوى.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* الخدمات غير القابلة للاسترجاع */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <XCircle className="h-6 w-6 text-red-600" />
                الخدمات غير القابلة للاسترجاع
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>الاستشارات المكتملة:</strong> بعد تقديم الاستشارة
                      وإرسال التقرير النهائي.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>الأدوات المجانية:</strong> الحاسبات والأدوات
                      المجانية غير قابلة للاسترجاع (لأنها مجانية).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>المستندات المولدة:</strong> بعد توليد المستند
                      وتحميله.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>الخدمات المخصصة:</strong> الخدمات التي تم تخصيصها
                      خصيصاً لك.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* المدة الزمنية */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Clock className="h-6 w-6 text-blue-600" />
                المدة الزمنية للاسترجاع
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <h3 className="font-bold text-lg mb-2 text-blue-900">
                      الاستشارات
                    </h3>
                    <p className="text-3xl font-bold text-blue-600 mb-1">
                      14 يوم
                    </p>
                    <p className="text-sm text-gray-600">من تاريخ الحجز</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <h3 className="font-bold text-lg mb-2 text-blue-900">
                      الباقات
                    </h3>
                    <p className="text-3xl font-bold text-blue-600 mb-1">
                      7 أيام
                    </p>
                    <p className="text-sm text-gray-600">من تاريخ الاشتراك</p>
                  </div>
                </div>
              </div>
            </section>

            {/* إجراءات الاسترجاع */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">إجراءات طلب الاسترجاع</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                      1
                    </span>
                    <div>
                      <h3 className="font-bold mb-1">تقديم الطلب</h3>
                      <p className="text-gray-600">
                        تواصل معنا عبر البريد الإلكتروني أو نموذج الاتصال مع ذكر
                        رقم الطلب وسبب الاسترجاع.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                      2
                    </span>
                    <div>
                      <h3 className="font-bold mb-1">المراجعة</h3>
                      <p className="text-gray-600">
                        سيقوم فريقنا بمراجعة طلبك خلال 3-5 أيام عمل.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                      3
                    </span>
                    <div>
                      <h3 className="font-bold mb-1">الموافقة</h3>
                      <p className="text-gray-600">
                        في حالة الموافقة، سيتم إرسال إشعار لك بالبريد
                        الإلكتروني.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                      4
                    </span>
                    <div>
                      <h3 className="font-bold mb-1">الاسترجاع</h3>
                      <p className="text-gray-600">
                        سيتم استرجاع المبلغ إلى نفس طريقة الدفع خلال 7-14 يوم
                        عمل.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* الاستثناءات */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                الاستثناءات والحالات الخاصة
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <ul className="space-y-2 text-gray-700">
                  <li>
                    • في حالة وجود مشكلة تقنية من طرفنا، سيتم الاسترجاع الفوري
                    بدون قيود.
                  </li>
                  <li>
                    • في حالة عدم رضاك عن جودة الخدمة، يمكننا تقديم استشارة
                    بديلة أو استرجاع جزئي.
                  </li>
                  <li>• العروض الترويجية والخصومات قد تخضع لشروط خاصة.</li>
                  <li>
                    • الخدمات المقدمة بأكواد خصم خاصة قد لا تكون قابلة
                    للاسترجاع.
                  </li>
                </ul>
              </div>
            </section>

            {/* معلومات التواصل */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">للاستفسارات والدعم</h2>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <p className="mb-4">
                  إذا كان لديك أي استفسار بخصوص سياسة الاسترجاع، يمكنك التواصل
                  معنا عبر:
                </p>
                <ul className="space-y-2">
                  <li>
                    <strong>البريد الإلكتروني:</strong> support@rabit-hr.com
                  </li>
                  <li>
                    <strong>الهاتف:</strong> +966 XX XXX XXXX
                  </li>
                  <li>
                    <strong>ساعات العمل:</strong> الأحد - الخميس، 9 صباحاً - 5
                    مساءً
                  </li>
                </ul>
              </div>
            </section>

            {/* ملاحظة قانونية */}
            <section className="bg-gray-100 rounded-lg p-6 text-sm text-gray-600">
              <p className="mb-2">
                <strong>ملاحظة قانونية:</strong> هذه السياسة تخضع لأنظمة وزارة
                التجارة السعودية ونظام التجارة الإلكترونية. نحتفظ بالحق في تعديل
                هذه السياسة في أي وقت، وسيتم إشعار المستخدمين بأي تغييرات
                جوهرية.
              </p>
              <p>جميع الحقوق محفوظة © 2025 منصة رابِط</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
