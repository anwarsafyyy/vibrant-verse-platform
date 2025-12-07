
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Palette, Headphones } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";

const HeroSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const { getHeroContent, getSetting } = useSiteContent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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

  const features = [
    {
      icon: Palette,
      title: language === 'ar' ? 'تصميم حديث' : 'Modern Design',
      subtitle: language === 'ar' ? 'واجهات عصرية وسلسة' : 'Clean & smooth interfaces',
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
      delay: '0.2s'
    },
    {
      icon: Zap,
      title: language === 'ar' ? 'تقنيات متطورة' : 'Advanced Tech',
      subtitle: language === 'ar' ? 'حلول تقنية مبتكرة' : 'Innovative solutions',
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      delay: '0.3s'
    },
    {
      icon: Headphones,
      title: language === 'ar' ? 'دعم مستمر' : '24/7 Support',
      subtitle: language === 'ar' ? 'دعم فني متواصل' : 'Always here to help',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      delay: '0.4s'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-hero -z-20"></div>
      <div className="absolute inset-0 gradient-mesh -z-10"></div>
      <div className="absolute inset-0 bg-dot-pattern -z-10"></div>
      
      {/* Floating blobs */}
      <div className="floating-blob w-[600px] h-[600px] bg-primary/30 -top-40 -left-40 -z-10" style={{ animationDelay: '0s' }}></div>
      <div className="floating-blob w-[500px] h-[500px] bg-accent/30 -bottom-40 -right-40 -z-10" style={{ animationDelay: '-5s' }}></div>
      <div className="floating-blob w-[400px] h-[400px] bg-orange-400/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" style={{ animationDelay: '-10s' }}></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
        {/* Animated circles */}
        <div className="absolute top-1/4 left-1/5 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent animate-float opacity-60" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-gradient-to-r from-accent to-orange-500 animate-float opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full bg-gradient-to-r from-primary to-purple-400 animate-float opacity-70" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/5 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-primary animate-float opacity-40" style={{ animationDelay: '3s' }}></div>
        
        {/* Rotating rings */}
        <div className="absolute top-1/4 right-1/3 w-24 h-24 rounded-full border-2 border-primary/20 animate-spin-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-32 h-32 rounded-full border border-accent/15 animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-primary rounded-full shadow-glow animate-pulse-soft"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-accent rounded-full shadow-glow animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center max-w-6xl relative z-10">
        {/* Content */}
        <div 
          className={`${isVisible ? "opacity-100" : "opacity-0"} transition-all duration-1000 select-text pointer-events-auto`}
        >
          {/* Large Centered Logo */}
          <div className={`mb-4 flex justify-center ${isVisible ? 'animate-scale-in' : ''}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-3xl scale-150"></div>
              <img 
                src={getSetting('logo_url', 'ar') || '/olu-logo.png'} 
                alt="Company Logo" 
                className="relative h-40 w-auto md:h-56 lg:h-72 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
          
          {/* Main title */}
          <h1 className={`font-bold mb-8 leading-tight tracking-tight ${isVisible ? 'animate-fade-in stagger-1' : 'opacity-0'}`}>
            <span className="olu-text-gradient">
              {getHeroContent('title_ar', language as "ar" | "en") || t("hero.title")}
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className={`text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
            {getHeroContent('subtitle_ar', language as "ar" | "en") || t("hero.subtitle")}
          </p>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-20 ${isVisible ? 'animate-fade-in stagger-3' : 'opacity-0'}`}>
            <Button 
              variant="default" 
              size="lg"
              onClick={scrollToContact}
              className="text-base px-8 py-6 rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 border-0"
            >
              {getHeroContent('cta_text_ar', language as "ar" | "en") || t("contact")}
              <ArrowRight className={`ml-2 ${dir === "rtl" ? "rtl-flip" : ""}`} />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={scrollToServices}
              className="text-base px-8 py-6 rounded-full border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:-translate-y-1"
            >
              {t("services.title")}
            </Button>
          </div>
        </div>
        
        {/* Feature Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`relative group ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: feature.delay }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-2xl transition-all duration-500`}></div>
              <div className="relative glass-effect rounded-3xl p-8 text-center hover:-translate-y-3 transition-all duration-500 group-hover:shadow-2xl">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-soft">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse-soft"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
