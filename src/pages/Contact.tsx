import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import LuxuryPageShell from "@/components/LuxuryPageShell";
import PageHero from "@/components/motion/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { cardHover } from "@/lib/motionPresets";
import GlassCard from "@/components/ui/GlassCard";
import LeadForm from "@/components/LeadForm";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t, language } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      title: language === "ar" ? "عنوان المكتب" : "Office Address",
      details: [t("footer_address")],
    },
    {
      icon: Phone,
      title: language === "ar" ? "الهاتف" : "Phone",
      details: [t("footer_phone")],
    },
    {
      icon: Mail,
      title: language === "ar" ? "البريد الإلكتروني" : "Email",
      details: [t("footer_email")],
    },
    {
      icon: Clock,
      title: language === "ar" ? "ساعات العمل" : "Office Hours",
      details: [
        language === "ar" ? "الأحد - الخميس: ٩:٠٠ ص - ٦:٠٠ م" : "Sunday - Thursday: 9:00 AM - 6:00 PM",
        language === "ar" ? "الجمعة - السبت: عطلة أسبوعية" : "Friday - Saturday: Closed",
      ],
    },
  ];

  return (
    <LuxuryPageShell>
      <SEOHead title={t("nav_contact")} description="Secure your consultation with A&A Legal Advisors." />
      <Header />
      <main id="main-content">

      <PageHero
        badge={t("nav_contact")}
        title={t("page_contact_hero_title")}
        subtitle={t("page_contact_hero_sub")}
      />

      <section data-beam-section="contact" className="py-20 lg:py-28 relative z-10 overflow-hidden">
        <div className="architectural-grid opacity-15" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            
            {/* Contact Form Wrapper */}
            <ScrollReveal variant="slideLeft" className="lg:col-span-3">
              <LeadForm />
            </ScrollReveal>

            {/* Info Cards Column */}
            <ScrollReveal variant="slideRight" delay={0.15} className="lg:col-span-2 space-y-6">
              
              {/* Animated Map Card representation */}
              <motion.div whileHover={cardHover}>
                <GlassCard hover className="p-6 bg-background/70 border border-navy/10 shadow-md gold-border-trace relative overflow-hidden h-[220px] group cursor-pointer" asChild>
                  <a href="https://maps.google.com/?q=20,+Kawthar+St,+Al+Dokki,+Giza" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-luxury-gold/30 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="relative h-full flex flex-col justify-between z-10">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-luxury-gold animate-ping" />
                          <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">
                            {language === "ar" ? "المقر الرئيسي" : "Live Headquarters"}
                          </span>
                        </div>
                        <h4 className="font-serif text-lg text-foreground group-hover:text-luxury-gold transition-colors font-bold">
                          {language === "ar" ? "مقر الدقي - الجيزة" : "Dokki Headquarters"}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 font-light">30.0384° N, 31.2117° E</p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-luxury-gold font-semibold uppercase tracking-wider mt-4">
                        <span>{language === "ar" ? "اتجاهات الخريطة" : "Get Directions"}</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  </a>
                </GlassCard>
              </motion.div>

              {contactInfo.map((item, index) => (
                <motion.div key={index} whileHover={cardHover}>
                  <GlassCard hover className="p-6 bg-background/70 border border-navy/10 shadow-md gold-border-trace">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-burgundy/10 border border-burgundy/15">
                        <item.icon className="w-5 h-5 text-burgundy" />
                      </div>
                      <div>
                        <h3 className="font-serif font-semibold text-foreground mb-1 group-hover:text-luxury-gold transition-colors duration-300">
                          {item.title}
                        </h3>
                        {item.details.map((detail, i) => (
                          <p key={i} className="text-muted-foreground text-sm font-light">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </ScrollReveal>

          </div>
        </div>
      </section>
    </main>

    <Footer />
    </LuxuryPageShell>
  );
};

export default Contact;
