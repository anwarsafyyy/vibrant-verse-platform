
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

interface StatItem {
  id: string;
  name: string;
  value: string;
  icon: string;
}

const AboutSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const { getAboutContent } = useSiteContent();
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const q = query(collection(db, 'stats'), orderBy('order_index', 'asc'));
      const snapshot = await getDocs(q);
      const statsData: StatItem[] = [];
      snapshot.forEach(doc => {
        statsData.push({ id: doc.id, ...doc.data() } as StatItem);
      });
      setStats(statsData);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTranslatedStatName = (name: string) => {
    const translations: Record<string, Record<string, string>> = {
      'موظف': { ar: 'موظف', en: 'Employees' },
      'سنوات خبرة': { ar: 'سنوات خبرة', en: 'Years Experience' },
      'عملائنا': { ar: 'عملائنا', en: 'Our Clients' },
    };
    return translations[name]?.[language] || name;
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const defaultStats = [
    { id: '1', value: '+4500', name: 'موظف', icon: 'users' },
    { id: '2', value: '+20', name: 'سنوات خبرة', icon: 'calendar' },
    { id: '3', value: '+200', name: 'عملائنا', icon: 'award' },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden bg-background">
      {/* Decorative shapes - 2P style */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-20 -z-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon points="100,10 40,198 190,78 10,78 160,198" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-48 h-48 opacity-20 -z-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side - Stats (2P style: prominent numbers) */}
          <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            {/* Section label - 2P style with icon */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </div>
              <span className="text-primary font-bold text-sm tracking-wider">
                {language === 'ar' ? 'من' : 'About'}
              </span>
            </div>
            
            {/* Title - 2P style */}
            <h2 className={`text-4xl lg:text-5xl xl:text-6xl font-bold mb-10 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <span className="olu-text-gradient">
                {language === 'ar' ? 'نحن' : 'Us'}
              </span>
            </h2>
            
            {/* Stats - 2P style: Large numbers stacked */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              {displayStats.map((stat, index) => (
                <div 
                  key={stat.id}
                  className={`${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm lg:text-base text-muted-foreground font-medium">
                    {getTranslatedStatName(stat.name)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Description */}
          <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'} ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-8">
              {getAboutContent('description_ar', language as "ar" | "en") || (language === 'ar' 
                ? "تأسست شركتنا لتكون رائدة في سوق خدمات تقنية المعلومات وحلول التكنولوجيا بالمملكة العربية السعودية. نحن نقدم مجموعة شاملة من خدمات تقنية المعلومات يتيح لنا نموذج أعمالنا المتكامل الفريد تقديم نهج شامل لتحول العملاء الرقمي. نحن نتعاون مع العملاء على مدار رحلتهم الرقمية، بدءًا من التطوير الأولي إلى إدارة البنية التحتية الخلفية. من خلال إعطاء الأولوية لخدمة العملاء الاستثنائية وتخصيص الحلول لتلبية احتياجات الأعمال المحددة."
                : "Our company was established to be a leader in the IT services and technology solutions market in Saudi Arabia. We provide a comprehensive range of IT services. Our unique integrated business model allows us to deliver a holistic approach to customers' digital transformation. We partner with clients throughout their digital journey, from initial development to backend infrastructure management. By prioritizing exceptional customer service and tailoring solutions to meet specific business needs."
              )}
            </p>
            
            {/* Read More Button - 2P style with arrow */}
            <Button 
              variant="ghost"
              size="lg"
              onClick={scrollToContact}
              className={`group text-primary hover:text-primary hover:bg-primary/5 px-0 font-bold ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
            >
              {dir === 'rtl' ? (
                <ArrowLeft className="ml-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ArrowRight className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              )}
              <span>{language === 'ar' ? 'اقرأ المزيد' : 'Read More'}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
