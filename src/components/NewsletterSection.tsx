import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-gold/5 to-glow-blue/5 pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <GlassCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          hover={false}
          glow
          className="max-w-4xl mx-auto p-10 lg:p-16 text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6">
            Stay ahead with{" "}
            <span className="text-gradient-gold">legal insights</span>
            <br />
            delivered to your inbox.
          </h2>

          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
            Subscribe to receive our latest updates, industry news, and expert analysis.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 rounded-full bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-luxury-gold/50 px-6 backdrop-blur-sm"
              required
            />
            <Button
              type="submit"
              className="h-14 rounded-full px-8 bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-obsidian hover:opacity-90 border-0 shadow-[0_0_24px_rgba(212,175,55,0.2)]"
            >
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <p className="text-white/40 text-sm mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </GlassCard>
      </div>
    </section>
  );
};

export default NewsletterSection;
