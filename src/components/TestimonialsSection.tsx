import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import GlassCard from "@/components/ui/GlassCard";
import BeamCard from "@/components/justice-beam/BeamCard";
import { useLanguage } from "@/contexts/LanguageContext";

type TestimonialItem = {
  id: string;
  name: string;
  title: string;
  quote: string;
  rating: number;
  photo_url: string | null;
};

const TestimonialsSection = () => {
  const { t, language } = useLanguage();
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
            name: language === "ar" ? "د. حازم عبد العزيز" : "John Anderson",
            title: language === "ar" ? "رئيس مجلس إدارة، مجموعة استثمارية" : "CEO, Tech Corp",
            quote: language === "ar" ? "فريق قانوني استثنائي يمتلك رؤية تجارية حاسمة ونزاهة لا تقبل المساومة." : "An excellent team focused on the art of legal representation with uncompromising integrity.",
            rating: 5,
            photo_url: null,
          },
          {
            id: "2",
            name: language === "ar" ? "مهندسة / سارة الشافعي" : "Sarah Williams",
            title: language === "ar" ? "الرئيس التنفيذي المالي" : "CFO, Investment Group",
            quote: language === "ar" ? "تجربة مختلفة تماماً عن المكاتب التقليدية. سرعة في الأداء ودقة متناهية في الترافع." : "Very different from conventional agencies. Stable, easier to collaborate, and easy to leverage.",
            rating: 5,
            photo_url: null,
          },
          {
            id: "3",
            name: language === "ar" ? "أحمد المحمدي" : "Michael Chen",
            title: language === "ar" ? "مؤسس شركة تكنولوجيا" : "Founder, StartupXYZ",
            quote: language === "ar" ? "تقديم حلول قانونية مبتكرة وفرت على شركتنا الكثير من الوقت والمخاطر." : "For a law firm like this, it's really comfortable and genuinely via point of action.",
            rating: 5,
            photo_url: null,
          },
        ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "-42%"]);

  return (
    <div ref={containerRef} className="relative h-[160vh] bg-navy/5">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        <div className="architectural-grid opacity-15" />
        
        {/* Header content */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10 mb-12 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full border border-burgundy/15 text-xs font-semibold uppercase tracking-wider text-burgundy-light mb-4">
              {t("testimonials_badge")}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight font-bold">
              {t("testimonials_title")}
            </h2>
          </div>
        </div>

        {/* Horizontal Scroll Deck Container */}
        <div className="relative z-10 w-full">
          <motion.div
            style={{ x }}
            className="flex gap-8 px-6 lg:px-12 w-[160%] md:w-[130%] lg:w-[120%] cursor-grab active:cursor-grabbing will-change-transform"
          >
            {items.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-[380px] sm:w-[440px] md:w-[480px] shrink-0"
              >
                <BeamCard>
                  <GlassCard className="p-8 h-full border border-navy/10 bg-background/90 backdrop-blur-md shadow-card hover:shadow-hover transition-all duration-500 gold-border-trace">
                    <div className="flex items-center gap-4 mb-6">
                      <div 
                        className="w-14 h-14 rounded-full border-2 border-luxury-gold/30 bg-burgundy/10 flex items-center justify-center text-luxury-gold font-serif font-bold text-base shadow-sm shrink-0"
                        aria-hidden="true"
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-serif font-semibold text-lg text-foreground group-hover:text-luxury-gold transition-colors">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>

                    <p className="text-foreground/75 leading-relaxed text-sm md:text-base mb-6 italic font-light">
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

      </div>
    </div>
  );
};

export default TestimonialsSection;
