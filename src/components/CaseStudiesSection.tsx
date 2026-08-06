import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import GlassCard from "@/components/ui/GlassCard";
import { useLanguage } from "@/contexts/LanguageContext";

const CaseStudiesSection = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  const cases = [
    {
      tag: t("lead_corporate"),
      title: language === "ar" ? "صفقة استحواذ وتأمين شركة اتصالات كبرى" : "Multi-Million Dollar Telecom Acquisition Protection",
      challenge: language === "ar" ? "دعوى قضائية أقامها مساهمون بالعدول عن صفقة اندماج واستحواذ بقيمة 85 مليون دولار." : "A leading regional telecom provider faced a shareholder lawsuit threatening an $85M M&A deal.",
      strategy: language === "ar" ? "تقديم طلب تحكيم سريع واستغلال تشريعات سوق المال لتعديل شروط الاستحواذ خلال 14 يوماً." : "Formulated an expedited arbitration framework, leveraging capital market rules within 14 days.",
      outcome: language === "ar" ? "إتمام الاستحواذ بنجاح وحل النزاع ودياً دون أي تعطيل للصفقة." : "Acquisition finalized on schedule; minority dispute resolved out of court with zero delay.",
      stats: [
        { label: language === "ar" ? "قيمة الصفقة" : "Deal Volume", value: "$85M" },
        { label: language === "ar" ? "مدة الهيكلة" : "Restructure", value: language === "ar" ? "١٤ يوماً" : "14 Days" },
        { label: language === "ar" ? "نسبة الأمان" : "Risk Mitigated", value: "100%" },
      ],
    },
    {
      tag: language === "ar" ? "التحكيم الدولي" : "International Arbitration",
      title: language === "ar" ? "نزاع تحكيم ملاحي ولوجستي دولي" : "Sovereign Maritime Logistics Dispute Mediation",
      challenge: language === "ar" ? "نزاع فسخ عقد التزام ملاحي يهدد بالحجز على أصول شركة ملاحية أوروبية بموانئ البحر المتوسط." : "European logistics operator faced breach of maritime concession risking asset seizure at Mediterranean ports.",
      strategy: language === "ar" ? "تفعيل شرط التحكيم الدولي بموجب قواعد مركز القاهرة الإقليمي للتحكيم التجاري الدولي CRCICA." : "Invoked bilateral treaty arbitration clauses under CRCICA guidelines with fast-track board.",
      outcome: language === "ar" ? "تسوية حاسمة واستمرار عمليات الشحن والتشغيل بنسبة 100% ودون أي توقف." : "Settled favorably with full logistics operation continuation and full client compensation.",
      stats: [
        { label: language === "ar" ? "المبالغ المؤمنة" : "Disputed Secured", value: "$30M" },
        { label: language === "ar" ? "مدة الوساطة" : "Mediation Time", value: language === "ar" ? "٣ أشهر" : "3 Months" },
        { label: language === "ar" ? "انتظام التشغيل" : "Uptime", value: "100%" },
      ],
    },
  ];

  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section
      data-beam-section="case-studies"
      className="relative py-24 lg:py-32 overflow-hidden border-b border-navy/10"
    >
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] ambient-glow bg-gradient-to-tr from-luxury-gold/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Text and Selector Tabs */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <SectionBadge className="mb-6">{t("case_studies_badge")}</SectionBadge>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight font-bold">
                {t("case_studies_title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed font-light">
                {t("case_studies_subtitle")}
              </p>
            </div>

            {/* Interactive Selectors */}
            <div className="flex flex-col gap-3">
              {cases.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`text-left rtl:text-right p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    activeTab === idx
                      ? "bg-gradient-to-r from-burgundy to-burgundy-light border-burgundy/10 text-white shadow-card shadow-burgundy/20 font-bold"
                      : "bg-background/60 border-navy/5 text-foreground hover:bg-background/90 font-medium"
                  }`}
                >
                  <div>
                    <span className={`text-xs font-semibold uppercase tracking-wider block mb-1 ${
                      activeTab === idx ? "text-white/80" : "text-burgundy-light"
                    }`}>
                      {item.tag}
                    </span>
                    <span className="font-serif text-sm lg:text-base leading-snug">
                      {item.title.substring(0, 48)}...
                    </span>
                  </div>
                  <ArrowIcon className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                    activeTab === idx ? "text-white" : "text-muted-foreground"
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Detailed Showcase */}
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassCard hover={false} className="p-8 lg:p-12 h-full flex flex-col justify-between border-navy/10 bg-background/90 shadow-card gold-border-trace">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-burgundy/10 text-burgundy-light border border-burgundy/15 text-xs font-semibold uppercase tracking-wider">
                        {cases[activeTab].tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl lg:text-3xl text-foreground mb-8 leading-snug font-bold">
                      {cases[activeTab].title}
                    </h3>

                    {/* Timeline Journey (Challenge -> Strategy -> Outcome) */}
                    <div className="relative border-l rtl:border-r rtl:border-l-0 border-navy/10 pl-6 rtl:pr-6 rtl:pl-0 ml-3 rtl:mr-3 space-y-8 mb-10">
                      
                      {/* Challenge */}
                      <div className="relative">
                        <div className="absolute -left-[31px] rtl:-right-[31px] rtl:left-auto top-0.5 w-4 h-4 rounded-full bg-background border-2 border-red-500 flex items-center justify-center">
                          <AlertTriangle className="w-2 h-2 text-red-500" />
                        </div>
                        <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                          {language === "ar" ? "التحدي النزاعي" : "The Challenge"}
                        </h4>
                        <p className="text-sm text-foreground/80 leading-relaxed font-light">
                          {cases[activeTab].challenge}
                        </p>
                      </div>

                      {/* Strategy */}
                      <div className="relative">
                        <div className="absolute -left-[31px] rtl:-right-[31px] rtl:left-auto top-0.5 w-4 h-4 rounded-full bg-background border-2 border-amber-500 flex items-center justify-center">
                          <Lightbulb className="w-2 h-2 text-amber-500" />
                        </div>
                        <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                          {language === "ar" ? "الدفوع والدفاع" : "Our Strategy"}
                        </h4>
                        <p className="text-sm text-foreground/80 leading-relaxed font-light">
                          {cases[activeTab].strategy}
                        </p>
                      </div>

                      {/* Outcome */}
                      <div className="relative">
                        <div className="absolute -left-[31px] rtl:-right-[31px] rtl:left-auto top-0.5 w-4 h-4 rounded-full bg-background border-2 border-green-600 flex items-center justify-center">
                          <CheckCircle2 className="w-2 h-2 text-green-600" />
                        </div>
                        <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                          {language === "ar" ? "النتيجة النهائية" : "The Outcome"}
                        </h4>
                        <p className="text-sm text-foreground/80 leading-relaxed font-light">
                          {cases[activeTab].outcome}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Outcome Metrics */}
                  <div className="border-t border-navy/15 pt-8 grid grid-cols-3 gap-4">
                    {cases[activeTab].stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <p className="font-serif text-2xl lg:text-3xl text-gradient-gold font-bold mb-1">
                          {stat.value}
                        </p>
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground leading-tight font-medium">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
