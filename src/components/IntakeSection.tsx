import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Award, Clock } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import GlassCard from "@/components/ui/GlassCard";
import LeadForm from "@/components/LeadForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { fadeUp, viewportReveal } from "@/lib/motionPresets";

const IntakeSection: React.FC = () => {
  const { t, language } = useLanguage();

  const guarantees = [
    {
      icon: Clock,
      title: language === "ar" ? "استجابة خبير خلال 24 ساعة" : "24-Hour Response",
      desc: language === "ar" ? "تقييم مباشر للأسانيد من قبل الشركاء التنفيذيين." : "Direct case brief review by senior partners.",
    },
    {
      icon: Lock,
      title: language === "ar" ? "سرية وحماية مطلقة" : "Strict Confidentiality",
      desc: language === "ar" ? "حماية سرية البيانات والوثائق وفقاً للقوانين." : "Encrypted client intake and privilege protection.",
    },
    {
      icon: ShieldCheck,
      title: language === "ar" ? "تمثيل قضائي رفيع" : "Partner Representation",
      desc: language === "ar" ? "ترافع ومتابعة حثيثة أمام كافة الدوائر." : "Dedicated trial advocates in commercial tribunals.",
    },
  ];

  return (
    <section
      id="intake-form"
      data-beam-section="intake"
      className="relative py-24 lg:py-32 overflow-hidden border-b border-navy/10 bg-background/50"
    >
      <div className="architectural-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] ambient-glow bg-burgundy/5 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Intention & Guarantees */}
          <motion.div
            className="lg:col-span-6 flex flex-col justify-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
          >
            <SectionBadge className="mb-4">
              {language === "ar" ? "حجز استشارة" : "Priority Intake"}
            </SectionBadge>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight font-bold">
              {language === "ar" ? (
                <>
                  احجز استشارتك مع <span className="text-gradient-gold">كبار الشركاء</span>
                </>
              ) : (
                <>
                  Initiate Strategic <span className="text-gradient-gold">Client Intake</span>
                </>
              )}
            </h2>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 font-light">
              {t("lead_subtitle")}
            </p>

            {/* Firm Guarantees List */}
            <div className="space-y-4 mb-8">
              {guarantees.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-background/70 border border-navy/10 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-burgundy/10 border border-burgundy/15 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-burgundy" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-foreground mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Prominent Lead Intake Form */}
          <motion.div
            className="lg:col-span-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
          >
            <LeadForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default IntakeSection;
