import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  MapPin,
  Briefcase,
  Award,
  Calendar,
  MessageSquare,
  Video,
  Phone,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  BookOpen,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Footer } from "@/components/Footer";

// بيانات المستشارين (نفس البيانات من صفحة المستشارين)
const expertsData: Record<string, any> = {
  "1": {
    id: 1,
    name: "د. أحمد المالكي",
    title: "مستشار موارد بشرية أول",
    specialties: ["نظام العمل", "العقود", "إنهاء الخدمة"],
    experience: "15+ سنة",
    rating: 4.9,
    reviews: 245,
    consultations: 1200,
    location: "الرياض",
    price: 500,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad",
    availability: "متاح الآن",
    languages: ["العربية", "الإنجليزية"],
    bio: "مستشار موارد بشرية معتمد مع خبرة تزيد عن 15 عاماً في مجال الموارد البشرية ونظام العمل السعودي. حاصل على ماجستير في إدارة الموارد البشرية من جامعة الملك سعود، وشهادات مهنية من SHRM و CIPD.",
    education: [
      "ماجستير في إدارة الموارد البشرية - جامعة الملك سعود",
      "بكالوريوس في إدارة الأعمال - جامعة الملك فهد",
    ],
    certifications: [
      "SHRM-SCP - Senior Certified Professional",
      "CIPD Level 7 - Strategic HR Management",
      "مستشار معتمد في نظام العمل السعودي",
    ],
    expertise: [
      "صياغة ومراجعة عقود العمل",
      "إنهاء الخدمة وحساب المستحقات",
      "حل النزاعات العمالية",
      "الامتثال لنظام العمل السعودي",
      "سياسات وإجراءات الموارد البشرية",
    ],
    achievements: [
      "ساعد أكثر من 500 شركة في تحسين سياسات الموارد البشرية",
      "حل أكثر من 200 نزاع عمالي بنجاح",
      "مدرب معتمد لأكثر من 50 دورة تدريبية",
    ],
    reviews_list: [
      {
        name: "محمد العتيبي",
        company: "شركة التقنية المتقدمة",
        rating: 5,
        comment:
          "استشارة ممتازة! ساعدني د. أحمد في حل مشكلة معقدة مع أحد الموظفين بطريقة احترافية ومتوافقة مع النظام.",
        date: "منذ أسبوعين",
      },
      {
        name: "فاطمة الغامدي",
        company: "مؤسسة النجاح",
        rating: 5,
        comment:
          "خبرة عميقة في نظام العمل. راجع جميع عقودنا وقدم توصيات قيمة جداً.",
        date: "منذ شهر",
      },
      {
        name: "خالد السديري",
        company: "مجموعة الرياض التجارية",
        rating: 4,
        comment: "مستشار محترف وسريع الاستجابة. أنصح بالتعامل معه.",
        date: "منذ شهرين",
      },
    ],
  },
  // يمكن إضافة باقي المستشارين هنا
};

export default function ConsultingExpertProfile() {
  const params = useParams();
  const expertId = params.id || "1";
  const expert = expertsData[expertId] || expertsData["1"];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src={expert.image}
                alt={expert.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {expert.name}
              </h1>
              <p className="text-xl mb-4 text-blue-50">{expert.title}</p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{expert.rating}</span>
                  <span className="text-blue-50">({expert.reviews} تقييم)</span>
                </div>
                <div className="flex items-center gap-2 text-blue-50">
                  <Users className="h-5 w-5" />
                  <span>{expert.consultations}+ استشارة</span>
                </div>
                <div className="flex items-center gap-2 text-blue-50">
                  <Briefcase className="h-5 w-5" />
                  <span>{expert.experience} خبرة</span>
                </div>
                <div className="flex items-center gap-2 text-blue-50">
                  <MapPin className="h-5 w-5" />
                  <span>{expert.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {expert.specialties.map((specialty: string) => (
                  <Badge
                    key={specialty}
                    variant="secondary"
                    className="bg-white text-blue-600"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Calendar className="h-5 w-5 text-green-300" />
                <span className="font-medium text-green-300">
                  {expert.availability}
                </span>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/consulting/book">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    احجز استشارة ({expert.price} ﷼/ساعة)
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <MessageSquare className="ml-2 h-5 w-5" />
                  تواصل مباشر
                </Button>
              </div>
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
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="about">نبذة</TabsTrigger>
                  <TabsTrigger value="expertise">الخبرات</TabsTrigger>
                  <TabsTrigger value="education">التعليم</TabsTrigger>
                  <TabsTrigger value="reviews">التقييمات</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-bold">نبذة عني</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">
                        {expert.bio}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-bold">الإنجازات</h3>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {expert.achievements.map(
                          (achievement: string, index: number) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span>{achievement}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="expertise" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-bold">مجالات الخبرة</h3>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {expert.expertise.map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="education" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-bold">المؤهلات الأكاديمية</h3>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {expert.education.map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <BookOpen className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-bold">الشهادات المهنية</h3>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {expert.certifications.map(
                          (item: string, index: number) => (
                            <li key={index} className="flex items-start gap-3">
                              <Award className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6 mt-6">
                  {expert.reviews_list.map((review: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.name}`}
                            alt={review.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-bold">{review.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {review.company}
                                </p>
                              </div>
                              <span className="text-sm text-gray-500">
                                {review.date}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-bold">احجز استشارة</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4 border-b">
                    <span className="text-3xl font-bold text-blue-600">
                      {expert.price} ﷼
                    </span>
                    <span className="text-gray-500 mr-2">/ ساعة</span>
                  </div>

                  <Link href="/consulting/book">
                    <Button className="w-full" size="lg">
                      احجز الآن
                    </Button>
                  </Link>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>استجابة خلال 24 ساعة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>ضمان استرجاع المبلغ</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>تقرير مفصل بعد الاستشارة</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card>
                <CardHeader>
                  <h3 className="font-bold">اللغات</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {expert.languages.map((lang: string) => (
                      <Badge key={lang} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card>
                <CardHeader>
                  <h3 className="font-bold">وقت الاستجابة</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-green-600">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">عادة خلال ساعة واحدة</span>
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
