
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Check, Lightbulb, Users, Zap, MessageCircle } from "lucide-react";

const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  const { getHeroContent } = useSiteContent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f8f6f3]">
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center min-h-screen py-32">
          
          {/* Floating Icons with Connections */}
          <div className={`relative w-full max-w-4xl h-[320px] md:h-[380px] mb-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            
            {/* SVG Connection Lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 380" fill="none" preserveAspectRatio="xMidYMid meet">
              {/* Line from yellow to center */}
              <path d="M200 80 L400 150" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Line from cyan to center */}
              <path d="M180 200 L360 180" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Line from center to orange */}
              <path d="M440 150 L600 80" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Line from center to white icon */}
              <path d="M440 190 L620 220" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Line from avatar left to cyan */}
              <path d="M80 140 L150 180" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Line from orange to avatar right */}
              <path d="M640 100 L680 180" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
              
              {/* Connection dots */}
              <circle cx="200" cy="80" r="3" fill="#d1d5db" />
              <circle cx="180" cy="200" r="3" fill="#d1d5db" />
              <circle cx="600" cy="80" r="3" fill="#d1d5db" />
              <circle cx="620" cy="220" r="3" fill="#d1d5db" />
            </svg>

            {/* Avatar Left */}
            <div className="absolute left-[2%] md:left-[5%] top-[20%] w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-lg border-4 border-white animate-float">
              <img src="/11.jpeg" alt="User" className="w-full h-full object-cover" />
            </div>

            {/* Yellow Icon - Lightbulb */}
            <div className="absolute left-[18%] md:left-[22%] top-[5%] md:top-[10%] w-14 h-14 md:w-16 md:h-16 bg-[#fcd34d] rounded-2xl flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
              <Lightbulb className="w-7 h-7 md:w-8 md:h-8 text-[#854d0e]" />
            </div>

            {/* Cyan Icon - Users */}
            <div className="absolute left-[12%] md:left-[18%] top-[45%] md:top-[50%] w-14 h-14 md:w-16 md:h-16 bg-[#22d3ee] rounded-2xl flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '1s' }}>
              <Users className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>

            {/* Center Purple Icon - Checkmark (Main) */}
            <div className="absolute left-1/2 top-[25%] md:top-[20%] -translate-x-1/2 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#a78bfa] to-[#8b5cf6] rounded-3xl flex items-center justify-center shadow-2xl animate-float" style={{ animationDelay: '0.2s' }}>
              <div className="w-14 h-14 md:w-20 md:h-20 border-[3px] md:border-4 border-white rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 md:w-12 md:h-12 text-white" strokeWidth={3} />
              </div>
            </div>

            {/* Orange Icon - Lightning */}
            <div className="absolute right-[18%] md:right-[22%] top-[5%] md:top-[10%] w-14 h-14 md:w-16 md:h-16 bg-[#f97316] rounded-2xl flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '0.7s' }}>
              <Zap className="w-7 h-7 md:w-8 md:h-8 text-white" fill="white" />
            </div>

            {/* White Icon - Message */}
            <div className="absolute right-[5%] md:right-[10%] top-[45%] md:top-[50%] w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 animate-float" style={{ animationDelay: '1.2s' }}>
              <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-[#1f2937]" />
            </div>

            {/* Avatar Right */}
            <div className="absolute right-[2%] md:right-[5%] top-[60%] md:top-[55%] w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shadow-lg border-4 border-white animate-float" style={{ animationDelay: '0.3s' }}>
              <img src="/22.jpeg" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Text Content */}
          <div className={`text-center max-w-2xl ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
            {/* Main Title */}
            <h1 className="font-black leading-[1.1] text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
              {getHeroContent('title_ar', language as "ar" | "en") || (language === 'ar' ? 'نبني المستقبل الرقمي معك' : 'Building the Digital Future with You')}
            </h1>
            
            {/* Subtitle */}
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
              {getHeroContent('subtitle_ar', language as "ar" | "en") || (language === 'ar' 
                ? 'نحو مستقبل رقمي أكثر نجاحًا — نوفّر لك حلولًا تقنية تجمع بين الابتكار والكفاءة لتصنع الفرق في عالم الأعمال.'
                : 'Towards a more successful digital future — we provide you with technological solutions that combine innovation and efficiency to make a difference in the business world.'
              )}
            </p>
            
            {/* CTA Button */}
            <a 
              href="#contact" 
              className="inline-block px-8 py-4 bg-[#f97316] text-white rounded-full font-bold text-lg hover:bg-[#ea580c] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {language === 'ar' ? 'احصل على عرض' : 'Request a Demo'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
