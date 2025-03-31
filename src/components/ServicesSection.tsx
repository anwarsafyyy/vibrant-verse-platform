
import React from "react";
import { Globe, Code, Cpu, BarChart } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { useLanguage } from "@/hooks/useLanguage";

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="olu-text-gradient">{t("services.title")}</span>
          </h2>
          <div className="w-24 h-1 olu-gradient mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard
            title={t("service1.title")}
            description={t("service1.desc")}
            icon={Globe}
            className="animate-fade-in"
            key="web-dev"
          />
          <ServiceCard
            title={t("service2.title")}
            description={t("service2.desc")}
            icon={Code}
            className="animate-fade-in"
            style={{ animationDelay: "0.2s" }}
            key="app-dev"
          />
          <ServiceCard
            title={t("service3.title")}
            description={t("service3.desc")}
            icon={Cpu}
            className="animate-fade-in"
            style={{ animationDelay: "0.4s" }}
            key="ai-services"
          />
          <ServiceCard
            title={t("service4.title")}
            description={t("service4.desc")}
            icon={BarChart}
            className="animate-fade-in"
            style={{ animationDelay: "0.6s" }}
            key="consulting"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
