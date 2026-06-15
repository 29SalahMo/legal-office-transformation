import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";

const cases = [
  {
    tag: "Corporate M&A",
    title: "Multi-Million Dollar Telecom Acquisition Protection",
    challenge: "A leading regional telecom provider faced an hostile minority shareholder lawsuit that threatened to derail a landmark $85M mergers & acquisitions deal in Cairo.",
    strategy: "Our litigation team proposed an expedited arbitration framework, leveraging local capital market regulations to restructure the buyback covenants within 14 days.",
    outcome: "Acquisition successfully finalized on schedule; minority dispute resolved out of court. Minimized litigation delays to zero.",
    stats: [
      { label: "Deal Volume Secure", value: "$85M" },
      { label: "Restructuring Time", value: "14 Days" },
      { label: "Risk Mitigation", value: "100%" },
    ],
  },
  {
    tag: "International Arbitration",
    title: "Sovereign Maritime Logistics Dispute Mediation",
    challenge: "A European logistics operator encountered a breach of maritime concession contract, risking asset seizure and massive trade delays at major Egyptian Mediterranean ports.",
    strategy: "Invoked bilateral treaty arbitration clauses under CRCICA guidelines, establishing a fast-track mediation board while maintaining port logistics operations.",
    outcome: "Settled favorably with full logistics operation continuation. Secured compensation for client without shipping downtime.",
    stats: [
      { label: "Disputed Liability Secured", value: "$30M" },
      { label: "Mediation Duration", value: "3 Months" },
      { label: "Operation Uptime", value: "100%" },
    ],
  },
  {
    tag: "Legislative Precedent",
    title: "Sustainable Investment Tax Policy Reform",
    challenge: "Unclear legislative directives in emerging renewable zones in Egypt left an international consortium exposed to retroactive capital gains levies.",
    strategy: "Drafted comprehensive advisory guidelines and presented representation to national parliamentary finance sub-committees to clarify tax status rules.",
    outcome: "Obtained binding executive decree confirming tax exemption status, creating a landmark precedent for renewable investments.",
    stats: [
      { label: "Exemption Value Protected", value: "$12M" },
      { label: "Investors Impacted", value: "15+" },
      { label: "Exemption Rating", value: "100%" },
    ],
  },
];

const CaseStudiesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

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
              <SectionBadge className="mb-6">Proven Outcomes</SectionBadge>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
                Realizing Precedent-Setting <span className="text-gradient-gold">Solutions</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Explore a selected portfolio of high-stakes disputes, corporate negotiations, and legislative interventions where we turned legal complexity into strategic victories.
              </p>
            </div>

            {/* Interactive Selectors */}
            <div className="flex flex-col gap-3">
              {cases.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    activeTab === idx
                      ? "bg-gradient-to-r from-burgundy to-burgundy-light border-burgundy/10 text-white shadow-card shadow-burgundy/20"
                      : "bg-background/60 border-navy/5 text-foreground hover:bg-background/90"
                  }`}
                >
                  <div>
                    <span className={`text-xs font-semibold uppercase tracking-wider block mb-1 ${
                      activeTab === idx ? "text-white/80" : "text-burgundy-light"
                    }`}>
                      {item.tag}
                    </span>
                    <span className="font-serif font-medium text-sm lg:text-base leading-snug">
                      {item.title.substring(0, 48)}...
                    </span>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
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
                <GlassCard hover={false} className="p-8 lg:p-12 h-full flex flex-col justify-between border-navy/10 bg-background/90 shadow-card">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-burgundy/10 text-burgundy-light border border-burgundy/15 text-xs font-semibold uppercase tracking-wider">
                        {cases[activeTab].tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl lg:text-3xl text-foreground mb-8 leading-snug">
                      {cases[activeTab].title}
                    </h3>

                    {/* Timeline Journey (Challenge -> Strategy -> Outcome) */}
                    <div className="relative border-l border-navy/10 pl-6 ml-3 space-y-8 mb-10">
                      
                      {/* Challenge */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-background border-2 border-red-500 flex items-center justify-center">
                          <AlertTriangle className="w-2 h-2 text-red-500" />
                        </div>
                        <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                          The Challenge
                        </h4>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          {cases[activeTab].challenge}
                        </p>
                      </div>

                      {/* Strategy */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-background border-2 border-amber-500 flex items-center justify-center">
                          <Lightbulb className="w-2 h-2 text-amber-500" />
                        </div>
                        <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                          Our Strategy
                        </h4>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          {cases[activeTab].strategy}
                        </p>
                      </div>

                      {/* Outcome */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-background border-2 border-green-600 flex items-center justify-center">
                          <CheckCircle2 className="w-2 h-2 text-green-600" />
                        </div>
                        <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                          The Outcome
                        </h4>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          {cases[activeTab].outcome}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Outcome Metrics */}
                  <div className="border-t border-navy/15 pt-8 grid grid-cols-3 gap-4">
                    {cases[activeTab].stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <p className="font-serif text-2xl lg:text-3xl text-gradient-gold font-semibold mb-1">
                          {stat.value}
                        </p>
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground leading-tight">
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
