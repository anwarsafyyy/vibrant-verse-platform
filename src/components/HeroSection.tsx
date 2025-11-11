
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { useSiteContent } from "@/hooks/useSiteContent";

const HeroSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const { theme } = useTheme();
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Modern gradient background */}
      <div className="absolute inset-0 olu-gradient-hero -z-10"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] -z-10"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/10 via-accent/10 to-transparent blur-3xl animate-pulse"></div>
      
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center">{/* Container made dynamic */}
        {/* Content */}
        <div 
          className={`w-full lg:w-1/2 text-center lg:text-left ${dir === "rtl" ? "lg:order-2" : "lg:order-1"} ${isVisible ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          <h1 className="font-bold mb-6 leading-tight">
            <span className="olu-text-gradient">
              {getHeroContent('title_ar', language as "ar" | "en") || t("hero.title")}
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {getHeroContent('subtitle_ar', language as "ar" | "en") || t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              variant="light" 
              size="lg"
              onClick={scrollToContact}
            >
              {getHeroContent('cta_text_ar', language as "ar" | "en") || t("contact")}
              <ArrowRight className={`ml-2 ${dir === "rtl" ? "rtl-flip" : ""}`} />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={scrollToServices}
            >
              {t("services.title")}
            </Button>
          </div>
        </div>
        
        {/* Image/Animation Area */}
        <div 
          className={`w-full lg:w-1/2 mt-12 lg:mt-0 ${dir === "rtl" ? "lg:order-1" : "lg:order-2"} ${isVisible ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationDelay: "0.4s" }}
        >
          <div className="relative mx-auto w-full max-w-md aspect-square">
            <div className="absolute inset-0 rounded-full olu-gradient opacity-20 blur-3xl animate-pulse"></div>
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <div className="bg-card rounded-3xl overflow-hidden w-full max-w-md transform hover:scale-105 transition-all duration-500" style={{ boxShadow: 'var(--shadow-xl)' }}>
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="flex-1 text-center">
                      <img 
                        src="/alo.png" 
                        alt="علو" 
                        className={`h-6 mx-auto ${theme === "dark" ? "filter brightness-0 invert" : ""}`} 
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="w-full h-4 bg-muted rounded-lg animate-pulse"></div>
                    <div className="w-5/6 h-4 bg-muted rounded-lg animate-pulse"></div>
                    <div className="w-4/6 h-4 bg-muted rounded-lg animate-pulse"></div>
                    <div className="grid grid-cols-2 gap-3 mt-8">
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 h-24 rounded-xl flex items-center justify-center border border-primary/10">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent"></div>
                      </div>
                      <div className="bg-gradient-to-br from-accent/10 to-accent/5 h-24 rounded-xl flex items-center justify-center border border-accent/10">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
