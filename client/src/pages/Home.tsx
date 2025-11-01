import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { 
  Building2, 
  UserCheck, 
  Users, 
  Calculator, 
  Calendar, 
  FileText,
  CheckCircle2,
  Brain,
  Smartphone,
  BarChart3,
  Shield,
  Headphones,
  ArrowRight,
  Play,
  Menu
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';
import { FAQSection } from '@/components/FAQSection';

export default function Home() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/rabit-logo.svg" alt="Rabit" className="h-8 w-8" />
            <span className="text-xl font-bold text-gradient-primary">رابِط</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">
              {t('nav.home')}
            </a>
            <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
              الخدمات
            </Link>
            <a href="#tools" className="text-sm font-medium hover:text-primary transition-colors">
              {t('nav.tools')}
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              {t('nav.pricing')}
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              {t('nav.about')}
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              {t('nav.contact')}
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="ghost" className="hidden sm:inline-flex">
              {t('btn.login')}
            </Button>
            <Button className="gradient-primary text-white hidden sm:inline-flex">
              {t('btn.start_free')}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background p-4 space-y-3 animate-in slide-in-from-top">
            <a href="#home" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              {t('nav.home')}
            </a>
            <Link href="/services" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              الخدمات
            </Link>
            <a href="#tools" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              {t('nav.tools')}
            </a>
            <a href="#pricing" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              {t('nav.pricing')}
            </a>
            <a href="#about" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              {t('nav.about')}
            </a>
            <a href="#contact" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              {t('nav.contact')}
            </a>
            <div className="pt-3 space-y-2">
              <Button variant="outline" className="w-full">
                {t('btn.login')}
              </Button>
              <Button className="gradient-primary text-white w-full">
                {t('btn.start_free')}
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden py-20 md:py-32">
        {/* Background Gradient */}
        <div className="absolute inset-0 gradient-primary opacity-5"></div>
        
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <CheckCircle2 className="h-4 w-4" />
                  متوافق 100% مع نظام العمل السعودي
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t('hero.title')}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                {t('hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gradient-primary text-white text-lg px-8 hover-lift">
                  {t('btn.start_free')}
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Play className="ml-2 h-5 w-5" />
                  {t('hero.watch_demo')}
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t">
                <div>
                  <div className="text-3xl font-bold text-gradient-primary">500+</div>
                  <div className="text-sm text-muted-foreground">شركة</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">مستخدم</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient-primary">99%</div>
                  <div className="text-sm text-muted-foreground">رضا العملاء</div>
                </div>
              </div>
            </div>

            {/* Image/Illustration */}
            <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-300">
              <div className="relative aspect-square rounded-2xl gradient-primary p-1">
                <div className="h-full w-full rounded-xl bg-background flex items-center justify-center">
                  <img src="/rabit-logo.svg" alt="Rabit Platform" className="h-48 w-48 opacity-20" />
                </div>
              </div>
              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 animate-pulse-soft">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full gradient-company"></div>
                  <div>
                    <div className="text-xs text-muted-foreground">نظام ATS</div>
                    <div className="text-sm font-semibold">متقدم</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 animate-pulse-soft delay-500">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full gradient-individual"></div>
                  <div>
                    <div className="text-xs text-muted-foreground">ذكاء اصطناعي</div>
                    <div className="text-sm font-semibold">متطور</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">اختر الفئة المناسبة لك</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              حلول مخصصة لكل فئة من المستخدمين
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Companies Card */}
            <Card className="p-8 hover-lift cursor-pointer group border-2 hover:border-blue-500 transition-all duration-300">
              <div className="h-16 w-16 rounded-xl gradient-company flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t('category.companies')}</h3>
              <p className="text-muted-foreground mb-6">{t('category.companies.desc')}</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{t('category.companies.feature1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{t('category.companies.feature2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{t('category.companies.feature3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{t('category.companies.feature4')}</span>
                </li>
              </ul>
              <Button className="w-full gradient-company text-white">
                {t('category.companies.btn')}
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </Card>

            {/* Individual HR Card */}
            <Card className="p-8 hover-lift cursor-pointer group border-2 hover:border-purple-500 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-4 left-4 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                الأكثر شعبية
              </div>
              <div className="h-16 w-16 rounded-xl gradient-individual flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <UserCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t('category.individual')}</h3>
              <p className="text-muted-foreground mb-6">{t('category.individual.desc')}</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{t('category.individual.feature1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{t('category.individual.feature2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{t('category.individual.feature3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{t('category.individual.feature4')}</span>
                </li>
              </ul>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-gradient-primary">{t('category.individual.price')}</span>
              </div>
              <Button className="w-full gradient-individual text-white">
                {t('category.individual.btn')}
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </Card>

            {/* Employee Card */}
            <Card className="p-8 hover-lift cursor-pointer group border-2 hover:border-green-500 transition-all duration-300">
              <div className="h-16 w-16 rounded-xl gradient-employee flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t('category.employee')}</h3>
              <p className="text-muted-foreground mb-6">{t('category.employee.desc')}</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{t('category.employee.feature1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{t('category.employee.feature2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{t('category.employee.feature3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{t('category.employee.feature4')}</span>
                </li>
              </ul>
              <div className="text-center mb-4">
                <span className="text-2xl font-bold text-green-600">{t('category.employee.price')}</span>
              </div>
              <Button className="w-full gradient-employee text-white">
                {t('category.employee.btn')}
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">كيف يعمل رابِط؟</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              أربع خطوات بسيطة للبدء في إدارة مواردك البشرية بكفاءة
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="text-center space-y-4">
                <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-bold">سجل مجاناً</h3>
                <p className="text-sm text-muted-foreground">
                  أنشئ حسابك في أقل من دقيقة واحدة، لا حاجة لبطاقة ائتمان
                </p>
              </div>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 -z-10"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="text-center space-y-4">
                <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-bold">أضف بياناتك</h3>
                <p className="text-sm text-muted-foreground">
                  أدخل بيانات شركتك وموظفيك بسهولة
                </p>
              </div>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 -z-10"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="text-center space-y-4">
                <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-bold">استخدم الأدوات</h3>
                <p className="text-sm text-muted-foreground">
                  ابدأ باستخدام الأدوات الذكية لإنجاز مهامك بسرعة
                </p>
              </div>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-pink-500 to-green-500 -z-10"></div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="text-center space-y-4">
                <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  4
                </div>
                <h3 className="text-xl font-bold">وفر الوقت</h3>
                <p className="text-sm text-muted-foreground">
                  وفر حتى 70% من وقتك اليومي وركز على الأهم
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button size="lg" className="gradient-primary text-white text-lg px-8 hover-lift">
              ابدأ الآن مجاناً
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('tools.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              أدوات ذكية مدعومة بالذكاء الاصطناعي لتسهيل عملك
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* End of Service Calculator */}
            <Card className="p-6 hover-lift cursor-pointer group">
              <div className="h-14 w-14 rounded-lg bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calculator className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('tools.end_of_service')}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t('tools.end_of_service.desc')}</p>
              <Button variant="ghost" className="w-full group-hover:bg-blue-50">
                {t('tools.try_now')}
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </Card>

            {/* Vacation Calculator */}
            <Card className="p-6 hover-lift cursor-pointer group">
              <div className="h-14 w-14 rounded-lg bg-purple-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('tools.vacation')}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t('tools.vacation.desc')}</p>
              <Button variant="ghost" className="w-full group-hover:bg-purple-50">
                {t('tools.try_now')}
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </Card>

            {/* Letter Generator */}
            <Link href="/tools/letter-generator">
              <Card className="p-6 hover-lift cursor-pointer group">
                <div className="h-14 w-14 rounded-lg bg-green-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t('tools.letter_generator')}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t('tools.letter_generator.desc')}</p>
                <Button variant="ghost" className="w-full group-hover:bg-green-50">
                  {t('tools.try_now')}
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('features.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ميزات متقدمة تجعل إدارة الموارد البشرية أسهل وأكثر فعالية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('features.saudi_compliant')}</h3>
                <p className="text-sm text-muted-foreground">
                  متوافق 100% مع نظام العمل السعودي والمادة 84
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('features.ai_powered')}</h3>
                <p className="text-sm text-muted-foreground">
                  ذكاء اصطناعي متقدم لتحليل السير الذاتية وتوليد المحتوى
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('features.easy_to_use')}</h3>
                <p className="text-sm text-muted-foreground">
                  واجهة سهلة وبديهية تعمل على جميع الأجهزة
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('features.reports')}</h3>
                <p className="text-sm text-muted-foreground">
                  تقارير شاملة ورؤى تحليلية متقدمة
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('features.security')}</h3>
                <p className="text-sm text-muted-foreground">
                  أمان عالي المستوى وحماية كاملة لبياناتك
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <Headphones className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('features.support')}</h3>
                <p className="text-sm text-muted-foreground">
                  دعم فني متواصل باللغة العربية
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <Card className="gradient-primary p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white blur-3xl"></div>
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                جاهز للبدء؟
              </h2>
              <p className="text-lg text-blue-50 mb-8 max-w-2xl mx-auto">
                انضم إلى مئات الشركات التي تستخدم رابِط لإدارة مواردها البشرية
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  ابدأ مجاناً
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  تواصل معنا
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/rabit-logo.svg" alt="Rabit" className="h-8 w-8" />
                <span className="text-xl font-bold text-gradient-primary">رابِط</span>
              </div>
              <p className="text-sm text-muted-foreground">
                مساعدك الذكي في إدارة الموارد البشرية
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">{t('footer.quick_links')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#home" className="hover:text-primary transition-colors">الرئيسية</a></li>
                <li><a href="#tools" className="hover:text-primary transition-colors">الأدوات</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">الباقات</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">من نحن</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">{t('footer.contact')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>البريد: info@rbithr.com</li>
                <li>الهاتف: 0570700355</li>
                <li>الموقع: الرياض، السعودية</li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold mb-4">{t('footer.social')}</h4>
              <div className="flex gap-3">
                <a href="#" className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <span className="sr-only">Twitter</span>
                  𝕏
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  in
                </a>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            {t('footer.rights')}
          </div>
        </div>
      </footer>
    </div>
  );
}
