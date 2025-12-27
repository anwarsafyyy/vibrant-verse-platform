
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
    <main className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Navbar />
      <HeroSection />
      
      {/* Divider before About */}
      <SCurveDivider 
        fillColor="hsl(var(--background))" 
        bgColor="hsl(220 20% 97%)"
        flip
      />
      
      <AboutSection />
      
      {/* Divider after About */}
      <SCurveDivider 
        fillColor="hsl(var(--card))" 
        bgColor="hsl(var(--background))"
        flip
      />
      
      <div className="bg-card">
        <ServicesSection />
      </div>
      
      {/* Divider after Services */}
      <SCurveDivider 
        fillColor="hsl(var(--background))" 
        bgColor="hsl(var(--card))"
      />
      
      <PortfolioSection />
      
      {/* Divider after Portfolio */}
      <SCurveDivider 
        fillColor="hsl(var(--card))" 
        bgColor="hsl(var(--background))"
        flip
      />
      
      <div className="bg-card">
        <PartnersSection />
      </div>
      
      {/* Divider after Partners */}
      <SCurveDivider 
        fillColor="hsl(var(--background))" 
        bgColor="hsl(var(--card))"
      />
      
      <FAQSection />
      
      {/* Divider after FAQ */}
      <SCurveDivider 
        fillColor="hsl(var(--card))" 
        bgColor="hsl(var(--background))"
        flip
      />
      
      <div className="bg-card">
        <ContactSection />
      </div>
      
      {/* Divider before Map */}
      <SCurveDivider 
        fillColor="hsl(var(--muted))" 
        bgColor="hsl(var(--card))"
      />
      
      <GoogleMap />
      <Footer />
    </main>
  );
};

export default Index;

