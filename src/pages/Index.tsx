
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
    <main className="min-h-screen bg-white">
      {/* Outer frame with logo gradient colors */}
      <div className="p-8 min-h-screen bg-gradient-to-br from-olu-purple via-olu-purple-dark to-olu-purple">
        <div className="bg-white rounded-3xl min-h-[calc(100vh-4rem)] overflow-hidden shadow-2xl border-4 border-white/20">
          <div className="container mx-auto">
            <Navbar />
          </div>
          <DigitalTransformationSection />
          <div className="container mx-auto">
            <ServicesSection />
            <AboutSection />
            <PartnersSection />
            <PortfolioSection />
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
