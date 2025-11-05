import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APP_LOGO, APP_TITLE } from "@/const";
import {
  Award,
  Scale,
  FileText,
  Users,
  Briefcase,
  Ticket,
  CheckSquare,
  BarChart3,
  Sparkles,
  Clock,
  Shield,
  Zap,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Star,
  Target,
  Lightbulb,
  MessageSquare,
  Bell,
  BookOpen,
  Calculator,
  Mail,
  Phone,
} from "lucide-react";
import { useLocation } from "wouter";

export default function Services() {
  const [, setLocation] = useLocation();

  const services = [
    {
      category: "الأدوات الذكية",
      icon: Sparkles,
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      items: [
        {
          icon: Award,
          title: "نظام إصدار الشهادات الآلي",
          description: "أصدر شهادات الراتب والخبرة والتعريف في أقل من 30 ثانية",
          features: [
            "4 أنواع شهادات جاهزة",
            "إصدار فوري بضغطة زر",
            "تخصيص كامل للنماذج",
            "رفع شعار الشركة",
            "معاينة قبل التحميل",
            "تحميل PDF مباشرة",
          ],
          benefits: [
            "توفير 3-4 ساعات يومياً",
            "تقليل الأخطاء البشرية",
            "مظهر احترافي موحد",
          ],
          example:
            "موظف HR كان يستغرق 15 دقيقة لكتابة شهادة راتب واحدة، الآن يصدرها في 30 ثانية!",
          path: "/dashboard/certificates",
        },
        {
          icon: Scale,
          title: "نظام التحقق القانوني",
          description:
            "تحقق من قانونية أي قرار HR قبل إصداره لتجنب المشاكل القانونية",
          features: [
            "تحليل ذكي بالـ AI",
            "7 أنواع قرارات",
            "مؤشر أمان (أخضر/أصفر/أحمر)",
            "تقرير مفصل بالمخاطر",
            "المواد القانونية ذات الصلة",
            "توصيات واضحة",
          ],
          benefits: [
            "حماية الشركة قانونياً",
            "تجنب التعويضات",
            "راحة بال كاملة",
          ],
          example:
            "شركة كانت ستفصل موظف بدون 3 إنذارات، النظام حذرها وأنقذها من قضية قانونية!",
          path: "/dashboard/legal-check",
        },
        {
          icon: FileText,
          title: "مكتبة القوالب الجاهزة",
          description: "مئات القوالب الجاهزة للرسائل والعقود والنماذج",
          features: [
            "قوالب رسائل (عروض عمل، رفض)",
            "قوالب عقود",
            "قوالب نماذج",
            "محرر قوالب مرن",
            "حفظ قوالب مخصصة",
          ],
          benefits: [
            "توفير ساعات من الكتابة",
            "صياغة احترافية",
            "توحيد المراسلات",
          ],
          example:
            "بدلاً من كتابة عرض عمل من الصفر، اختر قالب جاهز وعدّل عليه في دقيقتين!",
          path: "/dashboard/templates",
          comingSoon: true,
        },
        {
          icon: MessageSquare,
          title: "مساعد AI للرد على الاستفسارات",
          description: "شات بوت ذكي يجيب على 80% من أسئلة الموظفين المتكررة",
          features: [
            "ردود تلقائية فورية",
            "قاعدة معرفية ذكية",
            "دعم عربي/إنجليزي",
            "تحويل للتذاكر عند الحاجة",
            "تحليل الأسئلة الشائعة",
          ],
          benefits: ["تقليل عبء الاستفسارات", "توفير وقت HR", "رضا الموظفين"],
          example:
            "بدلاً من الرد على 50 سؤال يومياً عن رصيد الإجازات، المساعد يجيب تلقائياً!",
          path: "/dashboard/ai-assistant",
          comingSoon: true,
        },
      ],
    },
    {
      category: "إدارة الموظفين",
      icon: Users,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      items: [
        {
          icon: Users,
          title: "إدارة الموظفين",
          description: "نظام شامل لإدارة بيانات وملفات جميع الموظفين",
          features: [
            "ملفات موظفين كاملة",
            "تتبع العقود والتأشيرات",
            "إدارة المستندات",
            "سجل التاريخ الوظيفي",
            "بحث وفلترة متقدمة",
          ],
          benefits: ["مركزية البيانات", "سهولة الوصول", "تنظيم احترافي"],
          example:
            "جميع بيانات 500 موظف في مكان واحد، ابحث عن أي موظف في ثوانٍ!",
          path: "/dashboard/employees",
        },
        {
          icon: Briefcase,
          title: "نظام التوظيف ATS",
          description: "نظام تتبع المتقدمين من الإعلان حتى التعيين",
          features: [
            "إدارة الوظائف المفتوحة",
            "تتبع المتقدمين",
            "مراحل التوظيف",
            "جدولة المقابلات",
            "تقييم المرشحين",
          ],
          benefits: [
            "تنظيم عملية التوظيف",
            "تسريع التعيين",
            "تحسين جودة التوظيف",
          ],
          example:
            "تتبع 100 متقدم لـ 5 وظائف، مع مراحل واضحة من التقديم حتى التعيين!",
          path: "/dashboard/ats",
        },
        {
          icon: CheckSquare,
          title: "نظام المهام",
          description: "تنظيم وتتبع جميع مهام فريق HR",
          features: [
            "إنشاء وتعيين المهام",
            "تحديد المواعيد النهائية",
            "تتبع التقدم",
            "حالات المهام",
            "إشعارات تلقائية",
          ],
          benefits: ["عدم نسيان أي مهمة", "تنظيم العمل", "زيادة الإنتاجية"],
          example: "تذكير تلقائي بتجديد عقد موظف قبل انتهائه بشهر!",
          path: "/dashboard/tasks",
        },
      ],
    },
    {
      category: "التواصل والدعم",
      icon: Ticket,
      color: "pink",
      gradient: "from-pink-500 to-rose-500",
      items: [
        {
          icon: Ticket,
          title: "نظام التذاكر",
          description: "استقبال وإدارة جميع طلبات واستفسارات الموظفين",
          features: [
            "قنوات متعددة (بريد، واتساب، نموذج)",
            "تصنيف تلقائي بالـ AI",
            "حالات وأولويات",
            "نظام التعليقات",
            "تعيين للموظفين",
          ],
          benefits: ["مركزية الطلبات", "سرعة الاستجابة", "تتبع الأداء"],
          example:
            "جميع طلبات الموظفين من كل القنوات في مكان واحد، لا يضيع أي طلب!",
          path: "/dashboard/tickets",
        },
        {
          icon: Bell,
          title: "نظام التنبيهات",
          description: "تذكيرات تلقائية لجميع المواعيد المهمة",
          features: [
            "تذكيرات تجديد العقود",
            "تذكيرات انتهاء التأشيرات",
            "تذكيرات التأمين الطبي",
            "تذكيرات أعياد الميلاد",
            "تقويم HR شامل",
          ],
          benefits: ["عدم تفويت أي موعد", "تخطيط مسبق", "احترافية عالية"],
          example: "تنبيه تلقائي قبل 30 يوم من انتهاء تأشيرة موظف!",
          path: "/dashboard/reminders",
          comingSoon: true,
        },
      ],
    },
    {
      category: "التقارير والتحليلات",
      icon: BarChart3,
      color: "green",
      gradient: "from-green-500 to-emerald-500",
      items: [
        {
          icon: BarChart3,
          title: "التقارير الشاملة",
          description: "تقارير مفصلة عن جميع جوانب الموارد البشرية",
          features: [
            "5 أنواع تقارير",
            "رسوم بيانية تفاعلية",
            "فلترة حسب الفترة",
            "تصدير PDF/Excel/CSV",
            "إحصائيات شاملة",
          ],
          benefits: [
            "رؤية واضحة للأداء",
            "اتخاذ قرارات مبنية على بيانات",
            "تقديم تقارير للإدارة",
          ],
          example:
            "تقرير شامل عن الموظفين والرواتب والإجازات جاهز في دقيقة واحدة!",
          path: "/dashboard/reports",
        },
        {
          icon: Target,
          title: "لوحة التحكم",
          description: "نظرة شاملة على جميع مؤشرات الأداء الرئيسية",
          features: [
            "إحصائيات فورية",
            "مؤشرات الأداء KPIs",
            "رسوم بيانية",
            "تنبيهات ذكية",
            "تحديث لحظي",
          ],
          benefits: [
            "نظرة سريعة على كل شيء",
            "اكتشاف المشاكل مبكراً",
            "متابعة الأداء",
          ],
          example:
            "اعرف عدد الموظفين، التذاكر المفتوحة، المهام المتأخرة في لمحة واحدة!",
          path: "/dashboard",
        },
      ],
    },
  ];

  const additionalTools = [
    {
      icon: Calculator,
      title: "حاسبة نهاية الخدمة",
      description: "احسب مستحقات نهاية الخدمة حسب نظام العمل السعودي",
    },
    {
      icon: Calculator,
      title: "حاسبة الإجازات",
      description: "احسب رصيد الإجازات السنوية والمستحقة",
    },
    {
      icon: Calculator,
      title: "حاسبة الراتب",
      description: "احسب الراتب الصافي بعد الخصومات والبدلات",
    },
    {
      icon: FileText,
      title: "مولد أرقام الموظفين",
      description: "أنشئ أرقام موظفين فريدة تلقائياً",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setLocation("/")}
          >
            <img
              src={APP_LOGO}
              alt={APP_TITLE}
              className="h-10 w-10 rounded-lg"
            />
            <span className="font-bold text-xl">{APP_TITLE}</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => setLocation("/")}>
              الرئيسية
            </Button>
            <Button variant="ghost" onClick={() => setLocation("/pricing")}>
              الباقات
            </Button>
            <Button onClick={() => setLocation("/dashboard")}>
              تجربة مجانية
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            خدمات متكاملة
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            خدمات رابِط الذكية
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            مجموعة شاملة من الأدوات والخدمات الذكية التي تساعد موظفي الموارد
            البشرية على إنجاز مهامهم اليومية بسرعة وكفاءة عالية
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="font-semibold">10+ خدمة ذكية</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              <span className="font-semibold">توفير 70% من الوقت</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">متوافق 100% مع نظام العمل</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services by Category */}
      {services.map((category, categoryIndex) => (
        <section
          key={categoryIndex}
          className={`py-16 px-4 ${
            categoryIndex % 2 === 1
              ? "bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
              : ""
          }`}
        >
          <div className="container mx-auto max-w-7xl">
            {/* Category Header */}
            <div className="text-center mb-12">
              <div
                className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${category.gradient} text-white mb-4`}
              >
                <category.icon className="h-6 w-6" />
                <span className="font-bold text-lg">{category.category}</span>
              </div>
              <p className="text-muted-foreground">
                {category.items.length} خدمة متكاملة
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {category.items.map((service, serviceIndex) => (
                <Card
                  key={serviceIndex}
                  className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  {service.comingSoon && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-yellow-500 text-white">قريباً</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div
                        className={`h-14 w-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${category.gradient} shrink-0`}
                      >
                        <service.icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {service.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Features */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        الميزات الرئيسية
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        الفوائد
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.benefits.map((benefit, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Example */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-blue-700 dark:text-blue-300">
                        <Lightbulb className="h-4 w-4" />
                        مثال واقعي
                      </h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        {service.example}
                      </p>
                    </div>

                    {/* CTA */}
                    <Button
                      className={`w-full bg-gradient-to-r ${category.gradient} hover:opacity-90`}
                      onClick={() =>
                        !service.comingSoon && setLocation(service.path)
                      }
                      disabled={service.comingSoon}
                    >
                      {service.comingSoon ? (
                        <>
                          <Clock className="h-4 w-4 ml-2" />
                          قريباً
                        </>
                      ) : (
                        <>
                          <ArrowRight className="h-4 w-4 ml-2" />
                          جرب الآن
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Additional Tools */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              أدوات إضافية مساعدة
            </h2>
            <p className="text-xl text-purple-100">
              حاسبات وأدوات سريعة لإنجاز المهام اليومية
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {additionalTools.map((tool, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors"
              >
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 rounded-lg mx-auto mb-3 flex items-center justify-center bg-white/20">
                    <tool.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-purple-100">{tool.description}</p>
                  <Badge className="mt-3 bg-yellow-500 text-white">
                    قريباً
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">70%</div>
              <p className="text-muted-foreground">توفير في الوقت</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">10+</div>
              <p className="text-muted-foreground">خدمة ذكية</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                100%
              </div>
              <p className="text-muted-foreground">متوافق مع النظام</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">24/7</div>
              <p className="text-muted-foreground">متاح دائماً</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">جاهز لتجربة رابِط؟</h2>
          <p className="text-xl text-blue-100">
            ابدأ الآن واكتشف كيف يمكن لرابِط أن يوفر 70% من وقتك اليومي
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 h-12 px-8 text-lg"
              onClick={() => setLocation("/dashboard")}
            >
              <Sparkles className="h-5 w-5 ml-2" />
              ابدأ تجربة مجانية
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 h-12 px-8 text-lg"
              onClick={() => setLocation("/pricing")}
            >
              <ArrowRight className="h-5 w-5 ml-2" />
              اطلع على الباقات
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={APP_LOGO}
                  alt={APP_TITLE}
                  className="h-8 w-8 rounded-lg"
                />
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
              <h3 className="font-semibold mb-4">روابط سريعة</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p
                  className="cursor-pointer hover:text-foreground"
                  onClick={() => setLocation("/")}
                >
                  الرئيسية
                </p>
                <p
                  className="cursor-pointer hover:text-foreground"
                  onClick={() => setLocation("/services")}
                >
                  الخدمات
                </p>
                <p
                  className="cursor-pointer hover:text-foreground"
                  onClick={() => setLocation("/pricing")}
                >
                  الباقات
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
