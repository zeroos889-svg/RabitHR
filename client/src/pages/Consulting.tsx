import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Phone,
  Video,
  FileText,
  Scale,
  Briefcase,
  Clock,
  CheckCircle2,
  Star,
  ArrowRight,
  Shield,
} from "lucide-react";
import { Footer } from "@/components/Footer";

export default function Consulting() {
  const consultationTypes = [
    {
      icon: MessageSquare,
      title: "استشارة نصية",
      duration: "15-30 دقيقة",
      price: "99 ريال",
      features: [
        "تواصل كتابي فوري",
        "إمكانية إرسال مستندات",
        "رد خلال 24 ساعة",
        "سرية تامة",
      ],
      popular: false,
    },
    {
      icon: Phone,
      title: "استشارة صوتية",
      duration: "30 دقيقة",
      price: "149 ريال",
      features: [
        "مكالمة هاتفية مباشرة",
        "مناقشة تفاعلية",
        "تسجيل المكالمة (اختياري)",
        "ملخص مكتوب بعد المكالمة",
      ],
      popular: true,
    },
    {
      icon: Video,
      title: "استشارة فيديو",
      duration: "30-45 دقيقة",
      price: "199 ريال",
      features: [
        "اجتماع مرئي",
        "عرض شاشة ومستندات",
        "تسجيل الجلسة",
        "تقرير مفصل بعد الجلسة",
      ],
      popular: false,
    },
  ];

  const specializedServices = [
    {
      icon: FileText,
      title: "مراجعة عقود العمل",
      description: "مراجعة قانونية شاملة لعقود العمل وتحديد النقاط الإشكالية",
      packages: [
        { name: "مراجعة بسيطة", price: "299 ريال", duration: "2-3 أيام" },
        { name: "مراجعة متقدمة", price: "499 ريال", duration: "3-5 أيام" },
        { name: "صياغة عقد جديد", price: "799 ريال", duration: "5-7 أيام" },
      ],
    },
    {
      icon: Scale,
      title: "تدقيق قرارات الفصل",
      description: "فحص قانوني للقرارات الإدارية وتقييم المخاطر القانونية",
      packages: [
        { name: "تدقيق أساسي", price: "199 ريال", duration: "1-2 يوم" },
        { name: "تدقيق شامل", price: "399 ريال", duration: "2-3 أيام" },
        { name: "تدقيق + استشارة", price: "499 ريال", duration: "2-3 أيام" },
      ],
    },
    {
      icon: Briefcase,
      title: "دراسة حالة HR شاملة",
      description: "دراسة تفصيلية للحالات المعقدة مع خطة عمل تنفيذية",
      packages: [
        { name: "دراسة أساسية", price: "999 ريال", duration: "7-10 أيام" },
        { name: "دراسة + خطة عمل", price: "1,499 ريال", duration: "10-14 يوم" },
      ],
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "مستشارون معتمدون",
      description:
        "جميع مستشارينا خبراء معتمدون في مجال الموارد البشرية والقانون",
    },
    {
      icon: Clock,
      title: "استجابة سريعة",
      description: "نضمن لك الرد خلال 24 ساعة كحد أقصى",
    },
    {
      icon: CheckCircle2,
      title: "ضمان الجودة",
      description: "ضمان استرداد الأموال إذا لم تكن راضياً عن الخدمة",
    },
    {
      icon: Star,
      title: "تقييمات عالية",
      description: "متوسط تقييم مستشارينا 4.8/5 من أكثر من 1000 عميل",
    },
  ];

  const stats = [
    { value: "+1000", label: "استشارة منجزة" },
    { value: "4.8/5", label: "متوسط التقييم" },
    { value: "+50", label: "مستشار معتمد" },
    { value: "98%", label: "نسبة الرضا" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              الخدمات الاستشارية
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              احصل على استشارة قانونية متخصصة في الموارد البشرية
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              نخبة من المستشارين القانونيين المتخصصين في نظام العمل السعودي
              جاهزون لمساعدتك
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/consulting/book">
                  احجز استشارة الآن
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/consulting/experts">تصفح المستشارين</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              أنواع الاستشارات
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              اختر نوع الاستشارة المناسب لاحتياجاتك
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {consultationTypes.map((type, index) => (
              <Card
                key={index}
                className={`relative ${type.popular ? "border-primary shadow-lg" : ""}`}
              >
                {type.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    الأكثر طلباً
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <type.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{type.title}</CardTitle>
                  <CardDescription className="text-lg">
                    <Clock className="inline h-4 w-4 ml-1" />
                    {type.duration}
                  </CardDescription>
                  <div className="text-3xl font-bold text-primary mt-4">
                    {type.price}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-6"
                    variant={type.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/consulting/book">احجز الآن</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              الخدمات المتخصصة
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              خدمات تتطلب دراسة تفصيلية ووقت أطول
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {specializedServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {service.packages.map((pkg, idx) => (
                      <div key={idx} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-semibold">{pkg.name}</div>
                          <div className="text-primary font-bold">
                            {pkg.price}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {pkg.duration}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="outline" asChild>
                    <Link href="/consulting/book">اطلب الخدمة</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              لماذا تختار خدماتنا الاستشارية؟
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">جاهز للبدء؟</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            احجز استشارتك الآن واحصل على المشورة القانونية التي تحتاجها
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/consulting/book">
                احجز استشارة الآن
                <ArrowRight className="mr-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/consulting/experts">تصفح المستشارين</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
