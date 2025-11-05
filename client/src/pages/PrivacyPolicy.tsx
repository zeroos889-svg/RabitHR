import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Shield,
  Building2,
  Database,
  Clock,
  UserCheck,
  FileText,
  Mail,
  AlertCircle,
  Globe,
} from "lucide-react";
import { Link } from "wouter";
import { Footer } from "@/components/Footer";

/**
 * صفحة سياسة الخصوصية المتوافقة مع PDPL
 * تحتوي على جميع العناصر المطلوبة من سدايا
 */
export default function PrivacyPolicy() {
  const policyVersion = "PP-1.0-2025";
  const lastUpdated = "1 يناير 2025";

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
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              إشعار الخصوصية
            </h1>
            <p className="text-muted-foreground">
              الإصدار: {policyVersion} | آخر تحديث: {lastUpdated}
            </p>
          </div>
        </div>

        {/* Alert Box */}
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-blue-900">
                  هذا الإشعار متوافق مع نظام حماية البيانات الشخصية السعودي
                  (PDPL)
                </p>
                <p className="text-blue-700">
                  نلتزم بحماية بياناتك الشخصية وفقاً لأعلى معايير الأمان
                  والخصوصية المعتمدة من الهيئة السعودية للبيانات والذكاء
                  الاصطناعي (سدايا).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* 1. هوية المتحكّم */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                1. هوية المتحكّم في البيانات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                <p>
                  <strong className="text-foreground">الاسم التجاري:</strong>{" "}
                  رابِط - منصة الموارد البشرية الذكية
                </p>
                <p>
                  <strong className="text-foreground">السجل التجاري:</strong>{" "}
                  [يُضاف لاحقاً]
                </p>
                <p>
                  <strong className="text-foreground">العنوان:</strong> المملكة
                  العربية السعودية
                </p>
                <p>
                  <strong className="text-foreground">
                    البريد الإلكتروني:
                  </strong>{" "}
                  <a
                    href="mailto:dpo@rabit.sa"
                    className="text-blue-600 hover:underline"
                  >
                    dpo@rabit.sa
                  </a>
                </p>
              </div>
              <p>
                نحن المتحكّم في بياناتك الشخصية، ونتحمل المسؤولية الكاملة عن
                معالجتها وفقاً للأغراض المحددة في هذا الإشعار.
              </p>
            </CardContent>
          </Card>

          {/* 2. الغرض من المعالجة */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                2. الغرض من معالجة البيانات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>نقوم بمعالجة بياناتك الشخصية للأغراض التالية:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>
                  <strong className="text-foreground">
                    إنشاء وإدارة الحساب:
                  </strong>{" "}
                  لتمكينك من الوصول إلى خدمات المنصة
                </li>
                <li>
                  <strong className="text-foreground">تقديم الخدمات:</strong>{" "}
                  إدارة الموارد البشرية، الاستشارات، توليد المستندات
                </li>
                <li>
                  <strong className="text-foreground">التواصل:</strong> إرسال
                  الإشعارات والتحديثات المتعلقة بالخدمة
                </li>
                <li>
                  <strong className="text-foreground">تحسين الخدمة:</strong>{" "}
                  تحليل الاستخدام لتطوير المنصة
                </li>
                <li>
                  <strong className="text-foreground">
                    الامتثال القانوني:
                  </strong>{" "}
                  الالتزام بالمتطلبات النظامية
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 3. أنواع البيانات */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                3. أنواع البيانات المجمّعة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    بيانات أساسية:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 mr-4">
                    <li>الاسم الكامل</li>
                    <li>البريد الإلكتروني</li>
                    <li>رقم الجوال (اختياري)</li>
                    <li>كلمة المرور (مشفّرة)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    بيانات الاستخدام:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 mr-4">
                    <li>عنوان IP</li>
                    <li>نوع المتصفح</li>
                    <li>تاريخ ووقت الزيارة</li>
                    <li>الصفحات المُشاهدة</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    بيانات الخدمة (حسب الاستخدام):
                  </h4>
                  <ul className="list-disc list-inside space-y-1 mr-4">
                    <li>بيانات الموظفين (للشركات)</li>
                    <li>المستندات المرفوعة</li>
                    <li>سجلات الاستشارات</li>
                  </ul>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <p className="text-amber-900 text-sm">
                  <strong>ملاحظة:</strong> نطبق مبدأ "تقليل البيانات" - نجمع فقط
                  البيانات الضرورية لتقديم الخدمة.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 4. الأساس القانوني */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-blue-600" />
                4. الأساس القانوني للمعالجة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>نعالج بياناتك بناءً على:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>
                  <strong className="text-foreground">موافقتك الصريحة:</strong>{" "}
                  عند التسجيل في المنصة
                </li>
                <li>
                  <strong className="text-foreground">تنفيذ العقد:</strong>{" "}
                  لتقديم الخدمات المتفق عليها
                </li>
                <li>
                  <strong className="text-foreground">
                    الالتزام القانوني:
                  </strong>{" "}
                  للامتثال للأنظمة السعودية
                </li>
                <li>
                  <strong className="text-foreground">المصلحة المشروعة:</strong>{" "}
                  لتحسين الخدمة وحماية الأمن
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 5. مدة الاحتفاظ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                5. مدة الاحتفاظ بالبيانات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>نحتفظ ببياناتك للمدد التالية:</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span>بيانات المستخدمين</span>
                  <span className="font-semibold text-foreground">
                    5 سنوات بعد آخر نشاط
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span>الملفات المرفوعة</span>
                  <span className="font-semibold text-foreground">3 سنوات</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span>سجلات النظام</span>
                  <span className="font-semibold text-foreground">6 أشهر</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span>سجلات التدقيق</span>
                  <span className="font-semibold text-foreground">سنتان</span>
                </div>
              </div>
              <p className="text-sm">
                بعد انتهاء المدة، يتم حذف البيانات تلقائياً أو إخفاء هويتها بشكل
                دائم.
              </p>
            </CardContent>
          </Card>

          {/* 6. حقوق صاحب البيانات */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-blue-600" />
                6. حقوقك في بياناتك
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>لك الحق في:</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-2">الوصول</h4>
                  <p className="text-sm text-blue-700">
                    الحصول على نسخة من بياناتك
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-2">التصحيح</h4>
                  <p className="text-sm text-green-700">
                    تعديل البيانات غير الصحيحة
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                  <h4 className="font-semibold text-red-900 mb-2">الحذف</h4>
                  <p className="text-sm text-red-700">طلب حذف بياناتك</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <h4 className="font-semibold text-purple-900 mb-2">
                    سحب الموافقة
                  </h4>
                  <p className="text-sm text-purple-700">
                    إلغاء موافقتك في أي وقت
                  </p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <h4 className="font-semibold text-amber-900 mb-2">
                    الاعتراض
                  </h4>
                  <p className="text-sm text-amber-700">
                    الاعتراض على معالجة معينة
                  </p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                  <h4 className="font-semibold text-indigo-900 mb-2">النقل</h4>
                  <p className="text-sm text-indigo-700">
                    نقل بياناتك لجهة أخرى
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/my-data">
                  <Button className="w-full md:w-auto">إدارة بياناتي</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 7. نقل البيانات */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                7. نقل البيانات خارج المملكة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">
                  موقع التخزين الافتراضي:
                </strong>{" "}
                المملكة العربية السعودية
              </p>
              <p>في حال الحاجة لنقل بياناتك خارج المملكة، سنقوم بـ:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>إخطارك مسبقاً</li>
                <li>الحصول على موافقتك الصريحة</li>
                <li>
                  تطبيق الضمانات الكافية (مثل البنود التعاقدية القياسية لسدايا)
                </li>
                <li>توثيق عملية النقل</li>
              </ul>
            </CardContent>
          </Card>

          {/* 8. الأمن */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                8. أمن البيانات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>نطبق تدابير أمنية صارمة لحماية بياناتك:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>تشفير البيانات أثناء النقل والتخزين (TLS/SSL)</li>
                <li>التحكم في الوصول بناءً على الأدوار (RBAC)</li>
                <li>مراقبة الأنشطة المشبوهة</li>
                <li>نسخ احتياطية منتظمة</li>
                <li>اختبارات أمنية دورية</li>
              </ul>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <p className="text-red-900 text-sm">
                  <strong>الإخطار عن الخروقات:</strong> في حال حدوث خرق أمني،
                  سنخطرك وسدايا خلال 72 ساعة.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 9. الذكاء الاصطناعي */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                9. استخدام الذكاء الاصطناعي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                نستخدم الذكاء الاصطناعي في بعض خدماتنا (مثل المساعد الذكي
                للاستشارات). جميع المخرجات المولّدة آلياً تُعرض مع تنبيه واضح.
              </p>
              <p>
                <strong className="text-foreground">
                  التدريب على البيانات:
                </strong>{" "}
                لا نستخدم بياناتك لتدريب نماذج الذكاء الاصطناعي إلا بموافقتك
                الصريحة.
              </p>
            </CardContent>
          </Card>

          {/* 10. التواصل */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                10. التواصل معنا
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>لأي استفسارات أو طلبات تتعلق بخصوصيتك، يمكنك التواصل معنا:</p>
              <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                <p>
                  <strong className="text-foreground">
                    مسؤول حماية البيانات (DPO):
                  </strong>
                </p>
                <p>
                  البريد الإلكتروني:{" "}
                  <a
                    href="mailto:dpo@rabit.sa"
                    className="text-blue-600 hover:underline"
                  >
                    dpo@rabit.sa
                  </a>
                </p>
                <p>الرد خلال: 30 يوم عمل</p>
              </div>
              <div className="mt-4">
                <Link href="/data-protection-contact">
                  <Button variant="outline" className="w-full md:w-auto">
                    تقديم شكوى أو طلب
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 11. التحديثات */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                11. تحديثات السياسة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                قد نقوم بتحديث هذه السياسة من وقت لآخر. سنخطرك بأي تغييرات
                جوهرية عبر:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>إشعار على المنصة</li>
                <li>بريد إلكتروني</li>
                <li>تحديث تاريخ "آخر تحديث" أعلى الصفحة</li>
              </ul>
              <p>
                استمرارك في استخدام المنصة بعد التحديثات يعني موافقتك على
                السياسة الجديدة.
              </p>
            </CardContent>
          </Card>

          {/* Footer Info */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  هذا الإشعار متوافق مع نظام حماية البيانات الشخصية السعودي
                  (PDPL)
                </p>
                <p className="text-sm text-muted-foreground">
                  الصادر عن الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا)
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                  الإصدار: {policyVersion} | تاريخ السريان: {lastUpdated}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
