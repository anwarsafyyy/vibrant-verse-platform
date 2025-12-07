
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
    <section id="portfolio" className="py-24 lg:py-32 relative overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 opacity-10 -z-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-20 w-32 h-32 opacity-10 -z-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="10" y="10" width="80" height="80" rx="10" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" transform="rotate(45 50 50)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Section Header - 2P Style */}
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 ${dir === 'rtl' ? 'lg:flex-row-reverse' : ''}`}>
          <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
            {/* Section label */}
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
                {language === 'ar' ? 'منتجات' : 'Products'}
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold">
              <span className="olu-text-gradient">
                {language === 'ar' ? 'الشركة' : 'Our Products'}
              </span>
            </h2>
          </div>
          
          {/* Pagination + Arrows */}
          <div className={`flex items-center gap-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              {portfolioItems.slice(0, 3).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`text-sm font-bold transition-all duration-300 px-2 py-1 ${
                    current === index 
                      ? 'text-primary' 
                      : 'text-muted-foreground/50 hover:text-muted-foreground'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
            
            <div className={`flex gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => api?.scrollPrev()}
                className="w-10 h-10 rounded-full border border-border hover:border-primary hover:bg-primary/5"
              >
                <ChevronLeft className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => api?.scrollNext()}
                className="w-10 h-10 rounded-full border border-border hover:border-primary hover:bg-primary/5"
              >
                <ChevronRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Portfolio Carousel - 2P Style: Large cards with image on left, content on right */}
        <Carousel setApi={setApi} className="w-full" opts={{ loop: true, align: "start" }}>
          <CarouselContent className="-ml-6">
            {loading ? (
              Array(3).fill(0).map((_, index) => (
                <CarouselItem key={`skeleton-${index}`} className="pl-6 basis-full lg:basis-1/2">
                  <div className="grid md:grid-cols-2 gap-6 bg-card rounded-2xl border border-border overflow-hidden h-[400px]">
                    <Skeleton className="h-full w-full" />
                    <div className="p-8">
                      <Skeleton className="h-8 w-3/4 mb-4" />
                      <Skeleton className="h-20 w-full mb-6" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                  </div>
                </CarouselItem>
              ))
            ) : portfolioItems.length > 0 ? (
              portfolioItems.map((item) => (
                <CarouselItem key={item.id} className="pl-6 basis-full lg:basis-1/2">
                  <div className={`group grid md:grid-cols-2 bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-xl ${dir === 'rtl' ? 'md:grid-flow-dense' : ''}`}>
                    {/* Image */}
                    <div className={`relative aspect-[4/3] md:aspect-auto overflow-hidden bg-muted ${dir === 'rtl' ? 'md:col-start-2' : ''}`}>
                      <img 
                        src={item.image_url} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Category badge */}
                      <div className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'}`}>
                        <Badge className="bg-primary text-primary-foreground border-0 font-bold">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className={`p-8 flex flex-col justify-center ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      {/* Update date */}
                      <span className="text-sm text-muted-foreground mb-3">
                        {language === 'ar' ? 'اخر تحديث :' : 'Last Update:'} {new Date().toLocaleDateString()}
                      </span>
                      
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                        {item.description}
                      </p>
                      
                      {/* Read More Button */}
                      <Button 
                        variant="ghost"
                        className={`w-fit text-primary hover:text-primary hover:bg-primary/5 px-0 font-bold ${dir === 'rtl' ? 'flex-row-reverse self-end' : ''}`}
                      >
                        {dir === 'rtl' ? (
                          <ArrowLeft className="ml-2 h-4 w-4" />
                        ) : (
                          <ArrowRight className="mr-2 h-4 w-4" />
                        )}
                        <span>{language === 'ar' ? 'اقرأ المزيد' : 'Read More'}</span>
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem className="basis-full">
                <div className="text-center py-20">
                  <p className="text-muted-foreground">No portfolio items available.</p>
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
