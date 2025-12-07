
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Calendar, Award, Target } from "lucide-react";
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

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      users: Users,
      calendar: Calendar,
      award: Award,
      target: Target,
    };
    const IconComponent = icons[iconName] || Award;
    return <IconComponent className="w-6 h-6" />;
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
    <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 -z-10" />
      
      {/* Decorative shapes */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4">
        {/* Section Header - 2P Style with side decorator */}
        <div className={`flex items-start gap-6 mb-16 ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
          <div className="hidden md:block w-1 h-24 bg-gradient-to-b from-primary to-accent rounded-full" />
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary font-bold text-sm uppercase tracking-wider">
                {language === 'ar' ? 'من' : 'About'}
              </span>
            </div>
            <h2 className="font-bold tracking-tight">
              <span className="olu-text-gradient">
                {language === 'ar' ? 'نحن' : 'Us'}
              </span>
            </h2>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Stats Cards - 2P Style */}
          <div className={`grid grid-cols-3 gap-4 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            {displayStats.map((stat, index) => (
              <div 
                key={stat.id}
                className="group relative bg-card rounded-2xl p-6 text-center border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 card-shine"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground font-medium">
                    {getTranslatedStatName(stat.name)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Description */}
          <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'} ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {getAboutContent('description_ar', language as "ar" | "en") || (language === 'ar' 
                ? "تأسست شركتنا لتكون رائدة في سوق خدمات تقنية المعلومات وحلول التكنولوجيا. نحن نقدم مجموعة شاملة من خدمات تقنية المعلومات يتيح لنا نموذج أعمالنا المتكامل الفريد تقديم نهج شامل لتحول العملاء الرقمي. نحن نتعاون مع العملاء على مدار رحلتهم الرقمية، بدءًا من التطوير الأولي إلى إدارة البنية التحتية الخلفية."
                : "Our company was established to be a leader in the IT services and technology solutions market. We provide a comprehensive range of IT services. Our unique integrated business model allows us to deliver a holistic approach to customers' digital transformation. We partner with clients throughout their digital journey, from initial development to backend infrastructure management."
              )}
            </p>
            
            <Button 
              variant="ghost"
              size="lg"
              onClick={scrollToContact}
              className="group text-primary hover:text-primary hover:bg-primary/5 px-0"
            >
              <span className="font-bold">{language === 'ar' ? 'اقرأ المزيد' : 'Read More'}</span>
              <ArrowRight className={`ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 ${dir === 'rtl' ? 'rtl-flip' : ''}`} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
