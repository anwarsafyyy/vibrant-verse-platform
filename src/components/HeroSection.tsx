
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Server, Brain } from "lucide-react";

const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  const { getHeroContent, getSetting } = useSiteContent();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f8f6f3]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center min-h-screen py-32">
          
          {/* Icons Network - Chain Layout emanating from center logo */}
          <div className="relative w-full max-w-6xl h-[500px] md:h-[580px] mb-8">
            
            {/* SVG Connection Lines - All emanating from center logo */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 580" fill="none" preserveAspectRatio="xMidYMid meet">
              {/* Lines from center to left icons */}
              <path d="M600 180 L180 80" stroke="#c9cdd4" strokeWidth="2" strokeDasharray="8 8" />
              <path d="M600 180 L80 280" stroke="#c9cdd4" strokeWidth="2" strokeDasharray="8 8" />
              <path d="M600 250 L220 450" stroke="#c9cdd4" strokeWidth="2" strokeDasharray="8 8" />
              
              {/* Lines from center to right icons */}
              <path d="M600 180 L1020 80" stroke="#c9cdd4" strokeWidth="2" strokeDasharray="8 8" />
              <path d="M600 180 L1120 280" stroke="#c9cdd4" strokeWidth="2" strokeDasharray="8 8" />
              <path d="M600 250 L980 450" stroke="#c9cdd4" strokeWidth="2" strokeDasharray="8 8" />
              
              {/* Lines from center to bottom icons */}
              <path d="M600 280 L400 540" stroke="#c9cdd4" strokeWidth="2" strokeDasharray="8 8" />
              <path d="M600 280 L600 540" stroke="#c9cdd4" strokeWidth="2" strokeDasharray="8 8" />
              <path d="M600 280 L800 540" stroke="#c9cdd4" strokeWidth="2" strokeDasharray="8 8" />
            </svg>

            {/* Center Logo (Main) - Top Center */}
            <div className="absolute left-1/2 top-[15%] -translate-x-1/2 w-40 h-40 md:w-52 md:h-52 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl border border-gray-100">
              <img 
                src={getSetting('logo_url', 'ar') || '/olu-logo.png'} 
                alt="علو Logo" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain"
              />
            </div>

            {/* Left Side Icons */}
            {/* Flutter/Dart - Top Left */}
            <div className="absolute left-[8%] md:left-[12%] top-[5%] w-16 h-16 md:w-20 md:h-20 bg-[#02569B] rounded-2xl flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-9 h-9 md:w-10 md:h-10" fill="none">
                <path d="M14.314 0L3.098 11.215l3.352 3.353L20.016 0h-5.702z" fill="#42A5F5"/>
                <path d="M14.314 11.215L9.098 16.43l3.352 3.352 8.566-8.567h-6.702z" fill="#42A5F5"/>
                <path d="M9.098 16.43l3.352 3.353-3.352 3.352-3.352-3.352 3.352-3.353z" fill="#0D47A1"/>
                <path d="M12.45 19.783l-3.352-3.353 3.352-3.353 3.352 3.353-3.352 3.353z" fill="#42A5F5" fillOpacity="0.8"/>
              </svg>
            </div>

            {/* OpenAI - Left Middle */}
            <div className="absolute left-[2%] md:left-[4%] top-[38%] w-16 h-16 md:w-20 md:h-20 bg-[#000000] rounded-2xl flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-9 h-9 md:w-10 md:h-10 text-white" fill="currentColor">
                <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
              </svg>
            </div>

            {/* ML/AI - Bottom Left */}
            <div className="absolute left-[12%] md:left-[15%] top-[70%] w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#FF6F61] to-[#DE4DAB] rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-9 h-9 md:w-10 md:h-10 text-white" />
            </div>

            {/* Right Side Icons */}
            {/* Node.js - Top Right */}
            <div className="absolute right-[8%] md:right-[12%] top-[5%] w-16 h-16 md:w-20 md:h-20 bg-[#339933] rounded-2xl flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-9 h-9 md:w-10 md:h-10 text-white" fill="currentColor">
                <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.71.46 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.45 16.5a.26.26 0 01-.11-.21V7.71c0-.09.04-.17.11-.21l7.44-4.29c.06-.04.16-.04.22 0l7.44 4.29c.07.04.11.12.11.21v8.58c0 .08-.04.16-.11.21l-7.44 4.29c-.06.04-.16.04-.22 0L10 19.65c-.05-.03-.12-.04-.17-.02-.47.17-.57.19-1.02.28-.11.02-.27.06.06.18l2.19 1.3c.24.14.5.21.78.21s.55-.07.78-.21l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2z"/>
              </svg>
            </div>

            {/* TypeScript - Right Middle */}
            <div className="absolute right-[2%] md:right-[4%] top-[38%] w-16 h-16 md:w-20 md:h-20 bg-[#3178C6] rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-2xl md:text-3xl">TS</span>
            </div>

            {/* React - Bottom Right */}
            <div className="absolute right-[12%] md:right-[15%] top-[70%] w-16 h-16 md:w-20 md:h-20 bg-[#61DAFB] rounded-2xl flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-9 h-9 md:w-10 md:h-10 text-[#20232a]" fill="currentColor">
                <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9-.82-.08-1.63-.2-2.4-.36-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96.77-.16 1.58-.28 2.4-.36.48-.67.99-1.31 1.51-1.9z"/>
              </svg>
            </div>

            {/* Bottom Icons */}
            {/* Firebase - Bottom Left-Center */}
            <div className="absolute left-[28%] md:left-[30%] top-[88%] w-16 h-16 md:w-20 md:h-20 bg-[#FFCA28] rounded-2xl flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-9 h-9 md:w-10 md:h-10" fill="none">
                <path d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771-5.923 10.613z" fill="#FFC24A"/>
                <path d="M4.533 21.156L3.89 15.672l5.923-10.613 2.062 3.668-7.342 12.429z" fill="#FFA712"/>
                <path d="M12.064 8.727L14.24 4.58l5.476 9.811a.967.967 0 01-.359 1.325l-7.278 4.305L4.533 21.156l7.531-12.429z" fill="#F4BD62"/>
                <path d="M12.079 21.021l7.637-4.5L14.24 4.58 12.064 8.727l.015 12.294z" fill="#FFA50E"/>
                <path d="M12.079 21.021L4.533 21.156l7.531-12.429.015 12.294z" fill="#F6820C"/>
              </svg>
            </div>

            {/* Backend/Server - Bottom Center */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[88%] w-16 h-16 md:w-20 md:h-20 bg-[#6366F1] rounded-2xl flex items-center justify-center shadow-lg">
              <Server className="w-9 h-9 md:w-10 md:h-10 text-white" />
            </div>

            {/* Google Cloud - Bottom Right-Center */}
            <div className="absolute right-[28%] md:right-[30%] top-[88%] w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100">
              <svg viewBox="0 0 24 24" className="w-9 h-9 md:w-10 md:h-10">
                <path d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-8.825-6.893zm7.373 5.38l.014.014-4.391 3.937 2.18 2.18a4.962 4.962 0 0 1-1.196 1.95 4.878 4.878 0 0 1-3.458 1.516h-.03l-5.192-.03h-.03a4.878 4.878 0 0 1-3.487-1.486 4.895 4.895 0 0 1-1.199-1.95 4.878 4.878 0 0 1 1.199-5.03l.014-.013h.014l5.192.03.03-.03 5.192-.03h.03c.48 0 .953.067 1.403.197l3.715-3.255z" fill="#4285F4"/>
                <path d="M19.563 7.76l-4.391 3.937 2.18 2.18a4.962 4.962 0 0 1-1.196 1.95l-4.016-4.007V7.73c.48 0 .953.067 1.403.197l3.715-3.255.014.014c.81.495 1.528 1.135 2.12 1.88l.171.194z" fill="#EA4335"/>
                <path d="M7.208 11.858a4.895 4.895 0 0 0 1.199 5.03 4.878 4.878 0 0 0 3.487 1.486l.03.03h5.192a4.845 4.845 0 0 0 1.04-.113l-4.016-4.007-5.173-.03-.03.03a4.878 4.878 0 0 1-1.729-2.426z" fill="#34A853"/>
                <path d="M7.208 11.858l.03-.03 5.192.03.03-.03 4.016 4.007a4.845 4.845 0 0 1-1.04.113h-5.192l-.03-.03h-5.173a6.717 6.717 0 0 1-4.077-1.356l.007-.03.006.007c-.91-.7-1.665-1.588-2.206-2.62 0 0 .053-.02 0 0 .557-1.066 1.34-1.983 2.283-2.696l.03.03 5.173.03.03-.03c.48 0 .953.067 1.403.197l-1.482 1.408z" fill="#FBBC05"/>
              </svg>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center max-w-2xl">
            <h1 className="font-black leading-[1.1] text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
              {language === 'ar' 
                ? (getHeroContent('title_ar', 'ar') || 'نبني المستقبل الرقمي معك')
                : (getHeroContent('title_en', 'en') || 'Building the Digital Future with You')
              }
            </h1>
            
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
              {language === 'ar' 
                ? (getHeroContent('subtitle_ar', 'ar') || 'نحو مستقبل رقمي أكثر نجاحًا — نوفّر لك حلولًا تقنية تجمع بين الابتكار والكفاءة لتصنع الفرق في عالم الأعمال.')
                : (getHeroContent('subtitle_en', 'en') || 'Towards a more successful digital future — we provide you with technological solutions that combine innovation and efficiency to make a difference in the business world.')
              }
            </p>
            
            <a 
              href="#contact" 
              className="inline-block px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1"
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
