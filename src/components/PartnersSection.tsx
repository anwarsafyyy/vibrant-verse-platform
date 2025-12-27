
import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";


interface Partner {
  id: string;
  name: string;
  logo_url: string;
  order_index: number;
  created_at: any;
}

const PartnersSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById('partners');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const q = query(collection(db, 'partners'), orderBy('order_index', 'asc'));
        const snapshot = await getDocs(q);
        const partnersData: Partner[] = [];
        snapshot.forEach(doc => {
          partnersData.push({ id: doc.id, ...doc.data() } as Partner);
        });
        setPartners(partnersData);
      } catch (error) {
        console.error("Failed to fetch partners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  const defaultPartners = ['VMware', 'SAP', 'Construx', 'Juniper', 'Oracle', 'Microsoft'];

  return (
    <section id="partners" className="py-12 lg:py-16 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 dark:from-violet-950/20 dark:via-fuchsia-950/20 dark:to-pink-950/20" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      
      {/* Decorative elements */}
      <div className="absolute top-32 right-20 w-6 h-6 border-2 border-primary/30 rotate-45 hidden lg:block" />
      <div className="absolute bottom-40 left-32 w-4 h-4 border-2 border-primary/20 rotate-45 hidden lg:block" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Unified Section Header */}
        <div className={`flex items-center gap-4 mb-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Diamond icon container */}
          <div className="relative">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-accent rotate-45 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-white -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-primary font-bold text-base md:text-lg">
              {language === 'ar' ? 'شركاؤنا' : 'Our Partners'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="olu-text-gradient">
                {language === 'ar' ? 'المنشآت الرائدة' : 'Leading Organizations'}
              </span>
            </h2>
          </div>
        </div>

        {/* Description */}
        <div className={`mb-10 ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
          <p className="text-base md:text-lg text-muted-foreground leading-loose max-w-4xl">
            {language === 'ar' 
              ? 'العديد من الشركات التي تثق بحلولنا لتحسين عملياتها معنا. نفخر بشراكاتنا مع المؤسسات الرائدة في مختلف القطاعات.'
              : 'Many companies trust our solutions to improve their operations with us. We are proud of our partnerships with leading organizations across various sectors.'
            }
          </p>
        </div>

        {/* Partners Display - Hexagon-style Grid */}
        <div className={`${isVisible ? 'animate-fade-in stagger-3' : 'opacity-0'}`}>
          {loading ? (
            <div className="flex flex-wrap justify-center gap-6">
              {Array(6).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`} className="w-40 h-40 bg-card rounded-3xl border border-border/50">
                  <Skeleton className="w-full h-full rounded-3xl" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {partners.length > 0 ? (
                partners.map((partner, index) => {
                  const gradients = [
                    'from-violet-500 to-purple-600',
                    'from-purple-500 to-fuchsia-600',
                    'from-fuchsia-500 to-pink-600',
                    'from-indigo-500 to-violet-600',
                    'from-pink-500 to-rose-600',
                    'from-rose-500 to-orange-500',
                  ];
                  const gradient = gradients[index % gradients.length];
                  
                  return (
                    <div
                      key={partner.id}
                      className="group relative w-36 h-36 md:w-44 md:h-44 cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 scale-90 group-hover:scale-100`} />
                      
                      {/* Card */}
                      <div className="relative w-full h-full bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 group-hover:border-primary/50 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-3 overflow-hidden">
                        {/* Inner gradient on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                        
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full" style={{ transition: 'transform 0.8s, opacity 0.3s' }} />
                        
                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
                          <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                            <img
                              src={partner.logo_url}
                              alt={`${partner.name} Logo`}
                              className="max-w-full max-h-full object-contain transition-all duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                            />
                          </div>
                          <span className="mt-2 text-xs md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center line-clamp-1">{partner.name}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                defaultPartners.map((name, index) => {
                  const gradients = [
                    'from-violet-500 to-purple-600',
                    'from-purple-500 to-fuchsia-600',
                    'from-fuchsia-500 to-pink-600',
                    'from-indigo-500 to-violet-600',
                    'from-pink-500 to-rose-600',
                    'from-rose-500 to-orange-500',
                  ];
                  const gradient = gradients[index % gradients.length];
                  const icons = ['🏢', '💼', '🌐', '⚡', '🔷', '🚀'];
                  
                  return (
                    <div
                      key={`${name}-${index}`}
                      className="group relative w-36 h-36 md:w-44 md:h-44 cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 scale-90 group-hover:scale-100`} />
                      
                      {/* Card */}
                      <div className="relative w-full h-full bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 group-hover:border-primary/50 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-3 overflow-hidden">
                        {/* Inner gradient on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                        
                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
                          <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-2 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                            <span className="text-2xl md:text-3xl">{icons[index]}</span>
                          </div>
                          <span className="text-sm md:text-base font-bold text-muted-foreground group-hover:text-foreground transition-colors text-center">{name}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
