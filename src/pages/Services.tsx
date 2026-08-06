import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LuxuryPageShell from "@/components/LuxuryPageShell";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/motion/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { Scale, Users, Building2, Briefcase, Shield, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t, language } = useLanguage();

  const servicesData = [
    {
      icon: Scale,
      title: language === "ar" ? "التقاضي وفض النزاعات" : "Dispute Resolution & Litigation",
      description: language === "ar" ? "يتولى فريق التقاضي لدينا إدارة القضايا التجارية، الاستثمارية، الضرائب، وحقوق الملكية الفكرية بأعلى درجات الدقة والكفاءة." : "A&A's Litigation team is highly qualified and experienced in handling Civil, Commercial, Intellectual Property, Taxation, and Corporate litigation matters.",
      highlight: language === "ar" ? "نحرص على اطلاع عملائنا بشكل دوري على تطورات قضاياهم ومراحل الجلسات." : "We maintain open communication with our clients, ensuring continuous updates on progress.",
    },
    {
      icon: Users,
      title: language === "ar" ? "التحكيم والوساطة" : "Arbitration & Mediation",
      description: language === "ar" ? "خبرة واسعة في إجراءات التحكيم المحلي والدولي وفقاً لقواعد مراكز التحكيم العالمية." : "Extensive experience in institutional and ad-hoc arbitration proceedings in Egypt and international arbitration forums.",
      highlight: language === "ar" ? "تقديم حلول نزاع استراتيجية تحقق السرعة والسرية التامة." : "Strategic representation focused on efficiency, confidentiality, and achieving optimal outcomes.",
    },
    {
      icon: Building2,
      title: language === "ar" ? "استشارات الشركات والاندماج" : "General Corporate & M&A",
      description: language === "ar" ? "تقديم استشارات قانونية شاملة للشركات بدءاً من التأسيس والتراخيص وحتى الاستحواذ والتوسع." : "Comprehensive corporate services supporting businesses from formation through daily operations and complex M&A deals.",
      highlight: language === "ar" ? "خبرة متميزة في شؤون الاستثمار وتراخيص الإقامة ومحاضر الجمعيات العمومية." : "Particular expertise in investment matters, corporate governance, and statutory approvals.",
    },
  ];

  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;

  return (
    <LuxuryPageShell>
      <SEOHead title={t("nav_services")} description="Explore legal services at A&A Legal Advisors." />
      <Header />
      <main id="main-content">
        <PageHero
          badge={t("nav_services")}
          title={
            <>
              {t("page_services_hero_title")}
            </>
          }
          subtitle={t("page_services_hero_sub")}
        />

        {/* Services Grid */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="space-y-12">
              {servicesData.map((service, index) => (
                <ScrollReveal
                  key={service.title}
                  variant={index % 2 === 0 ? "slideLeft" : "slideRight"}
                  delay={0.05}
                  className="grid lg:grid-cols-2 gap-8 items-center bg-card rounded-3xl p-8 lg:p-10 border border-border/60 shadow-card"
                >
                  <div>
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4 font-bold">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                      {service.description}
                    </p>
                    <p className="text-sm font-semibold text-primary italic bg-primary/5 p-4 rounded-xl">
                      "{service.highlight}"
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-primary">
          <div className="container mx-auto px-6 lg:px-12 text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground mb-6 font-bold">
              {t("hero_cta_primary")}
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 font-light">
              {t("lead_subtitle")}
            </p>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-full px-8"
              asChild
            >
              <Link to="/contact" className="flex items-center gap-2">
                <span>{t("nav_contact")}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </LuxuryPageShell>
  );
};

export default Services;
