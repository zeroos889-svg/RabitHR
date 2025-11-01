import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Search,
  ChevronLeft,
  Calendar,
  Clock,
  User,
  ArrowLeft,
  TrendingUp,
  FileText,
  Users,
  Briefcase,
  Scale,
  Lightbulb
} from 'lucide-react';
import { Link } from 'wouter';

// Blog Categories
const categories = [
  { id: 'all', name: 'الكل', icon: BookOpen, color: 'from-blue-500 to-indigo-600' },
  { id: 'hr-tips', name: 'نصائح HR', icon: Lightbulb, color: 'from-yellow-500 to-orange-600' },
  { id: 'labor-law', name: 'نظام العمل', icon: Scale, color: 'from-purple-500 to-pink-600' },
  { id: 'recruitment', name: 'التوظيف', icon: Users, color: 'from-green-500 to-emerald-600' },
  { id: 'management', name: 'الإدارة', icon: Briefcase, color: 'from-red-500 to-rose-600' },
  { id: 'news', name: 'أخبار', icon: TrendingUp, color: 'from-teal-500 to-cyan-600' },
];

// Mock Blog Posts
const blogPosts = [
  {
    id: 1,
    title: 'دليلك الشامل لحساب نهاية الخدمة وفق نظام العمل السعودي 2024',
    excerpt: 'تعرف على كيفية حساب مكافأة نهاية الخدمة بشكل صحيح وفق المادة 84 من نظام العمل السعودي، مع أمثلة عملية وحالات خاصة.',
    category: 'labor-law',
    categoryName: 'نظام العمل',
    author: 'فريق رابِط',
    date: '2024-01-15',
    readTime: '8 دقائق',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
    featured: true
  },
  {
    id: 2,
    title: '10 أخطاء شائعة في إدارة الموارد البشرية وكيفية تجنبها',
    excerpt: 'اكتشف الأخطاء الأكثر شيوعاً التي تقع فيها أقسام الموارد البشرية وتعلم كيفية تجنبها لتحسين كفاءة فريقك.',
    category: 'hr-tips',
    categoryName: 'نصائح HR',
    author: 'سارة أحمد',
    date: '2024-01-12',
    readTime: '6 دقائق',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    featured: true
  },
  {
    id: 3,
    title: 'كيف تبني نظام توظيف فعال باستخدام ATS',
    excerpt: 'خطوات عملية لبناء نظام تتبع المتقدمين (ATS) يوفر وقتك ويساعدك في اختيار أفضل المرشحين لشركتك.',
    category: 'recruitment',
    categoryName: 'التوظيف',
    author: 'محمد الغامدي',
    date: '2024-01-10',
    readTime: '10 دقائق',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop',
    featured: true
  },
  {
    id: 4,
    title: 'التحديثات الجديدة في نظام العمل السعودي لعام 2024',
    excerpt: 'ملخص شامل لأهم التعديلات والتحديثات على نظام العمل السعودي وتأثيرها على الشركات والموظفين.',
    category: 'news',
    categoryName: 'أخبار',
    author: 'فريق رابِط',
    date: '2024-01-08',
    readTime: '7 دقائق',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop',
    featured: false
  },
  {
    id: 5,
    title: 'أنواع الإجازات في نظام العمل السعودي وكيفية حسابها',
    excerpt: 'دليل مفصل لجميع أنواع الإجازات المتاحة للموظفين في السعودية وطريقة احتسابها وفق النظام.',
    category: 'labor-law',
    categoryName: 'نظام العمل',
    author: 'نورة العتيبي',
    date: '2024-01-05',
    readTime: '9 دقائق',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=400&fit=crop',
    featured: false
  },
  {
    id: 6,
    title: 'كيف تكتب خطاب توظيف احترافي يجذب أفضل المواهب',
    excerpt: 'نصائح عملية وأمثلة لكتابة خطابات توظيف فعالة تعكس احترافية شركتك وتجذب المرشحين المميزين.',
    category: 'recruitment',
    categoryName: 'التوظيف',
    author: 'خالد السعيد',
    date: '2024-01-03',
    readTime: '5 دقائق',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop',
    featured: false
  },
  {
    id: 7,
    title: 'استراتيجيات فعالة لتحسين رضا الموظفين والاحتفاظ بهم',
    excerpt: 'تعرف على أفضل الممارسات والاستراتيجيات التي تساعدك في بناء بيئة عمل إيجابية وتقليل معدل دوران الموظفين.',
    category: 'management',
    categoryName: 'الإدارة',
    author: 'ريم المطيري',
    date: '2024-01-01',
    readTime: '8 دقائق',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
    featured: false
  },
  {
    id: 8,
    title: 'الذكاء الاصطناعي في الموارد البشرية: الحاضر والمستقبل',
    excerpt: 'كيف يغير الذكاء الاصطناعي مجال الموارد البشرية وما هي الأدوات التي يمكنك استخدامها اليوم.',
    category: 'hr-tips',
    categoryName: 'نصائح HR',
    author: 'فريق رابِط',
    date: '2023-12-28',
    readTime: '11 دقيقة',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    featured: false
  },
  {
    id: 9,
    title: 'حقوق الموظف عند إنهاء العقد: ما يجب أن تعرفه',
    excerpt: 'دليل شامل لحقوق الموظف القانونية عند إنهاء عقد العمل، سواء كان الإنهاء من الموظف أو صاحب العمل.',
    category: 'labor-law',
    categoryName: 'نظام العمل',
    author: 'عبدالله الشمري',
    date: '2023-12-25',
    readTime: '7 دقائق',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    featured: false
  }
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter posts
  const filteredPosts = blogPosts.filter(post =>
    (selectedCategory === 'all' || post.category === selectedCategory) &&
    (searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1 text-center">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              مدونة رابِط
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              مقالات ونصائح حول الموارد البشرية ونظام العمل السعودي
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="ابحث في المقالات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 text-right"
              />
            </div>
          </CardContent>
        </Card>

        {/* Category Filters */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className={`flex-shrink-0 gap-2 ${
                selectedCategory === category.id ? `bg-gradient-to-r ${category.color}` : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <category.icon className="h-4 w-4" />
              {category.name}
            </Button>
          ))}
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              مقالات مميزة
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 right-4 bg-blue-600">
                        {post.categoryName}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.date).toLocaleDateString('ar-SA')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <Button variant="ghost" className="mt-4 w-full group-hover:bg-blue-50">
                        اقرأ المزيد
                        <ArrowLeft className="mr-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
              جميع المقالات
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 right-3 bg-purple-600 text-xs">
                        {post.categoryName}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg group-hover:text-purple-600 transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">لم نجد مقالات</h3>
              <p className="text-muted-foreground">
                جرب البحث بكلمات مختلفة أو اختر فئة أخرى
              </p>
            </CardContent>
          </Card>
        )}

        {/* Newsletter CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">اشترك في النشرة البريدية</h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              احصل على أحدث المقالات والنصائح مباشرة في بريدك الإلكتروني
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <Input
                placeholder="بريدك الإلكتروني"
                className="bg-white text-gray-900 text-right"
              />
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 flex-shrink-0">
                اشترك الآن
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
