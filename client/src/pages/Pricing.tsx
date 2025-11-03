import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  X, 
  Sparkles, 
  Users, 
  Building2, 
  Briefcase,
  ChevronLeft,
  Crown,
  Zap,
  Shield,
  HeadphonesIcon,
  HelpCircle
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from 'wouter';
import { Footer } from '@/components/Footer';

// Pricing Plans
const pricingPlans = {
  employee: {
    id: 'employee',
    name: 'للموظفين',
    nameEn: 'For Employees',
    price: 0,
    period: 'مجاناً',
    periodEn: 'Free',
    icon: Users,
    color: 'from-green-500 to-emerald-600',
    description: 'للموظفين الأفراد الذين يريدون إدارة شؤونهم الوظيفية',
    descriptionEn: 'For individual employees managing their work affairs',
    features: [
      { name: 'حاسبة نهاية الخدمة', included: true },
      { name: 'حاسبة الإجازات', included: true },
      { name: 'مولد خطابات أساسي (15 نوع)', included: true },
      { name: 'مساعد ذكاء اصطناعي', included: true },
      { name: 'دعم عبر البريد', included: true },
      { name: 'تصدير PDF', included: true },
      { name: 'أدوات متقدمة', included: false },
      { name: 'لوحة تحكم', included: false },
      { name: 'إدارة فريق', included: false },
      { name: 'نظام ATS', included: false },
    ],
    cta: 'ابدأ مجاناً',
    ctaEn: 'Start Free',
    popular: false,
  },
  freelancer: {
    id: 'freelancer',
    name: 'مستقل HR',
    nameEn: 'HR Freelancer',
    price: 299,
    period: 'شهرياً',
    periodEn: 'per month',
    icon: Briefcase,
    color: 'from-purple-500 to-pink-600',
    description: 'لمستقلي الموارد البشرية الذين يخدمون عدة عملاء',
    descriptionEn: 'For HR freelancers serving multiple clients',
    features: [
      { name: 'كل ميزات باقة الموظفين', included: true },
      { name: 'مولد خطابات احترافي (55+ نوع)', included: true },
      { name: 'أدوات HR متقدمة', included: true },
      { name: 'تقارير احترافية', included: true },
      { name: 'لوحة تحكم شخصية', included: true },
      { name: 'دعم أولوية', included: true },
      { name: 'تصدير Word', included: true },
      { name: 'حفظ القوالب', included: true },
      { name: 'إدارة فريق', included: false },
      { name: 'نظام ATS', included: false },
    ],
    cta: 'ابدأ الآن',
    ctaEn: 'Start Now',
    popular: true,
  },
  company: {
    id: 'company',
    name: 'للشركات',
    nameEn: 'For Companies',
    tiers: [
      {
        id: 'starter',
        name: 'Starter',
        price: 799,
        employees: '50',
        description: 'للشركات الناشئة والصغيرة',
      },
      {
        id: 'professional',
        name: 'Professional',
        price: 1499,
        employees: '200',
        description: 'للشركات المتوسطة',
        popular: true,
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 2999,
        employees: '1000',
        description: 'للشركات الكبيرة',
      },
      {
        id: 'custom',
        name: 'Custom',
        price: null,
        employees: '1000+',
        description: 'حلول مخصصة للمؤسسات',
      },
    ],
    icon: Building2,
    color: 'from-blue-500 to-indigo-600',
    description: 'حلول شاملة لإدارة الموارد البشرية في الشركات',
    descriptionEn: 'Comprehensive HR management solutions for companies',
    features: [
      { name: 'كل ميزات باقة مستقل HR', included: true },
      { name: 'نظام ATS كامل', included: true },
      { name: 'إدارة الموظفين', included: true },
      { name: 'نظام التذاكر والمهام', included: true },
      { name: 'تقارير متقدمة وتحليلات', included: true },
      { name: 'إدارة الفرق والأقسام', included: true },
      { name: 'صلاحيات متعددة المستويات', included: true },
      { name: 'API للتكامل', included: true },
      { name: 'دعم مخصص 24/7', included: true },
      { name: 'تدريب مجاني', included: true },
    ],
    cta: 'تواصل معنا',
    ctaEn: 'Contact Us',
    popular: false,
  },
};

export default function Pricing() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedCompanyTier, setSelectedCompanyTier] = useState('professional');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              اختر الباقة المناسبة لك
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              خطط مرنة تناسب جميع الاحتياجات - من الموظفين الأفراد إلى المؤسسات الكبرى
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Employee Plan */}
          <Card className={`relative overflow-hidden hover:shadow-2xl transition-all duration-300 ${
            pricingPlans.employee.popular ? 'ring-2 ring-purple-500 scale-105' : ''
          }`}>
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${pricingPlans.employee.color}`} />
            
            <CardHeader className="text-center pb-8 pt-8">
              <div className={`mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-br ${pricingPlans.employee.color} w-fit`}>
                <pricingPlans.employee.icon className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl mb-2">{pricingPlans.employee.name}</CardTitle>
              <CardDescription className="text-sm">{pricingPlans.employee.description}</CardDescription>
              
              <div className="mt-6">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold">مجاناً</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">للأبد</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                {pricingPlans.employee.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${!feature.included ? 'text-muted-foreground line-through' : ''}`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/signup">
                <Button className={`w-full bg-gradient-to-r ${pricingPlans.employee.color} hover:opacity-90`}>
                  {pricingPlans.employee.cta}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Freelancer Plan */}
          <Card className={`relative overflow-hidden hover:shadow-2xl transition-all duration-300 ${
            pricingPlans.freelancer.popular ? 'ring-2 ring-purple-500 scale-105 md:scale-110' : ''
          }`}>
            {pricingPlans.freelancer.popular && (
              <div className="absolute top-4 -right-12 rotate-45 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-12 py-1 text-sm font-semibold">
                الأكثر شيوعاً
              </div>
            )}
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${pricingPlans.freelancer.color}`} />
            
            <CardHeader className="text-center pb-8 pt-8">
              <div className={`mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-br ${pricingPlans.freelancer.color} w-fit relative`}>
                <pricingPlans.freelancer.icon className="h-8 w-8 text-white" />
                <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1" />
              </div>
              <CardTitle className="text-2xl mb-2">{pricingPlans.freelancer.name}</CardTitle>
              <CardDescription className="text-sm">{pricingPlans.freelancer.description}</CardDescription>
              
              <div className="mt-6">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold">299</span>
                  <span className="text-2xl text-muted-foreground">﷼</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">شهرياً</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                {pricingPlans.freelancer.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${!feature.included ? 'text-muted-foreground line-through' : ''}`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/signup">
                <Button className={`w-full bg-gradient-to-r ${pricingPlans.freelancer.color} hover:opacity-90`}>
                  {pricingPlans.freelancer.cta}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Company Plan */}
          <Card className={`relative overflow-hidden hover:shadow-2xl transition-all duration-300`}>
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${pricingPlans.company.color}`} />
            
            <CardHeader className="text-center pb-6 pt-8">
              <div className={`mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-br ${pricingPlans.company.color} w-fit`}>
                <pricingPlans.company.icon className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl mb-2">{pricingPlans.company.name}</CardTitle>
              <CardDescription className="text-sm">{pricingPlans.company.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Company Tiers */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {pricingPlans.company.tiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedCompanyTier(tier.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      selectedCompanyTier === tier.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-sm">{tier.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {tier.price ? `${tier.price} ﷼` : 'مخصص'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      حتى {tier.employees} موظف
                    </div>
                    {tier.popular && (
                      <Badge className="mt-1 text-xs bg-purple-500">شائع</Badge>
                    )}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {pricingPlans.company.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature.name}</span>
                  </div>
                ))}
              </div>

              <Link href="/signup">
                <Button className={`w-full bg-gradient-to-r ${pricingPlans.company.color} hover:opacity-90`}>
                  {pricingPlans.company.cta}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Comparison Table */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">مقارنة تفصيلية للميزات</CardTitle>
            <CardDescription>اختر الباقة التي تناسب احتياجاتك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right p-4 font-semibold">الميزة</th>
                    <th className="text-center p-4 font-semibold">موظف</th>
                    <th className="text-center p-4 font-semibold bg-purple-50">مستقل HR</th>
                    <th className="text-center p-4 font-semibold">شركة</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'حاسبة نهاية الخدمة', employee: true, freelancer: true, company: true },
                    { name: 'حاسبة الإجازات', employee: true, freelancer: true, company: true },
                    { name: 'مولد الخطابات', employee: '15 نوع', freelancer: '55+ نوع', company: '55+ نوع' },
                    { name: 'مساعد ذكاء اصطناعي', employee: true, freelancer: true, company: true },
                    { name: 'تصدير PDF', employee: true, freelancer: true, company: true },
                    { name: 'تصدير Word', employee: false, freelancer: true, company: true },
                    { name: 'لوحة تحكم', employee: false, freelancer: true, company: true },
                    { name: 'تقارير متقدمة', employee: false, freelancer: true, company: true },
                    { name: 'نظام ATS', employee: false, freelancer: false, company: true },
                    { name: 'إدارة الفريق', employee: false, freelancer: false, company: true },
                    { name: 'نظام التذاكر', employee: false, freelancer: false, company: true },
                    { name: 'API للتكامل', employee: false, freelancer: false, company: true },
                    { name: 'الدعم', employee: 'بريد', freelancer: 'أولوية', company: '24/7 مخصص' },
                  ].map((row, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4">{row.name}</td>
                      <td className="p-4 text-center">
                        {typeof row.employee === 'boolean' ? (
                          row.employee ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm">{row.employee}</span>
                        )}
                      </td>
                      <td className="p-4 text-center bg-purple-50">
                        {typeof row.freelancer === 'boolean' ? (
                          row.freelancer ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm font-semibold">{row.freelancer}</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {typeof row.company === 'boolean' ? (
                          row.company ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm font-semibold">{row.company}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Trust Badges */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center p-6">
            <Shield className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">100% آمن</h3>
            <p className="text-sm text-muted-foreground">بياناتك محمية بأعلى معايير الأمان</p>
          </Card>
          
          <Card className="text-center p-6">
            <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">سريع وفعال</h3>
            <p className="text-sm text-muted-foreground">أدوات قوية توفر وقتك وجهدك</p>
          </Card>
          
          <Card className="text-center p-6">
            <Crown className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">متوافق 100%</h3>
            <p className="text-sm text-muted-foreground">مع نظام العمل السعودي</p>
          </Card>
          
          <Card className="text-center p-6">
            <HeadphonesIcon className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">دعم مميز</h3>
            <p className="text-sm text-muted-foreground">فريق دعم جاهز لمساعدتك</p>
          </Card>
        </div>

        {/* Pricing FAQ */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 w-fit">
              <HelpCircle className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">أسئلة شائعة عن الباقات</CardTitle>
            <CardDescription>إجابات على الأسئلة الأكثر شيوعاً حول الأسعار والباقات</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-right">
                  <span className="font-semibold">هل يمكنني تجربة الباقة المدفوعة قبل الشراء؟</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  نعم! نوفر فترة تجريبية مجانية لمدة 14 يوم لجميع الباقات المدفوعة. يمكنك تجربة جميع الميزات دون الحاجة لبطاقة ائتمان.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-right">
                  <span className="font-semibold">هل يمكنني الترقية أو التخفيض بين الباقات؟</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  بالتأكيد! يمكنك الترقية أو التخفيض بين الباقات في أي وقت. عند الترقية، ستدفع الفرق فقط للفترة المتبقية. عند التخفيض، سيتم احتساب الرصيد المتبقي في الفترة القادمة.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-right">
                  <span className="font-semibold">ما هي طرق الدفع المتاحة؟</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  نقبل جميع طرق الدفع الرئيسية: بطاقات الائتمان (Visa, Mastercard, Mada)، Apple Pay، والتحويل البنكي للشركات. جميع المعاملات آمنة ومشفرة.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-right">
                  <span className="font-semibold">هل الأسعار شاملة ضريبة القيمة المضافة؟</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  الأسعار المعروضة غير شاملة لضريبة القيمة المضافة (15%). سيتم إضافة الضريبة عند الدفع وفقاً للأنظمة السعودية.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-right">
                  <span className="font-semibold">ماذا يحدث إذا تجاوزت عدد الموظفين المسموح؟</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  سنقوم بإشعارك تلقائياً عند الاقتراب من الحد الأقصى. يمكنك الترقية للباقة الأعلى في أي وقت. لن يتم إيقاف الخدمة، لكن سيتم احتساب رسوم إضافية بسيطة للموظفين الإضافيين.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-right">
                  <span className="font-semibold">هل يمكنني إلغاء الاشتراك في أي وقت؟</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  نعم، يمكنك إلغاء الاشتراك في أي وقت دون أي رسوم إضافية. ستستمر في الوصول للخدمة حتى نهاية الفترة المدفوعة. لن يتم تجديد الاشتراك تلقائياً بعد الإلغاء.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-right">
                  <span className="font-semibold">هل تقدمون خصومات للدفع السنوي؟</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  نعم! نوفر خصم 20% عند الدفع السنوي مقدماً. على سبيل المثال، باقة مستقل HR بـ 299 ريال شهرياً تصبح 2,870 ريال سنوياً (بدلاً من 3,588 ريال).
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-right">
                  <span className="font-semibold">ما الفرق بين باقة مستقل HR وباقة الشركات؟</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  باقة مستقل HR مصممة للأفراد الذين يقدمون خدمات HR لعدة عملاء، وتركز على الأدوات الفردية. باقة الشركات تشمل نظام إدارة كامل مع ATS، إدارة الفريق، التذاكر، والتقارير المتقدمة - مناسبة للشركات التي تدير موظفيها داخلياً.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger className="text-right">
                  <span className="font-semibold">هل البيانات آمنة ومحمية؟</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  نعم، نستخدم أعلى معايير الأمان (SSL 256-bit encryption) لحماية بياناتك. جميع البيانات مخزنة في خوادم آمنة داخل السعودية ومتوافقة مع قوانين حماية البيانات. نقوم بنسخ احتياطي يومي لضمان عدم فقدان أي بيانات.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger className="text-right">
                  <span className="font-semibold">هل يمكنني طلب ميزات مخصصة؟</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  بالتأكيد! نوفر باقة Custom للمؤسسات الكبيرة التي تحتاج ميزات مخصصة، تكامل خاص، أو تدريب مخصص. تواصل معنا لمناقشة احتياجاتك وسنقوم بتصميم حل يناسبك.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">هل أنت مستعد للبدء؟</h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              انضم إلى آلاف المستخدمين الذين يثقون برابِط لإدارة شؤونهم الوظيفية
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  ابدأ مجاناً
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  تواصل معنا
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
