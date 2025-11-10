
import React from "react";
import Navbar from "@/components/Navbar";
import DigitalTransformationSection from "@/components/DigitalTransformationSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PortfolioSection from "@/components/PortfolioSection";
import GoogleMap from "@/components/GoogleMap";
import { useDynamicHead } from "@/hooks/useDynamicHead";

const Index = () => {
  useDynamicHead();
  
  return (
    <main className="min-h-screen bg-background">
      {/* Outer frame with modern gradient */}
      <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
        <div className="bg-background rounded-2xl min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-4rem)] overflow-hidden shadow-xl border border-border/50">
          <div className="container mx-auto">
            <Navbar />
          </div>
          <DigitalTransformationSection />
          <div className="container mx-auto">
            <ServicesSection />
            <AboutSection />
            <PortfolioSection />
            <PartnersSection />
            <FAQSection />
            <ContactSection />
          </div>
          <GoogleMap />
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Index;
