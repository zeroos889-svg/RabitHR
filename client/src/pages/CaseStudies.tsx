import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Building2,
  Target,
  Zap,
  Award,
} from "lucide-react";
import { Link } from "wouter";
import { Footer } from "@/components/Footer";

// Case Studies Data
const caseStudies = [
  {
    id: 1,
    company: "شركة النخيل للتجارة",
    industry: "التجزئة",
    size: "150 موظف",
    logo: Building2,
    color: "from-blue-500 to-indigo-600",
    challenge:
      "كانت الشركة تواجه صعوبة في إدارة 150 موظف موزعين على 8 فروع. كانت عملية حساب نهاية الخدمة والإجازات تستغرق أياماً وتحتوي على أخطاء متكررة.",
    solution:
      "تم تطبيق رابِط بالكامل مع تدريب فريق HR على استخدام جميع الأدوات الذكية. تم ربط النظام بقاعدة بيانات الموظفين الحالية.",
    results: [
      {
        metric: "توفير الوقت",
        value: "75%",
        description: "تقليل وقت المعاملات من 3 أيام إلى 6 ساعات",
      },
      {
        metric: "دقة الحسابات",
        value: "99.9%",
        description: "القضاء على الأخطاء البشرية في الحسابات",
      },
      {
        metric: "رضا الموظفين",
        value: "95%",
        description: "تحسين رضا الموظفين عن خدمات HR",
      },
      {
        metric: "توفير التكاليف",
        value: "40%",
        description: "تقليل تكاليف التشغيل السنوية",
      },
    ],
    testimonial: {
      quote:
        "رابِط غيّر طريقة عملنا بالكامل. الآن نستطيع التركيز على التطوير بدلاً من الأعمال الروتينية.",
      author: "أحمد القحطاني",
      position: "مدير الموارد البشرية",
    },
    featured: true,
  },
  {
    id: 2,
    company: "مجموعة الريادة للتقنية",
    industry: "التقنية",
    size: "80 موظف",
    logo: Building2,
    color: "from-green-500 to-emerald-600",
    challenge:
      "شركة ناشئة سريعة النمو تحتاج لنظام توظيف فعال. كانت تستقبل 200+ طلب توظيف شهرياً وتواجه صعوبة في الفرز والمتابعة.",
    solution:
      "تم تطبيق نظام ATS من رابِط مع تخصيص مراحل التوظيف حسب احتياجات الشركة. تم دمج الذكاء الاصطناعي لفرز السير الذاتية.",
    results: [
      {
        metric: "سرعة التوظيف",
        value: "60%",
        description: "تقليل وقت التوظيف من 45 يوم إلى 18 يوم",
      },
      {
        metric: "جودة المرشحين",
        value: "85%",
        description: "زيادة نسبة المرشحين المؤهلين",
      },
      {
        metric: "توفير الوقت",
        value: "70%",
        description: "تقليل وقت فرز السير الذاتية",
      },
      {
        metric: "تحسين التجربة",
        value: "92%",
        description: "رضا المرشحين عن عملية التوظيف",
      },
    ],
    testimonial: {
      quote:
        "نظام ATS من رابِط ساعدنا في بناء فريق قوي بسرعة. الذكاء الاصطناعي وفر علينا ساعات من العمل اليدوي.",
      author: "محمد الغامدي",
      position: "مدير عام",
    },
    featured: true,
  },
  {
    id: 3,
    company: "مؤسسة الأفق للاستشارات",
    industry: "الاستشارات",
    size: "مستقلة HR - 15 عميل",
    logo: Building2,
    color: "from-purple-500 to-pink-600",
    challenge:
      "مستقلة HR تخدم 15 عميل وتواجه صعوبة في إدارة متطلبات متعددة وإصدار خطابات مخصصة لكل عميل بسرعة.",
    solution:
      "استخدام باقة مستقل HR مع مولد الخطابات الذكي وحفظ قوالب مخصصة لكل عميل. تم إنشاء مساحات عمل منفصلة لكل عميل.",
    results: [
      {
        metric: "زيادة العملاء",
        value: "150%",
        description: "من 6 عملاء إلى 15 عميل في 6 أشهر",
      },
      {
        metric: "سرعة الإنجاز",
        value: "80%",
        description: "تقليل وقت إصدار الخطابات من ساعة إلى 10 دقائق",
      },
      {
        metric: "زيادة الدخل",
        value: "200%",
        description: "مضاعفة الدخل الشهري",
      },
      {
        metric: "رضا العملاء",
        value: "98%",
        description: "تقييم ممتاز من جميع العملاء",
      },
    ],
    testimonial: {
      quote:
        "رابِط سمح لي بمضاعفة عدد عملائي دون الحاجة لتوظيف مساعدين. الأدوات الذكية توفر وقتي للتركيز على الاستشارات.",
      author: "سارة العتيبي",
      position: "مستشارة موارد بشرية",
    },
    featured: true,
  },
];

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1 text-center">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              قصص النجاح
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              اكتشف كيف ساعد رابِط الشركات السعودية في تحويل إدارة الموارد
              البشرية
            </p>
          </div>
        </div>

        {/* Case Studies */}
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <Card
              key={study.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${study.color} text-white p-8`}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                      <study.logo className="h-8 w-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-2">
                        {study.company}
                      </h2>
                      <div className="flex gap-3 flex-wrap">
                        <Badge
                          variant="secondary"
                          className="bg-white/20 text-white border-0"
                        >
                          {study.industry}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-white/20 text-white border-0"
                        >
                          <Users className="h-3 w-3 ml-1" />
                          {study.size}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {study.featured && (
                    <Badge className="bg-yellow-400 text-yellow-900 border-0">
                      <Award className="h-3 w-3 ml-1" />
                      قصة مميزة
                    </Badge>
                  )}
                </div>
              </div>

              <CardContent className="p-8 space-y-8">
                {/* Challenge */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <Target className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold">التحدي</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mr-12">
                    {study.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold">الحل</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mr-12">
                    {study.solution}
                  </p>
                </div>

                {/* Results */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold">النتائج</h3>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mr-12">
                    {study.results.map((result, idx) => (
                      <Card
                        key={idx}
                        className="bg-gradient-to-br from-gray-50 to-gray-100 border-0"
                      >
                        <CardContent className="pt-6 text-center">
                          <div
                            className={`text-4xl font-bold mb-2 bg-gradient-to-r ${study.color} bg-clip-text text-transparent`}
                          >
                            {result.value}
                          </div>
                          <div className="font-semibold mb-2">
                            {result.metric}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {result.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div
                  className={`bg-gradient-to-r ${study.color} rounded-lg p-6 text-white`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-6xl opacity-50">"</div>
                    <div className="flex-1">
                      <p className="text-lg leading-relaxed mb-4 italic">
                        {study.testimonial.quote}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center font-bold text-xl">
                          {study.testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold">
                            {study.testimonial.author}
                          </div>
                          <div className="text-sm text-white/80">
                            {study.testimonial.position}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
          <CardContent className="py-12 text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              هل أنت مستعد لتكون قصة النجاح القادمة؟
            </h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              انضم إلى مئات الشركات السعودية التي حولت إدارة الموارد البشرية مع
              رابِط
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/pricing">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100 gap-2"
                >
                  ابدأ تجربتك المجانية
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  تحدث مع خبير
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="h-8 w-8 mx-auto mb-3 text-blue-600" />
              <div className="text-3xl font-bold text-blue-600 mb-2">70%+</div>
              <p className="text-sm text-muted-foreground">متوسط توفير الوقت</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="h-8 w-8 mx-auto mb-3 text-green-600" />
              <div className="text-3xl font-bold text-green-600 mb-2">99%+</div>
              <p className="text-sm text-muted-foreground">دقة الحسابات</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 mx-auto mb-3 text-purple-600" />
              <div className="text-3xl font-bold text-purple-600 mb-2">
                95%+
              </div>
              <p className="text-sm text-muted-foreground">رضا المستخدمين</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 mx-auto mb-3 text-orange-600" />
              <div className="text-3xl font-bold text-orange-600 mb-2">
                40%+
              </div>
              <p className="text-sm text-muted-foreground">توفير التكاليف</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
