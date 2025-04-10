
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";

const HeroSection: React.FC = () => {
  const { t, dir } = useLanguage();
  const { theme } = useTheme();
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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-olu-blue/5 to-olu-cyan/5 dark:from-olu-blue/10 dark:to-olu-cyan/10 -z-10"></div>
      
      {/* Animated circles */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-olu-blue/10 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full bg-olu-gold/10 blur-3xl animate-float" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center">
        {/* Content */}
        <div 
          className={`w-full lg:w-1/2 text-center lg:text-left ${dir === "rtl" ? "lg:order-2" : "lg:order-1"} ${isVisible ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="olu-gold-text-gradient">{t("hero.title")}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              variant="gold" 
              size="pill" 
              className="text-white"
              onClick={scrollToContact}
            >
              {t("contact")}
              <ArrowRight className={`ml-2 ${dir === "rtl" ? "rtl-flip" : ""}`} />
            </Button>
          </div>
        </div>
        
        {/* Image/Animation Area */}
        <div 
          className={`w-full lg:w-1/2 mt-12 lg:mt-0 ${dir === "rtl" ? "lg:order-1" : "lg:order-2"} ${isVisible ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationDelay: "0.4s" }}
        >
          <div className="relative mx-auto w-full max-w-md aspect-square">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-olu-blue to-olu-gold opacity-20 blur-2xl animate-pulse"></div>
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden w-full max-w-md transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="p-6">
                  <div className="flex items-center mb-4">
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
                  <div className="space-y-3">
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-4/6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="grid grid-cols-2 gap-2 mt-6">
                      <div className="bg-olu-gold/10 dark:bg-olu-gold/20 h-20 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-olu-gold/30 dark:bg-olu-gold/40"></div>
                      </div>
                      <div className="bg-olu-cyan/10 dark:bg-olu-cyan/20 h-20 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-olu-cyan/30 dark:bg-olu-cyan/40"></div>
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
