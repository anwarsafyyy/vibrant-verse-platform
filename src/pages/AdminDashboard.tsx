
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, LogOut } from "lucide-react";
import PartnersManager from "@/components/admin/PartnersManager";
import ServicesManager from "@/components/admin/ServicesManager";
import PortfolioManager from "@/components/admin/PortfolioManager";
import ContactInquiries from "@/components/admin/ContactInquiries";
import StatsManager from "@/components/admin/StatsManager";
import SiteSettingsManager from "@/components/admin/SiteSettingsManager";
import HeroContentManager from "@/components/admin/HeroContentManager";
import AboutContentManager from "@/components/admin/AboutContentManager";
import SocialLinksManager from "@/components/admin/SocialLinksManager";
import FooterContentManager from "@/components/admin/FooterContentManager";
import AnalyticsManager from "@/components/admin/AnalyticsManager";
import FAQManager from "@/components/admin/FAQManager";

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
      // Redirect to home page after sign out
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex border-b border-border">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-olu-gold" />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center">
              <img 
                src="/public/alo.png" 
                alt="علو Logo" 
                className="h-8 w-auto mr-2" 
              />
              <span className="text-xl font-bold">علو</span>
            </a>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-8">
        <Tabs defaultValue="site-settings" className="w-full">
          <TabsList className="grid grid-cols-4 lg:grid-cols-9 mb-8 overflow-x-auto">
            <TabsTrigger value="site-settings" className="text-xs">إعدادات عامة</TabsTrigger>
            <TabsTrigger value="hero" className="text-xs">القسم الرئيسي</TabsTrigger>
            <TabsTrigger value="about" className="text-xs">من نحن</TabsTrigger>
            <TabsTrigger value="services" className="text-xs">الخدمات</TabsTrigger>
            <TabsTrigger value="portfolio" className="text-xs">الأعمال</TabsTrigger>
            <TabsTrigger value="partners" className="text-xs">الشركاء</TabsTrigger>
            <TabsTrigger value="social" className="text-xs">التواصل</TabsTrigger>
            <TabsTrigger value="faq" className="text-xs">الأسئلة</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">التحليلات</TabsTrigger>
          </TabsList>
          
          <div className="grid grid-cols-3 gap-2 mb-8">
            <TabsList className="grid grid-cols-1">
              <TabsTrigger value="footer" className="text-xs">التذييل</TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-1">
              <TabsTrigger value="stats" className="text-xs">الإحصائيات</TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-1">
              <TabsTrigger value="inquiries" className="text-xs">الرسائل</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="site-settings">
            <SiteSettingsManager />
          </TabsContent>
          
          <TabsContent value="hero">
            <HeroContentManager />
          </TabsContent>
          
          <TabsContent value="about">
            <AboutContentManager />
          </TabsContent>
          
          <TabsContent value="services">
            <ServicesManager />
          </TabsContent>
          
          <TabsContent value="portfolio">
            <PortfolioManager />
          </TabsContent>
          
          <TabsContent value="partners">
            <PartnersManager />
          </TabsContent>
          
          <TabsContent value="social">
            <SocialLinksManager />
          </TabsContent>
          
          <TabsContent value="faq">
            <FAQManager />
          </TabsContent>
          
          <TabsContent value="footer">
            <FooterContentManager />
          </TabsContent>
          
          <TabsContent value="stats">
            <StatsManager />
          </TabsContent>
          
          <TabsContent value="analytics">
            <AnalyticsManager />
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
