
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Users, Award, Clock, Globe } from "lucide-react";

const AboutSection: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section id="about" className="min-h-screen relative flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent"></div>
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="olu-text-gradient">{t("about.title")}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-6">{t("about.subtitle")}</p>
          <div className="w-24 h-1 olu-gradient mx-auto rounded-full mb-10"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <p className="text-lg mb-6">{t("about.description")}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-olu-blue/10 text-olu-blue">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">100+</h4>
                  <p className="text-sm text-muted-foreground">Satisfied Clients</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-olu-cyan/10 text-olu-cyan">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">50+</h4>
                  <p className="text-sm text-muted-foreground">Awards Won</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-olu-blue/10 text-olu-blue">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">10+</h4>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-olu-cyan/10 text-olu-cyan">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">25+</h4>
                  <p className="text-sm text-muted-foreground">Countries Served</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-olu-blue to-olu-cyan opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-md aspect-video bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-gray-500">علو</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-4/6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="grid grid-cols-2 gap-2 mt-6">
                      <div className="bg-olu-blue/10 dark:bg-olu-blue/20 h-20 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-olu-blue/30 dark:bg-olu-blue/40"></div>
                      </div>
                      <div className="bg-olu-cyan/10 dark:bg-olu-cyan/20 h-20 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-olu-cyan/30 dark:bg-olu-cyan/40"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Add useState hook for animation visibility
const isVisible = true;

export default AboutSection;
