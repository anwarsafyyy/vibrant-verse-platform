
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
      <CardHeader className="pb-3">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradientColors} mb-6 text-white shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
          <Icon className="h-8 w-8" />
        </div>
        <CardTitle className="text-xl lg:text-2xl group-hover:text-primary transition-all duration-300">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
        <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/5 p-0 h-auto font-semibold">
            اقرأ المزيد
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
