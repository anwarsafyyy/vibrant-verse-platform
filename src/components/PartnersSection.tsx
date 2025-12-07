
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

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
    <section id="partners" className="py-24 lg:py-32 relative overflow-hidden bg-muted/30">
      {/* Decorative shapes */}
      <div className="absolute top-1/2 left-0 w-40 h-40 -translate-y-1/2 opacity-10 -z-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon points="100,10 40,198 190,78 10,78 160,198" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Section Header - 2P Style */}
        <div className={`mb-16 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-center gap-3 mb-4 ${dir === 'rtl' ? 'justify-end flex-row-reverse' : ''}`}>
            <div className="w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <span className="text-primary font-bold text-sm tracking-wider">
              {language === 'ar' ? 'شركاء' : 'Our'}
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="olu-text-gradient">{t("partners.title")}</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl">
            {language === 'ar' 
              ? 'نفخر بشراكاتنا مع نخبة من الجهات الرائدة التي تسهم معنا في بناء مستقبل رقمي أكثر تطورًا وكفاءة.'
              : 'We are proud of our partnerships with leading organizations that contribute to building a more advanced and efficient digital future.'
            }
          </p>
        </div>

        {/* Partners Grid/Scroll */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient masks */}
          <div className={`absolute ${dir === 'rtl' ? 'right-0' : 'left-0'} top-0 bottom-0 w-20 lg:w-40 bg-gradient-to-r ${dir === 'rtl' ? 'from-transparent to-muted/80' : 'from-muted/80 to-transparent'} z-10 pointer-events-none`} />
          <div className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} top-0 bottom-0 w-20 lg:w-40 bg-gradient-to-l ${dir === 'rtl' ? 'from-transparent to-muted/80' : 'from-muted/80 to-transparent'} z-10 pointer-events-none`} />
          
          {loading ? (
            <div className="flex gap-8 justify-center py-8">
              {Array(5).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`} className="flex-shrink-0 bg-card rounded-xl p-6 border border-border">
                  <Skeleton className="w-24 h-24 rounded-lg" />
                </div>
              ))}
            </div>
          ) : partners.length > 0 ? (
            <div className={`flex animate-marquee hover:pause-animation ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              {/* First set */}
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="group flex-shrink-0 mx-4 bg-card rounded-xl p-6 border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-lg"
                >
                  <div className="w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center">
                    <img
                      src={partner.logo_url}
                      alt={`${partner.name} Logo`}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {partners.map((partner) => (
                <div
                  key={`${partner.id}-dup`}
                  className="group flex-shrink-0 mx-4 bg-card rounded-xl p-6 border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-lg"
                >
                  <div className="w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center">
                    <img
                      src={partner.logo_url}
                      alt={`${partner.name} Logo`}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No partners available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
