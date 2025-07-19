import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";

const DigitalTransformationSection: React.FC = () => {
  const { language, dir } = useLanguage();
  const { getSetting } = useSiteContent();
  
  const transformationImageUrl = getSetting('transformation_image_url', language as "ar" | "en") || "/lovable-uploads/43d54ca4-23e5-4237-86f8-517a1cc8e3dc.png";

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
              ✨ {language === 'ar' ? 'نحو التميز الرقمي' : 'Towards Digital Excellence'}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent leading-tight">
              {language === 'ar' 
                ? getSetting('transformation_title', 'ar') || "نقود التحول الرقمي من خلال الابتكار"
                : getSetting('transformation_title', 'en') || "Driving Digital Transformation Through Innovation"
              }
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              {language === 'ar'
                ? getSetting('transformation_description', 'ar') || "نقدم حلول تقنية متكاملة تجمع بين الإبداع والتميز لمساعدة الشركات على النمو في العصر الرقمي."
                : getSetting('transformation_description', 'en') || "We offer fully integrated tech solutions that combine creativity and excellence to help businesses grow in the digital era."
              }
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover-scale">
                {language === 'ar' ? 'ابدأ رحلتك الرقمية' : 'Start Your Digital Journey'}
              </button>
              <button className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-muted transition-all duration-300 hover-scale">
                {language === 'ar' ? 'تعرف على خدماتنا' : 'Explore Our Services'}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
              {[
                { number: "100+", label: language === 'ar' ? "مشروع مكتمل" : "Projects Completed" },
                { number: "50+", label: language === 'ar' ? "عميل راضٍ" : "Happy Clients" },
                { number: "5+", label: language === 'ar' ? "سنوات خبرة" : "Years Experience" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
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