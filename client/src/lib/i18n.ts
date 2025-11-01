import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ملفات الترجمة
const resources = {
  ar: {
    translation: {
      // الهيدر
      "nav.home": "الرئيسية",
      "nav.tools": "الأدوات",
      "nav.pricing": "الباقات",
      "nav.about": "من نحن",
      "nav.contact": "تواصل معنا",
      "btn.login": "تسجيل الدخول",
      "btn.start_free": "ابدأ مجاناً",
      
      // Hero Section
      "hero.title": "رابِط - مساعدك الذكي في إدارة الموارد البشرية",
      "hero.description": "منصة شاملة مدعومة بالذكاء الاصطناعي لإدارة الموارد البشرية، متوافقة 100% مع نظام العمل السعودي",
      "hero.watch_demo": "شاهد العرض التوضيحي",
      
      // الفئات
      "category.companies": "للشركات",
      "category.companies.desc": "حلول متكاملة لإدارة الموارد البشرية",
      "category.companies.feature1": "نظام توظيف ذكي (ATS)",
      "category.companies.feature2": "إدارة الموظفين والرواتب",
      "category.companies.feature3": "تقارير وتحليلات متقدمة",
      "category.companies.feature4": "إدارة الحالات والمهام",
      "category.companies.btn": "ابدأ الآن",
      
      "category.individual": "لمستقلي الموارد البشرية",
      "category.individual.desc": "أدوات احترافية لتقديم خدمات HR",
      "category.individual.feature1": "أدوات حسابات ذكية",
      "category.individual.feature2": "مولد خطابات احترافي",
      "category.individual.feature3": "إدارة عملاء متعددين",
      "category.individual.feature4": "تقارير مخصصة",
      "category.individual.price": "299 ريال/شهر",
      "category.individual.btn": "اشترك الآن",
      
      "category.employee": "للموظفين",
      "category.employee.desc": "احسب حقوقك بدقة ومجاناً",
      "category.employee.feature1": "حاسبة نهاية الخدمة",
      "category.employee.feature2": "حاسبة الإجازات",
      "category.employee.feature3": "مولد خطابات أساسي",
      "category.employee.feature4": "مساعد ذكي للاستفسارات",
      "category.employee.price": "مجاني تماماً",
      "category.employee.btn": "سجل مجاناً",
      
      // الأدوات
      "tools.title": "الأدوات الذكية",
      "tools.end_of_service": "حاسبة نهاية الخدمة",
      "tools.end_of_service.desc": "احسب مستحقات نهاية الخدمة وفق المادة 84 من نظام العمل السعودي",
      "tools.vacation": "حاسبة الإجازات",
      "tools.vacation.desc": "احسب رصيد إجازاتك (سنوية، مرضية، أمومة، حج) بدقة",
      "tools.letter_generator": "مولد الخطابات",
      "tools.letter_generator.desc": "أنشئ خطابات رسمية احترافية بالذكاء الاصطناعي",
      "tools.try_now": "جرب الآن",
      
      // الباقات
      "pricing.title": "الباقات",
      "pricing.compare": "قارن بين الباقات",
      "pricing.starter": "Starter",
      "pricing.professional": "Professional",
      "pricing.enterprise": "Enterprise",
      "pricing.custom": "Custom",
      "pricing.per_month": "ريال/شهر",
      "pricing.custom_price": "سعر مخصص",
      
      // المميزات
      "features.title": "لماذا رابِط؟",
      "features.saudi_compliant": "متوافق مع نظام العمل السعودي",
      "features.ai_powered": "ذكاء اصطناعي متقدم",
      "features.easy_to_use": "واجهة سهلة الاستخدام",
      "features.reports": "تقارير شاملة",
      "features.security": "أمان وخصوصية",
      "features.support": "دعم فني متواصل",
      
      // Footer
      "footer.quick_links": "روابط سريعة",
      "footer.contact": "معلومات التواصل",
      "footer.social": "تابعنا",
      "footer.rights": "© 2025 رابِط. جميع الحقوق محفوظة.",
      
      // FAQ
      "faq.title": "الأسئلة الشائعة",
      "faq.subtitle": "إجابات على أكثر الأسئلة شيوعاً حول منصة رابِط",
      
      "faq.q1": "ما هي منصة رابِط؟",
      "faq.a1": "رابِط هي منصة شاملة لإدارة الموارد البشرية مدعومة بالذكاء الاصطناعي، متوافقة 100% مع نظام العمل السعودي. توفر أدوات ذكية لحساب نهاية الخدمة، الإجازات، وتوليد الخطابات، بالإضافة إلى نظام ATS كامل للتوظيف.",
      
      "faq.q2": "هل رابِط متوافق مع نظام العمل السعودي؟",
      "faq.a2": "نعم، رابِط متوافق 100% مع نظام العمل السعودي وخاصة المادة 84 الخاصة بمكافأة نهاية الخدمة. جميع الحسابات والإجراءات تتم وفقاً للأنظمة والقوانين السعودية.",
      
      "faq.q3": "ما الفرق بين الباقات المختلفة؟",
      "faq.a3": "نوفر ثلاث فئات: 1) للموظفين (مجاني): أدوات أساسية لحساب الحقوق. 2) لمستقلي HR (299 ريال/شهر): أدوات احترافية لتقديم خدمات HR. 3) للشركات (من 799 ريال/شهر): حلول متكاملة مع نضام ATS وإدارة شاملة.",
      
      "faq.q4": "كيف يعمل الذكاء الاصطناعي في رابِط؟",
      "faq.a4": "نستخدم الذكاء الاصطناعي في عدة مجالات: تحليل السير الذاتية واستخراج البيانات تلقائياً، توليد الخطابات الرسمية بشكل احترافي، ومساعد ذكي للإجابة على استفسارات نظام العمل.",
      
      "faq.q5": "هل بياناتي آمنة؟",
      "faq.a5": "نعم، نستخدم أعلى معايير الأمان لحماية بياناتك. جميع البيانات مشفرة ومحفوظة في خوادم آمنة. نلتزم بمعايير الخصوصية العالمية ولا نشارك بياناتك مع أي طرف ثالث.",
      
      "faq.q6": "هل يمكنني تجربة المنصة قبل الاشتراك؟",
      "faq.a6": "نعم، نوفر فترة تجريبية مجانية 14 يوماً لجميع الباقات المدفوعة. يمكنك الوصول لجميع الميزات خلال هذه الفترة دون الحاجة لبطاقة ائتمان.",
      
      // عام
      "common.loading": "جاري التحميل...",
      "common.error": "حدث خطأ",
      "common.success": "تمت العملية بنجاح",
      "common.save": "حفظ",
      "common.cancel": "إلغاء",
      "common.delete": "حذف",
      "common.edit": "تعديل",
      "common.view": "عرض",
      "common.download": "تحميل",
      "common.print": "طباعة",
      "common.share": "مشاركة",
    }
  },
  en: {
    translation: {
      // Header
      "nav.home": "Home",
      "nav.tools": "Tools",
      "nav.pricing": "Pricing",
      "nav.about": "About Us",
      "nav.contact": "Contact",
      "btn.login": "Login",
      "btn.start_free": "Start Free",
      
      // Hero Section
      "hero.title": "Rabit - Your Smart HR Management Assistant",
      "hero.description": "Comprehensive AI-powered HR management platform, 100% compliant with Saudi Labor Law",
      "hero.watch_demo": "Watch Demo",
      
      // Categories
      "category.companies": "For Companies",
      "category.companies.desc": "Integrated HR management solutions",
      "category.companies.feature1": "Smart ATS System",
      "category.companies.feature2": "Employee & Payroll Management",
      "category.companies.feature3": "Advanced Reports & Analytics",
      "category.companies.feature4": "Cases & Tasks Management",
      "category.companies.btn": "Get Started",
      
      "category.individual": "For HR Freelancers",
      "category.individual.desc": "Professional tools for HR services",
      "category.individual.feature1": "Smart Calculators",
      "category.individual.feature2": "Professional Letter Generator",
      "category.individual.feature3": "Multi-client Management",
      "category.individual.feature4": "Custom Reports",
      "category.individual.price": "299 SAR/month",
      "category.individual.btn": "Subscribe Now",
      
      "category.employee": "For Employees",
      "category.employee.desc": "Calculate your rights accurately and free",
      "category.employee.feature1": "End of Service Calculator",
      "category.employee.feature2": "Vacation Calculator",
      "category.employee.feature3": "Basic Letter Generator",
      "category.employee.feature4": "Smart Assistant",
      "category.employee.price": "Completely Free",
      "category.employee.btn": "Register Free",
      
      // Tools
      "tools.title": "Smart Tools",
      "tools.end_of_service": "End of Service Calculator",
      "tools.end_of_service.desc": "Calculate end of service benefits according to Article 84 of Saudi Labor Law",
      "tools.vacation": "Vacation Calculator",
      "tools.vacation.desc": "Calculate your vacation balance (annual, sick, maternity, hajj) accurately",
      "tools.letter_generator": "Letter Generator",
      "tools.letter_generator.desc": "Create professional official letters with AI",
      "tools.try_now": "Try Now",
      
      // Pricing
      "pricing.title": "Pricing",
      "pricing.compare": "Compare Plans",
      "pricing.starter": "Starter",
      "pricing.professional": "Professional",
      "pricing.enterprise": "Enterprise",
      "pricing.custom": "Custom",
      "pricing.per_month": "SAR/month",
      "pricing.custom_price": "Custom Price",
      
      // Features
      "features.title": "Why Rabit?",
      "features.saudi_compliant": "Saudi Labor Law Compliant",
      "features.ai_powered": "Advanced AI",
      "features.easy_to_use": "Easy to Use",
      "features.reports": "Comprehensive Reports",
      "features.security": "Security & Privacy",
      "features.support": "24/7 Support",
      
      // Footer
      "footer.quick_links": "Quick Links",
      "footer.contact": "Contact Info",
      "footer.social": "Follow Us",
      "footer.rights": "© 2025 Rabit. All rights reserved.",
      
      // FAQ
      "faq.title": "Frequently Asked Questions",
      "faq.subtitle": "Answers to the most common questions about Rabit platform",
      
      "faq.q1": "What is Rabit platform?",
      "faq.a1": "Rabit is a comprehensive AI-powered HR management platform, 100% compliant with Saudi Labor Law. It provides smart tools for calculating end of service benefits, vacations, and generating letters, plus a complete ATS system for recruitment.",
      
      "faq.q2": "Is Rabit compliant with Saudi Labor Law?",
      "faq.a2": "Yes, Rabit is 100% compliant with Saudi Labor Law, especially Article 84 regarding end of service benefits. All calculations and procedures follow Saudi regulations and laws.",
      
      "faq.q3": "What's the difference between the plans?",
      "faq.a3": "We offer three categories: 1) For Employees (Free): Basic tools for calculating rights. 2) For HR Freelancers (299 SAR/month): Professional tools for providing HR services. 3) For Companies (from 799 SAR/month): Integrated solutions with ATS system and comprehensive management.",
      
      "faq.q4": "How does AI work in Rabit?",
      "faq.a4": "We use AI in several areas: analyzing CVs and extracting data automatically, generating professional official letters, and a smart assistant for answering labor law inquiries.",
      
      "faq.q5": "Is my data secure?",
      "faq.a5": "Yes, we use the highest security standards to protect your data. All data is encrypted and stored on secure servers. We comply with global privacy standards and never share your data with third parties.",
      
      "faq.q6": "Can I try the platform before subscribing?",
      "faq.a6": "Yes, we offer a 14-day free trial for all paid plans. You can access all features during this period without needing a credit card.",
      
      // Common
      "common.loading": "Loading...",
      "common.error": "An error occurred",
      "common.success": "Operation successful",
      "common.save": "Save",
      "common.cancel": "Cancel",
      "common.delete": "Delete",
      "common.edit": "Edit",
      "common.view": "View",
      "common.download": "Download",
      "common.print": "Print",
      "common.share": "Share",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
