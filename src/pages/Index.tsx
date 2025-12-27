
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
import { WaveDivider } from "@/components/SectionDivider";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  useDynamicHead();
  
  return (
    <main className="min-h-screen relative bg-white md:bg-background md:bg-gradient-hero">
      <AnimatedBackground />
      <Navbar />
      <HeroSection />
      
      <WaveDivider fillColor="#0d1e3a" className="hidden md:block -mt-1" />
      <WaveDivider fillColor="#f0f7ff" className="md:hidden -mt-1" />
      
      <AboutSection />
      
      <WaveDivider fillColor="#0a1628" className="hidden md:block -mt-1" flip />
      <WaveDivider fillColor="#ffffff" className="md:hidden -mt-1" flip />
      
      <ServicesSection />
      
      <WaveDivider fillColor="#0d1e3a" className="hidden md:block -mt-1" />
      <WaveDivider fillColor="#f0f7ff" className="md:hidden -mt-1" />
      
      <PortfolioSection />
      
      <WaveDivider fillColor="#0a1628" className="hidden md:block -mt-1" flip />
      <WaveDivider fillColor="#ffffff" className="md:hidden -mt-1" flip />
      
      <PartnersSection />
      
      <WaveDivider fillColor="#0d1e3a" className="hidden md:block -mt-1" />
      <WaveDivider fillColor="#f0f7ff" className="md:hidden -mt-1" />
      
      <FAQSection />
      
      <WaveDivider fillColor="#0a1628" className="hidden md:block -mt-1" flip />
      <WaveDivider fillColor="#ffffff" className="md:hidden -mt-1" flip />
      
      <ContactSection />
      
      <WaveDivider fillColor="#0d1e3a" className="hidden md:block -mt-1" />
      <WaveDivider fillColor="#e5e7eb" className="md:hidden -mt-1" />
      
      <GoogleMap />
      <Footer />
    </main>
  );
};

export default Index;

