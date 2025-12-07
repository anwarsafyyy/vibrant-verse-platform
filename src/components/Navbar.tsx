
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
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

  const navItems = [
    { href: "#", label: t("home") },
    { href: "#services", label: t("services") },
    { href: "#about", label: t("about") },
    { href: "#partners", label: t("partners.title") },
    { href: "#portfolio", label: t("portfolio.title") },
    { href: "#faq", label: t("faq.title") },
    { href: "#contact", label: t("contact") }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div
        className={`container mx-auto transition-all duration-700 rounded-full ${
          isScrolled
            ? "backdrop-blur-3xl bg-card/90 shadow-xl shadow-primary/10 border border-primary/10"
            : "backdrop-blur-xl bg-card/50 border border-border/20"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <a href="/" className="flex items-center relative z-10 group">
            {getSetting('logo_url', 'ar') && (
              <img 
                src={getSetting('logo_url', 'ar')} 
                alt="علو Logo" 
                className="h-12 w-auto object-contain transition-all duration-500 group-hover:scale-110"
              />
            )}
          </a>

          {/* Desktop Menu */}
          <nav
            className={`hidden lg:flex items-center ${
              dir === "rtl" ? "space-x-reverse" : ""
            } space-x-1`}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-full text-sm font-semibold text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-300 relative group"
              >
                {item.label}
                <span className="absolute inset-x-2 -bottom-0 h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-center" />
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className={`flex items-center ${dir === "rtl" ? "space-x-reverse" : ""} space-x-3`}>
            <LanguageSwitcher />
            <Button
              variant="default"
              size="sm"
              className="hidden lg:inline-flex rounded-full px-6 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 border-0"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Sparkles className="h-4 w-4 mr-1" />
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
            className="absolute inset-0 bg-background/98 backdrop-blur-3xl"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative container mx-auto px-4 pt-8">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-lg font-semibold py-4 px-6 rounded-2xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 80}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button 
                variant="default"
                size="lg"
                className="w-full mt-6 rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] shadow-lg shadow-primary/30 opacity-0 animate-fade-in"
                style={{ animationDelay: `${navItems.length * 80}ms` }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
              >
                <Sparkles className="h-4 w-4 mr-1" />
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
