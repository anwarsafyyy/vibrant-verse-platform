import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Footer: React.FC = () => {
  const { t, dir } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-olu-gold to-olu-gold/80 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className={`${dir === "rtl" ? "text-right" : "text-left"}`}>
            <img src="/public/alo.png" alt="Olu Logo" className="h-10 w-auto" />
            <p className="opacity-80">
              {dir === "rtl" 
                ? "نبني مستقبلاً رقمياً أفضل من خلال حلول تقنية مبتكرة." 
                : "Building a better digital future through innovative tech solutions."}
            </p>
          </div>
          
          <div className={`${dir === "rtl" ? "text-right" : "text-left"}`}>
            <h4 className="text-lg font-semibold mb-4">
              {dir === "rtl" ? "صفحات مهمه" : "Important Pages"}
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">{t("home")}</a></li>
              <li><a href="#about" className="opacity-80 hover:opacity-100 transition-opacity">{t("about")}</a></li>
              <li><a href="#services" className="opacity-80 hover:opacity-100 transition-opacity">{t("services")}</a></li>
              <li><a href="#contact" className="opacity-80 hover:opacity-100 transition-opacity">{t("contact")}</a></li>
            </ul>
          </div>
          
          <div className={`${dir === "rtl" ? "text-right" : "text-left"}`}>
            <h4 className="text-lg font-semibold mb-4">
              {dir === "rtl" ? "تواصل معانا" : "Contact Us"}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center opacity-80">
                <MapPin className="h-4 w-4 mr-2 shrink-0" />
                <span>{dir === "rtl" ? "المملكة العربية السعودية جازان" : "Jazan, Saudi Arabia"}</span>
              </li>
              <li className="flex items-center opacity-80">
                <Phone className="h-4 w-4 mr-2 shrink-0" />
                <span>+966 50 869 4899</span>
              </li>
              <li className="flex items-center opacity-80">
                <Mail className="h-4 w-4 mr-2 shrink-0" />
                <span>info@olu-it.com</span>
              </li>
              <li className="flex items-center opacity-80">
                <Clock className="h-4 w-4 mr-2 shrink-0" />
                <span>09am - 05pm Mon-Sat</span>
              </li>
            </ul>
          </div>
          
          <div className={`${dir === "rtl" ? "text-right" : "text-left"}`}>
            <h4 className="text-lg font-semibold mb-4">
              {dir === "rtl" ? "تابعنا" : "Follow Us"}
            </h4>
            <div className={`flex space-x-4 ${dir === "rtl" ? "justify-end space-x-reverse" : "justify-start"}`}>
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <div className="mt-6">
              <p className="text-sm opacity-80">
                {dir === "rtl" 
                  ? "نحن شركة متخصصة في تطوير المواقع، تحسين محركات البحث، والتسويق الرقمي، نساعدك على النجاح في العالم الرقمي بحلول مبتكرة وتقنيات متقدمة. 🚀" 
                  : "We are a company specialized in website development, SEO, and digital marketing, helping you succeed in the digital world with innovative solutions and advanced technologies. 🚀"}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="opacity-80">© {currentYear} علو (Olu-IT). {t("footer.copyright")}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
