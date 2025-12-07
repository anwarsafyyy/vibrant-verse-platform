
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Users, Award, Clock, Globe, Star } from "lucide-react";
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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "users":
        return <Users className="h-6 w-6" />;
      case "award":
        return <Award className="h-6 w-6" />;
      case "clock":
        return <Clock className="h-6 w-6" />;
      case "globe":
        return <Globe className="h-6 w-6" />;
      default:
        return <Users className="h-6 w-6" />;
    }
  };

  const getTranslatedStatName = (name: string) => {
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
        return language === "ar" ? name : name;
    }
  };

  const statGradients = [
    "from-violet-500 via-purple-500 to-fuchsia-500",
    "from-amber-500 via-orange-500 to-red-500",
    "from-emerald-500 via-teal-500 to-cyan-500",
    "from-pink-500 via-rose-500 to-red-500"
  ];

  const valueCards = [
    {
      text: getAboutContent('innovation_text_ar', language as "ar" | "en") || t("about.innovation"),
      gradient: "from-violet-500 to-purple-500",
      icon: "✨"
    },
    {
      text: getAboutContent('quality_text_ar', language as "ar" | "en") || t("about.quality"),
      gradient: "from-amber-500 to-orange-500",
      icon: "🎯"
    },
    {
      text: getAboutContent('partnership_text_ar', language as "ar" | "en") || t("about.partnership"),
      gradient: "from-emerald-500 to-teal-500",
      icon: "🤝"
    }
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Clean light background with subtle purple wave - matching reference */}
      <div className="absolute inset-0 -z-10">
        {/* Light gray base */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-slate-100/80 dark:from-slate-900/50 dark:to-slate-800/30"></div>
        
        {/* Subtle purple/pink gradient wave at bottom */}
        <svg className="absolute bottom-0 left-0 w-full h-40" preserveAspectRatio="none" viewBox="0 0 1440 160">
          <defs>
            <linearGradient id="aboutWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
              <stop offset="50%" stopColor="hsl(280, 70%, 60%)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path fill="url(#aboutWaveGradient)" d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,160 L0,160 Z"></path>
        </svg>
      </div>
      
      {/* Full-width text background with curved edges */}
      <div className="relative mb-16">
        {/* Top curved wave */}
        <svg className="absolute -top-16 left-0 w-full h-20" preserveAspectRatio="none" viewBox="0 0 1440 80">
          <defs>
            <linearGradient id="aboutTopWave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
              <stop offset="50%" stopColor="hsl(280, 70%, 60%)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path fill="url(#aboutTopWave)" d="M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 L0,80 Z"></path>
        </svg>
        
        {/* Main gradient background - larger padding */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-accent/8 to-primary/10 dark:from-primary/20 dark:via-accent/15 dark:to-primary/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-slate-900/40"></div>
        
        {/* Decorative flowing shapes - larger and more prominent */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-accent/20 to-primary/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-48 bg-gradient-to-r from-transparent via-primary/12 to-transparent blur-3xl rounded-full"></div>
        <div className="absolute top-1/4 right-1/3 w-40 h-40 bg-gradient-to-br from-violet-400/15 to-fuchsia-400/10 rounded-full blur-2xl"></div>
        
        {/* Content with extra padding */}
        <div className="container mx-auto px-4 relative py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-800/80 text-primary text-sm font-semibold mb-8 backdrop-blur-md border border-primary/20 shadow-xl shadow-primary/10">
              <Star className="w-4 h-4" />
              {t("about.title")}
            </div>
            <h2 className="font-bold mb-8 tracking-tight text-5xl md:text-6xl">
              <span className="olu-text-gradient">
                {getAboutContent('title_ar', language as "ar" | "en") || t("about.title")}
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10">
              {getAboutContent('subtitle_ar', language as "ar" | "en") || t("about.subtitle")}
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto">
              {getAboutContent('description_ar', language as "ar" | "en") || t("about.description")}
            </p>
          </div>
        </div>
        
        {/* Bottom curved wave */}
        <svg className="absolute -bottom-16 left-0 w-full h-20" preserveAspectRatio="none" viewBox="0 0 1440 80">
          <defs>
            <linearGradient id="aboutBottomWave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
              <stop offset="50%" stopColor="hsl(280, 70%, 60%)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path fill="url(#aboutBottomWave)" d="M0,0 C240,50 480,20 720,40 C960,60 1200,20 1440,50 L1440,0 L0,0 Z"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
          
        <div className={`${isVisible ? "animate-fade-in" : "opacity-0"} max-w-5xl mx-auto`} style={{ animationDelay: "0.2s" }}>
          
          {/* Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {valueCards.map((card, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-all duration-500`}></div>
                <div className="relative bg-card border border-border/50 p-8 rounded-3xl hover:shadow-xl hover:-translate-y-2 transition-all duration-500 text-center">
                  <span className="text-3xl mb-4 block">{card.icon}</span>
                  <p className="font-semibold text-foreground/90">{card.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {loading ? (
              Array(4).fill(0).map((_, index) => (
                <div key={`stat-skeleton-${index}`} className="flex flex-col items-center text-center p-8 bg-card border border-border/50 rounded-3xl animate-pulse">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-muted mb-4"></div>
                  <div className="h-10 w-20 bg-muted rounded mb-2"></div>
                  <div className="h-4 w-24 bg-muted rounded"></div>
                </div>
              ))
            ) : stats.length > 0 ? (
              stats.map((stat, index) => (
                <div 
                  key={stat.id} 
                  className="relative group flex flex-col items-center text-center p-8 bg-card border border-border/50 rounded-3xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${statGradients[index % 4]} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${statGradients[index % 4]} text-white mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {getIcon(stat.icon)}
                  </div>
                  <h4 className="text-4xl font-bold mb-2 olu-text-gradient">{stat.value}</h4>
                  <p className="text-sm text-muted-foreground font-medium">
                    {getTranslatedStatName(stat.name)}
                  </p>
                </div>
              ))
            ) : (
              <>
                {[
                  { icon: Users, value: "100+", label: language === "ar" ? t("stats.clients") : "Satisfied Clients", gradient: statGradients[0] },
                  { icon: Award, value: "50+", label: language === "ar" ? t("stats.projects") : "Completed Projects", gradient: statGradients[1] },
                  { icon: Clock, value: "4+", label: language === "ar" ? t("stats.experience") : "Years Experience", gradient: statGradients[2] },
                  { icon: Globe, value: "25+", label: language === "ar" ? t("stats.technologies") : "Technologies Used", gradient: statGradients[3] }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="relative group flex flex-col items-center text-center p-8 bg-card border border-border/50 rounded-3xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${item.gradient} text-white mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <item.icon className="h-7 w-7" />
                    </div>
                    <h4 className="text-4xl font-bold mb-2 olu-text-gradient">{item.value}</h4>
                    <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
                  </div>
                ))}
              </>
            )}
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              variant="default" 
              size="lg" 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-full px-8 py-6 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 border-0"
            >
              {getAboutContent('cta_text_ar', language as "ar" | "en") || t("about.askQuestion")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
