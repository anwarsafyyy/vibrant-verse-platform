
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Server, Brain } from "lucide-react";

const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  const { getHeroContent, getSetting } = useSiteContent();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      {/* Large purple circle - left */}
      <div className="absolute left-[-5%] top-[40%] w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-purple-500/15 rounded-full blur-3xl" />
      
      {/* Large light curved shape - top left */}
      <div className="absolute left-0 top-0 w-[50%] h-[60%] bg-gradient-to-br from-purple-500/10 to-transparent rounded-br-[50%]" />
      
      {/* Small green circle - left */}
      <div className="absolute left-[8%] top-[75%] w-4 h-4 md:w-6 md:h-6 bg-emerald-400 rounded-full" />
      
      {/* Small purple dot - top center */}
      <div className="absolute left-[30%] top-[15%] w-2 h-2 md:w-3 md:h-3 bg-purple-400/60 rounded-full" />
      
      {/* Light purple circle - right */}
      <div className="absolute right-[5%] bottom-[10%] w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 bg-purple-400/15 rounded-full blur-2xl" />
      
      {/* Light purple circle - top right */}
      <div className="absolute right-[20%] top-[20%] w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-purple-400/10 rounded-full blur-2xl" />
      
      {/* Small light purple circle */}
      <div className="absolute right-[8%] top-[35%] w-12 h-12 md:w-16 md:h-16 bg-purple-300/15 rounded-full blur-xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div dir="ltr" className="flex flex-col lg:flex-row items-center justify-between min-h-screen pt-60 sm:pt-48 pb-20 md:py-28 lg:py-32 gap-8 lg:gap-12">
          
          {/* Left Side - Phone Mockup with Illustration */}
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative w-56 h-[420px] sm:w-64 sm:h-[480px] md:w-72 md:h-[540px] lg:w-80 lg:h-[600px] bg-white rounded-[2.5rem] shadow-2xl shadow-[hsl(262,45%,35%)]/30 border-4 border-[hsl(262,45%,35%)] overflow-hidden ring-4 ring-[hsl(262,45%,35%)]/30">
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-200 rounded-b-2xl z-10" />
                
                {/* Phone Screen Content */}
                <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white p-4 pt-10 flex flex-col items-center justify-center">
                  {/* Logo in phone */}
                  <img 
                    src={getSetting('logo_url', 'ar') || '/olu-logo.png'} 
                    alt="Logo" 
                    className="w-56 h-56 md:w-72 md:h-72 object-contain mb-4"
                  />
                  
                  {/* Checkmark Icon */}
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-4">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  {/* Decorative lines */}
                  <div className="w-full space-y-3 mt-4">
                    <div className="h-3 bg-purple-200/50 rounded-full w-3/4 mx-auto" />
                    <div className="h-3 bg-purple-200/50 rounded-full w-1/2 mx-auto" />
                    <div className="h-3 bg-purple-200/50 rounded-full w-2/3 mx-auto" />
                  </div>
                </div>
              </div>
              
              {/* Tech Icons around the phone */}
              {/* Flutter - Top Left */}
              <div className="absolute -left-6 sm:-left-8 md:-left-10 top-[10%] w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#02569B] rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none">
                  <path d="M14.314 0L3.098 11.215l3.352 3.353L20.016 0h-5.702z" fill="#42A5F5"/>
                  <path d="M14.314 11.215L9.098 16.43l3.352 3.352 8.566-8.567h-6.702z" fill="#42A5F5"/>
                  <path d="M9.098 16.43l3.352 3.353-3.352 3.352-3.352-3.352 3.352-3.353z" fill="#0D47A1"/>
                </svg>
              </div>
              
              {/* OpenAI - Left Middle */}
              <div className="absolute -left-10 sm:-left-12 md:-left-16 top-[40%] w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="currentColor">
                  <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073z"/>
                </svg>
              </div>
              
              {/* ML - Bottom Left */}
              <div className="absolute -left-4 sm:-left-6 md:-left-8 bottom-[15%] w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#FF6F61] to-[#DE4DAB] rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              
              {/* Node.js - Top Right */}
              <div className="absolute -right-6 sm:-right-8 md:-right-10 top-[10%] w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#339933] rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="currentColor">
                  <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.71.46 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.45 16.5a.26.26 0 01-.11-.21V7.71c0-.09.04-.17.11-.21l7.44-4.29c.06-.04.16-.04.22 0l7.44 4.29c.07.04.11.12.11.21v8.58c0 .08-.04.16-.11.21l-7.44 4.29c-.06.04-.16.04-.22 0L10 19.65c-.05-.03-.12-.04-.17-.02-.47.17-.57.19-1.02.28-.11.02-.27.06.06.18l2.19 1.3c.24.14.5.21.78.21s.55-.07.78-.21l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2z"/>
                </svg>
              </div>
              
              {/* TypeScript - Right Middle */}
              <div className="absolute -right-10 sm:-right-12 md:-right-16 top-[40%] w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#3178C6] rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <span className="text-white font-black text-sm md:text-base">TS</span>
              </div>
              
              {/* React - Bottom Right */}
              <div className="absolute -right-4 sm:-right-6 md:-right-8 bottom-[15%] w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#61DAFB] rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#20232a]" fill="currentColor">
                  <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9-.82-.08-1.63-.2-2.4-.36-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95z"/>
                </svg>
              </div>
              
              {/* Firebase - Bottom */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 md:-bottom-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#FFCA28] rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none">
                  <path d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771-5.923 10.613z" fill="#FFC24A"/>
                  <path d="M4.533 21.156L3.89 15.672l5.923-10.613 2.062 3.668-7.342 12.429z" fill="#FFA712"/>
                  <path d="M12.064 8.727L14.24 4.58l5.476 9.811a.967.967 0 01-.359 1.325l-7.278 4.305L4.533 21.156l7.531-12.429z" fill="#F4BD62"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div dir="rtl" className="w-full lg:w-1/2 text-center lg:text-right order-1 lg:order-2">
            <h1 className="font-black leading-[1.1] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 md:mb-6 text-gray-800">
              {language === 'ar' 
                ? (getHeroContent('title_ar', 'ar') || 'نبني المستقبل الرقمي معك')
                : (getHeroContent('title_en', 'en') || 'Building the Digital Future with You')
              }
              <span className="inline-block mr-2">👋</span>
            </h1>
            
            <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0 lg:mr-0">
              {language === 'ar' 
                ? (getHeroContent('subtitle_ar', 'ar') || 'نحو مستقبل رقمي أكثر نجاحًا — نوفّر لك حلولًا تقنية تجمع بين الابتكار والكفاءة لتصنع الفرق في عالم الأعمال.')
                : (getHeroContent('subtitle_en', 'en') || 'Towards a more successful digital future — we provide you with technological solutions that combine innovation and efficiency to make a difference in the business world.')
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <a 
                href="#contact" 
                className="inline-block px-8 py-4 bg-[hsl(262,45%,35%)] text-white rounded-full font-bold text-lg hover:bg-[hsl(262,45%,40%)] transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1"
              >
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </a>
              <a 
                href="#about" 
                className="inline-block px-8 py-4 bg-transparent text-gray-700 font-bold text-lg hover:text-purple-700 transition-all duration-300"
              >
                {language === 'ar' ? 'تعرف علينا' : 'Get Started'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
