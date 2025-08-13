
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
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, className, style }) => {
  return (
    <Card 
      className={`service-card hover:shadow-lg hover:border-gray-400/50 group transition-all duration-300 ${className}`} 
      style={style}
    >
      <CardHeader className="pb-2">
        <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-gradient-to-br from-olu-purple to-olu-purple-dark mb-6 text-white group-hover:scale-110 transition-transform">
          <Icon className="h-8 w-8" />
        </div>
        <CardTitle className="text-xl lg:text-2xl group-hover:text-olu-purple-dark transition-all duration-300">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
        <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" className="text-olu-purple-dark hover:text-olu-purple-dark/80 hover:bg-olu-purple-dark/5 p-0">
            اقرأ المزيد
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
