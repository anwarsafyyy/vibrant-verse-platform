
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent } from "@/components/ui/card";

const PartnersSection: React.FC = () => {
  const { t } = useLanguage();

  // Placeholder partners logos (would be replaced with actual partner logos)
  const partners = [
    { id: 1, name: "Partner 1" },
    { id: 2, name: "Partner 2" },
    { id: 3, name: "Partner 3" },
    { id: 4, name: "Partner 4" },
    { id: 5, name: "Partner 5" },
    { id: 6, name: "Partner 6" },
  ];

  return (
    <section id="partners" className="py-20 relative bg-muted/30">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="olu-gold-text-gradient">{t("partners.title")}</span>
          </h2>
          <div className="w-24 h-1 bg-olu-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner) => (
            <Card key={partner.id} className="hover:shadow-md transition-all hover:border-olu-gold/50 group">
              <CardContent className="flex items-center justify-center h-32 p-6">
                <div className="w-full h-full flex items-center justify-center rounded-md bg-background group-hover:scale-105 transition-transform">
                  <span className="text-muted-foreground text-lg font-medium">
                    {partner.name}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
