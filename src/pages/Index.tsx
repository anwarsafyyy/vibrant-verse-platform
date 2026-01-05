
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
import CompanyNewsSection from "@/components/CompanyNewsSection";
import { useDynamicHead } from "@/hooks/useDynamicHead";
import { WaveDivider } from "@/components/SectionDivider";

const Index = () => {
  useDynamicHead();
  
  return (
    <main className="min-h-screen relative bg-white md:bg-background md:bg-gradient-hero">
      <Navbar />
      <HeroSection />
      
      <WaveDivider 
        className="-mt-1" 
        gradientId="wave1" 
        gradientColors={['#c4b5fd', '#a78bfa', '#8b5cf6']} 
      />
      
      <AboutSection />
      
      <WaveDivider 
        className="-mt-1" 
        flip 
        gradientId="wave2" 
        gradientColors={['#8b5cf6', '#a78bfa', '#c4b5fd']} 
      />
      
      <ServicesSection />
      
      <WaveDivider 
        className="-mt-1" 
        gradientId="wave3" 
        gradientColors={['#a78bfa', '#8b5cf6', '#c4b5fd']} 
      />
      
      <PortfolioSection />
      
      <WaveDivider 
        className="-mt-1" 
        flip 
        gradientId="wave4" 
        gradientColors={['#c4b5fd', '#a78bfa', '#8b5cf6']} 
      />
      
      <CompanyNewsSection />
      
      <WaveDivider 
        className="-mt-1" 
        gradientId="wave4b" 
        gradientColors={['#a78bfa', '#8b5cf6', '#c4b5fd']} 
      />
      
      <PartnersSection />
      
      <WaveDivider 
        className="-mt-1" 
        flip 
        gradientId="wave5" 
        gradientColors={['#a78bfa', '#c4b5fd', '#8b5cf6']} 
      />
      
      <FAQSection />
      
      <WaveDivider 
        className="-mt-1" 
        gradientId="wave6" 
        gradientColors={['#8b5cf6', '#a78bfa', '#c4b5fd']} 
      />
      
      <ContactSection />
      
      <WaveDivider 
        className="-mt-1" 
        flip 
        gradientId="wave7" 
        gradientColors={['#a78bfa', '#8b5cf6', '#c4b5fd']} 
      />
      
      <GoogleMap />
      <Footer />
    </main>
  );
};

export default Index;

