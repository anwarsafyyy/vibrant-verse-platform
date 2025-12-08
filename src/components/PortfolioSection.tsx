
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  logo_url?: string;
  technologies: string[];
  order_index: number;
  created_at: any;
}

const PortfolioSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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
        const q = query(collection(db, 'portfolio_items'), orderBy('order_index', 'asc'));
        const snapshot = await getDocs(q);
        const itemsData: PortfolioItem[] = [];
        snapshot.forEach(doc => {
          itemsData.push({ id: doc.id, ...doc.data() } as PortfolioItem);
        });
        setPortfolioItems(itemsData);
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
    <section id="portfolio" className="py-28 lg:py-36 relative overflow-hidden bg-[#faf8f5]">
      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className="absolute bottom-20 left-8 w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-20 hidden lg:flex"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Decorative diamond at bottom center */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-20 h-20 border-4 border-primary/20 rotate-45 rounded-xl hidden lg:block" />
      
      <div className="container mx-auto px-4">
        {/* Top Row: Pagination on left, Header on right */}
        <div className={`flex flex-col-reverse lg:flex-row lg:items-start lg:justify-between gap-8 mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} dir="ltr">
          
          {/* Left side - Pagination numbers */}
          <div className="flex items-center gap-4" dir="ltr">
            {/* Navigation arrows */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => api?.scrollPrev()}
              className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => api?.scrollNext()}
              className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
            
            {/* Page numbers */}
            <div className="flex items-center gap-3 mr-4 flex-row-reverse">
              {Array.from({ length: Math.min(totalItems, 4) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`text-2xl font-bold transition-all duration-300 ${
                    current === index 
                      ? 'text-foreground scale-110' 
                      : 'text-muted-foreground/40 hover:text-muted-foreground'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>
          
          {/* Right side - Header */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-primary font-bold text-xl">
                {language === 'ar' ? 'منتجات' : 'Company'}
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="olu-text-gradient">
                  {language === 'ar' ? 'الشركة' : 'Products'}
                </span>
              </h2>
            </div>
            {/* Decorative diamond icon */}
            <div className="relative">
              <div className="w-16 h-16 bg-primary rotate-45 rounded-xl shadow-lg shadow-primary/30" />
              <div className="absolute top-2 right-2 w-12 h-12 border-2 border-white/30 rotate-0 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <Carousel setApi={setApi} className="w-full" opts={{ loop: true, align: "start" }}>
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
                  className={`basis-full ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center" dir="ltr">
                    {/* Left Side - Tablet Mockup with Image */}
                    <div className="relative">
                      {/* Decorative golden frame */}
                      <div className="absolute -top-6 -left-6 w-24 h-24 border-t-[6px] border-l-[6px] border-primary rounded-tl-[2rem] z-10" />
                      <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-[6px] border-l-[6px] border-primary rounded-bl-[2rem] z-10" />
                      
                      {/* Tablet container */}
                      <div className="relative bg-slate-800 rounded-[2rem] p-3 shadow-2xl">
                        {/* Tablet camera */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-600 rounded-full" />
                        
                        {/* Screen */}
                        <div className="relative rounded-2xl overflow-hidden bg-white">
                          <img
                            src={item.image_url} 
                            alt={item.title} 
                            className="w-full h-[400px] lg:h-[500px] object-cover object-top"
                          />
                        </div>
                        
                        {/* Home button */}
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-slate-600 rounded-full" />
                      </div>
                    </div>
                    
                    {/* Right Side - Content */}
                    <div className="text-right">
                      {/* Product logo and name */}
                      <div className="flex items-center gap-4 justify-end mb-4">
                        <div>
                          <h3 className="text-3xl font-bold text-foreground">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {language === 'ar' ? 'آخر تحديث:' : 'Last update:'} {new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                        {item.logo_url ? (
                          <img src={item.logo_url} alt={item.title} className="w-16 h-16 rounded-full object-cover border-2 border-border" />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-border">
                            <span className="text-2xl font-bold text-primary">{item.title.charAt(0)}</span>
                          </div>
                        )}
                      </div>

                      {/* Contact button */}
                      <Button className="mb-6 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-bold">
                        {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                      </Button>
                      
                      {/* Product title repeated */}
                      <h4 className="text-2xl font-bold mb-4 text-foreground">{item.title}</h4>
                      
                      {/* Description */}
                      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        {item.description}
                      </p>
                      
                      {/* Read More Link */}
                      <a 
                        href="#" 
                        className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:gap-4 transition-all duration-300"
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
      </div>
    </section>
  );
};

export default PortfolioSection;
