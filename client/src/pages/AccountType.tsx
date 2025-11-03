import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Briefcase, Building2, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'wouter';

export default function AccountType() {
  const [, setLocation] = useLocation();

  const accountTypes = [
    {
      id: 'employee',
      icon: User,
      title: 'حساب موظف',
      description: 'للموظفين الذين يرغبون في إدارة شؤونهم الوظيفية',
      price: 'مجاني',
      priceDetail: 'بدون أي رسوم',
      features: [
        'عرض البيانات الوظيفية',
        'طلب الإجازات إلكترونياً',
        'عرض كشوف الرواتب',
        'طلب الشهادات والوثائق',
      ],
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      link: '/signup/employee',
      popular: false,
    },
    {
      id: 'consultant',
      icon: Briefcase,
      title: 'مستقل HR',
      description: 'لمستشاري الموارد البشرية والمحترفين المستقلين',
      price: '299 ﷼',
      priceDetail: 'شهرياً',
      features: [
        'جميع الأدوات الذكية',
        'إصدار شهادات غير محدودة',
        'مولّد خطابات بالذكاء الاصطناعي',
        'تقارير احترافية',
        'دعم فني مخصص',
      ],
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      link: '/signup/consultant',
      popular: true,
    },
    {
      id: 'company',
      icon: Building2,
      title: 'حساب شركة',
      description: 'للشركات التي تريد نظام متكامل لإدارة الموارد البشرية',
      price: 'يبدأ من 799 ﷼',
      priceDetail: 'شهرياً',
      features: [
        'إدارة الموظفين بالكامل',
        'نظام تتبع المتقدمين (ATS)',
        'إدارة الرواتب والإجازات',
        'التقارير والإحصائيات',
        'تكامل مع الأنظمة الأخرى',
        'دعم فني على مدار الساعة',
      ],
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      link: '/signup/company',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="container max-w-6xl py-8">
        <BackButton />
        
        {/* Header */}
        <div className="text-center mt-6 mb-12 space-y-4">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-4 hover:opacity-80 transition-opacity">
            <img src="/rabit-logo.svg" alt="Rabit" className="h-12 w-12" />
            <span className="text-3xl font-bold text-gradient-primary">رابِط</span>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold">
            اختر نوع حسابك
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            اختر الباقة المناسبة لك وابدأ رحلتك مع رابِط في إدارة الموارد البشرية بذكاء
          </p>
        </div>

        {/* Account Type Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {accountTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card 
                key={type.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  type.popular ? 'ring-2 ring-primary shadow-lg' : ''
                }`}
              >
                {/* Popular Badge */}
                {type.popular && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-xs font-bold">
                      <Sparkles className="h-3 w-3" />
                      الأكثر شعبية
                    </div>
                  </div>
                )}

                {/* Gradient Background */}
                <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${type.bgGradient} dark:opacity-20`} />

                <CardHeader className="relative pt-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${type.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl">{type.title}</CardTitle>
                  <CardDescription className="text-base min-h-[3rem]">
                    {type.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Price */}
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-gradient-primary">
                      {type.price}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {type.priceDetail}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {type.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href={type.link}>
                    <Button 
                      className={`w-full ${
                        type.popular 
                          ? 'gradient-primary text-white' 
                          : 'bg-background border-2 hover:bg-muted'
                      }`}
                      size="lg"
                    >
                      {type.id === 'employee' ? 'ابدأ مجاناً' : 'ابدأ الآن'}
                      <ArrowRight className="mr-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            لديك حساب بالفعل؟{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              تسجيل الدخول
            </Link>
          </p>

          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <Link href="/pricing" className="hover:text-primary transition-colors">
              مقارنة الباقات
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-primary transition-colors">
              تواصل معنا
            </Link>
            <span>•</span>
            <Link href="/faq" className="hover:text-primary transition-colors">
              الأسئلة الشائعة
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-gradient-primary">500+</div>
            <div className="text-sm text-muted-foreground">شركة تثق بنا</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-gradient-primary">10,000+</div>
            <div className="text-sm text-muted-foreground">موظف نشط</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-gradient-primary">99%</div>
            <div className="text-sm text-muted-foreground">رضا العملاء</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-gradient-primary">24/7</div>
            <div className="text-sm text-muted-foreground">دعم فني</div>
          </div>
        </div>

        {/* Security Note */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          🔒 جميع البيانات محمية ومشفرة. متوافق 100% مع نظام العمل السعودي
        </p>
      </div>
    </div>
  );
}
