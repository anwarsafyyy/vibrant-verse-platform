import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SiteSettings {
  [key: string]: {
    value_ar: string | null;
    value_en: string | null;
  };
}

export interface HeroContent {
  id: string;
  title_ar: string;
  title_en: string;
  subtitle_ar: string;
  subtitle_en: string;
  cta_text_ar: string;
  cta_text_en: string;
  cta_link: string;
  background_image_url?: string;
  is_active: boolean;
}

export interface AboutContent {
  id: string;
  title_ar: string;
  title_en: string;
  subtitle_ar: string;
  subtitle_en: string;
  description_ar: string;
  description_en: string;
  innovation_text_ar: string;
  innovation_text_en: string;
  quality_text_ar: string;
  quality_text_en: string;
  partnership_text_ar: string;
  partnership_text_en: string;
  image_url?: string;
  cta_text_ar: string;
  cta_text_en: string;
  is_active: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  is_active: boolean;
  order_index: number;
}

export interface FooterContent {
  id: string;
  company_description_ar: string;
  company_description_en: string;
  address_ar: string;
  address_en: string;
  phone: string;
  email: string;
  working_hours_ar: string;
  working_hours_en: string;
  copyright_text_ar: string;
  copyright_text_en: string;
}

export const useSiteContent = () => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({});
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [footerContent, setFooterContent] = useState<FooterContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllContent();
  }, []);

  const fetchAllContent = async () => {
    try {
      setLoading(true);
      
      // Fetch site settings
      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('*');
      
      const settingsMap: SiteSettings = {};
      settingsData?.forEach(setting => {
        settingsMap[setting.key] = {
          value_ar: setting.value_ar,
          value_en: setting.value_en
        };
      });
      setSiteSettings(settingsMap);

      // Fetch hero content
      const { data: heroData } = await supabase
        .from('hero_content')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      setHeroContent(heroData);

      // Fetch about content
      const { data: aboutData } = await supabase
        .from('about_content')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      setAboutContent(aboutData);

      // Fetch social links
      const { data: socialData } = await supabase
        .from('social_links')
        .select('*')
        .eq('is_active', true)
        .order('order_index');
      
      setSocialLinks(socialData || []);

      // Fetch footer content
      const { data: footerData } = await supabase
        .from('footer_content')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      setFooterContent(footerData);

    } catch (error) {
      console.error('Error fetching site content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSetting = (key: string, language: 'ar' | 'en' = 'ar') => {
    const setting = siteSettings[key];
    if (!setting) return '';
    return language === 'ar' ? setting.value_ar : setting.value_en;
  };

  const getHeroContent = (field: keyof HeroContent, language: 'ar' | 'en' = 'ar') => {
    if (!heroContent) return '';
    if (field.endsWith('_ar') || field.endsWith('_en')) {
      return heroContent[field] || '';
    }
    const fieldWithLang = `${field}_${language}` as keyof HeroContent;
    return heroContent[fieldWithLang] || '';
  };

  const getAboutContent = (field: keyof AboutContent, language: 'ar' | 'en' = 'ar') => {
    if (!aboutContent) return '';
    if (field.endsWith('_ar') || field.endsWith('_en')) {
      return aboutContent[field] || '';
    }
    const fieldWithLang = `${field}_${language}` as keyof AboutContent;
    return aboutContent[fieldWithLang] || '';
  };

  const getFooterContent = (field: keyof FooterContent, language: 'ar' | 'en' = 'ar') => {
    if (!footerContent) return '';
    if (field.endsWith('_ar') || field.endsWith('_en')) {
      return footerContent[field] || '';
    }
    const fieldWithLang = `${field}_${language}` as keyof FooterContent;
    return footerContent[fieldWithLang] || '';
  };

  return {
    siteSettings,
    heroContent,
    aboutContent,
    socialLinks,
    footerContent,
    loading,
    getSetting,
    getHeroContent,
    getAboutContent,
    getFooterContent,
    refetch: fetchAllContent
  };
};