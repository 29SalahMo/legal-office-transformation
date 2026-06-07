import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import GlassCard from "@/components/ui/GlassCard";
import partnerMale from "@/assets/partner-male.jpg";

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

  const items = testimonials.length > 0
    ? testimonials
    : [
        { id: "1", name: "John Anderson", title: "CEO, Tech Corp", quote: "An excellent team focused on the art of legal representation with uncompromising integrity.", rating: 5, photo_url: null },
        { id: "2", name: "Sarah Williams", title: "CFO, Investment Group", quote: "Very different from conventional agencies. Stable, easier to collaborate, and easy to leverage.", rating: 5, photo_url: null },
        { id: "3", name: "Michael Chen", title: "Founder, StartupXYZ", quote: "For a law firm like this, it's really comfortable and genuinely via point of action.", rating: 5, photo_url: null },
      ];

  return (
    <section id="testimonials" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-[#0B1020]/50 pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            What Our
            <br />
            <span className="text-gradient-gold">Satisfied Clients Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((testimonial, index) => (
            <GlassCard
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={testimonial.photo_url || partnerMale}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border border-luxury-gold/30"
                  />
                  <div className="absolute -inset-1 rounded-full bg-luxury-gold/20 blur-md -z-10" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{testimonial.name}</h4>
                  <p className="text-sm text-white/50">{testimonial.title}</p>
                </div>
              </div>

              <p className="text-white/65 leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-luxury-gold fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
