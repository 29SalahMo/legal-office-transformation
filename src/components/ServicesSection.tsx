import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SectionBadge from "@/components/ui/SectionBadge";
import GlassCard from "@/components/ui/GlassCard";
import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";

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
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-[#0B1020]/40 pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionBadge className="mb-6">Practice Areas</SectionBadge>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
              Explore our full range of{" "}
              <span className="text-gradient-gold">legal services</span> and expertise.
            </h2>

            <p className="text-white/60 text-lg leading-relaxed mb-8">
              From first consultation to case resolution — we've got the right approach for you.
            </p>

            <Button
              variant="outline"
              className="rounded-full px-6 py-6 group border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-luxury-gold/40"
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
              <GlassCard
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
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
                    <h3 className="font-serif text-xl text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-white/55 text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
