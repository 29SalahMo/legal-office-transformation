import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, ShieldAlert, Search, Scale, Gavel, CheckCircle2 } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import { useLanguage } from "@/contexts/LanguageContext";

const CaseProcessTimeline = () => {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const milestones = [
    {
      icon: MessageSquare,
      label: language === "ar" ? "الاستشارة والأحكام" : "Consultation",
      desc: language === "ar" ? "تقييم أولي سري ومباشر" : "Confidential initial assessment",
    },
    {
      icon: ShieldAlert,
      label: language === "ar" ? "فحص الوقائع" : "Investigation",
      desc: language === "ar" ? "جمع الأدلة والوثائق" : "Evidence and facts gathering",
    },
    {
      icon: Search,
      label: language === "ar" ? "الدراسة القانونية" : "Legal Analysis",
      desc: language === "ar" ? "مراجعة القوانين والسوابق" : "Deep review of law & precedent",
    },
    {
      icon: Scale,
      label: language === "ar" ? "الخطة الاستراتيجية" : "Strategy",
      desc: language === "ar" ? "صياغة أسانيد الترافع" : "Tailored legal roadmap",
    },
    {
      icon: Gavel,
      label: language === "ar" ? "الترافع القضائي" : "Representation",
      desc: language === "ar" ? "دفاع محكم أمام المحاكم" : "Expert advocacy in tribunals",
    },
    {
      icon: CheckCircle2,
      label: language === "ar" ? "حسم القضية" : "Resolution",
      desc: language === "ar" ? "تنفيذ الأحكام وصونها" : "Balanced, lasting outcomes",
    },
  ];

  return (
    <section ref={ref} data-beam-section="process" className="relative py-24 lg:py-32 bg-navy/5 border-y border-navy/10 overflow-hidden">
      <div className="architectural-grid opacity-20" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <SectionBadge className="mb-6">{t("process_badge")}</SectionBadge>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight font-bold">
            {t("process_title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed font-light">
            {language === "ar" ? "منهجية عمل دقيقة ومنظمة لضمان أعلى درجات الشفافية والانتصار القضائي." : "A precise, structured framework engineered to deliver transparency and authority at every tier of your case."}
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="hidden md:block absolute top-8 left-8 right-8 h-0.5 bg-navy/10 rounded-full" />
          <motion.div
            className="hidden md:block absolute top-8 left-8 h-0.5 origin-left bg-gradient-to-r from-luxury-gold via-E5C483 to-luxury-gold shadow-[0_0_12px_rgba(170,124,17,0.5)]"
            style={{ scaleX: lineScale, width: "calc(100% - 4rem)" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-4">
            {milestones.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  className="relative flex flex-col items-center text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                >
                  <motion.div
                    className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-burgundy/15 bg-background shadow-card transition-all duration-500 group-hover:border-luxury-gold group-hover:shadow-[0_0_24px_rgba(170,124,17,0.25)]"
                    whileInView={{
                      borderColor: "rgba(170, 124, 17, 0.4)",
                      boxShadow: "0 8px 32px rgba(170, 124, 17, 0.12)",
                    }}
                    viewport={{ once: true }}
                  >
                    <Icon className="w-7 h-7 text-burgundy-light group-hover:text-luxury-gold transition-colors duration-300" />
                    
                    <motion.span
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-burgundy to-burgundy-light text-white text-xs font-semibold flex items-center justify-center shadow-md border border-white/20 group-hover:from-luxury-gold group-hover:to-luxury-gold-light transition-all duration-300"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 260 }}
                    >
                      {index + 1}
                    </motion.span>
                  </motion.div>
                  
                  <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-luxury-gold transition-colors duration-300 font-semibold">
                    {step.label}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-[12rem] px-1 group-hover:text-foreground/80 transition-colors font-light">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseProcessTimeline;
