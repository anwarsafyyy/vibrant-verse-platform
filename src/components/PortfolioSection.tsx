
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import type { Database } from "@/types/supabase";

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];

const PortfolioSection: React.FC = () => {
  const { t, dir } = useLanguage();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_items')
          .select('*')
          .order('order_index', { ascending: true });
          
        if (error) {
          console.error("Error fetching portfolio items:", error);
          return;
        }
        
        setPortfolioItems(data || []);
      } catch (error) {
        console.error("Failed to fetch portfolio items:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPortfolioItems();
  }, []);

  return (
    <section id="portfolio" className="min-h-screen relative flex items-center py-20">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="olu-text-gradient">{t("portfolio.title")}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-6">{t("portfolio.subtitle")}</p>
          <div className="w-24 h-1 olu-gradient mx-auto rounded-full"></div>
        </div>

        <Carousel className="w-full max-w-[1400px] mx-auto" opts={{ loop: true }}>
          <CarouselContent>
            {loading ? (
              // Loading skeletons
              Array(4).fill(0).map((_, index) => (
                <CarouselItem key={`skeleton-${index}`} className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-1">
                  <div className="p-2">
                    <div className="rounded-xl overflow-hidden shadow-lg h-full bg-card">
                      <Skeleton className="aspect-video w-full" />
                      <div className="p-5">
                        <Skeleton className="h-7 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))
            ) : portfolioItems.length > 0 ? (
              // Portfolio item cards
              portfolioItems.map((item) => (
                <CarouselItem key={item.id} className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-1">
                  <div className="p-2">
                    <div className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full bg-card">
                      <div className="relative aspect-video overflow-hidden">
                        <img 
                          src={item.image_url} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge variant="secondary" className="bg-black/60 text-white">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground mb-4">{item.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.technologies.map((tech, index) => (
                            <Badge key={index} variant="outline" className="bg-primary/5">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm" className="group">
                          View Project
                          <ArrowRight className={`ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 ${dir === "rtl" ? "rtl-flip" : ""}`} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))
            ) : (
              // Fallback for no data
              <CarouselItem className="basis-full">
                <div className="text-center py-20">
                  <p className="text-muted-foreground">No portfolio items available.</p>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="relative static mx-2 translate-y-0" />
            <CarouselNext className="relative static mx-2 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default PortfolioSection;
