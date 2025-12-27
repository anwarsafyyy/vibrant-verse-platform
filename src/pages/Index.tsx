
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
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        gradientId="wave1" 
        gradientColors={['#0a1628', '#1e3a5f', '#0d1e3a']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        gradientId="wave1m" 
        gradientColors={['#dbeafe', '#bfdbfe', '#e0f2fe']} 
      />
      
      <AboutSection />
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        flip 
        gradientId="wave2" 
        gradientColors={['#0d1e3a', '#1e3a5f', '#0a1628']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        flip 
        gradientId="wave2m" 
        gradientColors={['#e0f2fe', '#bfdbfe', '#f0f9ff']} 
      />
      
      <ServicesSection />
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        gradientId="wave3" 
        gradientColors={['#0a1628', '#1e4976', '#0d1e3a']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        gradientId="wave3m" 
        gradientColors={['#dbeafe', '#93c5fd', '#e0f2fe']} 
      />
      
      <PortfolioSection />
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        flip 
        gradientId="wave4" 
        gradientColors={['#0d1e3a', '#1e4976', '#0a1628']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        flip 
        gradientId="wave4m" 
        gradientColors={['#e0f2fe', '#93c5fd', '#f0f9ff']} 
      />
      
      <PartnersSection />
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        gradientId="wave5" 
        gradientColors={['#0a1628', '#1e3a5f', '#0d1e3a']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        gradientId="wave5m" 
        gradientColors={['#dbeafe', '#bfdbfe', '#e0f2fe']} 
      />
      
      <FAQSection />
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        flip 
        gradientId="wave6" 
        gradientColors={['#0d1e3a', '#1e3a5f', '#0a1628']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        flip 
        gradientId="wave6m" 
        gradientColors={['#e0f2fe', '#bfdbfe', '#f0f9ff']} 
      />
      
      <ContactSection />
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        gradientId="wave7" 
        gradientColors={['#0a1628', '#0d2847', '#0d1e3a']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        gradientId="wave7m" 
        gradientColors={['#e5e7eb', '#d1d5db', '#f3f4f6']} 
      />
      
      <GoogleMap />
      <Footer />
    </main>
  );
};

export default Index;

