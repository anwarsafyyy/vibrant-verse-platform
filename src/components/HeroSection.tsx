
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
      {/* Enhanced gradient background with tech atmosphere */}
      <div className="absolute inset-0 olu-gradient-hero -z-10"></div>
      <div className="absolute inset-0 gradient-mesh -z-10"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10"></div>
      
      {/* Floating tech elements */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        {/* Holographic icons */}
        <div className="floating-element absolute top-1/4 left-1/4 w-12 h-12 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg animate-float blur-sm" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
        </div>
        <div className="floating-element absolute top-1/3 right-1/4 w-16 h-16 opacity-15">
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-float blur-sm" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
        </div>
        <div className="floating-element absolute bottom-1/3 left-1/3 w-10 h-10 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg animate-float blur-sm" style={{ animationDelay: '4s', animationDuration: '12s' }}></div>
        </div>
        <div className="floating-element absolute top-1/2 right-1/3 w-14 h-14 opacity-15">
          <div className="w-full h-full bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full animate-float blur-sm" style={{ animationDelay: '1s', animationDuration: '9s' }}></div>
        </div>
        
        {/* Circuit lines */}
        <svg className="absolute top-20 left-10 w-64 h-64 opacity-10 animate-pulse-glow" viewBox="0 0 200 200">
          <path d="M50,50 L150,50 L150,150 L50,150 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary"/>
          <circle cx="50" cy="50" r="3" fill="currentColor" className="text-primary"/>
          <circle cx="150" cy="50" r="3" fill="currentColor" className="text-primary"/>
          <circle cx="150" cy="150" r="3" fill="currentColor" className="text-primary"/>
          <circle cx="50" cy="150" r="3" fill="currentColor" className="text-primary"/>
        </svg>
        <svg className="absolute bottom-20 right-10 w-64 h-64 opacity-10 animate-pulse-glow" viewBox="0 0 200 200" style={{ animationDelay: '2s' }}>
          <path d="M100,20 L180,100 L100,180 L20,100 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary"/>
          <circle cx="100" cy="20" r="3" fill="currentColor" className="text-primary"/>
          <circle cx="180" cy="100" r="3" fill="currentColor" className="text-primary"/>
          <circle cx="100" cy="180" r="3" fill="currentColor" className="text-primary"/>
          <circle cx="20" cy="100" r="3" fill="currentColor" className="text-primary"/>
        </svg>
        
        {/* Data particles */}
        <div className="absolute top-1/4 right-1/2 w-2 h-2 bg-primary rounded-full animate-shimmer opacity-40" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-primary rounded-full animate-shimmer opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-primary rounded-full animate-shimmer opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-primary rounded-full animate-shimmer opacity-40" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center max-w-5xl">
        {/* Content */}
        <div 
          className={`${isVisible ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          {/* Main title */}
          <h1 className="font-bold mb-8 leading-tight tracking-tight font-['Lama_Sans']">
            <span className="olu-text-gradient">
              {getHeroContent('title_ar', language as "ar" | "en") || t("hero.title")}
            </span>
          </h1>
          
          {/* Subtitle below title */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-['Lama_Sans']">
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
          <div className="bg-card border border-border/50 rounded-3xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">{language === 'ar' ? 'تصميم حديث' : 'Modern Design'}</h3>
            <p className="text-sm text-muted-foreground">{language === 'ar' ? 'واجهات عصرية وسلسة' : 'Clean & smooth interfaces'}</p>
          </div>
          
          <div className="bg-card border border-border/50 rounded-3xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">{language === 'ar' ? 'تقنيات متطورة' : 'Advanced Tech'}</h3>
            <p className="text-sm text-muted-foreground">{language === 'ar' ? 'حلول تقنية مبتكرة' : 'Innovative solutions'}</p>
          </div>
          
          <div className="bg-card border border-border/50 rounded-3xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
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
