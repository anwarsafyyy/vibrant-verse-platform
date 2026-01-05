
import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

// Parallax hook
const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.innerHeight - rect.top;
        if (scrolled > 0) {
          setOffset(scrolled * speed * 0.1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { offset, elementRef };
};

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
  const { offset: decorOffset1, elementRef: decorRef1 } = useParallax(0.4);
  const { offset: decorOffset2, elementRef: decorRef2 } = useParallax(0.6);
  const { offset: decorOffset3, elementRef: decorRef3 } = useParallax(0.3);

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
    <section id="partners" className="py-16 lg:py-24 relative overflow-hidden bg-white">
      {/* Decorative diamond shapes with parallax */}
      <div 
        ref={decorRef1}
        className="absolute top-32 left-20 w-6 h-6 border-2 border-purple-400/30 rotate-45 hidden lg:block transition-transform duration-300"
        style={{ transform: `translateY(${decorOffset1}px) rotate(45deg)` }}
      />
      <div 
        ref={decorRef2}
        className="absolute bottom-40 left-32 w-4 h-4 border-2 border-purple-400/20 rotate-45 hidden lg:block transition-transform duration-300"
        style={{ transform: `translateY(${-decorOffset2}px) rotate(45deg)` }}
      />
      <div 
        ref={decorRef3}
        className="absolute top-1/2 right-16 w-8 h-8 border-2 border-purple-400/20 rotate-45 hidden lg:block transition-transform duration-300"
        style={{ transform: `translateY(${decorOffset3}px) rotate(45deg)` }}
      />
      <div 
        className="absolute top-20 right-1/4 w-5 h-5 border-2 border-purple-400/25 rotate-45 hidden lg:block"
      />
      <div 
        className="absolute bottom-24 right-20 w-7 h-7 border-2 border-purple-400/15 rotate-45 hidden lg:block"
      />

      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>


      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.2) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            {language === 'ar' ? 'شركاؤنا' : 'Our Partners'}
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
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
                className="absolute border-2 border-purple-400/30 rounded-full animate-spin-slow"
                style={{ 
                  width: '300px', 
                  height: '300px',
                  animationDuration: '60s',
                  boxShadow: '0 0 30px rgba(147, 51, 234, 0.15)'
                }}
              />
              
              {/* Outer orbit ring */}
              <div 
                className="absolute border-2 border-purple-400/20 rounded-full animate-spin-slow"
                style={{ 
                  width: '520px', 
                  height: '520px',
                  animationDuration: '80s',
                  animationDirection: 'reverse',
                  boxShadow: '0 0 40px rgba(124, 58, 237, 0.12)'
                }}
              />

              {/* Decorative outer ring */}
              <div 
                className="absolute border border-purple-400/15 rounded-full animate-spin-slow"
                style={{ 
                  width: '580px', 
                  height: '580px',
                  animationDuration: '100s'
                }}
              />

              {/* Small orbiting dots */}
              <div 
                className="absolute animate-spin-slow"
                style={{ 
                  width: '300px', 
                  height: '300px',
                  animationDuration: '15s'
                }}
              >
                <div className="absolute w-2 h-2 bg-purple-500/50 rounded-full" style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }} />
              </div>
              <div 
                className="absolute animate-spin-slow"
                style={{ 
                  width: '520px', 
                  height: '520px',
                  animationDuration: '20s',
                  animationDirection: 'reverse'
                }}
              >
                <div className="absolute w-1.5 h-1.5 bg-purple-400/40 rounded-full" style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }} />
              </div>

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
                          <div className="relative w-[72px] h-[72px] md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 border-2 border-purple-200/50">
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
                          <div className="relative w-16 h-16 md:w-[72px] md:h-[72px] bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 border-2 border-purple-200/50">
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

              {/* Center - Olu Logo */}
              <div className="absolute flex items-center justify-center">
                <div className="relative w-24 h-24 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center shadow-2xl border-2 border-purple-200/50">
                  <img 
                    src="/olu-logo.png" 
                    alt="Olu Logo" 
                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
