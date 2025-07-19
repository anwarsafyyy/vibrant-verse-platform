import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";

const DigitalTransformationSection: React.FC = () => {
  const { language, dir } = useLanguage();
  const { getSetting } = useSiteContent();
  
  const transformationImageUrl = getSetting('transformation_image_url', language as "ar" | "en") || "/lovable-uploads/43d54ca4-23e5-4237-86f8-517a1cc8e3dc.png";

  return (
    <section className="relative py-20 bg-gradient-to-r from-primary/5 to-secondary/5 overflow-hidden" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {language === 'ar' 
                ? getSetting('transformation_title', 'ar') || "نقود التحول الرقمي من خلال الابتكار"
                : getSetting('transformation_title', 'en') || "Driving Digital Transformation Through Innovation"
              }
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {language === 'ar'
                ? getSetting('transformation_description', 'ar') || "نقدم حلول تقنية متكاملة تجمع بين الإبداع والتميز لمساعدة الشركات على النمو في العصر الرقمي."
                : getSetting('transformation_description', 'en') || "We offer fully integrated tech solutions that combine creativity and excellence to help businesses grow in the digital era."
              }
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {[
                {
                  title: language === 'ar' ? "الابتكار التقني" : "Technical Innovation",
                  description: language === 'ar' ? "حلول متطورة تواكب أحدث التقنيات" : "Advanced solutions that keep up with the latest technologies"
                },
                {
                  title: language === 'ar' ? "التميز في التنفيذ" : "Excellence in Execution", 
                  description: language === 'ar' ? "تنفيذ احترافي يضمن أعلى معايير الجودة" : "Professional execution ensuring the highest quality standards"
                },
                {
                  title: language === 'ar' ? "الشراكة الاستراتيجية" : "Strategic Partnership",
                  description: language === 'ar' ? "نعمل معك كشريك استراتيجي لضمان نجاحك" : "We work with you as a strategic partner to ensure your success"
                },
                {
                  title: language === 'ar' ? "الدعم المستمر" : "Continuous Support",
                  description: language === 'ar' ? "دعم فني مستمر وصيانة دورية" : "Continuous technical support and regular maintenance"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 space-x-reverse" data-aos="fade-up" data-aos-delay={100 * index}>
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative" data-aos="fade-left">
            <div className="relative z-10">
              <img
                src={transformationImageUrl}
                alt={language === 'ar' ? "التحول الرقمي" : "Digital Transformation"}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalTransformationSection;