import { TrendingUp, Briefcase, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";
import SectionBadge from "@/components/ui/SectionBadge";

const practiceAreas = [
  {
    icon: Sparkles,
    title: "Litigation",
    description:
      "Strategic advocacy in complex commercial disputes, regulatory matters, and high-stakes litigation across multiple jurisdictions.",
  },
  {
    icon: TrendingUp,
    title: "Capital Market",
    description:
      "Comprehensive advice on securities offerings, IPOs, debt instruments, and regulatory compliance for capital market transactions.",
  },
  {
    icon: Briefcase,
    title: "Comprehensive Legal Solutions",
    description:
      "End-to-end legal services tailored to your business needs, from corporate structuring to risk management and compliance.",
  },
];

const PracticeAreasSection = () => {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <SectionBadge className="mb-6">What We Do</SectionBadge>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6">
            Practice Areas
          </h2>
          <div className="luxury-divider max-w-xs mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {practiceAreas.map((area, index) => (
            <GlassCard
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 lg:p-10 group"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-luxury-gold/20 to-glow-blue/10 border border-white/10 group-hover:border-luxury-gold/30 transition-colors">
                <area.icon className="w-8 h-8 text-luxury-gold-light" />
              </div>

              <h3 className="font-serif text-xl lg:text-2xl text-white mb-4">
                {area.title}
              </h3>
              <p className="text-white/55 leading-relaxed mb-6">
                {area.description}
              </p>

              <Button variant="elegant" className="group/btn p-0">
                View
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreasSection;
