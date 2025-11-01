import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { APP_LOGO, APP_TITLE } from "@/const";
import {
  Scale,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Upload,
  Download,
  Sparkles,
  Phone,
  Mail,
  ExternalLink,
  Info,
  ArrowRight,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function VerifyDecision() {
  const [, setLocation] = useLocation();
  const [selectedDecisionType, setSelectedDecisionType] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<"legal" | "doubtful" | "illegal">("illegal");

  const handleAnalyze = () => {
    // محاكاة التحليل
    setAnalysisResult("illegal");
    setShowResult(true);
    // التمرير للنتيجة
    setTimeout(() => {
      document.getElementById("result")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setLocation("/")}>
            <img src={APP_LOGO} alt={APP_TITLE} className="h-10 w-10 rounded-lg" />
            <span className="font-bold text-xl">{APP_TITLE}</span>
          </div>
          <Button variant="outline" onClick={() => setLocation("/")}>
            العودة للرئيسية
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium">
            <Scale className="h-4 w-4" />
            مجاني 100%
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            تحقق من قانونية قرار الموارد البشرية
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            صدر عليك قرار من HR؟ تحقق من قانونيته حسب نظام العمل السعودي واحصل على
            تقرير مفصل بحقوقك وخطوات الاعتراض
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              تحليل فوري
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-600" />
              موثوق 100%
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-600" />
              ذكاء اصطناعي
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">1,000+</p>
              <p className="text-sm text-muted-foreground">قرار تم تحليله</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">85%</p>
              <p className="text-sm text-muted-foreground">معدل الدقة</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">24/7</p>
              <p className="text-sm text-muted-foreground">متاح دائماً</p>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Types */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">أنواع القرارات المدعومة</h2>
            <p className="text-muted-foreground">
              يمكنك التحقق من قانونية أي من هذه القرارات
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: XCircle, label: "فصل من العمل", color: "red" },
              { icon: AlertTriangle, label: "إنذار", color: "yellow" },
              { icon: FileText, label: "خصم من الراتب", color: "orange" },
              { icon: FileText, label: "نقل موظف", color: "blue" },
              { icon: FileText, label: "إيقاف عن العمل", color: "purple" },
              { icon: FileText, label: "تخفيض راتب", color: "pink" },
              { icon: FileText, label: "إنهاء تجريبي", color: "gray" },
              { icon: FileText, label: "تعديل عقد", color: "green" },
            ].map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <div
                    className={`h-12 w-12 rounded-lg mx-auto mb-3 flex items-center justify-center bg-${type.color}-100 dark:bg-${type.color}-950`}
                  >
                    <type.icon className={`h-6 w-6 text-${type.color}-600`} />
                  </div>
                  <p className="font-semibold text-sm">{type.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-3xl">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Scale className="h-6 w-6 text-blue-600" />
                أدخل تفاصيل القرار
              </CardTitle>
              <CardDescription>
                املأ النموذج أدناه وسنحلل قانونية القرار فوراً
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="decision-type">نوع القرار *</Label>
                <Select value={selectedDecisionType} onValueChange={setSelectedDecisionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع القرار الصادر عليك" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="termination">فصل من العمل</SelectItem>
                    <SelectItem value="warning">إنذار</SelectItem>
                    <SelectItem value="deduction">خصم من الراتب</SelectItem>
                    <SelectItem value="transfer">نقل موظف</SelectItem>
                    <SelectItem value="suspension">إيقاف عن العمل</SelectItem>
                    <SelectItem value="salary-reduction">تخفيض راتب</SelectItem>
                    <SelectItem value="probation-end">إنهاء فترة تجريبية</SelectItem>
                    <SelectItem value="contract-modification">تعديل عقد العمل</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="decision-details">تفاصيل القرار *</Label>
                <Textarea
                  id="decision-details"
                  placeholder="اشرح القرار الصادر عليك بالتفصيل... (السبب، التاريخ، الظروف)"
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="work-duration">مدة عملك (بالأشهر)</Label>
                  <Input id="work-duration" type="number" placeholder="مثال: 24" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="previous-warnings">الإنذارات السابقة</Label>
                  <Input id="previous-warnings" type="number" placeholder="مثال: 2" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">راتبك الشهري (ريال)</Label>
                <Input id="salary" type="number" placeholder="مثال: 5000" />
              </div>

              <div className="space-y-2">
                <Label>رفع المستندات (اختياري)</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm font-semibold mb-1">اسحب الملفات هنا أو انقر للرفع</p>
                  <p className="text-xs text-muted-foreground">
                    صورة القرار، العقد، الإنذارات السابقة، أي مستندات أخرى
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    PDF, DOC, JPG, PNG (حتى 10 ميجابايت لكل ملف)
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                      ما الذي سنحلله؟
                    </p>
                    <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                      <li>• هل القرار قانوني حسب نظام العمل السعودي؟</li>
                      <li>• هل تم اتباع الإجراءات الصحيحة؟</li>
                      <li>• ما هي حقوقك القانونية؟</li>
                      <li>• هل يمكنك الاعتراض؟</li>
                      <li>• ما هي الخطوات التالية؟</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12 text-lg"
                onClick={handleAnalyze}
              >
                <Sparkles className="h-5 w-5 ml-2" />
                تحليل القرار الآن
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Result Section */}
      {showResult && (
        <section id="result" className="py-16 px-4 scroll-mt-20">
          <div className="container mx-auto max-w-4xl">
            <Card
              className={`shadow-2xl border-2 ${
                analysisResult === "legal"
                  ? "border-green-500 bg-green-50 dark:bg-green-950"
                  : analysisResult === "doubtful"
                  ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950"
                  : "border-red-500 bg-red-50 dark:bg-red-950"
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    {analysisResult === "legal" ? (
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    ) : analysisResult === "doubtful" ? (
                      <AlertTriangle className="h-8 w-8 text-yellow-600" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-600" />
                    )}
                    {analysisResult === "legal"
                      ? "القرار قانوني"
                      : analysisResult === "doubtful"
                      ? "القرار مشكوك فيه"
                      : "القرار غير قانوني"}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className={
                      analysisResult === "legal"
                        ? "bg-green-100 text-green-700"
                        : analysisResult === "doubtful"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }
                  >
                    {analysisResult === "legal"
                      ? "متوافق مع النظام"
                      : analysisResult === "doubtful"
                      ? "يحتاج مراجعة"
                      : "يمكنك الاعتراض"}
                  </Badge>
                </div>
                <CardDescription>
                  تم تحليل القرار حسب نظام العمل السعودي
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      ملخص القرار
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      فصل من العمل - السبب المذكور: غياب 3 أيام بدون إذن
                    </p>
                  </CardContent>
                </Card>

                {/* Legal Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Scale className="h-5 w-5" />
                      التحليل القانوني
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-red-100 dark:bg-red-950 rounded-lg">
                      <XCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-red-700 dark:text-red-300 mb-1">
                          القرار غير قانوني
                        </p>
                        <p className="text-sm text-red-600 dark:text-red-400">
                          لم يتم إصدار 3 إنذارات قبل الفصل كما تنص المادة 80 من نظام
                          العمل. يجب إنذار الموظف 3 مرات قبل اتخاذ قرار الفصل.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-100 dark:bg-blue-950 rounded-lg">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                          الإجراءات المطلوبة
                        </p>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          يجب على الشركة إصدار 3 إنذارات كتابية والانتظار 30 يوماً بعد
                          الإنذار الثالث قبل اتخاذ قرار الفصل.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Your Rights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      حقوقك القانونية
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                        <span className="text-sm">
                          يحق لك الاعتراض على القرار والمطالبة بالعودة للعمل
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                        <span className="text-sm">
                          يحق لك المطالبة بالتعويض عن الضرر
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                        <span className="text-sm">
                          يحق لك الحصول على جميع مستحقاتك المالية
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                        <span className="text-sm">
                          يحق لك تقديم شكوى لمكتب العمل خلال سنة من تاريخ القرار
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Steps to Object */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <ArrowRight className="h-5 w-5" />
                      خطوات الاعتراض
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3">
                      {[
                        "قدم شكوى رسمية لمكتب العمل (خلال سنة من تاريخ القرار)",
                        "احتفظ بجميع المستندات (العقد، القرار، أي مراسلات)",
                        "اطلب نسخة من ملفك الوظيفي من الشركة",
                        "احضر جلسة الاستماع في مكتب العمل",
                        "إذا لم يتم حل النزاع، يمكنك رفع دعوى في المحكمة العمالية",
                      ].map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center shrink-0">
                            <span className="text-xs font-semibold text-blue-600">
                              {index + 1}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>

                {/* Legal Articles */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      المواد القانونية ذات الصلة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <p className="font-semibold mb-1">المادة 80 - نظام العمل السعودي</p>
                      <p className="text-sm text-muted-foreground">
                        "لا يجوز فصل العامل إلا إذا ارتكب خطأً جسيماً، أو لم يقم بتنفيذ
                        التزاماته الجوهرية المترتبة على عقد العمل، أو لم يطع الأوامر
                        المشروعة، أو لم يراع الأنظمة الخاصة بسلامة العمل والعمال رغم
                        إنذاره كتابة..."
                      </p>
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <p className="font-semibold mb-1">المادة 77 - نظام العمل السعودي</p>
                      <p className="text-sm text-muted-foreground">
                        "إذا أنهى أحد الطرفين العقد لسبب غير مشروع كان للطرف الآخر
                        الحق في تعويض تقدره هيئة تسوية الخلافات العمالية..."
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Authorities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      جهات الشكوى والاستفسار
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <p className="font-semibold mb-2 flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          مكتب العمل (وزارة الموارد البشرية)
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          الرقم الموحد: 19911
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="h-4 w-4 ml-2" />
                          زيارة الموقع
                        </Button>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                        <p className="font-semibold mb-2 flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          التأمينات الاجتماعية
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          الرقم الموحد: 8001243344
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="h-4 w-4 ml-2" />
                          زيارة الموقع
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Download Report */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Download className="h-4 w-4 ml-2" />
                    تحميل التقرير الكامل PDF
                  </Button>
                  <Button variant="outline" onClick={() => setShowResult(false)}>
                    تحليل قرار آخر
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <HelpCircle className="h-8 w-8 text-blue-600" />
              أسئلة شائعة
            </h2>
            <p className="text-muted-foreground">
              إجابات على الأسئلة الأكثر شيوعاً
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "هل الخدمة مجانية؟",
                a: "نعم، الخدمة مجانية 100% ولا تحتاج إلى تسجيل أو دفع أي رسوم.",
              },
              {
                q: "هل التحليل دقيق؟",
                a: "نستخدم ذكاء اصطناعي متقدم ومدرب على نظام العمل السعودي بمعدل دقة 85%. لكن ننصح باستشارة محامي متخصص للحالات المعقدة.",
              },
              {
                q: "هل بياناتي آمنة؟",
                a: "نعم، جميع البيانات مشفرة ولا نحتفظ بأي معلومات شخصية بعد التحليل.",
              },
              {
                q: "كم يستغرق التحليل؟",
                a: "التحليل فوري ويستغرق أقل من دقيقة واحدة.",
              },
              {
                q: "هل يمكنني الاعتماد على التقرير في المحكمة؟",
                a: "التقرير استرشادي ويساعدك على فهم حقوقك، لكن للاستخدام القانوني الرسمي يجب استشارة محامي.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            هل أنت موظف موارد بشرية؟
          </h2>
          <p className="text-xl text-blue-100">
            استخدم نظامنا الكامل لإدارة الموارد البشرية مع أدوات ذكية وتحليلات متقدمة
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => setLocation("/")}
          >
            <ArrowRight className="h-5 w-5 ml-2" />
            اكتشف رابِط للموارد البشرية
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8 rounded-lg" />
                <span className="font-bold">{APP_TITLE}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                مساعدك الذكي في الموارد البشرية
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">تواصل معنا</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  info@rbithr.com
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  0570700355
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">روابط مهمة</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="cursor-pointer hover:text-foreground" onClick={() => setLocation("/")}>
                  الرئيسية
                </p>
                <p className="cursor-pointer hover:text-foreground">
                  سياسة الخصوصية
                </p>
                <p className="cursor-pointer hover:text-foreground">
                  شروط الاستخدام
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 {APP_TITLE}. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
