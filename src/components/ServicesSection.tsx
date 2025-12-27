
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
  title?: string;
  title_ar?: string;
  title_en?: string;
  description?: string;
  description_ar?: string;
  description_en?: string;
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

// Fallback translations for services without English content
const serviceTranslations: Record<string, { title: string; description: string }> = {
  'تطوير المواقع': { title: 'Web Development', description: 'Creating fast, professional, and user-friendly websites.' },
  'تطوير تطبيقات الجوال': { title: 'Mobile App Development', description: 'We develop custom mobile and web applications that meet your business needs.' },
  'التحول الرقمي': { title: 'Digital Transformation', description: 'Moving your business to the digital world with thoughtful steps.' },
  'التسويق الرقمي': { title: 'Digital Marketing', description: 'Comprehensive digital marketing solutions to grow your business online.' },
  'تصميم الهوية البصرية': { title: 'Brand Identity Design', description: 'Creating unique visual identities that reflect your brand values.' },
  'الاستشارات التقنية': { title: 'Technical Consulting', description: 'Expert technical consulting to help your business thrive.' },
};

// Parallax hook
const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.innerHeight - rect.top;
        if (scrolled > 0) {
          setOffset(scrolled * speed * 0.1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { offset, elementRef };
};

const ServicesSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const { offset: decorOffset1, elementRef: decorRef1 } = useParallax(0.4);
  const { offset: decorOffset2, elementRef: decorRef2 } = useParallax(0.6);
  const { offset: decorOffset3, elementRef: decorRef3 } = useParallax(0.3);

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
    <section id="services" className="py-12 lg:py-16 relative overflow-hidden animate-gradient-flow">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
      
      {/* Decorative diamond shapes with parallax */}
      <div 
        ref={decorRef1}
        className="absolute top-32 left-20 w-6 h-6 border-2 border-primary/30 rotate-45 hidden lg:block transition-transform duration-100"
        style={{ transform: `translateY(${decorOffset1}px) rotate(45deg)` }}
      />
      <div 
        ref={decorRef2}
        className="absolute bottom-40 left-32 w-4 h-4 border-2 border-primary/20 rotate-45 hidden lg:block transition-transform duration-100"
        style={{ transform: `translateY(${-decorOffset2}px) rotate(45deg)` }}
      />
      <div 
        ref={decorRef3}
        className="absolute top-1/2 right-16 w-8 h-8 border-2 border-primary/20 rotate-45 hidden lg:block transition-transform duration-100"
        style={{ transform: `translateY(${decorOffset3}px) rotate(45deg)` }}
      />
      
      <div className="container mx-auto px-4">
        {/* Unified Section Header */}
        <div className={`flex items-center gap-4 mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Diamond icon container */}
          <div className="relative">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-accent rotate-45 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <Layers className="w-6 h-6 md:w-7 md:h-7 text-white -rotate-45" />
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-primary font-bold text-base md:text-lg">
              {language === 'ar' ? 'خدماتنا' : 'Our Services'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="olu-text-gradient">
                {language === 'ar' ? 'ما نقدمه' : 'What We Offer'}
              </span>
            </h2>
          </div>
        </div>

        {/* Services Cards with Navigation Arrows */}
        <div className="relative flex items-center gap-4">
          {/* Right Arrow (Next in RTL) */}
          <button 
            onClick={handleNext}
            className="hidden lg:flex flex-shrink-0 w-14 h-14 rounded-full border-2 border-primary/30 items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards */}
          <div className="flex-1">
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
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
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
                        {language === 'ar' 
                          ? (service.title_ar || service.title) 
                          : (service.title_en || serviceTranslations[service.title_ar || service.title || '']?.title || service.title_ar || service.title)}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed text-center line-clamp-3 mb-6">
                        {language === 'ar' 
                          ? (service.description_ar || service.description) 
                          : (service.description_en || serviceTranslations[service.title_ar || service.title || '']?.description || service.description_ar || service.description)}
                      </p>
                      
                      {/* Arrow Link */}
                      <div className="flex justify-center">
                        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? 'border-primary text-primary' 
                            : 'border-primary/30 text-primary/50 group-hover:border-primary group-hover:text-primary'
                        }`}>
                          <ChevronLeft className="w-5 h-5" />
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

          {/* Left Arrow (Prev in RTL) */}
          <button 
            onClick={handlePrev}
            className="hidden lg:flex flex-shrink-0 w-14 h-14 rounded-full border-2 border-primary/30 items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden justify-center gap-4 mt-8">
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full border-2 border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border-2 border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
