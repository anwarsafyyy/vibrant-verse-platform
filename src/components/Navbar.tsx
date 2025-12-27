
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
              ? 'bg-gradient-to-r from-blue-950/95 via-blue-900/95 to-blue-950/95 backdrop-blur-xl shadow-xl shadow-blue-900/40 rounded-2xl px-6 py-3 border border-blue-400/20' 
              : 'bg-gradient-to-r from-blue-950/80 via-blue-900/80 to-blue-950/80 backdrop-blur-md rounded-2xl px-6 py-3 shadow-lg border border-blue-500/10'
          }`}>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2.5 text-sm font-bold text-blue-100/90 hover:text-white rounded-xl transition-all duration-300 hover:bg-blue-500/20 group"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-300 group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
                </a>
              ))}
            </div>

            {/* Mobile Title - Only visible on mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <span className="text-sm font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                {language === 'ar' ? 'علو للتقنية' : 'OLU Tech'}
              </span>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-300 animate-pulse shadow-lg shadow-blue-400/50"></div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              
              {/* CTA Button - Desktop */}
              <a 
                href="#contact"
                className="hidden lg:flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl font-bold text-sm hover:from-blue-400 hover:to-blue-300 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 border border-blue-300/20"
              >
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </a>
              
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-xl text-blue-100 hover:text-white hover:bg-blue-500/30 border border-blue-400/30 transition-all duration-300"
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
        <div className="bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950/98 backdrop-blur-xl shadow-2xl shadow-blue-900/50 pt-28 pb-6 px-4 border-b border-blue-400/20">
          <nav className="flex flex-col gap-2 max-w-md mx-auto">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-base font-bold py-3 px-5 text-blue-100 hover:text-white hover:bg-blue-500/30 rounded-xl transition-all duration-300 text-right transform border border-transparent hover:border-blue-400/20 ${
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
              className={`flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl font-bold text-base hover:from-blue-400 hover:to-blue-300 transition-all duration-500 transform shadow-lg shadow-blue-500/30 border border-blue-300/20 ${
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
        className={`lg:hidden fixed inset-0 bg-blue-950/40 backdrop-blur-sm z-30 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Navbar;
