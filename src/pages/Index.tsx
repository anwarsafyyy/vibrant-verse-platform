
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
        gradientColors={['#60a5fa', '#93c5fd', '#3b82f6']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        gradientId="wave1m" 
        gradientColors={['#dbeafe', '#bfdbfe', '#93c5fd']} 
      />
      
      <AboutSection />
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        flip 
        gradientId="wave2" 
        gradientColors={['#3b82f6', '#60a5fa', '#93c5fd']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        flip 
        gradientId="wave2m" 
        gradientColors={['#93c5fd', '#bfdbfe', '#dbeafe']} 
      />
      
      <ServicesSection />
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        gradientId="wave3" 
        gradientColors={['#60a5fa', '#3b82f6', '#93c5fd']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        gradientId="wave3m" 
        gradientColors={['#bfdbfe', '#93c5fd', '#60a5fa']} 
      />
      
      <PortfolioSection />
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        flip 
        gradientId="wave4" 
        gradientColors={['#93c5fd', '#60a5fa', '#3b82f6']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        flip 
        gradientId="wave4m" 
        gradientColors={['#60a5fa', '#93c5fd', '#bfdbfe']} 
      />
      
      <PartnersSection />
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        gradientId="wave5" 
        gradientColors={['#60a5fa', '#93c5fd', '#3b82f6']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        gradientId="wave5m" 
        gradientColors={['#dbeafe', '#bfdbfe', '#93c5fd']} 
      />
      
      <FAQSection />
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        flip 
        gradientId="wave6" 
        gradientColors={['#3b82f6', '#60a5fa', '#93c5fd']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        flip 
        gradientId="wave6m" 
        gradientColors={['#93c5fd', '#bfdbfe', '#dbeafe']} 
      />
      
      <ContactSection />
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        gradientId="wave7" 
        gradientColors={['#60a5fa', '#3b82f6', '#93c5fd']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        gradientId="wave7m" 
        gradientColors={['#e5e7eb', '#d1d5db', '#9ca3af']} 
      />
      
      <GoogleMap />
      <Footer />
    </main>
  );
};

export default Index;

