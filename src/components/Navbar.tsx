
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, dir } = useLanguage();
  const { getSetting } = useSiteContent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-2xl bg-background/60 shadow-lg shadow-primary/5 border-b border-border/50 py-3 md:py-4"
          : "backdrop-blur-md bg-background/30 py-4 md:py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            {getSetting('logo_url', 'ar') && (
              <img 
                src={getSetting('logo_url', 'ar')} 
                alt="علو Logo" 
                className="h-16 w-auto object-contain"
              />
            )}
          </a>
        </div>

        {/* Desktop Menu */}
        <nav
          className={`hidden md:flex items-center space-x-6 ${
            dir === "rtl" ? "space-x-reverse" : ""
          }`}
        >
          <a href="#" className="font-medium hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">
            {t("home")}
          </a>
          <a href="#services" className="font-medium hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">
            {t("services")}
          </a>
           <a href="#about" className="font-medium hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">
             {t("about")}
           </a>
           <a href="#partners" className="font-medium hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">
             {t("partners.title")}
           </a>
           <a href="#portfolio" className="font-medium hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">
             {t("portfolio.title")}
           </a>
          <a href="#faq" className="font-medium hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">
            {t("faq.title")}
          </a>
          <a href="#contact" className="font-medium hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">
            {t("contact")}
          </a>
        </nav>

        <div className={`flex items-center ${dir === "rtl" ? "space-x-reverse" : ""} space-x-2`}>
          <LanguageSwitcher />
          <Button
            variant="light"
            size="default" 
            className="hidden md:inline-flex"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t("contact")}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden h-screen w-full fixed inset-0 top-16 backdrop-blur-2xl bg-background/95 animate-fade-in z-40">
          <div className="container mx-auto px-4 py-8 flex flex-col space-y-6 text-center">
            <a
              href="#"
              className="text-lg font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("home")}
            </a>
            <a
              href="#services"
              className="text-lg font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("services")}
            </a>
             <a
               href="#about"
               className="text-lg font-medium py-2"
               onClick={() => setMobileMenuOpen(false)}
             >
               {t("about")}
             </a>
             <a
               href="#partners"
               className="text-lg font-medium py-2"
               onClick={() => setMobileMenuOpen(false)}
             >
               {t("partners.title")}
             </a>
             <a
               href="#portfolio"
               className="text-lg font-medium py-2"
               onClick={() => setMobileMenuOpen(false)}
             >
               {t("portfolio.title")}
             </a>
            <a
              href="#faq"
              className="text-lg font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("faq.title")}
            </a>
            <a
              href="#contact"
              className="text-lg font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("contact")}
            </a>
            <Button 
              variant="light" 
              size="pill" 
              className="w-full mt-4"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
            >
              {t("contact")}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
