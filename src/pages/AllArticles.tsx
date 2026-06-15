import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Calendar, User, Loader2 } from "lucide-react";
import LuxuryPageShell from "@/components/LuxuryPageShell";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/motion/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { cardHover, staggerItem } from "@/lib/motionPresets";

const AllArticles = () => {
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <LuxuryPageShell>
      <Header />
      <main id="main-content">
        <PageHero
          badge="Thought Leadership"
          title="All Articles"
          subtitle="Browse our complete collection of legal insights, analysis, and expert commentary."
        />

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 lg:px-12">
            {isLoading ? (
              <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
            ) : (
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {articles.map((article: any) => (
                  <Link to={`/insights/${article.slug}`} key={article.id}>
                    <motion.article
                      variants={staggerItem}
                      whileHover={cardHover}
                      className="group bg-card rounded-lg overflow-hidden shadow-elegant hover:shadow-hover transition-all duration-500 h-full"
                    >
                      <div className="relative h-52 overflow-hidden">
                        {article.image_url ? (
                          <img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary" />
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">{article.category}</span>
                        </div>
                      </div>
                      <div className="p-6 lg:p-8">
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <User className="w-4 h-4 mr-1" />
                          <span className="font-medium text-primary">{article.author}</span>
                          <span className="mx-2">•</span>
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{new Date(article.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                        </div>
                        <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">{article.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{article.description}</p>
                        <span className="inline-flex items-center text-primary text-sm font-medium uppercase tracking-wider">
                          Read More <ArrowRight className="w-4 h-4 ml-2" />
                        </span>
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

export default AllArticles;
