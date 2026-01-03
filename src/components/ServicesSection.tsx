
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

// 3D Card component with tilt effect
const Card3D: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}> = ({ children, className = '', style, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        ...style,
        transform,
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
      {/* Glare effect */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
          transition: 'opacity 0.15s ease-out',
        }}
      />
    </div>
  );
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
    <section id="services" className="py-12 lg:py-16 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
      
      {/* Decorative diamond shapes with parallax */}
      <div 
        ref={decorRef1}
        className="absolute top-32 left-20 w-6 h-6 border-2 border-blue-400/30 rotate-45 hidden lg:block transition-transform duration-100"
        style={{ transform: `translateY(${decorOffset1}px) rotate(45deg)` }}
      />
      <div 
        ref={decorRef2}
        className="absolute bottom-40 left-32 w-4 h-4 border-2 border-blue-400/20 rotate-45 hidden lg:block transition-transform duration-100"
        style={{ transform: `translateY(${-decorOffset2}px) rotate(45deg)` }}
      />
      <div 
        ref={decorRef3}
        className="absolute top-1/2 right-16 w-8 h-8 border-2 border-blue-400/20 rotate-45 hidden lg:block transition-transform duration-100"
        style={{ transform: `translateY(${decorOffset3}px) rotate(45deg)` }}
      />
      
      <div className="container mx-auto px-4">
        {/* Unified Section Header */}
        <div className={`flex items-center gap-4 mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Diamond icon container */}
          <div className="relative">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rotate-45 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Layers className="w-6 h-6 md:w-7 md:h-7 text-white -rotate-45" />
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-blue-400 font-bold text-base md:text-lg">
              {language === 'ar' ? 'خدماتنا' : 'Our Services'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {language === 'ar' ? 'ما نقدمه' : 'What We Offer'}
            </h2>
          </div>
        </div>

        {/* Services Cards with Navigation Arrows */}
        <div className="relative flex items-center gap-4">
          {/* Right Arrow (Next in RTL) */}
          <button 
            onClick={handleNext}
            className="hidden lg:flex flex-shrink-0 w-14 h-14 rounded-full border-2 border-blue-400/30 items-center justify-center text-blue-400 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards */}
          <div className="flex-1">
            {loading ? (
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${dir === 'rtl' ? 'direction-rtl' : ''}`}>
                {Array(3).fill(0).map((_, index) => (
                  <div key={`skeleton-${index}`} className="p-8 border-2 border-dashed border-white/10 rounded-3xl bg-white/5">
                    <div className="flex justify-center mb-6">
                      <Skeleton className="w-20 h-20 rotate-45 rounded-xl bg-white/10" />
                    </div>
                    <Skeleton className="h-6 w-3/4 mx-auto mb-4 bg-white/10" />
                    <Skeleton className="h-16 w-full bg-white/10" />
                  </div>
                ))}
              </div>
            ) : services.length > 0 ? (
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
                {getVisibleServices().map(({ service }, index) => {
                  const IconComponent = getIcon(service.icon);
                  // Different gradient colors matching logo (purple, pink, magenta)
                  const gradients = [
                    'from-violet-600 via-purple-500 to-fuchsia-500',
                    'from-purple-600 via-fuchsia-500 to-pink-500',
                    'from-fuchsia-600 via-pink-500 to-rose-400',
                    'from-indigo-600 via-violet-500 to-purple-500',
                    'from-pink-600 via-rose-500 to-fuchsia-400',
                    'from-violet-500 via-fuchsia-500 to-pink-400',
                  ];
                  const gradient = gradients[index % gradients.length];
                  
                  return (
                    <Card3D 
                      key={service.id}
                      className={`group relative overflow-hidden rounded-3xl cursor-pointer bg-[hsl(262,45%,35%)] backdrop-blur-sm border border-purple-400/20 hover:border-purple-300/50 transition-all duration-500 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Gradient border on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
                      <div className="absolute inset-[2px] bg-[hsl(262,45%,35%)] rounded-[22px] z-10" />
                      
                      {/* Content */}
                      <div className="relative z-20 p-8">
                        {/* Floating particles effect */}
                        <div className={`absolute top-4 right-4 w-20 h-20 bg-gradient-to-br ${gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-30 group-hover:scale-150 transition-all duration-700`} />
                        <div className={`absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br ${gradient} opacity-5 rounded-full blur-xl group-hover:opacity-20 group-hover:scale-125 transition-all duration-500`} />
                        
                        {/* Icon Container with gradient */}
                        <div className="flex justify-center mb-6">
                          <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl`}>
                            <IconComponent className="w-9 h-9 text-white drop-shadow-md" />
                            {/* Shine effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold mb-3 text-center transition-colors text-white group-hover:text-blue-400">
                          {language === 'ar' 
                            ? (service.title_ar || service.title) 
                            : (service.title_en || serviceTranslations[service.title_ar || service.title || '']?.title || service.title_ar || service.title)}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-white/60 leading-relaxed text-center line-clamp-3 mb-6 text-sm">
                          {language === 'ar' 
                            ? (service.description_ar || service.description) 
                            : (service.description_en || serviceTranslations[service.title_ar || service.title || '']?.description || service.description_ar || service.description)}
                        </p>
                        
                        {/* CTA Button */}
                        <div className="flex justify-center">
                          <div className={`px-6 py-2.5 rounded-full bg-gradient-to-r ${gradient} text-white text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg flex items-center gap-2`}>
                            <span>{language === 'ar' ? 'اكتشف المزيد' : 'Learn More'}</span>
                            <ChevronLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
                          </div>
                        </div>
                      </div>
                    </Card3D>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 text-white/60">
                {language === 'ar' ? 'لا توجد خدمات متاحة' : 'No services available'}
              </div>
            )}
          </div>

          {/* Left Arrow (Prev in RTL) */}
          <button 
            onClick={handlePrev}
            className="hidden lg:flex flex-shrink-0 w-14 h-14 rounded-full border-2 border-blue-400/30 items-center justify-center text-blue-400 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden justify-center gap-4 mt-8">
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full border-2 border-blue-400/30 flex items-center justify-center text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border-2 border-blue-400/30 flex items-center justify-center text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
