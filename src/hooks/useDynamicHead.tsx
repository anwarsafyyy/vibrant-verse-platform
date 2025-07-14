import { useEffect } from "react";
import { useSiteContent } from "./useSiteContent";
import { useLanguage } from "./useLanguage";

export const useDynamicHead = () => {
  const { getSetting } = useSiteContent();
  const { language } = useLanguage();

  useEffect(() => {
    // Update document title
    const siteName = getSetting('site_name', language as "ar" | "en");
    if (siteName) {
      document.title = siteName;
    }

    // Update favicon
    const faviconUrl = getSetting('favicon_url', language as "ar" | "en");
    if (faviconUrl) {
      // Remove existing favicon links
      const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
      existingFavicons.forEach(favicon => favicon.remove());

      // Add new favicon
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = faviconUrl;
      link.type = faviconUrl.endsWith('.ico') ? 'image/x-icon' : 'image/png';
      document.head.appendChild(link);
    }
  }, [getSetting, language]);
};