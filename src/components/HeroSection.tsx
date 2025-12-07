
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
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

  // Slides data - using same background for demo, can be expanded
  const slides = [
    {
      image: heroBg,
      title: getHeroContent('title_ar', language as "ar" | "en") || t("hero.title"),
      subtitle: getHeroContent('subtitle_ar', language as "ar" | "en") || t("hero.subtitle"),
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with overlay */}
      <div 
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      />
      
      {/* Gradient overlay - matching 2P style */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-l from-black/70 via-black/40 to-transparent" />
      
      {/* Decorative diagonal lines pattern - 2P style */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="hero-lines" patternUnits="userSpaceOnUse" width="100" height="100" patternTransform="rotate(-45)">
              <line x1="0" y1="0" x2="0" y2="100" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-lines)" />
        </svg>
      </div>
      
      {/* Main Content - 2P Layout: Text on RIGHT for RTL */}
      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex items-center min-h-screen py-24 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
          <div 
            className={`max-w-2xl ${dir === 'rtl' ? 'text-right' : 'text-left'} ${isVisible ? "opacity-100" : "opacity-0"} transition-all duration-1000`}
          >
            {/* Main Title - Large and impactful like 2P */}
            <h1 className={`text-white font-bold leading-[1.15] tracking-tight text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-8 ${isVisible ? 'animate-fade-in stagger-1' : 'opacity-0'}`}>
              {slides[currentSlide].title}
            </h1>
            
            {/* Hidden subtitle for SEO but not shown in 2P style */}
            <p className="sr-only">
              {slides[currentSlide].subtitle}
            </p>
          </div>
        </div>
      </div>
      
      {/* Left Side - Slide Thumbnails (2P Style) */}
      <div className={`absolute ${dir === 'rtl' ? 'left-8' : 'right-8'} top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-20`}>
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`group relative w-28 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              currentSlide === index 
                ? 'border-primary shadow-lg shadow-primary/30' 
                : 'border-white/30 hover:border-white/60'
            }`}
          >
            <img 
              src={slide.image} 
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-black/40 ${currentSlide === index ? 'bg-black/20' : ''}`} />
            {/* Diamond indicator like 2P */}
            <div className={`absolute ${dir === 'rtl' ? '-right-3' : '-left-3'} top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-primary transition-opacity duration-300 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`} />
          </button>
        ))}
      </div>
      
      {/* Bottom Right - Scroll Indicator (2P Style) */}
      <div 
        className={`absolute bottom-8 ${dir === 'rtl' ? 'right-8' : 'left-8'} flex items-center gap-4 cursor-pointer group z-20`}
        onClick={scrollToAbout}
      >
        <div className="flex flex-col items-center">
          {/* Scroll text */}
          <span className="text-white/70 text-sm font-medium mb-2 group-hover:text-white transition-colors">
            {language === 'ar' ? 'سحب للأسفل' : 'Scroll Down'}
          </span>
          {/* Animated scroll icon */}
          <div className="w-8 h-12 rounded-full border-2 border-white/40 flex justify-center pt-2 group-hover:border-white transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
          </div>
        </div>
      </div>
      
      {/* Bottom Left - Slide Counter (2P Style) */}
      <div className={`absolute bottom-8 ${dir === 'rtl' ? 'left-8' : 'right-8'} flex items-center gap-3 text-white z-20`}>
        <span className="text-2xl font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="text-white/50">/</span>
        <span className="text-white/50">{String(slides.length).padStart(2, '0')}</span>
      </div>
      
      {/* Navigation Arrows (if multiple slides) */}
      {slides.length > 1 && (
        <>
          <button 
            onClick={() => setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1)}
            className={`absolute ${dir === 'rtl' ? 'right-8' : 'left-8'} bottom-24 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-all z-20`}
          >
            <ChevronLeft className={dir === 'rtl' ? '' : 'rotate-180'} />
          </button>
          <button 
            onClick={() => setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1)}
            className={`absolute ${dir === 'rtl' ? 'right-24' : 'left-24'} bottom-24 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-all z-20`}
          >
            <ChevronRight className={dir === 'rtl' ? '' : 'rotate-180'} />
          </button>
        </>
      )}
    </section>
  );
};

export default HeroSection;
