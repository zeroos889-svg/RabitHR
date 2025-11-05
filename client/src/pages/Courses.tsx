import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  Play,
  CheckCircle2,
  Award,
  TrendingUp,
  Briefcase,
  Scale,
  FileText,
  Target,
} from "lucide-react";
import { Footer } from "@/components/Footer";

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "الكل", icon: BookOpen },
    { id: "fundamentals", name: "الأساسيات", icon: Target },
    { id: "labor-law", name: "نظام العمل", icon: Scale },
    { id: "recruitment", name: "التوظيف", icon: Users },
    { id: "performance", name: "إدارة الأداء", icon: TrendingUp },
    { id: "relations", name: "العلاقات الوظيفية", icon: Briefcase },
  ];

  const courses = [
    {
      id: "1",
      title: "مدخل إلى الموارد البشرية",
      description: "دورة شاملة تغطي أساسيات الموارد البشرية للمبتدئين",
      category: "fundamentals",
      level: "مبتدئ",
      duration: "4 ساعات",
      lessons: 25,
      students: 1250,
      rating: 4.8,
      reviews: 320,
      price: 299,
      instructor: "د. أحمد المالكي",
      image: "📚",
      features: ["شهادة إتمام", "وصول مدى الحياة", "تحديثات مجانية"],
      popular: true,
    },
    {
      id: "2",
      title: "نظام العمل السعودي",
      description: "دراسة تفصيلية لنظام العمل السعودي ولوائحه التنفيذية",
      category: "labor-law",
      level: "متوسط",
      duration: "6 ساعات",
      lessons: 30,
      students: 980,
      rating: 4.9,
      reviews: 245,
      price: 399,
      instructor: "أ. فاطمة العتيبي",
      image: "⚖️",
      features: ["شهادة معتمدة", "حالات عملية", "دعم المدرب"],
      popular: true,
    },
    {
      id: "3",
      title: "إدارة الأداء والتقييم",
      description: "تعلم كيفية بناء نظام فعال لإدارة وتقييم أداء الموظفين",
      category: "performance",
      level: "متقدم",
      duration: "5 ساعات",
      lessons: 22,
      students: 650,
      rating: 4.7,
      reviews: 180,
      price: 499,
      instructor: "د. محمد السعيد",
      image: "📊",
      features: ["مشروع عملي", "قوالب جاهزة", "ورشة تطبيقية"],
    },
    {
      id: "4",
      title: "التوظيف والاستقطاب",
      description: "استراتيجيات حديثة لجذب واختيار أفضل المواهب",
      category: "recruitment",
      level: "متوسط",
      duration: "4.5 ساعات",
      lessons: 20,
      students: 820,
      rating: 4.6,
      reviews: 195,
      price: 449,
      instructor: "أ. نورة الشمري",
      image: "🎯",
      features: ["دليل المقابلات", "نماذج التقييم", "أمثلة واقعية"],
    },
    {
      id: "5",
      title: "إدارة التعويضات والمزايا",
      description: "تصميم هيكل رواتب ومزايا تنافسي وعادل",
      category: "fundamentals",
      level: "متقدم",
      duration: "5.5 ساعات",
      lessons: 28,
      students: 540,
      rating: 4.8,
      reviews: 145,
      price: 599,
      instructor: "د. خالد الدوسري",
      image: "💰",
      features: ["حاسبات Excel", "دراسات سوق", "استشارة مباشرة"],
    },
    {
      id: "6",
      title: "العلاقات الوظيفية",
      description: "إدارة العلاقات الوظيفية والتعامل مع النزاعات",
      category: "relations",
      level: "متوسط",
      duration: "4 ساعات",
      lessons: 18,
      students: 720,
      rating: 4.7,
      reviews: 165,
      price: 449,
      instructor: "أ. سارة القحطاني",
      image: "🤝",
      features: ["سيناريوهات واقعية", "نماذج قانونية", "دعم مستمر"],
    },
  ];

  const programs = [
    {
      id: "pro-1",
      title: "برنامج محترف الموارد البشرية",
      description: "برنامج شامل يؤهلك لتصبح محترف معتمد في الموارد البشرية",
      duration: "40 ساعة",
      courses: 6,
      students: 350,
      rating: 4.9,
      price: 1999,
      savings: 600,
      features: [
        "6 دورات متكاملة",
        "مشروع تخرج",
        "شهادة معتمدة",
        "وصول لمدة 12 شهر",
        "دعم مباشر من المدربين",
        "ورش عمل شهرية",
      ],
    },
  ];

  const subscriptionPlans = [
    {
      name: "خطة التعلم",
      price: 99,
      period: "شهرياً",
      features: [
        "وصول لجميع الدورات",
        "محتوى جديد شهرياً",
        "إلغاء في أي وقت",
        "دعم فني",
      ],
    },
    {
      name: "خطة الاحتراف",
      price: 199,
      period: "شهرياً",
      popular: true,
      features: [
        "كل ما في خطة التعلم",
        "شهادات معتمدة",
        "دعم مباشر من المدربين",
        "ورش عمل شهرية",
        "أولوية في الرد",
      ],
    },
  ];

  const stats = [
    { value: "+5000", label: "طالب نشط" },
    { value: "50+", label: "دورة تدريبية" },
    { value: "4.8/5", label: "متوسط التقييم" },
    { value: "95%", label: "نسبة الإكمال" },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              <Award className="ml-1 h-3 w-3" />
              منصة التعلم الإلكتروني
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              طور مهاراتك في الموارد البشرية
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              دورات تدريبية متخصصة من خبراء الموارد البشرية في المملكة
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="ابحث عن دورة..."
                className="pr-10 h-12 text-lg"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
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

      {/* Categories */}
      <section className="py-8 border-b bg-background sticky top-0 z-10 shadow-sm">
        <div className="container">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                className="flex-shrink-0"
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon className="ml-2 h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Program */}
      {selectedCategory === "all" && (
        <section className="py-16 bg-gradient-to-br from-primary/5 to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-4">برنامج مميز</Badge>
              <Card className="border-primary shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl md:text-3xl mb-2">
                        {programs[0].title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {programs[0].description}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        {programs[0].price} ريال
                      </div>
                      <div className="text-sm text-muted-foreground line-through">
                        {programs[0].price + programs[0].savings} ريال
                      </div>
                      <Badge variant="secondary" className="mt-1">
                        وفر {programs[0].savings} ريال
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">تفاصيل البرنامج:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{programs[0].duration} تدريبية</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span>{programs[0].courses} دورات متكاملة</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span>{programs[0].students} طالب مسجل</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span>{programs[0].rating}/5</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">ما ستحصل عليه:</h4>
                      <ul className="space-y-2">
                        {programs[0].features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="lg" className="w-full md:w-auto">
                    سجل الآن في البرنامج
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              {selectedCategory === "all"
                ? "جميع الدورات"
                : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className="text-sm text-muted-foreground">
              {filteredCourses.length} دورة
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <Card
                key={course.id}
                className="flex flex-col hover:shadow-lg transition-shadow"
              >
                {course.popular && (
                  <Badge className="absolute top-4 left-4 z-10">
                    الأكثر طلباً
                  </Badge>
                )}
                <CardHeader>
                  <div className="text-5xl mb-4">{course.image}</div>
                  <CardTitle className="text-xl line-clamp-2">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                  <div className="flex items-center gap-2 pt-2">
                    <Badge variant="secondary">{course.level}</Badge>
                    <Badge variant="outline">{course.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Play className="h-4 w-4" />
                        <span>{course.lessons} درس</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{course.rating}</span>
                        <span className="text-muted-foreground">
                          ({course.reviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{course.students}</span>
                      </div>
                    </div>
                    <div className="text-muted-foreground">
                      المدرب: {course.instructor}
                    </div>
                    <div className="border-t pt-3">
                      <ul className="space-y-1">
                        {course.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-xs"
                          >
                            <CheckCircle2 className="h-3 w-3 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    {course.price} ريال
                  </div>
                  <Button asChild>
                    <Link href={`/courses/${course.id}`}>التفاصيل</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              خطط الاشتراك
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              وصول غير محدود لجميع الدورات مع خطط مرنة
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {subscriptionPlans.map((plan, index) => (
              <Card
                key={index}
                className={plan.popular ? "border-primary shadow-lg" : ""}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    الأكثر شعبية
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-primary mt-4">
                    {plan.price} ريال
                    <span className="text-lg text-muted-foreground">
                      /{plan.period}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    ابدأ الآن
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            جاهز لبدء رحلة التعلم؟
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            انضم لآلاف المتعلمين وطور مهاراتك في الموارد البشرية
          </p>
          <Button size="lg" variant="secondary">
            تصفح جميع الدورات
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
