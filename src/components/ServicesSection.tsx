
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
    "from-violet-500 to-purple-600",
    "from-amber-500 to-orange-600",
    "from-emerald-500 to-teal-600",
    "from-pink-500 to-rose-600",
    "from-blue-500 to-indigo-600",
    "from-cyan-500 to-blue-600",
  ];

  const handlePrev = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : services.length - 1;
    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex < services.length - 1 ? activeIndex + 1 : 0;
    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = 360;
    const gap = 24;
    scrollRef.current.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth'
    });
  };

  return (
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden bg-muted/30">
      {/* Decorative elements - 2P style */}
      <div className="absolute top-20 right-20 w-24 h-24 opacity-10 -z-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,5 95,30 95,70 50,95 5,70 5,30" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Section Header - 2P Style */}
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 ${dir === 'rtl' ? 'lg:flex-row-reverse' : ''}`}>
          <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
            {/* Section label with icon */}
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
                {language === 'ar' ? 'وحدات' : 'Business'}
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold">
              <span className="olu-text-gradient">
                {language === 'ar' ? 'اعمال الشركة' : 'Our Services'}
              </span>
            </h2>
          </div>
          
          {/* Pagination Numbers + Arrows - 2P Style */}
          <div className={`flex items-center gap-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {/* Numbered pagination */}
            <div className={`flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              {services.slice(0, 6).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    scrollToIndex(index);
                  }}
                  className={`text-sm font-bold transition-all duration-300 px-2 py-1 ${
                    activeIndex === index 
                      ? 'text-primary' 
                      : 'text-muted-foreground/50 hover:text-muted-foreground'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
            
            {/* Navigation arrows - 2P style */}
            <div className={`flex gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-border hover:border-primary hover:bg-primary/5"
              >
                <ChevronLeft className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-border hover:border-primary hover:bg-primary/5"
              >
                <ChevronRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Services Horizontal Scroll - 2P Style */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className={`flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loading ? (
              Array(4).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`} className="flex-shrink-0 w-[340px] snap-center">
                  <div className="p-8 border border-border rounded-2xl bg-card h-[280px]">
                    <Skeleton className="h-16 w-16 rounded-xl mb-6" />
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              ))
            ) : services.length > 0 ? (
              services.map((service, index) => {
                const IconComponent = getIcon(service.icon);
                return (
                  <div 
                    key={service.id}
                    className="flex-shrink-0 w-[340px] snap-center group"
                  >
                    <div className="relative h-full p-8 border border-border rounded-2xl bg-card hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                      {/* Icon with gradient background */}
                      <div className={`w-16 h-16 bg-gradient-to-br ${colorGradients[index % colorGradients.length]} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Title */}
                      <h3 className={`text-xl font-bold mb-4 group-hover:text-primary transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className={`text-muted-foreground leading-relaxed line-clamp-3 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        {service.description}
                      </p>
                      
                      {/* Discover More Link - appears on hover */}
                      <div className={`mt-6 flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${dir === 'rtl' ? 'justify-end flex-row-reverse' : ''}`}>
                        <span>{language === 'ar' ? 'اكتشف المزيد' : 'Discover More'}</span>
                        {dir === 'rtl' ? (
                          <ChevronLeft className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
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
