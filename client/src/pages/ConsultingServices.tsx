import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from 'wouter';
import {
  CheckCircle2,
  Users,
  Briefcase,
  TrendingUp,
  Award,
  Clock,
  DollarSign,
  ArrowRight,
  Star,
} from 'lucide-react';

interface ConsultingService {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  icon: React.ReactNode;
  features: string[];
  testimonials: Array<{
    name: string;
    role: string;
    text: string;
    rating: number;
  }>;
  bookingUrl: string;
}

const services: ConsultingService[] = [
  {
    id: 'hr-strategy',
    title: 'استشارة إستراتيجية الموارد البشرية',
    description: 'تطوير استراتيجية HR شاملة متوافقة مع أهداف الشركة',
    price: 2500,
    duration: '3 ساعات',
    icon: <TrendingUp className="w-8 h-8" />,
    features: [
      'تحليل الوضع الحالي للموارد البشرية',
      'تطوير خطة استراتيجية مخصصة',
      'تحديد المؤشرات الرئيسية (KPIs)',
      'خطة التنفيذ والمراقبة',
      'دعم ما بعد الاستشارة لمدة شهر',
    ],
    testimonials: [
      {
        name: 'محمد السعيد',
        role: 'مدير الموارد البشرية',
        text: 'استشارة قيمة جداً ساعدتنا على تنظيم عملياتنا بشكل احترافي',
        rating: 5,
      },
    ],
    bookingUrl: '/consulting/book',
  },
  {
    id: 'recruitment',
    title: 'استشارة نظام التوظيف والاختيار',
    description: 'بناء نظام توظيف فعال واختيار المواهب المناسبة',
    price: 2000,
    duration: '2.5 ساعة',
    icon: <Users className="w-8 h-8" />,
    features: [
      'تصميم عملية التوظيف',
      'إعداد معايير الاختيار',
      'تدريب فريق المقابلات',
      'نماذج وأدوات التقييم',
      'استراتيجية البحث عن المواهب',
    ],
    testimonials: [
      {
        name: 'فاطمة الأحمد',
        role: 'مديرة التطوير',
        text: 'ساعدتنا على تحسين جودة التوظيف بشكل ملحوظ',
        rating: 5,
      },
    ],
    bookingUrl: '/consulting/book',
  },
  {
    id: 'employee-relations',
    title: 'استشارة علاقات الموظفين والأداء',
    description: 'تحسين بيئة العمل وإدارة الأداء والمشاكل السلوكية',
    price: 1800,
    duration: '2 ساعة',
    icon: <Briefcase className="w-8 h-8" />,
    features: [
      'تقييم ثقافة الشركة',
      'نظام إدارة الأداء',
      'معالجة النزاعات والشكاوى',
      'برامج تحفيز الموظفين',
      'سياسات الانضباط والعقوبات',
    ],
    testimonials: [
      {
        name: 'علي الدعيع',
        role: 'مدير عام',
        text: 'تحسنت معنويات الموظفين بشكل كبير بعد تطبيق التوصيات',
        rating: 5,
      },
    ],
    bookingUrl: '/consulting/book',
  },
  {
    id: 'training-development',
    title: 'استشارة التدريب والتطوير الوظيفي',
    description: 'بناء برامج تدريب فعالة وخطط تطوير الموظفين',
    price: 1600,
    duration: '2 ساعة',
    icon: <Award className="w-8 h-8" />,
    features: [
      'تحديد احتياجات التدريب',
      'تصميم برامج تدريبية',
      'خطط التطور الوظيفي',
      'قياس فعالية التدريب',
      'بناء قيادات داخلية',
    ],
    testimonials: [
      {
        name: 'نور الحسن',
        role: 'مدير الموارد البشرية',
        text: 'برامج التدريب أصبحت أكثر فعالية وملاءمة لاحتياجات الشركة',
        rating: 5,
      },
    ],
    bookingUrl: '/consulting/book',
  },
  {
    id: 'compliance-legal',
    title: 'استشارة الامتثال القانوني والعمالي',
    description: 'ضمان الامتثال للقوانين والأنظمة السعودية',
    price: 2200,
    duration: '2.5 ساعة',
    icon: <CheckCircle2 className="w-8 h-8" />,
    features: [
      'مراجعة السياسات والإجراءات',
      'الامتثال لنظام العمل السعودي',
      'معالجة المشاكل القانونية',
      'توثيق العقود والاتفاقيات',
      'تدريب على الالتزامات القانونية',
    ],
    testimonials: [
      {
        name: 'خالد الراشد',
        role: 'مدير العمليات',
        text: 'أصبحنا متأكدين من الامتثال الكامل للقوانين',
        rating: 5,
      },
    ],
    bookingUrl: '/consulting/book',
  },
  {
    id: 'transformation',
    title: 'استشارة تحول الموارد البشرية الرقمي',
    description: 'تحديث أنظمة الموارد البشرية والتحول الرقمي',
    price: 3000,
    duration: '4 ساعات',
    icon: <TrendingUp className="w-8 h-8" />,
    features: [
      'تقييم الأنظمة الحالية',
      'اختيار الحلول الرقمية المناسبة',
      'خطة التنفيذ والهجرة',
      'تدريب الفريق',
      'دعم ما بعد التنفيذ',
    ],
    testimonials: [
      {
        name: 'سارة الشمري',
        role: 'مديرة المشاريع',
        text: 'تحول رقمي ناجح وسلس مع دعم احترافي طوال الطريق',
        rating: 5,
      },
    ],
    bookingUrl: '/consulting/book',
  },
];

export default function ConsultingServices() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">خدمات الاستشارية المتخصصة</h1>
          <p className="text-xl text-white/90">
            استشارات احترافية من خبراء الموارد البشرية لتطوير شركتك
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    {service.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {service.price}
                      <span className="text-sm text-muted-foreground"> ريال</span>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center justify-end gap-1">
                      <Clock className="w-4 h-4" />
                      {service.duration}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-right">{service.title}</CardTitle>
                <CardDescription className="text-right">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Features */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-right text-sm">المميزات:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-right">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Testimonial */}
                {service.testimonials.length > 0 && (
                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <div className="flex gap-1 mb-2">
                      {[...Array(service.testimonials[0].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground text-right italic mb-2">
                      "{service.testimonials[0].text}"
                    </p>
                    <p className="text-xs font-semibold text-right">
                      {service.testimonials[0].name}
                    </p>
                    <p className="text-xs text-muted-foreground text-right">
                      {service.testimonials[0].role}
                    </p>
                  </div>
                )}

                {/* CTA Button */}
                <Button
                  className="w-full mt-4"
                  onClick={() => navigate(service.bookingUrl)}
                >
                  احجز الآن
                  <ArrowRight className="w-4 h-4 mr-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="bg-card rounded-lg border p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">مقارنة الخدمات</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b">
                  <th className="pb-4 font-semibold">الخدمة</th>
                  <th className="pb-4 font-semibold">السعر</th>
                  <th className="pb-4 font-semibold">المدة</th>
                  <th className="pb-4 font-semibold">المستوى</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-b hover:bg-secondary/50">
                    <td className="py-4">{service.title}</td>
                    <td className="py-4">{service.price} ريال</td>
                    <td className="py-4">{service.duration}</td>
                    <td className="py-4">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                        متقدم
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">لماذا تختار خدماتنا؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">خبرة عميقة</h3>
              <p className="text-sm text-muted-foreground">
                استشاريون بخبرة 15+ سنة في مجال الموارد البشرية
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">نتائج مثبتة</h3>
              <p className="text-sm text-muted-foreground">
                تحسن 85% في رضا الموظفين والإنتاجية
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">دعم شامل</h3>
              <p className="text-sm text-muted-foreground">
                متابعة وتدريب مستمر بعد الاستشارة
              </p>
            </div>
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">ضمان الرضا</h3>
              <p className="text-sm text-muted-foreground">
                ضمان 30 يوم استرجاع المبلغ كاملاً
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4">جاهز للبدء؟</h2>
          <p className="text-lg text-muted-foreground mb-8">
            اختر الخدمة المناسبة لشركتك واحجز استشارتك الآن
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/consulting/book')}
            className="gap-2"
          >
            احجز استشارة الآن
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
