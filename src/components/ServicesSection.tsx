
import React, { useEffect, useState } from "react";
import { 
  Globe, Code, Cpu, BarChart, MoreHorizontal, LucideIcon,
  Monitor, Smartphone, Shield, Zap, Camera, Headphones,
  Wifi, Database as DatabaseIcon, Cloud, Lock, Users, TrendingUp,
  Settings, Layers, ChevronLeft, ChevronRight, ArrowRight, ArrowLeft
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
  const [activeIndex, setActiveIndex] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById('services');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

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

  const handlePrev = () => {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : services.length - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev < services.length - 1 ? prev + 1 : 0));
  };

  // Get visible services (show 3 at a time centered on activeIndex)
  const getVisibleServices = () => {
    if (services.length <= 3) return services.map((s, i) => ({ service: s, isActive: i === activeIndex }));
    
    const visibleIndices: number[] = [];
    for (let i = -1; i <= 1; i++) {
      let index = activeIndex + i;
      if (index < 0) index = services.length + index;
      if (index >= services.length) index = index - services.length;
      visibleIndices.push(index);
    }
    
    return visibleIndices.map(i => ({ service: services[i], isActive: i === activeIndex }));
  };

  return (
    <section id="services" className="py-28 lg:py-36 relative overflow-hidden bg-background">
      {/* Decorative diamond shapes */}
      <div className="absolute top-32 left-20 w-6 h-6 border-2 border-primary/30 rotate-45 hidden lg:block" />
      <div className="absolute bottom-40 left-32 w-4 h-4 border-2 border-primary/20 rotate-45 hidden lg:block" />
      <div className="absolute top-1/2 right-16 w-8 h-8 border-2 border-primary/20 rotate-45 hidden lg:block" />
      <div className="absolute bottom-32 right-1/4 w-5 h-5 bg-primary/10 rotate-45 hidden lg:block" />
      
      {/* Back to top button style element */}
      <div className="absolute bottom-20 left-8 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hidden lg:flex">
        <ChevronLeft className="w-5 h-5 text-primary rotate-90" />
      </div>
      
      <div className="container mx-auto px-4">
        {/* Section Header - 2P Style */}
        <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-16 ${dir === 'rtl' ? 'lg:flex-row-reverse' : ''} ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Title with diamond icon */}
          <div className={`flex items-center gap-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {/* Diamond icon container */}
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rotate-45 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                <Layers className="w-7 h-7 text-white -rotate-45" />
              </div>
            </div>
            
            <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
              <span className="text-primary font-bold text-lg">
                {language === 'ar' ? 'وحدات' : 'Units'}
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="olu-text-gradient">
                  {language === 'ar' ? 'اعمال الشركة' : 'Our Services'}
                </span>
              </h2>
            </div>
          </div>
          
          {/* Pagination Numbers + Arrows */}
          <div className={`flex items-center gap-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {/* Numbered pagination - reversed for RTL like in image */}
            <div className={`flex items-center gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              {services.slice(0, 6).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`text-lg font-bold transition-all duration-300 ${
                    activeIndex === index 
                      ? 'text-foreground text-2xl' 
                      : 'text-muted-foreground/40 hover:text-muted-foreground'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
            
            {/* Navigation arrows */}
            <div className={`flex gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border-2 border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
              >
                <ChevronLeft className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </button>
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full border-2 border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
              >
                <ChevronRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Services Cards - 2P Style Grid */}
        <div className="relative">
          {loading ? (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${dir === 'rtl' ? 'direction-rtl' : ''}`}>
              {Array(3).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`} className="p-8 border-2 border-dashed border-border rounded-3xl bg-card">
                  <div className="flex justify-center mb-6">
                    <Skeleton className="w-20 h-20 rotate-45 rounded-xl" />
                  </div>
                  <Skeleton className="h-6 w-3/4 mx-auto mb-4" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
          ) : services.length > 0 ? (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${dir === 'rtl' ? '' : ''}`}>
              {getVisibleServices().map(({ service, isActive }, index) => {
                const IconComponent = getIcon(service.icon);
                return (
                  <div 
                    key={service.id}
                    className={`group relative p-8 rounded-3xl transition-all duration-500 cursor-pointer ${
                      isActive 
                        ? 'bg-primary/10 border-2 border-primary shadow-xl shadow-primary/10 scale-[1.02]' 
                        : 'bg-card border-2 border-dashed border-border hover:border-primary/40 hover:shadow-lg'
                    } ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setActiveIndex(services.indexOf(service))}
                  >
                    {/* Diamond Icon Container */}
                    <div className="flex justify-center mb-8">
                      <div className={`relative w-20 h-20 rotate-45 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? 'bg-primary shadow-lg shadow-primary/30' 
                          : 'border-2 border-dashed border-primary/40 group-hover:border-primary group-hover:bg-primary/5'
                      }`}>
                        <IconComponent className={`w-8 h-8 -rotate-45 transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-primary'
                        }`} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className={`text-xl font-bold mb-4 text-center transition-colors ${
                      isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
                    }`}>
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed text-center line-clamp-3 mb-6">
                      {service.description}
                    </p>
                    
                    {/* Arrow Link */}
                    <div className="flex justify-center">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'border-primary text-primary' 
                          : 'border-primary/30 text-primary/50 group-hover:border-primary group-hover:text-primary'
                      }`}>
                        {dir === 'rtl' ? (
                          <ChevronLeft className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              {language === 'ar' ? 'لا توجد خدمات متاحة' : 'No services available'}
            </div>
          )}
        </div>
        
        {/* View All Services Link */}
        <div className={`flex mt-12 ${dir === 'rtl' ? 'justify-start' : 'justify-end'}`}>
          <a 
            href="#" 
            className={`group flex items-center gap-2 text-primary font-bold text-lg hover:gap-4 transition-all duration-300 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
          >
            <span>{language === 'ar' ? 'عرض الجميع' : 'View All'}</span>
            {dir === 'rtl' ? (
              <ArrowLeft className="w-5 h-5" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
