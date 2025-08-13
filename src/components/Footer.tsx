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
      case 'x':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
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
      case 'whatsapp':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
          </svg>
        );
      case 'tiktok':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
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
    <footer className="bg-gradient-to-r from-gray-400 to-gray-500 text-white">
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
                        className="h-8 w-auto object-contain"
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
          <p className="opacity-80 text-lg">
            {getFooterContent('copyright_text_ar', language as "ar" | "en") || 
              (dir === "rtl" 
                ? "جميع الحقوق محفوظة © 2025 شركة علو لتقنية المعلومات. تطوير بواسطة فريق علو"
                : `© ${currentYear} Olu Information Technology Company. All rights reserved. Developed by Olu Team`)}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
