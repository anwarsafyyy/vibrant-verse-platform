
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, className }) => {
  return (
    <Card className={`service-card hover:border-olu-cyan/50 group ${className}`}>
      <CardHeader className="pb-2">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-olu-blue to-olu-cyan mb-4 text-white group-hover:scale-110 transition-transform">
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl group-hover:olu-text-gradient transition-all duration-300">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
