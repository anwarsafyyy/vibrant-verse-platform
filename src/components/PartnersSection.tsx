
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

        {/* Partners Display - Animated Grid */}
        <div className={`${isVisible ? 'animate-fade-in stagger-3' : 'opacity-0'}`}>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array(6).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`} className="bg-card rounded-2xl p-6 border border-border/50">
                  <Skeleton className="w-full h-20" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {partners.length > 0 ? (
                partners.map((partner, index) => {
                  // Different animation styles for variety
                  const animations = [
                    'animate-float',
                    'animate-pulse-soft',
                    'animate-bounce-subtle',
                  ];
                  const animation = animations[index % animations.length];
                  const delay = index * 0.2;
                  
                  return (
                    <div
                      key={partner.id}
                      className={`group relative bg-card/90 backdrop-blur-sm rounded-2xl p-6 border border-border/30 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 overflow-hidden ${animation}`}
                      style={{ animationDelay: `${delay}s` }}
                    >
                      {/* Subtle glow on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                      
                      {/* Content */}
                      <div className="relative z-10 flex items-center justify-center h-20">
                        <img
                          src={partner.logo_url}
                          alt={`${partner.name} Logo`}
                          className="max-w-full max-h-full object-contain transition-all duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                defaultPartners.map((name, index) => {
                  const animations = [
                    'animate-float',
                    'animate-pulse-soft',
                    'animate-bounce-subtle',
                  ];
                  const animation = animations[index % animations.length];
                  const delay = index * 0.2;
                  const colors = [
                    'text-red-500',
                    'text-blue-600',
                    'text-green-600',
                    'text-purple-600',
                    'text-orange-500',
                    'text-cyan-600',
                  ];
                  
                  return (
                    <div
                      key={`${name}-${index}`}
                      className={`group relative bg-card/90 backdrop-blur-sm rounded-2xl p-6 border border-border/30 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 overflow-hidden ${animation}`}
                      style={{ animationDelay: `${delay}s` }}
                    >
                      {/* Subtle glow on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                      
                      {/* Content */}
                      <div className="relative z-10 flex items-center justify-center h-20">
                        <span className={`text-xl md:text-2xl font-bold ${colors[index]} group-hover:scale-110 transition-transform duration-300`}>{name}</span>
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
