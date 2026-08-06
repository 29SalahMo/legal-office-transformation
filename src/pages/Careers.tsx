import LuxuryPageShell from "@/components/LuxuryPageShell";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/motion/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { cardHover, staggerItem } from "@/lib/motionPresets";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowLeft, Briefcase, Users, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Careers = () => {
  const { t, language } = useLanguage();

  const benefits = [
    {
      icon: TrendingUp,
      title: language === "ar" ? "النمو المهني" : "Career Growth",
      description: language === "ar" ? "مسار وظيفي واضح وإرشاد مباشر من الشركاء مع فرص تطوير مستمرة." : "Clear progression path with mentorship from senior partners and training opportunities.",
    },
    {
      icon: Users,
      title: language === "ar" ? "ثقافة العمل الجماعي" : "Collaborative Culture",
      description: language === "ar" ? "العمل إلى جانب أبرز العقول القانونية في مصر في بيئة داعمة ومتميزة." : "Work alongside Egypt's finest legal minds in a supportive, team-oriented environment.",
    },
    {
      icon: Award,
      title: language === "ar" ? "التقدير والمكافآت" : "Recognition & Rewards",
      description: language === "ar" ? "مكافآت أداء تنافسية وتقدير متميز للجهود القانونية المبدعة." : "Competitive compensation, performance bonuses, and recognition for exceptional work.",
    },
    {
      icon: Briefcase,
      title: language === "ar" ? "قضايا ذات أثر" : "Meaningful Work",
      description: language === "ar" ? "الترافع والإشراف على قضايا وصفقات كبرى تسهم في تشكيل المشهد الاستثماري." : "Handle landmark cases and transactions that shape Egyptian business and legal landscape.",
    },
  ];

  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowUpRight;

  return (
    <LuxuryPageShell>
      <SEOHead title={t("nav_careers")} description="Join A&A Legal Advisors — explore career opportunities." />
      <Header />
      <main id="main-content">

      <PageHero
        variant="burgundy"
        badge={t("nav_careers")}
        title={t("page_careers_hero_title")}
        subtitle={t("page_careers_hero_sub")}
      />

      {/* Why Join Us */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal variant="fadeUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4">{t("nav_careers")}</Badge>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4 font-bold">
              {t("page_careers_hero_title")}
            </h2>
          </ScrollReveal>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit) => (
              <motion.div key={benefit.title} variants={staggerItem} whileHover={cardHover}>
                <Card className="h-full border border-border/60 shadow-card hover:shadow-hover transition-all duration-300 bg-card rounded-2xl">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg text-foreground mb-2 font-semibold">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-light">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <Card className="bg-primary text-primary-foreground border-0 overflow-hidden rounded-3xl shadow-card">
            <CardContent className="p-12 lg:p-16 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 font-bold">
                {t("page_careers_apply_now")}
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8 font-light">
                {t("team_join_text")}
              </p>
              <a
                href="mailto:info@asalegaladvisors.com"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 bg-white text-primary hover:bg-white/90 font-medium text-sm transition-all"
              >
                <span>{t("page_careers_apply_now")}</span>
                <ArrowIcon className="w-4 h-4" />
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
      </main>

      <Footer />
    </LuxuryPageShell>
  );
};

export default Careers;