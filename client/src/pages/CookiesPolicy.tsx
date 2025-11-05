import { BackButton } from "@/components/BackButton";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <BackButton />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">سياسة الكوكيز</h1>
          <p className="text-muted-foreground mb-8">
            آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
          </p>

          <Card className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">ما هي الكوكيز؟</h2>
              <p className="text-muted-foreground leading-relaxed">
                الكوكيز هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة
                موقعنا الإلكتروني. نستخدم الكوكيز لتحسين تجربتك وتقديم خدمات
                أفضل لك. تساعدنا الكوكيز على فهم كيفية استخدامك للموقع وتخصيص
                المحتوى بناءً على تفضيلاتك.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                أنواع الكوكيز التي نستخدمها
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    1. الكوكيز الضرورية
                  </h3>
                  <p className="text-muted-foreground">
                    هذه الكوكيز ضرورية لتشغيل الموقع بشكل صحيح. تتضمن:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground mr-4">
                    <li>كوكيز المصادقة وتسجيل الدخول</li>
                    <li>كوكيز الأمان والحماية</li>
                    <li>كوكيز الجلسة (Session Cookies)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    2. كوكيز الأداء والتحليل
                  </h3>
                  <p className="text-muted-foreground">
                    تساعدنا هذه الكوكيز على فهم كيفية تفاعل المستخدمين مع
                    الموقع:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground mr-4">
                    <li>عدد الزوار والصفحات المشاهدة</li>
                    <li>مدة الزيارة ومعدل الارتداد</li>
                    <li>مصادر الزيارات والإحالات</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    3. كوكيز الوظائف
                  </h3>
                  <p className="text-muted-foreground">
                    تُستخدم لتذكر تفضيلاتك وتحسين تجربتك:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground mr-4">
                    <li>اللغة المفضلة</li>
                    <li>إعدادات العرض</li>
                    <li>المحتوى المخصص</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    4. كوكيز التسويق (اختيارية)
                  </h3>
                  <p className="text-muted-foreground">
                    تُستخدم لعرض إعلانات ذات صلة بك:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground mr-4">
                    <li>تتبع سلوك التصفح</li>
                    <li>عرض إعلانات مخصصة</li>
                    <li>قياس فعالية الحملات التسويقية</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">كيفية إدارة الكوكيز</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                يمكنك التحكم في الكوكيز وحذفها من خلال إعدادات المتصفح الخاص بك.
                معظم المتصفحات تقبل الكوكيز تلقائياً، ولكن يمكنك تغيير إعدادات
                المتصفح لرفض الكوكيز أو تنبيهك عند إرسال كوكيز جديدة.
              </p>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">
                  إدارة الكوكيز في المتصفحات الشائعة:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground mr-4">
                  <li>
                    Google Chrome: الإعدادات → الخصوصية والأمان → ملفات تعريف
                    الارتباط
                  </li>
                  <li>Safari: التفضيلات → الخصوصية → إدارة بيانات الموقع</li>
                  <li>
                    Firefox: الخيارات → الخصوصية والأمان → ملفات تعريف الارتباط
                  </li>
                  <li>Edge: الإعدادات → ملفات تعريف الارتباط وأذونات الموقع</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">مدة تخزين الكوكيز</h2>
              <p className="text-muted-foreground leading-relaxed">
                تختلف مدة تخزين الكوكيز حسب نوعها:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground mr-4">
                <li>
                  <strong>كوكيز الجلسة:</strong> تُحذف تلقائياً عند إغلاق
                  المتصفح
                </li>
                <li>
                  <strong>الكوكيز الدائمة:</strong> تبقى لمدة محددة (من أيام إلى
                  سنوات)
                </li>
                <li>
                  <strong>كوكيز المصادقة:</strong> تبقى لمدة سنة واحدة أو حتى
                  تسجيل الخروج
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                الكوكيز من جهات خارجية
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                قد نستخدم خدمات من جهات خارجية موثوقة تضع كوكيز على جهازك، مثل:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground mr-4">
                <li>Google Analytics - لتحليل حركة المرور</li>
                <li>خدمات الدفع الإلكتروني - لمعالجة المدفوعات بشكل آمن</li>
                <li>منصات التواصل الاجتماعي - لمشاركة المحتوى</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">حقوقك</h2>
              <p className="text-muted-foreground leading-relaxed">
                لديك الحق في:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground mr-4">
                <li>معرفة أنواع الكوكيز المستخدمة</li>
                <li>قبول أو رفض الكوكيز غير الضرورية</li>
                <li>حذف الكوكيز المخزنة في أي وقت</li>
                <li>تغيير إعدادات الكوكيز في أي وقت</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                التوافق مع القوانين السعودية
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                نلتزم بالقوانين واللوائح السعودية المتعلقة بحماية البيانات
                والخصوصية، بما في ذلك:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground mr-4">
                <li>نظام حماية البيانات الشخصية السعودي</li>
                <li>لوائح هيئة الاتصالات وتقنية المعلومات</li>
                <li>سياسات الأمن السيبراني الوطنية</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">تحديثات السياسة</h2>
              <p className="text-muted-foreground leading-relaxed">
                قد نقوم بتحديث سياسة الكوكيز من وقت لآخر. سيتم نشر أي تغييرات
                على هذه الصفحة مع تحديث تاريخ "آخر تحديث" في الأعلى. ننصحك
                بمراجعة هذه السياسة بشكل دوري.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">تواصل معنا</h2>
              <p className="text-muted-foreground leading-relaxed">
                إذا كان لديك أي أسئلة حول سياسة الكوكيز، يمكنك التواصل معنا عبر:
              </p>
              <ul className="list-none mt-4 space-y-2 text-muted-foreground">
                <li>
                  <strong>البريد الإلكتروني:</strong> privacy@rabit.sa
                </li>
                <li>
                  <strong>الهاتف:</strong> 920000000
                </li>
                <li>
                  <strong>العنوان:</strong> الرياض، المملكة العربية السعودية
                </li>
              </ul>
            </section>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
