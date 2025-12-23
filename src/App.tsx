import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import ImportantLinks from "./pages/ImportantLinks";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import CancellationPolicy from "./pages/CancellationPolicy";
import AboutCompany from "./pages/AboutCompany";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { LanguageProvider } from "@/hooks/useLanguage";

// Admin components
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminHome } from "./components/admin/AdminHome";
import { ServicesManager } from "./components/admin/ServicesManager";
import { PortfolioManager } from "./components/admin/PortfolioManager";
import { PartnersManager } from "./components/admin/PartnersManager";
import { FAQManager } from "./components/admin/FAQManager";
import { ContactInquiries } from "./components/admin/ContactInquiries";
import { HeroContentManager } from "./components/admin/HeroContentManager";
import { AboutContentManager } from "./components/admin/AboutContentManager";
import { SocialLinksManager } from "./components/admin/SocialLinksManager";
import { FooterContentManager } from "./components/admin/FooterContentManager";
import { SiteSettingsManager } from "./components/admin/SiteSettingsManager";
import { BlogManager } from "./components/admin/BlogManager";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <div dir="rtl" className="font-sans">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminHome />} />
                  <Route path="hero" element={<HeroContentManager />} />
                  <Route path="about" element={<AboutContentManager />} />
                  <Route path="services" element={<ServicesManager />} />
                  <Route path="portfolio" element={<PortfolioManager />} />
                  <Route path="blog" element={<BlogManager />} />
                  <Route path="partners" element={<PartnersManager />} />
                  <Route path="faqs" element={<FAQManager />} />
                  <Route path="inquiries" element={<ContactInquiries />} />
                  <Route path="social-links" element={<SocialLinksManager />} />
                  <Route path="footer" element={<FooterContentManager />} />
                  <Route path="settings" element={<SiteSettingsManager />} />
                </Route>
                <Route path="/important-links" element={<ImportantLinks />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-use" element={<TermsOfUse />} />
                <Route path="/cancellation-policy" element={<CancellationPolicy />} />
                <Route path="/about-company" element={<AboutCompany />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
