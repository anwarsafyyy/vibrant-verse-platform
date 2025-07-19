import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";

const DigitalTransformationSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const { getSetting } = useSiteContent();

  const transformationImageUrl = getSetting('transformation_image_url', language as "ar" | "en") || 
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085";

  return (
    <section className="py-20 bg-gradient-to-b from-background via-background/95 to-olu-blue/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`${dir === "rtl" ? "lg:order-2" : "lg:order-1"} space-y-6`}>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                <span className="olu-gold-text-gradient">
                  {getSetting('transformation_title_ar', language as "ar" | "en") || 
                    (language === "ar" 
                      ? "قيادة التحول الرقمي من خلال الابتكار"
                      : "Driving Digital Transformation Through Innovation"
                    )
                  }
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {getSetting('transformation_text_ar', language as "ar" | "en") || 
                  (language === "ar"
                    ? "نقدم حلولاً تقنية متكاملة تجمع بين الإبداع والتميز لمساعدة الشركات على النمو في العصر الرقمي."
                    : "We offer fully integrated tech solutions that combine creativity and excellence to help businesses grow in the digital era."
                  )
                }
              </p>
            </div>
            
            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-olu-blue/10 dark:bg-olu-blue/20 rounded-lg p-4 border border-olu-blue/20">
                <div className="w-8 h-8 rounded-full bg-olu-blue/20 dark:bg-olu-blue/30 flex items-center justify-center mb-3">
                  <div className="w-4 h-4 rounded-full bg-olu-blue"></div>
                </div>
                <h3 className="font-semibold mb-2">
                  {language === "ar" ? "تقنيات متقدمة" : "Advanced Technology"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === "ar" 
                    ? "نستخدم أحدث التقنيات لتحقيق نتائج استثنائية"
                    : "We use cutting-edge technology to achieve exceptional results"
                  }
                </p>
              </div>
              
              <div className="bg-olu-gold/10 dark:bg-olu-gold/20 rounded-lg p-4 border border-olu-gold/20">
                <div className="w-8 h-8 rounded-full bg-olu-gold/20 dark:bg-olu-gold/30 flex items-center justify-center mb-3">
                  <div className="w-4 h-4 rounded-full bg-olu-gold"></div>
                </div>
                <h3 className="font-semibold mb-2">
                  {language === "ar" ? "حلول مبتكرة" : "Innovative Solutions"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === "ar"
                    ? "نبتكر حلولاً فريدة تناسب احتياجات عملك"
                    : "We innovate unique solutions that fit your business needs"
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={`${dir === "rtl" ? "lg:order-1" : "lg:order-2"} relative`}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={transformationImageUrl}
                alt={language === "ar" ? "التحول الرقمي" : "Digital Transformation"}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-olu-blue/20 to-transparent"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-olu-gold/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-olu-blue/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalTransformationSection;