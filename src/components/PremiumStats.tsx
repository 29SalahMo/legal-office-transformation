import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "25+", label: "Years of Excellence" },
  { value: "98%", label: "Client Retention" },
  { value: "500+", label: "Cases Won" },
  { value: "50+", label: "Expert Attorneys" },
];

const PremiumStats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="mt-16">
      <div className="luxury-divider mb-12" />
      <p className="text-center text-muted-foreground mb-10 tracking-wide">
        A few more facts about us in numbers
      </p>

      <div className="relative max-w-4xl mx-auto mb-10 px-4">
        <div className="h-px bg-navy/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-burgundy via-burgundy-light to-burgundy"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center premium-stat-card py-8 px-4"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="font-serif text-4xl md:text-5xl text-gradient-gold mb-2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 + index * 0.12 }}
            >
              {stat.value}
            </motion.p>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PremiumStats;
