import { motion } from "framer-motion";
import { Sparkles, Users } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import SectionBadge from "@/components/ui/SectionBadge";
import GlassCard from "@/components/ui/GlassCard";
import PremiumStats from "@/components/PremiumStats";
import TiltCard from "@/components/motion/TiltCard";
import heroImageFallback from "@/assets/hero-lawyer-meeting.jpg";
import { fadeUp, viewportReveal } from "@/lib/motionPresets";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutBentoSection = () => {
  const { t, language } = useLanguage();
  const { getValue, getImageUrl } = usePageContent("home");

  const aboutHeading = language === "ar" ? t("about_title") : getValue("about_heading", t("about_title"));
  const aboutDescription = language === "ar" ? t("about_subtitle") : getValue("about_description", t("about_subtitle"));
  const aboutImage = getImageUrl("about_image", heroImageFallback);

  return (
    <section data-beam-section="about" className="relative py-24 lg:py-32 premium-section-navy overflow-hidden">
      <div className="architectural-grid opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReveal}
          className="mb-8"
        >
          <SectionBadge>{t("about_badge")}</SectionBadge>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight font-bold"
          >
            {aboutHeading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground/70 text-lg leading-relaxed self-end font-light"
          >
            {aboutDescription}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <TiltCard>
              <GlassCard
                hover
                className="p-8 h-[320px] flex flex-col justify-between group gold-border-trace bg-background/70 shadow-card"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-luxury-gold/20 to-glow-blue/10 border border-border group-hover:border-luxury-gold/30 transition-colors">
                    <Sparkles className="w-7 h-7 text-luxury-gold-light" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-luxury-gold transition-colors duration-300">
                    {t("about_card1_title")}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed text-sm font-light">
                    {t("about_card1_desc")}
                  </p>
                </div>
              </GlassCard>
            </TiltCard>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TiltCard>
              <div className="relative rounded-3xl overflow-hidden h-[320px] group border border-border shadow-card gold-border-trace">
                <img
                  src={aboutImage}
                  alt="Legal consultation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-4 py-2 rounded-full bg-black/40 backdrop-blur-md text-white text-xs mb-3 border border-white/20 uppercase tracking-widest font-semibold">
                    {t("about_card2_title")}
                  </span>
                  <h3 className="font-serif text-xl text-white group-hover:text-luxury-gold transition-colors duration-300">
                    {t("about_card2_desc")}
                  </h3>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TiltCard>
              <GlassCard
                hover={false}
                className="p-8 h-[320px] flex flex-col justify-between border border-border bg-background/70 shadow-card"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-5xl text-gradient-gold font-bold">100+</span>
                    <Users className="w-8 h-8 text-foreground/30" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t("about_card3_title")}
                  </h3>
                  <p className="text-foreground/70 text-xs mb-6 font-light leading-relaxed">
                    {t("about_card3_desc")}
                  </p>
                </div>
              </GlassCard>
            </TiltCard>
          </motion.div>
          
        </div>

        <PremiumStats />
      </div>
    </section>
  );
};

export default AboutBentoSection;
