import { motion } from "framer-motion";
import { Scale, Users, Globe, Building2, Lightbulb, ArrowRight, Heart } from "lucide-react";
import LuxuryPageShell from "@/components/LuxuryPageShell";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StyledAmpersand from "@/components/StyledAmpersand";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { cardHover, staggerItem } from "@/lib/motionPresets";
import heroImage from "@/assets/hero-lawyer-meeting.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t, language } = useLanguage();

  const stats = [
    { value: "25+", label: t("clients_stat_experience") },
    { value: "2", label: language === "ar" ? "شركاء مؤسسون" : "Founding Partners" },
    { value: "150+", label: t("clients_stat_clients") },
    { value: language === "ar" ? "مصر" : "Egypt", label: language === "ar" ? "المقر الرئيسي" : "Headquarters" },
  ];

  return (
    <LuxuryPageShell>
      <SEOHead title={t("nav_about")} description="Learn about A&A Legal Advisors, a boutique law firm in Egypt." />
      <Header />
      <main id="main-content">
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 lg:pb-28 bg-background overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <ScrollReveal variant="slideLeft">
                <span className="inline-block px-4 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground mb-6">
                  {t("about_badge")}
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6 font-bold">
                  {t("page_about_hero_title")}
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-light">
                  {t("page_about_hero_sub")}
                </p>
              </ScrollReveal>

              <ScrollReveal variant="slideRight" delay={0.1} className="relative">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                  <img
                    src={heroImage}
                    alt="A&A Legal Advisors office"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={staggerItem} className="text-center">
                  <p className="font-serif text-4xl md:text-5xl text-primary mb-2 font-bold">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-sm font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-3xl p-8 shadow-card border border-border/50">
                <Lightbulb className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-serif text-xl font-bold mb-2">{t("about_card1_title")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">{t("about_card1_desc")}</p>
              </div>

              <div className="bg-primary text-white rounded-3xl p-8 shadow-card">
                <Globe className="w-8 h-8 text-luxury-gold mb-4" />
                <h3 className="font-serif text-xl font-bold mb-2">{t("about_card2_title")}</h3>
                <p className="text-white/80 text-sm leading-relaxed font-light">{t("about_card2_desc")}</p>
              </div>

              <div className="bg-card rounded-3xl p-8 shadow-card border border-border/50">
                <Scale className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-serif text-xl font-bold mb-2">{t("about_card3_title")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">{t("about_card3_desc")}</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </LuxuryPageShell>
  );
};

export default About;
