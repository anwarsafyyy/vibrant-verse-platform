
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

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, className, style, gradientColors = "from-primary to-accent" }) => {
  return (
    <Card 
      className={`service-card group ${className}`} 
      style={style}
    >
      <CardHeader className="pb-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/10 mb-6 group-hover:bg-primary/20 transition-all duration-500">
          <Icon className="h-7 w-7 text-primary" />
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
