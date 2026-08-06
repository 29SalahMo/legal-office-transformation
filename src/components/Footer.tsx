import { Link } from "react-router-dom";
import { Linkedin, Facebook, ArrowUpRight, ArrowLeft } from "lucide-react";
import StyledAmpersand from "@/components/StyledAmpersand";
import logo from "@/assets/logo.svg";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t, language } = useLanguage();

  const footerLinks = [
    { label: t("nav_about"), href: "/about" },
    { label: t("nav_services"), href: "/services" },
    { label: t("nav_team"), href: "/team" },
    { label: t("nav_insights"), href: "/insights" },
    { label: t("nav_careers"), href: "/careers" },
    { label: t("nav_contact"), href: "/contact" },
  ];

  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowUpRight;

  return (
    <footer data-beam-section="contact" className="relative border-t border-navy/15 bg-navy text-cream py-16 lg:py-20">
      <div className="absolute top-0 left-0 right-0 luxury-divider" />
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="inline-block rounded-xl bg-[#FAF7F5]/95 px-3 py-2 border border-burgundy/10">
                <img
                  src={logo}
                  alt="Abdallah Law Firm"
                  className="h-10"
                />
              </span>
            </div>
            <p className="text-white/60 leading-relaxed max-w-md mb-6 font-light text-sm">
              {t("footer_tagline")}
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/abdallahabuelnaga/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-white/10 bg-white/5 hover:border-burgundy/40 hover:bg-burgundy/15 transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 text-white/70 group-hover:text-luxury-gold" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100082889946960"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-white/10 bg-white/5 hover:border-burgundy/40 hover:bg-burgundy/15 transition-all duration-300 group"
              >
                <Facebook className="w-5 h-5 text-white/70 group-hover:text-luxury-gold" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-serif text-lg text-white mb-6 font-semibold">
              {t("footer_quick_links")}
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="beam-link text-white/60 hover:text-luxury-gold transition-colors duration-300 flex items-center gap-2 group text-sm font-light"
                  >
                    {link.label}
                    <ArrowIcon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h4 className="font-serif text-lg text-white mb-6 font-semibold">
              {t("nav_contact")}
            </h4>
            <ul className="space-y-3 text-white/60 text-sm font-light">
              <li>{t("footer_address")}</li>
              <li className="pt-2">
                <a href="tel:+20233456542" className="hover:text-luxury-gold transition-colors">
                  {t("footer_phone")}
                </a>
              </li>
              <li>
                <a href="mailto:info@asalegaladvisors.com" className="hover:text-luxury-gold transition-colors">
                  {t("footer_email")}
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="luxury-divider mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs">
          <p>© 2026 A<StyledAmpersand className="text-white/40" />A Legal Advisors. {t("footer_rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
