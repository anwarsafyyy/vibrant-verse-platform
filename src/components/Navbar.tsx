
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
    { href: "#services", label: language === 'ar' ? 'خدماتنا' : 'Our Services' },
    { href: "#portfolio", label: language === 'ar' ? 'منتجاتنا' : 'Our Products' },
    { href: "#partners", label: language === 'ar' ? 'شركاؤنا' : 'Our Partners' },
    { href: "#contact", label: language === 'ar' ? 'تواصل معنا' : 'Contact Us' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4">
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/10 rounded-2xl px-6 py-3' 
            : 'bg-white/80 backdrop-blur-md rounded-2xl px-6 py-3 shadow-md'
        }`}>
          
          {/* Desktop Menu - Right Side */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-bold text-foreground/70 hover:text-primary rounded-xl transition-all duration-300 hover:bg-primary/5"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Logo - Center */}
          <a href="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
            {getSetting('logo_url', 'ar') ? (
              <img 
                src={getSetting('logo_url', 'ar')} 
                alt="Logo" 
                className="h-10"
              />
            ) : (
              <img 
                src="/olu-logo.png" 
                alt="Logo" 
                className="h-10"
              />
            )}
          </a>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            
            {/* CTA Button - Desktop */}
            <a 
              href="#contact"
              className="hidden lg:flex items-center px-6 py-2.5 bg-foreground text-background rounded-xl font-bold text-sm hover:bg-foreground/90 transition-all duration-300 hover:shadow-lg"
            >
              {language === 'ar' ? 'احصل الآن' : 'Get Started'}
            </a>
            
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-xl text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-x-4 top-20 transition-all duration-500 ${
        mobileMenuOpen 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-white/98 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl overflow-hidden">
          <div className="p-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-base font-bold py-3 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all text-right"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            
            {/* Mobile CTA */}
            <a 
              href="#contact"
              className="flex items-center justify-center mt-4 px-6 py-3 bg-foreground text-background rounded-xl font-bold text-base hover:bg-foreground/90 transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {language === 'ar' ? 'احصل الآن' : 'Get Started'}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
