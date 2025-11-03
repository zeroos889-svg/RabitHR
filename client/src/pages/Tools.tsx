import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  Calendar, 
  FileText,
  Users,
  TrendingUp,
  Clock,
  DollarSign,
  FileCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Link } from 'wouter';
import { Footer } from '@/components/Footer';

const tools = [
  {
    id: 'end-of-service',
    name: 'حاسبة نهاية الخدمة',
    description: 'احسب مكافأة نهاية الخدمة بدقة وفقاً لنظام العمل السعودي',
    icon: Calculator,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    href: '/tools/end-of-service',
    popular: true,
    features: [
      'حساب دقيق وفقاً للنظام',
      'يدعم جميع حالات الاستقالة والفصل',
      'تقرير مفصل قابل للطباعة'
    ]
  },
  {
    id: 'leave-calculator',
    name: 'حاسبة الإجازات',
    description: 'احسب رصيد الإجازات السنوية والمرضية والمستحقات',
    icon: Calendar,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
    href: '/tools/leave-calculator',
    popular: true,
    features: [
      'حساب الإجازات السنوية',
      'حساب الإجازات المرضية',
      'حساب بدل الإجازات'
    ]
  },
  {
    id: 'letter-generator',
    name: 'مولد الخطابات',
    description: 'أنشئ خطابات HR احترافية بالذكاء الاصطناعي في ثوانٍ',
    icon: FileText,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
    href: '/tools/letter-generator',
    popular: true,
    features: [
      '55+ نوع من الخطابات',
      'مدعوم بالذكاء الاصطناعي',
      'تصدير Word و PDF'
    ]
  },
  {
    id: 'salary-calculator',
    name: 'حاسبة الرواتب',
    description: 'احسب الراتب الصافي بعد الخصومات والإضافات',
    icon: DollarSign,
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-600',
    href: '#',
    comingSoon: true,
    features: [
      'حساب التأمينات الاجتماعية',
      'خصم GOSI',
      'البدلات والحوافز'
    ]
  },
  {
    id: 'attendance',
    name: 'حاسبة الحضور والغياب',
    description: 'احسب ساعات العمل والغياب والتأخير',
    icon: Clock,
    color: 'from-teal-500 to-cyan-600',
    bgColor: 'bg-teal-100',
    textColor: 'text-teal-600',
    href: '#',
    comingSoon: true,
    features: [
      'حساب ساعات العمل',
      'خصم الغياب والتأخير',
      'تقارير الحضور'
    ]
  },
  {
    id: 'performance',
    name: 'حاسبة تقييم الأداء',
    description: 'قيّم أداء الموظفين بمعايير موضوعية',
    icon: TrendingUp,
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'bg-indigo-100',
    textColor: 'text-indigo-600',
    href: '#',
    comingSoon: true,
    features: [
      'معايير تقييم متعددة',
      'تقارير أداء تفصيلية',
      'مقارنات ورسوم بيانية'
    ]
  },
  {
    id: 'hiring',
    name: 'حاسبة تكلفة التوظيف',
    description: 'احسب التكلفة الفعلية لتوظيف موظف جديد',
    icon: Users,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-600',
    href: '#',
    comingSoon: true,
    features: [
      'تكلفة الإعلان والتوظيف',
      'تكلفة التدريب',
      'التكلفة الإجمالية'
    ]
  },
  {
    id: 'contract',
    name: 'مولد عقود العمل',
    description: 'أنشئ عقود عمل متوافقة مع نظام العمل السعودي',
    icon: FileCheck,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-600',
    href: '#',
    comingSoon: true,
    features: [
      'عقود متوافقة مع النظام',
      'قوالب جاهزة',
      'تخصيص كامل'
    ]
  },
];

export default function Tools() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/rabit-logo.svg" alt="Rabit" className="h-8 w-8" />
            <span className="text-xl font-bold text-gradient-primary">رابِط</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              الرئيسية
            </Link>
            <Link href="/knowledge-base" className="text-sm font-medium hover:text-primary transition-colors">
              قاعدة المعرفة
            </Link>
            <Link href="/consulting" className="text-sm font-medium hover:text-primary transition-colors">
              الاستشارات
            </Link>
            <Link href="/courses" className="text-sm font-medium hover:text-primary transition-colors">
              الدورات
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">تسجيل الدخول</Button>
            </Link>
            <Link href="/signup">
              <Button className="gradient-primary text-white">ابدأ مجاناً</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm mb-6">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">أدوات ذكية</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              أدوات HR الذكية
              <span className="text-gradient-primary"> لتسهيل عملك</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              مجموعة شاملة من الأدوات والحاسبات المدعومة بالذكاء الاصطناعي لإدارة الموارد البشرية بكفاءة
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>3 أدوات متاحة</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                <span>5 أدوات قريباً</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Card 
                key={tool.id} 
                className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  !tool.comingSoon ? 'hover:-translate-y-2 cursor-pointer' : 'opacity-75'
                }`}
              >
                {tool.popular && (
                  <div className="absolute top-4 -left-12 rotate-45 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-12 py-1 text-xs font-semibold">
                    الأكثر استخداماً
                  </div>
                )}
                {tool.comingSoon && (
                  <Badge className="absolute top-4 left-4 bg-orange-500">قريباً</Badge>
                )}
                
                <div className={`absolute top-0 right-0 left-0 h-2 bg-gradient-to-r ${tool.color}`} />
                
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 rounded-xl ${tool.bgColor} flex items-center justify-center mb-4`}>
                    <tool.icon className={`h-7 w-7 ${tool.textColor}`} />
                  </div>
                  <CardTitle className="text-xl">{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className={`h-1.5 w-1.5 rounded-full ${tool.bgColor}`}></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {!tool.comingSoon ? (
                    <Link href={tool.href}>
                      <Button className={`w-full bg-gradient-to-r ${tool.color} hover:opacity-90`}>
                        جرّب الآن
                        <ArrowRight className="mr-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button className="w-full" variant="outline" disabled>
                      قريباً
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            جاهز لتجربة الأدوات؟
          </h2>
          <p className="text-xl mb-8 opacity-90">
            سجل مجاناً واحصل على وصول فوري لجميع الأدوات المتاحة
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              ابدأ مجاناً الآن
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
