
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
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
      <Navbar />
      <HeroSection />
      <div className="container mx-auto">
        <ServicesSection />
        <PortfolioSection />
        <AboutSection />
        <PartnersSection />
        <FAQSection />
        <ContactSection />
      </div>
      <GoogleMap />
      <Footer />
    </main>
  );
};

export default Index;
