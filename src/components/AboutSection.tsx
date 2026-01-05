
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

  // Counter values (doubled)
  const clientsCount = useCountUp(200, 2000, startCounting);
  const projectsCount = useCountUp(100, 2000, startCounting);
  const yearsCount = useCountUp(8, 1500, startCounting);
  const techCount = useCountUp(50, 2000, startCounting);

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
    <section id="about" className="py-12 lg:py-16 relative overflow-hidden bg-white" ref={decorRef}>
      {/* Decorative Background Circles */}
      <div className="absolute left-[-5%] top-[10%] w-32 h-32 md:w-48 md:h-48 bg-[hsl(250,40%,75%)] rounded-full opacity-40" />
      <div className="absolute right-[-3%] bottom-[15%] w-24 h-24 md:w-36 md:h-36 bg-[hsl(250,40%,75%)] rounded-full opacity-35" />
      <div className="absolute right-[20%] top-[5%] w-16 h-16 md:w-24 md:h-24 bg-[hsl(320,50%,80%)] rounded-full opacity-40" />
      <div className="absolute left-[15%] bottom-[20%] w-20 h-20 md:w-28 md:h-28 bg-[hsl(170,45%,75%)] rounded-full opacity-35" />
      
      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className="absolute bottom-20 left-8 w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-20 hidden lg:flex"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
      
      <div className="container mx-auto px-4">
        {/* Unified Section Header */}
        <div className={`flex items-center gap-4 mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Diamond icon container */}
          <div className="relative">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rotate-45 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Users className="w-6 h-6 md:w-7 md:h-7 text-white -rotate-45" />
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-purple-500 font-bold text-base md:text-lg">
              {language === 'ar' ? 'تعرف علينا' : 'Get To Know Us'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              {language === 'ar' ? 'من نحن' : 'About Us'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start" dir="ltr">
          
          {/* Left Side - Tablet Mockup with Dashboard */}
          <div 
            ref={imageRef}
            className={`relative order-2 lg:order-1 flex items-center justify-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          >
            {/* Golden decorative curves */}
            <div 
              className="absolute -bottom-8 -left-4 w-32 h-32 md:w-48 md:h-48 border-4 md:border-8 border-[hsl(45,80%,55%)] rounded-full opacity-80 z-0"
              style={{ 
                clipPath: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)',
                transform: `translateY(${decorOffset}px)` 
              }}
            />
            <div 
              className="absolute -bottom-4 left-8 w-24 h-24 md:w-36 md:h-36 border-4 md:border-6 border-[hsl(35,75%,50%)] rounded-full opacity-70 z-0"
              style={{ 
                clipPath: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)',
                transform: `translateY(${-decorOffset * 0.5}px)` 
              }}
            />
            
            {/* Tablet Frame */}
            <div 
              className="relative z-10 transition-transform duration-100"
              style={{ 
                transform: `perspective(1000px) rotateY(-8deg) rotateX(5deg) translateY(${imageOffset}px)`,
              }}
            >
              {/* Tablet outer frame */}
              <div className="relative bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-[20px] md:rounded-[32px] p-2 md:p-3 shadow-2xl">
                {/* Tablet inner bezel */}
                <div className="relative bg-gray-900 rounded-[16px] md:rounded-[26px] p-1.5 md:p-2">
                  {/* Camera notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full z-20" />
                  
                  {/* Screen */}
                  <div className="relative bg-[hsl(220,30%,20%)] rounded-[12px] md:rounded-[20px] overflow-hidden w-[280px] sm:w-[340px] md:w-[420px] h-[200px] sm:h-[240px] md:h-[300px]">
                    {/* Dashboard Header */}
                    <div className="bg-[hsl(220,35%,18%)] px-3 py-2 flex items-center justify-between border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg" />
                        <span className="text-white text-xs font-bold hidden sm:block">لوحة التحكم</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="px-2 py-1 bg-green-500/20 text-green-400 text-[10px] rounded-full">متصل</div>
                      </div>
                    </div>
                    
                    {/* Dashboard Content */}
                    <div className="p-2 md:p-3 space-y-2">
                      {/* Stats Row */}
                      <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-lg p-2 text-center border border-purple-500/20">
                          <div className="text-white font-bold text-sm md:text-lg">2356</div>
                          <div className="text-purple-300 text-[8px] md:text-[10px]">الرسائل</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg p-2 text-center border border-blue-500/20">
                          <div className="text-white font-bold text-sm md:text-lg">50</div>
                          <div className="text-blue-300 text-[8px] md:text-[10px]">المحادثات</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-lg p-2 text-center border border-green-500/20">
                          <div className="text-white font-bold text-sm md:text-lg">20</div>
                          <div className="text-green-300 text-[8px] md:text-[10px]">الحملات</div>
                        </div>
                      </div>
                      
                      {/* Chart Area */}
                      <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/60 text-[8px] md:text-[10px]">إحصائيات الرسائل</span>
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full" />
                            <span className="w-2 h-2 bg-red-400 rounded-full" />
                          </div>
                        </div>
                        {/* Fake chart lines */}
                        <div className="h-12 md:h-16 flex items-end gap-0.5">
                          {[40, 65, 45, 80, 55, 70, 60, 75, 50, 85, 65, 70].map((h, i) => (
                            <div 
                              key={i} 
                              className="flex-1 bg-gradient-to-t from-green-500/50 to-green-400/30 rounded-t-sm"
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Bottom stats */}
                      <div className="flex gap-2">
                        <div className="flex-1 bg-white/5 rounded-lg p-1.5 flex items-center gap-2 border border-white/10">
                          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                            <span className="text-white text-[8px] md:text-[10px] font-bold">85%</span>
                          </div>
                          <div className="text-[8px] md:text-[10px] text-white/70">نسبة النجاح</div>
                        </div>
                        <div className="flex-1 bg-white/5 rounded-lg p-1.5 text-center border border-white/10">
                          <div className="text-white font-bold text-xs md:text-sm">2500</div>
                          <div className="text-white/50 text-[7px] md:text-[8px]">رسائل اليوم</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tablet stand/reflection */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gradient-to-b from-gray-800/50 to-transparent rounded-full blur-sm" />
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
                    className="group p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-purple-400/20 bg-[hsl(262,45%,35%)] hover:border-purple-300/50 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer relative overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Gradient border on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl`} />
                    <div className="absolute inset-[2px] bg-[hsl(262,45%,35%)] rounded-[10px] sm:rounded-[14px] z-10" />
                    
                    <div className="relative z-20">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-lg sm:rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
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
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-gray-800">
              {language === 'ar' ? 'نبني المستقبل الرقمي' : 'Building Digital Future'}
            </h3>
            
            {/* Description - Long Text with consistent line spacing */}
            <p className="text-base md:text-lg text-gray-600 leading-loose mb-4">
              {language === 'ar' 
                ? "شركة علو متخصصة في تطوير المواقع والتطبيقات والحلول التقنية المبتكرة. نعمل مع عملائنا لتحويل أفكارهم إلى حقيقة رقمية تساعدهم على تحقيق أهدافهم."
                : "OLU Company specializes in developing websites, applications, and innovative technical solutions. We work with our clients to transform their ideas into digital reality that helps them achieve their goals."
              }
            </p>
            
            <p className="text-base md:text-lg text-gray-500 leading-loose mb-6">
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
