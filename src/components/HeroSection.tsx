import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowLeft, ShieldCheck, Award, Users, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/usePageContent";
import { PARTNER_PHOTO_URLS } from "@/lib/partnerPhotos";
import { heroItem, heroStagger } from "@/lib/motionPresets";
import TeamMemberPhoto from "@/components/TeamMemberPhoto";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t, language } = useLanguage();
  const { getValue } = usePageContent("home");

  const heading = language === "ar" ? t("hero_heading") : getValue("hero_heading", t("hero_heading"));
  const subtext = language === "ar" ? t("hero_subtext") : getValue("hero_subtext", t("hero_subtext"));

  // Magnetic CTA references
  const { ref: primaryRef, x: primaryX, y: primaryY } = useMagnetic(0.25);
  const { ref: secondaryRef, x: secondaryX, y: secondaryY } = useMagnetic(0.22);

  // Track mouse coordinates for subtle 3D parallax background shifts
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

  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;

  const handleConsultationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const intakeSection = document.getElementById("intake-form");
    if (intakeSection) {
      intakeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      data-beam-section="hero" 
      className="relative min-h-[100dvh] flex flex-col justify-center pt-28 pb-16 lg:py-24 overflow-hidden"
    >
      {/* Background Architectural Grid & Ambient Glows */}
      <div className="architectural-grid opacity-20" />
      
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

      <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-5xl text-center">
        
        {/* Main Hero Content */}
        <motion.div
          className="flex flex-col items-center mx-auto"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={heroItem} className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-luxury-gold/30 bg-background/90 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-luxury-gold to-luxury-gold-light animate-pulse" />
              <span className="text-xs text-foreground tracking-widest uppercase font-bold">
                {t("hero_badge")}
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              variants={{
                hidden: { y: 60, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl text-foreground leading-[1.06] tracking-tight font-bold max-w-4xl"
            >
              {heading}
            </motion.h1>
          </div>

          {/* Subtext */}
          <motion.p
            variants={heroItem}
            className="text-muted-foreground text-base sm:text-xl md:text-2xl mb-10 leading-relaxed max-w-3xl font-light"
          >
            {subtext}
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            variants={heroItem}
            className="flex flex-wrap items-center justify-center gap-4 mb-12 w-full max-w-md sm:max-w-none"
          >
            <motion.div
              ref={primaryRef}
              style={{ x: primaryX, y: primaryY }}
              className="w-full sm:w-auto"
            >
              <a
                href="#intake-form"
                onClick={handleConsultationClick}
                className="magnetic-btn beam-button touch-target inline-flex items-center justify-center gap-2 h-14 px-9 text-base rounded-full font-medium bg-gradient-to-r from-burgundy via-burgundy-light to-burgundy text-white shadow-[0_0_30px_rgba(82,11,16,0.35)] hover:shadow-[0_0_40px_rgba(170,124,17,0.4)] hover:scale-[1.02] transition-all duration-300 w-full gold-shimmer-sweep cursor-pointer"
              >
                <span>{t("hero_cta_primary")}</span>
                <ArrowIcon className="w-4 h-4 text-white" />
              </a>
            </motion.div>
            
            <motion.div
              ref={secondaryRef}
              style={{ x: secondaryX, y: secondaryY }}
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-9 h-14 border-border/80 bg-background/60 text-foreground hover:bg-background hover:border-burgundy/30 backdrop-blur-sm w-full touch-target transition-all duration-300 text-base"
                asChild
              >
                <Link to="/services">{t("hero_cta_secondary")}</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Partner Avatars Trust Card */}
          <motion.div
            variants={heroItem}
            className="flex items-center justify-center gap-4 text-xs sm:text-sm text-muted-foreground mb-12"
          >
            <div className="flex -space-x-3 shrink-0 rtl:space-x-reverse">
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
            </div>
            <p className="leading-snug max-w-sm font-light text-left rtl:text-right">
              {t("hero_trusted_by")} <span className="font-semibold text-foreground">{t("hero_acquire_rep")}</span>
            </p>
          </motion.div>

        </motion.div>

        {/* Full-Width Floating Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-3xl border border-luxury-gold/20 bg-background/80 backdrop-blur-xl shadow-card gold-border-trace max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 p-3 rounded-2xl bg-muted/20">
            <div className="w-12 h-12 rounded-2xl bg-burgundy/10 border border-burgundy/15 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-burgundy" />
            </div>
            <div className="text-left rtl:text-right">
              <p className="font-serif font-bold text-2xl text-foreground leading-none text-gradient-gold">25+</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">{language === "ar" ? "عاماً من الخبرة القضائية" : "Years Legal Experience"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-2xl bg-muted/20">
            <div className="w-12 h-12 rounded-2xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-luxury-gold" />
            </div>
            <div className="text-left rtl:text-right">
              <p className="font-serif font-bold text-2xl text-foreground leading-none text-gradient-gold">$2B+</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">{language === "ar" ? "حجم الاستشارات والصفقات" : "Deals & Dispute Value"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-2xl bg-muted/20">
            <div className="w-12 h-12 rounded-2xl bg-burgundy/10 border border-burgundy/15 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-burgundy" />
            </div>
            <div className="text-left rtl:text-right">
              <p className="font-serif font-bold text-2xl text-foreground leading-none text-gradient-gold">150+</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">{language === "ar" ? "مؤسسة وشركة كبرى" : "Corporate Clients"}</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
