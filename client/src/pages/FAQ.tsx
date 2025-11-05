import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Search,
  ChevronLeft,
  Users,
  CreditCard,
  Settings,
  Shield,
  MessageCircle,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { Link } from "wouter";
import { Footer } from "@/components/Footer";

// FAQ Categories
const faqCategories = [
  {
    id: "general",
    name: "عام",
    icon: HelpCircle,
    color: "from-blue-500 to-indigo-600",
    questions: [
      {
        q: "ما هو رابِط؟",
        a: "رابِط هو مساعد ذكي متخصص في الموارد البشرية للشركات السعودية. يوفر أدوات ذكية لإدارة الموظفين، حساب نهاية الخدمة، الإجازات، مولد الخطابات، نظام ATS، والتذاكر - كل ذلك بتقنية الذكاء الاصطناعي ومتوافق 100% مع نظام العمل السعودي.",
      },
      {
        q: "من يمكنه استخدام رابِط؟",
        a: "رابِط مصمم لثلاث فئات: الموظفين الأفراد (باقة مجانية)، مستقلي الموارد البشرية الذين يخدمون عدة عملاء، والشركات بجميع أحجامها من الناشئة إلى المؤسسات الكبرى.",
      },
      {
        q: "هل رابِط متوافق مع نظام العمل السعودي؟",
        a: "نعم، 100%! جميع الحسابات والخطابات والإجراءات مبنية على نظام العمل السعودي واللوائح التنفيذية. نقوم بتحديث النظام فوراً عند صدور أي تعديلات قانونية.",
      },
      {
        q: "هل يدعم رابِط اللغة الإنجليزية؟",
        a: "نعم، رابِط يدعم اللغتين العربية والإنجليزية بالكامل. يمكنك التبديل بين اللغتين في أي وقت، وجميع الخطابات والتقارير يمكن إصدارها بالعربية أو الإنجليزية أو ثنائية اللغة.",
      },
      {
        q: "هل يمكنني تجربة رابِط قبل الاشتراك؟",
        a: "بالتأكيد! نوفر باقة مجانية للموظفين الأفراد تشمل الأدوات الأساسية. كما نوفر فترة تجريبية 14 يوم للباقات المدفوعة دون الحاجة لبطاقة ائتمان.",
      },
    ],
  },
  {
    id: "account",
    name: "الحساب",
    icon: Users,
    color: "from-purple-500 to-pink-600",
    questions: [
      {
        q: "كيف أنشئ حساب في رابِط؟",
        a: 'انقر على "ابدأ الآن" واختر نوع حسابك (موظف، مستقل HR، أو شركة). أكمل البيانات المطلوبة وستتمكن من الوصول فوراً. للباقات المدفوعة، ستحتاج لإدخال معلومات الدفع.',
      },
      {
        q: "هل يمكنني تغيير نوع حسابي لاحقاً؟",
        a: "نعم، يمكنك الترقية من باقة الموظف إلى مستقل HR أو الشركات في أي وقت. يمكنك أيضاً التخفيض بين الباقات، وسيتم احتساب الرصيد المتبقي.",
      },
      {
        q: "كيف أغير كلمة المرور؟",
        a: "من لوحة التحكم، اذهب إلى الإعدادات > الحساب > تغيير كلمة المرور. أدخل كلمة المرور الحالية والجديدة وسيتم التحديث فوراً.",
      },
      {
        q: "هل يدعم رابِط المصادقة الثنائية؟",
        a: "نعم، نوفر المصادقة الثنائية (2FA) لحماية حسابك. يمكنك تفعيلها من الإعدادات > الأمان > المصادقة الثنائية.",
      },
      {
        q: "ماذا أفعل إذا نسيت كلمة المرور؟",
        a: 'انقر على "نسيت كلمة المرور" في صفحة تسجيل الدخول. أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور.',
      },
    ],
  },
  {
    id: "billing",
    name: "الفواتير والدفع",
    icon: CreditCard,
    color: "from-green-500 to-emerald-600",
    questions: [
      {
        q: "ما هي طرق الدفع المتاحة؟",
        a: "نقبل بطاقات الائتمان (Visa, Mastercard, Mada)، Apple Pay، والتحويل البنكي للشركات. جميع المعاملات آمنة ومشفرة بأعلى معايير الأمان.",
      },
      {
        q: "هل الأسعار شاملة ضريبة القيمة المضافة؟",
        a: "الأسعار المعروضة غير شاملة لضريبة القيمة المضافة (15%). سيتم إضافة الضريبة تلقائياً عند الدفع وفقاً للأنظمة السعودية.",
      },
      {
        q: "متى يتم تجديد الاشتراك؟",
        a: "يتم تجديد الاشتراك تلقائياً في نفس تاريخ الاشتراك كل شهر. سنرسل لك إشعار قبل 7 أيام من التجديد. يمكنك إلغاء التجديد التلقائي في أي وقت.",
      },
      {
        q: "هل يمكنني الحصول على فاتورة ضريبية؟",
        a: "نعم، يتم إصدار فاتورة ضريبية تلقائياً بعد كل عملية دفع. يمكنك تحميلها من الإعدادات > الفواتير. الفاتورة تحتوي على جميع البيانات المطلوبة للخصم الضريبي.",
      },
      {
        q: "هل تقدمون خصومات للدفع السنوي؟",
        a: "نعم! نوفر خصم 20% عند الدفع السنوي مقدماً. مثلاً، باقة مستقل HR بـ 299 ريال شهرياً تصبح 2,870 ريال سنوياً (بدلاً من 3,588 ريال).",
      },
      {
        q: "ماذا يحدث إذا فشلت عملية الدفع؟",
        a: "سنحاول إعادة المحاولة 3 مرات خلال 7 أيام. سنرسل لك إشعارات لتحديث معلومات الدفع. إذا لم يتم الدفع، سيتم تعليق الحساب مؤقتاً حتى تحديث الدفع.",
      },
    ],
  },
  {
    id: "features",
    name: "الميزات والاستخدام",
    icon: Settings,
    color: "from-orange-500 to-red-600",
    questions: [
      {
        q: "كيف أستخدم حاسبة نهاية الخدمة؟",
        a: 'من الأدوات الذكية، اختر "حاسبة نهاية الخدمة". أدخل تاريخ المباشرة، آخر يوم عمل، الراتب الإجمالي، نوع العقد، وسبب الإنهاء. سيتم حساب المستحقات فوراً وفق المادة 84 من نظام العمل.',
      },
      {
        q: "كيف يعمل مولد الخطابات بالذكاء الاصطناعي؟",
        a: "اختر نوع الخطاب من 55+ نموذج جاهز، أو استخدم المولد المخصص. أدخل التفاصيل المطلوبة واختر اللغة والأسلوب. سيقوم الذكاء الاصطناعي بصياغة خطاب احترافي متوافق مع نظام العمل. يمكنك تعديله ثم تصديره PDF أو Word.",
      },
      {
        q: "ما هو نظام ATS وكيف يساعدني؟",
        a: "ATS (Applicant Tracking System) هو نظام تتبع المتقدمين. يساعدك في نشر الوظائف، استقبال السير الذاتية، فرزها بالذكاء الاصطناعي، تقييم المرشحين، جدولة المقابلات، ومتابعة مراحل التوظيف - كل ذلك في مكان واحد.",
      },
      {
        q: "هل يمكنني رفع ملفات ومستندات؟",
        a: "نعم، يمكنك رفع السير الذاتية، المستندات الداعمة، صور القرارات، وملفات الإجازات. نستخدم الذكاء الاصطناعي لقراءة وتحليل المستندات تلقائياً. الحد الأقصى للملف 16 ميجابايت.",
      },
      {
        q: "كيف أستخدم نظام التحقق القانوني؟",
        a: 'للموظفين: اذهب لصفحة "التحقق من القرار" وأدخل تفاصيل القرار الصادر. سيحلل النظام قانونية القرار ويعطيك حقوقك وخطوات الاعتراض. لـ HR: من Dashboard > التحقق القانوني، أدخل القرار قبل إصداره للتأكد من سلامته القانونية.',
      },
      {
        q: "هل يمكنني تخصيص الخطابات والشهادات؟",
        a: "نعم بالتأكيد! يمكنك رفع شعار شركتك، تخصيص البيانات، تعديل النصوص، اختيار اللغة، وحفظ القوالب المخصصة. جميع الخطابات قابلة للتعديل بالكامل.",
      },
    ],
  },
  {
    id: "security",
    name: "الأمان والخصوصية",
    icon: Shield,
    color: "from-red-500 to-pink-600",
    questions: [
      {
        q: "كيف تحمون بياناتي؟",
        a: "نستخدم تشفير SSL 256-bit لجميع البيانات. الخوادم موجودة في السعودية ومتوافقة مع قوانين حماية البيانات. نقوم بنسخ احتياطي يومي ولا نشارك بياناتك مع أي طرف ثالث.",
      },
      {
        q: "من يمكنه الوصول لبيانات شركتي؟",
        a: "فقط المستخدمين المصرح لهم في حسابك. يمكنك تحديد الصلاحيات لكل مستخدم (مشاهدة، تعديل، حذف). جميع الإجراءات مسجلة في سجل النشاطات.",
      },
      {
        q: "هل يمكنني حذف بياناتي نهائياً؟",
        a: "نعم، يمكنك طلب حذف حسابك وجميع بياناتك من الإعدادات > الأمان > حذف الحساب. سيتم حذف جميع البيانات نهائياً خلال 30 يوم وفقاً لسياسة الخصوصية.",
      },
      {
        q: "هل تستخدمون بياناتي للتدريب أو التسويق؟",
        a: "لا، نحترم خصوصيتك تماماً. بياناتك تستخدم فقط لتقديم الخدمة لك. لا نستخدمها للتدريب أو التسويق أو المشاركة مع أطراف ثالثة دون موافقتك الصريحة.",
      },
      {
        q: "ماذا يحدث لبياناتي إذا ألغيت الاشتراك؟",
        a: "ستبقى بياناتك محفوظة لمدة 90 يوم بعد الإلغاء في حال رغبت بالعودة. بعد ذلك، يمكنك طلب حذفها نهائياً أو ستحذف تلقائياً بعد سنة وفقاً لسياسة الاحتفاظ.",
      },
    ],
  },
  {
    id: "support",
    name: "الدعم والمساعدة",
    icon: MessageCircle,
    color: "from-teal-500 to-cyan-600",
    questions: [
      {
        q: "كيف أتواصل مع الدعم الفني؟",
        a: "يمكنك التواصل عبر: البريد الإلكتروني info@rbithr.com، الواتساب 0570700355، أو نظام التذاكر داخل لوحة التحكم. أوقات الدعم: الأحد-الخميس 9ص-6م.",
      },
      {
        q: "ما هو وقت الاستجابة للدعم؟",
        a: "للباقة المجانية: خلال 48 ساعة. مستقل HR: خلال 24 ساعة (دعم أولوية). الشركات: خلال 4 ساعات مع دعم مخصص 24/7 للباقات الكبيرة.",
      },
      {
        q: "هل تقدمون تدريب على استخدام النظام؟",
        a: "نعم! نوفر فيديوهات تعليمية، دليل مستخدم شامل، وجولة تعريفية للمستخدمين الجدد. للشركات، نوفر جلسات تدريب مباشرة مجانية عند الاشتراك.",
      },
      {
        q: "هل يمكنني طلب ميزة جديدة؟",
        a: 'بالتأكيد! نرحب باقتراحاتك. يمكنك إرسال طلبك عبر "اقتراح ميزة" في لوحة التحكم أو التواصل معنا مباشرة. نقوم بتقييم جميع الطلبات وتنفيذ الأكثر طلباً.',
      },
      {
        q: "أين أجد الدليل الإرشادي؟",
        a: 'الدليل متوفر في قسم "المساعدة" داخل لوحة التحكم. يحتوي على شروحات تفصيلية، فيديوهات، وأمثلة عملية لكل ميزة. يمكنك أيضاً البحث في الأسئلة الشائعة.',
      },
    ],
  },
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter questions based on search and category
  const filteredCategories = faqCategories
    .map(category => ({
      ...category,
      questions: category.questions.filter(
        q =>
          (selectedCategory === null || selectedCategory === category.id) &&
          (searchQuery === "" ||
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    }))
    .filter(category => category.questions.length > 0);

  const totalQuestions = faqCategories.reduce(
    (sum, cat) => sum + cat.questions.length,
    0
  );

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
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              الأسئلة الشائعة
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              إجابات شاملة على جميع أسئلتك حول رابِط
            </p>
            <Badge variant="secondary" className="mt-4">
              {totalQuestions} سؤال وجواب
            </Badge>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="ابحث في الأسئلة الشائعة..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pr-10 text-right"
              />
            </div>
          </CardContent>
        </Card>

        {/* Category Filters */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            className={`h-auto py-4 flex-col gap-2 ${
              selectedCategory === null
                ? "bg-gradient-to-r from-blue-500 to-purple-600"
                : ""
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            <Sparkles className="h-5 w-5" />
            <span className="text-xs">الكل</span>
          </Button>
          {faqCategories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`h-auto py-4 flex-col gap-2 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color}`
                  : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <category.icon className="h-5 w-5" />
              <span className="text-xs">{category.name}</span>
            </Button>
          ))}
        </div>

        {/* FAQ Sections */}
        <div className="space-y-6">
          {filteredCategories.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">لم نجد نتائج</h3>
                <p className="text-muted-foreground">
                  جرب البحث بكلمات مختلفة أو تصفح الفئات
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredCategories.map(category => (
              <Card key={category.id} className="overflow-hidden">
                <CardHeader
                  className={`bg-gradient-to-r ${category.color} text-white`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/20">
                      <category.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-white">
                        {category.name}
                      </CardTitle>
                      <CardDescription className="text-white/80">
                        {category.questions.length} سؤال
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((question, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-right hover:no-underline">
                          <span className="font-semibold text-right">
                            {question.q}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-right leading-relaxed">
                          {question.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Still Have Questions CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
          <CardContent className="py-12 text-center">
            <MessageCircle className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">لم تجد إجابة لسؤالك؟</h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              فريق الدعم جاهز لمساعدتك في أي وقت
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  تواصل معنا
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() =>
                  window.open("https://wa.me/966570700355", "_blank")
                }
              >
                واتساب مباشر
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
