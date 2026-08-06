import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { useLanguage } from "@/contexts/LanguageContext";

const NewsletterSection = () => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section data-beam-section="contact" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-gold/5 to-glow-blue/5 pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <GlassCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          hover={false}
          glow
          className="max-w-4xl mx-auto p-10 lg:p-16 text-center gold-border-trace"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight font-bold">
            {t("newsletter_title")}
          </h2>

          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {t("newsletter_subtitle")}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder={t("newsletter_placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 rounded-full bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-burgundy/50 px-6 backdrop-blur-sm text-sm"
              required
            />
            <Button
              type="submit"
              className="beam-button h-14 rounded-full px-8 bg-gradient-to-r from-burgundy to-burgundy-light text-white hover:opacity-90 border-0 shadow-[0_0_24px_rgba(82,11,16,0.2)] text-sm flex items-center justify-center gap-2"
            >
              <span>{t("newsletter_button")}</span>
              <ArrowIcon className="w-4 h-4 text-white" />
            </Button>
          </form>
        </GlassCard>
      </div>
    </section>
  );
};

export default NewsletterSection;
