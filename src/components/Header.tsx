import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.svg";
import { scrollToTop } from "@/lib/globalSmoothScroll";
import { useLanguage } from "@/contexts/LanguageContext";
import ThemeSelector from "@/components/ThemeSelector";

const Header = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t("nav_about"), href: "/about" },
    { label: t("nav_services"), href: "/services" },
    { label: t("nav_team"), href: "/team" },
    { label: t("nav_insights"), href: "/insights" },
    { label: t("nav_careers"), href: "/careers" },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      scrollToTop(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-4 lg:mx-8 transition-all duration-500 rounded-2xl ${
          isScrolled
            ? "bg-background/95 shadow-elegant border border-burgundy/10 py-3 px-4 lg:px-8"
            : "bg-transparent py-0 px-2 lg:px-4"
        }`}
      >
        <nav className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" onClick={handleLogoClick} className="flex items-center group">
            <span className="rounded-xl bg-[#FAF7F5]/95 px-3 py-1.5 shadow-elegant border border-burgundy/10 group-hover:border-burgundy/25 transition-all duration-300">
              <img
                src={logo}
                alt="Abdallah Law Firm"
                className="h-9"
              />
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full px-2 py-1.5 border border-burgundy/15 bg-background/95">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-burgundy/10 px-4 py-2 rounded-full transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Action Bar: Theme Selector + Language Switcher + Contact Button */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeSelector />

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-burgundy/20 bg-background/90 hover:bg-background text-xs font-semibold text-foreground transition-all duration-200 shadow-sm"
              title={language === "en" ? "التحويل إلى العربية" : "Switch to English"}
            >
              <Globe className="w-3.5 h-3.5 text-luxury-gold" />
              <span>{language === "en" ? "العربية" : "EN"}</span>
            </button>

            {/* Contact CTA */}
            <Link to="/contact">
              <Button className="rounded-full px-6 text-sm font-medium border-0 shadow-[0_0_24px_rgba(82,11,16,0.3)]">
                {t("nav_contact")}
              </Button>
            </Link>
          </div>

          {/* Mobile Actions & Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-burgundy/20 bg-background/90 text-xs font-semibold text-foreground"
            >
              <Globe className="w-3.5 h-3.5 text-luxury-gold" />
              <span>{language === "en" ? "العربية" : "EN"}</span>
            </button>

            <button
              className="p-2 rounded-xl border border-burgundy/15 bg-background/70 touch-target"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>

        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mx-4 mt-2 glass-panel p-5 bg-background/95 backdrop-blur-md border border-burgundy/20"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/50">
                <span className="text-xs font-semibold uppercase text-muted-foreground">{t("theme_selector")}</span>
                <ThemeSelector compact />
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-foreground/90 font-medium py-2.5 px-4 rounded-xl hover:bg-burgundy/10 transition-colors text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="mt-3 rounded-full w-full border-0">
                  {t("nav_contact")}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
