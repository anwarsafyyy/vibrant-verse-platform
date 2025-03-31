
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const NotFound = () => {
  const location = useLocation();
  const { dir } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <div className="mb-8">
          <div className="w-24 h-24 olu-gradient rounded-full mx-auto flex items-center justify-center text-white text-5xl font-bold">
            404
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 olu-text-gradient">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          {dir === "rtl" 
            ? "عذراً، الصفحة التي تبحث عنها غير موجودة."
            : "Sorry, the page you're looking for doesn't exist."}
        </p>
        <Button asChild className="olu-gradient text-white">
          <a href="/">
            {dir === "rtl" ? "العودة إلى الصفحة الرئيسية" : "Return to Homepage"}
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
