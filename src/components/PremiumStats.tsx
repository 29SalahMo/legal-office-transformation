import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "25+", label: "Years of Excellence" },
  { value: "98%", label: "Client Retention" },
  { value: "500+", label: "Cases Won" },
  { value: "50+", label: "Expert Attorneys" },
];

const Counter = ({ value, inView }: { value: string; inView: boolean }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/\d/g, "");

  useEffect(() => {
    if (!inView) return;
    if (isNaN(target)) return;

    let start = 0;
    const duration = 1.6; // duration in seconds
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeProgress = progress * (2 - progress); // easeOutQuad
      const current = Math.round(target * easeProgress);
      
      setCount(current);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(target);
      }
    }, 16.67); // ~60fps

    return () => clearInterval(timer);
  }, [target, inView]);

  if (isNaN(target)) return <span>{value}</span>;
  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const PremiumStats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="mt-16 relative">
      <div className="luxury-divider mb-12" />
      
      <p className="text-center text-muted-foreground mb-10 tracking-widest uppercase text-xs font-semibold">
        A Foundation Proven in Numbers
      </p>

      {/* Beam-Powered Progress Line */}
      <div className="relative max-w-4xl mx-auto mb-16 px-4">
        <div className="h-[2px] bg-navy/10 rounded-full overflow-hidden shadow-sm">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-luxury-gold via-E5C483 to-luxury-gold shadow-[0_0_12px_rgba(170,124,17,0.6)]"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center premium-stat-card py-8 px-4 border border-navy/5 backdrop-blur-md bg-background/60 shadow-elegant gold-border-trace group transition-all duration-300"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-serif text-4xl md:text-5xl text-gradient-gold mb-2 font-semibold group-hover:scale-105 transition-transform duration-300 block">
              <Counter value={stat.value} inView={inView} />
            </p>
            <p className="text-muted-foreground text-sm font-light uppercase tracking-wider text-[11px] group-hover:text-foreground transition-colors duration-300">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PremiumStats;
