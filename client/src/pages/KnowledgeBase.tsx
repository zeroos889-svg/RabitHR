import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Search,
  FileText,
  Scale,
  Users,
  Briefcase,
  FileCheck,
  AlertCircle,
  TrendingUp,
  Download,
  ExternalLink,
  Clock,
  Eye,
  ThumbsUp
} from "lucide-react";
import { Footer } from "@/components/Footer";

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "الكل", icon: BookOpen, count: 45 },
    { id: "labor-law", name: "نظام العمل", icon: Scale, count: 12 },
    { id: "contracts", name: "العقود", icon: FileText, count: 8 },
    { id: "termination", name: "إنهاء الخدمة", icon: AlertCircle, count: 6 },
    { id: "recruitment", name: "التوظيف", icon: Users, count: 7 },
    { id: "performance", name: "الأداء", icon: TrendingUp, count: 5 },
    { id: "procedures", name: "الإجراءات", icon: FileCheck, count: 7 }
  ];

  const articles = [
    {
      id: "1",
      title: "دليل شامل لنظام العمل السعودي 2024",
      description: "كل ما تحتاج معرفته عن نظام العمل السعودي وتعديلاته الأخيرة",
      category: "labor-law",
      readTime: "15 دقيقة",
      views: 2450,
      likes: 189,
      lastUpdated: "منذ أسبوع",
      featured: true
    },
    {
      id: "2",
      title: "كيفية صياغة عقد عمل متوافق مع النظام",
      description: "دليل خطوة بخطوة لإعداد عقد عمل قانوني وشامل",
      category: "contracts",
      readTime: "10 دقائق",
      views: 1820,
      likes: 145,
      lastUpdated: "منذ 3 أيام",
      featured: true
    },
    {
      id: "3",
      title: "حساب مستحقات نهاية الخدمة",
      description: "شرح تفصيلي لطريقة حساب مكافأة نهاية الخدمة وفق النظام",
      category: "termination",
      readTime: "8 دقائق",
      views: 3200,
      likes: 267,
      lastUpdated: "منذ يومين",
      featured: true
    },
    {
      id: "4",
      title: "أفضل ممارسات التوظيف في السعودية",
      description: "استراتيجيات فعالة لجذب واختيار أفضل المواهب",
      category: "recruitment",
      readTime: "12 دقيقة",
      views: 1650,
      likes: 128,
      lastUpdated: "منذ 5 أيام"
    },
    {
      id: "5",
      title: "إدارة الإجازات وفق نظام العمل",
      description: "أنواع الإجازات وكيفية احتسابها بشكل صحيح",
      category: "labor-law",
      readTime: "7 دقائق",
      views: 2100,
      likes: 176,
      lastUpdated: "منذ أسبوعين"
    },
    {
      id: "6",
      title: "الإجراءات التأديبية القانونية",
      description: "كيفية تطبيق الإجراءات التأديبية بطريقة قانونية سليمة",
      category: "procedures",
      readTime: "11 دقيقة",
      views: 1890,
      likes: 142,
      lastUpdated: "منذ 4 أيام"
    }
  ];

  const guides = [
    {
      id: "g1",
      title: "دليل نظام العمل السعودي",
      description: "دليل شامل يغطي جميع مواد نظام العمل ولوائحه التنفيذية",
      pages: 120,
      downloads: 3450,
      icon: Scale
    },
    {
      id: "g2",
      title: "دليل الإجراءات التأديبية",
      description: "خطوات تطبيق الإجراءات التأديبية بشكل قانوني",
      pages: 45,
      downloads: 2180,
      icon: FileCheck
    },
    {
      id: "g3",
      title: "دليل حساب المستحقات",
      description: "طرق احتساب جميع المستحقات المالية للموظفين",
      pages: 38,
      downloads: 2890,
      icon: FileText
    },
    {
      id: "g4",
      title: "دليل عقود العمل",
      description: "أنواع العقود وشروطها وكيفية صياغتها",
      pages: 52,
      downloads: 1950,
      icon: Briefcase
    }
  ];

  const templates = [
    {
      id: "t1",
      title: "عقد عمل محدد المدة",
      description: "قالب جاهز لعقد عمل محدد المدة",
      format: "DOCX",
      downloads: 1250
    },
    {
      id: "t2",
      title: "عقد عمل غير محدد المدة",
      description: "قالب جاهز لعقد عمل غير محدد المدة",
      format: "DOCX",
      downloads: 980
    },
    {
      id: "t3",
      title: "نموذج تقييم الأداء",
      description: "نموذج شامل لتقييم أداء الموظفين",
      format: "XLSX",
      downloads: 1540
    },
    {
      id: "t4",
      title: "نموذج إنذار كتابي",
      description: "قالب قانوني للإنذارات الكتابية",
      format: "DOCX",
      downloads: 890
    },
    {
      id: "t5",
      title: "خطاب إنهاء خدمات",
      description: "قالب لخطاب إنهاء الخدمات",
      format: "DOCX",
      downloads: 1120
    },
    {
      id: "t6",
      title: "نموذج طلب إجازة",
      description: "نموذج رسمي لطلبات الإجازات",
      format: "PDF",
      downloads: 760
    }
  ];

  const popularTopics = [
    "مكافأة نهاية الخدمة",
    "فترة التجربة",
    "الإجازات السنوية",
    "ساعات العمل",
    "الإنذارات",
    "الفصل التعسفي",
    "التأمينات الاجتماعية",
    "الأجور والرواتب"
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              <BookOpen className="ml-1 h-3 w-3" />
              قاعدة المعرفة
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              مكتبة شاملة للموارد البشرية
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              مقالات، أدلة، وقوالب جاهزة لمساعدتك في إدارة الموارد البشرية
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="ابحث في قاعدة المعرفة..." 
                className="pr-10 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-8 border-b bg-muted/30">
        <div className="container">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-sm text-muted-foreground">المواضيع الشائعة:</span>
            {popularTopics.map((topic, index) => (
              <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b bg-background sticky top-0 z-10 shadow-sm">
        <div className="container">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="flex-shrink-0"
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon className="ml-2 h-4 w-4" />
                {category.name}
                <Badge variant="secondary" className="mr-2">{category.count}</Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {selectedCategory === "all" && (
        <section className="py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">المقالات المميزة</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {articles.filter(a => a.featured).map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Badge className="w-fit mb-2">{categories.find(c => c.id === article.category)?.name}</Badge>
                    <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{article.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{article.views}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{article.likes}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/knowledge-base/${article.id}`}>
                        اقرأ المزيد
                        <ExternalLink className="mr-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              {selectedCategory === "all" ? "جميع المقالات" : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className="text-sm text-muted-foreground">
              {filteredArticles.length} مقال
            </div>
          </div>

          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{categories.find(c => c.id === article.category)?.name}</Badge>
                        {article.featured && <Badge>مميز</Badge>}
                      </div>
                      <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                      <CardDescription>{article.description}</CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{article.views} مشاهدة</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{article.likes} إعجاب</span>
                        </div>
                        <span>•</span>
                        <span>تم التحديث {article.lastUpdated}</span>
                      </div>
                    </div>
                    <Button asChild>
                      <Link href={`/knowledge-base/${article.id}`}>اقرأ</Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              الأدلة الإرشادية
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              أدلة شاملة ومفصلة لمساعدتك في فهم وتطبيق الأنظمة
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guides.map((guide) => (
              <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <guide.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{guide.pages} صفحة</span>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>{guide.downloads}</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Download className="ml-2 h-4 w-4" />
                    تحميل PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              القوالب والنماذج
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              قوالب جاهزة للاستخدام توفر عليك الوقت والجهد
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{template.title}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                    <Badge variant="secondary">{template.format}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Download className="h-4 w-4" />
                      <span>{template.downloads} تحميل</span>
                    </div>
                    <Button size="sm">
                      <Download className="ml-2 h-4 w-4" />
                      تحميل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            لم تجد ما تبحث عنه؟
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            احصل على استشارة مباشرة من خبرائنا
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/consulting">احجز استشارة</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
