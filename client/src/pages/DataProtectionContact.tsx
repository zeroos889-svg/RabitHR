import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Mail,
  Phone,
  MapPin,
  Shield,
  Clock,
  FileText,
} from "lucide-react";
import { Link } from "wouter";
import { Footer } from "@/components/Footer";

/**
 * صفحة التواصل مع مسؤول حماية البيانات (DPO)
 * متطلب من PDPL - توفير قناة للشكاوى والاستفسارات
 */
export default function DataProtectionContact() {
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
              التواصل مع مسؤول حماية البيانات
            </h1>
            <p className="text-muted-foreground">
              نحن هنا للإجابة على استفساراتك وحل مشاكلك المتعلقة بخصوصية
              البيانات
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                معلومات التواصل
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">البريد الإلكتروني</h4>
                    <a
                      href="mailto:dpo@rabit.sa"
                      className="text-blue-600 hover:underline"
                    >
                      dpo@rabit.sa
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      الطريقة المفضلة للتواصل
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <Clock className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">وقت الرد</h4>
                    <p className="text-foreground">خلال 30 يوم عمل</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      حسب متطلبات PDPL
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">العنوان</h4>
                    <p className="text-foreground">المملكة العربية السعودية</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      [يُضاف العنوان التفصيلي لاحقاً]
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <Phone className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">الهاتف</h4>
                    <p className="text-foreground">[يُضاف لاحقاً]</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      ساعات العمل الرسمية
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What can we help with */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                كيف يمكننا مساعدتك؟
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  يمكنك التواصل معنا بخصوص:
                </p>
                <ul className="list-disc list-inside space-y-2 mr-4 text-muted-foreground">
                  <li>الاستفسارات حول كيفية معالجة بياناتك</li>
                  <li>ممارسة حقوقك (الوصول، التصحيح، الحذف، الاعتراض)</li>
                  <li>الشكاوى المتعلقة بخصوصية البيانات</li>
                  <li>طلبات سحب الموافقة</li>
                  <li>الإبلاغ عن مخاوف أمنية</li>
                  <li>أي استفسار آخر يتعلق بحماية بياناتك الشخصية</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                <Link href="/my-data">
                  <Button className="w-full" variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    إدارة بياناتي
                  </Button>
                </Link>
                <Link href="/privacy-policy">
                  <Button className="w-full" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    سياسة الخصوصية
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* SDAIA Contact */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">التواصل مع سدايا</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-blue-900">
              <p className="text-sm">
                إذا لم تكن راضياً عن ردنا، يمكنك تقديم شكوى مباشرة إلى:
              </p>
              <div className="bg-white p-4 rounded-lg space-y-2">
                <p className="font-semibold">
                  الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا)
                </p>
                <p className="text-sm">
                  الموقع:{" "}
                  <a
                    href="https://sdaia.gov.sa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    sdaia.gov.sa
                  </a>
                </p>
                <p className="text-sm">
                  البريد:{" "}
                  <a
                    href="mailto:info@sdaia.gov.sa"
                    className="text-blue-600 hover:underline"
                  >
                    info@sdaia.gov.sa
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Response Time */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm text-green-900">
                  <p className="font-semibold">التزامنا بالرد:</p>
                  <p>
                    نلتزم بالرد على جميع الاستفسارات والطلبات خلال{" "}
                    <strong>30 يوم عمل</strong> كحد أقصى، وفقاً لمتطلبات نظام
                    حماية البيانات الشخصية السعودي.
                  </p>
                  <p>
                    في الحالات العاجلة أو المعقدة، قد نحتاج إلى تمديد المدة بحد
                    أقصى 30 يوماً إضافياً، وسنخطرك بذلك مسبقاً.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
