
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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 -z-10"></div>
      
      {/* Floating decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -z-10"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 -z-10"></div>
      
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
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
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
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
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
