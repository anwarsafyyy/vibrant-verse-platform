
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent } from "@/components/ui/card";
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
    <section id="partners" className="py-32 relative bg-secondary/20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="font-bold mb-6 tracking-tight">
            <span className="olu-text-gradient">{t("partners.title")}</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            نفخر بشراكاتنا مع نخبة من الجهات الرائدة التي تسهم معنا في بناء مستقبل رقمي أكثر تطورًا وكفاءة.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {loading ? (
            Array(4).fill(0).map((_, index) => (
              <Card key={`skeleton-${index}`} className="border border-border/50 bg-card rounded-3xl overflow-hidden">
                <CardContent className="flex items-center justify-center p-12">
                  <Skeleton className="w-32 h-32" />
                </CardContent>
              </Card>
            ))
          ) : partners.length > 0 ? (
            partners.map((partner) => (
              <Card
                key={partner.id}
                className="card-hover border border-border/50 bg-card rounded-3xl overflow-hidden flex items-center justify-center p-8"
              >
                <CardContent className="flex items-center justify-center w-32 h-32 p-0">
                  <img
                    src={partner.logo_url}
                    alt={`${partner.name} Logo`}
                    className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                  />
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-muted-foreground">
              No partners available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
