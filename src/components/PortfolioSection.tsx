
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
    <section id="portfolio" className="py-24 md:py-32 relative overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 to-background" />
      
      <div className="container mx-auto px-4">
        {/* Section Header - 2P Style */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-16 bg-gradient-to-b from-primary to-accent rounded-full hidden md:block" />
              <div>
                <span className="text-primary font-bold text-sm uppercase tracking-wider block mb-2">
                  {language === 'ar' ? 'منتجات' : 'Products'}
                </span>
                <h2 className="font-bold tracking-tight">
                  <span className="olu-text-gradient">{t("portfolio.title")}</span>
                </h2>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-xl mt-4">
              {t("portfolio.subtitle")}
            </p>
          </div>
          
          {/* Pagination - 2P Style */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {portfolioItems.slice(0, 3).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`text-sm font-bold transition-all duration-300 px-2 py-1 rounded ${
                    current === index 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => api?.scrollPrev()}
                className="rounded-full border border-border/50 hover:border-primary hover:bg-primary/5"
              >
                <ChevronLeft className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => api?.scrollNext()}
                className="rounded-full border border-border/50 hover:border-primary hover:bg-primary/5"
              >
                <ChevronRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Portfolio Carousel */}
        <Carousel setApi={setApi} className="w-full" opts={{ loop: true, align: "start" }}>
          <CarouselContent className="-ml-4">
            {loading ? (
              Array(3).fill(0).map((_, index) => (
                <CarouselItem key={`skeleton-${index}`} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="rounded-3xl overflow-hidden bg-card border border-border/50 h-full">
                    <Skeleton className="aspect-[4/3] w-full" />
                    <div className="p-6">
                      <Skeleton className="h-7 w-3/4 mb-3" />
                      <Skeleton className="h-4 w-full mb-4" />
                    </div>
                  </div>
                </CarouselItem>
              ))
            ) : portfolioItems.length > 0 ? (
              portfolioItems.map((item) => (
                <CarouselItem key={item.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="group relative h-full">
                    {/* Main Card */}
                    <div className="relative rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 h-full card-shine">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                        <img 
                          src={item.image_url} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white/90 text-foreground border-0 shadow-lg font-medium">
                            {item.category}
                          </Badge>
                        </div>
                        
                        {/* Title on image */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white mb-1">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.technologies.slice(0, 3).map((tech, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="bg-primary/5 border-primary/20 text-primary/80 rounded-full text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {item.technologies.length > 3 && (
                            <Badge variant="outline" className="bg-muted rounded-full text-xs">
                              +{item.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                        
                        {/* Action */}
                        <button className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                          {language === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                          <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rtl-flip' : ''}`} />
                        </button>
                      </div>
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
