
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, LogOut } from "lucide-react";
import PartnersManager from "@/components/admin/PartnersManager";
import ServicesManager from "@/components/admin/ServicesManager";
import PortfolioManager from "@/components/admin/PortfolioManager";
import ContactInquiries from "@/components/admin/ContactInquiries";

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { toast } = useToast();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    toast({
      title: "Signed out",
      description: "You have been successfully signed out",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex border-b border-border">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-olu-gold" />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
      
      <div className="container mx-auto py-8">
        <Tabs defaultValue="partners" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="inquiries">Contact Inquiries</TabsTrigger>
          </TabsList>
          
          <TabsContent value="partners">
            <PartnersManager />
          </TabsContent>
          
          <TabsContent value="services">
            <ServicesManager />
          </TabsContent>
          
          <TabsContent value="portfolio">
            <PortfolioManager />
          </TabsContent>
          
          <TabsContent value="inquiries">
            <ContactInquiries />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
