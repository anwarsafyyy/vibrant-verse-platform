
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Users, Award, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";

interface StatItem {
  id: string;
  name: string;
  value: string;
  icon: string;
}

const AboutSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const { getAboutContent } = useSiteContent();
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setIsVisible(true);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get the appropriate icon component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "users":
        return <Users className="h-5 w-5" />;
      case "award":
        return <Award className="h-5 w-5" />;
      case "clock":
        return <Clock className="h-5 w-5" />;
      case "globe":
        return <Globe className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  // Helper function to get the translated stat name
  const getTranslatedStatName = (name: string) => {
    // Use the translation function directly with appropriate keys
    switch (name.toLowerCase()) {
      case "satisfied clients":
      case "عملاء راضون":
        return t("stats.clients");
      case "completed projects":
      case "مشاريع مكتملة":
        return t("stats.projects");
      case "technologies used":
      case "تقنيات مستخدمة":
        return t("stats.technologies");
      case "years experience":
      case "سنوات خبرة":
        return t("stats.experience");
      default:
        // For any other stats that might be added through the admin panel
        return language === "ar" ? name : name;
    }
  };

  return (
    <section id="about" className="min-h-screen relative flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent"></div>
      
      <div className="container mx-auto px-4 py-20">{/* Container made dynamic */}
        <div className="mb-16">
          {/* Header Section - Title and Subtitle */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="olu-text-gradient-dark">
                {getAboutContent('title_ar', language as "ar" | "en") || t("about.title")}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              {getAboutContent('subtitle_ar', language as "ar" | "en") || t("about.subtitle")}
            </p>
            <div className="w-24 h-1 olu-gradient mx-auto rounded-full mb-8"></div>
          </div>
          
          {/* Image Section - Below title */}
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-2xl h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl">
              {getAboutContent('image_url', language as "ar" | "en") ? (
                <img 
                  src={String(getAboutContent('image_url', language as "ar" | "en"))} 
                  alt={String(getAboutContent('title_ar', language as "ar" | "en") || t("about.title"))}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-olu-purple/20 to-olu-purple-dark/20 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p className="text-lg mb-2">
                      {language === 'ar' ? 'لا توجد صورة مرفوعة' : 'No image uploaded'}
                    </p>
                    <p className="text-sm">
                      {language === 'ar' ? 'يمكنك رفع صورة من لوحة التحكم' : 'Upload an image from the dashboard'}
                    </p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
          <div className="w-24 h-1 olu-gradient mx-auto rounded-full"></div>
        </div>

        <div className={`${isVisible ? "animate-fade-in" : "opacity-0"} text-center`} style={{ animationDelay: "0.2s" }}>
          <p className="text-lg mb-8 max-w-4xl mx-auto">
            {getAboutContent('description_ar', language as "ar" | "en") || t("about.description")}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
            <div className="bg-background border border-border/30 p-4 rounded-lg">
              <p className="font-semibold text-olu-purple-dark">
                {getAboutContent('innovation_text_ar', language as "ar" | "en") || t("about.innovation")}
              </p>
            </div>
            
            <div className="bg-background border border-border/30 p-4 rounded-lg">
              <p className="font-semibold text-olu-purple-dark">
                {getAboutContent('quality_text_ar', language as "ar" | "en") || t("about.quality")}
              </p>
            </div>
            
            <div className="bg-background border border-border/30 p-4 rounded-lg">
              <p className="font-semibold text-olu-purple-dark">
                {getAboutContent('partnership_text_ar', language as "ar" | "en") || t("about.partnership")}
              </p>
            </div>
          </div>

          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 max-w-4xl mx-auto">
            {loading ? (
              // Display skeleton loaders while loading
              Array(4).fill(0).map((_, index) => (
                <div key={`stat-skeleton-${index}`} className="flex flex-col items-center text-center p-4 bg-background border border-border/30 rounded-lg animate-pulse">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-400/10 text-gray-400 mb-2"></div>
                  <div className="h-6 w-16 bg-muted rounded mb-1"></div>
                  <div className="h-4 w-24 bg-muted rounded"></div>
                </div>
              ))
            ) : stats.length > 0 ? (
              // Display actual statistics from the database
              stats.map((stat) => (
                <div key={stat.id} className="flex flex-col items-center text-center p-4 bg-background border border-border/30 rounded-lg">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-400/10 text-gray-400 mb-2">
                    {getIcon(stat.icon)}
                  </div>
                  <h4 className="text-2xl font-bold text-olu-purple-dark">{stat.value}</h4>
                  <p className="text-sm text-muted-foreground">
                    {getTranslatedStatName(stat.name)}
                  </p>
                </div>
              ))
            ) : (
              // Fallback for no data
              <>
                <div className="flex flex-col items-center text-center p-4 bg-background border border-border/30 rounded-lg">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-400/10 text-gray-400 mb-2">
                    <Users className="h-5 w-5" />
                  </div>
                  <h4 className="text-2xl font-bold text-olu-purple-dark">100+</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar" ? t("stats.clients") : "Satisfied Clients"}
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 bg-background border border-border/30 rounded-lg">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-400/10 text-gray-400 mb-2">
                    <Award className="h-5 w-5" />
                  </div>
                  <h4 className="text-2xl font-bold text-olu-purple-dark">50+</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar" ? t("stats.projects") : "Completed Projects"}
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 bg-background border border-border/30 rounded-lg">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-400/10 text-gray-400 mb-2">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h4 className="text-2xl font-bold text-olu-purple-dark">4+</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar" ? t("stats.experience") : "Years Experience"}
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 bg-background border border-border/30 rounded-lg">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-400/10 text-gray-400 mb-2">
                    <Globe className="h-5 w-5" />
                  </div>
                  <h4 className="text-2xl font-bold text-olu-purple-dark">25+</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar" ? t("stats.technologies") : "Technologies Used"}
                  </p>
                </div>
              </>
            )}
          </div>
          
          <div className="mt-8">
            <Button variant="light" size="pill" onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}>
              {getAboutContent('cta_text_ar', language as "ar" | "en") || t("about.askQuestion")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
