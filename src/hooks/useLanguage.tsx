
import { useState, useEffect, createContext, useContext } from "react";

type LanguageCode = "ar" | "en" | "fr" | "tr" | "zh" | "es";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const translations: Record<LanguageCode, Record<string, string>> = {
  ar: {
    "home": "الرئيسية",
    "services": "الخدمات",
    "about": "عن الشركة",
    "portfolio": "المشاريع",
    "contact": "اتصل بنا",
    "hero.title": "نحول رؤيتك إلى واقع رقمي",
    "hero.subtitle": "نقدم حلولاً تقنية مبتكرة لتطوير أعمالك",
    "services.title": "خدماتنا",
    "service1.title": "تطوير المواقع",
    "service1.desc": "تصميم وتطوير مواقع إلكترونية احترافية",
    "service2.title": "تطوير التطبيقات",
    "service2.desc": "إنشاء تطبيقات مخصصة لمختلف المنصات",
    "service3.title": "خدمات الـ AI",
    "service3.desc": "دمج حلول الذكاء الاصطناعي في أعمالك",
    "service4.title": "الاستشارات التقنية",
    "service4.desc": "خبرة استشارية لتحسين كفاءة عملك",
    "cta.button": "تواصل معنا",
    "footer.copyright": "جميع الحقوق محفوظة",
  },
  en: {
    "home": "Home",
    "services": "Services",
    "about": "About",
    "portfolio": "Portfolio",
    "contact": "Contact",
    "hero.title": "Turning Vision Into Digital Reality",
    "hero.subtitle": "We provide innovative technical solutions to grow your business",
    "services.title": "Our Services",
    "service1.title": "Web Development",
    "service1.desc": "Professional website design and development",
    "service2.title": "App Development",
    "service2.desc": "Custom application creation for various platforms",
    "service3.title": "AI Services",
    "service3.desc": "Integrating artificial intelligence solutions into your business",
    "service4.title": "Technical Consulting",
    "service4.desc": "Expert advisory to optimize your business efficiency",
    "cta.button": "Contact Us",
    "footer.copyright": "All Rights Reserved",
  },
  fr: {
    "home": "Accueil",
    "services": "Services",
    "about": "À Propos",
    "portfolio": "Portfolio",
    "contact": "Contact",
    "hero.title": "Transformer la Vision en Réalité Numérique",
    "hero.subtitle": "Nous fournissons des solutions techniques innovantes pour développer votre entreprise",
    "services.title": "Nos Services",
    "service1.title": "Développement Web",
    "service1.desc": "Conception et développement de sites web professionnels",
    "service2.title": "Développement d'Applications",
    "service2.desc": "Création d'applications personnalisées pour diverses plateformes",
    "service3.title": "Services d'IA",
    "service3.desc": "Intégration de solutions d'intelligence artificielle dans votre entreprise",
    "service4.title": "Conseil Technique",
    "service4.desc": "Conseils d'experts pour optimiser l'efficacité de votre entreprise",
    "cta.button": "Contactez-nous",
    "footer.copyright": "Tous Droits Réservés",
  },
  tr: {
    "home": "Ana Sayfa",
    "services": "Hizmetler",
    "about": "Hakkımızda",
    "portfolio": "Portfolyo",
    "contact": "İletişim",
    "hero.title": "Vizyonu Dijital Gerçekliğe Dönüştürüyoruz",
    "hero.subtitle": "İşinizi büyütmek için yenilikçi teknik çözümler sunuyoruz",
    "services.title": "Hizmetlerimiz",
    "service1.title": "Web Geliştirme",
    "service1.desc": "Profesyonel web sitesi tasarımı ve geliştirmesi",
    "service2.title": "Uygulama Geliştirme",
    "service2.desc": "Çeşitli platformlar için özel uygulama oluşturma",
    "service3.title": "Yapay Zeka Hizmetleri",
    "service3.desc": "İşletmenize yapay zeka çözümleri entegre etme",
    "service4.title": "Teknik Danışmanlık",
    "service4.desc": "İşletmenizin verimliliğini optimize etmek için uzman danışmanlık",
    "cta.button": "Bize Ulaşın",
    "footer.copyright": "Tüm Hakları Saklıdır",
  },
  zh: {
    "home": "首页",
    "services": "服务",
    "about": "关于我们",
    "portfolio": "作品集",
    "contact": "联系我们",
    "hero.title": "将愿景转化为数字现实",
    "hero.subtitle": "我们提供创新的技术解决方案来发展您的业务",
    "services.title": "我们的服务",
    "service1.title": "网站开发",
    "service1.desc": "专业网站设计和开发",
    "service2.title": "应用程序开发",
    "service2.desc": "为各种平台创建定制应用程序",
    "service3.title": "人工智能服务",
    "service3.desc": "将人工智能解决方案整合到您的业务中",
    "service4.title": "技术咨询",
    "service4.desc": "专家建议优化您的业务效率",
    "cta.button": "联系我们",
    "footer.copyright": "版权所有",
  },
  es: {
    "home": "Inicio",
    "services": "Servicios",
    "about": "Acerca de",
    "portfolio": "Portafolio",
    "contact": "Contacto",
    "hero.title": "Convirtiendo Visión en Realidad Digital",
    "hero.subtitle": "Proporcionamos soluciones técnicas innovadoras para hacer crecer su negocio",
    "services.title": "Nuestros Servicios",
    "service1.title": "Desarrollo Web",
    "service1.desc": "Diseño y desarrollo de sitios web profesionales",
    "service2.title": "Desarrollo de Aplicaciones",
    "service2.desc": "Creación de aplicaciones personalizadas para diversas plataformas",
    "service3.title": "Servicios de IA",
    "service3.desc": "Integrando soluciones de inteligencia artificial en su negocio",
    "service4.title": "Consultoría Técnica",
    "service4.desc": "Asesoramiento experto para optimizar la eficiencia de su negocio",
    "cta.button": "Contáctenos",
    "footer.copyright": "Todos los Derechos Reservados",
  },
};

const directionByLanguage: Record<LanguageCode, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
  fr: "ltr",
  tr: "ltr",
  zh: "ltr",
  es: "ltr",
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>("ar");
  const [dir, setDir] = useState<"rtl" | "ltr">("rtl");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as LanguageCode | null;
    if (storedLanguage && Object.keys(translations).includes(storedLanguage)) {
      setLanguageState(storedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    const direction = directionByLanguage[language];
    setDir(direction);
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
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
