
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent } from "@/components/ui/card";
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
  const { t } = useLanguage();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const q = query(
          collection(db, 'partners'),
          orderBy('order_index', 'asc')
        );
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
    <section id="partners" className="py-32 relative overflow-hidden">
      {/* Clean light background with subtle purple wave */}
      <div className="absolute inset-0 -z-10">
        {/* Light gray base */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-slate-100/80 dark:from-slate-900/50 dark:to-slate-800/30"></div>
        
        {/* Subtle purple/pink gradient wave at bottom */}
        <svg className="absolute bottom-0 left-0 w-full h-40" preserveAspectRatio="none" viewBox="0 0 1440 160">
          <defs>
            <linearGradient id="partnersWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
              <stop offset="50%" stopColor="hsl(280, 70%, 60%)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path fill="url(#partnersWaveGradient)" d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,160 L0,160 Z"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <Handshake className="w-4 h-4" />
            {t("partners.title")}
          </div>
          <h2 className="font-bold mb-6 tracking-tight">
            <span className="olu-text-gradient">{t("partners.title")}</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            نفخر بشراكاتنا مع نخبة من الجهات الرائدة التي تسهم معنا في بناء مستقبل رقمي أكثر تطورًا وكفاءة.
          </p>
        </div>

        {/* Infinite Scroll Container */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient masks for smooth fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
          
          {loading ? (
            <div className="flex gap-8 justify-center py-8">
              {Array(4).fill(0).map((_, index) => (
                <Card key={`skeleton-${index}`} className="border border-border/50 bg-card rounded-3xl overflow-hidden flex-shrink-0">
                  <CardContent className="flex items-center justify-center p-8">
                    <Skeleton className="w-32 h-32 rounded-2xl" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : partners.length > 0 ? (
            <div className="flex animate-marquee hover:pause-animation">
              {/* First set of logos */}
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="group relative flex-shrink-0 mx-4 border border-border/50 bg-card rounded-3xl overflow-hidden flex items-center justify-center p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center justify-center w-32 h-32">
                    <img
                      src={partner.logo_url}
                      alt={`${partner.name} Logo`}
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partners.map((partner) => (
                <div
                  key={`${partner.id}-duplicate`}
                  className="group relative flex-shrink-0 mx-4 border border-border/50 bg-card rounded-3xl overflow-hidden flex items-center justify-center p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center justify-center w-32 h-32">
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
