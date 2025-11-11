
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  style?: React.CSSProperties;
  gradientColors?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, className, style, gradientColors = "from-blue-500 to-cyan-500" }) => {
  return (
    <Card 
      className={`service-card group ${className}`} 
      style={style}
    >
      <CardHeader className="pb-4">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradientColors} mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl transition-all duration-500`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-xl lg:text-2xl group-hover:text-primary transition-all duration-300 tracking-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
