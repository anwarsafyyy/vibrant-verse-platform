
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";

const HeroSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const { getHeroContent, getSetting } = useSiteContent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f8f6f3]">
      {/* Decorative sparkle elements */}
      <div className="absolute top-32 right-1/3 text-primary/30 text-2xl">✦</div>
      <div className="absolute top-1/2 right-20 text-primary/20 text-xl">✦</div>
      <div className="absolute bottom-40 left-1/2 text-primary/20 text-lg">✦</div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-32" dir="ltr">
          
          {/* Left Side - Company Logo */}
          <div className={`relative flex justify-center lg:justify-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="relative">
              {/* Logo with decorative elements */}
              <div className="relative">
                {/* Decorative circle behind logo */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-200/20 rounded-full blur-3xl scale-150" />
                
                {/* Main logo */}
                <img 
                  src={getSetting('logo_url', 'ar') || '/olu-logo.png'} 
                  alt="علو Logo" 
                  className="relative z-10 w-64 h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
                />
                
                {/* Decorative sparkles */}
                <div className="absolute -top-4 -right-4 text-primary text-2xl">✦</div>
                <div className="absolute -bottom-4 -left-4 text-purple-400 text-xl">✦</div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Text Content */}
          <div className={`text-right ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
            {/* Main Title */}
            <h1 className="font-bold leading-[1.1] text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8 text-foreground">
              <span className="olu-text-gradient">
                {getHeroContent('title_ar', language as "ar" | "en") || (language === 'ar' ? 'نبني المستقبل الرقمي معك' : 'Building the Digital Future with You')}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-xl mb-10 mr-auto">
              {getHeroContent('subtitle_ar', language as "ar" | "en") || (language === 'ar' 
                ? 'نحو مستقبل رقمي أكثر نجاحًا — نوفّر لك حلولًا تقنية تجمع بين الابتكار والكفاءة لتصنع الفرق في عالم الأعمال.'
                : 'Towards a more successful digital future — we provide you with technological solutions that combine innovation and efficiency to make a difference in the business world.'
              )}
            </p>
            
            {/* CTA Button */}
            <a 
              href="#contact" 
              className="inline-block px-10 py-4 bg-foreground text-background rounded-full font-bold text-lg hover:bg-foreground/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {language === 'ar' ? 'ابدأ' : 'Start'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
