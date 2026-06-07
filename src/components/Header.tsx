import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.svg";

const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        isScrolled
          ? "py-3"
          : "py-5"
      }`}
    >
      <div
        className={`mx-4 lg:mx-8 transition-all duration-500 rounded-2xl ${
          isScrolled
            ? "glass-panel shadow-elegant py-3 px-4 lg:px-8"
            : "bg-transparent py-0 px-2 lg:px-4"
        }`}
      >
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <img
              src={logo}
              alt="Abdallah Law Firm"
              className="h-9 brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </Link>

          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-1 rounded-full px-2 py-1.5 border border-white/10 bg-white/5 backdrop-blur-xl">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 px-5 py-2.5 rounded-full transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <Link to="/contact">
              <Button
                className="rounded-full px-6 bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-obsidian hover:opacity-90 border-0 shadow-[0_0_24px_rgba(212,175,55,0.2)]"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-xl border border-white/10 bg-white/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mx-4 mt-2 glass-panel p-4"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-white/80 font-medium py-3 px-4 rounded-xl hover:bg-white/5 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="mt-3 rounded-full bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-obsidian w-full border-0">
                  Contact Us
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
