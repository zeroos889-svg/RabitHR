import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Eye,
  Heart,
  Users,
  Zap,
  Shield,
  Award,
  TrendingUp,
} from "lucide-react";
import { Link } from "wouter";
import { Footer } from "@/components/Footer";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "الشغف بالتميز",
      description:
        "نسعى دائماً لتقديم أفضل الحلول التقنية التي تتجاوز توقعات عملائنا",
    },
    {
      icon: Shield,
      title: "الموثوقية",
      description:
        "نبني علاقات طويلة الأمد مع عملائنا من خلال الشفافية والمصداقية",
    },
    {
      icon: Zap,
      title: "الابتكار المستمر",
      description:
        "نواكب أحدث التقنيات ونطور حلولنا باستمرار لخدمة عملائنا بشكل أفضل",
    },
    {
      icon: Users,
      title: "التركيز على العميل",
      description: "نضع احتياجات عملائنا في صميم كل قرار نتخذه",
    },
  ];

  const team = [
    {
      name: "صالح العقيل",
      role: "المؤسس والرئيس التنفيذي",
      description: "خبير في مجال الموارد البشرية والتحول الرقمي",
      linkedin: "https://www.linkedin.com/in/saleh0alaqil",
    },
    {
      name: "منصور الجابر",
      role: "المؤسس المشارك",
      description: "متخصص في تطوير الأعمال والاستراتيجية",
      linkedin: "https://www.linkedin.com/in/mansouraljaber11a",
    },
  ];

  const timeline = [
    {
      year: "2023",
      title: "الانطلاقة",
      description:
        "تأسيس رابِط بهدف تبسيط عمل أقسام الموارد البشرية في السعودية",
    },
    {
      year: "2024",
      title: "النمو السريع",
      description: "وصلنا لخدمة أكثر من 500 شركة و10,000 موظف",
    },
    {
      year: "2025",
      title: "التوسع",
      description: "إطلاق ميزات الذكاء الاصطناعي والتكامل مع الأنظمة الحكومية",
    },
    {
      year: "المستقبل",
      title: "الريادة الإقليمية",
      description: "نطمح لنكون المنصة الأولى للموارد البشرية في الشرق الأوسط",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold gradient-text">رابِط</a>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/">
              <a className="text-sm hover:text-primary transition-colors">
                الرئيسية
              </a>
            </Link>
            <Link href="/services">
              <a className="text-sm hover:text-primary transition-colors">
                الخدمات
              </a>
            </Link>
            <Link href="/pricing">
              <a className="text-sm hover:text-primary transition-colors">
                الباقات
              </a>
            </Link>
            <Link href="/about">
              <a className="text-sm font-semibold text-primary">من نحن</a>
            </Link>
            <Link href="/contact">
              <a className="text-sm hover:text-primary transition-colors">
                اتصل بنا
              </a>
            </Link>
          </nav>
          <Link href="/dashboard">
            <Button>تسجيل الدخول</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl font-bold">
              نحن <span className="gradient-text">رابِط</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              منصة سعودية متخصصة في تبسيط وأتمتة عمليات الموارد البشرية باستخدام
              أحدث التقنيات والذكاء الاصطناعي
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg">تواصل معنا</Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline">
                  اطلع على الباقات
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">قصتنا</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                بدأت رابِط من فكرة بسيطة:{" "}
                <strong>
                  لماذا يقضي موظفو الموارد البشرية ساعات طويلة في مهام روتينية
                  يمكن أتمتتها؟
                </strong>
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                بعد دراسة معمقة لتحديات أقسام الموارد البشرية في الشركات
                السعودية، اكتشفنا أن معظم الوقت يُهدر في: إصدار الشهادات يدوياً،
                الرد على نفس الأسئلة المتكررة، متابعة مواعيد انتهاء العقود
                والتأشيرات، وإدارة التذاكر والطلبات.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                من هنا ولدت <strong className="gradient-text">رابِط</strong> -
                منصة ذكية تجمع كل ما يحتاجه موظف الموارد البشرية في مكان واحد،
                مع أتمتة المهام الروتينية وتوفير أدوات ذكية تعمل بالذكاء
                الاصطناعي.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                اليوم، نفخر بخدمة مئات الشركات السعودية، ونساعد آلاف موظفي
                الموارد البشرية على توفير وقتهم والتركيز على ما يهم حقاً:
                <strong> بناء بيئة عمل أفضل</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold">رؤيتنا</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  أن نكون المنصة الأولى والأكثر ثقة لإدارة الموارد البشرية في
                  الشرق الأوسط، ونساهم في تحويل أقسام HR من إدارية إلى
                  استراتيجية.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold">رسالتنا</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  تمكين أقسام الموارد البشرية من خلال توفير أدوات ذكية وسهلة
                  الاستخدام تُوفر الوقت وتُحسّن الإنتاجية وتُعزز تجربة الموظفين.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">قيمنا</h2>
            <p className="text-muted-foreground">
              المبادئ التي نؤمن بها ونعمل بها كل يوم
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6 space-y-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mx-auto">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">رحلتنا</h2>
            <p className="text-muted-foreground">من الفكرة إلى الواقع</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute right-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden md:block" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={index} className="relative">
                    <div
                      className={`flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                    >
                      <div className="flex-1" />
                      <div className="relative z-10">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                          {item.year}
                        </div>
                      </div>
                      <Card className="flex-1">
                        <CardContent className="pt-6 space-y-2">
                          <h3 className="font-bold text-lg">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">فريقنا</h2>
            <p className="text-muted-foreground">
              الأشخاص الذين يجعلون رابِط ممكناً
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6 space-y-4">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mx-auto text-3xl font-bold text-primary">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-primary font-medium">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm inline-block"
                    >
                      LinkedIn →
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">شركة تثق بنا</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">موظف نخدمهم</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Award className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-blue-100">رضا العملاء</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">دعم فني</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 border-0">
            <CardContent className="pt-12 pb-12 text-center space-y-6">
              <h2 className="text-3xl font-bold">
                هل أنت مستعد للانضمام إلينا؟
              </h2>
              <p className="text-muted-foreground">
                ابدأ رحلتك مع رابِط اليوم ووفر ساعات من العمل الروتيني
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/pricing">
                  <Button size="lg">ابدأ الآن</Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    تحدث مع فريقنا
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Commercial Register Notice */}
      <section className="py-8 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-yellow-800">
              <strong>ملاحظة:</strong> السجل التجاري تحت الإصدار. هذه النسخة
              التجريبية من منصة رابِط.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
