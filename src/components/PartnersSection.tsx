
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import type { Database } from "@/types/supabase";

type Partner = Database['public']['Tables']['partners']['Row'];

const PartnersSection: React.FC = () => {
  const { t } = useLanguage();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .order('order_index', { ascending: true });
          
        if (error) {
          console.error("Error fetching partners:", error);
          return;
        }
        
        setPartners(data || []);
      } catch (error) {
        console.error("Failed to fetch partners:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPartners();
  }, []);

  return (
    <section id="partners" className="py-20 relative bg-muted/30">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="olu-gold-text-gradient">{t("partners.title")}</span>
          </h2>
          <div className="w-20 h-1 bg-olu-gold mx-auto rounded-full"></div>
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
                className="hover:shadow-xl transition-all border border-gray-300 bg-white rounded-lg overflow-hidden flex items-center justify-center p-3"
              >
                <CardContent className="flex items-center justify-center w-40 h-40">
                  <img
                    src={partner.logo_url}
                    alt={`${partner.name} Logo`}
                    className="w-full h-full object-contain"
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
