import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle, User, Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface LeadFormProps {
  className?: string;
  compact?: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({ className = "", compact = false }) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedDept, setSelectedDept] = useState("litigation");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: t("lead_litigation"),
    message: "",
  });

  const [activeField, setActiveField] = useState<string | null>(null);

  const departments = [
    { id: "litigation", label: t("lead_litigation") },
    { id: "corporate", label: t("lead_corporate") },
    { id: "capital", label: t("lead_capital") },
    { id: "inquiry", label: t("lead_inquiry") },
  ];

  const sanitizeInput = (val: string) => val.replace(/<[^>]*>/g, '').trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: formData.phone.trim() ? sanitizeInput(formData.phone) : null,
        subject: sanitizeInput(formData.subject || selectedDept),
        message: sanitizeInput(formData.message),
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: t("lead_success_title"),
        description: t("lead_success_desc"),
      });
      setFormData({ name: "", email: "", phone: "", subject: t("lead_litigation"), message: "" });
    } catch {
      toast({
        title: language === "ar" ? "خطأ في الإرسال" : "Submission Error",
        description: language === "ar" ? "يرجى التواصل عبر البريد الإلكتروني info@asalegaladvisors.com" : "Please email info@asalegaladvisors.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldClass = (fieldName: string) => {
    const isFocused = activeField === fieldName;
    const hasValue = !!formData[fieldName as keyof typeof formData];
    return `relative border rounded-xl px-3.5 ${compact ? "py-2.5" : "py-3"} transition-all duration-300 ${
      isFocused
        ? "border-luxury-gold shadow-[0_0_15px_rgba(170,124,17,0.2)] bg-background/95"
        : hasValue
        ? "border-burgundy/25 bg-background/80"
        : "border-border/60 bg-background/50"
    }`;
  };

  return (
    <div className={`p-6 sm:p-8 bg-background/85 backdrop-blur-xl shadow-[0_20px_50px_rgba(82,11,16,0.12)] border border-luxury-gold/30 rounded-3xl relative overflow-hidden gold-border-trace ${className}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-luxury-gold/10 via-transparent to-transparent pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="lead-form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="mb-5 border-b border-border/40 pb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-[10px] uppercase tracking-widest text-luxury-gold font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-ping" />
                  {language === "ar" ? "استشارة سريعة" : "Priority Intake"}
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-foreground font-bold leading-tight">
                {t("lead_title")}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-light">
                {t("lead_subtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Practice Area Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  {t("lead_practice_area")}
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {departments.map((dept) => {
                    const isSelected = selectedDept === dept.id;
                    return (
                      <button
                        key={dept.id}
                        type="button"
                        onClick={() => {
                          setSelectedDept(dept.id);
                          setFormData((prev) => ({ ...prev, subject: dept.label }));
                        }}
                        className={`text-left rtl:text-right px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 truncate ${
                          isSelected
                            ? "border-luxury-gold bg-gradient-to-r from-burgundy/15 to-luxury-gold/15 text-foreground font-bold shadow-sm"
                            : "border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        }`}
                      >
                        {dept.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid sm:grid-cols-2 gap-2.5">
                <div className={getFieldClass("name")}>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setActiveField("name")}
                      onBlur={() => setActiveField(null)}
                      placeholder={t("lead_name")}
                      className="w-full bg-transparent border-0 outline-none text-foreground text-xs placeholder:text-muted-foreground/60"
                    />
                  </div>
                </div>

                <div className={getFieldClass("email")}>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setActiveField("email")}
                      onBlur={() => setActiveField(null)}
                      placeholder={t("lead_email")}
                      className="w-full bg-transparent border-0 outline-none text-foreground text-xs placeholder:text-muted-foreground/60"
                    />
                  </div>
                </div>
              </div>

              {/* Phone Input */}
              <div className={getFieldClass("phone")}>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    onFocus={() => setActiveField("phone")}
                    onBlur={() => setActiveField(null)}
                    placeholder={t("lead_phone")}
                    className="w-full bg-transparent border-0 outline-none text-foreground text-xs placeholder:text-muted-foreground/60"
                  />
                </div>
              </div>

              {/* Message Details */}
              <div className={getFieldClass("message")}>
                <div className="flex items-start gap-2 pt-0.5">
                  <MessageSquare className="w-3.5 h-3.5 text-luxury-gold shrink-0 mt-0.5" />
                  <textarea
                    name="message"
                    required
                    rows={compact ? 2 : 3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setActiveField("message")}
                    onBlur={() => setActiveField(null)}
                    placeholder={t("lead_message_placeholder")}
                    className="w-full bg-transparent border-0 outline-none text-foreground text-xs placeholder:text-muted-foreground/60 resize-none font-light"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl text-xs font-semibold bg-gradient-to-r from-burgundy via-burgundy-light to-burgundy text-white shadow-[0_0_24px_rgba(82,11,16,0.35)] hover:shadow-[0_0_32px_rgba(170,124,17,0.4)] transition-all duration-300 gold-shimmer-sweep flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>{t("lead_submitting")}</span>
                  </>
                ) : (
                  <>
                    <Send className={`w-3.5 h-3.5 text-white ${language === "ar" ? "rotate-180" : ""}`} />
                    <span>{t("lead_submit")}</span>
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="lead-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-8 flex flex-col items-center justify-center space-y-4"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-xl text-foreground font-bold">
              {t("lead_success_title")}
            </h4>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed font-light">
              {t("lead_success_desc")}
            </p>
            <Button
              onClick={() => setIsSuccess(false)}
              variant="outline"
              size="sm"
              className="rounded-full px-6 border-border/80 bg-background/60 hover:bg-background text-xs"
            >
              {t("lead_submit_another")}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeadForm;
