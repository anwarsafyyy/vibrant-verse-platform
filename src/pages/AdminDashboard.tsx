
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LayoutDashboard, LogOut } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل الخروج بنجاح",
      });
      navigate("/admin");
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "خطأ",
        description: "فشل تسجيل الخروج",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex border-b border-border">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6" />
            <h1 className="text-xl font-semibold">لوحة التحكم - Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            تسجيل الخروج
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="bg-card p-8 rounded-lg border" dir="rtl">
          <h2 className="text-2xl font-bold mb-4">مرحباً بك في لوحة التحكم</h2>
          <p className="text-muted-foreground mb-4">
            تم الانتقال بنجاح إلى Firebase. يمكنك الآن إدارة المحتوى من Firebase Console:
          </p>
          <div className="space-y-2">
            <a 
              href="https://console.firebase.google.com/project/oluwe-95bb0/firestore" 
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 hover:underline"
            >
              📊 Firestore Database - إدارة قاعدة البيانات
            </a>
            <a 
              href="https://console.firebase.google.com/project/oluwe-95bb0/authentication/users" 
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 hover:underline"
            >
              👥 Authentication - إدارة المستخدمين
            </a>
            <a 
              href="https://console.firebase.google.com/project/oluwe-95bb0/storage" 
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 hover:underline"
            >
              📁 Storage - إدارة الملفات
            </a>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              💡 ملاحظة: يمكنك إضافة البيانات مباشرة من Firebase Console أو تطوير مكونات الإدارة لاحقاً
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل الخروج بنجاح",
      });
      navigate("/admin");
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "خطأ",
        description: "فشل تسجيل الخروج",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex border-b border-border">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-gray-400" />
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
          <TabsList className="grid grid-cols-4 lg:grid-cols-10 mb-8 overflow-x-auto">
            <TabsTrigger value="site-settings" className="text-xs">إعدادات عامة</TabsTrigger>
            <TabsTrigger value="hero" className="text-xs">القسم الرئيسي</TabsTrigger>
            <TabsTrigger value="about" className="text-xs">من نحن</TabsTrigger>
            <TabsTrigger value="services" className="text-xs">الخدمات</TabsTrigger>
            <TabsTrigger value="portfolio" className="text-xs">الأعمال</TabsTrigger>
            <TabsTrigger value="partners" className="text-xs">الشركاء</TabsTrigger>
            <TabsTrigger value="social" className="text-xs">التواصل</TabsTrigger>
            <TabsTrigger value="footer" className="text-xs">التذييل</TabsTrigger>
            <TabsTrigger value="faq" className="text-xs">الأسئلة</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">التحليلات</TabsTrigger>
          </TabsList>
          
          <div className="grid grid-cols-3 gap-2 mb-8">
            <TabsList className="grid grid-cols-1">
              <TabsTrigger value="contact-settings" className="text-xs">إعدادات التواصل</TabsTrigger>
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
          
          <TabsContent value="contact-settings">
            <ContactSettingsManager />
          </TabsContent>
          
          <TabsContent value="footer">
            <div className="space-y-6">
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <h2 className="text-2xl font-semibold mb-2">إدارة الفوتر</h2>
                <p className="text-muted-foreground">
                  إدارة شاملة للروابط المهمة والمحتوى في أسفل الموقع
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-8">
                <div className="order-2 lg:order-1">
                  <FooterLinksManager />
                </div>
                <div className="order-1 lg:order-2">
                  <FooterContentManager />
                </div>
              </div>
            </div>
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
