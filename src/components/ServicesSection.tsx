import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SectionBadge from "@/components/ui/SectionBadge";
import GlassCard from "@/components/ui/GlassCard";
import BeamCard from "@/components/justice-beam/BeamCard";
import TiltCard from "@/components/motion/TiltCard";
import { useJusticeBeam } from "@/contexts/JusticeBeamContext";
import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";
import { slideFromLeft, scaleIn, viewportReveal } from "@/lib/motionPresets";

const services = [
  {
    image: article1,
    tag: "Litigation",
    title: "Strategic Dispute Resolution",
    description: "Tailored defense and representation protocols designed for all commercial tribunals and high-stakes complexities.",
  },
  {
    image: article2,
    tag: "Corporate M&A",
    title: "Mergers & Acquisitions",
    description: "Architecting transactions built for long-term integration success—to grow, compete, and scale securely.",
  },
];

const pathVariants = {
  initial: { pathLength: 0, opacity: 0.25 },
  hover: { 
    pathLength: 1, 
    opacity: 0.95,
    transition: { 
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const ServicesSection = () => {
  const { setHoveredBranch, hoveredBranch } = useJusticeBeam();

  return (
    <section data-beam-section="services" className="relative py-24 lg:py-32 premium-section-navy overflow-hidden">
      <div className="architectural-grid opacity-10" />
      <div className="absolute inset-0 bg-background/20 pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Intro Panel */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
          >
            <SectionBadge className="mb-6">Practice Areas</SectionBadge>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
              Expertise Engineered for{" "}
              <span className="text-gradient-gold">Precision</span> and Authority
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Offering first-class legal advocacy across corporate portfolios, disputes, and structured mediations with unmatched preparation.
            </p>

            <Button
              variant="outline"
              className="beam-button rounded-full px-6 py-6 group border-border bg-background/60 text-foreground hover:bg-background hover:border-burgundy/30 transition-all duration-300"
              asChild
            >
              <Link to="/services" className="beam-link">
                Explore More
                <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Practice Cards List */}
          <div className="space-y-6">
            {services.map((service, index) => {
              const isDimmed = hoveredBranch !== null && hoveredBranch !== index;
              return (
                <motion.div
                  key={service.title}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportReveal}
                  transition={{ delay: index * 0.15 }}
                  className={`transition-all duration-500 ${
                    isDimmed ? "opacity-35 blur-[0.4px] scale-[0.98]" : "opacity-100 scale-100"
                  }`}
                >
                  <BeamCard
                    branchIndex={index}
                    onBranchEnter={() => setHoveredBranch(index)}
                    onBranchLeave={() => setHoveredBranch(null)}
                  >
                    <TiltCard>
                      <GlassCard hover whileHover="hover" className="overflow-hidden group gold-border-trace shadow-card">
                        <div className="flex flex-col sm:flex-row">
                          
                          {/* Card Thumbnail */}
                          <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
                            <img
                              src={service.image}
                              alt={service.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy/80 sm:bg-gradient-to-t sm:from-transparent sm:to-navy/60" />
                            <div className="absolute top-4 left-4">
                              <span className="inline-block px-3 py-1 rounded-full bg-navy/60 text-xs font-semibold text-luxury-gold border border-burgundy/25 backdrop-blur-md">
                                {service.tag}
                              </span>
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="flex-1 p-8 flex flex-row items-center justify-between bg-background/50 backdrop-blur-md relative overflow-hidden">
                            <div className="flex-1 pr-4">
                              <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-luxury-gold transition-colors duration-300">
                                {service.title}
                              </h3>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                            
                            {/* Fine Line SVG Drawing that animates on hover */}
                            <div className="w-16 h-16 shrink-0 text-luxury-gold/60 group-hover:text-luxury-gold transition-colors duration-500 relative z-10 flex items-center justify-center">
                              {service.tag === "Litigation" ? (
                                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                  <motion.path variants={pathVariants} initial="initial" d="M12 3v17" />
                                  <motion.path variants={pathVariants} initial="initial" d="M12 6l-7 2M12 6l7 2" />
                                  <motion.path variants={pathVariants} initial="initial" d="M5 8l-2 5c0 1.5 1 2.5 2 2.5s2-1 2-2.5z" />
                                  <motion.path variants={pathVariants} initial="initial" d="M19 8l-2 5c0 1.5 1 2.5 2 2.5s2-1 2-2.5z" />
                                  <motion.path variants={pathVariants} initial="initial" d="M10 20h4" />
                                </svg>
                              ) : (
                                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                  <motion.path variants={pathVariants} initial="initial" d="M16 3h5v5" />
                                  <motion.path variants={pathVariants} initial="initial" d="M8 21H3v-5" />
                                  <motion.path variants={pathVariants} initial="initial" d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                  <motion.path variants={pathVariants} initial="initial" d="M21 3L14 10" />
                                  <motion.path variants={pathVariants} initial="initial" d="M3 21l7-7" />
                                </svg>
                              )}
                            </div>
                          </div>

                        </div>
                      </GlassCard>
                    </TiltCard>
                  </BeamCard>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
