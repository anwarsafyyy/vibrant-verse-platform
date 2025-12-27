
import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";
import { ArrowUp, Users, Briefcase, Calendar, Cpu, Smartphone, Award, UserCheck } from "lucide-react";

// Counter animation hook
const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!start) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);
  
  return count;
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

const AboutSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { getAboutContent } = useSiteContent();
  const [isVisible, setIsVisible] = useState(false);
  const [startCounting, setStartCounting] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const { offset: imageOffset, elementRef: imageRef } = useParallax(0.3);
  const { offset: decorOffset, elementRef: decorRef } = useParallax(0.5);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById('about');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Separate observer for stats to trigger counting animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStartCounting(true);
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Counter values
  const clientsCount = useCountUp(100, 2000, startCounting);
  const projectsCount = useCountUp(50, 2000, startCounting);
  const yearsCount = useCountUp(4, 1500, startCounting);
  const techCount = useCountUp(25, 2000, startCounting);

  const stats = [
    { 
      value: clientsCount,
      prefix: '+',
      label: language === 'ar' ? 'عملاء راضون' : 'Happy Clients',
      icon: UserCheck 
    },
    { 
      value: projectsCount,
      prefix: '+',
      label: language === 'ar' ? 'مشاريع مكتملة' : 'Completed Projects',
      icon: Briefcase 
    },
    { 
      value: yearsCount,
      prefix: '+',
      label: language === 'ar' ? 'سنوات خبرة' : 'Years Experience',
      icon: Calendar 
    },
    { 
      value: techCount,
      prefix: '+',
      label: language === 'ar' ? 'تقنيات مستخدمة' : 'Technologies Used',
      icon: Cpu 
    },
  ];

  return (
    <section id="about" className="py-12 lg:py-16 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      
      {/* Decorative diamond shapes */}
      <div className="absolute top-20 right-1/3 w-8 h-8 border-2 border-blue-400/30 rotate-45 hidden lg:block" />
      <div className="absolute top-40 left-20 w-6 h-6 border-2 border-blue-400/20 rotate-45 hidden lg:block" />
      <div className="absolute bottom-40 right-20 w-6 h-6 border-2 border-blue-400/20 rotate-45 hidden lg:block" />
      
      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className="absolute bottom-20 left-8 w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-20 hidden lg:flex"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
      
      <div className="container mx-auto px-4">
        {/* Unified Section Header */}
        <div className={`flex items-center gap-4 mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Diamond icon container */}
          <div className="relative">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rotate-45 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Users className="w-6 h-6 md:w-7 md:h-7 text-white -rotate-45" />
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-blue-400 font-bold text-base md:text-lg">
              {language === 'ar' ? 'تعرف علينا' : 'Get To Know Us'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {language === 'ar' ? 'من نحن' : 'About Us'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start" dir="ltr">
          
          {/* Left Side - Image with decorative frame and parallax */}
          <div 
            ref={imageRef}
            className={`relative order-2 lg:order-1 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          >
            {/* Decorative corner elements with parallax */}
            <div 
              ref={decorRef}
              className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-16 sm:h-16 border-t-2 sm:border-t-4 border-l-2 sm:border-l-4 border-primary rounded-tl-xl sm:rounded-tl-3xl z-10 transition-transform duration-100"
              style={{ transform: `translateY(${-decorOffset}px)` }}
            />
            <div 
              className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-10 h-10 sm:w-16 sm:h-16 border-b-2 sm:border-b-4 border-r-2 sm:border-r-4 border-primary rounded-br-xl sm:rounded-br-3xl z-10 transition-transform duration-100"
              style={{ transform: `translateY(${decorOffset}px)` }}
            />
            
            {/* Main image container with parallax */}
            <div 
              className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl mx-2 sm:mx-0 transition-transform duration-100"
              style={{ transform: `translateY(${imageOffset}px)` }}
            >
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop" 
                alt="Dashboard analytics"
                className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
          
          {/* Right Side - Content */}
          <div className={`text-right order-1 lg:order-2 ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                const gradients = [
                  'from-violet-600 via-purple-500 to-fuchsia-500',
                  'from-purple-600 via-fuchsia-500 to-pink-500',
                  'from-fuchsia-600 via-pink-500 to-rose-400',
                  'from-indigo-600 via-violet-500 to-purple-500',
                ];
                const gradient = gradients[index % gradients.length];
                
                return (
                  <div 
                    key={index}
                    className="group p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer relative overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Gradient border on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl`} />
                    <div className="absolute inset-[2px] bg-[#0d1e3a] rounded-[10px] sm:rounded-[14px] z-10" />
                    
                    <div className="relative z-20">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-lg sm:rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-md" />
                        {/* Shine effect */}
                        <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
                      </div>
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-0.5 tabular-nums" dir="ltr">
                        {stat.prefix}{stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-white/60 font-medium leading-relaxed">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Title */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-white">
              {language === 'ar' ? 'نبني المستقبل الرقمي' : 'Building Digital Future'}
            </h3>
            
            {/* Description - Long Text with consistent line spacing */}
            <p className="text-base md:text-lg text-white/70 leading-loose mb-4">
              {language === 'ar' 
                ? "شركة علو متخصصة في تطوير المواقع والتطبيقات والحلول التقنية المبتكرة. نعمل مع عملائنا لتحويل أفكارهم إلى حقيقة رقمية تساعدهم على تحقيق أهدافهم."
                : "OLU Company specializes in developing websites, applications, and innovative technical solutions. We work with our clients to transform their ideas into digital reality that helps them achieve their goals."
              }
            </p>
            
            <p className="text-base md:text-lg text-white/50 leading-loose mb-6">
              {language === 'ar' 
                ? "نحن نتعاون مع العملاء على مدار رحلتهم الرقمية، بدءًا من التطوير الأولي إلى إدارة البنية التحتية الخلفية. من خلال إعطاء الأولوية لخدمة العملاء الاستثنائية وتخصيص الحلول لتلبية احتياجات الأعمال المحددة."
                : "We collaborate with clients throughout their digital journey, from initial development to backend infrastructure management. By prioritizing exceptional customer service and tailoring solutions to meet specific business needs."
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
