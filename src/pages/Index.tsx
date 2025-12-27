
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
        gradientColors={['#1e3a5f', '#2563eb', '#3b82f6']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        gradientId="wave1m" 
        gradientColors={['#bfdbfe', '#93c5fd', '#60a5fa']} 
      />
      
      <AboutSection />
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        flip 
        gradientId="wave2" 
        gradientColors={['#3b82f6', '#2563eb', '#1e3a5f']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        flip 
        gradientId="wave2m" 
        gradientColors={['#60a5fa', '#93c5fd', '#bfdbfe']} 
      />
      
      <ServicesSection />
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        gradientId="wave3" 
        gradientColors={['#1e40af', '#3b82f6', '#60a5fa']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        gradientId="wave3m" 
        gradientColors={['#93c5fd', '#60a5fa', '#3b82f6']} 
      />
      
      <PortfolioSection />
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        flip 
        gradientId="wave4" 
        gradientColors={['#60a5fa', '#3b82f6', '#1e40af']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        flip 
        gradientId="wave4m" 
        gradientColors={['#3b82f6', '#60a5fa', '#93c5fd']} 
      />
      
      <PartnersSection />
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        gradientId="wave5" 
        gradientColors={['#1e3a5f', '#2563eb', '#3b82f6']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        gradientId="wave5m" 
        gradientColors={['#bfdbfe', '#93c5fd', '#60a5fa']} 
      />
      
      <FAQSection />
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        flip 
        gradientId="wave6" 
        gradientColors={['#3b82f6', '#2563eb', '#1e3a5f']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        flip 
        gradientId="wave6m" 
        gradientColors={['#60a5fa', '#93c5fd', '#bfdbfe']} 
      />
      
      <ContactSection />
      
      <WaveDivider 
        className="hidden md:block -mt-1" 
        gradientId="wave7" 
        gradientColors={['#1e40af', '#2563eb', '#3b82f6']} 
      />
      <WaveDivider 
        className="md:hidden -mt-1" 
        gradientId="wave7m" 
        gradientColors={['#d1d5db', '#9ca3af', '#6b7280']} 
      />
      
      <GoogleMap />
      <Footer />
    </main>
  );
};

export default Index;

