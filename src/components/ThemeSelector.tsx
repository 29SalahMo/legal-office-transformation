import React, { useState, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export type ThemePreset = "burgundy" | "navy" | "obsidian";

const THEME_PRESETS: { id: ThemePreset; nameEn: string; nameAr: string; primaryColor: string; accentColor: string; bgPreview: string }[] = [
  {
    id: "burgundy",
    nameEn: "Royal Burgundy",
    nameAr: "العنابي الملكي",
    primaryColor: "#520B10",
    accentColor: "#AA7C11",
    bgPreview: "#FAF7F5",
  },
  {
    id: "navy",
    nameEn: "Midnight Navy",
    nameAr: "الكحلي الفاخر",
    primaryColor: "#0B1020",
    accentColor: "#D4AF37",
    bgPreview: "#F8FAFC",
  },
  {
    id: "obsidian",
    nameEn: "Obsidian Dark",
    nameAr: "الأوبسيديان الداكن",
    primaryColor: "#0F172A",
    accentColor: "#E5C483",
    bgPreview: "#090D16",
  },
];

const ThemeSelector: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { t, language } = useLanguage();
  const [currentTheme, setCurrentTheme] = useState<ThemePreset>(() => {
    const saved = localStorage.getItem("app_theme") as ThemePreset;
    return saved && ["burgundy", "navy", "obsidian"].includes(saved) ? saved : "burgundy";
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("app_theme", currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "obsidian") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [currentTheme]);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-burgundy/15 bg-background/80 hover:bg-background text-xs font-medium text-muted-foreground hover:text-foreground transition-all duration-200"
        title={t("theme_selector")}
      >
        <Palette className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
        {!compact && (
          <span className="hidden sm:inline">
            {THEME_PRESETS.find((p) => p.id === currentTheme)?.[language === "ar" ? "nameAr" : "nameEn"]}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 rounded-2xl glass-panel p-2 shadow-card border border-burgundy/20 z-50 bg-background/95 backdrop-blur-md">
          <div className="text-[10px] uppercase font-semibold text-muted-foreground px-3 py-1.5 tracking-wider">
            {t("theme_selector")}
          </div>
          <div className="space-y-1">
            {THEME_PRESETS.map((preset) => {
              const isSelected = currentTheme === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setCurrentTheme(preset.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isSelected
                      ? "bg-burgundy/10 text-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-border shrink-0 shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${preset.primaryColor}, ${preset.accentColor})` }}
                    />
                    <span>{language === "ar" ? preset.nameAr : preset.nameEn}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-luxury-gold" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
