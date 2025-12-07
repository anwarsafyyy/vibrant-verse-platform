
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#faf8f5]">
      {/* Decorative sparkle elements */}
      <div className="absolute top-32 right-1/3 text-primary/30 text-2xl">✦</div>
      <div className="absolute top-1/2 right-20 text-primary/20 text-xl">✦</div>
      <div className="absolute bottom-40 left-1/2 text-primary/20 text-lg">✦</div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-32" dir="ltr">
          
          {/* Left Side - Phone Mockups */}
          <div className={`relative flex justify-center lg:justify-start ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            {/* Phone mockups container */}
            <div className="relative w-full max-w-lg h-[600px]">
              
              {/* Back phone (left) - Partially visible */}
              <div className="absolute left-0 top-8 w-48 h-[420px] bg-gradient-to-br from-slate-700 to-slate-900 rounded-[2.5rem] p-1 shadow-2xl transform -rotate-6 z-10">
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-50 rounded-[2.2rem] overflow-hidden">
                  <div className="w-full h-full bg-white/80 p-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg mb-2" />
                    <div className="space-y-2">
                      <div className="h-3 bg-purple-200 rounded w-3/4" />
                      <div className="h-3 bg-purple-100 rounded w-1/2" />
                      <div className="h-20 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl mt-4" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Middle phone (center) - Main focus */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-56 h-[480px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] p-1 shadow-2xl z-30">
                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-40" />
                <div className="w-full h-full bg-gradient-to-br from-purple-500 via-purple-400 to-blue-400 rounded-[2.2rem] overflow-hidden">
                  <div className="w-full h-full pt-10 px-4">
                    {/* Status bar */}
                    <div className="flex justify-between items-center mb-4 text-white text-xs">
                      <span>11:59</span>
                      <span>96%</span>
                    </div>
                    {/* Greeting */}
                    <div className="text-right text-white mb-4">
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-sm">صباح الخير ✦</span>
                        <div className="w-8 h-8 bg-white/20 rounded-full" />
                      </div>
                      <h3 className="text-2xl font-bold">محمد</h3>
                      <button className="mt-2 px-4 py-1 bg-white/20 rounded-full text-sm">
                        انضم اليوم 📅
                      </button>
                    </div>
                    {/* Card */}
                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center gap-3 justify-end mb-3">
                        <div className="text-right">
                          <p className="font-bold text-gray-800">محمد عبدالله</p>
                          <p className="text-xs text-gray-500">مسؤول تسويق</p>
                        </div>
                        <div className="w-10 h-10 bg-purple-100 rounded-full" />
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">● متصل</span>
                      </div>
                      <div className="mt-3 p-2 bg-blue-50 rounded-lg text-right text-xs text-blue-600">
                        علو لتقنية المعلومات
                      </div>
                    </div>
                    {/* Bottom section */}
                    <div className="mt-4 bg-white/90 rounded-2xl p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">نوفمبر 18, 2025</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">حالة اليوم</span>
                          <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">● يوم عمل</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right phone - Features list */}
              <div className="absolute right-0 top-12 w-48 h-[420px] bg-gradient-to-br from-purple-600 to-purple-800 rounded-[2.5rem] p-1 shadow-2xl transform rotate-6 z-20">
                <div className="w-full h-full bg-purple-50 rounded-[2.2rem] overflow-hidden p-4">
                  <div className="space-y-3">
                    {['الحضور والانصراف', 'سجلات الحضور', 'التحقق من الحضور', 'اثبات الحضور', 'طلبات الاستئذان'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 justify-end bg-white rounded-xl p-2 shadow-sm">
                        <span className="text-xs text-gray-700">{item}</span>
                        <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-purple-500 text-xs">📋</span>
                        </div>
                      </div>
                    ))}
                  </div>
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
