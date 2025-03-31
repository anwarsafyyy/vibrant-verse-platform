
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web Development",
    description: "A modern e-commerce platform with integrated payment gateway",
    image: "https://placehold.co/600x400/2C4B87/FFFFFF/webp?text=E-commerce",
    technologies: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "Smart Healthcare App",
    category: "Mobile App",
    description: "AI-powered healthcare application for remote patient monitoring",
    image: "https://placehold.co/600x400/00A7E1/FFFFFF/webp?text=Healthcare",
    technologies: ["React Native", "TensorFlow", "Firebase"],
  },
  {
    id: 3,
    title: "Education Portal",
    category: "Web Platform",
    description: "Comprehensive learning management system for schools",
    image: "https://placehold.co/600x400/2C4B87/FFFFFF/webp?text=Education",
    technologies: ["Vue.js", "Laravel", "MySQL"],
  },
  {
    id: 4,
    title: "Financial Dashboard",
    category: "Web Application",
    description: "Real-time financial monitoring and analytics dashboard",
    image: "https://placehold.co/600x400/00A7E1/FFFFFF/webp?text=Finance",
    technologies: ["Angular", "ASP.NET", "SQL Server"],
  },
];

const PortfolioSection: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section id="portfolio" className="min-h-screen relative flex items-center py-20">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="olu-text-gradient">{t("portfolio.title")}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-6">{t("portfolio.subtitle")}</p>
          <div className="w-24 h-1 olu-gradient mx-auto rounded-full"></div>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {portfolioItems.map((item) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-4">
                  <div className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full bg-card">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-black/60 text-white">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="bg-primary/5">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" className="group">
                        View Project
                        <ArrowRight className={`ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 ${dir === "rtl" ? "rtl-flip" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="relative static mx-2 translate-y-0" />
            <CarouselNext className="relative static mx-2 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default PortfolioSection;
