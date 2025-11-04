import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

interface Stat {
  id: string;
  name: string;
  value: string;
  icon: string;
  order_index: number;
}

const DigitalTransformationSection: React.FC = () => {
  const { language, dir } = useLanguage();
  const { getSetting } = useSiteContent();
  const [stats, setStats] = useState<Stat[]>([]);
  
  const transformationImageUrl = getSetting('transformation_image_url', language as "ar" | "en") || "/lovable-uploads/43d54ca4-23e5-4237-86f8-517a1cc8e3dc.png";

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const q = query(
        collection(db, 'stats'),
        orderBy('order_index', 'asc')
      );
      const snapshot = await getDocs(q);
      const statsData: Stat[] = [];
      snapshot.forEach(doc => {
        statsData.push({ id: doc.id, ...doc.data() } as Stat);
      });
      setStats(statsData);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden" dir={dir}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-[fadeIn_1s_ease-in]">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-olu-purple/10 to-olu-accent/10 text-olu-purple text-sm font-semibold">
                {language === 'ar' ? 'التحول الرقمي' : 'Digital Transformation'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="olu-text-gradient">
                {language === 'ar' ? 'نقود التحول الرقمي' : 'Leading Digital Transformation'}
              </span>
              <br />
              <span className="text-foreground">
                {language === 'ar' ? 'بالابتكار والتميز' : 'Through Innovation'}
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {language === 'ar' 
                ? 'نساعدك على استشراف المستقبل وتحقيق أهدافك من خلال حلول رقمية متكاملة تجمع بين الابتكار والكفاءة'
                : 'We help you envision the future and achieve your goals through integrated digital solutions that combine innovation and efficiency'}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
              {stats.map((stat) => (
                <div key={stat.id} className="text-center">
                  <div className="text-3xl font-bold olu-text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-[fadeIn_1.5s_ease-in]">
            <div className="absolute inset-0 bg-gradient-to-r from-olu-purple/20 to-olu-accent/20 rounded-3xl blur-3xl"></div>
            <img 
              src={transformationImageUrl}
              alt={language === 'ar' ? 'التحول الرقمي' : 'Digital Transformation'}
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalTransformationSection;
