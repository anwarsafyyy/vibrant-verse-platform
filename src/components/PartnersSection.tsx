
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
      {/* Modern decorative background */}
      <div className="absolute inset-0 -z-10">
        {/* Layered gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-tl from-accent/8 via-background to-primary/8"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/3 to-transparent"></div>
        
        {/* Large ambient orbs */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/4 w-[500px] h-[300px] bg-gradient-to-t from-accent/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-[400px] h-[400px] bg-gradient-to-l from-primary/8 to-transparent rounded-full blur-3xl -translate-y-1/2"></div>
        
        {/* Floating geometric decorations */}
        <div className="absolute top-16 left-20 w-28 h-28 border border-primary/15 rounded-full animate-float"></div>
        <div className="absolute top-24 right-16 w-20 h-20 border-2 border-accent/10 rounded-2xl rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-24 left-32 w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl rotate-12 animate-bounce-soft"></div>
        <div className="absolute bottom-16 right-24 w-24 h-24 border border-primary/10 rounded-3xl -rotate-12 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-10 w-12 h-12 bg-primary/5 rounded-full animate-pulse-soft"></div>
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-accent/10 rounded-full animate-bounce-soft" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Subtle decorative lines */}
        <div className="absolute top-1/4 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"></div>
        <div className="absolute bottom-1/4 right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-accent/15 to-transparent"></div>
        <div className="absolute top-0 left-1/2 w-px h-1/4 bg-gradient-to-b from-transparent via-primary/10 to-transparent"></div>
      </div>
      
      {/* Edge transition gradients */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0"></div>
      
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
