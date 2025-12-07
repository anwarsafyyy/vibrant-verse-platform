
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
      setIsScrolled(window.scrollY > 50);
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
    { href: "#contact", label: language === 'ar' ? 'تواصل معنا' : 'Contact Us' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-xl shadow-lg shadow-black/5 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            {getSetting('logo_url', 'ar') ? (
              <img 
                src={getSetting('logo_url', 'ar')} 
                alt="Logo" 
                className={`transition-all duration-300 group-hover:scale-105 ${
                  isScrolled ? 'h-10' : 'h-12'
                }`}
              />
            ) : (
              <img 
                src="/olu-logo.png" 
                alt="Logo" 
                className={`transition-all duration-300 group-hover:scale-105 ${
                  isScrolled ? 'h-10' : 'h-12'
                }`}
              />
            )}
          </a>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center">
            <div className={`flex items-center gap-1 ${
              isScrolled 
                ? 'bg-muted/50 backdrop-blur-sm rounded-full px-2 py-1' 
                : ''
            }`}>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-bold rounded-full transition-all duration-300 ${
                    isScrolled 
                      ? 'text-foreground/70 hover:text-primary hover:bg-primary/10' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Left Actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden rounded-full ${
                isScrolled 
                  ? 'text-foreground hover:bg-muted' 
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-x-0 top-16 transition-all duration-500 ${
        mobileMenuOpen 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-background/98 backdrop-blur-xl border-b border-border shadow-xl">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col gap-2 items-end">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-lg font-bold py-3 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all w-full"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
