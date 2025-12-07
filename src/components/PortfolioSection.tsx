
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
  const { t, dir } = useLanguage();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        const q = query(
          collection(db, 'portfolio_items'),
          orderBy('order_index', 'asc')
        );
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

  return (
    <section id="portfolio" className="min-h-screen relative flex items-center py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-dot-pattern -z-10"></div>
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent"></div>
      
      {/* Floating decorations */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <Briefcase className="w-4 h-4" />
            {t("portfolio.title")}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="olu-text-gradient">{t("portfolio.title")}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{t("portfolio.subtitle")}</p>
        </div>

        <Carousel className="w-full max-w-[1400px] mx-auto" opts={{ loop: true }}>
          <CarouselContent>
            {loading ? (
              Array(4).fill(0).map((_, index) => (
                <CarouselItem key={`skeleton-${index}`} className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-2">
                  <div className="rounded-3xl overflow-hidden shadow-lg h-full bg-card border border-border/50">
                    <Skeleton className="aspect-video w-full" />
                    <div className="p-6">
                      <Skeleton className="h-7 w-3/4 mb-3" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))
            ) : portfolioItems.length > 0 ? (
              portfolioItems.map((item) => (
                <CarouselItem key={item.id} className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-2">
                  <div className="group rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 h-full bg-card border border-border/50 hover:border-primary/20">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={item.image_url} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 shadow-lg">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.technologies.slice(0, 3).map((tech, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="bg-primary/5 border-primary/20 text-primary/80 rounded-full"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {item.technologies.length > 3 && (
                          <Badge variant="outline" className="bg-muted rounded-full">
                            +{item.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="group/btn p-0 h-auto hover:bg-transparent">
                        <span className="text-primary font-semibold">View Project</span>
                        <ArrowRight className={`ml-2 h-4 w-4 text-primary transition-transform group-hover/btn:translate-x-1 ${dir === "rtl" ? "rtl-flip" : ""}`} />
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
          <div className="flex justify-center mt-10 gap-4">
            <CarouselPrevious className="relative static translate-y-0 rounded-full w-12 h-12 bg-card border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300" />
            <CarouselNext className="relative static translate-y-0 rounded-full w-12 h-12 bg-card border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default PortfolioSection;
