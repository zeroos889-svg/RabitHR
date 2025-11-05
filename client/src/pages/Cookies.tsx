import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Cookie,
  Settings,
  Eye,
  BarChart,
  Shield,
} from "lucide-react";
import { Link } from "wouter";
import { Footer } from "@/components/Footer";

export default function Cookies() {
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
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-orange-500 to-red-600 mb-4">
              <Cookie className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              سياسة ملفات تعريف الارتباط
            </h1>
            <p className="text-muted-foreground">
              آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5 text-orange-600" />
                ما هي ملفات تعريف الارتباط (Cookies)؟
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                ملفات تعريف الارتباط (Cookies) هي ملفات نصية صغيرة يتم تخزينها
                على جهازك عند زيارتك لموقعنا. تساعدنا هذه الملفات في تحسين
                تجربتك وتوفير ميزات مخصصة وفهم كيفية استخدامك للمنصة.
              </p>
              <p>
                نستخدم أنواعاً مختلفة من ملفات تعريف الارتباط لأغراض متعددة. هذه
                السياسة توضح الأنواع التي نستخدمها وكيفية التحكم فيها.
              </p>
            </CardContent>
          </Card>

          {/* Types of Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                أنواع ملفات تعريف الارتباط التي نستخدمها
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Essential Cookies */}
              <div className="border-r-4 border-green-500 pr-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-foreground text-lg">
                    1. ملفات تعريف الارتباط الضرورية
                  </h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  هذه الملفات ضرورية لتشغيل المنصة ولا يمكن تعطيلها. تتضمن:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
                  <li>
                    <strong className="text-foreground">ملفات الجلسة:</strong>{" "}
                    للحفاظ على تسجيل دخولك أثناء التصفح
                  </li>
                  <li>
                    <strong className="text-foreground">ملفات الأمان:</strong>{" "}
                    لحماية حسابك من الاختراق
                  </li>
                  <li>
                    <strong className="text-foreground">ملفات التوازن:</strong>{" "}
                    لتوزيع الحمل على الخوادم
                  </li>
                </ul>
                <div className="mt-3 text-sm">
                  <strong className="text-foreground">المدة:</strong> جلسة واحدة
                  أو حتى 30 يوم
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="border-r-4 border-blue-500 pr-4">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-foreground text-lg">
                    2. ملفات تعريف الارتباط الوظيفية
                  </h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  تساعد في تذكر تفضيلاتك وتحسين تجربتك:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
                  <li>
                    <strong className="text-foreground">اللغة المفضلة:</strong>{" "}
                    تذكر اختيارك للغة العربية أو الإنجليزية
                  </li>
                  <li>
                    <strong className="text-foreground">الإعدادات:</strong> حفظ
                    تفضيلات العرض والتنسيق
                  </li>
                  <li>
                    <strong className="text-foreground">الموقع:</strong> تذكر
                    موقعك الجغرافي لتخصيص المحتوى
                  </li>
                </ul>
                <div className="mt-3 text-sm">
                  <strong className="text-foreground">المدة:</strong> حتى 12 شهر
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border-r-4 border-purple-500 pr-4">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold text-foreground text-lg">
                    3. ملفات تعريف الارتباط التحليلية
                  </h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  تساعدنا في فهم كيفية استخدامك للمنصة لتحسينها:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
                  <li>
                    <strong className="text-foreground">عدد الزيارات:</strong>{" "}
                    كم مرة تزور المنصة
                  </li>
                  <li>
                    <strong className="text-foreground">
                      الصفحات الأكثر زيارة:
                    </strong>{" "}
                    أي الميزات تستخدم أكثر
                  </li>
                  <li>
                    <strong className="text-foreground">مدة الجلسة:</strong> كم
                    من الوقت تقضي على المنصة
                  </li>
                  <li>
                    <strong className="text-foreground">مصدر الزيارة:</strong>{" "}
                    كيف وصلت إلينا (محركات بحث، إعلانات، إلخ)
                  </li>
                </ul>
                <div className="mt-3 text-sm">
                  <strong className="text-foreground">المدة:</strong> حتى 24 شهر
                </div>
                <div className="mt-2 text-sm">
                  <strong className="text-foreground">
                    الأدوات المستخدمة:
                  </strong>{" "}
                  Google Analytics، Mixpanel
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="border-r-4 border-pink-500 pr-4">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-pink-600" />
                  <h3 className="font-semibold text-foreground text-lg">
                    4. ملفات تعريف الارتباط التسويقية
                  </h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  تستخدم لعرض إعلانات مخصصة لك:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
                  <li>
                    <strong className="text-foreground">
                      الإعلانات المستهدفة:
                    </strong>{" "}
                    عرض إعلانات تناسب اهتماماتك
                  </li>
                  <li>
                    <strong className="text-foreground">
                      إعادة الاستهداف:
                    </strong>{" "}
                    تذكيرك بالمنصة عند زيارة مواقع أخرى
                  </li>
                  <li>
                    <strong className="text-foreground">قياس الأداء:</strong>{" "}
                    معرفة فعالية الحملات الإعلانية
                  </li>
                </ul>
                <div className="mt-3 text-sm">
                  <strong className="text-foreground">المدة:</strong> حتى 12 شهر
                </div>
                <div className="mt-2 text-sm">
                  <strong className="text-foreground">
                    الأدوات المستخدمة:
                  </strong>{" "}
                  Google Ads، Facebook Pixel، Twitter Ads
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Third Party Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-orange-600" />
                ملفات تعريف الارتباط من طرف ثالث
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                قد تستخدم بعض الخدمات المدمجة في منصتنا ملفات تعريف ارتباط خاصة
                بها:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>
                  <strong className="text-foreground">Google Analytics:</strong>{" "}
                  لتحليل حركة المرور
                </li>
                <li>
                  <strong className="text-foreground">Google Maps:</strong> لعرض
                  الخرائط والمواقع
                </li>
                <li>
                  <strong className="text-foreground">Stripe:</strong> لمعالجة
                  المدفوعات بشكل آمن
                </li>
                <li>
                  <strong className="text-foreground">Intercom:</strong> لخدمة
                  الدردشة والدعم
                </li>
              </ul>
              <p className="mt-4">
                هذه الخدمات لها سياسات خصوصية خاصة بها. ننصح بمراجعتها لفهم
                كيفية استخدامهم لملفات تعريف الارتباط.
              </p>
            </CardContent>
          </Card>

          {/* Managing Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-green-600" />
                كيفية التحكم في ملفات تعريف الارتباط
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  1. من خلال المتصفح:
                </h3>
                <p className="mb-3">
                  يمكنك التحكم في ملفات تعريف الارتباط من إعدادات متصفحك:
                </p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>
                    <strong className="text-foreground">Chrome:</strong>{" "}
                    الإعدادات → الخصوصية والأمان → ملفات تعريف الارتباط
                  </li>
                  <li>
                    <strong className="text-foreground">Safari:</strong>{" "}
                    التفضيلات → الخصوصية → إدارة بيانات الموقع
                  </li>
                  <li>
                    <strong className="text-foreground">Firefox:</strong>{" "}
                    الخيارات → الخصوصية والأمان → ملفات تعريف الارتباط
                  </li>
                  <li>
                    <strong className="text-foreground">Edge:</strong> الإعدادات
                    → ملفات تعريف الارتباط وأذونات الموقع
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  2. من خلال إعدادات المنصة:
                </h3>
                <p>
                  يمكنك تخصيص تفضيلات ملفات تعريف الارتباط من لوحة التحكم →
                  الإعدادات → الخصوصية.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  3. أدوات إلغاء الاشتراك:
                </h3>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      إلغاء الاشتراك في Google Analytics
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/ads/preferences"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      إدارة إعلانات Facebook
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-yellow-800">
                  <strong>تنبيه:</strong> تعطيل ملفات تعريف الارتباط الضرورية قد
                  يؤثر على وظائف المنصة الأساسية.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Your Choices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                خياراتك
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>لديك الخيارات التالية فيما يتعلق بملفات تعريف الارتباط:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>
                  <strong className="text-foreground">القبول:</strong> السماح
                  بجميع ملفات تعريف الارتباط للحصول على أفضل تجربة
                </li>
                <li>
                  <strong className="text-foreground">الرفض:</strong> رفض ملفات
                  تعريف الارتباط غير الضرورية (قد يؤثر على بعض الميزات)
                </li>
                <li>
                  <strong className="text-foreground">التخصيص:</strong> اختيار
                  أنواع محددة من ملفات تعريف الارتباط
                </li>
                <li>
                  <strong className="text-foreground">الحذف:</strong> حذف ملفات
                  تعريف الارتباط الموجودة في أي وقت
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-teal-600" />
                التحديثات على هذه السياسة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                قد نقوم بتحديث هذه السياسة من وقت لآخر لتعكس التغييرات في
                ممارساتنا أو للأسباب التشغيلية أو القانونية. سنخطرك بأي تغييرات
                جوهرية عبر البريد الإلكتروني أو إشعار على المنصة.
              </p>
              <p>
                تاريخ آخر تحديث موضح في أعلى هذه الصفحة. ننصح بمراجعة هذه
                السياسة بشكل دوري.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
            <CardContent className="py-8 text-center">
              <Cookie className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">
                أسئلة حول ملفات تعريف الارتباط؟
              </h2>
              <p className="text-lg mb-6 text-white/90">
                إذا كان لديك أي استفسار حول استخدامنا لملفات تعريف الارتباط،
                تواصل معنا
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-orange-600 hover:bg-gray-100"
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
