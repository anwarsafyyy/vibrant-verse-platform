
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";

const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  const { getHeroContent, getSetting } = useSiteContent();
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
              <path d="M200 80 L400 150" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M180 200 L360 180" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M440 150 L600 80" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M440 190 L620 220" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M80 140 L150 180" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M640 100 L680 180" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="200" cy="80" r="3" fill="#d1d5db" />
              <circle cx="180" cy="200" r="3" fill="#d1d5db" />
              <circle cx="600" cy="80" r="3" fill="#d1d5db" />
              <circle cx="620" cy="220" r="3" fill="#d1d5db" />
            </svg>

            {/* Avatar Left */}
            <div className="absolute left-[2%] md:left-[5%] top-[20%] w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-lg border-4 border-white animate-float">
              <img src="/11.jpeg" alt="User" className="w-full h-full object-cover" />
            </div>

            {/* React Icon - Yellow */}
            <div className="absolute left-[18%] md:left-[22%] top-[5%] md:top-[10%] w-14 h-14 md:w-16 md:h-16 bg-[#61DAFB] rounded-2xl flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
              <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-9 md:h-9 text-[#20232a]" fill="currentColor">
                <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9-.82-.08-1.63-.2-2.4-.36-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96.77-.16 1.58-.28 2.4-.36.48-.67.99-1.31 1.51-1.9z"/>
              </svg>
            </div>

            {/* Python Icon - Cyan/Blue */}
            <div className="absolute left-[12%] md:left-[18%] top-[45%] md:top-[50%] w-14 h-14 md:w-16 md:h-16 bg-[#3776AB] rounded-2xl flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '1s' }}>
              <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-9 md:h-9 text-white" fill="currentColor">
                <path d="M12 0C5.36 0 5.77 2.79 5.77 2.79l.01 2.89h6.35v.87H3.9S0 6.03 0 12.1c0 6.07 3.4 5.85 3.4 5.85h2.03v-2.81s-.11-3.4 3.35-3.4h5.77s3.24.05 3.24-3.14V3.06S18.23 0 12 0zm-3.2 1.76c.57 0 1.03.47 1.03 1.04s-.46 1.03-1.03 1.03c-.57 0-1.03-.46-1.03-1.03s.46-1.04 1.03-1.04z"/>
                <path d="M12 24c6.64 0 6.23-2.79 6.23-2.79l-.01-2.89h-6.35v-.87h8.23s3.9.52 3.9-5.55c0-6.07-3.4-5.85-3.4-5.85h-2.03v2.81s.11 3.4-3.35 3.4H9.45s-3.24-.05-3.24 3.14v5.54S5.77 24 12 24zm3.2-1.76c-.57 0-1.03-.47-1.03-1.04s.46-1.03 1.03-1.03c.57 0 1.03.46 1.03 1.03s-.46 1.04-1.03 1.04z"/>
              </svg>
            </div>

            {/* Center Logo (Main) */}
            <div className="absolute left-1/2 top-[25%] md:top-[20%] -translate-x-1/2 w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl border-2 border-gray-100 animate-float" style={{ animationDelay: '0.2s' }}>
              <img 
                src={getSetting('logo_url', 'ar') || '/olu-logo.png'} 
                alt="علو Logo" 
                className="w-20 h-20 md:w-28 md:h-28 object-contain"
              />
            </div>

            {/* JavaScript Icon - Yellow/Orange */}
            <div className="absolute right-[18%] md:right-[22%] top-[5%] md:top-[10%] w-14 h-14 md:w-16 md:h-16 bg-[#F7DF1E] rounded-2xl flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '0.7s' }}>
              <span className="text-[#323330] font-black text-2xl md:text-3xl">JS</span>
            </div>

            {/* Node.js Icon - Green */}
            <div className="absolute right-[5%] md:right-[10%] top-[45%] md:top-[50%] w-14 h-14 md:w-16 md:h-16 bg-[#339933] rounded-2xl flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '1.2s' }}>
              <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-9 md:h-9 text-white" fill="currentColor">
                <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.71.46 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.45 16.5a.26.26 0 01-.11-.21V7.71c0-.09.04-.17.11-.21l7.44-4.29c.06-.04.16-.04.22 0l7.44 4.29c.07.04.11.12.11.21v8.58c0 .08-.04.16-.11.21l-7.44 4.29c-.06.04-.16.04-.22 0L10 19.65c-.05-.03-.12-.04-.17-.02-.47.17-.57.19-1.02.28-.11.02-.27.06.06.18l2.19 1.3c.24.14.5.21.78.21s.55-.07.78-.21l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2z"/>
              </svg>
            </div>

            {/* Avatar Right */}
            <div className="absolute right-[2%] md:right-[5%] top-[60%] md:top-[55%] w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shadow-lg border-4 border-white animate-float" style={{ animationDelay: '0.3s' }}>
              <img src="/22.jpeg" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Text Content */}
          <div className={`text-center max-w-2xl ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
            <h1 className="font-black leading-[1.1] text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
              {getHeroContent('title_ar', language as "ar" | "en") || (language === 'ar' ? 'نبني المستقبل الرقمي معك' : 'Building the Digital Future with You')}
            </h1>
            
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
              {getHeroContent('subtitle_ar', language as "ar" | "en") || (language === 'ar' 
                ? 'نحو مستقبل رقمي أكثر نجاحًا — نوفّر لك حلولًا تقنية تجمع بين الابتكار والكفاءة لتصنع الفرق في عالم الأعمال.'
                : 'Towards a more successful digital future — we provide you with technological solutions that combine innovation and efficiency to make a difference in the business world.'
              )}
            </p>
            
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
