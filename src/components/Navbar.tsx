
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, dir, language } = useLanguage();
  const { getSetting } = useSiteContent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#", label: t("home") },
    { href: "#services", label: t("services") },
    { href: "#about", label: t("about") },
    { href: "#portfolio", label: t("portfolio.title") },
    { href: "#partners", label: t("partners.title") },
    { href: "#faq", label: t("faq.title") },
    { href: "#contact", label: t("contact") }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div
        className={`container mx-auto transition-all duration-500 rounded-full ${
          isScrolled
            ? "backdrop-blur-2xl bg-background/95 shadow-lg border border-border/50"
            : "backdrop-blur-xl bg-background/80 border border-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <a href="/" className="flex items-center relative z-10 group">
            {getSetting('logo_url', 'ar') && (
              <img 
                src={getSetting('logo_url', 'ar')} 
                alt="Logo" 
                className="h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105"
              />
            )}
          </a>

          {/* Desktop Menu */}
          <nav className={`hidden lg:flex items-center ${dir === "rtl" ? "space-x-reverse" : ""} space-x-1`}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-full text-sm font-bold text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-300 relative"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className={`flex items-center ${dir === "rtl" ? "space-x-reverse" : ""} space-x-3`}>
            <LanguageSwitcher />
            <Button
              variant="default"
              size="sm"
              className="hidden lg:inline-flex rounded-full px-6 bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 font-bold"
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
              className="lg:hidden rounded-full hover:bg-primary/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 z-40">
          <div 
            className="absolute inset-0 bg-background/98 backdrop-blur-2xl"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative container mx-auto px-4 pt-8">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-lg font-bold py-4 px-6 rounded-2xl hover:bg-primary/5 transition-all duration-300 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button 
                variant="default"
                size="lg"
                className="w-full mt-6 rounded-full bg-gradient-to-r from-primary to-accent opacity-0 animate-fade-in font-bold"
                style={{ animationDelay: `${navItems.length * 50}ms` }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
              >
                {t("contact")}
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
