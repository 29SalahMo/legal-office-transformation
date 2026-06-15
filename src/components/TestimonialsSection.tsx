import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import GlassCard from "@/components/ui/GlassCard";
import partnerMale from "@/assets/partner-male.jpg";

type TestimonialItem = {
  id: string;
  name: string;
  title: string;
  quote: string;
  rating: number;
  photo_url: string | null;
};

const ParallaxTestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: TestimonialItem;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.2"],
  });
  const drift = (index - 1) * 18;
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <motion.div ref={ref} style={{ y }} className="will-change-transform">
      <GlassCard className="p-8 h-full border-navy/10 bg-background/90">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={testimonial.photo_url || partnerMale}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border border-burgundy/25"
            loading="lazy"
          />
          <div>
            <h4 className="font-medium text-foreground">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-6">&ldquo;{testimonial.quote}&rdquo;</p>

        <div className="flex gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-burgundy fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
};

const TestimonialsSection = () => {
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

  return (
    <section id="testimonials" data-justice-journey="justice" className="relative py-24 lg:py-32 premium-section-navy">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            What Our
            <br />
            <span className="text-gradient-gold">Satisfied Clients Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((testimonial, index) => (
            <ParallaxTestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
