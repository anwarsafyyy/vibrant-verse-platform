import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  is_active: boolean;
  order_index: number;
}

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  order_index: number;
}

const Footer: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const { getFooterContent, getSetting } = useSiteContent();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchSocialLinks();
    fetchPartners();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });
        
      if (error) {
        console.error("Error fetching social links:", error);
        return;
      }
      
      setSocialLinks(data || []);
    } catch (error) {
      console.error("Failed to fetch social links:", error);
    }
  };

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('order_index', { ascending: true });
        
      if (error) {
        console.error("Error fetching partners:", error);
        return;
      }
      
      setPartners(data || []);
    } catch (error) {
      console.error("Failed to fetch partners:", error);
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'facebook':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        );
      case 'twitter':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.02.43c-.533.207-.97.482-1.411.923-.441.441-.716.878-.923 1.411-.226.5-.348 1.074-.382 2.021C2.271 5.833 2.258 6.24 2.258 9.861v4.278c0 3.621.013 4.028.048 4.976.034.947.156 1.521.382 2.021.207.533.482.97.923 1.411.441.441.878.716 1.411.923.5.226 1.074.348 2.021.382.948.035 1.355.048 4.976.048h4.278c3.621 0 4.028-.013 4.976-.048.947-.034 1.521-.156 2.021-.382.533-.207.97-.482 1.411-.923.441-.441.716-.878.923-1.411.226-.5.348-1.074.382-2.021.035-.948.048-1.355.048-4.976V9.861c0-3.621-.013-4.028-.048-4.976-.034-.947-.156-1.521-.382-2.021-.207-.533-.482-.97-.923-1.411-.441-.441-.878-.716-1.411-.923-.5-.226-1.074-.348-2.021-.382C16.028.013 15.621 0 12.017 0zM12 5.838A6.162 6.162 0 1018.162 12 6.162 6.162 0 0012 5.838zm0 10.162A3.999 3.999 0 1116 12a4.004 4.004 0 01-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.441 1.441 0 012.88 0z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
          </svg>
        );
    }
  };

  return (
    <footer className="bg-gradient-to-r from-olu-gold to-olu-gold/80 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className={`${dir === "rtl" ? "text-right" : "text-left"}`}>
            <img 
              src={getSetting('logo_url', language as "ar" | "en") || "/alo.png"} 
              alt="Olu Logo" 
              className="h-10 w-auto" 
            />
            <p className="opacity-80">
              {getFooterContent('company_description_ar', language as "ar" | "en") || 
                (dir === "rtl" 
                  ? "نبني مستقبلاً رقمياً أفضل من خلال حلول تقنية مبتكرة." 
                  : "Building a better digital future through innovative tech solutions.")}
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
                <span>
                  {getFooterContent('address_ar', language as "ar" | "en") || 
                    (dir === "rtl" ? "المملكة العربية السعودية جازان" : "Jazan, Saudi Arabia")}
                </span>
              </li>
              <li className="flex items-center opacity-80">
                <Phone className="h-4 w-4 mr-2 shrink-0" />
                <span>{getFooterContent('phone', language as "ar" | "en") || "+966 50 869 4899"}</span>
              </li>
              <li className="flex items-center opacity-80">
                <Mail className="h-4 w-4 mr-2 shrink-0" />
                <span>{getFooterContent('email', language as "ar" | "en") || "info@olu-it.com"}</span>
              </li>
              <li className="flex items-center opacity-80">
                <Clock className="h-4 w-4 mr-2 shrink-0" />
                <span>
                  {getFooterContent('working_hours_ar', language as "ar" | "en") || "09am - 05pm Mon-Sat"}
                </span>
              </li>
            </ul>
          </div>
          
          <div className={`${dir === "rtl" ? "text-right" : "text-left"}`}>
            <h4 className="text-lg font-semibold mb-4">
              {dir === "rtl" ? "تابعنا" : "Follow Us"}
            </h4>
            <div className={`flex space-x-4 ${dir === "rtl" ? "justify-end space-x-reverse" : "justify-start"} mb-6`}>
              {socialLinks.map((link) => (
                <a 
                  key={link.id}
                  href={link.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <span className="sr-only">{link.platform}</span>
                  {getSocialIcon(link.icon)}
                </a>
              ))}
            </div>
            
            {partners.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-4">
                  {dir === "rtl" ? "شركاؤنا" : "Our Partners"}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {partners.slice(0, 4).map((partner) => (
                    <div key={partner.id} className="bg-white/10 rounded-lg p-2 flex items-center justify-center">
                      <img 
                        src={partner.logo_url} 
                        alt={partner.name}
                        className="h-8 w-auto object-contain filter brightness-0 invert"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
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
          <p className="opacity-80">
            {getFooterContent('copyright_text_ar', language as "ar" | "en") || 
              `© ${currentYear} علو (Olu-IT). ${t("footer.copyright")}.`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
