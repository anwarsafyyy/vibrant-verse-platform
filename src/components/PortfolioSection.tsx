
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
    <section id="portfolio" className="py-12 lg:py-16 relative overflow-hidden animate-gradient-flow">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className="absolute bottom-20 left-8 w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 hover:scale-110 transition-all duration-300 z-20 hidden lg:flex"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Decorative elements */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-20 h-20 border-4 border-primary/20 rotate-45 rounded-xl hidden lg:block animate-pulse-soft" />
      <div className="absolute top-40 right-20 w-8 h-8 border-2 border-accent/30 rotate-45 rounded-lg hidden lg:block" />
      <div className="absolute top-60 left-16 w-6 h-6 border-2 border-cyan-500/30 rotate-45 rounded-md hidden lg:block" />
      
      <div className="container mx-auto px-4">
        {/* Unified Section Header */}
        <div className={`flex items-center gap-4 mb-12 ${isVisible ? 'animate-fade-in' : ''}`}>
          {/* Diamond icon container */}
          <div className="relative">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary via-accent to-orange-500 rotate-45 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <Briefcase className="w-6 h-6 md:w-7 md:h-7 text-white -rotate-45" />
            </div>
          </div>
          
          <div className="text-left" dir="ltr">
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
          <p className="text-base md:text-lg text-muted-foreground leading-loose max-w-4xl text-left" dir="ltr">
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
            className="hidden lg:flex flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-white hover:scale-110 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 shadow-lg border-0"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Carousel */}
          <Carousel 
            setApi={setApi} 
            className="flex-1" 
            dir={dir}
            opts={{
              loop: true,
              align: "start",
              // Fix blank slides in RTL: Embla needs explicit direction.
              direction: dir === "rtl" ? "rtl" : "ltr",
            }}
            plugins={[autoplayPlugin.current]}
          >
            <CarouselContent>
              {loading ? (
                <CarouselItem className="basis-full">
                  <div className="grid lg:grid-cols-2 gap-12 items-center" dir={dir}>
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
                portfolioItems.map((item, index) => {
                  // Different gradient colors for each product
                  const gradients = [
                    'from-violet-500 via-purple-500 to-fuchsia-500',
                    'from-cyan-500 via-blue-500 to-indigo-500',
                    'from-emerald-500 via-teal-500 to-cyan-500',
                    'from-orange-500 via-amber-500 to-yellow-500',
                  ];
                  const gradient = gradients[index % gradients.length];
                  
                  return (
                    <CarouselItem 
                      key={item.id} 
                      className={`basis-full ${isVisible ? 'animate-fade-in' : ''}`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center" dir="ltr">
                        {/* Left Side - Enhanced Mockup with Image */}
                        <div className="relative order-1 lg:order-1 group">
                          {/* Animated glow effect */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700 rounded-3xl`} />
                          
                          {/* Decorative corner frames with gradient */}
                          <div className={`absolute -top-4 -left-4 md:-top-6 md:-left-6 w-16 h-16 md:w-24 md:h-24 border-t-4 md:border-t-[6px] border-l-4 md:border-l-[6px] border-transparent bg-gradient-to-br ${gradient} bg-clip-border rounded-tl-xl md:rounded-tl-[2rem] z-10 hidden sm:block`} style={{ borderImage: `linear-gradient(135deg, var(--tw-gradient-stops)) 1` }} />
                          <div className={`absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-16 h-16 md:w-24 md:h-24 border-b-4 md:border-b-[6px] border-l-4 md:border-l-[6px] border-primary rounded-bl-xl md:rounded-bl-[2rem] z-10 hidden sm:block`} />
                          
                          {/* Modern device container */}
                          <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-xl md:rounded-[2rem] p-2 md:p-3 shadow-2xl mx-4 sm:mx-0 group-hover:scale-[1.02] group-hover:shadow-3xl transition-all duration-500">
                            {/* Shine effect on device */}
                            <div className="absolute inset-0 rounded-xl md:rounded-[2rem] bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                            
                            {/* Device camera */}
                            <div className="absolute top-2 md:top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-600 rounded-full" />
                            
                            {/* Screen with gradient border */}
                            <div className="relative rounded-lg md:rounded-2xl overflow-hidden">
                              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                              <div className="relative m-[2px] rounded-lg md:rounded-2xl overflow-hidden bg-white">
                                <img
                                  src={item.image_url} 
                                  alt={item.title} 
                                  className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-contain bg-background group-hover:scale-105 transition-transform duration-700"
                                />
                              </div>
                            </div>
                            
                            {/* Side button */}
                            <div className="absolute -right-1 md:-right-2 top-1/2 -translate-y-1/2 w-0.5 md:w-1 h-8 md:h-12 bg-slate-600 rounded-full" />
                          </div>
                          
                          {/* Floating tech badges */}
                          <div className={`absolute -top-2 -right-2 md:top-4 md:right-4 px-3 py-1.5 bg-gradient-to-r ${gradient} text-white text-xs font-bold rounded-full shadow-lg animate-bounce-soft hidden sm:block`}>
                            {language === 'ar' ? 'جديد' : 'New'}
                          </div>
                        </div>
                        
                        {/* Right Side - Enhanced Content */}
                        <div className="text-right order-2 lg:order-2 px-4 sm:px-0" dir="rtl">
                          {/* Product logo and name with gradient background */}
                          <div className="flex items-center gap-3 md:gap-4 justify-start mb-4 md:mb-6">
                            <div className={`relative p-1 rounded-full bg-gradient-to-br ${gradient}`}>
                              {item.logo_url ? (
                                <img
                                  src={item.logo_url}
                                  alt={item.title_ar || item.title}
                                  className="w-14 h-14 md:w-18 md:h-18 rounded-full object-contain bg-background p-2 flex-shrink-0"
                                />
                              ) : (
                                <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                                  <span className="text-xl md:text-2xl font-bold text-primary">{(item.title_ar || item.title || '').charAt(0)}</span>
                                </div>
                              )}
                            </div>
                            <div>
                              <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                                {language === 'ar' 
                                  ? (item.title_ar || item.title) 
                                  : (item.title_en || productTranslations[item.title_ar || item.title || '']?.title || item.title_ar || item.title)}
                              </h3>
                              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                {language === 'ar' ? 'متاح الآن' : 'Available Now'}
                              </p>
                            </div>
                          </div>

                          {/* CTA Buttons */}
                          <div className="flex gap-3 mb-6">
                            <Button className={`bg-gradient-to-r ${gradient} hover:opacity-90 text-white px-6 py-3 rounded-xl font-bold text-sm md:text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                            </Button>
                            <Button variant="outline" className="border-2 border-primary/30 text-primary hover:bg-primary/10 px-6 py-3 rounded-xl font-bold text-sm md:text-base">
                              {language === 'ar' ? 'معرفة المزيد' : 'Learn More'}
                            </Button>
                          </div>
                          
                          {/* Description with styled container */}
                          <div className="relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 mb-6">
                            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${gradient} opacity-10 rounded-full blur-2xl`} />
                            <h4 className="text-lg md:text-xl font-bold mb-3 text-foreground">
                              {language === 'ar' ? 'نبذة عن المنتج' : 'About Product'}
                            </h4>
                            <p className="text-base md:text-lg text-muted-foreground leading-loose relative z-10">
                              {language === 'ar' 
                                ? (item.description_ar || item.description) 
                                : (item.description_en || productTranslations[item.title_ar || item.title || '']?.description || item.description_ar || item.description)}
                            </p>
                          </div>
                          
                          {/* Features/Tech badges */}
                          {item.technologies && item.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {item.technologies.slice(0, 4).map((tech, i) => (
                                <span key={i} className={`px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r ${gradient} bg-opacity-10 text-foreground border border-primary/20`}>
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })
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
            className="hidden lg:flex flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-white hover:scale-110 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 shadow-lg border-0"
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
