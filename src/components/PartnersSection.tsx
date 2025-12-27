
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

  return (
    <section id="partners" className="py-16 lg:py-24 relative overflow-hidden bg-[#0a1628]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1e3a] via-[#0a1628] to-[#071020]" />
      
      {/* Orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px] border border-white/10 rounded-full animate-spin-slow" style={{ animationDuration: '60s' }} />
        <div className="absolute w-[400px] h-[400px] md:w-[650px] md:h-[650px] lg:w-[900px] lg:h-[900px] border border-white/5 rounded-full animate-spin-slow" style={{ animationDuration: '80s', animationDirection: 'reverse' }} />
        <div className="absolute w-[500px] h-[500px] md:w-[800px] md:h-[800px] lg:w-[1100px] lg:h-[1100px] border border-white/[0.03] rounded-full animate-spin-slow" style={{ animationDuration: '100s' }} />
      </div>

      {/* Small decorative dots on orbits */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-2 h-2 bg-white/30 rounded-full animate-spin-slow" style={{ animationDuration: '20s', transformOrigin: '250px center' }} />
        <div className="absolute w-1.5 h-1.5 bg-white/20 rounded-full animate-spin-slow" style={{ animationDuration: '30s', animationDirection: 'reverse', transformOrigin: '350px center' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {language === 'ar' ? 'معتمد من كبرى المؤسسات في المنطقة' : 'Trusted by Leading Organizations'}
          </h2>
        </div>

        {/* Partners Orbital Display */}
        <div className={`relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="grid grid-cols-3 gap-8">
                {Array(6).fill(0).map((_, index) => (
                  <Skeleton key={`skeleton-${index}`} className="w-20 h-20 rounded-full bg-white/10" />
                ))}
              </div>
            </div>
          ) : (
            <>
              {displayPartners.slice(0, 8).map((partner, index) => {
                const position = orbitPositions[index] || orbitPositions[index % orbitPositions.length];
                const animationDelay = index * 0.3;
                const floatDuration = 3 + (index % 3);
                
                return (
                  <div
                    key={partner.id}
                    className="absolute animate-float"
                    style={{
                      ...position,
                      animationDelay: `${animationDelay}s`,
                      animationDuration: `${floatDuration}s`,
                    }}
                  >
                    <div className="relative group">
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
                      
                      {/* Logo container */}
                      <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-black/50 transition-transform duration-500 group-hover:scale-110 border-2 border-white/50">
                        {partner.logo_url ? (
                          <img
                            src={partner.logo_url}
                            alt={`${partner.name} Logo`}
                            className="w-3/4 h-3/4 object-contain"
                          />
                        ) : (
                          <span 
                            className="text-sm md:text-base lg:text-lg font-bold text-center px-2"
                            style={{ color: (partner as any).color || '#333' }}
                          >
                            {partner.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
