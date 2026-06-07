import { Link } from "react-router-dom";
import { Linkedin, Facebook, ArrowUpRight } from "lucide-react";
import StyledAmpersand from "@/components/StyledAmpersand";
import logo from "@/assets/logo.svg";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
  { label: "Join", href: "/careers" },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-[#050816]/80 backdrop-blur-xl py-16 lg:py-20">
      <div className="absolute top-0 left-0 right-0 luxury-divider" />
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
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
            <p className="text-white/60 leading-relaxed max-w-md mb-6">
              A boutique law firm offering first-class, creative, and business-aware legal
              solutions with over 25 years of experience, collaborating with international
              law firms to deliver quality-driven results.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/abdallahabuelnaga/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-white/10 bg-white/5 hover:border-burgundy/40 hover:bg-burgundy/15 transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 text-white/70 group-hover:text-burgundy-light" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100082889946960"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-white/10 bg-white/5 hover:border-burgundy/40 hover:bg-burgundy/15 transition-all duration-300 group"
              >
                <Facebook className="w-5 h-5 text-white/70 group-hover:text-burgundy-light" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-burgundy-light transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-white mb-6">Contact</h4>
            <ul className="space-y-4 text-white/60">
              <li>20, Kawthar St, Al Dokki, Giza</li>
              <li>5th Floor</li>
              <li className="pt-2">
                <a href="tel:+20233456542" className="hover:text-burgundy-light transition-colors">
                  02 334 565 42
                </a>
              </li>
              <li>
                <a href="mailto:info@asalegaladvisors.com" className="hover:text-burgundy-light transition-colors">
                  info@asalegaladvisors.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="luxury-divider mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <p>© 2026 A<StyledAmpersand className="text-white/40" />A Legal Advisors. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white/70 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
