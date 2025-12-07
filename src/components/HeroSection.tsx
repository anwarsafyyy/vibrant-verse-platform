
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ChevronDown } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";
import heroBg from "@/assets/hero-bg.jpeg";

const HeroSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const { getHeroContent, getSetting } = useSiteContent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with overlay */}
      <div 
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
      
      {/* Animated diagonal lines - subtle tech pattern */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="diagonal-lines" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="60" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
        </svg>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div 
          className={`max-w-5xl mx-auto ${isVisible ? "opacity-100" : "opacity-0"} transition-all duration-1000`}
        >
          {/* Logo */}
          <div className={`mb-8 flex justify-center ${isVisible ? 'animate-scale-in' : ''}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-accent/40 rounded-full blur-3xl scale-150 opacity-50" />
              <img 
                src={getSetting('logo_url', 'ar') || '/olu-logo.png'} 
                alt="Company Logo" 
                className="relative h-32 md:h-44 lg:h-56 w-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
          
          {/* Main Title - Large and impactful */}
          <h1 className={`text-white font-bold mb-6 leading-[1.1] tracking-tight text-4xl md:text-5xl lg:text-6xl xl:text-7xl ${isVisible ? 'animate-fade-in stagger-1' : 'opacity-0'}`}>
            {getHeroContent('title_ar', language as "ar" | "en") || t("hero.title")}
          </h1>
          
          {/* Subtitle */}
          <p className={`text-lg md:text-xl lg:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
            {getHeroContent('subtitle_ar', language as "ar" | "en") || t("hero.subtitle")}
          </p>
          
          {/* CTA Button */}
          <div className={`flex justify-center ${isVisible ? 'animate-fade-in stagger-3' : 'opacity-0'}`}>
            <Button 
              variant="default" 
              size="lg"
              onClick={scrollToContact}
              className="text-base md:text-lg px-10 py-7 rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:-translate-y-1 border-0 text-white font-bold"
            >
              {getHeroContent('cta_text_ar', language as "ar" | "en") || t("contact")}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={scrollToAbout}
      >
        <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">
          {language === 'ar' ? 'سحب للأسفل' : 'Scroll Down'}
        </span>
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-white/60 transition-colors">
          <ChevronDown className="w-5 h-5 text-white/70 animate-bounce-soft group-hover:text-white" />
        </div>
      </div>
      
      {/* Slide Counter - 2P Style */}
      <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-2 text-white/70">
        <span className="text-xl font-bold text-white">01</span>
        <span className="text-sm">/</span>
        <span className="text-sm">01</span>
      </div>
    </section>
  );
};

export default HeroSection;
