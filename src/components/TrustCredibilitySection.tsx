import { motion } from "framer-motion";
import { Award, ShieldCheck, Trophy, Sparkles } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import GlassCard from "@/components/ui/GlassCard";
import { viewportReveal, scaleIn } from "@/lib/motionPresets";

const accomplishments = [
  {
    icon: Trophy,
    title: "Chambers & Partners",
    subtitle: "Top-Tier Boutique Firm",
    description: "Ranked as one of Egypt's premier legal advisors in corporate litigation and dispute resolution.",
    year: "2024 - 2026",
  },
  {
    icon: Award,
    title: "IFLR1000 Recognized",
    subtitle: "Financial & Corporate Law",
    description: "Honored for excellence in mergers, capital markets advice, and structuring complex corporate deals.",
    year: "Consecutive Years",
  },
  {
    icon: ShieldCheck,
    title: "Legal500 Directory",
    subtitle: "Leading Arbitration Specialists",
    description: "Consistently recognized for stellar domestic and international arbitration dispute outcomes.",
    year: "2025 Edition",
  },
  {
    icon: Sparkles,
    title: "25+ Years Benchmark",
    subtitle: "Institutional Trust",
    description: "Founded on over two decades of successful litigation counsel and national legislative advisory work.",
    year: "Since 1999",
  },
];

const TrustCredibilitySection = () => {
  return (
    <section
      data-beam-section="trust"
      className="relative py-24 lg:py-32 overflow-hidden border-y border-navy/10"
    >
      {/* Background Architectural Grid */}
      <div className="architectural-grid opacity-30" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] ambient-glow bg-gradient-to-r from-luxury-gold/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <SectionBadge className="mb-6">Prestige & Recognition</SectionBadge>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
            An Uncompromising Benchmark of{" "}
            <span className="text-gradient-gold">Credibility & Authority</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our boutique firm is built on a lineage of trust, actively shaping legislation and securing precedents in major commercial tribunals across Egypt and the Middle East.
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
                    <h3 className="font-serif text-xl text-foreground mb-1 group-hover:text-luxury-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground mb-4">
                      {item.subtitle}
                    </p>
                    <p className="text-foreground/60 text-sm leading-relaxed">
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
