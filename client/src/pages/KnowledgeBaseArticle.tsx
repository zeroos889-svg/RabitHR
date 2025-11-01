import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Eye,
  ThumbsUp,
  Share2,
  Bookmark,
  ArrowRight,
  FileText,
  Download,
} from "lucide-react";
import { Footer } from "@/components/Footer";

const articlesData: Record<string, any> = {
  "1": {
    id: 1,
    title: "دليل شامل لنظام العمل السعودي 2024",
    category: "نظام العمل",
    author: "فريق رابِط القانوني",
    publishDate: "2024-01-15",
    readTime: "15 دقيقة",
    views: 2450,
    likes: 189,
    content: `
# دليل شامل لنظام العمل السعودي 2024

## مقدمة

يُعد نظام العمل السعودي الصادر بالمرسوم الملكي رقم (م/51) وتاريخ 23/8/1426هـ، الإطار القانوني الذي ينظم العلاقة بين أصحاب العمل والعمال في المملكة العربية السعودية.

## أهم التحديثات في 2024

### 1. ساعات العمل

- الحد الأقصى لساعات العمل: 8 ساعات يومياً أو 48 ساعة أسبوعياً
- في شهر رمضان: 6 ساعات يومياً أو 36 ساعة أسبوعياً
- ساعات العمل الإضافية: تُحتسب بأجر إضافي لا يقل عن 50% من الأجر الأساسي

### 2. الإجازات السنوية

- **الإجازة السنوية:**
  - 21 يوماً للعامل الذي أمضى أقل من 5 سنوات
  - 30 يوماً للعامل الذي أمضى 5 سنوات فأكثر

- **الإجازات الرسمية:**
  - إجازة عيد الفطر
  - إجازة عيد الأضحى
  - اليوم الوطني
  - يوم التأسيس

### 3. إنهاء عقد العمل

#### إنهاء العقد من قبل صاحب العمل:

- **بسبب مشروع:**
  - الاستقالة
  - انتهاء مدة العقد
  - بلوغ سن التقاعد

- **بدون سبب مشروع:**
  - يحق للعامل الحصول على تعويض
  - التعويض = أجر 15 يوماً عن كل سنة خدمة

#### إنهاء العقد من قبل العامل:

- يجب إشعار صاحب العمل قبل 30 يوماً على الأقل
- في حالة عدم الإشعار، يحق لصاحب العمل خصم أجر مدة الإشعار

### 4. مكافأة نهاية الخدمة

تُحسب مكافأة نهاية الخدمة على النحو التالي:

- **للسنوات الخمس الأولى:** أجر نصف شهر عن كل سنة
- **بعد السنوات الخمس:** أجر شهر عن كل سنة

**ملاحظة:** في حالة استقالة العامل:
- أقل من سنتين: لا يستحق مكافأة
- من 2 إلى 5 سنوات: يستحق ثلث المكافأة
- من 5 إلى 10 سنوات: يستحق ثلثي المكافأة
- أكثر من 10 سنوات: يستحق المكافأة كاملة

## حقوق العامل الأساسية

### 1. الأجور

- يجب دفع الأجر بالعملة الرسمية (الريال السعودي)
- الحد الأدنى للأجور: 4000 ريال شهرياً
- يجب دفع الأجر في موعد لا يتجاوز اليوم الخامس من الشهر التالي

### 2. بيئة العمل

- توفير بيئة عمل آمنة وصحية
- توفير معدات الوقاية الشخصية
- التأمين الصحي للعامل وعائلته

### 3. التأمينات الاجتماعية

- الاشتراك في نظام التأمينات الاجتماعية إلزامي
- نسبة اشتراك صاحب العمل: 12%
- نسبة اشتراك العامل: 10%

## واجبات العامل

1. أداء العمل بإخلاص وأمانة
2. الالتزام بتعليمات صاحب العمل
3. المحافظة على ممتلكات صاحب العمل
4. عدم إفشاء أسرار العمل
5. الالتزام بمواعيد العمل

## العقوبات التأديبية

يحق لصاحب العمل توقيع العقوبات التالية:

1. **الإنذار الكتابي**
2. **الخصم من الأجر** (بحد أقصى 5 أيام شهرياً)
3. **الحرمان من العلاوة** أو تأجيلها
4. **الوقف عن العمل** مع الحرمان من الأجر (بحد أقصى 5 أيام)
5. **الفصل من العمل** (في حالات محددة)

## حالات الفصل بدون مكافأة أو إشعار

يجوز لصاحب العمل فصل العامل دون إشعار أو مكافأة في الحالات التالية:

1. انتحال شخصية أو تقديم شهادات مزورة
2. ارتكاب خطأ نشأت عنه خسارة مادية جسيمة
3. عدم مراعاة التعليمات اللازمة لسلامة العمال أو المنشأة
4. الغياب بدون سبب مشروع أكثر من 30 يوماً خلال السنة أو 15 يوماً متتالية
5. الاعتداء على صاحب العمل أو المدير المسؤول
6. إفشاء أسرار العمل

## نصائح للشركات

### 1. التوثيق

- احتفظ بنسخة من عقد العمل موقعة من الطرفين
- وثّق جميع الإنذارات والعقوبات كتابياً
- احتفظ بسجلات الحضور والانصراف

### 2. الامتثال

- التزم بدفع الأجور في مواعيدها
- سجّل العمال في التأمينات الاجتماعية
- وفّر بيئة عمل آمنة

### 3. التواصل

- وضّح حقوق وواجبات العمال
- استمع لشكاوى العمال وعالجها
- حافظ على قنوات تواصل مفتوحة

## الخلاصة

نظام العمل السعودي يوازن بين حقوق وواجبات كل من صاحب العمل والعامل. الالتزام بأحكام النظام يضمن بيئة عمل صحية ومنتجة للجميع.

## مصادر إضافية

- [وزارة الموارد البشرية والتنمية الاجتماعية](https://hrsd.gov.sa)
- [المؤسسة العامة للتأمينات الاجتماعية](https://www.gosi.gov.sa)
- [منصة قوى](https://qiwa.sa)

---

*آخر تحديث: يناير 2024*
    `,
    relatedArticles: [
      {
        id: 2,
        title: "كيفية كتابة عقد عمل متوافق مع نظام العمل",
        category: "العقود",
        readTime: "10 دقائق",
      },
      {
        id: 3,
        title: "دليل إنهاء الخدمة وحساب المستحقات",
        category: "إنهاء الخدمة",
        readTime: "12 دقيقة",
      },
    ],
  },
};

export default function KnowledgeBaseArticle() {
  const params = useParams();
  const articleId = params.id || "1";
  const article = articlesData[articleId] || articlesData["1"];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-12">
        <div className="container max-w-4xl">
          <Link href="/knowledge-base">
            <Button variant="ghost" className="mb-4">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة إلى قاعدة المعرفة
            </Button>
          </Link>

          <Badge className="mb-4">{article.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-medium">{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{article.views} مشاهدة</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4" />
              <span>{article.likes} إعجاب</span>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Button variant="outline" size="sm">
              <ThumbsUp className="ml-2 h-4 w-4" />
              أعجبني
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="ml-2 h-4 w-4" />
              حفظ
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="ml-2 h-4 w-4" />
              مشاركة
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 flex-1">
        <div className="container max-w-4xl">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="pt-6 prose prose-lg max-w-none">
                  <div
                    className="article-content"
                    dangerouslySetInnerHTML={{
                      __html: article.content
                        .split("\n")
                        .map((line: string) => {
                          if (line.startsWith("# ")) {
                            return `<h1 class="text-3xl font-bold mt-8 mb-4">${line.substring(2)}</h1>`;
                          } else if (line.startsWith("## ")) {
                            return `<h2 class="text-2xl font-bold mt-6 mb-3">${line.substring(3)}</h2>`;
                          } else if (line.startsWith("### ")) {
                            return `<h3 class="text-xl font-bold mt-4 mb-2">${line.substring(4)}</h3>`;
                          } else if (line.startsWith("#### ")) {
                            return `<h4 class="text-lg font-bold mt-3 mb-2">${line.substring(5)}</h4>`;
                          } else if (line.startsWith("- ")) {
                            return `<li class="mr-6">${line.substring(2)}</li>`;
                          } else if (line.startsWith("**") && line.endsWith("**")) {
                            return `<p class="font-bold">${line.substring(2, line.length - 2)}</p>`;
                          } else if (line.trim() === "---") {
                            return `<hr class="my-8 border-gray-200" />`;
                          } else if (line.startsWith("*") && line.endsWith("*")) {
                            return `<p class="text-sm text-gray-600 italic">${line.substring(1, line.length - 1)}</p>`;
                          } else if (line.trim() !== "") {
                            return `<p class="mb-4">${line}</p>`;
                          }
                          return "";
                        })
                        .join(""),
                    }}
                  />
                </CardContent>
              </Card>

              {/* Related Articles */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4">مقالات ذات صلة</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {article.relatedArticles.map((related: any) => (
                    <Link key={related.id} href={`/knowledge-base/${related.id}`}>
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="pt-6">
                          <Badge className="mb-2">{related.category}</Badge>
                          <h4 className="font-bold mb-2">{related.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{related.readTime}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <h4 className="font-bold mb-4">تحميل المستندات</h4>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Download className="ml-2 h-4 w-4" />
                    تحميل PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileText className="ml-2 h-4 w-4" />
                    نسخة Word
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-bold mb-4">محتويات المقال</h4>
                  <div className="space-y-2 text-sm">
                    <a href="#" className="block text-blue-600 hover:underline">
                      مقدمة
                    </a>
                    <a href="#" className="block text-blue-600 hover:underline">
                      أهم التحديثات
                    </a>
                    <a href="#" className="block text-blue-600 hover:underline">
                      حقوق العامل
                    </a>
                    <a href="#" className="block text-blue-600 hover:underline">
                      واجبات العامل
                    </a>
                    <a href="#" className="block text-blue-600 hover:underline">
                      العقوبات التأديبية
                    </a>
                    <a href="#" className="block text-blue-600 hover:underline">
                      نصائح للشركات
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
