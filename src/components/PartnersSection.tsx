
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { Handshake } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  order_index: number;
  created_at: any;
}

const PartnersSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById('partners');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const q = query(collection(db, 'partners'), orderBy('order_index', 'asc'));
        const snapshot = await getDocs(q);
        const partnersData: Partner[] = [];
        snapshot.forEach(doc => {
          partnersData.push({ id: doc.id, ...doc.data() } as Partner);
        });
        setPartners(partnersData);
      } catch (error) {
        console.error("Failed to fetch partners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  return (
    <section id="partners" className="py-28 lg:py-36 relative overflow-hidden bg-muted/30">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-48 h-48 -translate-y-1/2 opacity-5 -z-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon points="100,10 40,198 190,78 10,78 160,198" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute top-20 right-20 w-32 h-32 opacity-5 -z-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Section label */}
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Handshake className="w-5 h-5 text-primary" />
            </div>
            <span className="text-primary font-bold tracking-wider uppercase text-sm">
              {language === 'ar' ? 'شركاؤنا' : 'Our Partners'}
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            <span className="olu-text-gradient">{t("partners.title")}</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'نفخر بشراكاتنا مع نخبة من الجهات الرائدة التي تسهم معنا في بناء مستقبل رقمي أكثر تطورًا وكفاءة'
              : 'We are proud of our partnerships with leading organizations that contribute to building a more advanced and efficient digital future'
            }
          </p>
        </div>

        {/* Partners Marquee */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient masks */}
          <div className={`absolute ${dir === 'rtl' ? 'right-0' : 'left-0'} top-0 bottom-0 w-24 lg:w-48 bg-gradient-to-r ${dir === 'rtl' ? 'from-transparent to-muted/80' : 'from-muted/80 to-transparent'} z-10 pointer-events-none`} />
          <div className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} top-0 bottom-0 w-24 lg:w-48 bg-gradient-to-l ${dir === 'rtl' ? 'from-transparent to-muted/80' : 'from-muted/80 to-transparent'} z-10 pointer-events-none`} />
          
          {loading ? (
            <div className="flex gap-8 justify-center py-8">
              {Array(5).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`} className="flex-shrink-0 bg-card rounded-2xl p-8 border border-border">
                  <Skeleton className="w-28 h-28 rounded-xl" />
                </div>
              ))}
            </div>
          ) : partners.length > 0 ? (
            <div className={`flex animate-marquee hover:pause-animation ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              {/* First set */}
              {partners.map((partner, index) => (
                <div
                  key={partner.id}
                  className={`group flex-shrink-0 mx-4 bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-28 h-28 lg:w-36 lg:h-36 flex items-center justify-center">
                    <img
                      src={partner.logo_url}
                      alt={`${partner.name} Logo`}
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {partners.map((partner) => (
                <div
                  key={`${partner.id}-dup`}
                  className="group flex-shrink-0 mx-4 bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="w-28 h-28 lg:w-36 lg:h-36 flex items-center justify-center">
                    <img
                      src={partner.logo_url}
                      alt={`${partner.name} Logo`}
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              {language === 'ar' ? 'لا يوجد شركاء متاحين' : 'No partners available'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
