import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LuxuryPageShell from "@/components/LuxuryPageShell";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Scale, Users, Building2, Briefcase, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Scale,
    title: "Dispute Resolution & Litigation",
    description: "A&A's Litigation team is highly qualified and experienced in handling a wide range of cases, including Civil, Labor and Social Insurance, Commercial, Intellectual Property, Taxation, Insurance, Corporate, and Capital Market matters. Our services also extend to criminal proceedings arising in corporate contexts.",
    details: [
      "Civil & Commercial Litigation",
      "Labor & Social Insurance",
      "Intellectual Property",
      "Taxation & Insurance",
      "Corporate & Capital Market",
      "Criminal Proceedings in Corporate Contexts"
    ],
    highlight: "We maintain open communication with our clients, ensuring they receive continuous updates on the progress of their cases. A&A is developing a digital platform designed to provide clients with real-time access to their case history and status."
  },
  {
    icon: Users,
    title: "Arbitration & Mediation",
    description: "Our Arbitration team possesses extensive experience in both institutional and ad-hoc arbitration proceedings in Egypt. We handle complex arbitration matters across various sectors, including industrial, construction, commercial, media, and telecommunications.",
    details: [
      "Institutional Arbitration",
      "Ad-hoc Arbitration",
      "Industrial & Construction",
      "Commercial & Media",
      "Telecommunications",
      "Strategic Dispute Resolution"
    ],
    highlight: "We offer strategic representation and tailored dispute resolution solutions focused on efficiency, confidentiality, and achieving optimal outcomes for our clients."
  },
  {
    icon: Building2,
    title: "General Corporate",
    description: "A&A Legal Advisors provides comprehensive corporate legal services supporting businesses from formation through daily operations. We advise on optimal legal structures, including the establishment of local, offshore, and onshore companies, licensing, registration, and governmental approvals.",
    details: [
      "Company Formation & Structuring",
      "Licensing & Registration",
      "Commercial Contracts",
      "Investment Matters",
      "Corporate Governance",
      "Regulatory Compliance"
    ],
    highlight: "Our Firm also has particular expertise in investment-related matters and work residence permits, as well as corporate governance including board and general assembly minutes."
  },
  {
    icon: Briefcase,
    title: "Employment",
    description: "Our Employment department advises multinational and local clients across all aspects of Egyptian labor law and represents clients before Egyptian courts. We provide comprehensive labor support, including guidance on employee dismissals, contract termination, and compliance with labor laws.",
    details: [
      "Employment Contracts",
      "Internal Company Policies",
      "Employee Dismissals",
      "Labor Compliance",
      "Internal Investigations",
      "M&A Labor Issues"
    ],
    highlight: "Our services include drafting employment contracts, internal company policies, conducting internal investigations, and managing labor issues arising from mergers and acquisitions."
  },
  {
    icon: Shield,
    title: "Competition & Consumer Protection",
    description: "A&A advises businesses on compliance with competition and consumer protection regulations in Egypt. We assist clients in structuring operations to meet regulatory requirements, handling investigations, and managing disputes related to unfair competition and consumer rights.",
    details: [
      "Regulatory Compliance",
      "Competition Law",
      "Consumer Protection",
      "Investigations",
      "Dispute Management",
      "Risk Minimization"
    ],
    highlight: "Our approach focuses on minimizing legal risk while ensuring business continuity and regulatory alignment."
  }
];

const Services = () => {
  return (
    <LuxuryPageShell withScene={false}>
      <SEOHead title="Services" description="Explore our legal services including dispute resolution, arbitration, corporate law, employment law, and competition law at A&A Legal Advisors." />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <p className="text-primary uppercase tracking-widest text-sm font-medium mb-4">
                Our Services
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
                Comprehensive Legal<br />
                <span className="text-primary">Solutions</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl">
                We provide expert legal services across multiple disciplines, delivering innovative 
                and pragmatic solutions to even the most complex legal challenges.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="space-y-16 lg:space-y-24">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-start ${
                    index % 2 === 1 ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <service.icon className="w-7 h-7 text-primary" />
                      </div>
                      <span className="text-muted-foreground text-sm font-medium">
                        0{index + 1}
                      </span>
                    </div>
                    
                    <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-6">
                      {service.title}
                    </h2>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    
                    <div className="bg-secondary/50 rounded-2xl p-6 mb-8">
                      <p className="text-foreground/80 text-sm leading-relaxed italic">
                        "{service.highlight}"
                      </p>
                    </div>
                    
                  </div>

                  {/* Details Card */}
                  <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-card h-full">
                      <h3 className="font-serif text-xl text-foreground mb-6">
                        Key Practice Areas
                      </h3>
                      <div className="space-y-4">
                        {service.details.map((detail, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-4 group"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-primary">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6">
                Ready to Discuss Your Legal Needs?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-10">
                Contact us today for a confidential consultation with our expert legal team.
              </p>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-8"
                asChild
              >
                <Link to="/contact">
                  Schedule a Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </LuxuryPageShell>
  );
};

export default Services;
