
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
    { href: "#", label: language === 'ar' ? 'الصفحة الرئيسية' : 'Home' },
    { href: "#about", label: language === 'ar' ? 'من نحن' : 'About Us' },
    { href: "#services", label: language === 'ar' ? 'اعمال الشركة' : 'Our Services' },
    { href: "#portfolio", label: language === 'ar' ? 'منتجات الشركة' : 'Products' },
    { href: "#partners", label: t("partners.title") },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto">
        <div className={`flex items-center justify-between px-4 lg:px-8 py-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          
          {/* Logo - Right side for RTL (like 2P) */}
          <a href="/" className="flex items-center gap-3 group">
            {getSetting('logo_url', 'ar') && (
              <img 
                src={getSetting('logo_url', 'ar')} 
                alt="Logo" 
                className="h-10 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            )}
          </a>

          {/* Desktop Menu - Center/Left for RTL */}
          <nav className={`hidden lg:flex items-center gap-1 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-bold transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-foreground/70 hover:text-primary' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Actions - Left side for RTL */}
          <div className={`flex items-center gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden ${isScrolled ? 'text-foreground' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 bg-background/98 backdrop-blur-xl">
          <div className="container mx-auto px-4 pt-8">
            <nav className={`flex flex-col gap-2 ${dir === 'rtl' ? 'items-end' : 'items-start'}`}>
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-lg font-bold py-3 px-4 text-foreground hover:text-primary transition-colors opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold opacity-0 animate-fade-in"
                style={{ animationDelay: `${navItems.length * 50}ms` }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("contact")}
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
