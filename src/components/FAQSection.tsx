
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
    <section id="faq" className="py-24 lg:py-32 relative overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-24 h-24 opacity-10 -z-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Section Header - 2P Style */}
        <div className={`mb-16 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-center gap-3 mb-4 ${dir === 'rtl' ? 'justify-end flex-row-reverse' : ''}`}>
            <div className="w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <span className="text-primary font-bold text-sm tracking-wider">
              {language === 'ar' ? 'أسئلة' : 'Frequently'}
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="olu-text-gradient">{t("faq.title")}</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t("faq.description")}
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl">
          {loading ? (
            <div className="space-y-4">
              {Array(4).fill(0).map((_, index) => (
                <div key={`faq-skeleton-${index}`} className="border border-border rounded-xl p-6 bg-card">
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
                  className="border border-border rounded-xl px-6 bg-card hover:border-primary/40 transition-all duration-300 data-[state=open]:shadow-md data-[state=open]:border-primary/40"
                >
                  <AccordionTrigger className={`text-lg font-bold hover:no-underline py-6 hover:text-primary transition-colors gap-4 ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
                    {language === 'ar' ? faq.question_ar : faq.question_en}
                  </AccordionTrigger>
                  <AccordionContent className={`text-base text-muted-foreground pb-6 leading-relaxed ${dir === 'rtl' ? 'text-right' : ''}`}>
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
