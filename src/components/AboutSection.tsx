
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Users, Award, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface StatItem {
  id: string;
  name: string;
  value: string;
  icon: string;
}

const AboutSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
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
    switch (name) {
      case "Satisfied Clients":
        return language === "ar" ? t("stats.clients") : name;
      case "Completed Projects":
        return language === "ar" ? t("stats.projects") : name;
      case "Technologies Used":
        return language === "ar" ? t("stats.technologies") : name;
      case "Years Experience":
        return language === "ar" ? t("stats.experience") : name;
      default:
        return name;
    }
  };

  return (
    <section id="about" className="min-h-screen relative flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent"></div>
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="olu-gold-text-gradient">
              {language === "ar" ? "من نحن" : t("about.title")}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            {language === "ar" ? "نبتكر اليوم، لنرتقي بالغد" : t("about.subtitle")}
          </p>
          <div className="w-24 h-1 olu-gradient mx-auto rounded-full mb-10"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <p className="text-lg mb-6">
              {language === "ar" 
                ? "نحن شركة متخصصة في تقديم حلول رقمية متكاملة تدفع الأعمال نحو مستقبل أكثر تطورًا. من تطوير المواقع والتطبيقات إلى الاستشارات التقنية والحلول السحابية، نعمل بشغف لنمنحك الأدوات التي تحتاجها للنجاح في العالم الرقمي. 🚀" 
                : t("about.description")
              }
            </p>
            
            <div className="grid grid-cols-1 gap-6 mt-8">
              <div className="bg-background border border-border/30 p-4 rounded-lg">
                <p className="font-semibold mb-2 text-olu-gold">
                  {language === "ar" ? "الابتكار هو جوهر عملنا" : "Innovation is our core"}
                </p>
              </div>
              
              <div className="bg-background border border-border/30 p-4 rounded-lg">
                <p className="font-semibold mb-2 text-olu-gold">
                  {language === "ar" ? "الجودة والاحترافية أولويتنا" : "Quality and professionalism are our priority"}
                </p>
              </div>
              
              <div className="bg-background border border-border/30 p-4 rounded-lg">
                <p className="font-semibold mb-2 text-olu-gold">
                  {language === "ar" ? "شراكة تدوم معك" : "A lasting partnership with you"}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
              {loading ? (
                // Display skeleton loaders while loading
                Array(4).fill(0).map((_, index) => (
                  <div key={`stat-skeleton-${index}`} className="flex flex-col items-center text-center p-4 bg-background border border-border/30 rounded-lg animate-pulse">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-olu-gold/10 text-olu-gold mb-2"></div>
                    <div className="h-6 w-16 bg-muted rounded mb-1"></div>
                    <div className="h-4 w-24 bg-muted rounded"></div>
                  </div>
                ))
              ) : stats.length > 0 ? (
                // Display actual statistics from the database
                stats.map((stat) => (
                  <div key={stat.id} className="flex flex-col items-center text-center p-4 bg-background border border-border/30 rounded-lg">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-olu-gold/10 text-olu-gold mb-2">
                      {getIcon(stat.icon)}
                    </div>
                    <h4 className="text-2xl font-bold text-olu-gold">{stat.value}</h4>
                    <p className="text-sm text-muted-foreground">
                      {getTranslatedStatName(stat.name)}
                    </p>
                  </div>
                ))
              ) : (
                // Fallback for no data
                <>
                  <div className="flex flex-col items-center text-center p-4 bg-background border border-border/30 rounded-lg">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-olu-gold/10 text-olu-gold mb-2">
                      <Users className="h-5 w-5" />
                    </div>
                    <h4 className="text-2xl font-bold text-olu-gold">100+</h4>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? t("stats.clients") : "Satisfied Clients"}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4 bg-background border border-border/30 rounded-lg">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-olu-gold/10 text-olu-gold mb-2">
                      <Award className="h-5 w-5" />
                    </div>
                    <h4 className="text-2xl font-bold text-olu-gold">50+</h4>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? t("stats.projects") : "Completed Projects"}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4 bg-background border border-border/30 rounded-lg">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-olu-gold/10 text-olu-gold mb-2">
                      <Clock className="h-5 w-5" />
                    </div>
                    <h4 className="text-2xl font-bold text-olu-gold">4+</h4>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? t("stats.experience") : "Years Experience"}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4 bg-background border border-border/30 rounded-lg">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-olu-gold/10 text-olu-gold mb-2">
                      <Globe className="h-5 w-5" />
                    </div>
                    <h4 className="text-2xl font-bold text-olu-gold">25+</h4>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? t("stats.technologies") : "Technologies Used"}
                    </p>
                  </div>
                </>
              )}
            </div>
            
            <div className="mt-8">
              <Button variant="gold" size="pill" onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}>
                {language === "ar" ? "اطرح سؤالاً" : "Ask a Question"}
              </Button>
            </div>
          </div>

          <div className={`${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-olu-gold to-olu-gold/60 opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-md aspect-video bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-gray-500">علو</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-4/6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="grid grid-cols-2 gap-2 mt-6">
                      <div className="bg-olu-gold/10 dark:bg-olu-gold/20 h-20 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-olu-gold/30 dark:bg-olu-gold/40"></div>
                      </div>
                      <div className="bg-olu-gold/10 dark:bg-olu-gold/20 h-20 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-olu-gold/30 dark:bg-olu-gold/40"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
