import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SectionBadge from "@/components/ui/SectionBadge";
import GlassCard from "@/components/ui/GlassCard";
import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";
import { slideFromLeft, scaleIn, viewportReveal } from "@/lib/motionPresets";

const services = [
  {
    image: article1,
    tag: "Litigation",
    title: "Strategic Dispute Resolution",
    description: "Programs designed for all case types and complexities.",
  },
  {
    image: article2,
    tag: "Corporate M&A",
    title: "Mergers & Acquisitions",
    description: "Step into deals built for success — to grow, compete, and thrive.",
  },
];

const ServicesSection = () => {
  return (
    <section data-justice-journey="process" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-background/20 pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
          >
            <SectionBadge className="mb-6">Practice Areas</SectionBadge>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
              Explore our full range of{" "}
              <span className="text-gradient-gold">legal services</span> and expertise.
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              From first consultation to case resolution — we've got the right approach for you.
            </p>

            <Button
              variant="outline"
              className="rounded-full px-6 py-6 group border-border bg-background/60 text-foreground hover:bg-background hover:border-burgundy/30"
              asChild
            >
              <Link to="/services">
                Explore More
                <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          <div className="space-y-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportReveal}
                transition={{ delay: index * 0.15 }}
              >
              <GlassCard
                hover
                className="overflow-hidden group"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B1020]/80 sm:bg-gradient-to-t sm:from-transparent sm:to-[#0B1020]/60" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-medium text-luxury-gold-light border border-luxury-gold/20">
                        {service.tag}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-6 flex flex-col justify-center">
                    <h3 className="font-serif text-xl text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
