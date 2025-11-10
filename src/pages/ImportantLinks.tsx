import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getCollection } from "@/lib/firebaseHelpers";

interface FooterLink {
  id: string;
  name_ar: string;
  name_en: string;
  link: string;
  category: string;
  is_active: boolean;
  order_index: number;
  icon?: string;
  target?: string;
}

const ImportantLinks: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFooterLinks();
  }, []);

  const fetchFooterLinks = async () => {
    try {
      const data = await getCollection<FooterLink>(
        'footer_links',
        [{ field: 'is_active', operator: '==', value: true }],
        'order_index',
        'asc'
      );
      setFooterLinks(data || []);
    } catch (error) {
      console.error("Failed to fetch footer links:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryTitle = (category: string) => {
    if (dir === "rtl") {
      switch (category) {
        case 'Privacy Policy': return 'سياسة الخصوصية';
        case 'Terms of Use': return 'شروط الاستخدام';
        case 'Cancellation Policy': return 'سياسة الإلغاء';
        case 'About the Company': return 'عن الشركة';
        case 'Blog': return 'المدونة';
        default: return category;
      }
    }
    return category;
  };

  const categories = ['Privacy Policy', 'Terms of Use', 'Cancellation Policy', 'About the Company', 'Blog'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              {dir === "rtl" ? (
                <ArrowRight className="h-5 w-5" />
              ) : (
                <ArrowLeft className="h-5 w-5" />
              )}
              {dir === "rtl" ? "العودة للرئيسية" : "Back to Home"}
            </Link>
            
            <div className="flex items-center gap-4">
              <img 
                src="/public/alo.png" 
                alt="علو Logo" 
                className="h-8 w-auto" 
              />
              <span className="text-xl font-bold text-primary">علو</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-12 ${dir === "rtl" ? "text-right" : "text-left"}`}>
            <h1 className="text-4xl font-bold text-primary mb-4">
              {dir === "rtl" ? "الروابط المهمة" : "Important Links"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {dir === "rtl" 
                ? "جميع الروابط والصفحات المهمة في مكان واحد"
                : "All important links and pages in one place"
              }
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : (
            <div className="grid gap-8">
              {categories.map((category) => {
                const categoryLinks = footerLinks.filter(link => link.category === category);
                if (categoryLinks.length === 0) return null;
                
                return (
                  <div key={category} className="bg-card rounded-lg border shadow-sm p-6">
                    <h2 className={`text-2xl font-semibold text-primary mb-6 ${dir === "rtl" ? "text-right" : "text-left"}`}>
                      {getCategoryTitle(category)}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {categoryLinks.map((link) => (
                        <a 
                          key={link.id}
                          href={link.link} 
                          target={link.target || '_self'}
                          className={`flex items-center gap-3 p-4 rounded-lg border hover:border-primary/50 hover:shadow-md transition-all group ${dir === "rtl" ? "text-right" : "text-left"}`}
                        >
                          {link.icon && (
                            <div className="w-5 h-5 flex-shrink-0 text-primary">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                <circle cx="12" cy="12" r="2" />
                              </svg>
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {language === 'ar' ? link.name_ar : link.name_en}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {link.target === '_blank' 
                                ? (dir === "rtl" ? "يفتح في صفحة جديدة" : "Opens in new tab")
                                : (dir === "rtl" ? "يفتح في نفس الصفحة" : "Opens in same page")
                              }
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && footerLinks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {dir === "rtl" ? "لا توجد روابط متاحة حالياً" : "No links available at the moment"}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ImportantLinks;