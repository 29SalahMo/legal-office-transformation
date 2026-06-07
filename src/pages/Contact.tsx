import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import LuxuryPageShell from "@/components/LuxuryPageShell";
import SectionBadge from "@/components/ui/SectionBadge";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        subject: formData.subject.trim() || null,
        message: formData.message.trim(),
      });
      if (error) throw error;
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll respond within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <LuxuryPageShell>
      <SEOHead title="Contact Us" description="Get in touch with A&A Legal Advisors. Visit us at 20 Kawthar St, Al Dokki, Giza or call 02 334 565 42." />
      <Header />

      <section className="relative pt-32 pb-20 min-h-[50vh] flex items-end">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <SectionBadge className="mb-6">Get in Touch</SectionBadge>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Let's Discuss Your
              <br />
              <span className="text-gradient-gold">Legal Needs</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed">
              Our team is ready to provide the counsel and representation you need.
              Reach out to schedule a consultation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <GlassCard hover={false} className="p-8 lg:p-12">
                <h2 className="font-serif text-2xl md:text-3xl text-white mb-2">
                  Send Us a Message
                </h2>
                <p className="text-white/55 mb-8">
                  Fill out the form below and we'll get back to you promptly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white/70">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="h-12 rounded-xl bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-luxury-gold/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white/70">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="h-12 rounded-xl bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-luxury-gold/50"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white/70">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+20 xxx xxx xxxx"
                        className="h-12 rounded-xl bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-luxury-gold/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white/70">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        required
                        className="h-12 rounded-xl bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-luxury-gold/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white/70">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your legal matter..."
                      required
                      className="min-h-[150px] rounded-xl resize-none bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-luxury-gold/50"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto rounded-full px-10" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {contactInfo.map((item, index) => (
                <GlassCard key={index} hover className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-luxury-gold/20 to-glow-blue/10 border border-white/10">
                      <item.icon className="w-5 h-5 text-luxury-gold-light" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-white/55 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </LuxuryPageShell>
  );
};

export default Contact;
