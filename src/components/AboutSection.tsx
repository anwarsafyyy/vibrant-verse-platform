
import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";
import { ArrowUp, Users, Briefcase, Calendar, Cpu, Smartphone, Award, UserCheck } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

interface StatData {
  id: string;
  value: number;
  prefix: string;
  label_ar: string;
  label_en: string;
  icon: string;
  order_index: number;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  UserCheck,
  Briefcase,
  Calendar,
  Cpu,
  Award,
  Users,
};

// Counter animation hook
const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!start) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);
  
  return count;
};

// Parallax hook
const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.innerHeight - rect.top;
        if (scrolled > 0) {
          setOffset(scrolled * speed * 0.1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { offset, elementRef };
};

const AboutSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { getAboutContent, aboutContent } = useSiteContent();
  const [isVisible, setIsVisible] = useState(false);
  const [startCounting, setStartCounting] = useState(false);
  const [statsData, setStatsData] = useState<StatData[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const { offset: imageOffset, elementRef: imageRef } = useParallax(0.3);
  const { offset: decorOffset, elementRef: decorRef } = useParallax(0.5);
  
  // Get dynamic image from Firebase
  const dynamicImage = aboutContent?.image_url;

  // Fetch stats from Firebase
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const q = query(collection(db, 'stats'), orderBy('order_index', 'asc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as StatData[];
        setStatsData(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Fallback to default stats
        setStatsData([
          { id: '1', value: 200, prefix: '+', label_ar: 'عملاء راضون', label_en: 'Happy Clients', icon: 'UserCheck', order_index: 0 },
          { id: '2', value: 100, prefix: '+', label_ar: 'مشاريع مكتملة', label_en: 'Completed Projects', icon: 'Briefcase', order_index: 1 },
          { id: '3', value: 8, prefix: '+', label_ar: 'سنوات خبرة', label_en: 'Years Experience', icon: 'Calendar', order_index: 2 },
          { id: '4', value: 50, prefix: '+', label_ar: 'تقنيات مستخدمة', label_en: 'Technologies Used', icon: 'Cpu', order_index: 3 },
        ]);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById('about');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Separate observer for stats to trigger counting animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStartCounting(true);
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic counters based on fetched stats
  const AnimatedStat = ({ stat, index }: { stat: StatData; index: number }) => {
    const count = useCountUp(stat.value, 2000, startCounting);
    const IconComponent = iconMap[stat.icon] || UserCheck;
    const gradients = [
      'from-violet-600 via-purple-500 to-fuchsia-500',
      'from-purple-600 via-fuchsia-500 to-pink-500',
      'from-fuchsia-600 via-pink-500 to-rose-400',
      'from-indigo-600 via-violet-500 to-purple-500',
    ];
    const gradient = gradients[index % gradients.length];

    return (
      <div 
        className="group p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-purple-400/20 bg-[hsl(262,45%,35%)] hover:border-purple-300/50 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer relative overflow-hidden"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Gradient border on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl`} />
        <div className="absolute inset-[2px] bg-[hsl(262,45%,35%)] rounded-[10px] sm:rounded-[14px] z-10" />
        
        <div className="relative z-20">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-lg sm:rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-0.5 tabular-nums" dir="ltr">
            {stat.prefix}{count}
          </div>
          <div className="text-xs sm:text-sm text-white/60 font-medium leading-relaxed">
            {language === 'ar' ? stat.label_ar : stat.label_en}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="about" className="py-12 lg:py-16 relative overflow-hidden bg-white" ref={decorRef}>
      {/* Decorative Background Circles */}
      <div className="absolute left-[-5%] top-[10%] w-32 h-32 md:w-48 md:h-48 bg-[hsl(250,40%,75%)] rounded-full opacity-40" />
      <div className="absolute right-[-3%] bottom-[15%] w-24 h-24 md:w-36 md:h-36 bg-[hsl(250,40%,75%)] rounded-full opacity-35" />
      <div className="absolute right-[20%] top-[5%] w-16 h-16 md:w-24 md:h-24 bg-[hsl(320,50%,80%)] rounded-full opacity-40" />
      <div className="absolute left-[15%] bottom-[20%] w-20 h-20 md:w-28 md:h-28 bg-[hsl(170,45%,75%)] rounded-full opacity-35" />
      
      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className="absolute bottom-20 left-8 w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-20 hidden lg:flex"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
      
      <div className="container mx-auto px-4">
        {/* Unified Section Header */}
        <div className={`flex items-center gap-4 mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Diamond icon container */}
          <div className="relative">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rotate-45 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Users className="w-6 h-6 md:w-7 md:h-7 text-white -rotate-45" />
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-purple-500 font-bold text-base md:text-lg">
              {language === 'ar' ? 'تعرف علينا' : 'Get To Know Us'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              {language === 'ar' ? 'من نحن' : 'About Us'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start" dir="ltr">
          
          {/* Left Side - Dynamic Image or Tablet Mockup */}
          <div 
            ref={imageRef}
            className={`relative order-2 lg:order-1 flex items-center justify-center py-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          >
            {/* Golden decorative curves */}
            <div 
              className="absolute -bottom-6 -left-2 w-40 h-40 md:w-56 md:h-56 border-[6px] md:border-[10px] border-[hsl(45,85%,50%)] rounded-full z-0"
              style={{ 
                clipPath: 'polygon(0 40%, 60% 40%, 60% 100%, 0 100%)',
                transform: `translateY(${decorOffset}px)` 
              }}
            />
            <div 
              className="absolute -bottom-2 left-12 w-32 h-32 md:w-44 md:h-44 border-[5px] md:border-[8px] border-[hsl(40,80%,45%)] rounded-full z-0"
              style={{ 
                clipPath: 'polygon(0 40%, 60% 40%, 60% 100%, 0 100%)',
                transform: `translateY(${-decorOffset * 0.5}px)` 
              }}
            />
            
            {/* Conditional Rendering: Dynamic Image or Tablet Mockup */}
            {dynamicImage ? (
              /* Dynamic Image Display */
              <div 
                className="relative z-10 transition-transform duration-300 hover:scale-[1.02]"
                style={{ 
                  transform: `perspective(1200px) rotateY(-10deg) rotateX(5deg) translateY(${imageOffset}px)`,
                }}
              >
                {/* Shadow underneath */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/20 rounded-[50%] blur-xl" />
                
                {/* Image Frame */}
                <div className="relative bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 rounded-[24px] md:rounded-[40px] p-[3px] md:p-[5px] shadow-2xl shadow-black/30">
                  <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-[22px] md:rounded-[36px] p-2 md:p-3">
                    <img 
                      src={dynamicImage} 
                      alt={language === 'ar' ? 'علو - شركة تطوير مواقع وتطبيقات في جازان السعودية' : 'OLU - Web and App Development Company in Jazan Saudi Arabia'}
                      className="rounded-[16px] md:rounded-[28px] w-[320px] sm:w-[380px] md:w-[480px] lg:w-[520px] h-[230px] sm:h-[280px] md:h-[340px] lg:h-[370px] object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Default Tablet Mockup */
              <div 
                className="relative z-10 transition-transform duration-300 hover:scale-[1.02]"
                style={{ 
                  transform: `perspective(1200px) rotateY(-10deg) rotateX(5deg) translateY(${imageOffset}px)`,
                }}
              >
                {/* Shadow underneath */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/20 rounded-[50%] blur-xl" />
                
                {/* Tablet outer frame - Silver/Space Gray */}
                <div className="relative bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 rounded-[24px] md:rounded-[40px] p-[3px] md:p-[5px] shadow-2xl shadow-black/30">
                  {/* Tablet inner bezel - Dark */}
                  <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-[22px] md:rounded-[36px] p-2 md:p-3">
                    {/* Camera */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-gray-700 rounded-full z-20 ring-1 ring-gray-600" />
                    
                    {/* Screen */}
                    <div className="relative bg-gradient-to-br from-[hsl(220,40%,15%)] to-[hsl(220,35%,12%)] rounded-[16px] md:rounded-[28px] overflow-hidden w-[320px] sm:w-[380px] md:w-[480px] lg:w-[520px] h-[230px] sm:h-[280px] md:h-[340px] lg:h-[370px]">
                      {/* Dashboard Header */}
                      <div className="bg-[hsl(220,45%,12%)] px-4 py-2.5 md:py-3 flex items-center justify-between border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <span className="text-white text-xs md:text-sm font-bold">علو</span>
                          </div>
                          <span className="text-white text-sm md:text-base font-bold">لوحة التحكم</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">● متصل</div>
                        </div>
                      </div>
                      
                      {/* Dashboard Content */}
                      <div className="p-3 md:p-4 space-y-3">
                        {/* Stats Row */}
                        <div className="grid grid-cols-4 gap-2 md:gap-3">
                          <div className="bg-gradient-to-br from-purple-600/30 to-purple-800/20 rounded-xl p-2.5 md:p-3 text-center border border-purple-500/30 backdrop-blur-sm">
                            <div className="text-white font-bold text-base md:text-xl">2356</div>
                            <div className="text-purple-300 text-[9px] md:text-xs">إجمالي الرسائل</div>
                          </div>
                          <div className="bg-gradient-to-br from-blue-600/30 to-blue-800/20 rounded-xl p-2.5 md:p-3 text-center border border-blue-500/30 backdrop-blur-sm">
                            <div className="text-white font-bold text-base md:text-xl">50</div>
                            <div className="text-blue-300 text-[9px] md:text-xs">المحادثات</div>
                          </div>
                          <div className="bg-gradient-to-br from-emerald-600/30 to-emerald-800/20 rounded-xl p-2.5 md:p-3 text-center border border-emerald-500/30 backdrop-blur-sm">
                            <div className="text-white font-bold text-base md:text-xl">20</div>
                            <div className="text-emerald-300 text-[9px] md:text-xs">الحملات</div>
                          </div>
                          <div className="bg-gradient-to-br from-amber-600/30 to-amber-800/20 rounded-xl p-2.5 md:p-3 text-center border border-amber-500/30 backdrop-blur-sm">
                            <div className="text-white font-bold text-base md:text-xl">95%</div>
                            <div className="text-amber-300 text-[9px] md:text-xs">معدل النجاح</div>
                          </div>
                        </div>
                        
                        {/* Chart Area */}
                        <div className="bg-white/5 rounded-xl p-3 md:p-4 border border-white/10 backdrop-blur-sm">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-white font-medium text-xs md:text-sm">إحصائيات الرسائل المرسلة</span>
                            <div className="flex gap-3 items-center">
                              <div className="flex items-center gap-1">
                                <span className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                                <span className="text-white/60 text-[9px] md:text-xs">ناجحة</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                                <span className="text-white/60 text-[9px] md:text-xs">فاشلة</span>
                              </div>
                            </div>
                          </div>
                          {/* Chart visualization */}
                          <div className="h-16 md:h-24 flex items-end gap-1 relative">
                            {/* Grid lines */}
                            <div className="absolute inset-0 flex flex-col justify-between">
                              {[0, 1, 2, 3].map((_, i) => (
                                <div key={i} className="border-t border-white/5 w-full" />
                              ))}
                            </div>
                            {/* Bars */}
                            {[45, 70, 55, 85, 60, 78, 65, 82, 58, 90, 72, 80, 68, 88].map((h, i) => (
                              <div 
                                key={i} 
                                className="flex-1 bg-gradient-to-t from-green-500 via-green-400 to-emerald-300 rounded-t-md relative z-10 shadow-sm shadow-green-500/20"
                                style={{ height: `${h}%` }}
                              />
                            ))}
                          </div>
                        </div>
                        
                        {/* Bottom Row */}
                        <div className="grid grid-cols-2 gap-2 md:gap-3">
                          <div className="bg-white/5 rounded-xl p-2.5 md:p-3 flex items-center gap-3 border border-white/10">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center shadow-lg">
                              <span className="text-white text-xs md:text-sm font-bold">2500</span>
                            </div>
                            <div>
                              <div className="text-white font-medium text-xs md:text-sm">رسائل اليوم</div>
                              <div className="text-green-400 text-[9px] md:text-xs">↑ 12% من أمس</div>
                            </div>
                          </div>
                          <div className="bg-white/5 rounded-xl p-2.5 md:p-3 flex items-center gap-3 border border-white/10">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                              <span className="text-white text-xs md:text-sm font-bold">50</span>
                            </div>
                            <div>
                              <div className="text-white font-medium text-xs md:text-sm">رسائل قيد الإرسال</div>
                              <div className="text-blue-400 text-[9px] md:text-xs">جاري المعالجة...</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Side - Content */}
          <div className={`text-right order-1 lg:order-2 ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
              {statsData.map((stat, index) => (
                <AnimatedStat key={stat.id} stat={stat} index={index} />
              ))}
            </div>
            
            {/* Title */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-gray-800">
              {language === 'ar' ? 'نبني المستقبل الرقمي' : 'Building Digital Future'}
            </h3>
            
            {/* Description - Long Text with consistent line spacing */}
            <p className="text-base md:text-lg text-gray-600 leading-loose mb-4">
              {language === 'ar' 
                ? "شركة علو متخصصة في تطوير المواقع والتطبيقات والحلول التقنية المبتكرة. نعمل مع عملائنا لتحويل أفكارهم إلى حقيقة رقمية تساعدهم على تحقيق أهدافهم."
                : "OLU Company specializes in developing websites, applications, and innovative technical solutions. We work with our clients to transform their ideas into digital reality that helps them achieve their goals."
              }
            </p>
            
            <p className="text-base md:text-lg text-gray-500 leading-loose mb-6">
              {language === 'ar' 
                ? "نحن نتعاون مع العملاء على مدار رحلتهم الرقمية، بدءًا من التطوير الأولي إلى إدارة البنية التحتية الخلفية. من خلال إعطاء الأولوية لخدمة العملاء الاستثنائية وتخصيص الحلول لتلبية احتياجات الأعمال المحددة."
                : "We collaborate with clients throughout their digital journey, from initial development to backend infrastructure management. By prioritizing exceptional customer service and tailoring solutions to meet specific business needs."
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
