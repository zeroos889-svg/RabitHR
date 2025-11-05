import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  BookOpen,
  FileText,
  Scale,
  Users,
  Calculator,
  TrendingUp,
  Shield,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Link } from "wouter";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const categories = [
  {
    id: "labor-law",
    name: "نظام العمل السعودي",
    icon: Scale,
    color: "text-blue-600 bg-blue-100",
    count: 45,
    description: "كل ما تحتاج معرفته عن نظام العمل واللوائح التنفيذية",
  },
  {
    id: "hr-management",
    name: "إدارة الموارد البشرية",
    icon: Users,
    color: "text-purple-600 bg-purple-100",
    count: 38,
    description: "أفضل الممارسات في إدارة الموارد البشرية",
  },
  {
    id: "calculations",
    name: "الحسابات والمستحقات",
    icon: Calculator,
    color: "text-green-600 bg-green-100",
    count: 28,
    description: "طرق حساب الرواتب والمستحقات والإجازات",
  },
  {
    id: "performance",
    name: "تقييم الأداء",
    icon: TrendingUp,
    color: "text-orange-600 bg-orange-100",
    count: 22,
    description: "أنظمة وأساليب تقييم أداء الموظفين",
  },
  {
    id: "compliance",
    name: "الامتثال والتوطين",
    icon: Shield,
    color: "text-red-600 bg-red-100",
    count: 31,
    description: "متطلبات التوطين والامتثال للأنظمة",
  },
  {
    id: "time-management",
    name: "إدارة الوقت والحضور",
    icon: Clock,
    color: "text-teal-600 bg-teal-100",
    count: 19,
    description: "أنظمة الحضور والانصراف وإدارة الوقت",
  },
];

const popularArticles = [
  {
    id: 1,
    title: "كيفية حساب مكافأة نهاية الخدمة في السعودية",
    category: "الحسابات والمستحقات",
    views: 15420,
    readTime: "8 دقائق",
  },
  {
    id: 2,
    title: "دليل شامل لنظام العمل السعودي الجديد 2024",
    category: "نظام العمل السعودي",
    views: 12850,
    readTime: "15 دقيقة",
  },
  {
    id: 3,
    title: "حقوق الموظف عند الاستقالة أو الفصل",
    category: "نظام العمل السعودي",
    views: 11230,
    readTime: "10 دقائق",
  },
  {
    id: 4,
    title: "أفضل ممارسات التوظيف والاختيار",
    category: "إدارة الموارد البشرية",
    views: 9840,
    readTime: "12 دقيقة",
  },
  {
    id: 5,
    title: "كيفية حساب الإجازات السنوية والمرضية",
    category: "الحسابات والمستحقات",
    views: 8920,
    readTime: "7 دقائق",
  },
];

export default function Knowledge() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img src="/rabit-logo.svg" alt="Rabit" className="h-8 w-8" />
            <span className="text-xl font-bold text-gradient-primary">
              رابِط
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              الرئيسية
            </Link>
            <Link
              href="/knowledge-base"
              className="text-sm font-medium text-primary"
            >
              قاعدة المعرفة
            </Link>
            <Link
              href="/consulting"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              الاستشارات
            </Link>
            <Link
              href="/courses"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              الدورات
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">تسجيل الدخول</Button>
            </Link>
            <Link href="/signup">
              <Button className="gradient-primary text-white">
                ابدأ مجاناً
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm mb-6">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">قاعدة المعرفة</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              مكتبة شاملة لكل ما يخص
              <span className="text-gradient-primary"> الموارد البشرية</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              مقالات وأدلة ونصائح من خبراء HR لمساعدتك في إدارة شؤون الموارد
              البشرية بكفاءة
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ابحث عن مقالات، أدلة، أو مواضيع..."
                className="pr-12 h-14 text-lg"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              أكثر من <span className="font-bold text-primary">200+ مقال</span>{" "}
              في مختلف مجالات الموارد البشرية
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">تصفح حسب الفئة</h2>
            <p className="text-muted-foreground">
              اختر الفئة التي تهمك للوصول السريع للمحتوى
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
              <Link
                key={category.id}
                href={`/knowledge-base?category=${category.id}`}
              >
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}
                    >
                      <category.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{category.count} مقال</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">المقالات الأكثر قراءة</h2>
            <p className="text-muted-foreground">
              المواضيع التي يبحث عنها الجميع
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {popularArticles.map((article, index) => (
              <Link key={article.id} href={`/knowledge-base/${article.id}`}>
                <Card className="hover:shadow-md transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Badge variant="outline">{article.category}</Badge>
                          <span>{article.views.toLocaleString()} قراءة</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/knowledge-base">
              <Button size="lg" variant="outline">
                عرض جميع المقالات
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            لم تجد ما تبحث عنه؟
          </h2>
          <p className="text-xl mb-8 opacity-90">
            احصل على استشارة مباشرة من خبراء الموارد البشرية
          </p>
          <Link href="/consulting">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              احجز استشارة الآن
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
