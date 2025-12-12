
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";
import { ArrowUp, Users, Briefcase, Calendar, Cpu, Smartphone, Award, UserCheck } from "lucide-react";

const AboutSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { getAboutContent } = useSiteContent();
  const [isVisible, setIsVisible] = useState(false);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stats = [
    { 
      value: '+100', 
      label: language === 'ar' ? 'عملاء راضون' : 'Happy Clients',
      icon: UserCheck 
    },
    { 
      value: '+50', 
      label: language === 'ar' ? 'مشاريع مكتملة' : 'Completed Projects',
      icon: Briefcase 
    },
    { 
      value: '+4', 
      label: language === 'ar' ? 'سنوات خبرة' : 'Years Experience',
      icon: Calendar 
    },
    { 
      value: '+25', 
      label: language === 'ar' ? 'تقنيات مستخدمة' : 'Technologies Used',
      icon: Cpu 
    },
  ];

  return (
    <section id="about" className="py-28 lg:py-36 relative overflow-hidden bg-background">
      {/* Decorative diamond shapes */}
      <div className="absolute top-20 right-1/3 w-8 h-8 border-2 border-primary/30 rotate-45 hidden lg:block" />
      <div className="absolute top-40 left-20 w-6 h-6 border-2 border-primary/20 rotate-45 hidden lg:block" />
      <div className="absolute bottom-40 right-20 w-6 h-6 border-2 border-primary/20 rotate-45 hidden lg:block" />
      <div className="absolute bottom-20 left-1/2 w-8 h-8 border-2 border-primary/30 rotate-45 hidden lg:block" />
      
      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className="absolute bottom-20 left-8 w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-20 hidden lg:flex"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start" dir="ltr">
          
          {/* Left Side - Image with decorative frame */}
          <div className={`relative order-2 lg:order-1 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            {/* Decorative corner elements - smaller on mobile */}
            <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-16 sm:h-16 border-t-2 sm:border-t-4 border-l-2 sm:border-l-4 border-primary rounded-tl-xl sm:rounded-tl-3xl z-10" />
            <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-10 h-10 sm:w-16 sm:h-16 border-b-2 sm:border-b-4 border-r-2 sm:border-r-4 border-primary rounded-br-xl sm:rounded-br-3xl z-10" />
            
            {/* Decorative diamonds around image */}
            <div className="absolute -right-8 top-1/3 w-10 h-10 border-2 border-primary/40 rotate-45 hidden lg:block" />
            <div className="absolute -right-12 top-1/2 w-6 h-6 border-2 border-primary/30 rotate-45 hidden lg:block" />
            
            {/* Main image container */}
            <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl mx-2 sm:mx-0">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop" 
                alt="Dashboard analytics"
                className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
          
          {/* Right Side - Content */}
          <div className={`text-right order-1 lg:order-2 ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
            {/* Section Header */}
            <div className="flex items-center gap-3 sm:gap-4 justify-end mb-6 md:mb-8">
              <div className="text-right">
                <span className="text-primary font-bold text-base sm:text-lg md:text-xl">
                  {language === 'ar' ? 'من' : 'About'}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                  <span className="olu-text-gradient">
                    {language === 'ar' ? 'نحن' : 'Us'}
                  </span>
                </h2>
              </div>
              {/* Decorative diamond icon */}
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary rotate-45 rounded-lg sm:rounded-xl shadow-lg shadow-primary/30" />
                <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-white/30 rotate-0 rounded-md sm:rounded-lg" />
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 md:mb-10">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div 
                    key={index}
                    className="group p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Icon */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto mb-2 sm:mb-3 rounded-lg sm:rounded-xl border-2 border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </div>
                    
                    {/* Value */}
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-0.5 sm:mb-1">
                      {stat.value}
                    </div>
                    
                    {/* Label */}
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Title */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-foreground">
              {language === 'ar' ? 'نبني المستقبل الرقمي' : 'Building Digital Future'}
            </h3>
            
            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6">
              {language === 'ar' 
                ? "شركة علو متخصصة في تطوير المواقع والتطبيقات والحلول التقنية المبتكرة. نعمل مع عملائنا لتحويل أفكارهم إلى حقيقة رقمية تساعدهم على تحقيق أهدافهم."
                : "OLU Company specializes in developing websites, applications, and innovative technical solutions. We work with our clients to transform their ideas into digital reality that helps them achieve their goals."
              }
            </p>
            
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground/80 leading-relaxed mb-6 md:mb-8">
              {language === 'ar' 
                ? "نحن نتعاون مع العملاء على مدار رحلتهم الرقمية، بدءًا من التطوير الأولي إلى إدارة البنية التحتية الخلفية. من خلال إعطاء الأولوية لخدمة العملاء الاستثنائية وتخصيص الحلول لتلبية احتياجات الأعمال المحددة."
                : "We collaborate with clients throughout their digital journey, from initial development to backend infrastructure management. By prioritizing exceptional customer service and tailoring solutions to meet specific business needs."
              }
            </p>
            
            {/* Read More Link */}
            <a 
              href="#services" 
              className="inline-flex items-center gap-2 text-primary font-bold text-base md:text-lg hover:gap-4 transition-all duration-300"
            >
              <span>{language === 'ar' ? 'اقرأ المزيد' : 'Read More'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
