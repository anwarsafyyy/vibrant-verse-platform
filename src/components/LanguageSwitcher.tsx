
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/hooks/useLanguage";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "ar", name: "العربية", dir: "rtl" },
    { code: "en", name: "English", dir: "ltr" },
    { code: "fr", name: "Français", dir: "ltr" },
    { code: "tr", name: "Türkçe", dir: "ltr" },
    { code: "zh", name: "中文", dir: "ltr" },
    { code: "es", name: "Español", dir: "ltr" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`${
              language === lang.code ? "bg-muted font-medium" : ""
            } cursor-pointer`}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
