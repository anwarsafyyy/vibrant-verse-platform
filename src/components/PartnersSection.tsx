
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
    <section id="partners" className="py-24 md:py-32 relative overflow-hidden bg-muted/30">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-30" />
      
      <div className="container mx-auto px-4">
        {/* Section Header - 2P Style */}
        <div className={`mb-16 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-16 bg-gradient-to-b from-primary to-accent rounded-full hidden md:block" />
            <div>
              <span className="text-primary font-bold text-sm uppercase tracking-wider block mb-2">
                {language === 'ar' ? 'شركاء' : 'Our'}
              </span>
              <h2 className="font-bold tracking-tight">
                <span className="olu-text-gradient">{t("partners.title")}</span>
              </h2>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mt-4">
            {language === 'ar' 
              ? 'نفخر بشراكاتنا مع نخبة من الجهات الرائدة التي تسهم معنا في بناء مستقبل رقمي أكثر تطورًا وكفاءة.'
              : 'We are proud of our partnerships with leading organizations that contribute to building a more advanced and efficient digital future.'
            }
          </p>
        </div>

        {/* Partners Infinite Scroll */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-muted/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-muted/80 to-transparent z-10 pointer-events-none" />
          
          {loading ? (
            <div className="flex gap-8 justify-center py-8">
              {Array(5).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`} className="flex-shrink-0 bg-card rounded-2xl p-6 border border-border/50">
                  <Skeleton className="w-28 h-28 rounded-xl" />
                </div>
              ))}
            </div>
          ) : partners.length > 0 ? (
            <div className="flex animate-marquee hover:pause-animation">
              {/* First set */}
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="group flex-shrink-0 mx-4 bg-card rounded-2xl p-6 md:p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 card-shine"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
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
                  className="group flex-shrink-0 mx-4 bg-card rounded-2xl p-6 md:p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 card-shine"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
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
