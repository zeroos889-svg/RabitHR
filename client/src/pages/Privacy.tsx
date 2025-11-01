import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Shield, Lock, Eye, Database, UserCheck, FileText, Mail } from 'lucide-react';
import { Link } from 'wouter';

export default function Privacy() {
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
              سياسة الخصوصية
            </h1>
            <p className="text-muted-foreground">
              آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
            </p>
          </div>
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
                نحن في <strong className="text-foreground">رابِط</strong> نلتزم بحماية خصوصيتك وأمان بياناتك. 
                توضح هذه السياسة كيفية جمعنا واستخدامنا وحمايتنا للمعلومات الشخصية التي تقدمها عند استخدام منصتنا.
              </p>
              <p>
                باستخدامك لمنصة رابِط، فإنك توافق على جمع واستخدام المعلومات وفقاً لهذه السياسة. 
                إذا كنت لا توافق على أي جزء من هذه السياسة، يرجى عدم استخدام خدماتنا.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                المعلومات التي نجمعها
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <div>
                <h3 className="font-semibold text-foreground mb-2">1. معلومات الحساب:</h3>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>الاسم الكامل</li>
                  <li>البريد الإلكتروني</li>
                  <li>رقم الهاتف</li>
                  <li>اسم الشركة (للحسابات المؤسسية)</li>
                  <li>السجل التجاري والرقم الضريبي (للشركات)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">2. بيانات الموظفين:</h3>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>معلومات الموظفين (الأسماء، المسميات الوظيفية، الرواتب)</li>
                  <li>بيانات العقود والإجازات</li>
                  <li>السير الذاتية والمستندات المرفوعة</li>
                  <li>سجلات الحضور والغياب</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">3. معلومات الاستخدام:</h3>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>عنوان IP والموقع الجغرافي</li>
                  <li>نوع المتصفح والجهاز</li>
                  <li>الصفحات التي تزورها والميزات التي تستخدمها</li>
                  <li>تاريخ ووقت الدخول</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">4. معلومات الدفع:</h3>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>معلومات بطاقة الائتمان (مشفرة عبر بوابات دفع آمنة)</li>
                  <li>سجل المعاملات والفواتير</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-600" />
                كيف نستخدم معلوماتك
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>نستخدم المعلومات التي نجمعها للأغراض التالية:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong className="text-foreground">تقديم الخدمة:</strong> تشغيل وصيانة منصة رابِط وتوفير الميزات المطلوبة</li>
                <li><strong className="text-foreground">تحسين التجربة:</strong> تخصيص المحتوى والميزات حسب احتياجاتك</li>
                <li><strong className="text-foreground">الدعم الفني:</strong> الرد على استفساراتك وحل المشاكل التقنية</li>
                <li><strong className="text-foreground">الفواتير:</strong> معالجة المدفوعات وإصدار الفواتير</li>
                <li><strong className="text-foreground">التواصل:</strong> إرسال تحديثات الخدمة والإشعارات المهمة</li>
                <li><strong className="text-foreground">الأمان:</strong> كشف ومنع الاحتيال والأنشطة المشبوهة</li>
                <li><strong className="text-foreground">الامتثال القانوني:</strong> الالتزام بالقوانين واللوائح السعودية</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-red-600" />
                حماية البيانات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>نتخذ إجراءات أمنية صارمة لحماية بياناتك:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong className="text-foreground">التشفير:</strong> نستخدم تشفير SSL 256-bit لجميع البيانات المنقولة</li>
                <li><strong className="text-foreground">الخوادم الآمنة:</strong> البيانات مخزنة في خوادم آمنة داخل المملكة العربية السعودية</li>
                <li><strong className="text-foreground">النسخ الاحتياطي:</strong> نسخ احتياطي يومي تلقائي لجميع البيانات</li>
                <li><strong className="text-foreground">الصلاحيات:</strong> الوصول للبيانات محدود للموظفين المصرح لهم فقط</li>
                <li><strong className="text-foreground">المراقبة:</strong> مراقبة مستمرة للأنشطة المشبوهة</li>
                <li><strong className="text-foreground">التدقيق:</strong> مراجعات أمنية دورية من جهات خارجية</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-orange-600" />
                مشاركة البيانات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">نحن لا نبيع أو نؤجر بياناتك الشخصية لأي طرف ثالث.</strong> 
                قد نشارك معلوماتك في الحالات التالية فقط:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong className="text-foreground">مقدمو الخدمات:</strong> شركات معالجة الدفع، استضافة الخوادم، والدعم الفني (مع اتفاقيات سرية)</li>
                <li><strong className="text-foreground">الامتثال القانوني:</strong> عند الطلب من الجهات الحكومية أو القضائية</li>
                <li><strong className="text-foreground">حماية الحقوق:</strong> لحماية حقوقنا أو سلامة المستخدمين</li>
                <li><strong className="text-foreground">موافقتك:</strong> عند حصولنا على موافقتك الصريحة</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-teal-600" />
                حقوقك
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>لديك الحقوق التالية فيما يتعلق ببياناتك الشخصية:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong className="text-foreground">الوصول:</strong> طلب نسخة من بياناتك الشخصية</li>
                <li><strong className="text-foreground">التصحيح:</strong> تحديث أو تصحيح المعلومات غير الدقيقة</li>
                <li><strong className="text-foreground">الحذف:</strong> طلب حذف بياناتك (مع مراعاة الالتزامات القانونية)</li>
                <li><strong className="text-foreground">التقييد:</strong> طلب تقييد معالجة بياناتك</li>
                <li><strong className="text-foreground">النقل:</strong> الحصول على بياناتك بصيغة قابلة للنقل</li>
                <li><strong className="text-foreground">الاعتراض:</strong> الاعتراض على معالجة بياناتك في حالات معينة</li>
              </ul>
              <p className="mt-4">
                لممارسة أي من هذه الحقوق، يرجى التواصل معنا عبر: 
                <a href="mailto:info@rbithr.com" className="text-blue-600 hover:underline mr-1">info@rbithr.com</a>
              </p>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-pink-600" />
                ملفات تعريف الارتباط (Cookies)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                نستخدم ملفات تعريف الارتباط لتحسين تجربتك. يمكنك التحكم في الكوكيز من إعدادات المتصفح. 
                لمزيد من التفاصيل، راجع 
                <Link href="/cookies" className="text-blue-600 hover:underline mx-1">سياسة الكوكيز</Link>.
              </p>
            </CardContent>
          </Card>

          {/* Children Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-indigo-600" />
                خصوصية الأطفال
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                خدماتنا غير موجهة للأطفال دون سن 18 عاماً. لا نجمع معلومات شخصية من الأطفال عن قصد. 
                إذا اكتشفنا أننا جمعنا معلومات من طفل، سنحذفها فوراً.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-600" />
                التغييرات على السياسة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                قد نقوم بتحديث هذه السياسة من وقت لآخر. سنخطرك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار على المنصة. 
                يُنصح بمراجعة هذه الصفحة بشكل دوري للاطلاع على أي تحديثات.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
            <CardContent className="py-8 text-center">
              <Mail className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">هل لديك أسئلة؟</h2>
              <p className="text-lg mb-6 text-white/90">
                إذا كان لديك أي استفسار حول سياسة الخصوصية، تواصل معنا
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="mailto:info@rbithr.com">
                  <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                    info@rbithr.com
                  </Button>
                </a>
                <a href="tel:0570700355">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    0570700355
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
