
import React, { useEffect, useState } from "react";
import { Globe, Code, Cpu, BarChart, MoreHorizontal } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import type { Database } from "@/types/supabase";

type Service = Database['public']['Tables']['services']['Row'];

const iconMap: Record<string, React.ElementType> = {
  'globe': Globe,
  'code': Code,
  'cpu': Cpu,
  'bar-chart': BarChart,
};

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('order_index', { ascending: true });
          
        if (error) {
          console.error("Error fetching services:", error);
          return;
        }
        
        setServices(data || []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || MoreHorizontal;
  };

  return (
    <section id="services" className="min-h-screen py-20 relative flex items-center">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="olu-gold-text-gradient">{t("services.title")}</span>
          </h2>
          <div className="w-24 h-1 bg-olu-gold mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("services.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            // Loading skeletons
            Array(4).fill(0).map((_, index) => (
              <div key={`skeleton-${index}`} className="p-6 border rounded-lg">
                <Skeleton className="h-16 w-16 rounded-lg mb-6" />
                <Skeleton className="h-7 w-3/4 mb-4" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))
          ) : services.length > 0 ? (
            // Service cards
            services.map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={getIcon(service.icon)}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            ))
          ) : (
            // Fallback for no data
            <div className="col-span-full text-center py-10 text-muted-foreground">
              No services available.
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="gold" size="pill" className="mt-8 px-10 py-6 text-base">
            {t("services.viewAll")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
