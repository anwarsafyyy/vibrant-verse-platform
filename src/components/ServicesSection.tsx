
import React, { useEffect, useState, useRef } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
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
    const cardWidth = 380;
    const gap = 24;
    scrollRef.current.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth'
    });
  };

  return (
    <section id="services" className="py-28 lg:py-36 relative overflow-hidden bg-muted/30">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 opacity-10 -z-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,5 95,30 95,70 50,95 5,70 5,30" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-10 w-24 h-24 opacity-10 -z-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="10" y="10" width="80" height="80" rx="10" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" transform="rotate(45 50 50)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 ${dir === 'rtl' ? 'lg:flex-row-reverse' : ''} ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
            {/* Section label */}
            <div className={`flex items-center gap-3 mb-6 ${dir === 'rtl' ? 'justify-end flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm">
                {language === 'ar' ? 'خدماتنا' : 'Our Services'}
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
              <span className="olu-text-gradient">
                {language === 'ar' ? 'اعمال الشركة' : 'What We Do'}
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              {language === 'ar' 
                ? 'نقدم حلولاً تقنية متكاملة تلبي احتياجات عملائنا في عصر التحول الرقمي'
                : 'We provide integrated technology solutions that meet our clients needs in the digital transformation era'
              }
            </p>
          </div>
          
          {/* Navigation */}
          <div className={`flex items-center gap-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {/* Pagination dots */}
            <div className={`hidden md:flex items-center gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              {services.slice(0, 6).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    scrollToIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
            
            {/* Arrows */}
            <div className={`flex gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handlePrev}
                className="w-12 h-12 rounded-xl border-2 border-border hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <ChevronLeft className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleNext}
                className="w-12 h-12 rounded-xl border-2 border-border hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <ChevronRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Services Cards */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className={`flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loading ? (
              Array(4).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`} className="flex-shrink-0 w-[360px] snap-center">
                  <div className="p-8 border border-border rounded-3xl bg-card h-[320px]">
                    <Skeleton className="h-16 w-16 rounded-2xl mb-6" />
                    <Skeleton className="h-6 w-3/4 mb-4" />
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
                    className={`flex-shrink-0 w-[360px] snap-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="group relative h-full p-8 border border-border rounded-3xl bg-card hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-3">
                      {/* Number */}
                      <span className={`absolute top-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} text-6xl font-bold text-muted/30 group-hover:text-primary/20 transition-colors`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      
                      {/* Icon */}
                      <div className={`w-16 h-16 bg-gradient-to-br ${colorGradients[index % colorGradients.length]} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Title */}
                      <h3 className={`text-xl font-bold mb-4 group-hover:text-primary transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className={`text-muted-foreground leading-relaxed line-clamp-3 mb-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        {service.description}
                      </p>
                      
                      {/* Link */}
                      <div className={`flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 ${dir === 'rtl' ? 'justify-end flex-row-reverse' : ''}`}>
                        <span>{language === 'ar' ? 'اكتشف المزيد' : 'Learn More'}</span>
                        {dir === 'rtl' ? (
                          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        ) : (
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full text-center py-16 text-muted-foreground">
                {language === 'ar' ? 'لا توجد خدمات متاحة' : 'No services available'}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
