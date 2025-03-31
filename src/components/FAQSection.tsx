
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="faq" className="py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="olu-gold-text-gradient">{t("faq.title")}</span>
          </h2>
          <div className="w-24 h-1 bg-olu-gold mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("faq.description")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium">{t("faq.q1")}</AccordionTrigger>
              <AccordionContent className="text-base">
                {t("faq.a1")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium">{t("faq.q2")}</AccordionTrigger>
              <AccordionContent className="text-base">
                {t("faq.a2")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium">{t("faq.q3")}</AccordionTrigger>
              <AccordionContent className="text-base">
                {t("faq.a3")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium">{t("faq.q4")}</AccordionTrigger>
              <AccordionContent className="text-base">
                {t("faq.a4")}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="gold" size="pill" className="mt-8 px-10 py-6 text-base">
            {t("faq.askButton")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
