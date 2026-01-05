
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
  const { language } = useLanguage();
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

  return (
    <section id="portfolio" className="py-16 lg:py-20 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
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
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'نقدم حلولاً رقمية مبتكرة تساعد عملاءنا على تحقيق أهدافهم'
              : 'We offer innovative digital solutions that help our clients achieve their goals'
            }
          </p>
        </div>

        {/* Products Carousel */}
        <div className={`relative ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
          {/* Navigation Arrows */}
          <div className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => api?.scrollPrev()}
              className="w-12 h-12 rounded-full bg-[hsl(262,45%,35%)] text-white hover:bg-[hsl(262,45%,40%)] shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => api?.scrollNext()}
              className="w-12 h-12 rounded-full bg-[hsl(262,45%,35%)] text-white hover:bg-[hsl(262,45%,40%)] shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <Carousel 
            setApi={setApi} 
            className="w-full max-w-5xl mx-auto"
            opts={{
              loop: true,
              align: "center",
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
                portfolioItems.map((item, index) => (
                  <CarouselItem key={item.id} className="basis-full sm:basis-1/2 lg:basis-1/3 pl-4">
                    <div className="group bg-[hsl(262,45%,35%)] rounded-2xl border border-purple-400/20 overflow-hidden hover:border-purple-300/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                      {/* Product Image */}
                      <div className="relative h-48 bg-white/10 overflow-hidden">
                        <img
                          src={item.image_url} 
                          alt={item.title_ar || item.title} 
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Logo Badge */}
                        {item.logo_url && (
                          <div className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center p-1">
                            <img src={item.logo_url} alt="" className="w-full h-full object-contain" />
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-white mb-2 text-right group-hover:text-purple-200 transition-colors">
                          {language === 'ar' 
                            ? (item.title_ar || item.title) 
                            : (item.title_en || productTranslations[item.title_ar || item.title || '']?.title || item.title_ar || item.title)}
                        </h3>
                        <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-3 text-right">
                          {language === 'ar' 
                            ? (item.description_ar || item.description) 
                            : (item.description_en || productTranslations[item.title_ar || item.title || '']?.description || item.description_ar || item.description)}
                        </p>
                        
                        {/* Action Button */}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full border-white/30 text-white hover:bg-white hover:text-[hsl(262,45%,35%)] transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 ml-2" />
                          {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))
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
              {/* Mobile Navigation */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => api?.scrollPrev()}
                className="lg:hidden w-10 h-10 rounded-full border border-[hsl(262,45%,35%)]/30 text-[hsl(262,45%,35%)]"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              {/* Dots */}
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
                  />
                ))}
              </div>
              
              {/* Mobile Navigation */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => api?.scrollNext()}
                className="lg:hidden w-10 h-10 rounded-full border border-[hsl(262,45%,35%)]/30 text-[hsl(262,45%,35%)]"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
