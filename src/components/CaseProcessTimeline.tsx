import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, Search, Scale, Gavel, CheckCircle2 } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

const milestones = [
  { icon: MessageSquare, label: "Consultation", desc: "Confidential initial assessment" },
  { icon: Search, label: "Case Analysis", desc: "Deep review of facts & law" },
  { icon: Scale, label: "Strategy", desc: "Tailored legal roadmap" },
  { icon: Gavel, label: "Representation", desc: "Expert advocacy in court" },
  { icon: CheckCircle2, label: "Resolution", desc: "Balanced, lasting outcomes" },
];

const CaseProcessTimeline = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      data-justice-journey="process"
      className="relative py-24 lg:py-32 bg-navy/5 border-y border-navy/10"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <SectionBadge className="mb-6">Our Process</SectionBadge>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            From Consultation to
            <span className="text-gradient-gold block mt-1">Justice Delivered</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A disciplined, transparent process designed for clarity at every stage.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="hidden md:block absolute top-8 left-8 right-8 h-px bg-navy/15" />
          <motion.div
            className="hidden md:block absolute top-8 left-8 h-px origin-left bg-gradient-to-r from-burgundy via-burgundy-light to-burgundy"
            style={{ scaleX: lineScale, width: "calc(100% - 4rem)" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-4">
            {milestones.map((step, index) => {
              const Icon = step.icon;
              const threshold = index / (milestones.length - 1);
              return (
                <motion.div
                  key={step.label}
                  className="relative flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                >
                  <motion.div
                    className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border border-burgundy/20 bg-background shadow-card"
                    whileInView={{
                      borderColor: "rgba(82, 11, 16, 0.45)",
                      boxShadow: "0 8px 32px rgba(82, 11, 16, 0.12)",
                    }}
                    viewport={{ once: true }}
                  >
                    <Icon className="w-7 h-7 text-burgundy" />
                    <motion.span
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-burgundy text-white text-xs font-semibold flex items-center justify-center"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 260 }}
                    >
                      {index + 1}
                    </motion.span>
                  </motion.div>
                  <h3 className="font-serif text-lg text-foreground mb-1">{step.label}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-[10rem]">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseProcessTimeline;
