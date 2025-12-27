
import React, { useEffect, useState } from "react";
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
  const { language } = useLanguage();
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

  const defaultPartners = [
    { name: 'VMware', color: '#5e5d5d' },
    { name: 'SAP', color: '#0057c2' },
    { name: 'Construx', color: '#00a651' },
    { name: 'Juniper', color: '#00a3e0' },
    { name: 'Oracle', color: '#c74634' },
    { name: 'Microsoft', color: '#00a4ef' },
  ];

  // Positions for orbital layout - scattered around the orbit
  const orbitPositions = [
    { top: '10%', left: '50%', transform: 'translateX(-50%)' },
    { top: '30%', left: '15%' },
    { top: '30%', right: '15%' },
    { top: '55%', left: '8%' },
    { top: '55%', right: '8%' },
    { top: '75%', left: '30%' },
    { top: '75%', right: '30%' },
    { top: '85%', left: '50%', transform: 'translateX(-50%)' },
  ];

  const displayPartners = partners.length > 0 
    ? partners 
    : defaultPartners.map((p, i) => ({ id: `default-${i}`, name: p.name, logo_url: '', order_index: i, created_at: null, color: p.color }));

  // Calculate positions on circular orbit
  const getOrbitPosition = (index: number, total: number, radius: number) => {
    const angle = (index * 360) / total;
    return { angle, radius };
  };

  return (
    <section id="partners" className="py-16 lg:py-24 relative overflow-hidden bg-background">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {language === 'ar' ? 'شركاؤنا' : 'Our Partners'}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {language === 'ar' ? 'المنشآت الرائدة التي نفتخر بشراكتها' : 'Leading organizations we are proud to partner with'}
          </p>
        </div>

        {/* Partners Circular Orbit Display */}
        <div className={`relative flex items-center justify-center ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`} style={{ height: '500px' }}>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="grid grid-cols-3 gap-8">
                {Array(6).fill(0).map((_, index) => (
                  <Skeleton key={`skeleton-${index}`} className="w-20 h-20 rounded-full bg-muted" />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Orbit ring */}
              <div 
                className="absolute border-2 border-primary/20 rounded-full animate-spin-slow"
                style={{ 
                  width: '400px', 
                  height: '400px',
                  animationDuration: '60s'
                }}
              />
              
              {/* Second orbit ring */}
              <div 
                className="absolute border border-primary/10 rounded-full animate-spin-slow"
                style={{ 
                  width: '450px', 
                  height: '450px',
                  animationDuration: '80s',
                  animationDirection: 'reverse'
                }}
              />

              {/* Rotating container for partners */}
              <div 
                className="absolute animate-spin-slow"
                style={{ 
                  width: '400px', 
                  height: '400px',
                  animationDuration: '30s'
                }}
              >
                {displayPartners.slice(0, 8).map((partner, index) => {
                  const total = Math.min(displayPartners.length, 8);
                  const { angle, radius } = getOrbitPosition(index, total, 200);
                  
                  return (
                    <div
                      key={partner.id}
                      className="absolute"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
                        marginLeft: '-40px',
                        marginTop: '-40px',
                      }}
                    >
                      {/* Counter-rotate to keep logos upright */}
                      <div 
                        className="animate-spin-slow"
                        style={{ 
                          animationDuration: '30s',
                          animationDirection: 'reverse'
                        }}
                      >
                        <div className="relative group">
                          {/* Glow effect */}
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
                          
                          {/* Logo container */}
                          <div className="relative w-20 h-20 md:w-24 md:h-24 bg-card rounded-full flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 border-2 border-border">
                            {partner.logo_url ? (
                              <img
                                src={partner.logo_url}
                                alt={`${partner.name} Logo`}
                                className="w-3/4 h-3/4 object-contain"
                              />
                            ) : (
                              <span 
                                className="text-sm md:text-base font-bold text-center px-2"
                                style={{ color: (partner as any).color || 'hsl(var(--foreground))' }}
                              >
                                {partner.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center decoration */}
              <div className="absolute w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border border-primary/30">
                <div className="w-8 h-8 bg-primary/20 rounded-full animate-pulse" />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
