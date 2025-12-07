
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Users, Calendar, Award } from "lucide-react";
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

  useEffect(() => {
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

  const getStatIcon = (iconName: string, index: number) => {
    const icons = [Users, Calendar, Award];
    const Icon = icons[index % icons.length];
    return <Icon className="w-6 h-6" />;
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
    <section id="about" className="py-28 lg:py-36 relative overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-5 -z-10">
        <svg viewBox="0 0 200 200" className="w-full h-full text-primary">
          <polygon points="100,10 40,198 190,78 10,78 160,198" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-80 h-80 opacity-5 -z-10">
        <svg viewBox="0 0 200 200" className="w-full h-full text-accent">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${dir === 'rtl' ? 'lg:grid-flow-dense' : ''}`}>
          
          {/* Left Side - Stats */}
          <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'} ${dir === 'rtl' ? 'lg:col-start-2' : ''}`}>
            {/* Section label */}
            <div className={`flex items-center gap-3 mb-6 ${dir === 'rtl' ? 'justify-end flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm">
                {language === 'ar' ? 'من نحن' : 'About Us'}
              </span>
            </div>
            
            {/* Title */}
            <h2 className={`text-4xl lg:text-5xl xl:text-6xl font-bold mb-12 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <span className="olu-text-gradient">
                {language === 'ar' ? 'نبني المستقبل الرقمي' : 'Building Digital Future'}
              </span>
            </h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6">
              {displayStats.map((stat, index) => (
                <div 
                  key={stat.id}
                  className={`group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {getStatIcon(stat.icon, index)}
                  </div>
                  
                  {/* Value */}
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-sm text-muted-foreground font-medium">
                    {getTranslatedStatName(stat.name)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Description */}
          <div className={`${dir === 'rtl' ? 'text-right lg:col-start-1 lg:row-start-1' : 'text-left'} ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8">
              {getAboutContent('description_ar', language as "ar" | "en") || (language === 'ar' 
                ? "تأسست شركتنا لتكون رائدة في سوق خدمات تقنية المعلومات وحلول التكنولوجيا بالمملكة العربية السعودية. نحن نقدم مجموعة شاملة من خدمات تقنية المعلومات يتيح لنا نموذج أعمالنا المتكامل الفريد تقديم نهج شامل لتحول العملاء الرقمي."
                : "Our company was established to be a leader in the IT services and technology solutions market in Saudi Arabia. We provide a comprehensive range of IT services. Our unique integrated business model allows us to deliver a holistic approach to customers' digital transformation."
              )}
            </p>
            
            <p className="text-base text-muted-foreground/80 leading-relaxed mb-10">
              {language === 'ar' 
                ? "نحن نتعاون مع العملاء على مدار رحلتهم الرقمية، بدءًا من التطوير الأولي إلى إدارة البنية التحتية الخلفية. من خلال إعطاء الأولوية لخدمة العملاء الاستثنائية وتخصيص الحلول لتلبية احتياجات الأعمال المحددة."
                : "We partner with clients throughout their digital journey, from initial development to backend infrastructure management. By prioritizing exceptional customer service and tailoring solutions to meet specific business needs."
              }
            </p>
            
            {/* CTA Button */}
            <Button 
              onClick={scrollToContact}
              size="lg"
              className={`group bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
            >
              <span>{language === 'ar' ? 'تواصل معنا' : 'Get in Touch'}</span>
              {dir === 'rtl' ? (
                <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
