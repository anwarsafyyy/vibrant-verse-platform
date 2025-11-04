import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ImportantLinks from "./pages/ImportantLinks";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import CancellationPolicy from "./pages/CancellationPolicy";
import AboutCompany from "./pages/AboutCompany";
import Blog from "./pages/Blog";
import { LanguageProvider } from "@/hooks/useLanguage";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/important-links" element={<ImportantLinks />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="/cancellation-policy" element={<CancellationPolicy />} />
              <Route path="/about-company" element={<AboutCompany />} />
              <Route path="/blog" element={<Blog />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
