
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
import { useDynamicHead } from "@/hooks/useDynamicHead";

const Index = () => {
  useDynamicHead();
  
  return (
    <main className="min-h-screen bg-white">
      {/* Outer frame with logo gradient colors */}
      <div className="p-4 min-h-screen bg-gradient-to-br from-olu-purple via-olu-purple-dark to-olu-purple">
        <div className="bg-white rounded-2xl min-h-[calc(100vh-2rem)] overflow-hidden shadow-2xl">
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
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Index;
