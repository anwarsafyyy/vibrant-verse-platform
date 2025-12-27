
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
    <header className="fixed top-0 left-0 right-0 z-50 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center -gap-2">
          {/* Logo - Right Side (Before Navbar) */}
          <a href="/" className="flex items-center flex-shrink-0">
            {getSetting('logo_url', 'ar') ? (
              <img 
                src={getSetting('logo_url', 'ar')} 
                alt="Logo" 
                className="h-24 lg:h-32 w-auto"
              />
            ) : (
              <img 
                src="/olu-logo.png" 
                alt="Logo" 
                className="h-24 lg:h-32 w-auto"
              />
            )}
          </a>

          {/* Navbar */}
          <div className={`flex-1 flex items-center justify-between transition-all duration-500 -mr-4 ${
            isScrolled 
              ? 'bg-[#0a1628]/95 backdrop-blur-xl shadow-lg shadow-black/30 rounded-xl px-4 py-2 border border-white/10' 
              : 'bg-[#0a1628]/80 backdrop-blur-md rounded-xl px-4 py-2 shadow-md border border-white/5'
          }`}>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-bold text-white/80 hover:text-white rounded-xl transition-all duration-300 hover:bg-white/10"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Title - Only visible on mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <span className="text-sm font-bold text-white/80">
                {language === 'ar' ? 'علو للتقنية' : 'OLU Tech'}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              
              {/* CTA Button - Desktop */}
              <a 
                href="#contact"
                className="hidden lg:flex items-center px-6 py-2.5 bg-blue-500 text-white rounded-xl font-bold text-sm hover:bg-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
              >
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </a>
              
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-xl text-white hover:bg-white/10 border border-white/20"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Slide from top */}
      <div 
        className={`lg:hidden fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-out ${
          mobileMenuOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-gradient-to-b from-white via-white to-white/95 backdrop-blur-xl shadow-2xl pt-28 pb-6 px-4">
          <nav className="flex flex-col gap-1 max-w-md mx-auto">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-base font-bold py-3 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300 text-right transform ${
                  mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: mobileMenuOpen ? `${index * 75}ms` : '0ms' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          {/* Mobile CTA */}
          <div className="max-w-md mx-auto mt-4 px-4">
            <a 
              href="#contact"
              className={`flex items-center justify-center px-6 py-3 bg-foreground text-background rounded-xl font-bold text-base hover:bg-foreground/90 transition-all duration-500 transform ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: mobileMenuOpen ? `${navItems.length * 75}ms` : '0ms' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </a>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Navbar;
