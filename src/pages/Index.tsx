
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
    <main className="min-h-screen bg-background overflow-x-hidden">
      <div className="container mx-auto">
        <Navbar />
        <DigitalTransformationSection />
        <ServicesSection />
        <AboutSection />
        <PartnersSection />
        <PortfolioSection />
        <FAQSection />
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
};

export default Index;
