
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";
import heroBg from "@/assets/hero-bg.jpeg";

const HeroSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const { getHeroContent, getSetting } = useSiteContent();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const slides = [
    {
      image: heroBg,
      title: getHeroContent('title_ar', language as "ar" | "en") || t("hero.title"),
      subtitle: getHeroContent('subtitle_ar', language as "ar" | "en") || t("hero.subtitle"),
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      />
      
      {/* Dark gradient overlay - stronger on text side */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-l from-black/80 via-black/50 to-black/20" />
      
      {/* Decorative geometric patterns */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <svg className="absolute top-20 right-20 w-40 h-40 text-primary" viewBox="0 0 100 100">
          <polygon points="50,5 95,30 95,70 50,95 5,70 5,30" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-40 left-20 w-32 h-32 text-primary/50" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(45 50 50)" />
        </svg>
        <svg className="absolute top-1/2 left-1/3 w-24 h-24 text-accent/30" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center min-h-screen py-32 justify-end">
          <div 
            className={`max-w-3xl text-right ${isVisible ? "opacity-100" : "opacity-0"} transition-all duration-1000`}
          >
            {/* Company Logo */}
            {getSetting('logo_url', 'ar') && (
              <div className={`mb-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <img 
                  src={getSetting('logo_url', 'ar')} 
                  alt="Company Logo" 
                  className="h-16 lg:h-20 w-auto object-contain"
                />
              </div>
            )}
            
            {/* Main Title */}
            <h1 className={`text-white font-bold leading-[1.1] text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8 ${isVisible ? 'animate-fade-in stagger-1' : 'opacity-0'}`}>
              {slides[currentSlide].title}
            </h1>
            
            {/* Subtitle */}
            <p className={`text-white/80 text-lg lg:text-xl leading-relaxed max-w-2xl mb-10 ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
              {slides[currentSlide].subtitle}
            </p>
            
            {/* CTA Buttons */}
            <div className={`flex gap-4 justify-end ${isVisible ? 'animate-fade-in stagger-3' : 'opacity-0'}`}>
              <a 
                href="#contact" 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
              >
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </a>
              <a 
                href="#services" 
                className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1"
              >
                {language === 'ar' ? 'خدماتنا' : 'Our Services'}
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Slide Thumbnails - Left side */}
      <div className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-20">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`group relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-500 ${
              currentSlide === index 
                ? 'border-primary shadow-lg shadow-primary/40 scale-110' 
                : 'border-white/30 hover:border-white/60 opacity-70 hover:opacity-100'
            }`}
          >
            <img 
              src={slide.image} 
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 ${currentSlide === index ? 'bg-primary/20' : 'bg-black/40'}`} />
            {/* Active indicator diamond */}
            <div className={`absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-primary transition-all duration-300 ${
              currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`} />
          </button>
        ))}
      </div>
      
      {/* Bottom - Scroll Indicator */}
      <div 
        className="absolute bottom-10 right-1/2 translate-x-1/2 flex flex-col items-center cursor-pointer group z-20"
        onClick={scrollToAbout}
      >
        <span className="text-white/60 text-sm font-medium mb-3 group-hover:text-white transition-colors">
          {language === 'ar' ? 'اكتشف المزيد' : 'Discover More'}
        </span>
        <div className="w-10 h-14 rounded-full border-2 border-white/30 flex justify-center pt-3 group-hover:border-primary transition-colors">
          <ChevronDown className="w-5 h-5 text-white animate-bounce" />
        </div>
      </div>
      
      {/* Slide Counter */}
      <div className="absolute bottom-10 left-6 lg:left-12 flex items-center gap-2 text-white z-20">
        <span className="text-3xl font-bold text-primary">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="text-white/40 text-xl">/</span>
        <span className="text-white/40 text-xl">{String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
};

export default HeroSection;
