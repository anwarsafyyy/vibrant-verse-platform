
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Briefcase } from "lucide-react";
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

  return (
    <section id="portfolio" className="py-28 lg:py-36 relative overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-40 h-40 opacity-5 -z-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-20 w-48 h-48 opacity-5 -z-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="10" y="10" width="80" height="80" rx="10" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" transform="rotate(45 50 50)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="text-right">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm">
                {language === 'ar' ? 'أعمالنا' : 'Our Work'}
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
              <span className="olu-text-gradient">
                {language === 'ar' ? 'منتجات الشركة' : 'Our Products'}
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              {language === 'ar' 
                ? 'اكتشف مجموعة منتجاتنا المبتكرة التي صممناها لتلبية احتياجات السوق السعودي'
                : 'Discover our innovative products designed to meet the Saudi market needs'
              }
            </p>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center gap-6">
            {/* Progress indicator */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">{String(current + 1).padStart(2, '0')}</span>
              <span className="text-muted-foreground/50">/</span>
              <span className="text-muted-foreground/50">{String(portfolioItems.length || 1).padStart(2, '0')}</span>
            </div>
            
            {/* Arrows */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => api?.scrollNext()}
                className="w-12 h-12 rounded-xl border-2 border-border hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => api?.scrollPrev()}
                className="w-12 h-12 rounded-xl border-2 border-border hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Portfolio Carousel */}
        <Carousel setApi={setApi} className="w-full" opts={{ loop: true, align: "start" }}>
          <CarouselContent className="-ml-6">
            {loading ? (
              Array(2).fill(0).map((_, index) => (
                <CarouselItem key={`skeleton-${index}`} className="pl-6 basis-full lg:basis-1/2">
                  <div className="grid md:grid-cols-2 gap-0 bg-card rounded-3xl border border-border overflow-hidden h-[420px]">
                    <Skeleton className="h-full w-full" />
                    <div className="p-8">
                      <Skeleton className="h-6 w-24 mb-4" />
                      <Skeleton className="h-8 w-3/4 mb-4" />
                      <Skeleton className="h-24 w-full mb-6" />
                      <Skeleton className="h-10 w-40" />
                    </div>
                  </div>
                </CarouselItem>
              ))
            ) : portfolioItems.length > 0 ? (
              portfolioItems.map((item, index) => (
                <CarouselItem 
                  key={item.id} 
                  className={`pl-6 basis-full lg:basis-1/2 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="group grid md:grid-cols-2 bg-card rounded-3xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                    {/* Image */}
                    <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-muted md:order-2">
                      <img
                        src={item.image_url} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Category badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-primary-foreground border-0 font-bold px-4 py-1 text-sm">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 lg:p-10 flex flex-col justify-center text-right md:order-1">
                      {/* Date */}
                      <span className="text-sm text-muted-foreground mb-4 font-medium">
                        {language === 'ar' ? 'آخر تحديث:' : 'Last Update:'} {new Date().toLocaleDateString()}
                      </span>
                      
                      <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed mb-8 line-clamp-3">
                        {item.description}
                      </p>
                      
                      {/* CTA Button */}
                      <Button 
                        variant="ghost"
                        className="w-fit text-primary hover:text-primary hover:bg-primary/10 px-0 font-bold text-lg group/btn self-end"
                      >
                        <ArrowLeft className="ml-2 h-5 w-5 transition-transform group-hover/btn:-translate-x-1" />
                        <span>{language === 'ar' ? 'اكتشف المزيد' : 'Learn More'}</span>
                      </Button>
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
