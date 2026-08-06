import { motion } from "framer-motion";
import { Award, ShieldCheck, Trophy, Sparkles } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import GlassCard from "@/components/ui/GlassCard";
import { viewportReveal, scaleIn } from "@/lib/motionPresets";
import { useLanguage } from "@/contexts/LanguageContext";

const TrustCredibilitySection = () => {
  const { t, language } = useLanguage();

  const accomplishments = [
    {
      icon: Trophy,
      title: "Chambers & Partners",
      subtitle: language === "ar" ? "تصنيف النخبة - مكتب استشارات ممتاز" : "Top-Tier Boutique Firm",
      description: language === "ar" ? "مصنف كأحد أبرز المكاتب القانونية في مصر في التقاضي التجاري وفض النزاعات." : "Ranked as one of Egypt's premier legal advisors in corporate litigation and dispute resolution.",
      year: "2024 - 2026",
    },
    {
      icon: Award,
      title: "IFLR1000 Recognized",
      subtitle: "Financial & Corporate Law",
      description: language === "ar" ? "اعتماد دولي في صفقات الاندماج والاستحواذ، وأسواق المال، وهيكلة الشركات." : "Honored for excellence in mergers, capital markets advice, and structuring complex corporate deals.",
      year: language === "ar" ? "سنوات متتالية" : "Consecutive Years",
    },
    {
      icon: ShieldCheck,
      title: "Legal500 Directory",
      subtitle: language === "ar" ? "خبراء التحكيم التجاري والدولي" : "Leading Arbitration Specialists",
      description: language === "ar" ? "تقدير مستمر في نتائج قضايا التحكيم المحلي والدولي المتميزة." : "Consistently recognized for stellar domestic and international arbitration dispute outcomes.",
      year: language === "ar" ? "إصدار 2025" : "2025 Edition",
    },
    {
      icon: Sparkles,
      title: language === "ar" ? "معيار 25+ عاماً من الخبرة" : "25+ Years Benchmark",
      subtitle: language === "ar" ? "ثقة كبرى المؤسسات" : "Institutional Trust",
      description: language === "ar" ? "تاريخ حافل بالترافع القضائي الناجح والمشاركة في الصياغات التشريعية الوطنية." : "Founded on over two decades of successful litigation counsel and national legislative advisory work.",
      year: language === "ar" ? "منذ عام 1999" : "Since 1999",
    },
  ];

  return (
    <section
      data-beam-section="trust"
      className="relative py-24 lg:py-32 overflow-hidden border-y border-navy/10"
    >
      <div className="architectural-grid opacity-30" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] ambient-glow bg-gradient-to-r from-luxury-gold/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <SectionBadge className="mb-6">{t("trust_badge")}</SectionBadge>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight font-bold">
            {t("trust_title")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-light">
            {t("trust_subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accomplishments.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportReveal}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard
                  hover
                  className="p-8 h-full flex flex-col justify-between group gold-border-trace bg-background/80 backdrop-blur-md border border-navy/5"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-luxury-gold/15 to-glow-blue/5 border border-burgundy/10 group-hover:border-luxury-gold/40 transition-all duration-300">
                      <Icon className="w-7 h-7 text-luxury-gold-light" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-burgundy-light font-semibold mb-2 block">
                      {item.year}
                    </span>
                    <h3 className="font-serif text-xl text-foreground mb-1 group-hover:text-luxury-gold transition-colors duration-300 font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground mb-4">
                      {item.subtitle}
                    </p>
                    <p className="text-foreground/70 text-sm leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-burgundy/15 to-transparent mt-6 group-hover:via-luxury-gold/40 transition-all duration-500" />
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustCredibilitySection;
