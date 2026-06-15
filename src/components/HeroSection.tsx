import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/usePageContent";
import { PARTNER_PHOTO_URLS } from "@/lib/partnerPhotos";
import { heroItem, heroStagger } from "@/lib/motionPresets";
import TeamMemberPhoto from "@/components/TeamMemberPhoto";

const HeroSection = () => {
  const { getValue } = usePageContent("home");

  const heading = getValue("hero_heading", "Legal Excellence, Tailored Solutions.");
  const subtext = getValue("hero_subtext", "Over 25 Years of Expertise in Litigation, Corporate Law, and Arbitration.");

  return (
    <section data-beam-section="hero" className="relative min-h-[100dvh] flex items-center pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-28 overflow-hidden">

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 ambient-glow bg-burgundy/25 animate-pulse-glow hidden sm:block" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-72 h-48 sm:h-72 ambient-glow bg-burgundy-light/15 animate-pulse-glow hidden sm:block" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(82,11,16,0.06),transparent_70%)]" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full max-w-full">
        <motion.div
          className="max-w-5xl mx-auto lg:mx-0 lg:max-w-2xl text-center lg:text-left w-full"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={heroItem}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-burgundy/25 bg-background/90 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-burgundy to-burgundy-light animate-pulse" />
            <span className="text-sm text-muted-foreground tracking-wide uppercase">
              International Legal Advisory
            </span>
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="font-serif text-fluid-hero text-foreground leading-[1.05] mb-6 sm:mb-8 px-2"
            dangerouslySetInnerHTML={{ __html: heading.replace(/\n/g, "<br />") }}
          />

          <motion.p
            variants={heroItem}
            className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed px-2"
          >
            {subtext}
          </motion.p>

          <motion.div
            variants={heroItem}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full max-w-md sm:max-w-none mx-auto px-2"
          >
            <Link
              to="/contact"
              className="magnetic-btn beam-button touch-target inline-flex items-center justify-center gap-2 h-14 px-8 sm:px-10 text-base rounded-full font-medium bg-gradient-to-r from-burgundy to-burgundy-light text-white shadow-[0_0_30px_rgba(82,11,16,0.35)] hover:shadow-[0_0_40px_rgba(82,11,16,0.5)] hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto"
            >
              Start your consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 border-border bg-background/60 text-foreground hover:bg-background hover:border-burgundy/30 backdrop-blur-sm w-full sm:w-auto touch-target"
              asChild
            >
              <Link to="/services">Explore services</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="glass-panel flex flex-col sm:inline-flex sm:flex-row items-center gap-4 sm:gap-6 px-4 sm:px-6 py-4 sm:py-5 mx-auto w-full max-w-xl sm:max-w-none"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3 shrink-0">
                <TeamMemberPhoto
                  name="Dr. Ahmed Abdallah"
                  photoUrl={PARTNER_PHOTO_URLS.ahmedAbdallah}
                  roleCategory="Partner"
                  className="w-10 h-10 rounded-full border-2 border-burgundy/50 object-cover"
                  fallbackClassName="w-10 h-10 rounded-full border-2 border-burgundy/50 text-xs"
                />
                <TeamMemberPhoto
                  name="Mr. Mohamed Abu El Naga"
                  photoUrl={PARTNER_PHOTO_URLS.mohamedAbuElNaga}
                  roleCategory="Partner"
                  className="w-10 h-10 rounded-full border-2 border-burgundy/50 object-cover"
                  fallbackClassName="w-10 h-10 rounded-full border-2 border-burgundy/50 text-xs"
                />
                <div className="w-10 h-10 rounded-full border-2 border-burgundy/50 bg-gradient-to-br from-burgundy to-burgundy-light flex items-center justify-center text-white text-xs font-semibold">
                  50+
                </div>
              </div>
              <a
                href="#testimonials"
                className="text-muted-foreground text-sm hover:text-foreground transition-colors cursor-pointer text-left leading-snug beam-link"
              >
                Trusted by industry leaders.
                <br />
                Get exceptional results.
              </a>
            </div>

            <div className="hidden sm:block w-px h-8 bg-border" />

            <div className="flex items-center gap-5">
              <a
                href="https://www.linkedin.com/company/abdallahabuelnaga/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-burgundy transition-colors flex items-center gap-1 text-sm group"
              >
                LinkedIn <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100082889946960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-burgundy transition-colors flex items-center gap-1 text-sm group"
              >
                Facebook <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-muted-foreground/70 text-xs tracking-widest uppercase">Scroll the journey</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-burgundy/70 to-transparent"
          animate={{ scaleY: [1, 0.6, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
