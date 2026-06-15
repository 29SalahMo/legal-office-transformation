import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

  // Track mouse coordinates for immersive 3D parallax shifts (no React state re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 22 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <section data-beam-section="hero" className="relative min-h-[100dvh] flex items-center pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
      
      {/* Background Architectural Grid & Glow */}
      <div className="architectural-grid opacity-25" />
      
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 sm:w-[500px] h-64 sm:h-[500px] ambient-glow bg-burgundy/10 pointer-events-none" 
          style={{ 
            x: useTransform(springX, (val) => val * -0.3), 
            y: useTransform(springY, (val) => val * -0.3) 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-48 sm:w-[400px] h-48 sm:h-[400px] ambient-glow bg-luxury-gold/5 pointer-events-none" 
          style={{ 
            x: useTransform(springX, (val) => val * 0.4), 
            y: useTransform(springY, (val) => val * 0.4) 
          }}
        />
      </motion.div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-full">
        <motion.div
          className="max-w-4xl mx-auto text-center w-full"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={heroItem}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-burgundy/25 bg-background/90 mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-luxury-gold to-luxury-gold-light animate-pulse" />
            <span className="text-xs text-muted-foreground tracking-widest uppercase font-semibold">
              Egypt's Elite Legal Counsel
            </span>
          </motion.div>

          {/* Cinematic Title Reveal */}
          <div className="overflow-hidden mb-6 sm:mb-8">
            <motion.h1
              variants={{
                hidden: { y: 80, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="font-serif text-fluid-hero text-foreground leading-[1.05] tracking-tight px-2"
              dangerouslySetInnerHTML={{ __html: heading.replace(/\n/g, "<br />") }}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            variants={heroItem}
            className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed px-2 font-light"
          >
            {subtext}
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            variants={heroItem}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full max-w-md sm:max-w-none mx-auto px-2"
          >
            <Link
              to="/contact"
              className="magnetic-btn beam-button touch-target inline-flex items-center justify-center gap-2 h-14 px-8 sm:px-10 text-base rounded-full font-medium bg-gradient-to-r from-burgundy to-burgundy-light text-white shadow-[0_0_30px_rgba(82,11,16,0.35)] hover:shadow-[0_0_40px_rgba(170,124,17,0.4)] hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto gold-shimmer-sweep"
            >
              Start your consultation
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 border-border bg-background/60 text-foreground hover:bg-background hover:border-burgundy/30 backdrop-blur-sm w-full sm:w-auto touch-target transition-all duration-300"
              asChild
            >
              <Link to="/services">Explore services</Link>
            </Button>
          </motion.div>

          {/* Trusted Badges */}
          <motion.div
            variants={heroItem}
            style={{ 
              x: useTransform(springX, (val) => val * 0.15), 
              y: useTransform(springY, (val) => val * 0.15) 
            }}
            className="glass-panel flex flex-col sm:inline-flex sm:flex-row items-center gap-4 sm:gap-6 px-6 py-4 mx-auto w-full max-w-xl sm:max-w-none shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3 shrink-0">
                <TeamMemberPhoto
                  name="Dr. Ahmed Abdallah"
                  photoUrl={PARTNER_PHOTO_URLS.ahmedAbdallah}
                  roleCategory="Partner"
                  className="w-10 h-10 rounded-full border-2 border-luxury-gold object-cover shadow-sm"
                  fallbackClassName="w-10 h-10 rounded-full border-2 border-luxury-gold text-xs"
                />
                <TeamMemberPhoto
                  name="Mr. Mohamed Abu El Naga"
                  photoUrl={PARTNER_PHOTO_URLS.mohamedAbuElNaga}
                  roleCategory="Partner"
                  className="w-10 h-10 rounded-full border-2 border-luxury-gold object-cover shadow-sm"
                  fallbackClassName="w-10 h-10 rounded-full border-2 border-luxury-gold text-xs"
                />
                <div className="w-10 h-10 rounded-full border-2 border-luxury-gold bg-gradient-to-br from-luxury-gold to-luxury-gold-light flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                  50+
                </div>
              </div>
              <a
                href="#testimonials"
                className="text-muted-foreground text-sm hover:text-foreground transition-colors cursor-pointer text-left leading-snug beam-link font-light"
              >
                Trusted by Egypt's institutional leaders.
                <br />
                Acquire quality representation.
              </a>
            </div>

            <div className="hidden sm:block w-px h-8 bg-border" />

            <div className="flex items-center gap-5">
              <a
                href="https://www.linkedin.com/company/abdallahabuelnaga/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-burgundy transition-colors flex items-center gap-1 text-sm group font-light"
              >
                LinkedIn <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100082889946960"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-burgundy transition-colors flex items-center gap-1 text-sm group font-light"
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
        <span className="text-muted-foreground/70 text-xs tracking-widest uppercase font-semibold">Scroll the journey</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-luxury-gold to-transparent"
          animate={{ scaleY: [1, 0.6, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
