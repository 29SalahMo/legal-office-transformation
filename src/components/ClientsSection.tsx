import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ShieldCheck, Landmark, Zap, Compass, CheckCircle2, Quote, ArrowUpRight } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import GlassCard from "@/components/ui/GlassCard";
import { scaleIn, viewportReveal } from "@/lib/motionPresets";
import { useLanguage } from "@/contexts/LanguageContext";

interface Client {
  id: string;
  nameEn: string;
  nameAr: string;
  category: "finance" | "energy" | "realestate" | "tech";
  logoSymbol: string;
  descriptionEn: string;
  descriptionAr: string;
  representedDealEn: string;
  representedDealAr: string;
}

const CLIENTS_DATA: Client[] = [
  {
    id: "cib",
    nameEn: "Commercial International Bank (CIB)",
    nameAr: "البنك التجاري الدولي (CIB)",
    category: "finance",
    logoSymbol: "CIB",
    descriptionEn: "Egypt's leading private sector bank",
    descriptionAr: "أكبر بنك للقطاع الخاص في مصر",
    representedDealEn: "Advising on $450M syndicated credit facility",
    representedDealAr: "استشارات اتفاقية تمويل مشتركة بقيمة 450 مليون دولار",
  },
  {
    id: "elsewedy",
    nameEn: "Elsewedy Electric",
    nameAr: "السويدي إليكتريك",
    category: "energy",
    logoSymbol: "SWDY",
    descriptionEn: "Global provider of energy & infrastructure solutions",
    descriptionAr: "مجموعة عالمية لحلول الطاقة والبنية التحتية",
    representedDealEn: "Cross-border arbitration & EPC contract counsel",
    representedDealAr: "تحكيم دولي واستشارات عقود الهندسة والمشتريات",
  },
  {
    id: "tmg",
    nameEn: "Talaat Moustafa Group (TMG)",
    nameAr: "مجموعة طلعت مصطفى",
    category: "realestate",
    logoSymbol: "TMG",
    descriptionEn: "Premier real estate community developer",
    descriptionAr: "المطور العقاري الأبرز للمجتمعات العمرانية",
    representedDealEn: "Land acquisition & mega project regulatory counsel",
    representedDealAr: "استشارات الاستحواذ على الأراضي والمشروعات الكبرى",
  },
  {
    id: "vodafone",
    nameEn: "Vodafone Egypt",
    nameAr: "فودافون مصر",
    category: "tech",
    logoSymbol: "VOD",
    descriptionEn: "Telecommunications & digital payments operator",
    descriptionAr: "مشغل الاتصالات والخدمات الرقمية الأول",
    representedDealEn: "Regulatory compliance & commercial litigation",
    representedDealAr: "الامتثال التنظيمي والتقاضي التجاري",
  },
  {
    id: "orascom",
    nameEn: "Orascom Construction",
    nameAr: "أوراسكوم للإنشاءات",
    category: "energy",
    logoSymbol: "OC",
    descriptionEn: "Engineering and construction conglomerate",
    descriptionAr: "مجموعة الهندسة والمقاولات الدولية",
    representedDealEn: "Major infrastructure dispute arbitration",
    representedDealAr: "تحكيم نزاعات مشاريع البنية التحتية العملاقة",
  },
  {
    id: "emaar",
    nameEn: "Emaar Misr",
    nameAr: "إعمار مصر",
    category: "realestate",
    logoSymbol: "EMR",
    descriptionEn: "Luxury real estate & hospitality enterprise",
    descriptionAr: "شركة التطوير العقاري والفندقي الفاخر",
    representedDealEn: "Hospitality acquisition & joint venture counsel",
    representedDealAr: "استشارات الاستحواذ الفندقي والمشروعات المشتركة",
  },
  {
    id: "fawry",
    nameEn: "Fawry Banking & Payment Technology",
    nameAr: "شركة فوري تكنولوجي",
    category: "tech",
    logoSymbol: "FWRY",
    descriptionEn: "Leading fintech platform in Egypt",
    descriptionAr: "منصة المدفوعات والتكنولوجيا المالية الأولى",
    representedDealEn: "Fintech licensing & central bank compliance",
    representedDealAr: "ترخيص خدمات التكنولوجيا المالية وتراخيص البنك المركزي",
  },
  {
    id: "qnb",
    nameEn: "QNB Alahli",
    nameAr: "بنك قطر الوطني الأهلي",
    category: "finance",
    logoSymbol: "QNB",
    descriptionEn: "Major commercial banking group",
    descriptionAr: "مجموعة المصرفية التجارية الكبرى",
    representedDealEn: "Secured asset recovery & corporate restructuring",
    representedDealAr: "استرداد الأصول المرهونة وإعادة هيكلة الشركات",
  },
];

const TESTIMONIAL_HIGHLIGHTS = [
  {
    quoteEn: "A&A Legal Advisors handled our $300M cross-border corporate restructure with surgical precision and exceptional court advocacy.",
    quoteAr: "نجح مكتب عبد الله وأبو النجا في إدارة إعادة هيكلة شركتنا العابرة للحدود بقيمة 300 مليون دولار بدقة متناهية ودفاع قضائي رفيع المستوى.",
    authorEn: "Eng. Tarek Mansour",
    authorAr: "مهندس / طارق منصور",
    titleEn: "Group Legal Director, Industrial Conglomerate",
    titleAr: "رئيس القطاع القانوني، مجموعة صناعية كبرى",
  },
  {
    quoteEn: "In high-stakes international arbitration, Dr. Ahmed Abdallah's team delivered a landmark favorable award that saved our project.",
    quoteAr: "في نزاع تحكيم دولي رفيع المستوى، قدم فريق د. أحمد عبد الله حكماً تحكيمياً تاريخياً أنقذ مشروعنا الاستثماري.",
    authorEn: "Dr. Khaled Al-Sayed",
    authorAr: "د. خالد السيد",
    titleEn: "Managing Director, Energy Development Partner",
    titleAr: "العضو المنتدب، شركة تطوير الطاقة",
  },
];

const ClientsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredClients = activeCategory === "all"
    ? CLIENTS_DATA
    : CLIENTS_DATA.filter((c) => c.category === activeCategory);

  const categories = [
    { id: "all", label: t("clients_cat_all") },
    { id: "finance", label: t("clients_cat_finance") },
    { id: "energy", label: t("clients_cat_energy") },
    { id: "realestate", label: t("clients_cat_realestate") },
    { id: "tech", label: t("clients_cat_tech") },
  ];

  return (
    <section
      data-beam-section="clients"
      className="relative py-24 lg:py-32 overflow-hidden border-t border-navy/10 bg-background/40"
    >
      {/* Background Architectural Elements */}
      <div className="architectural-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] ambient-glow bg-burgundy/5 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[400px] h-[400px] ambient-glow bg-luxury-gold/5 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <SectionBadge className="mb-4">{t("clients_badge")}</SectionBadge>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight font-bold">
            {t("clients_title")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light">
            {t("clients_subtitle")}
          </p>
        </div>

        {/* Impact Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <GlassCard hover className="p-6 bg-background/80 border border-navy/10 text-center gold-border-trace">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-1 text-gradient-gold">150+</p>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">{t("clients_stat_clients")}</p>
          </GlassCard>

          <GlassCard hover className="p-6 bg-background/80 border border-navy/10 text-center gold-border-trace">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-1 text-gradient-gold">$2B+</p>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">{t("clients_stat_volume")}</p>
          </GlassCard>

          <GlassCard hover className="p-6 bg-background/80 border border-navy/10 text-center gold-border-trace">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-1 text-gradient-gold">98%</p>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">{t("clients_stat_rate")}</p>
          </GlassCard>

          <GlassCard hover className="p-6 bg-background/80 border border-navy/10 text-center gold-border-trace">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-1 text-gradient-gold">25+</p>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">{t("clients_stat_experience")}</p>
          </GlassCard>
        </div>

        {/* Sector Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-300 ${
                  isSelected
                    ? "border-luxury-gold bg-gradient-to-r from-burgundy to-burgundy-light text-white shadow-md"
                    : "border-navy/15 bg-background/70 text-muted-foreground hover:text-foreground hover:bg-background"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Clients Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredClients.map((client) => (
              <motion.div
                key={client.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard hover className="p-6 h-full flex flex-col justify-between group bg-background/80 border border-navy/10 gold-border-trace">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-burgundy/10 to-luxury-gold/10 border border-burgundy/15 flex items-center justify-center font-serif font-bold text-lg text-burgundy group-hover:scale-105 transition-transform">
                        {client.logoSymbol}
                      </div>
                      <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-navy/5 border border-navy/10 text-muted-foreground font-semibold">
                        {client.category.toUpperCase()}
                      </span>
                    </div>

                    <h4 className="font-serif font-semibold text-lg text-foreground mb-1 group-hover:text-luxury-gold transition-colors">
                      {language === "ar" ? client.nameAr : client.nameEn}
                    </h4>

                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed font-light">
                      {language === "ar" ? client.descriptionAr : client.descriptionEn}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <div className="flex items-start gap-1.5 text-xs text-burgundy font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-luxury-gold" />
                      <span>{language === "ar" ? client.representedDealAr : client.representedDealEn}</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Corporate Client Quotes */}
        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIAL_HIGHLIGHTS.map((item, idx) => (
            <GlassCard key={idx} hover className="p-8 bg-background/90 border border-burgundy/15 relative overflow-hidden gold-border-trace">
              <Quote className="w-10 h-10 text-luxury-gold/20 absolute top-6 right-6 rtl:left-6 rtl:right-auto pointer-events-none" />
              <p className="text-foreground text-sm sm:text-base italic leading-relaxed mb-6 font-light relative z-10">
                "{language === "ar" ? item.quoteAr : item.quoteEn}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-luxury-gold to-luxury-gold-light flex items-center justify-center text-white font-serif font-bold text-sm">
                  {(language === "ar" ? item.authorAr : item.authorEn).charAt(0)}
                </div>
                <div>
                  <h5 className="font-serif font-semibold text-foreground text-sm">
                    {language === "ar" ? item.authorAr : item.authorEn}
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    {language === "ar" ? item.titleAr : item.titleEn}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ClientsSection;
