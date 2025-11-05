import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Link, useParams } from "wouter";
import { Footer } from "@/components/Footer";

// Mock blog posts data (same as Blog.tsx)
const blogPosts = [
  {
    id: "1",
    title: "دليل شامل لحساب نهاية الخدمة وفق نظام العمل السعودي 2025",
    excerpt:
      "تعرف على كيفية حساب مستحقات نهاية الخدمة بدقة وفقاً لآخر التحديثات في نظام العمل السعودي",
    content: `
# دليل شامل لحساب نهاية الخدمة وفق نظام العمل السعودي 2025

نهاية الخدمة هي من أهم الحقوق التي كفلها نظام العمل السعودي للموظفين. في هذا الدليل الشامل، سنتناول كل ما تحتاج معرفته حول حساب مستحقات نهاية الخدمة.

## ما هي مكافأة نهاية الخدمة؟

مكافأة نهاية الخدمة هي مبلغ مالي يُدفع للموظف عند انتهاء علاقته الوظيفية مع صاحب العمل، سواء كان الإنهاء من قبل الموظف أو صاحب العمل. وهي حق مكفول بموجب المادة 84 من نظام العمل السعودي.

## كيفية حساب مكافأة نهاية الخدمة

يتم حساب المكافأة بناءً على عدة عوامل:

### 1. مدة الخدمة
- **الخمس سنوات الأولى:** نصف راتب شهر عن كل سنة
- **ما بعد الخمس سنوات:** راتب شهر كامل عن كل سنة

### 2. نوع العقد
- **عقد محدد المدة:** يستحق الموظف المكافأة كاملة
- **عقد غير محدد المدة:** يعتمد على سبب الإنهاء

### 3. سبب إنهاء الخدمة

#### إذا كان الإنهاء من قبل صاحب العمل:
- المكافأة كاملة في جميع الحالات

#### إذا كان الإنهاء من قبل الموظف:
- **أقل من سنتين:** لا يستحق مكافأة
- **من 2 إلى 5 سنوات:** يستحق ثلث المكافأة
- **من 5 إلى 10 سنوات:** يستحق ثلثي المكافأة
- **أكثر من 10 سنوات:** يستحق المكافأة كاملة

## أمثلة عملية

### مثال 1: موظف خدم 7 سنوات واستقال
- الراتب الأساسي: 10,000 ريال
- مدة الخدمة: 7 سنوات
- سبب الإنهاء: استقالة

**الحساب:**
- الخمس سنوات الأولى: 5 × (10,000 ÷ 2) = 25,000 ريال
- السنتان الإضافيتان: 2 × 10,000 = 20,000 ريال
- **المجموع:** 45,000 ريال
- **المستحق (ثلثي المكافأة):** 30,000 ريال

### مثال 2: موظف خدم 12 سنة وتم إنهاء خدمته
- الراتب الأساسي: 15,000 ريال
- مدة الخدمة: 12 سنة
- سبب الإنهاء: إنهاء من صاحب العمل

**الحساب:**
- الخمس سنوات الأولى: 5 × (15,000 ÷ 2) = 37,500 ريال
- السبع سنوات الإضافية: 7 × 15,000 = 105,000 ريال
- **المجموع:** 142,500 ريال
- **المستحق (كامل المكافأة):** 142,500 ريال

## الحالات الخاصة

### 1. الاستقالة لظروف قاهرة
إذا استقال الموظف بسبب:
- الزواج (للمرأة)
- الولادة (للمرأة)
- المرض
- القوة القاهرة

يستحق المكافأة كاملة بغض النظر عن مدة الخدمة.

### 2. الفصل التأديبي
لا يستحق الموظف أي مكافأة في حالات الفصل التأديبي المنصوص عليها في المادة 80 من نظام العمل.

## نصائح مهمة

1. **احتفظ بنسخة من عقد العمل:** لمعرفة تاريخ المباشرة الدقيق
2. **احسب المكافأة قبل الاستقالة:** لمعرفة المبلغ المستحق
3. **استشر محامي عمل:** في حالة النزاع مع صاحب العمل
4. **استخدم حاسبة رابِط:** للحصول على حساب دقيق ومتوافق مع النظام

## الخلاصة

مكافأة نهاية الخدمة حق مكفول لكل موظف في المملكة. فهم كيفية حسابها يساعدك على معرفة حقوقك والتخطيط المالي بشكل أفضل.

استخدم [حاسبة نهاية الخدمة](/end-of-service-calculator) من رابِط للحصول على حساب دقيق ومفصل لمستحقاتك.
    `,
    category: "نصائح HR",
    author: "أحمد محمد",
    authorRole: "خبير موارد بشرية",
    date: "2025-01-15",
    readTime: "8 دقائق",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    featured: true,
    likes: 245,
    comments: 32,
  },
  {
    id: "2",
    title: "التحديثات الجديدة في نظام العمل السعودي 2025",
    excerpt:
      "أهم التعديلات والتحديثات التي طرأت على نظام العمل السعودي في 2025",
    content: `
# التحديثات الجديدة في نظام العمل السعودي 2025

شهد نظام العمل السعودي عدة تحديثات مهمة في 2025. في هذا المقال، نستعرض أهم هذه التغييرات وتأثيرها على أصحاب العمل والموظفين.

## أبرز التحديثات

### 1. تنظيم العمل عن بُعد
تم إضافة فصل كامل ينظم العمل عن بُعد، يتضمن:
- حقوق وواجبات الموظف عن بُعد
- التزامات صاحب العمل
- ساعات العمل والراحة
- الأمن السيبراني وحماية البيانات

### 2. إجازة الأبوة
تم إقرار إجازة أبوة مدفوعة الأجر لمدة 3 أيام للموظف عند ولادة مولود جديد.

### 3. المرونة في ساعات العمل
السماح للشركات بتطبيق نظام ساعات العمل المرنة بموافقة الموظف.

## التأثير على الشركات

هذه التحديثات تتطلب من الشركات:
- تحديث سياسات الموارد البشرية
- تدريب المدراء على الأنظمة الجديدة
- تحديث العقود والسياسات الداخلية

## الخلاصة

التحديثات الجديدة تهدف لتحسين بيئة العمل وزيادة المرونة. على الشركات التكيف مع هذه التغييرات لضمان الامتثال القانوني.
    `,
    category: "نظام العمل",
    author: "فاطمة أحمد",
    authorRole: "محامية عمل",
    date: "2025-01-10",
    readTime: "6 دقائق",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    featured: true,
    likes: 189,
    comments: 24,
  },
];

export default function BlogPost() {
  const params = useParams();
  const postId = params.id;

  const post = blogPosts.find(p => p.id === postId);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">المقال غير موجود</h1>
          <Link href="/blog">
            <Button>العودة للمدونة</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== postId && p.category === post.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/blog">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <Link href="/">
              <span className="text-2xl font-bold gradient-text">رابِط</span>
            </Link>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setBookmarked(!bookmarked)}
          >
            <Bookmark
              className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`}
            />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Article */}
      <article className="py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.author}`}
                  />
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">
                    {post.author}
                  </div>
                  <div className="text-sm">{post.authorRole}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString("ar-SA")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="rounded-xl overflow-hidden mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <Card className="mb-8">
            <CardContent className="pt-8 prose prose-lg max-w-none text-right">
              <div
                className="leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: post.content.replace(/\n/g, "<br/>"),
                }}
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant={liked ? "default" : "outline"}
                    onClick={() => setLiked(!liked)}
                    className="gap-2"
                  >
                    <ThumbsUp
                      className={`h-4 w-4 ${liked ? "fill-current" : ""}`}
                    />
                    {post.likes + (liked ? 1 : 0)}
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    {post.comments}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground ml-2">
                    مشاركة:
                  </span>
                  <Button variant="outline" size="icon">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Author Bio */}
          <Card className="mb-8 bg-gradient-to-br from-blue-50 to-purple-50 border-0">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.author}`}
                  />
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{post.author}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {post.authorRole}
                  </p>
                  <p className="text-sm leading-relaxed">
                    {post.authorRole === "خبير موارد بشرية"
                      ? "خبير في مجال الموارد البشرية مع أكثر من 10 سنوات من الخبرة في تطبيق أنظمة العمل السعودية."
                      : "محامية متخصصة في قضايا العمل والموارد البشرية في المملكة العربية السعودية."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">مقالات ذات صلة</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                      <CardContent className="pt-4">
                        <Badge className="mb-2">{relatedPost.category}</Badge>
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {relatedPost.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {relatedPost.readTime}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Footer */}
      <Footer />
    </div>
  );
}
