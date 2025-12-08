
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

  return (
    <section id="partners" className="py-28 lg:py-36 relative overflow-hidden bg-[#faf8f5]">
      <div className="container mx-auto px-4">
        {/* Header Row */}
        <div className={`flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} dir="ltr">
          
          {/* Left side - Discover More link */}
          <a 
            href="#contact" 
            className="text-primary font-bold text-lg hover:underline transition-all duration-300 order-2 lg:order-1"
          >
            {language === 'ar' ? 'اكتشف المزيد' : 'Discover More'}
          </a>
          
          {/* Right side - Header with diamond */}
          <div className="flex items-center gap-4 order-1 lg:order-2">
            <div className="text-right">
              <span className="text-primary font-bold text-xl">
                {language === 'ar' ? 'موثوق من قبل' : 'Trusted by'}
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="olu-text-gradient">
                  {language === 'ar' ? 'المنشآت الرائدة' : 'Leading Organizations'}
                </span>
              </h2>
            </div>
            {/* Decorative diamond icon */}
            <div className="relative">
              <div className="w-16 h-16 bg-primary rotate-45 rounded-xl shadow-lg shadow-primary/30" />
              <div className="absolute top-2 right-2 w-12 h-12 border-2 border-white/30 rotate-0 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            {language === 'ar' 
              ? 'العديد من الشركات التي تثق بحلولنا لتحسين عملياتها معنا'
              : 'Many companies trust our solutions to improve their operations with us'
            }
          </p>
        </div>

        {/* Partners Grid */}
        <div className={`${isVisible ? 'animate-fade-in stagger-3' : 'opacity-0'}`}>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array(4).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`} className="bg-card rounded-[2rem] p-8 border border-border/50">
                  <Skeleton className="w-full h-24" />
                </div>
              ))}
            </div>
          ) : partners.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {partners.map((partner, index) => (
                <div
                  key={partner.id}
                  className="group bg-card rounded-[2rem] p-8 lg:p-12 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl flex items-center justify-center min-h-[140px]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src={partner.logo_url}
                    alt={`${partner.name} Logo`}
                    className="max-w-full max-h-16 lg:max-h-20 object-contain transition-all duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Placeholder partner cards when no data */}
              {['VMware', 'SAP', 'Construx', 'Juniper'].map((name, index) => (
                <div
                  key={name}
                  className="group bg-card rounded-[2rem] p-8 lg:p-12 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl flex items-center justify-center min-h-[140px]"
                >
                  <span className="text-2xl font-bold text-muted-foreground/50">{name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
