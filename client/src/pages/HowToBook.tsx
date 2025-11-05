import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocation } from "wouter";
import {
  Search,
  Calendar,
  CreditCard,
  CheckCircle2,
  MessageSquare,
  Star,
  Clock,
  Shield,
  Users,
  Zap,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

interface Step {
  number: number;
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
  color: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "اختر الخدمة المناسبة",
    description: "تصفح قائمة الخدمات الاستشارية المتنوعة",
    details: [
      "استشارات سريعة (نصية، صوتية، فيديو)",
      "مراجعة العقود والاتفاقيات",
      "تدقيق قرارات الفصل",
      "دراسات الحالات المعقدة",
      "استشارات استراتيجية شاملة",
    ],
    icon: <Search className="w-12 h-12" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: 2,
    title: "اختر المستشار المتخصص",
    description: "اختر من بين أفضل المستشارين المعتمدين",
    details: [
      "عرض ملف المستشار الكامل",
      "مراجعة التقييمات والشهادات",
      "عرض عدد الاستشارات السابقة",
      "معرفة التخصصات والخبرات",
      "قراءة آراء العملاء السابقين",
    ],
    icon: <Users className="w-12 h-12" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    number: 3,
    title: "حدد الموعد والوقت",
    description: "اختر التاريخ والوقت المناسب لك",
    details: [
      "عرض الأوقات المتاحة للمستشار",
      "اختيار التاريخ المفضل",
      "اختيار الوقت المناسب",
      "إمكانية تغيير الموعد لاحقاً",
      "تذكيرات تلقائية قبل الاستشارة",
    ],
    icon: <Calendar className="w-12 h-12" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    number: 4,
    title: "أكمل البيانات والدفع",
    description: "أدخل البيانات المطلوبة وأكمل عملية الدفع",
    details: [
      "ملء بيانات الاستشارة",
      "شرح المشكلة أو الموضوع",
      "اختيار طريقة الدفع",
      "دفع آمن ومشفر",
      "استرجاع المبلغ في حالة عدم الرضا",
    ],
    icon: <CreditCard className="w-12 h-12" />,
    color: "from-orange-500 to-red-500",
  },
  {
    number: 5,
    title: "احصل على الاستشارة",
    description: "تواصل مع المستشار واحصل على الحل",
    details: [
      "تواصل مباشر مع المستشار",
      "استقبال الاستشارة في الموعد المحدد",
      "الحصول على توصيات مفصلة",
      "إمكانية طرح أسئلة متابعة",
      "الحصول على ملخص مكتوب",
    ],
    icon: <MessageSquare className="w-12 h-12" />,
    color: "from-indigo-500 to-blue-500",
  },
  {
    number: 6,
    title: "المتابعة والدعم",
    description: "دعم مستمر بعد الاستشارة",
    details: [
      "دعم متابعة لمدة 30 يوم",
      "الإجابة على الأسئلة الإضافية",
      "مساعدة في التنفيذ",
      "تقييم النتائج والتحسينات",
      "ضمان الرضا الكامل",
    ],
    icon: <CheckCircle2 className="w-12 h-12" />,
    color: "from-teal-500 to-green-500",
  },
];

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "كم تستغرق الاستشارة؟",
    answer:
      "تختلف مدة الاستشارة حسب نوعها. الاستشارات السريعة تستغرق 15-45 دقيقة، بينما الاستشارات الشاملة قد تستغرق عدة ساعات أو أيام.",
  },
  {
    question: "هل يمكن تغيير الموعد؟",
    answer:
      "نعم، يمكنك تغيير الموعد قبل 24 ساعة من الاستشارة بدون أي رسوم إضافية.",
  },
  {
    question: "ما هي طرق الدفع المتاحة؟",
    answer:
      "نقبل بطاقات الائتمان، التحويل البنكي، وأمازون باي. جميع العمليات آمنة ومشفرة.",
  },
  {
    question: "هل هناك ضمان للرضا؟",
    answer:
      "نعم، نقدم ضمان رضا 30 يوم. إذا لم تكن راضياً عن الاستشارة، نسترجع المبلغ كاملاً بدون أسئلة.",
  },
  {
    question: "هل المعلومات سرية؟",
    answer:
      "نعم، جميع المعلومات والاستشارات سرية تماماً. نلتزم بسياسة الخصوصية الصارمة.",
  },
  {
    question: "هل يمكن الحصول على استشارة مجانية؟",
    answer:
      "نقدم استشارة أولية مجانية لمدة 15 دقيقة لتقييم احتياجاتك واختيار الخدمة المناسبة.",
  },
];

export default function HowToBook() {
  const [, navigate] = useLocation();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">كيفية حجز استشارة</h1>
          <p className="text-xl text-white/90">
            خطوات بسيطة وسهلة للحصول على استشارة احترافية من خبرائنا
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-24 w-6 h-0.5 bg-gradient-to-r from-primary to-purple-500" />
              )}

              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} text-white mb-4`}
                  >
                    {step.icon}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-primary">
                      {step.number}
                    </span>
                    <div>
                      <CardTitle className="text-right">{step.title}</CardTitle>
                      <CardDescription className="text-right">
                        {step.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-right">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            فوائد الاستشارة معنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <Zap className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">استجابة سريعة</h3>
                <p className="text-sm text-muted-foreground">
                  نرد على طلبات الاستشارة في خلال ساعات
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Shield className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">سرية تامة</h3>
                <p className="text-sm text-muted-foreground">
                  جميع المعلومات محمية وسرية تماماً
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Star className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">خبراء معتمدون</h3>
                <p className="text-sm text-muted-foreground">
                  استشاريون بخبرة 15+ سنة
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">مرونة في الأوقات</h3>
                <p className="text-sm text-muted-foreground">
                  استشارات متاحة حسب راحتك
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">ضمان الرضا</h3>
                <p className="text-sm text-muted-foreground">
                  استرجاع المبلغ في حالة عدم الرضا
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <MessageSquare className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">دعم متابعة</h3>
                <p className="text-sm text-muted-foreground">
                  دعم مستمر لمدة 30 يوم بعد الاستشارة
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            الأسئلة الشائعة
          </h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <div
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === index ? null : index)
                  }
                  className="p-6 flex items-center justify-between"
                >
                  <h3 className="font-semibold text-right flex-1">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform ${
                      expandedFAQ === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {expandedFAQ === index && (
                  <div className="px-6 pb-6 border-t pt-4">
                    <p className="text-muted-foreground text-right">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">جاهز للبدء؟</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            اتبع الخطوات البسيطة أعلاه واحصل على استشارة احترافية من أفضل
            الخبراء
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/consulting/services")}
              className="gap-2"
            >
              اعرض الخدمات
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              onClick={() => navigate("/consulting/book")}
              className="gap-2 bg-white text-primary hover:bg-white/90"
            >
              احجز الآن
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
