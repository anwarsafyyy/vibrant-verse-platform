
import React, { useEffect, useState } from "react";
import { 
  Globe, 
  Code, 
  Cpu, 
  BarChart, 
  MoreHorizontal, 
  LucideIcon,
  Monitor,
  Smartphone,
  Shield,
  Zap,
  Camera,
  Headphones,
  Wifi,
  Database as DatabaseIcon,
  Cloud,
  Lock,
  Users,
  TrendingUp,
  Settings,
  Layers
} from "lucide-react";
import ServiceCard from "./ServiceCard";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
  created_at: any;
}

// Define mapping with proper types
const iconMap: Record<string, LucideIcon> = {
  'globe': Globe,
  'code': Code,
  'cpu': Cpu,
  'bar-chart': BarChart,
  'monitor': Monitor,
  'smartphone': Smartphone,
  'shield': Shield,
  'zap': Zap,
  'camera': Camera,
  'headphones': Headphones,
  'wifi': Wifi,
  'database': DatabaseIcon,
  'cloud': Cloud,
  'lock': Lock,
  'users': Users,
  'trending-up': TrendingUp,
  'settings': Settings,
  'layers': Layers,
};

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(
          collection(db, 'services'),
          orderBy('order_index', 'asc')
        );
        const snapshot = await getDocs(q);
        const servicesData: Service[] = [];
        snapshot.forEach(doc => {
          servicesData.push({ id: doc.id, ...doc.data() } as Service);
        });
        setServices(servicesData);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  const getIcon = (iconName: string): LucideIcon => {
    return iconMap[iconName] || MoreHorizontal;
  };

  // Define colorful gradients (avoiding purple, black, gray, white)
  const colorGradients = [
    "from-blue-500 to-cyan-600",        // Blue to Cyan
    "from-emerald-500 to-teal-600",     // Emerald to Teal
    "from-orange-500 to-red-600",       // Orange to Red
    "from-indigo-500 to-blue-600",      // Indigo to Blue
    "from-green-500 to-emerald-600",    // Green to Emerald
    "from-pink-500 to-rose-600",        // Pink to Rose
    "from-amber-500 to-orange-600",     // Amber to Orange
    "from-cyan-500 to-blue-600",        // Cyan to Blue
  ];

  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="font-bold mb-6 tracking-tight">
            <span className="olu-text-gradient">{t("services.title")}</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t("services.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            // Loading skeletons
            Array(4).fill(0).map((_, index) => (
              <div key={`skeleton-${index}`} className="p-6 border rounded-lg">
                <Skeleton className="h-16 w-16 rounded-lg mb-6" />
                <Skeleton className="h-7 w-3/4 mb-4" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))
          ) : services.length > 0 ? (
            // Service cards
            services.map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={getIcon(service.icon)}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
                gradientColors={colorGradients[index % colorGradients.length]}
              />
            ))
          ) : (
            // Fallback for no data
            <div className="col-span-full text-center py-10 text-muted-foreground">
              No services available.
            </div>
          )}
        </div>
        
      </div>
    </section>
  );
};

export default ServicesSection;
