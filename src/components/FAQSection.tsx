
import React, { useEffect, useState, useRef } from "react";
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
import { HelpCircle } from "lucide-react";

interface FAQ {
  id: string;
  question_ar: string;
  question_en: string;
  answer_ar: string;
  answer_en: string;
  is_active: boolean;
  order_index: number;
}

// Parallax hook
const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.innerHeight - rect.top;
        if (scrolled > 0) {
          setOffset(scrolled * speed * 0.1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { offset, elementRef };
};

const FAQSection: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const { offset: decorOffset, elementRef: decorRef } = useParallax(0.4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById('faq');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

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
    <section id="faq" className="py-12 lg:py-16 relative overflow-hidden bg-white" ref={decorRef}>
      {/* Decorative diamond shapes with parallax and float animation */}
      <div 
        className="absolute top-16 right-1/4 w-8 h-8 border-2 border-purple-400/30 rotate-45 hidden lg:block transition-all duration-300 animate-[float_4s_ease-in-out_infinite]" 
        style={{ transform: `rotate(45deg) translateY(${decorOffset * 0.5}px)` }}
      />
      <div 
        className="absolute top-32 left-16 w-6 h-6 border-2 border-purple-400/20 rotate-45 hidden lg:block transition-all duration-300 animate-[float_5s_ease-in-out_infinite_0.5s]" 
        style={{ transform: `rotate(45deg) translateY(${-decorOffset * 0.4}px)` }}
      />
      <div 
        className="absolute bottom-24 right-16 w-7 h-7 border-2 border-purple-400/25 rotate-45 hidden lg:block transition-all duration-300 animate-[float_4.5s_ease-in-out_infinite_1s]" 
        style={{ transform: `rotate(45deg) translateY(${decorOffset * 0.35}px)` }}
      />
      <div 
        className="absolute top-1/2 left-1/3 w-5 h-5 border-2 border-purple-400/15 rotate-45 hidden lg:block transition-all duration-300 animate-[float_5.5s_ease-in-out_infinite_0.3s]" 
        style={{ transform: `rotate(45deg) translateY(${-decorOffset * 0.6}px)` }}
      />
      <div 
        className="absolute bottom-40 left-20 w-9 h-9 border-2 border-purple-400/20 rotate-45 hidden lg:block transition-all duration-300 animate-[float_4s_ease-in-out_infinite_0.7s]" 
        style={{ transform: `rotate(45deg) translateY(${decorOffset * 0.45}px)` }}
      />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Right - Header */}
          <div className={`text-right ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            {/* Section label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-purple-500 font-bold tracking-wider uppercase text-sm">
                {language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-gray-800">
              {t("faq.title")}
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {t("faq.description")}
            </p>
          </div>

          {/* Right - FAQs */}
          <div className={isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}>
            {loading ? (
              <div className="space-y-4">
                {Array(4).fill(0).map((_, index) => (
                  <div key={`faq-skeleton-${index}`} className="border border-purple-400/20 rounded-2xl p-6 bg-[hsl(262,45%,35%)]">
                    <Skeleton className="h-6 w-3/4 mb-3 bg-white/10" />
                    <Skeleton className="h-4 w-full bg-white/10" />
                  </div>
                ))}
              </div>
            ) : faqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={`item-${index}`} 
                    className="border border-purple-400/20 rounded-2xl px-6 bg-[hsl(262,45%,35%)] hover:border-purple-300/50 transition-all duration-300 data-[state=open]:shadow-lg data-[state=open]:border-purple-300/50 data-[state=open]:bg-[hsl(262,45%,40%)]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <AccordionTrigger className="text-lg font-bold hover:no-underline py-6 text-white hover:text-blue-400 transition-colors gap-4 text-right">
                      <span>{language === 'ar' ? faq.question_ar : faq.question_en}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-white/60 pb-6 leading-relaxed text-right pr-11">
                      {language === 'ar' ? faq.answer_ar : faq.answer_en}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-16 text-gray-500">
                {t("faq.noQuestions") || (language === 'ar' ? 'لا توجد أسئلة متاحة' : 'No questions available')}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
