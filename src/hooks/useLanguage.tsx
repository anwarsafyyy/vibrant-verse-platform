
import React, { createContext, useContext, useState, useEffect } from "react";

export type LanguageCode = "ar" | "en" | "fr" | "tr" | "zh" | "es";

type DirectionType = "ltr" | "rtl";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  dir: DirectionType;
}

interface TranslationsType {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: TranslationsType = {
  ar: {
    "home": "الرئيسية",
    "services": "خدماتنا",
    "about": "من نحن",
    "portfolio": "أعمالنا",
    "contact": "اتصل بنا",
    "hero.title": "نقود التحول الرقمي من خلال الابتكار",
    "hero.subtitle": "نقدم حلول تقنية متكاملة تجمع بين الإبداع والتميز لنساعد الشركات على النمو في العصر الرقمي",
    "cta.button": "تواصل معنا",
    "services.title": "خدماتنا المتميزة",
    "service1.title": "تطوير الويب",
    "service1.desc": "تصميم وتطوير مواقع ويب متميزة وسريعة الاستجابة باستخدام أحدث التقنيات",
    "service2.title": "تطوير التطبيقات",
    "service2.desc": "تطوير تطبيقات جوال وسطح مكتب عالية الأداء لنظامي iOS و Android",
    "service3.title": "خدمات الذكاء الاصطناعي",
    "service3.desc": "حلول ذكاء اصطناعي متقدمة لتحسين العمليات التجارية وتعزيز الإنتاجية",
    "service4.title": "الاستشارات التقنية",
    "service4.desc": "نقدم استشارات تقنية لمساعدة الشركات على اتخاذ القرارات التقنية الصحيحة",
    "footer.copyright": "جميع الحقوق محفوظة",
    "about.title": "نبذة عنا",
    "about.subtitle": "نحن نقود التحول الرقمي للشركات من خلال الابتكار والتميز",
    "about.description": "في علو، نسعى جاهدين لتوفير حلول تقنية مبتكرة تلبي احتياجات عملائنا المتنوعة. نحن نؤمن بقوة التكنولوجيا في تعزيز أداء الأعمال وتحقيق النمو المستدام.",
    "portfolio.title": "أعمالنا",
    "portfolio.subtitle": "اكتشف مجموعة من مشاريعنا المتميزة",
    "contact.title": "تواصل معنا",
    "contact.subtitle": "نحن هنا للإجابة على استفساراتك",
    "contact.name": "الاسم",
    "contact.email": "البريد الإلكتروني",
    "contact.message": "الرسالة",
    "contact.submit": "إرسال"
  },
  en: {
    "home": "Home",
    "services": "Services",
    "about": "About",
    "portfolio": "Portfolio",
    "contact": "Contact",
    "hero.title": "Driving Digital Transformation Through Innovation",
    "hero.subtitle": "We deliver integrated technological solutions that combine creativity and excellence to help companies grow in the digital era",
    "cta.button": "Contact Us",
    "services.title": "Our Distinguished Services",
    "service1.title": "Web Development",
    "service1.desc": "Design and develop exceptional responsive websites using the latest technologies",
    "service2.title": "App Development",
    "service2.desc": "Develop high-performance mobile and desktop applications for iOS and Android",
    "service3.title": "AI Services",
    "service3.desc": "Advanced artificial intelligence solutions to improve business operations and enhance productivity",
    "service4.title": "Technical Consulting",
    "service4.desc": "We provide technical consultations to help companies make the right technical decisions",
    "footer.copyright": "All rights reserved",
    "about.title": "About Us",
    "about.subtitle": "We lead digital transformation for companies through innovation and excellence",
    "about.description": "At Olu, we strive to provide innovative technical solutions that meet the diverse needs of our clients. We believe in the power of technology to enhance business performance and achieve sustainable growth.",
    "portfolio.title": "Our Portfolio",
    "portfolio.subtitle": "Discover a collection of our outstanding projects",
    "contact.title": "Contact Us",
    "contact.subtitle": "We're here to answer your inquiries",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.submit": "Submit"
  },
  // Add other languages with the same structure
  fr: { /* French translations would go here */ },
  tr: { /* Turkish translations would go here */ },
  zh: { /* Chinese translations would go here */ },
  es: { /* Spanish translations would go here */ }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [dir, setDir] = useState<DirectionType>("ltr");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as LanguageCode | null;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "ar") {
        setLanguage("ar");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    const htmlDir = language === "ar" ? "rtl" : "ltr";
    setDir(htmlDir);
    document.documentElement.setAttribute("dir", htmlDir);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    if (translations["en"] && translations["en"][key]) {
      return translations["en"][key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
