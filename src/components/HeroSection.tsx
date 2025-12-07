
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";

const HeroSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const { getHeroContent, getSetting } = useSiteContent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f8f6f3]">
      {/* Decorative sparkle elements */}
      <div className="absolute top-32 right-1/3 text-primary/30 text-2xl">✦</div>
      <div className="absolute top-1/2 right-20 text-primary/20 text-xl">✦</div>
      <div className="absolute bottom-40 left-1/2 text-primary/20 text-lg">✦</div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-32" dir="ltr">
          
          {/* Left Side - Phone Mockups */}
          <div className={`relative flex justify-center lg:justify-start ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="relative w-full max-w-[500px] h-[650px]">
              
              {/* Back phone (left) - Light with purple elements */}
              <div className="absolute left-0 top-16 w-[180px] h-[380px] bg-slate-800 rounded-[2rem] p-[3px] shadow-2xl transform -rotate-6 z-10">
                <div className="w-full h-full bg-[#f5f3f0] rounded-[1.8rem] overflow-hidden p-4">
                  {/* Purple circle */}
                  <div className="w-12 h-12 bg-purple-500 rounded-full mb-4" />
                  {/* Content lines */}
                  <div className="space-y-3">
                    <div className="h-2 bg-purple-200 rounded w-3/4" />
                    <div className="h-2 bg-purple-100 rounded w-1/2" />
                    <div className="h-16 bg-purple-100/50 rounded-xl mt-6" />
                    <div className="h-12 bg-purple-200/50 rounded-xl" />
                  </div>
                </div>
              </div>
              
              {/* Center phone - Main focus */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[220px] h-[460px] bg-slate-900 rounded-[2.5rem] p-[3px] shadow-2xl z-30">
                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-40" />
                
                <div className="w-full h-full bg-gradient-to-b from-purple-500 via-purple-400 to-blue-400 rounded-[2.3rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="flex justify-between items-center px-6 pt-12 text-white text-sm font-medium">
                    <span>11:59</span>
                    <span>96%</span>
                  </div>
                  
                  {/* Greeting section */}
                  <div className="px-5 pt-4 text-right text-white">
                    <div className="flex items-center gap-2 justify-end mb-1">
                      <span className="text-base">صباح الخير</span>
                      <span className="text-yellow-300">✦</span>
                      <div className="w-10 h-10 bg-white/20 rounded-full" />
                    </div>
                    <h3 className="text-3xl font-bold mb-3">محمد</h3>
                    <button className="px-4 py-2 bg-white/20 rounded-full text-sm flex items-center gap-2 mr-auto">
                      <span>📅</span>
                      <span>انضم اليوم</span>
                    </button>
                  </div>
                  
                  {/* User info card */}
                  <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-3 justify-end mb-2">
                      <div className="text-right">
                        <p className="font-bold text-gray-800 text-lg">محمد عبدالله</p>
                        <p className="text-sm text-gray-500">مسؤول تسويق</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full" />
                    </div>
                    <div className="flex justify-end mb-3">
                      <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        متصل
                      </span>
                    </div>
                    <button className="w-full py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium">
                      علو لتقنية المعلومات
                    </button>
                  </div>
                  
                  {/* Status card */}
                  <div className="mx-4 mt-3 bg-white/90 rounded-2xl p-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500">نوفمبر 18,<br/>2025</span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-700">حالة اليوم</span>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      يوم عمل
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Right phone - Features list */}
              <div className="absolute right-0 top-12 w-[180px] h-[400px] border-[3px] border-purple-500 bg-white rounded-[2rem] shadow-xl transform rotate-6 z-20 overflow-hidden">
                <div className="p-4 pt-8 space-y-4">
                  {[
                    { text: 'الحضور والانصراف', icon: '📋' },
                    { text: 'سجلات الحضور', icon: '📋' },
                    { text: 'التحقق من الحضور', icon: '📋' },
                    { text: 'اثبات الحضور', icon: '📋' },
                    { text: 'طلبات الاستئذان', icon: '📋' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 justify-end bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                      <span className="text-sm text-gray-700 font-medium">{item.text}</span>
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-500 text-sm">{item.icon}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Text Content */}
          <div className={`text-right ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
            {/* Main Title */}
            <h1 className="font-bold leading-[1.1] text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8 text-foreground">
              <span className="olu-text-gradient">
                {getHeroContent('title_ar', language as "ar" | "en") || (language === 'ar' ? 'نبني المستقبل الرقمي معك' : 'Building the Digital Future with You')}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-xl mb-10 mr-auto">
              {getHeroContent('subtitle_ar', language as "ar" | "en") || (language === 'ar' 
                ? 'نحو مستقبل رقمي أكثر نجاحًا — نوفّر لك حلولًا تقنية تجمع بين الابتكار والكفاءة لتصنع الفرق في عالم الأعمال.'
                : 'Towards a more successful digital future — we provide you with technological solutions that combine innovation and efficiency to make a difference in the business world.'
              )}
            </p>
            
            {/* CTA Button */}
            <a 
              href="#contact" 
              className="inline-block px-10 py-4 bg-foreground text-background rounded-full font-bold text-lg hover:bg-foreground/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {language === 'ar' ? 'ابدأ' : 'Start'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
