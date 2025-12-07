
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  style?: React.CSSProperties;
  gradientColors?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  className, 
  style, 
  gradientColors = "from-violet-500 to-purple-500" 
}) => {
  return (
    <Card 
      className={`service-card group relative ${className}`} 
      style={style}
    >
      {/* Gradient border effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
      
      <CardHeader className="pb-4 relative z-10">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradientColors} mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl transition-all duration-500`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-xl lg:text-2xl group-hover:text-primary transition-all duration-300 tracking-tight">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <CardDescription className="text-base leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
          {description}
        </CardDescription>
      </CardContent>
      
      {/* Decorative corner accent */}
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${gradientColors} opacity-0 group-hover:opacity-5 rounded-bl-full transition-opacity duration-500`}></div>
    </Card>
  );
};

export default ServiceCard;
