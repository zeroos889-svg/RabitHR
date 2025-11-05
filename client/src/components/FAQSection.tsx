import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HelpCircle,
  Info,
  User,
  CreditCard,
  Laptop,
  Shield,
} from "lucide-react";

export function FAQSection() {
  const { t } = useTranslation();

  const faqCategories = [
    {
      id: "general",
      label: t("faq.category.general"),
      icon: Info,
      faqs: [
        { q: "faq.q1", a: "faq.a1" },
        { q: "faq.q2", a: "faq.a2" },
        { q: "faq.q3", a: "faq.a3" },
      ],
    },
    {
      id: "account",
      label: t("faq.category.account"),
      icon: User,
      faqs: [
        { q: "faq.q7", a: "faq.a7" },
        { q: "faq.q8", a: "faq.a8" },
      ],
    },
    {
      id: "billing",
      label: t("faq.category.billing"),
      icon: CreditCard,
      faqs: [
        { q: "faq.q9", a: "faq.a9" },
        { q: "faq.q10", a: "faq.a10" },
        { q: "faq.q6", a: "faq.a6" },
      ],
    },
    {
      id: "usage",
      label: t("faq.category.usage"),
      icon: Laptop,
      faqs: [
        { q: "faq.q11", a: "faq.a11" },
        { q: "faq.q12", a: "faq.a12" },
      ],
    },
    {
      id: "security",
      label: t("faq.category.security"),
      icon: Shield,
      faqs: [
        { q: "faq.q4", a: "faq.a4" },
        { q: "faq.q5", a: "faq.a5" },
      ],
    },
  ];

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full gradient-primary mb-4">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("faq.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </div>

        {/* FAQ Tabs */}
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="general" className="w-full">
            {/* Category Tabs */}
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 h-auto gap-2 bg-transparent">
              {faqCategories.map(category => {
                const Icon = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex flex-col items-center gap-2 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-md rounded-lg border border-transparent data-[state=active]:border-primary/20"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {category.label}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* FAQ Content */}
            {faqCategories.map(category => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="mt-0"
              >
                <Accordion type="single" collapsible className="space-y-4">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.id}-item-${index}`}
                      className="bg-background border rounded-lg px-6 hover:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="text-right hover:no-underline py-5">
                        <span className="font-semibold text-lg text-right">
                          {t(faq.q)}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-right">
                        {t(faq.a)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Still have questions? */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">لا تزال لديك أسئلة؟</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            تواصل معنا
            <span className="text-xl">←</span>
          </a>
        </div>
      </div>
    </section>
  );
}
