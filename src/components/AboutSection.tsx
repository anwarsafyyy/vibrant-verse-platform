
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
    <section id="about" className="py-12 lg:py-16 relative overflow-hidden bg-background">
      {/* Decorative diamond shapes */}
      <div className="absolute top-20 right-1/3 w-8 h-8 border-2 border-primary/30 rotate-45 hidden lg:block" />
      <div className="absolute top-40 left-20 w-6 h-6 border-2 border-primary/20 rotate-45 hidden lg:block" />
      <div className="absolute bottom-40 right-20 w-6 h-6 border-2 border-primary/20 rotate-45 hidden lg:block" />
      
      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className="absolute bottom-20 left-8 w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-20 hidden lg:flex"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
      
      <div className="container mx-auto px-4">
        {/* Unified Section Header */}
        <div className={`flex items-center gap-4 mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Diamond icon container */}
          <div className="relative">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-accent rotate-45 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <Users className="w-6 h-6 md:w-7 md:h-7 text-white -rotate-45" />
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-primary font-bold text-base md:text-lg">
              {language === 'ar' ? 'تعرف علينا' : 'Get To Know Us'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="olu-text-gradient">
                {language === 'ar' ? 'من نحن' : 'About Us'}
              </span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start" dir="ltr">
          
          {/* Left Side - Image with decorative frame */}
          <div className={`relative order-2 lg:order-1 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            {/* Decorative corner elements */}
            <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-16 sm:h-16 border-t-2 sm:border-t-4 border-l-2 sm:border-l-4 border-primary rounded-tl-xl sm:rounded-tl-3xl z-10" />
            <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-10 h-10 sm:w-16 sm:h-16 border-b-2 sm:border-b-4 border-r-2 sm:border-r-4 border-primary rounded-br-xl sm:rounded-br-3xl z-10" />
            
            {/* Main image container */}
            <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl mx-2 sm:mx-0">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop" 
                alt="Dashboard analytics"
                className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
          
          {/* Right Side - Content */}
          <div className={`text-right order-1 lg:order-2 ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div 
                    key={index}
                    className="group p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-lg sm:rounded-xl border-2 border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-0.5">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Title */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-foreground">
              {language === 'ar' ? 'نبني المستقبل الرقمي' : 'Building Digital Future'}
            </h3>
            
            {/* Description - Long Text with consistent line spacing */}
            <p className="text-base md:text-lg text-muted-foreground leading-loose mb-4">
              {language === 'ar' 
                ? "شركة علو متخصصة في تطوير المواقع والتطبيقات والحلول التقنية المبتكرة. نعمل مع عملائنا لتحويل أفكارهم إلى حقيقة رقمية تساعدهم على تحقيق أهدافهم."
                : "OLU Company specializes in developing websites, applications, and innovative technical solutions. We work with our clients to transform their ideas into digital reality that helps them achieve their goals."
              }
            </p>
            
            <p className="text-base md:text-lg text-muted-foreground/80 leading-loose mb-6">
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
