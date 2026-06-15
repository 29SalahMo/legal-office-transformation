import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import GlassCard from "@/components/ui/GlassCard";
import BeamCard from "@/components/justice-beam/BeamCard";
import partnerMale from "@/assets/partner-male.jpg";

type TestimonialItem = {
  id: string;
  name: string;
  title: string;
  quote: string;
  rating: number;
  photo_url: string | null;
};

const TestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const items: TestimonialItem[] =
    testimonials.length > 0
      ? testimonials
      : [
          {
            id: "1",
            name: "John Anderson",
            title: "CEO, Tech Corp",
            quote:
              "An excellent team focused on the art of legal representation with uncompromising integrity.",
            rating: 5,
            photo_url: null,
          },
          {
            id: "2",
            name: "Sarah Williams",
            title: "CFO, Investment Group",
            quote:
              "Very different from conventional agencies. Stable, easier to collaborate, and easy to leverage.",
            rating: 5,
            photo_url: null,
          },
          {
            id: "3",
            name: "Michael Chen",
            title: "Founder, StartupXYZ",
            quote:
              "For a law firm like this, it's really comfortable and genuinely via point of action.",
            rating: 5,
            photo_url: null,
          },
        ];

  // Set up vertical-to-horizontal scrolling trigger
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Slide translation for horizontal movement
  const x = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "-42%"]);

  return (
    <div ref={containerRef} className="relative h-[160vh] bg-navy/5">
      {/* Sticky Frame */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        <div className="architectural-grid opacity-15" />
        
        {/* Header content */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10 mb-12 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full border border-burgundy/15 text-xs font-semibold uppercase tracking-wider text-burgundy-light mb-4">
              Client Testimonials
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
              An Uncompromised Legacy of <span className="text-gradient-gold">Client Trust</span>
            </h2>
          </div>
        </div>

        {/* Horizontal Scroll Deck Container */}
        <div className="relative z-10 w-full">
          <motion.div
            style={{ x }}
            className="flex gap-8 px-6 lg:px-12 w-[160%] md:w-[130%] lg:w-[120%] cursor-grab active:cursor-grabbing will-change-transform"
          >
            {items.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="w-[380px] sm:w-[440px] md:w-[480px] shrink-0"
              >
                <BeamCard>
                  <GlassCard className="p-8 h-full border border-navy/10 bg-background/90 backdrop-blur-md shadow-card hover:shadow-hover transition-all duration-500 gold-border-trace">
                    <div className="flex items-center gap-4 mb-6">
                      {testimonial.photo_url ? (
                        <img
                          src={testimonial.photo_url}
                          alt=""
                          aria-hidden="true"
                          className="w-14 h-14 rounded-full object-cover border-2 border-burgundy/20"
                          loading="lazy"
                        />
                      ) : (
                        <div 
                          className="w-14 h-14 rounded-full border-2 border-luxury-gold/30 bg-burgundy/10 flex items-center justify-center text-luxury-gold font-serif font-bold text-base shadow-sm shrink-0"
                          aria-hidden="true"
                        >
                          {testimonial.name
                            .split(" ")
                            .filter(Boolean)
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h4 className="font-serif font-semibold text-lg text-foreground group-hover:text-luxury-gold transition-colors">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>

                    <p className="text-foreground/75 leading-relaxed text-sm md:text-base mb-6 italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-luxury-gold fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </GlassCard>
                </BeamCard>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Progress indicator bar */}
        <div className="container mx-auto px-6 lg:px-12 mt-12 relative z-10 flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            Scroll to discover
          </span>
          <div className="w-48 h-[2px] bg-navy/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full origin-left bg-gradient-to-r from-luxury-gold to-luxury-gold-light"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default TestimonialsSection;
