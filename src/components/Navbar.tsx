
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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div
        className={`container mx-auto transition-all duration-500 rounded-full ${
          isScrolled
            ? "backdrop-blur-2xl bg-background/80 shadow-2xl shadow-primary/10 border border-border/50"
            : "backdrop-blur-xl bg-background/40 border border-border/30"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <a href="/" className="flex items-center relative z-10 transition-transform hover:scale-105">
            {getSetting('logo_url', 'ar') && (
              <img 
                src={getSetting('logo_url', 'ar')} 
                alt="علو Logo" 
                className="h-12 w-auto object-contain"
              />
            )}
          </a>

          {/* Desktop Menu */}
          <nav
            className={`hidden lg:flex items-center ${
              dir === "rtl" ? "space-x-reverse" : ""
            } space-x-1`}
          >
            {[
              { href: "#", label: t("home") },
              { href: "#services", label: t("services") },
              { href: "#about", label: t("about") },
              { href: "#partners", label: t("partners.title") },
              { href: "#portfolio", label: t("portfolio.title") },
              { href: "#faq", label: t("faq.title") },
              { href: "#contact", label: t("contact") }
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-300 relative group"
              >
                {item.label}
                <span className="absolute inset-x-4 bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className={`flex items-center ${dir === "rtl" ? "space-x-reverse" : ""} space-x-2`}>
            <LanguageSwitcher />
            <Button
              variant="default"
              size="sm"
              className="hidden lg:inline-flex rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
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
              className="lg:hidden rounded-full"
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
            className="absolute inset-0 bg-background/95 backdrop-blur-2xl animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative container mx-auto px-4 pt-8 animate-slide-in-right">
            <nav className="flex flex-col space-y-2">
              {[
                { href: "#", label: t("home") },
                { href: "#services", label: t("services") },
                { href: "#about", label: t("about") },
                { href: "#partners", label: t("partners.title") },
                { href: "#portfolio", label: t("portfolio.title") },
                { href: "#faq", label: t("faq.title") },
                { href: "#contact", label: t("contact") }
              ].map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium py-4 px-6 rounded-2xl hover:bg-primary/10 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button 
                variant="default"
                size="lg"
                className="w-full mt-6 rounded-full shadow-lg shadow-primary/20"
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
