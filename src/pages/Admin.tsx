
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, LayoutDashboard, LogOut } from "lucide-react";
import PartnersManager from "@/components/admin/PartnersManager";
import ServicesManager from "@/components/admin/ServicesManager";
import PortfolioManager from "@/components/admin/PortfolioManager";
import ContactInquiries from "@/components/admin/ContactInquiries";
import HeroContentManager from "@/components/admin/HeroContentManager";
import AboutContentManager from "@/components/admin/AboutContentManager";
import FooterContentManager from "@/components/admin/FooterContentManager";
import SiteSettingsManager from "@/components/admin/SiteSettingsManager";
import SocialLinksManager from "@/components/admin/SocialLinksManager";
import StatsManager from "@/components/admin/StatsManager";
import FAQManager from "@/components/admin/FAQManager";

const AdminPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
      }
      setAuthChecking(false);
    };
    
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    
    try {
      console.log("Attempting login with:", { email, password });
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard",
      });
      
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error("Login error:", error);
      setLoginError(error.message || "Please check your credentials");
      toast({
        title: "Login Failed",
        description: error.message || "Please check your credentials",
        variant: "destructive",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    toast({
      title: "Signed out",
      description: "You have been successfully signed out",
    });
  };

  if (authChecking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-16 h-16 border-4 border-olu-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-xl shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="text-muted-foreground mt-2">Sign in to access the admin panel</p>
          </div>
          
          {loginError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full olu-gold-gradient"
              disabled={loginLoading}
            >
              {loginLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          
          <div className="text-center text-sm text-muted-foreground mt-4">
            <p>Default credentials:</p>
            <p>Email: admin@olu-it.com</p>
            <p>Password: Admin@123</p>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard when authenticated
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
        <Tabs defaultValue="site-settings" className="w-full">
          <TabsList className="grid grid-cols-9 mb-8">
            <TabsTrigger value="site-settings">Site Settings</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          </TabsList>
          
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
          
          <TabsContent value="partners">
            <PartnersManager />
          </TabsContent>
          
          <TabsContent value="portfolio">
            <PortfolioManager />
          </TabsContent>
          
          <TabsContent value="faq">
            <FAQManager />
          </TabsContent>
          
          <TabsContent value="social">
            <SocialLinksManager />
          </TabsContent>
          
          <TabsContent value="inquiries">
            <ContactInquiries />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
