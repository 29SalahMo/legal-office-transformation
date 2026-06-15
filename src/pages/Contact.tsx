import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import LuxuryPageShell from "@/components/LuxuryPageShell";
import PageHero from "@/components/motion/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { cardHover } from "@/lib/motionPresets";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contactInfo = [
  {
    icon: MapPin,
    title: "Office Address",
    details: ["20, Kawthar St, Al Dokki, Giza", "5th Floor"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["02 334 565 42"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@asalegaladvisors.com"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Sunday - Thursday: 9:00 AM - 6:00 PM", "Friday - Saturday: Closed"],
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [activeField, setActiveField] = useState<string | null>(null);

  const sanitizeInput = (val: string) => {
    return val.replace(/<[^>]*>/g, '').trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: formData.phone.trim() ? sanitizeInput(formData.phone) : null,
        subject: formData.subject.trim() ? sanitizeInput(formData.subject) : null,
        message: sanitizeInput(formData.message),
      });
      if (error) throw error;
      
      setIsSuccess(true);
      toast({
        title: "Submission Received",
        description: "Your consultation request is now registered with our partners.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast({
        title: "Submission Error",
        description: "Failed to dispatch request. Please email info@asalegaladvisors.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Shared animated field styles
  const getFieldWrapperClass = (name: string) => {
    const isFocused = activeField === name;
    const hasValue = !!formData[name as keyof typeof formData];
    return `relative border rounded-2xl p-4 transition-all duration-300 ${
      isFocused 
        ? "border-luxury-gold shadow-[0_0_15px_rgba(170,124,17,0.15)] bg-background" 
        : hasValue 
          ? "border-burgundy/20 bg-background/80" 
          : "border-navy/10 bg-background/40"
    }`;
  };

  return (
    <LuxuryPageShell>
      <SEOHead title="Contact Us" description="Secure your consultation with A&A Legal Advisors. Contact Egyptian boutique litigation, arbitration, M&A lawyers." />
      <Header />
      <main id="main-content">

      <PageHero
        badge="Get in Touch"
        title={
          <>
            Initiate Consultation &
            <span className="text-gradient-gold block mt-1">Acquire Representation</span>
          </>
        }
        subtitle="Our partners stand ready to counsel, defend, and represent your interests. Secure client intake below."
      />

      <section data-beam-section="contact" className="py-20 lg:py-28 relative z-10 overflow-hidden">
        <div className="architectural-grid opacity-15" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            
            {/* Contact Form Wrapper */}
            <ScrollReveal variant="slideLeft" className="lg:col-span-3">
              <GlassCard hover={false} className="p-8 lg:p-12 relative overflow-hidden bg-background/80 backdrop-blur-md shadow-card">
                
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                        Start Client Intake
                      </h2>
                      <p className="text-muted-foreground mb-8">
                        Enter your transaction or dispute particulars below to query our partners.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          
                          {/* Full Name */}
                          <div className={getFieldWrapperClass("name")}>
                            <label htmlFor="name" className={`absolute left-4 transition-all duration-300 text-xs font-semibold uppercase tracking-wider ${
                              activeField === "name" || formData.name ? "-top-2 px-2 bg-background text-luxury-gold" : "top-4 text-muted-foreground"
                            }`}>
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              onFocus={() => setActiveField("name")}
                              onBlur={() => setActiveField(null)}
                              className="w-full bg-transparent border-0 outline-none text-foreground text-sm pt-2"
                              placeholder={activeField === "name" ? "e.g. Dr. Sherif Aly" : ""}
                            />
                          </div>

                          {/* Email Address */}
                          <div className={getFieldWrapperClass("email")}>
                            <label htmlFor="email" className={`absolute left-4 transition-all duration-300 text-xs font-semibold uppercase tracking-wider ${
                              activeField === "email" || formData.email ? "-top-2 px-2 bg-background text-luxury-gold" : "top-4 text-muted-foreground"
                            }`}>
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              onFocus={() => setActiveField("email")}
                              onBlur={() => setActiveField(null)}
                              className="w-full bg-transparent border-0 outline-none text-foreground text-sm pt-2"
                              placeholder={activeField === "email" ? "e.g. corporate@client.com" : ""}
                            />
                          </div>

                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          
                          {/* Phone Number */}
                          <div className={getFieldWrapperClass("phone")}>
                            <label htmlFor="phone" className={`absolute left-4 transition-all duration-300 text-xs font-semibold uppercase tracking-wider ${
                              activeField === "phone" || formData.phone ? "-top-2 px-2 bg-background text-luxury-gold" : "top-4 text-muted-foreground"
                            }`}>
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              onFocus={() => setActiveField("phone")}
                              onBlur={() => setActiveField(null)}
                              className="w-full bg-transparent border-0 outline-none text-foreground text-sm pt-2"
                              placeholder={activeField === "phone" ? "+20" : ""}
                            />
                          </div>

                          {/* Subject */}
                          <div className={getFieldWrapperClass("subject")}>
                            <label htmlFor="subject" className={`absolute left-4 transition-all duration-300 text-xs font-semibold uppercase tracking-wider ${
                              activeField === "subject" || formData.subject ? "-top-2 px-2 bg-background text-luxury-gold" : "top-4 text-muted-foreground"
                            }`}>
                              Subject *
                            </label>
                            <input
                              type="text"
                              id="subject"
                              name="subject"
                              required
                              value={formData.subject}
                              onChange={handleChange}
                              onFocus={() => setActiveField("subject")}
                              onBlur={() => setActiveField(null)}
                              className="w-full bg-transparent border-0 outline-none text-foreground text-sm pt-2"
                              placeholder={activeField === "subject" ? "e.g. Litigation Advisory" : ""}
                            />
                          </div>

                        </div>

                        {/* Message Description */}
                        <div className={getFieldWrapperClass("message")}>
                          <label htmlFor="message" className={`absolute left-4 transition-all duration-300 text-xs font-semibold uppercase tracking-wider ${
                            activeField === "message" || formData.message ? "-top-2 px-2 bg-background text-luxury-gold" : "top-4 text-muted-foreground"
                          }`}>
                            Case Details / Legal Inquiry *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setActiveField("message")}
                            onBlur={() => setActiveField(null)}
                            className="w-full bg-transparent border-0 outline-none text-foreground text-sm pt-2 resize-none"
                            placeholder={activeField === "message" ? "Please detail the timeline, stakeholders, and jurisdiction..." : ""}
                          />
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full md:w-auto rounded-full px-10 relative overflow-hidden transition-all duration-300 shadow-md"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin text-white" />
                          ) : (
                            <Send className="w-4 h-4 mr-2 text-white" />
                          )}
                          {isSubmitting ? "Dispatching..." : "Submit Case Brief"}
                        </Button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-12 flex flex-col items-center justify-center space-y-6"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500 flex items-center justify-center text-green-500 shadow-[0_0_24px_rgba(34,197,94,0.2)]">
                        <CheckCircle className="w-10 h-10" />
                      </div>
                      <h2 className="font-serif text-3xl text-foreground">
                        Secure Transmission Established
                      </h2>
                      <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                        Your brief has been encrypted and submitted directly to the partners of A&A Legal Advisors. A response or call coordinate will be issued within 24 business hours.
                      </p>
                      <Button
                        onClick={() => setIsSuccess(false)}
                        variant="outline"
                        className="rounded-full px-8 border-navy/20 bg-background/50 hover:bg-background"
                      >
                        File Another Request
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </GlassCard>
            </ScrollReveal>

            {/* Info Cards Column */}
            <ScrollReveal variant="slideRight" delay={0.15} className="lg:col-span-2 space-y-6">
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
