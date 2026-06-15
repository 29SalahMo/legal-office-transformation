import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import LuxuryPageShell from "@/components/LuxuryPageShell";
import PageHero from "@/components/motion/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { cardHover } from "@/lib/motionPresets";
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

  const inputClass =
    "h-12 rounded-xl bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-burgundy/50";
  const textareaClass =
    "min-h-[150px] rounded-xl resize-none bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-burgundy/50";

  return (
    <LuxuryPageShell>
      <SEOHead title="Contact Us" description="Get in touch with A&A Legal Advisors. Visit us at 20 Kawthar St, Al Dokki, Giza or call 02 334 565 42." />
      <Header />

      <PageHero
        badge="Get in Touch"
        title={
          <>
            Let's Discuss Your
            <span className="text-primary block">Legal Needs</span>
          </>
        }
        subtitle="Our team is ready to provide the counsel and representation you need. Reach out to schedule a consultation."
      />

      <section className="py-20 lg:py-28 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <ScrollReveal variant="slideLeft" className="lg:col-span-3">
              <GlassCard hover={false} className="p-8 lg:p-12">
                <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you promptly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+20 xxx xxx xxxx"
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-foreground">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your legal matter..."
                      required
                      className={textareaClass}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto rounded-full px-10" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal variant="slideRight" delay={0.15} className="lg:col-span-2 space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div key={index} whileHover={cardHover}>
                  <GlassCard hover className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-burgundy/10 border border-burgundy/15">
                      <item.icon className="w-5 h-5 text-burgundy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground text-sm">
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

      <Footer />
    </LuxuryPageShell>
  );
};

export default Contact;
