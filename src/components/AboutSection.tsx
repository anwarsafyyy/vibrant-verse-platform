
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
      
      {/* Premium modern text background with contemporary design */}
      <div className="relative mb-20">
        {/* Organic blob shape - top */}
        <div className="absolute -top-32 left-0 w-full h-40 overflow-hidden">
          <svg className="absolute w-[200%] h-full -left-1/2" viewBox="0 0 2880 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="topBlobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(250, 90%, 65%)" stopOpacity="0.4" />
                <stop offset="30%" stopColor="hsl(280, 85%, 60%)" stopOpacity="0.35" />
                <stop offset="60%" stopColor="hsl(320, 80%, 55%)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(200, 90%, 60%)" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            <path fill="url(#topBlobGrad)" d="M0,200 Q360,80 720,140 T1440,100 T2160,160 T2880,120 L2880,200 L0,200 Z">
              <animate attributeName="d" dur="18s" repeatCount="indefinite" values="
                M0,200 Q360,80 720,140 T1440,100 T2160,160 T2880,120 L2880,200 L0,200 Z;
                M0,200 Q360,120 720,80 T1440,150 T2160,90 T2880,140 L2880,200 L0,200 Z;
                M0,200 Q360,80 720,140 T1440,100 T2160,160 T2880,120 L2880,200 L0,200 Z
              "/>
            </path>
          </svg>
        </div>
        
        {/* Multi-layer gradient background with depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-500/15 to-pink-500/20 dark:from-indigo-600/35 dark:via-purple-500/30 dark:to-pink-500/35"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-400/15 via-transparent to-rose-400/15 dark:from-cyan-400/25 dark:to-rose-400/25"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.5)_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.3)_0%,_transparent_70%)]"></div>
        
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        
        {/* Animated gradient orbs with smooth movement */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-conic from-violet-500/40 via-fuchsia-400/30 to-violet-500/40 rounded-full blur-3xl animate-[spin_30s_linear_infinite]"></div>
        <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-gradient-conic from-cyan-400/35 via-blue-500/25 to-cyan-400/35 rounded-full blur-3xl animate-[spin_25s_linear_infinite_reverse]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-80 bg-gradient-to-r from-violet-500/25 via-fuchsia-400/35 to-cyan-400/25 blur-3xl rounded-full opacity-80"></div>
        
        {/* Floating accent elements */}
        <div className="absolute top-16 left-[15%] w-32 h-32 bg-gradient-to-br from-amber-400/30 to-orange-500/20 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-16 right-[15%] w-40 h-40 bg-gradient-to-br from-emerald-400/25 to-teal-500/20 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-[10%] w-24 h-24 bg-gradient-to-br from-rose-400/30 to-pink-500/20 rounded-full blur-xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/3 left-[10%] w-28 h-28 bg-gradient-to-br from-blue-400/25 to-indigo-500/20 rounded-full blur-xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
        
        {/* Decorative geometric elements */}
        <div className="absolute top-24 right-[30%] w-20 h-20 border-2 border-primary/25 rounded-2xl rotate-12 animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute bottom-24 left-[30%] w-14 h-14 border-2 border-accent/25 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
        <div className="absolute top-1/2 right-[8%] w-3 h-3 bg-primary/40 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/4 left-[8%] w-2 h-2 bg-accent/40 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        
        {/* Content with luxurious padding */}
        <div className="container mx-auto px-4 relative py-28 md:py-36">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white/95 dark:bg-slate-800/95 text-primary text-sm font-black mb-12 backdrop-blur-2xl border border-primary/40 shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-shadow duration-500">
              <Star className="w-5 h-5 animate-pulse" />
              {t("about.title")}
            </div>
            <h2 className="font-black mb-12 tracking-tight text-5xl md:text-7xl lg:text-8xl drop-shadow-sm">
              <span className="olu-text-gradient">
                {getAboutContent('title_ar', language as "ar" | "en") || t("about.title")}
              </span>
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl text-foreground/80 leading-relaxed mb-14 font-semibold">
              {getAboutContent('subtitle_ar', language as "ar" | "en") || t("about.subtitle")}
            </p>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-muted-foreground max-w-3xl mx-auto">
              {getAboutContent('description_ar', language as "ar" | "en") || t("about.description")}
            </p>
          </div>
        </div>
        
        {/* Organic blob shape - bottom */}
        <div className="absolute -bottom-32 left-0 w-full h-40 overflow-hidden">
          <svg className="absolute w-[200%] h-full -left-1/2" viewBox="0 0 2880 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="bottomBlobGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(200, 90%, 60%)" stopOpacity="0.25" />
                <stop offset="30%" stopColor="hsl(320, 80%, 55%)" stopOpacity="0.3" />
                <stop offset="60%" stopColor="hsl(280, 85%, 60%)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="hsl(250, 90%, 65%)" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path fill="url(#bottomBlobGrad)" d="M0,0 Q360,120 720,60 T1440,100 T2160,40 T2880,80 L2880,0 L0,0 Z">
              <animate attributeName="d" dur="18s" repeatCount="indefinite" values="
                M0,0 Q360,120 720,60 T1440,100 T2160,40 T2880,80 L2880,0 L0,0 Z;
                M0,0 Q360,80 720,120 T1440,50 T2160,110 T2880,60 L2880,0 L0,0 Z;
                M0,0 Q360,120 720,60 T1440,100 T2160,40 T2880,80 L2880,0 L0,0 Z
              "/>
            </path>
          </svg>
        </div>
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
