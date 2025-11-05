import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
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
  Menu,
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Link } from "wouter";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { VimeoVideo } from "@/components/VimeoVideo";

// Consulting Services Section Component
function ConsultingServicesSection() {
  const { data: typesData, isLoading } =
    trpc.consultant.getConsultationTypes.useQuery();
  const consultationTypes = typesData?.consultationTypes?.slice(0, 6) || [];

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              استشارات الموارد البشرية
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              جاري التحميل...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            استشارات الموارد البشرية
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            استشارات متخصصة في جميع مجالات الموارد البشرية من خبراء معتمدين
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {consultationTypes.map((type: any, index: number) => (
            <Card
              key={type.id}
              className="p-6 hover-lift cursor-pointer group h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-14 w-14 rounded-lg bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Headphones className="h-7 w-7 text-blue-600" />
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">
                    {type.duration} دقيقة
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {type.price} ر.س
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{type.nameAr}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {type.descriptionAr}
              </p>
              <Link href="/consulting/book-new">
                <Button className="w-full gradient-primary text-white">
                  احجز الآن
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/consulting">
            <Button size="lg" variant="outline" className="text-lg px-8">
              عرض جميع الاستشارات
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Free Month Offer Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6TTI0IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0xMiAzNGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="container relative flex items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎁</span>
            <span className="font-bold text-lg">{t("offer.special")}</span>
          </div>
          <p className="text-sm md:text-base">
            <strong>{t("offer.description")}</strong>
          </p>
          <Button
            size="sm"
            variant="secondary"
            className="bg-white text-purple-600 hover:bg-white/90 font-bold"
            onClick={() => (window.location.href = getLoginUrl())}
          >
            {t("offer.button")}
          </Button>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img src="/rabit-logo.svg" alt="Rabit" className="h-8 w-8" />
            <span className="text-xl font-bold text-gradient-primary">
              رابِط
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#home"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.home")}
            </a>
            <Link
              href="/consulting"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.consulting") || "الاستشارات"}
            </Link>
            <Link
              href="/courses"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.courses") || "الدورات"}
            </Link>
            <Link
              href="/knowledge-base"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.knowledge_base") || "قاعدة المعرفة"}
            </Link>
            <a
              href="#tools"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.tools")}
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.pricing")}
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              className="hidden sm:inline-flex"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              {t("btn.login")}
            </Button>
            <Button
              className="gradient-primary text-white hidden sm:inline-flex"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              {t("btn.start_free")}
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
            <a
              href="#home"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.home")}
            </a>
            <Link
              href="/consulting"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.consulting") || "الاستشارات"}
            </Link>
            <Link
              href="/courses"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.courses") || "الدورات"}
            </Link>
            <Link
              href="/knowledge-base"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.knowledge_base") || "قاعدة المعرفة"}
            </Link>
            <a
              href="#tools"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.tools")}
            </a>
            <a
              href="#pricing"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.pricing")}
            </a>
            <a
              href="#about"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.about")}
            </a>
            <a
              href="#contact"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.contact")}
            </a>
            <div className="pt-3 space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => (window.location.href = getLoginUrl())}
              >
                {t("btn.login")}
              </Button>
              <Button
                className="gradient-primary text-white w-full"
                onClick={() => (window.location.href = getLoginUrl())}
              >
                {t("btn.start_free")}
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
                {t("hero.title")}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                {t("hero.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="gradient-primary text-white text-lg px-8 hover-lift"
                  onClick={() => (window.location.href = getLoginUrl())}
                >
                  {t("btn.start_free")}
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8"
                  onClick={() => setVideoModalOpen(true)}
                >
                  <Play className="ml-2 h-5 w-5" />
                  {t("hero.watch_demo")}
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t">
                <div>
                  <div className="text-3xl font-bold text-gradient-primary">
                    500+
                  </div>
                  <div className="text-sm text-muted-foreground">شركة</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient-primary">
                    10K+
                  </div>
                  <div className="text-sm text-muted-foreground">مستخدم</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient-primary">
                    99%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    رضا العملاء
                  </div>
                </div>
              </div>
            </div>

            {/* Image/Illustration */}
            <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-300">
              <div className="relative aspect-square rounded-2xl gradient-primary p-1">
                <div className="h-full w-full rounded-xl bg-background flex items-center justify-center">
                  <img
                    src="/rabit-logo.svg"
                    alt="Rabit Platform"
                    className="h-48 w-48 opacity-20"
                  />
                </div>
              </div>
              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 animate-pulse-soft">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full gradient-company"></div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      نظام ATS
                    </div>
                    <div className="text-sm font-semibold">متقدم</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 animate-pulse-soft delay-500">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full gradient-individual"></div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      ذكاء اصطناعي
                    </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              اختر الفئة المناسبة لك
            </h2>
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
              <h3 className="text-2xl font-bold mb-3">
                {t("category.companies")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("category.companies.desc")}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm">
                    {t("category.companies.feature1")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm">
                    {t("category.companies.feature2")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm">
                    {t("category.companies.feature3")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm">
                    {t("category.companies.feature4")}
                  </span>
                </li>
              </ul>
              <Button className="w-full gradient-company text-white">
                {t("category.companies.btn")}
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
              <h3 className="text-2xl font-bold mb-3">
                {t("category.individual")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("category.individual.desc")}
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                  <span className="text-sm">
                    {t("category.individual.feature1")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                  <span className="text-sm">
                    {t("category.individual.feature2")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                  <span className="text-sm">
                    {t("category.individual.feature3")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                  <span className="text-sm">
                    {t("category.individual.feature4")}
                  </span>
                </li>
              </ul>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-gradient-primary">
                  {t("category.individual.price")}
                </span>
              </div>
              <Button className="w-full gradient-individual text-white">
                {t("category.individual.btn")}
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </Card>

            {/* Employee Card */}
            <Card className="p-8 hover-lift cursor-pointer group border-2 hover:border-green-500 transition-all duration-300">
              <div className="h-16 w-16 rounded-xl gradient-employee flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                {t("category.employee")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("category.employee.desc")}
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm">
                    {t("category.employee.feature1")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm">
                    {t("category.employee.feature2")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm">
                    {t("category.employee.feature3")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm">
                    {t("category.employee.feature4")}
                  </span>
                </li>
              </ul>
              <div className="text-center mb-4">
                <span className="text-2xl font-bold text-green-600">
                  {t("category.employee.price")}
                </span>
              </div>
              <Button className="w-full gradient-employee text-white">
                {t("category.employee.btn")}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              كيف يعمل رابِط؟
            </h2>
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
            <Button
              size="lg"
              className="gradient-primary text-white text-lg px-8 hover-lift"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              ابدأ الآن مجاناً
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Section - أدوات الموارد البشرية الذكية */}
      <section id="tools" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              أدوات الموارد البشرية الذكية
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              أدوات ذكية مدعومة بالذكاء الاصطناعي لتسهيل جميع عمليات الموارد
              البشرية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* End of Service Calculator */}
            <Link href="/tools/end-of-service">
              <Card className="p-6 hover-lift cursor-pointer group h-full">
                <div className="h-14 w-14 rounded-lg bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calculator className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">حاسبة نهاية الخدمة</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  احسب مستحقات نهاية الخدمة بدقة وفقاً لنظام العمل السعودي
                </p>
                <Button
                  variant="ghost"
                  className="w-full group-hover:bg-blue-50"
                >
                  جرّب الآن
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </Card>
            </Link>

            {/* Vacation Calculator */}
            <Link href="/tools/leave-calculator">
              <Card className="p-6 hover-lift cursor-pointer group h-full">
                <div className="h-14 w-14 rounded-lg bg-purple-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">حاسبة الإجازات</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  احسب رصيد الإجازات السنوية والمرضية والأعياد
                </p>
                <Button
                  variant="ghost"
                  className="w-full group-hover:bg-purple-50"
                >
                  جرّب الآن
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </Card>
            </Link>

            {/* Letter Generator */}
            <Link href="/tools/letter-generator">
              <Card className="p-6 hover-lift cursor-pointer group h-full">
                <div className="h-14 w-14 rounded-lg bg-green-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">مولد الخطابات</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  أنشئ خطابات رسمية احترافية بالذكاء الاصطناعي (55+ نوع)
                </p>
                <Button
                  variant="ghost"
                  className="w-full group-hover:bg-green-50"
                >
                  جرّب الآن
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </Card>
            </Link>

            {/* Document Generator */}
            <Link href="/dashboard/smart-form-generator">
              <Card className="p-6 hover-lift cursor-pointer group h-full">
                <div className="h-14 w-14 rounded-lg bg-orange-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="h-7 w-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">مولد النماذج الذكي</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  أنشئ نماذج ومستندات HR مخصصة بسهولة
                </p>
                <Button
                  variant="ghost"
                  className="w-full group-hover:bg-orange-50"
                >
                  جرّب الآن
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </Card>
            </Link>

            {/* Certificate Generator */}
            <Link href="/dashboard/certificates">
              <Card className="p-6 hover-lift cursor-pointer group h-full">
                <div className="h-14 w-14 rounded-lg bg-indigo-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">مولد الشهادات</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  أصدر شهادات عمل وخبرة احترافية فوراً
                </p>
                <Button
                  variant="ghost"
                  className="w-full group-hover:bg-indigo-50"
                >
                  جرّب الآن
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </Card>
            </Link>

            {/* Smart Reports */}
            <Link href="/dashboard/reports">
              <Card className="p-6 hover-lift cursor-pointer group h-full">
                <div className="h-14 w-14 rounded-lg bg-pink-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-7 w-7 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">التقارير الذكية</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  تقارير تحليلية شاملة عن أداء الموارد البشرية
                </p>
                <Button
                  variant="ghost"
                  className="w-full group-hover:bg-pink-50"
                >
                  جرّب الآن
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </Card>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link href="/tools">
              <Button size="lg" variant="outline" className="text-lg px-8">
                عرض جميع الأدوات
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("features.title")}
            </h2>
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
                <h3 className="font-semibold mb-2">
                  {t("features.saudi_compliant")}
                </h3>
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
                <h3 className="font-semibold mb-2">
                  {t("features.ai_powered")}
                </h3>
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
                <h3 className="font-semibold mb-2">
                  {t("features.easy_to_use")}
                </h3>
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
                <h3 className="font-semibold mb-2">{t("features.reports")}</h3>
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
                <h3 className="font-semibold mb-2">{t("features.security")}</h3>
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
                <h3 className="font-semibold mb-2">{t("features.support")}</h3>
                <p className="text-sm text-muted-foreground">
                  دعم فني متواصل باللغة العربية
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("testimonials.title") || "ماذا يقول عملاؤنا"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("testimonials.subtitle") || "قصص نجاح حقيقية من شركات سعودية"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <Card className="hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    أ
                  </div>
                  <div>
                    <h4 className="font-semibold">أحمد القحطاني</h4>
                    <p className="text-sm text-muted-foreground">
                      مدير الموارد البشرية - شركة النخيل
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "رابِط وفّر علينا ساعات عمل كثيرة. مولد الخطابات بالذكاء
                  الاصطناعي رائع ويضمن التوافق مع نظام العمل. أنصح به بشدة!"
                </p>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                    س
                  </div>
                  <div>
                    <h4 className="font-semibold">سارة العتيبي</h4>
                    <p className="text-sm text-muted-foreground">
                      مستقلة HR - تخدم 15 عميل
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "كمستقلة HR، رابِط ساعدني في خدمة عملائي بشكل أسرع وأكثر
                  احترافية. نظام ATS ممتاز والدعم الفني سريع."
                </p>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-lg">
                    م
                  </div>
                  <div>
                    <h4 className="font-semibold">محمد الغامدي</h4>
                    <p className="text-sm text-muted-foreground">
                      مدير عام - شركة الريادة للتقنية
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "حسابة نهاية الخدمة دقيقة جداً ووفرت علينا الكثير من الوقت.
                  المنصة سهلة الاستخدام والفريق متعاون."
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/case-studies">
              <Button size="lg" variant="outline" className="gap-2">
                اقرأ المزيد من قصص النجاح
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("partners.title") || "شركاؤنا"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("partners.subtitle") || "يثق بنا المئات من الشركات السعودية"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {/* Partner Logos - Using placeholder */}
            {[
              { name: "شركة النخيل", icon: Building2 },
              { name: "مجموعة الريادة", icon: Building2 },
              { name: "شركة الأفق", icon: Building2 },
              { name: "مؤسسة التميز", icon: Building2 },
              { name: "شركة الإبداع", icon: Building2 },
              { name: "مجموعة النجاح", icon: Building2 },
              { name: "شركة التطوير", icon: Building2 },
              { name: "مؤسسة الرؤية", icon: Building2 },
            ].map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 rounded-lg bg-background hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-center">
                  <partner.icon className="h-12 w-12 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {partner.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-3xl mx-auto">
              <CardContent className="py-8">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      500+
                    </div>
                    <p className="text-sm text-muted-foreground">
                      شركة تثق بنا
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      10,000+
                    </div>
                    <p className="text-sm text-muted-foreground">موظف مسجل</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      98%
                    </div>
                    <p className="text-sm text-muted-foreground">رضا العملاء</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-600 mb-2">
                      24/7
                    </div>
                    <p className="text-sm text-muted-foreground">دعم فني</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Consulting Services Section - استشارات الموارد البشرية */}
      <ConsultingServicesSection />

      {/* Learning Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              التعليم والتطوير
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              دورات تدريبية وموارد تعليمية لتطوير مهارات HR
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover-lift">
              <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6">
                <Play className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">الدورات التدريبية</h3>
              <p className="text-muted-foreground mb-6">
                أكثر من 20 دورة تدريبية متخصصة في الموارد البشرية مع شهادات
                معتمدة
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>دروس فيديو عالية الجودة</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>شهادات معتمدة</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>دعم مباشر من المدربين</span>
                </li>
              </ul>
              <Link href="/courses">
                <Button size="lg" className="w-full">
                  تصفح الدورات
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>

            <Card className="p-8 hover-lift">
              <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">قاعدة المعرفة</h3>
              <p className="text-muted-foreground mb-6">
                مكتبة شاملة من المقالات والأدلة والقوالب الجاهزة
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>+100 مقال متخصص</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>قوالب ونماذج جاهزة</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>أدلة إرشادية PDF</span>
                </li>
              </ul>
              <Link href="/knowledge-base">
                <Button size="lg" variant="outline" className="w-full">
                  استكشف المعرفة
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
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
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  تواصل معنا
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Video Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <VimeoVideo videoId="906999651" title="عرض توضيحي لمنصة رابِط" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
