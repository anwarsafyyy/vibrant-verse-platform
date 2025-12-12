
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

  // Double the partners for seamless infinite scroll
  const displayPartners = partners.length > 0 ? [...partners, ...partners] : [];

  return (
    <section id="partners" className="py-20 lg:py-28 relative overflow-hidden bg-[#faf8f5]">
      <div className="container mx-auto px-4">
        {/* Unified Section Header */}
        <div className={`flex items-center gap-4 mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
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

        {/* Description - Long Text with consistent line spacing */}
        <div className={`mb-12 ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
          <p className="text-base md:text-lg text-muted-foreground leading-loose max-w-4xl">
            {language === 'ar' 
              ? 'العديد من الشركات التي تثق بحلولنا لتحسين عملياتها معنا. نفخر بشراكاتنا مع المؤسسات الرائدة في مختلف القطاعات.'
              : 'Many companies trust our solutions to improve their operations with us. We are proud of our partnerships with leading organizations across various sectors.'
            }
          </p>
        </div>

        {/* Partners Marquee - Auto scrolling */}
        <div className={`${isVisible ? 'animate-fade-in stagger-3' : 'opacity-0'}`}>
          {loading ? (
            <div className="flex gap-8">
              {Array(5).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`} className="bg-card rounded-2xl p-6 border border-border/50 flex-shrink-0">
                  <Skeleton className="w-32 h-16" />
                </div>
              ))}
            </div>
          ) : displayPartners.length > 0 ? (
            <div className="relative overflow-hidden">
              {/* Gradient masks for smooth edges */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#faf8f5] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#faf8f5] to-transparent z-10 pointer-events-none" />
              
              {/* Scrolling container */}
              <div className="flex animate-marquee hover:pause-animation">
                {displayPartners.map((partner, index) => (
                  <div
                    key={`${partner.id}-${index}`}
                    className="group bg-card rounded-2xl px-8 py-6 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl flex items-center justify-center mx-4 flex-shrink-0"
                  >
                    <img
                      src={partner.logo_url}
                      alt={`${partner.name} Logo`}
                      className="w-28 h-14 object-contain transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#faf8f5] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#faf8f5] to-transparent z-10 pointer-events-none" />
              
              <div className="flex animate-marquee">
                {['VMware', 'SAP', 'Construx', 'Juniper', 'Oracle', 'Microsoft', 'VMware', 'SAP', 'Construx', 'Juniper', 'Oracle', 'Microsoft'].map((name, index) => (
                  <div
                    key={`${name}-${index}`}
                    className="group bg-card rounded-2xl px-8 py-6 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl flex items-center justify-center mx-4 flex-shrink-0"
                  >
                    <span className="text-xl font-bold text-muted-foreground/50 whitespace-nowrap">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
