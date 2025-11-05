import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Clock,
  Users,
  Award,
  CheckCircle,
  Play,
  FileText,
  Download,
  Share2,
  BookOpen,
  Video,
  MessageSquare,
} from "lucide-react";
import { Footer } from "@/components/Footer";

const coursesData: Record<string, any> = {
  "1": {
    id: 1,
    title: "أساسيات الموارد البشرية",
    description: "دورة شاملة تغطي جميع أساسيات إدارة الموارد البشرية للمبتدئين",
    category: "الأساسيات",
    level: "مبتدئ",
    duration: "12 ساعة",
    lessons: 24,
    students: 1250,
    rating: 4.8,
    reviews: 156,
    price: 499,
    instructor: {
      name: "د. سارة الأحمدي",
      title: "خبيرة موارد بشرية",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
      bio: "خبيرة في الموارد البشرية مع أكثر من 15 عاماً من الخبرة",
    },
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    whatYouLearn: [
      "فهم شامل لوظائف الموارد البشرية",
      "كيفية إدارة دورة حياة الموظف",
      "أساسيات التوظيف والاختيار",
      "إدارة الأداء والتطوير",
      "قوانين العمل الأساسية",
      "التعامل مع النزاعات العمالية",
    ],
    curriculum: [
      {
        title: "المقدمة والأساسيات",
        lessons: [
          {
            title: "مرحباً بك في الدورة",
            duration: "5 دقائق",
            type: "video",
            free: true,
          },
          {
            title: "ما هي الموارد البشرية؟",
            duration: "15 دقيقة",
            type: "video",
            free: true,
          },
          {
            title: "وظائف الموارد البشرية",
            duration: "20 دقيقة",
            type: "video",
            free: false,
          },
          {
            title: "اختبار الوحدة الأولى",
            duration: "10 دقائق",
            type: "quiz",
            free: false,
          },
        ],
      },
      {
        title: "التوظيف والاختيار",
        lessons: [
          {
            title: "عملية التوظيف",
            duration: "25 دقيقة",
            type: "video",
            free: false,
          },
          {
            title: "كتابة الإعلانات الوظيفية",
            duration: "20 دقيقة",
            type: "video",
            free: false,
          },
          {
            title: "إجراء المقابلات",
            duration: "30 دقيقة",
            type: "video",
            free: false,
          },
          {
            title: "اختبار الوحدة الثانية",
            duration: "15 دقيقة",
            type: "quiz",
            free: false,
          },
        ],
      },
      {
        title: "إدارة الأداء",
        lessons: [
          {
            title: "أنظمة تقييم الأداء",
            duration: "25 دقيقة",
            type: "video",
            free: false,
          },
          {
            title: "تحديد الأهداف",
            duration: "20 دقيقة",
            type: "video",
            free: false,
          },
          {
            title: "التغذية الراجعة",
            duration: "20 دقيقة",
            type: "video",
            free: false,
          },
          {
            title: "اختبار الوحدة الثالثة",
            duration: "10 دقائق",
            type: "quiz",
            free: false,
          },
        ],
      },
      {
        title: "قوانين العمل",
        lessons: [
          {
            title: "نظام العمل السعودي",
            duration: "30 دقيقة",
            type: "video",
            free: false,
          },
          {
            title: "حقوق الموظفين",
            duration: "25 دقيقة",
            type: "video",
            free: false,
          },
          {
            title: "إنهاء الخدمة",
            duration: "20 دقيقة",
            type: "video",
            free: false,
          },
          {
            title: "الاختبار النهائي",
            duration: "20 دقائق",
            type: "quiz",
            free: false,
          },
        ],
      },
    ],
    requirements: [
      "لا يوجد متطلبات مسبقة",
      "الرغبة في التعلم والتطوير",
      "جهاز كمبيوتر أو هاتف ذكي",
    ],
    features: [
      "وصول مدى الحياة",
      "شهادة إتمام",
      "دعم فني مباشر",
      "مواد قابلة للتحميل",
      "اختبارات تفاعلية",
    ],
  },
};

export default function CourseDetail() {
  const params = useParams();
  const courseId = params.id || "1";
  const course = coursesData[courseId] || coursesData["1"];

  const totalDuration = course.curriculum.reduce(
    (acc: number, section: any) =>
      acc +
      section.lessons.reduce((sum: number, lesson: any) => {
        const mins = parseInt(lesson.duration);
        return sum + (isNaN(mins) ? 0 : mins);
      }, 0),
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Badge className="mb-4 bg-white text-blue-600">
                {course.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-xl mb-6 text-blue-50">{course.description}</p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{course.rating}</span>
                  <span className="text-blue-50">({course.reviews} تقييم)</span>
                </div>
                <div className="flex items-center gap-2 text-blue-50">
                  <Users className="h-5 w-5" />
                  <span>{course.students} طالب</span>
                </div>
                <div className="flex items-center gap-2 text-blue-50">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-50">
                  <BookOpen className="h-5 w-5" />
                  <span>{course.lessons} درس</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={course.instructor.image}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <div>
                  <p className="font-medium">{course.instructor.name}</p>
                  <p className="text-sm text-blue-50">
                    {course.instructor.title}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-0">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6 space-y-4">
                    <div className="text-center py-4 border-b">
                      <span className="text-3xl font-bold text-blue-600">
                        {course.price} ﷼
                      </span>
                    </div>

                    <Button className="w-full" size="lg">
                      سجل الآن
                    </Button>

                    <div className="space-y-2 text-sm">
                      {course.features.map((feature: string) => (
                        <div key={feature} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Share2 className="ml-2 h-4 w-4" />
                        مشاركة
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <MessageSquare className="ml-2 h-4 w-4" />
                        سؤال
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 flex-1">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                  <TabsTrigger value="curriculum">المنهج</TabsTrigger>
                  <TabsTrigger value="instructor">المدرب</TabsTrigger>
                  <TabsTrigger value="reviews">التقييمات</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-bold">ماذا ستتعلم</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.whatYouLearn.map((item: string) => (
                          <div key={item} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-bold">المتطلبات</h3>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {course.requirements.map((req: string) => (
                          <li key={req} className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-bold">الوصف</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">
                        {course.description}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="curriculum" className="space-y-4 mt-6">
                  {course.curriculum.map((section: any, index: number) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold">{section.title}</h3>
                          <span className="text-sm text-gray-500">
                            {section.lessons.length} دروس
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {section.lessons.map(
                            (lesson: any, lessonIndex: number) => (
                              <div
                                key={lessonIndex}
                                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  {lesson.type === "video" ? (
                                    <Video className="h-5 w-5 text-blue-600" />
                                  ) : (
                                    <FileText className="h-5 w-5 text-green-600" />
                                  )}
                                  <span>{lesson.title}</span>
                                  {lesson.free && (
                                    <Badge variant="secondary">مجاني</Badge>
                                  )}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {lesson.duration}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="instructor" className="space-y-6 mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={course.instructor.image}
                          alt={course.instructor.name}
                          className="w-20 h-20 rounded-full"
                        />
                        <div>
                          <h3 className="text-xl font-bold mb-1">
                            {course.instructor.name}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {course.instructor.title}
                          </p>
                          <p className="text-gray-700">
                            {course.instructor.bio}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6 mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-gray-500">
                        لا توجد تقييمات بعد
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="font-bold">تفاصيل الدورة</h3>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">المستوى</span>
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">المدة الإجمالية</span>
                    <span className="font-medium">{totalDuration} دقيقة</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">عدد الدروس</span>
                    <span className="font-medium">{course.lessons}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">الطلاب</span>
                    <span className="font-medium">{course.students}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="font-bold">المواد المرفقة</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="ml-2 h-4 w-4" />
                    ملف المنهج (PDF)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="ml-2 h-4 w-4" />
                    ملخص الدورة (PDF)
                  </Button>
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
