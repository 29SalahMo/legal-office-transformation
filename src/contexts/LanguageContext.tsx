import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language, TranslationKey } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  direction: "ltr" | "rtl";
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("app_language");
    return (saved === "ar" || saved === "en") ? saved : "en";
  });

  const direction = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    localStorage.setItem("app_language", language);
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    
    // Toggle font family attribute or class for Arabic rendering
    if (language === "ar") {
      document.body.classList.add("lang-ar");
    } else {
      document.body.classList.remove("lang-ar");
    }
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key: TranslationKey, fallback?: string): string => {
    const translated = translations[language]?.[key];
    if (translated) return translated;
    if (translations.en?.[key]) return translations.en[key];
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
