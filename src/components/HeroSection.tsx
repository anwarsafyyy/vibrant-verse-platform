
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";

const HeroSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const { getHeroContent, getSetting } = useSiteContent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mount
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      {/* Clean gradient background */}
      <div className="absolute inset-0 olu-gradient-hero -z-10"></div>
      <div className="absolute inset-0 gradient-mesh -z-10"></div>
      
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center max-w-5xl">
        {/* Content */}
        <div 
          className={`${isVisible ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          <h1 className="font-bold mb-8 leading-tight tracking-tight">
            <span className="olu-text-gradient">
              {getHeroContent('title_ar', language as "ar" | "en") || t("hero.title")}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            {getHeroContent('subtitle_ar', language as "ar" | "en") || t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              variant="default" 
              size="lg"
              onClick={scrollToContact}
              className="text-base"
            >
              {getHeroContent('cta_text_ar', language as "ar" | "en") || t("contact")}
              <ArrowRight className={`${dir === "rtl" ? "rtl-flip" : ""}`} />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={scrollToServices}
              className="text-base"
            >
              {t("services.title")}
            </Button>
          </div>
        </div>
        
        {/* Feature Preview Cards */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12 ${isVisible ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationDelay: "0.4s" }}
        >
          <div className="bg-card border border-border/50 rounded-3xl p-8 text-center hover:shadow-lg transition-all duration-500">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <div className="w-7 h-7 bg-primary rounded-lg"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{language === 'ar' ? 'تصميم حديث' : 'Modern Design'}</h3>
            <p className="text-sm text-muted-foreground">{language === 'ar' ? 'واجهات عصرية وسلسة' : 'Clean & smooth interfaces'}</p>
          </div>
          
          <div className="bg-card border border-border/50 rounded-3xl p-8 text-center hover:shadow-lg transition-all duration-500">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <div className="w-7 h-7 bg-primary rounded-lg"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{language === 'ar' ? 'تقنيات متطورة' : 'Advanced Tech'}</h3>
            <p className="text-sm text-muted-foreground">{language === 'ar' ? 'حلول تقنية مبتكرة' : 'Innovative solutions'}</p>
          </div>
          
          <div className="bg-card border border-border/50 rounded-3xl p-8 text-center hover:shadow-lg transition-all duration-500">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <div className="w-7 h-7 bg-primary rounded-lg"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{language === 'ar' ? 'دعم مستمر' : '24/7 Support'}</h3>
            <p className="text-sm text-muted-foreground">{language === 'ar' ? 'دعم فني متواصل' : 'Always here to help'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
