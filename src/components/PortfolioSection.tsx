
import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { ChevronLeft, ChevronRight, Briefcase, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { orderBy } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLazyFirebase } from "@/hooks/useLazyFirebase";
import { Badge } from "@/components/ui/badge";

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
  technologies: string[] | string;
  order_index: number;
  is_active?: boolean;
  created_at: any;
}

// Fallback translations for products without English content
const productTranslations: Record<string, { title: string; description: string }> = {
  'OLU HR': { title: 'OLU HR', description: 'A comprehensive electronic system for managing HR operations, employee affairs, and administrative matters, aimed at organizing data, facilitating processes, and improving work efficiency within organizations.' },
  'عازمنك': { title: 'Azmnak', description: 'A platform to organize your events professionally and easily in one place.' },
  'OLU contact': { title: 'OLU Contact', description: 'A digital business card that gathers all your information and links in one place.' },
  'OLU form': { title: 'OLU Form', description: 'A smart platform for collecting potential customer data and classifying them accurately. It helps you understand your audience, analyze their interests, and organize their data in a way that facilitates tracking opportunities and improving marketing and sales strategies.' },
};

const FILTER_TABS = [
  { value: 'all', label_ar: 'الكل', label_en: 'All' },
  { value: 'mobile_app', label_ar: 'تطبيقات الجوال', label_en: 'Mobile Apps' },
  { value: 'website', label_ar: 'مواقع ومنصات', label_en: 'Platforms & Sites' },
];

const PortfolioSection: React.FC = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState('all');
  
  const { data: allItems, loading, isVisible, ref } = useLazyFirebase<PortfolioItem>({
    collectionName: 'portfolio_items',
    constraints: [orderBy('order_index', 'asc')],
    rootMargin: '200px',
  });
  
  // Filter out inactive and by category
  const portfolioItems = allItems
    .filter(item => item.is_active !== false)
    .filter(item => activeFilter === 'all' || item.category === activeFilter);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  
  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Reset carousel when filter changes
  useEffect(() => {
    api?.scrollTo(0);
    setCurrent(0);
  }, [activeFilter, api]);

  const getDescription = (item: PortfolioItem) => {
    const raw = language === 'ar'
      ? (item.description_ar || item.description)
      : (item.description_en || productTranslations[item.title_ar || item.title || '']?.description || item.description_ar || item.description);
    return raw || '';
  };

  const isHtml = (str: string) => /<[a-z][\s\S]*>/i.test(str);

  return (
    <section 
      id="portfolio" 
      ref={ref as React.RefObject<HTMLElement>}
      className="py-16 lg:py-20 relative overflow-hidden bg-white"
    >
      {/* Decorative Background Circles */}
      <div className="absolute left-[-6%] top-[15%] w-36 h-36 md:w-52 md:h-52 bg-[hsl(250,40%,75%)] rounded-full opacity-40" />
      <div className="absolute right-[-4%] bottom-[20%] w-28 h-28 md:w-40 md:h-40 bg-[hsl(250,40%,75%)] rounded-full opacity-35" />
      <div className="absolute right-[15%] top-[8%] w-18 h-18 md:w-26 md:h-26 bg-[hsl(320,50%,80%)] rounded-full opacity-40" />
      <div className="absolute left-[20%] bottom-[10%] w-22 h-22 md:w-32 md:h-32 bg-[hsl(170,45%,75%)] rounded-full opacity-35" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[hsl(262,45%,35%)] rotate-45 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white -rotate-45" />
            </div>
            <span className="text-[hsl(262,45%,35%)] font-bold text-lg">
              {language === 'ar' ? 'منتجاتنا' : 'Our Products'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {language === 'ar' ? 'أعمالنا المميزة' : 'Our Featured Work'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            {language === 'ar' 
              ? 'نقدم حلولاً رقمية مبتكرة تساعد عملاءنا على تحقيق أهدافهم'
              : 'We offer innovative digital solutions that help our clients achieve their goals'
            }
          </p>

          {/* Category Filter Tabs */}
          <div className="flex justify-center gap-2 flex-wrap">
            {FILTER_TABS.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === tab.value
                    ? 'bg-[hsl(262,45%,35%)] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {language === 'ar' ? tab.label_ar : tab.label_en}
              </button>
            ))}
          </div>
        </div>

        {/* Products Carousel */}
        <div className={`relative ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
          {/* Navigation Arrows */}
          <div className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10">
            <Button 
              variant="ghost" size="icon"
              onClick={() => api?.scrollPrev()}
              className="w-12 h-12 rounded-full bg-[hsl(262,45%,35%)] text-white hover:bg-[hsl(262,45%,40%)] shadow-lg"
              aria-label={language === 'ar' ? 'المنتج السابق' : 'Previous product'}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
            <Button 
              variant="ghost" size="icon"
              onClick={() => api?.scrollNext()}
              className="w-12 h-12 rounded-full bg-[hsl(262,45%,35%)] text-white hover:bg-[hsl(262,45%,40%)] shadow-lg"
              aria-label={language === 'ar' ? 'المنتج التالي' : 'Next product'}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <Carousel 
            setApi={setApi} 
            className="w-full max-w-6xl mx-auto"
            dir="ltr"
            opts={{
              loop: true,
              align: "start",
              slidesToScroll: isMobile ? 1 : 3,
            }}
            plugins={[autoplayPlugin.current]}
          >
            <CarouselContent>
              {loading ? (
                <CarouselItem className="basis-full">
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <Skeleton className="h-64 w-full rounded-xl mb-4" />
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </CarouselItem>
              ) : portfolioItems.length > 0 ? (
                portfolioItems.map((item) => {
                  const desc = getDescription(item);
                  const categoryLabel = item.category === 'mobile_app'
                    ? (language === 'ar' ? 'تطبيق جوال' : 'Mobile App')
                    : (language === 'ar' ? 'موقع / منصة' : 'Platform / Site');

                  return (
                    <CarouselItem key={item.id} className="basis-full sm:basis-1/2 lg:basis-1/3 pl-4">
                      <div className="group bg-[hsl(262,45%,35%)] rounded-2xl border border-purple-400/20 overflow-hidden hover:border-purple-300/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                        {/* Product Image */}
                        <div className="relative h-48 bg-white/10 overflow-hidden">
                          <img
                            src={item.image_url} 
                            alt={`${item.title_ar || item.title} - منتج من علو شركة برمجة`} 
                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            decoding="async"
                          />
                          {item.logo_url && (
                            <div className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center p-1">
                              <img src={item.logo_url} alt="" className="w-full h-full object-contain" loading="lazy" decoding="async" />
                            </div>
                          )}
                          {/* Category Badge */}
                          <div className="absolute top-3 left-3">
                            <Badge variant="secondary" className="bg-white/90 text-[hsl(262,45%,35%)] text-xs">
                              {categoryLabel}
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-white mb-2 text-right group-hover:text-purple-200 transition-colors">
                            {language === 'ar' 
                              ? (item.title_ar || item.title) 
                              : (item.title_en || productTranslations[item.title_ar || item.title || '']?.title || item.title_ar || item.title)}
                          </h3>
                          {isHtml(desc) ? (
                            <div 
                              className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-3 text-right prose-invert [&_img]:hidden"
                              dangerouslySetInnerHTML={{ __html: desc }}
                            />
                          ) : (
                            <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-3 text-right">
                              {desc}
                            </p>
                          )}
                          
                          <Button 
                            variant="outline" size="sm" 
                            className="w-full border-white/30 bg-white text-[hsl(262,45%,35%)] hover:bg-purple-100 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 ml-2" />
                            {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                          </Button>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })
              ) : (
                <CarouselItem className="basis-full">
                  <div className="text-center py-16 text-gray-500">
                    {language === 'ar' ? 'لا توجد منتجات متاحة' : 'No products available'}
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
          </Carousel>

          {/* Pagination Dots */}
          {!loading && portfolioItems.length > 1 && (
            <div className="flex justify-center items-center gap-3 mt-8">
              <Button 
                variant="ghost" size="icon"
                onClick={() => api?.scrollNext()}
                className="lg:hidden w-10 h-10 rounded-full border border-[hsl(262,45%,35%)]/30 text-[hsl(262,45%,35%)]"
                aria-label={language === 'ar' ? 'المنتج التالي' : 'Next product'}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              
              <div className="flex gap-2">
                {portfolioItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      current === index 
                        ? 'bg-[hsl(262,45%,35%)] w-6' 
                        : 'bg-gray-300 w-2 hover:bg-gray-400'
                    }`}
                    aria-label={`${language === 'ar' ? 'انتقل للمنتج' : 'Go to product'} ${index + 1}`}
                  />
                ))}
              </div>
              
              <Button 
                variant="ghost" size="icon"
                onClick={() => api?.scrollPrev()}
                className="lg:hidden w-10 h-10 rounded-full border border-[hsl(262,45%,35%)]/30 text-[hsl(262,45%,35%)]"
                aria-label={language === 'ar' ? 'المنتج السابق' : 'Previous product'}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
