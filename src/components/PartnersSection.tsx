
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent } from "@/components/ui/card";

const PartnersSection: React.FC = () => {
  const { t } = useLanguage();

  const partners = [
    { id: 1, name: "Sweet Car", logoUrl: "/11.jpeg" },
    { id: 2, name: "EZCASH", logoUrl: "/22.jpeg" },
    { id: 3, name: "Company 3", logoUrl: "/33.jpeg" },
    { id: 4, name: "WAFI", logoUrl: "/44.jpeg" },
  ];

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
          {partners.map((partner) => (
            <Card
              key={partner.id}
              className="hover:shadow-xl transition-all border border-gray-300 bg-white rounded-lg overflow-hidden flex items-center justify-center p-3"
            >
              <CardContent className="flex items-center justify-center w-40 h-40">
                <img
                  src={partner.logoUrl}
                  alt={`${partner.name} Logo`}
                  className="w-full h-full object-contain"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
