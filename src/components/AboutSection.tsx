
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start" dir="ltr">
          
          {/* Left Side - Image with decorative frame */}
          <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            {/* Decorative corner elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-primary rounded-tl-3xl z-10" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 border-primary rounded-br-3xl z-10" />
            
            {/* Decorative diamonds around image */}
            <div className="absolute -right-8 top-1/3 w-10 h-10 border-2 border-primary/40 rotate-45 hidden lg:block" />
            <div className="absolute -right-12 top-1/2 w-6 h-6 border-2 border-primary/30 rotate-45 hidden lg:block" />
            
            {/* Main image container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop" 
                alt="Team working together"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
          
          {/* Right Side - Content */}
          <div className={`text-right ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
            {/* Section Header */}
            <div className="flex items-center gap-4 justify-end mb-8">
              <div className="text-right">
                <span className="text-primary font-bold text-xl">
                  {language === 'ar' ? 'من' : 'About'}
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold">
                  <span className="olu-text-gradient">
                    {language === 'ar' ? 'نحن' : 'Us'}
                  </span>
                </h2>
              </div>
              {/* Decorative diamond icon */}
              <div className="relative">
                <div className="w-16 h-16 bg-primary rotate-45 rounded-xl shadow-lg shadow-primary/30" />
                <div className="absolute top-2 right-2 w-12 h-12 border-2 border-white/30 rotate-0 rounded-lg" />
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div 
                    key={index}
                    className="group p-4 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 mx-auto mb-3 rounded-xl border-2 border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    {/* Value */}
                    <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    
                    {/* Label */}
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Title */}
            <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-foreground">
              {language === 'ar' ? 'نبني المستقبل الرقمي' : 'Building Digital Future'}
            </h3>
            
            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {language === 'ar' 
                ? "شركة علو متخصصة في تطوير المواقع والتطبيقات والحلول التقنية المبتكرة. نعمل مع عملائنا لتحويل أفكارهم إلى حقيقة رقمية تساعدهم على تحقيق أهدافهم."
                : "OLU Company specializes in developing websites, applications, and innovative technical solutions. We work with our clients to transform their ideas into digital reality that helps them achieve their goals."
              }
            </p>
            
            <p className="text-base text-muted-foreground/80 leading-relaxed mb-8">
              {language === 'ar' 
                ? "نحن نتعاون مع العملاء على مدار رحلتهم الرقمية، بدءًا من التطوير الأولي إلى إدارة البنية التحتية الخلفية. من خلال إعطاء الأولوية لخدمة العملاء الاستثنائية وتخصيص الحلول لتلبية احتياجات الأعمال المحددة."
                : "We collaborate with clients throughout their digital journey, from initial development to backend infrastructure management. By prioritizing exceptional customer service and tailoring solutions to meet specific business needs."
              }
            </p>
            
            {/* Read More Link */}
            <a 
              href="#services" 
              className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:gap-4 transition-all duration-300"
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
