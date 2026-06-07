import { motion } from "framer-motion";
import { Sparkles, Users } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import SectionBadge from "@/components/ui/SectionBadge";
import GlassCard from "@/components/ui/GlassCard";
import heroImageFallback from "@/assets/hero-lawyer-meeting.jpg";

const stats = [
  { value: "25+", label: "Years of Excellence" },
  { value: "98%", label: "Client Retention" },
  { value: "500+", label: "Cases Won" },
  { value: "50+", label: "Expert Attorneys" },
];

const AboutBentoSection = () => {
  const { getValue, getImageUrl } = usePageContent("home");

  const aboutHeading = getValue("about_heading", "At Abdallah, we don't just practice law — we redefine it.");
  const aboutDescription = getValue("about_description", "Since 1999, our firm has been a home for clients seeking exceptional legal representation, from emerging startups to Fortune 500 corporations.");
  const aboutImage = getImageUrl("about_image", heroImageFallback);

  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1020]/60 to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <SectionBadge>About Us</SectionBadge>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight"
          >
            {aboutHeading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg leading-relaxed self-end"
          >
            {aboutDescription}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlassCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 h-[320px] flex flex-col group"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-luxury-gold/20 to-glow-blue/10 border border-white/10 group-hover:border-luxury-gold/30 transition-colors">
              <Sparkles className="w-7 h-7 text-luxury-gold-light" />
            </div>
            <h3 className="font-serif text-xl text-white mb-3">Expert Litigation</h3>
            <p className="text-white/55 leading-relaxed">
              Strategic advocacy in complex commercial disputes with tournament-grade preparation — win in any jurisdiction.
            </p>
          </GlassCard>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden h-[320px] group border border-white/10"
          >
            <img
              src={aboutImage}
              alt="Legal consultation"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/95 via-[#050816]/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm mb-3 border border-white/10">
                Corporate Advisory
              </span>
              <h3 className="font-serif text-xl text-white">
                Strategic partnerships designed for all stages of growth.
              </h3>
            </div>
          </motion.div>

          <GlassCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            hover={false}
            className="p-8 h-[320px] flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-serif text-6xl text-gradient-gold">100+</span>
              <Users className="w-8 h-8 text-white/40" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Pro Attorneys</h3>
            <p className="text-white/55 text-sm mb-6">
              Certified professionals ready to handle your case from first consultation to final resolution.
            </p>
            <div className="space-y-3 mt-auto">
              {[
                { label: "Litigation", count: 45, filled: 8 },
                { label: "Corporate", count: 35, filled: 7 },
                { label: "Advisory", count: 25, filled: 5 },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-white/50">{item.label}</span>
                  <div className="flex gap-1">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i < item.filled ? 'bg-luxury-gold' : 'bg-white/10'}`} />
                    ))}
                  </div>
                  <span className="text-white font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="luxury-divider mb-12" />
          <p className="text-center text-white/50 mb-10">A few more facts about us in numbers</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="text-center glass-panel py-8 px-4"
              >
                <p className="font-serif text-4xl md:text-5xl text-gradient-gold mb-2">{stat.value}</p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutBentoSection;
