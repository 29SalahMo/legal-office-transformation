import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Calendar, User, BookOpen, Newspaper, Scale, Loader2 } from "lucide-react";
import LuxuryPageShell from "@/components/LuxuryPageShell";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/motion/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { cardHover, staggerItem } from "@/lib/motionPresets";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Insights = () => {
  const { t, language } = useLanguage();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  return (
    <LuxuryPageShell>
      <SEOHead title={t("nav_insights")} description="Legal insights and court analysis from A&A Legal Advisors." />
      <Header />
      <main id="main-content">
        <PageHero
          variant="burgundy"
          badge={t("nav_insights")}
          title={t("page_insights_hero_title")}
          subtitle={t("page_insights_hero_sub")}
        />

        {/* Featured Articles */}
        <section className="py-24 lg:py-32 bg-card">
          <div className="container mx-auto px-6 lg:px-12">
            <ScrollReveal variant="fadeUp" className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-5 h-5 text-gold" />
                  <p className="text-gold uppercase tracking-widest text-sm font-medium">
                    {t("nav_insights")}
                  </p>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground font-bold">
                  {t("page_insights_hero_title")}
                </h2>
              </div>
            </ScrollReveal>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {language === "ar" ? "لا توجد أبحاث منشورة حالياً." : "No articles published yet."}
              </div>
            ) : (
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {articles.map((article: any) => (
                  <Link to={`/insights/${article.slug}`} key={article.id}>
                    <motion.article
                      variants={staggerItem}
                      whileHover={cardHover}
                      className="group bg-background rounded-2xl overflow-hidden shadow-elegant hover:shadow-hover transition-all duration-500 h-full border border-border/50"
                    >
                      <div className="p-6 lg:p-8">
                        <div className="flex items-center text-xs text-muted-foreground mb-4">
                          <User className="w-3.5 h-3.5 mr-1" />
                          <span className="font-semibold text-primary">{article.author}</span>
                        </div>

                        <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300 font-bold">
                          {article.title}
                        </h3>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 font-light">
                          {article.description}
                        </p>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </LuxuryPageShell>
  );
};

export default Insights;
