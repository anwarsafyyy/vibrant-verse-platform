
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { useSiteContent } from "@/hooks/useSiteContent";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, dir } = useLanguage();
  const { theme } = useTheme();
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            {getSetting('logo_url', 'ar') && (
              <img 
                src={getSetting('logo_url', 'ar')} 
                alt="علو Logo" 
                className="h-10 w-auto"
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
          <a href="#" className="font-medium hover:text-olu-purple-dark transition-colors">
            {t("home")}
          </a>
          <a href="#services" className="font-medium hover:text-olu-purple-dark transition-colors">
            {t("services")}
          </a>
          <a href="#about" className="font-medium hover:text-olu-purple-dark transition-colors">
            {t("about")}
          </a>
          <a href="#portfolio" className="font-medium hover:text-olu-purple-dark transition-colors">
            {t("portfolio.title")}
          </a>
          <a href="#partners" className="font-medium hover:text-olu-purple-dark transition-colors">
            {t("partners.title")}
          </a>
          <a href="#faq" className="font-medium hover:text-olu-purple-dark transition-colors">
            {t("faq.title")}
          </a>
          <a href="#contact" className="font-medium hover:text-olu-purple-dark transition-colors">
            {t("contact")}
          </a>
        </nav>

        <div className={`flex items-center ${dir === "rtl" ? "space-x-reverse" : ""} space-x-2`}>
          <LanguageSwitcher />
          <ThemeToggle />
          <Button 
            variant="light"
            size="pill" 
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
        <div className="md:hidden h-screen w-full fixed inset-0 top-16 bg-background animate-fade-in z-40">
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
              href="#portfolio"
              className="text-lg font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("portfolio.title")}
            </a>
            <a
              href="#partners"
              className="text-lg font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("partners.title")}
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
