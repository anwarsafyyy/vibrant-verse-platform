
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Users, Award, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
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
      const q = query(
        collection(db, 'stats'),
        orderBy('order_index', 'asc')
      );
      const snapshot = await getDocs(q);
      const statsData: StatItem[] = [];
      snapshot.forEach(doc => {
        statsData.push({ id: doc.id, ...doc.data() } as StatItem);
      });
      setStats(statsData);
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
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="font-bold mb-6 tracking-tight">
            <span className="olu-text-gradient">
              {getAboutContent('title_ar', language as "ar" | "en") || t("about.title")}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {getAboutContent('subtitle_ar', language as "ar" | "en") || t("about.subtitle")}
          </p>
        </div>
          
        <div className={`${isVisible ? "animate-fade-in" : "opacity-0"} max-w-5xl mx-auto`} style={{ animationDelay: "0.2s" }}>
          <p className="text-lg mb-12 text-center">
            {getAboutContent('description_ar', language as "ar" | "en") || t("about.description")}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-card border border-border/50 p-8 rounded-3xl hover:shadow-lg transition-all duration-500">
              <p className="font-semibold text-center">
                {getAboutContent('innovation_text_ar', language as "ar" | "en") || t("about.innovation")}
              </p>
            </div>
            
            <div className="bg-card border border-border/50 p-8 rounded-3xl hover:shadow-lg transition-all duration-500">
              <p className="font-semibold text-center">
                {getAboutContent('quality_text_ar', language as "ar" | "en") || t("about.quality")}
              </p>
            </div>
            
            <div className="bg-card border border-border/50 p-8 rounded-3xl hover:shadow-lg transition-all duration-500">
              <p className="font-semibold text-center">
                {getAboutContent('partnership_text_ar', language as "ar" | "en") || t("about.partnership")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {loading ? (
              Array(4).fill(0).map((_, index) => (
                <div key={`stat-skeleton-${index}`} className="flex flex-col items-center text-center p-8 bg-card border border-border/50 rounded-3xl animate-pulse">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-muted mb-4"></div>
                  <div className="h-8 w-16 bg-muted rounded mb-2"></div>
                  <div className="h-4 w-24 bg-muted rounded"></div>
                </div>
              ))
            ) : stats.length > 0 ? (
              stats.map((stat) => (
                <div key={stat.id} className="flex flex-col items-center text-center p-8 bg-card border border-border/50 rounded-3xl hover:shadow-lg transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 text-primary mb-4">
                    {getIcon(stat.icon)}
                  </div>
                  <h4 className="text-3xl font-bold mb-2">{stat.value}</h4>
                  <p className="text-sm text-muted-foreground">
                    {getTranslatedStatName(stat.name)}
                  </p>
                </div>
              ))
            ) : (
              <>
                <div className="flex flex-col items-center text-center p-8 bg-card border border-border/50 rounded-3xl">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 text-primary mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h4 className="text-3xl font-bold mb-2">100+</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar" ? t("stats.clients") : "Satisfied Clients"}
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-8 bg-card border border-border/50 rounded-3xl">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 text-primary mb-4">
                    <Award className="h-6 w-6" />
                  </div>
                  <h4 className="text-3xl font-bold mb-2">50+</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar" ? t("stats.projects") : "Completed Projects"}
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-8 bg-card border border-border/50 rounded-3xl">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 text-primary mb-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h4 className="text-3xl font-bold mb-2">4+</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar" ? t("stats.experience") : "Years Experience"}
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-8 bg-card border border-border/50 rounded-3xl">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 text-primary mb-4">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h4 className="text-3xl font-bold mb-2">25+</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar" ? t("stats.technologies") : "Technologies Used"}
                  </p>
                </div>
              </>
            )}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="default" size="lg" onClick={() => {
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
