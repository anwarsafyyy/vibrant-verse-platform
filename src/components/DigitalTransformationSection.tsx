import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";

interface Stat {
  id: string;
  name: string;
  value: string;
  icon: string;
  order_index: number;
}

const DigitalTransformationSection: React.FC = () => {
  const { language, dir } = useLanguage();
  const { getSetting } = useSiteContent();
  const [stats, setStats] = useState<Stat[]>([]);
  
  const transformationImageUrl = getSetting('transformation_image_url', language as "ar" | "en") || "/lovable-uploads/43d54ca4-23e5-4237-86f8-517a1cc8e3dc.png";

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .order('order_index', { ascending: true });
        
      if (error) {
        console.error("Error fetching stats:", error);
        return;
      }
      
      setStats(data || []);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-primary/5 to-secondary/10 overflow-hidden" dir={dir}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm">
              ✨ {language === 'ar' 
                ? getSetting('hero_badge_text', 'ar') || 'نحو التميز الرقمي'
                : getSetting('hero_badge_text', 'en') || 'Towards Digital Excellence'
              }
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent leading-tight">
              {language === 'ar' 
                ? getSetting('hero_title', 'ar') || "نقود التحول الرقمي من خلال الابتكار"
                : getSetting('hero_title', 'en') || "Driving Digital Transformation Through Innovation"
              }
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              {language === 'ar'
                ? getSetting('hero_description', 'ar') || "شراكة حقيقية مع عملائنا لضمان النجاح"
                : getSetting('hero_description', 'en') || "True partnership with our clients to ensure success"
              }
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover-scale">
                {language === 'ar' 
                  ? getSetting('hero_cta_primary', 'ar') || 'ابدأ رحلتك الرقمية'
                  : getSetting('hero_cta_primary', 'en') || 'Start Your Digital Journey'
                }
              </button>
              <button className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-muted transition-all duration-300 hover-scale">
                {language === 'ar' 
                  ? getSetting('hero_cta_secondary', 'ar') || 'تعرف على خدماتنا'
                  : getSetting('hero_cta_secondary', 'en') || 'Explore Our Services'
                }
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border/50">
              {stats.map((stat, index) => (
                <div key={stat.id} className="text-center">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 rounded-3xl"></div>
              <img
                src={transformationImageUrl}
                alt={language === 'ar' ? "التحول الرقمي" : "Digital Transformation"}
                className="w-full h-auto rounded-3xl shadow-2xl hover-scale"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-lg animate-float">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{language === 'ar' ? 'متصل' : 'Online'}</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-4 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-2xl font-bold text-primary">99%</div>
              <div className="text-xs text-muted-foreground">{language === 'ar' ? 'نجاح المشاريع' : 'Success Rate'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalTransformationSection;