
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
    <section id="partners" className="py-24 relative bg-muted/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-bold mb-6">
            <span className="olu-text-gradient">{t("partners.title")}</span>
          </h2>
          <div className="w-20 h-1.5 olu-gradient mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            نفخر بشراكاتنا مع نخبة من الجهات الرائدة التي تسهم معنا في بناء مستقبل رقمي أكثر تطورًا وكفاءة.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {loading ? (
            // Loading skeletons
            Array(4).fill(0).map((_, index) => (
              <Card key={`skeleton-${index}`} className="border border-gray-300 bg-white rounded-lg overflow-hidden">
                <CardContent className="flex items-center justify-center p-3">
                  <Skeleton className="w-40 h-40" />
                </CardContent>
              </Card>
            ))
          ) : partners.length > 0 ? (
            // Partner cards
            partners.map((partner) => (
              <Card
                key={partner.id}
                className="card-hover border bg-card rounded-2xl overflow-hidden flex items-center justify-center p-6"
              >
                <CardContent className="flex items-center justify-center w-40 h-40 p-0">
                  <img
                    src={partner.logo_url}
                    alt={`${partner.name} Logo`}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                  />
                </CardContent>
              </Card>
            ))
          ) : (
            // Fallback for no data
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
