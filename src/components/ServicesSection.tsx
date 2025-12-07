
import React, { useEffect, useState, useRef } from "react";
import { 
  Globe, Code, Cpu, BarChart, MoreHorizontal, LucideIcon,
  Monitor, Smartphone, Shield, Zap, Camera, Headphones,
  Wifi, Database as DatabaseIcon, Cloud, Lock, Users, TrendingUp,
  Settings, Layers, ChevronLeft, ChevronRight
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
  created_at: any;
}

const iconMap: Record<string, LucideIcon> = {
  'globe': Globe, 'code': Code, 'cpu': Cpu, 'bar-chart': BarChart,
  'monitor': Monitor, 'smartphone': Smartphone, 'shield': Shield, 'zap': Zap,
  'camera': Camera, 'headphones': Headphones, 'wifi': Wifi, 'database': DatabaseIcon,
  'cloud': Cloud, 'lock': Lock, 'users': Users, 'trending-up': TrendingUp,
  'settings': Settings, 'layers': Layers,
};

const ServicesSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(collection(db, 'services'), orderBy('order_index', 'asc'));
        const snapshot = await getDocs(q);
        const servicesData: Service[] = [];
        snapshot.forEach(doc => {
          servicesData.push({ id: doc.id, ...doc.data() } as Service);
        });
        setServices(servicesData);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const getIcon = (iconName: string): LucideIcon => iconMap[iconName] || MoreHorizontal;

  const colorGradients = [
    "from-violet-500 via-purple-500 to-fuchsia-500",
    "from-amber-500 via-orange-500 to-red-500",
    "from-emerald-500 via-teal-500 to-cyan-500",
    "from-pink-500 via-rose-500 to-red-500",
    "from-blue-500 via-indigo-500 to-violet-500",
    "from-cyan-500 via-teal-500 to-emerald-500",
  ];

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const items = scrollRef.current.children;
    if (items[index]) {
      items[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : services.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex < services.length - 1 ? activeIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4">
        {/* Section Header - 2P Style */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-16 bg-gradient-to-b from-primary to-accent rounded-full hidden md:block" />
              <div>
                <span className="text-primary font-bold text-sm uppercase tracking-wider block mb-2">
                  {language === 'ar' ? 'وحدات' : 'Business'}
                </span>
                <h2 className="font-bold tracking-tight">
                  <span className="olu-text-gradient">{t("services.title")}</span>
                </h2>
              </div>
            </div>
          </div>
          
          {/* Pagination Numbers - 2P Style */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {services.slice(0, 6).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`text-sm font-bold transition-all duration-300 px-2 py-1 rounded ${
                    activeIndex === index 
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
                onClick={handlePrev}
                className="rounded-full border border-border/50 hover:border-primary hover:bg-primary/5"
              >
                <ChevronLeft className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleNext}
                className="rounded-full border border-border/50 hover:border-primary hover:bg-primary/5"
              >
                <ChevronRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Services Horizontal Scroll */}
        <div className="relative -mx-4">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 px-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loading ? (
              Array(4).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`} className="flex-shrink-0 w-[320px] md:w-[380px] snap-center">
                  <div className="p-8 border border-border/50 rounded-3xl bg-card">
                    <Skeleton className="h-16 w-16 rounded-2xl mb-6" />
                    <Skeleton className="h-7 w-3/4 mb-4" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
              ))
            ) : services.length > 0 ? (
              services.map((service, index) => {
                const IconComponent = getIcon(service.icon);
                return (
                  <div 
                    key={service.id}
                    className="flex-shrink-0 w-[320px] md:w-[380px] snap-center group"
                  >
                    <div className="relative h-full p-8 border border-border/50 rounded-3xl bg-card hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 card-shine">
                      {/* Gradient background on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${colorGradients[index % colorGradients.length]} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                      
                      <div className="relative">
                        {/* Icon */}
                        <div className={`w-16 h-16 bg-gradient-to-br ${colorGradients[index % colorGradients.length]} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed line-clamp-3">
                          {service.description}
                        </p>
                        
                        {/* Learn More Link */}
                        <button className="mt-6 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2">
                          {language === 'ar' ? 'اكتشف المزيد' : 'Discover More'}
                          <ChevronRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full text-center py-10 text-muted-foreground">
                No services available.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
