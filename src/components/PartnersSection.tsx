
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

  // Inner orbit partners
  const innerOrbitPartners = [
    { name: 'VMware', color: '#5e5d5d' },
    { name: 'SAP', color: '#0057c2' },
    { name: 'Construx', color: '#00a651' },
    { name: 'Juniper', color: '#00a3e0' },
    { name: 'Oracle', color: '#c74634' },
    { name: 'Microsoft', color: '#00a4ef' },
  ];

  // Outer orbit partners
  const outerOrbitPartners = [
    { name: 'AWS', color: '#FF9900' },
    { name: 'Google', color: '#4285F4' },
    { name: 'IBM', color: '#0530AD' },
    { name: 'Cisco', color: '#049FD9' },
    { name: 'Dell', color: '#007DB8' },
    { name: 'HP', color: '#0096D6' },
    { name: 'Intel', color: '#0071C5' },
    { name: 'Adobe', color: '#FF0000' },
  ];

  const displayInnerPartners = partners.length > 0 
    ? partners.slice(0, 6)
    : innerOrbitPartners.map((p, i) => ({ id: `inner-${i}`, name: p.name, logo_url: '', order_index: i, created_at: null, color: p.color }));

  const displayOuterPartners = partners.length > 6 
    ? partners.slice(6, 14)
    : outerOrbitPartners.map((p, i) => ({ id: `outer-${i}`, name: p.name, logo_url: '', order_index: i + 6, created_at: null, color: p.color }));

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
        <div className={`relative flex items-center justify-center ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`} style={{ height: '600px' }}>
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
              {/* Inner orbit ring */}
              <div 
                className="absolute border-2 border-primary/20 rounded-full animate-spin-slow"
                style={{ 
                  width: '300px', 
                  height: '300px',
                  animationDuration: '60s'
                }}
              />
              
              {/* Outer orbit ring */}
              <div 
                className="absolute border-2 border-primary/15 rounded-full animate-spin-slow"
                style={{ 
                  width: '520px', 
                  height: '520px',
                  animationDuration: '80s',
                  animationDirection: 'reverse'
                }}
              />

              {/* Decorative outer ring */}
              <div 
                className="absolute border border-primary/10 rounded-full animate-spin-slow"
                style={{ 
                  width: '580px', 
                  height: '580px',
                  animationDuration: '100s'
                }}
              />

              {/* Inner rotating container for partners */}
              <div 
                className="absolute animate-spin-slow"
                style={{ 
                  width: '300px', 
                  height: '300px',
                  animationDuration: '25s'
                }}
              >
                {displayInnerPartners.map((partner, index) => {
                  const total = displayInnerPartners.length;
                  const { angle } = getOrbitPosition(index, total, 150);
                  
                  return (
                    <div
                      key={partner.id}
                      className="absolute"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${angle}deg) translateX(150px) rotate(-${angle}deg)`,
                        marginLeft: '-36px',
                        marginTop: '-36px',
                      }}
                    >
                      <div 
                        className="animate-spin-slow"
                        style={{ 
                          animationDuration: '25s',
                          animationDirection: 'reverse'
                        }}
                      >
                        <div className="relative group">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
                          <div className="relative w-[72px] h-[72px] md:w-20 md:h-20 bg-card rounded-full flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 border-2 border-border">
                            {partner.logo_url ? (
                              <img
                                src={partner.logo_url}
                                alt={`${partner.name} Logo`}
                                className="w-3/4 h-3/4 object-contain"
                              />
                            ) : (
                              <span 
                                className="text-xs md:text-sm font-bold text-center px-1"
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

              {/* Outer rotating container for partners */}
              <div 
                className="absolute animate-spin-slow"
                style={{ 
                  width: '520px', 
                  height: '520px',
                  animationDuration: '40s',
                  animationDirection: 'reverse'
                }}
              >
                {displayOuterPartners.map((partner, index) => {
                  const total = displayOuterPartners.length;
                  const { angle } = getOrbitPosition(index, total, 260);
                  
                  return (
                    <div
                      key={partner.id}
                      className="absolute"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${angle}deg) translateX(260px) rotate(-${angle}deg)`,
                        marginLeft: '-32px',
                        marginTop: '-32px',
                      }}
                    >
                      <div 
                        className="animate-spin-slow"
                        style={{ 
                          animationDuration: '40s'
                        }}
                      >
                        <div className="relative group">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
                          <div className="relative w-16 h-16 md:w-[72px] md:h-[72px] bg-card rounded-full flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 border-2 border-border">
                            {partner.logo_url ? (
                              <img
                                src={partner.logo_url}
                                alt={`${partner.name} Logo`}
                                className="w-3/4 h-3/4 object-contain"
                              />
                            ) : (
                              <span 
                                className="text-xs font-bold text-center px-1"
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
              <div className="absolute w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/30">
                <div className="w-10 h-10 bg-primary/20 rounded-full animate-pulse" />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
