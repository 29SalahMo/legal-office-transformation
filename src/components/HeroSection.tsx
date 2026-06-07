import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/usePageContent";
import partnerMaleFallback from "@/assets/partner-male.jpg";
import partnerFemaleFallback from "@/assets/partner-female.jpg";

const HeroSection = () => {
  const { getValue, getImageUrl } = usePageContent("home");

  const heading = getValue("hero_heading", "Legal Excellence, Tailored Solutions.");
  const subtext = getValue("hero_subtext", "Over 25 Years of Expertise in Litigation, Corporate Law, and Arbitration.");
  const partnerMale = getImageUrl("partner_male_image", partnerMaleFallback);
  const partnerFemale = getImageUrl("partner_female_image", partnerFemaleFallback);

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 lg:pt-32 lg:pb-28">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 ambient-glow bg-glow-blue/30 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 ambient-glow bg-glow-purple/20 animate-pulse-glow" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-luxury-gold to-luxury-gold-light animate-pulse" />
            <span className="text-sm text-white/70 tracking-wide uppercase">International Legal Advisory</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] mb-8"
            dangerouslySetInnerHTML={{ __html: heading.replace(/\n/g, "<br />") }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              to="/contact"
              className="magnetic-btn inline-flex items-center justify-center gap-2 h-14 px-10 text-base rounded-full font-medium bg-gradient-to-r from-[#D4AF37] to-[#F7D774] text-[#050816] shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all duration-300"
            >
              Start your consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
              asChild
            >
              <Link to="/services">Explore services</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="glass-panel inline-flex flex-col sm:flex-row items-center gap-6 px-6 py-5 mx-auto"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3 shrink-0">
                <img src={partnerMale} alt="Team member" className="w-10 h-10 rounded-full border-2 border-luxury-gold/50 object-cover" />
                <img src={partnerFemale} alt="Team member" className="w-10 h-10 rounded-full border-2 border-luxury-gold/50 object-cover" />
                <div className="w-10 h-10 rounded-full border-2 border-luxury-gold/50 bg-gradient-to-br from-luxury-gold to-luxury-gold-light flex items-center justify-center text-obsidian text-xs font-semibold">
                  50+
                </div>
              </div>
              <a
                href="#testimonials"
                className="text-white/70 text-sm hover:text-white transition-colors cursor-pointer text-left leading-snug"
              >
                Trusted by industry leaders.
                <br />
                Get exceptional results.
              </a>
            </div>

            <div className="hidden sm:block w-px h-8 bg-white/10" />

            <div className="flex items-center gap-5">
              <a href="https://www.linkedin.com/company/abdallahabuelnaga/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-luxury-gold-light transition-colors flex items-center gap-1 text-sm group">
                LinkedIn <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100082889946960" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-luxury-gold-light transition-colors flex items-center gap-1 text-sm group">
                Facebook <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-luxury-gold/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
