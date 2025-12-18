
import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ArrowUp, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

interface PortfolioItem {
  id: string;
  title?: string;
  title_ar?: string;
  title_en?: string;
  category?: string;
  category_ar?: string;
  category_en?: string;
  description?: string;
  description_ar?: string;
  description_en?: string;
  image_url: string;
  logo_url?: string;
  technologies: string[];
  order_index: number;
  created_at: any;
}

// Fallback translations for products without English content
const productTranslations: Record<string, { title: string; description: string }> = {
  'OLU HR': { title: 'OLU HR', description: 'A comprehensive electronic system for managing HR operations, employee affairs, and administrative matters, aimed at organizing data, facilitating processes, and improving work efficiency within organizations.' },
  'عازمنك': { title: 'Azmnak', description: 'A platform to organize your events professionally and easily in one place.' },
  'OLU contact': { title: 'OLU Contact', description: 'A digital business card that gathers all your information and links in one place.' },
  'OLU form': { title: 'OLU Form', description: 'A smart platform for collecting potential customer data and classifying them accurately. It helps you understand your audience, analyze their interests, and organize their data in a way that facilitates tracking opportunities and improving marketing and sales strategies.' },
};

const PortfolioSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById('portfolio');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        // بعض النسخ القديمة كانت تحفظ المنتجات داخل collection باسم "portfolio".
        // نجلب من الاثنين ثم ندمج النتائج لضمان ظهور كل المنتجات.
        const [itemsRes, legacyRes] = await Promise.allSettled([
          getDocs(query(collection(db, "portfolio_items"), orderBy("order_index", "asc"))),
          getDocs(collection(db, "portfolio")),
        ]);

        const itemsData: PortfolioItem[] = [];

        if (itemsRes.status === "fulfilled") {
          itemsRes.value.forEach((doc) => {
            itemsData.push({ id: doc.id, ...doc.data() } as PortfolioItem);
          });
        }

        if (legacyRes.status === "fulfilled") {
          legacyRes.value.forEach((doc) => {
            itemsData.push({ id: doc.id, ...doc.data() } as PortfolioItem);
          });
        }

        const deduped = Array.from(
          new Map(itemsData.map((item) => [item.id, item])).values()
        ).sort(
          (a, b) => (Number(a.order_index ?? 9999) || 9999) - (Number(b.order_index ?? 9999) || 9999)
        );

        console.log("Portfolio items loaded:", deduped.length, deduped);
        setPortfolioItems(deduped);
      } catch (error) {
        console.error("Failed to fetch portfolio items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolioItems();
  }, []);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalItems = portfolioItems.length || 4;

  return (
    <section id="portfolio" className="py-12 lg:py-16 relative overflow-hidden bg-[#faf8f5]">
      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className="absolute bottom-20 left-8 w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-20 hidden lg:flex"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Decorative diamond */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-20 h-20 border-4 border-primary/20 rotate-45 rounded-xl hidden lg:block" />
      
      <div className="container mx-auto px-4">
        {/* Unified Section Header */}
        <div className={`flex items-center gap-4 mb-12 ${isVisible ? 'animate-fade-in' : ''}`}>
          {/* Diamond icon container */}
          <div className="relative">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-accent rotate-45 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <Briefcase className="w-6 h-6 md:w-7 md:h-7 text-white -rotate-45" />
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-primary font-bold text-base md:text-lg">
              {language === 'ar' ? 'منتجاتنا' : 'Our Products'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="olu-text-gradient">
                {language === 'ar' ? 'أعمالنا' : 'Our Work'}
              </span>
            </h2>
          </div>
        </div>

        {/* Description - Long Text with consistent line spacing */}
        <div className={`mb-12 ${isVisible ? 'animate-fade-in stagger-2' : ''}`}>
          <p className="text-base md:text-lg text-muted-foreground leading-loose max-w-4xl">
            {language === 'ar' 
              ? 'نقدم مجموعة متنوعة من المنتجات والحلول الرقمية المبتكرة التي تساعد عملاءنا على تحقيق أهدافهم وتطوير أعمالهم بكفاءة عالية.'
              : 'We offer a diverse range of innovative digital products and solutions that help our clients achieve their goals and develop their business efficiently.'
            }
          </p>
        </div>

        {/* Main Content Area with Side Arrows */}
        <div className="relative flex items-center gap-4">
          {/* Right Arrow (Next in RTL) */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => api?.scrollNext()}
            className="hidden lg:flex flex-shrink-0 w-14 h-14 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Carousel */}
          <Carousel 
            setApi={setApi} 
            className="flex-1" 
            opts={{ loop: true, align: "start" }}
            plugins={[autoplayPlugin.current]}
          >
            <CarouselContent>
              {loading ? (
                <CarouselItem className="basis-full">
                  <div className="grid lg:grid-cols-2 gap-12 items-center" dir="ltr">
                    <Skeleton className="h-[500px] w-full rounded-3xl" />
                    <div className="space-y-4">
                      <Skeleton className="h-16 w-16 rounded-full" />
                      <Skeleton className="h-8 w-48" />
                      <Skeleton className="h-32 w-full" />
                      <Skeleton className="h-12 w-40" />
                    </div>
                  </div>
                </CarouselItem>
              ) : portfolioItems.length > 0 ? (
                portfolioItems.map((item, index) => (
                  <CarouselItem 
                    key={item.id} 
                    className={`basis-full ${isVisible ? 'animate-fade-in' : ''}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center" dir="ltr">
                      {/* Left Side - Tablet Mockup with Image */}
                      <div className="relative order-1 lg:order-1">
                        {/* Decorative golden frame - hidden on small screens */}
                        <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-16 h-16 md:w-24 md:h-24 border-t-4 md:border-t-[6px] border-l-4 md:border-l-[6px] border-primary rounded-tl-xl md:rounded-tl-[2rem] z-10 hidden sm:block" />
                        <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-16 h-16 md:w-24 md:h-24 border-b-4 md:border-b-[6px] border-l-4 md:border-l-[6px] border-primary rounded-bl-xl md:rounded-bl-[2rem] z-10 hidden sm:block" />
                        
                        {/* Tablet container */}
                        <div className="relative bg-slate-800 rounded-xl md:rounded-[2rem] p-2 md:p-3 shadow-xl md:shadow-2xl mx-4 sm:mx-0">
                          {/* Tablet camera */}
                          <div className="absolute top-2 md:top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-600 rounded-full" />
                          
                          {/* Screen */}
                          <div className="relative rounded-lg md:rounded-2xl overflow-hidden bg-white">
                            <img
                              src={item.image_url} 
                              alt={item.title} 
                              className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover object-top"
                            />
                          </div>
                          
                          {/* Home button */}
                          <div className="absolute -right-1 md:-right-2 top-1/2 -translate-y-1/2 w-0.5 md:w-1 h-8 md:h-12 bg-slate-600 rounded-full" />
                        </div>
                      </div>
                      
                      {/* Right Side - Content */}
                      <div className="text-right order-2 lg:order-2 px-4 sm:px-0">
                        {/* Product logo and name */}
                        <div className="flex items-center gap-3 md:gap-4 justify-end mb-3 md:mb-4">
                          <div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                              {language === 'ar' 
                                ? (item.title_ar || item.title) 
                                : (item.title_en || productTranslations[item.title_ar || item.title || '']?.title || item.title_ar || item.title)}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {language === 'ar' ? 'آخر تحديث:' : 'Last update:'} {new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                          </div>
                          {item.logo_url ? (
                            <img src={item.logo_url} alt={item.title_ar || item.title} className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-border flex-shrink-0" />
                          ) : (
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-border flex-shrink-0">
                              <span className="text-lg md:text-2xl font-bold text-primary">{(item.title_ar || item.title || '').charAt(0)}</span>
                            </div>
                          )}
                        </div>

                        {/* Contact button */}
                        <Button className="mb-4 md:mb-6 bg-primary hover:bg-primary/90 text-primary-foreground px-4 md:px-6 py-2 rounded-lg font-bold text-sm md:text-base">
                          {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                        </Button>
                        
                        {/* Product title repeated */}
                        <h4 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-foreground">
                          {language === 'ar' 
                            ? (item.title_ar || item.title) 
                            : (item.title_en || productTranslations[item.title_ar || item.title || '']?.title || item.title_ar || item.title)}
                        </h4>
                        
                        {/* Description - Long Text with consistent line spacing */}
                        <p className="text-base md:text-lg text-muted-foreground leading-loose mb-4 md:mb-6">
                          {language === 'ar' 
                            ? (item.description_ar || item.description) 
                            : (item.description_en || productTranslations[item.title_ar || item.title || '']?.description || item.description_ar || item.description)}
                        </p>
                        
                        {/* Read More Link */}
                        <a 
                          href="#" 
                          className="inline-flex items-center gap-2 text-primary font-bold text-base md:text-lg hover:gap-4 transition-all duration-300"
                        >
                          <span>{language === 'ar' ? 'اقرأ المزيد' : 'Read More'}</span>
                        </a>
                      </div>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className="basis-full">
                  <div className="text-center py-24 text-muted-foreground">
                    {language === 'ar' ? 'لا توجد منتجات متاحة' : 'No products available'}
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
          </Carousel>

          {/* Left Arrow (Prev in RTL) */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => api?.scrollPrev()}
            className="hidden lg:flex flex-shrink-0 w-14 h-14 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </div>

        {/* Pagination Indicator */}
        {!loading && portfolioItems.length > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            {/* Mobile Navigation */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => api?.scrollNext()}
              className="lg:hidden w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            
            {/* Dots Indicator */}
            <div className="flex gap-2">
              {portfolioItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    current === index 
                      ? 'bg-primary w-8' 
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>
            
            {/* Counter */}
            <span className="text-sm text-muted-foreground font-medium">
              {current + 1} / {portfolioItems.length}
            </span>
            
            {/* Mobile Navigation */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => api?.scrollPrev()}
              className="lg:hidden w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
