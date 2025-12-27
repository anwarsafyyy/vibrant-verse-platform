
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
import { SCurveDivider } from "@/components/SectionDivider";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  useDynamicHead();
  
  return (
    <main className="min-h-screen relative bg-white md:bg-background md:bg-gradient-hero">
      <AnimatedBackground />
      <Navbar />
      <HeroSection />
      
      <AboutSection />
      
      <ServicesSection />
      
      <PortfolioSection />
      
      <PartnersSection />
      
      <FAQSection />
      
      <ContactSection />
      
      <GoogleMap />
      <Footer />
    </main>
  );
};

export default Index;

