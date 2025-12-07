
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

interface FAQ {
  id: string;
  question_ar: string;
  question_en: string;
  answer_ar: string;
  answer_en: string;
  is_active: boolean;
  order_index: number;
}

const FAQSection: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const q = query(
        collection(db, 'faqs'),
        where('is_active', '==', true),
        orderBy('order_index', 'asc')
      );
      const snapshot = await getDocs(q);
      const faqsData: FAQ[] = [];
      snapshot.forEach(doc => {
        faqsData.push({ id: doc.id, ...doc.data() } as FAQ);
      });
      setFaqs(faqsData);
    } catch (error) {
      console.error("Failed to fetch FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="faq" className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4">
        {/* Section Header - 2P Style */}
        <div className={`mb-16 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-16 bg-gradient-to-b from-primary to-accent rounded-full hidden md:block" />
            <div>
              <span className="text-primary font-bold text-sm uppercase tracking-wider block mb-2">
                {language === 'ar' ? 'أسئلة' : 'Frequently'}
              </span>
              <h2 className="font-bold tracking-tight">
                <span className="olu-text-gradient">{t("faq.title")}</span>
              </h2>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mt-4">
            {t("faq.description")}
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="space-y-4">
              {Array(4).fill(0).map((_, index) => (
                <div key={`faq-skeleton-${index}`} className="border border-border/50 rounded-2xl p-6 bg-card">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : faqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={faq.id} 
                  value={`item-${index}`} 
                  className="border border-border/50 rounded-2xl px-6 bg-card hover:border-primary/30 transition-all duration-300 data-[state=open]:shadow-lg data-[state=open]:border-primary/30 card-shine"
                >
                  <AccordionTrigger className="text-lg font-bold hover:no-underline py-6 hover:text-primary transition-colors duration-300 gap-4">
                    {language === 'ar' ? faq.question_ar : faq.question_en}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground pb-6 leading-relaxed">
                    {language === 'ar' ? faq.answer_ar : faq.answer_en}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              {t("faq.noQuestions") || "No questions available."}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
