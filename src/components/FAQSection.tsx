
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
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
  const { t, language } = useLanguage();
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
    <section id="faq" className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="font-bold mb-6 tracking-tight">
            <span className="olu-text-gradient">{t("faq.title")}</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t("faq.description")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">{loading ? (
            <div className="space-y-4">
              {Array(4).fill(0).map((_, index) => (
                <div key={`faq-skeleton-${index}`} className="border border-border/50 rounded-3xl p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : faqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.id} value={`item-${index}`} className="border border-border/50 rounded-3xl px-6 bg-card">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">
                    {language === 'ar' ? faq.question_ar : faq.question_en}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground pb-6">
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
