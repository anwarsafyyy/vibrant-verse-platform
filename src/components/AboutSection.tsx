
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
      
      {/* Full-width modern text background with vibrant gradients */}
      <div className="relative mb-16">
        {/* Animated top wave - more dramatic curve */}
        <svg className="absolute -top-24 left-0 w-full h-32" preserveAspectRatio="none" viewBox="0 0 1440 120">
          <defs>
            <linearGradient id="aboutTopWaveVibrant" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(270, 80%, 60%)" stopOpacity="0.2" />
              <stop offset="25%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
              <stop offset="50%" stopColor="hsl(290, 85%, 55%)" stopOpacity="0.3" />
              <stop offset="75%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
              <stop offset="100%" stopColor="hsl(270, 80%, 60%)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path fill="url(#aboutTopWaveVibrant)" d="M0,120 C180,60 360,90 540,50 C720,10 900,70 1080,40 C1260,10 1380,80 1440,60 L1440,120 L0,120 Z">
            <animate attributeName="d" dur="12s" repeatCount="indefinite" values="
              M0,120 C180,60 360,90 540,50 C720,10 900,70 1080,40 C1260,10 1380,80 1440,60 L1440,120 L0,120 Z;
              M0,120 C180,80 360,40 540,70 C720,100 900,30 1080,60 C1260,90 1380,50 1440,80 L1440,120 L0,120 Z;
              M0,120 C180,60 360,90 540,50 C720,10 900,70 1080,40 C1260,10 1380,80 1440,60 L1440,120 L0,120 Z
            "/>
          </path>
        </svg>
        
        {/* Vibrant layered gradient backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-cyan-500/15 dark:from-violet-500/25 dark:via-fuchsia-500/20 dark:to-cyan-500/25"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/12 via-transparent to-accent/12"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60 dark:from-slate-900/40 dark:via-transparent dark:to-slate-900/40"></div>
        
        {/* Dynamic floating orbs with animation */}
        <div className="absolute top-0 left-[10%] w-96 h-96 bg-gradient-to-br from-violet-400/30 to-fuchsia-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-[10%] w-80 h-80 bg-gradient-to-br from-cyan-400/25 to-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-64 bg-gradient-to-r from-violet-500/15 via-fuchsia-500/25 to-violet-500/15 blur-3xl rounded-full"></div>
        <div className="absolute top-1/4 right-[20%] w-48 h-48 bg-gradient-to-br from-amber-400/20 to-orange-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-[15%] w-56 h-56 bg-gradient-to-br from-emerald-400/15 to-teal-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Geometric accent shapes */}
        <div className="absolute top-20 right-[25%] w-24 h-24 border-2 border-primary/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-20 left-[25%] w-16 h-16 border-2 border-accent/20 rounded-lg rotate-45 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        
        {/* Content with generous padding */}
        <div className="container mx-auto px-4 relative py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/90 dark:bg-slate-800/90 text-primary text-sm font-bold mb-10 backdrop-blur-xl border border-primary/30 shadow-2xl shadow-primary/20">
              <Star className="w-5 h-5" />
              {t("about.title")}
            </div>
            <h2 className="font-black mb-10 tracking-tight text-5xl md:text-7xl">
              <span className="olu-text-gradient">
                {getAboutContent('title_ar', language as "ar" | "en") || t("about.title")}
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
              {getAboutContent('subtitle_ar', language as "ar" | "en") || t("about.subtitle")}
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground/90 max-w-3xl mx-auto">
              {getAboutContent('description_ar', language as "ar" | "en") || t("about.description")}
            </p>
          </div>
        </div>
        
        {/* Animated bottom wave - smooth stylish curve */}
        <svg className="absolute -bottom-24 left-0 w-full h-32" preserveAspectRatio="none" viewBox="0 0 1440 120">
          <defs>
            <linearGradient id="aboutBottomWaveVibrant" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(270, 80%, 60%)" stopOpacity="0.2" />
              <stop offset="25%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
              <stop offset="50%" stopColor="hsl(290, 85%, 55%)" stopOpacity="0.3" />
              <stop offset="75%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
              <stop offset="100%" stopColor="hsl(270, 80%, 60%)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path fill="url(#aboutBottomWaveVibrant)" d="M0,0 C180,60 360,30 540,70 C720,110 900,50 1080,80 C1260,110 1380,40 1440,60 L1440,0 L0,0 Z">
            <animate attributeName="d" dur="12s" repeatCount="indefinite" values="
              M0,0 C180,60 360,30 540,70 C720,110 900,50 1080,80 C1260,110 1380,40 1440,60 L1440,0 L0,0 Z;
              M0,0 C180,40 360,80 540,50 C720,20 900,90 1080,60 C1260,30 1380,70 1440,40 L1440,0 L0,0 Z;
              M0,0 C180,60 360,30 540,70 C720,110 900,50 1080,80 C1260,110 1380,40 1440,60 L1440,0 L0,0 Z
            "/>
          </path>
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
