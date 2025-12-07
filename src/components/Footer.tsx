
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { getCollection } from "@/lib/firebaseHelpers";

interface SocialLink { id: string; platform: string; url: string; icon: string; is_active: boolean; order_index: number; }

const Footer: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const { getFooterContent, getSetting } = useSiteContent();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    getCollection<SocialLink>('social_links', [{ field: 'is_active', operator: '==', value: true }], 'order_index', 'asc')
      .then(data => setSocialLinks(data || []))
      .catch(console.error);
  }, []);

  const getSocialIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      facebook: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>,
      twitter: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>,
      linkedin: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
      instagram: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
      whatsapp: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/></svg>,
    };
    return icons[iconName.toLowerCase()] || <span className="w-5 h-5 rounded-full bg-white/50" />;
  };

  return (
    <footer className="bg-gradient-purple text-white border-t border-white/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className={dir === "rtl" ? "text-right" : "text-left"}>
            <p className="opacity-80 leading-relaxed">
              {getFooterContent('company_description_ar', language as "ar" | "en") || (dir === "rtl" ? "نبني مستقبلاً رقمياً أفضل من خلال حلول تقنية مبتكرة." : "Building a better digital future through innovative tech solutions.")}
            </p>
          </div>
          
          <div className={dir === "rtl" ? "text-right" : "text-left"}>
            <h4 className="text-lg font-bold mb-6">{dir === "rtl" ? "روابط مهمة" : "Important Links"}</h4>
            <ul className="space-y-3">
              {[{ href: "/privacy-policy", ar: "سياسة الخصوصية", en: "Privacy Policy" }, { href: "/terms-of-use", ar: "شروط الاستخدام", en: "Terms of Use" }, { href: "/cancellation-policy", ar: "سياسة الإلغاء", en: "Cancellation Policy" }, { href: "/about-company", ar: "عن الشركة", en: "About the Company" }, { href: "/blog", ar: "المدونة", en: "Blog" }].map(link => (
                <li key={link.href}><a href={link.href} className="text-sm opacity-80 hover:opacity-100 hover:text-white transition-all duration-300">{dir === "rtl" ? link.ar : link.en}</a></li>
              ))}
            </ul>
          </div>
          
          <div className={dir === "rtl" ? "text-right" : "text-left"}>
            <h4 className="text-lg font-bold mb-6">{dir === "rtl" ? "تواصل معانا" : "Contact Us"}</h4>
            <ul className="space-y-4">
              {[{ icon: MapPin, text: getFooterContent('address_ar', language as "ar" | "en") || (dir === "rtl" ? "جازان، المملكة العربية السعودية" : "Jazan, Saudi Arabia") }, { icon: Phone, text: getFooterContent('phone', language as "ar" | "en") || "+966535656226" }, { icon: Mail, text: getFooterContent('email', language as "ar" | "en") || "info@olu-it.com" }, { icon: Clock, text: getFooterContent('working_hours_ar', language as "ar" | "en") || "09am - 05pm Mon-Sat" }].map((item, i) => (
                <li key={i} className="flex items-center opacity-80 gap-3"><item.icon className="h-4 w-4 shrink-0" /><span className="text-sm">{item.text}</span></li>
              ))}
            </ul>
          </div>
          
          <div className={dir === "rtl" ? "text-right" : "text-left"}>
            <h4 className="text-lg font-bold mb-6">{dir === "rtl" ? "تابعنا" : "Follow Us"}</h4>
            <div className={`flex gap-3 ${dir === "rtl" ? "justify-end" : "justify-start"} mb-6`}>
              {socialLinks.map(link => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300">
                  {getSocialIcon(link.icon)}
                </a>
              ))}
            </div>
            <p className="text-sm opacity-80 leading-relaxed">{dir === "rtl" ? "نحن شركة متخصصة في تطوير المواقع، تحسين محركات البحث، والتسويق الرقمي." : "We are a company specialized in website development, SEO, and digital marketing."}</p>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="opacity-70">{getFooterContent('copyright_text_ar', language as "ar" | "en") || "جميع الحقوق محفوظة © 2025 شركة علو لتقنية المعلومات."}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
