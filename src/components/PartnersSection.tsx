
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
      {/* Elegant background design */}
      <div className="absolute inset-0 -z-10">
        {/* Soft base gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-muted/20 via-background to-muted/30"></div>
        
        {/* Elegant diagonal color blocks */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-primary/6 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-full bg-gradient-to-tr from-accent/6 via-transparent to-transparent"></div>
        
        {/* Smooth ambient glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-primary/5 via-accent/3 to-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute top-0 left-1/3 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 right-1/3 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]"></div>
        
        {/* Subtle wave shape at top */}
        <svg className="absolute top-0 left-0 w-full h-32 text-muted/8 rotate-180" preserveAspectRatio="none" viewBox="0 0 1440 120">
          <path fill="currentColor" d="M0,40 C240,80 480,10 720,50 C960,90 1200,20 1440,60 L1440,120 L0,120 Z"></path>
        </svg>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent rounded-full"></div>
      </div>
      
      {/* Smooth edge blends */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-0"></div>
      
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
