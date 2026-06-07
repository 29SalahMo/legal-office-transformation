import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Calendar, User, BookOpen, Newspaper, Scale, Loader2 } from "lucide-react";
import LuxuryPageShell from "@/components/LuxuryPageShell";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const Insights = () => {
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

  const { data: newsArticles = [], isLoading: newsLoading } = useQuery({
    queryKey: ["news-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .eq("category", "News & Announcements")
        .order("created_at", { ascending: false })
        .limit(4);
      if (error) throw error;
      return data;
    },
  });

  const { data: legalArticles = [], isLoading: legalLoading } = useQuery({
    queryKey: ["legal-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .eq("category", "Legal Updates")
        .order("created_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  return (
    <LuxuryPageShell withScene={false}>
      <SEOHead title="Insights & Publications" description="Stay informed with the latest legal developments, thought leadership, and expert analysis from A&A Legal Advisors." />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary via-burgundy-dark to-charcoal overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5" />
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <p className="text-gold uppercase tracking-widest text-sm font-medium mb-4">
                Knowledge & Expertise
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6">
                Insights & Publications
              </h1>
              <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-2xl">
                Stay informed with the latest legal developments, thought leadership, 
                and expert analysis from A&A Legal Advisors.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-24 lg:py-32 bg-card">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-12"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-5 h-5 text-gold" />
                  <p className="text-gold uppercase tracking-widest text-sm font-medium">
                    Featured Articles
                  </p>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                  Thought Leadership
                </h2>
              </div>
              <Button variant="outline" className="hidden md:flex" asChild>
                <Link to="/insights/all">
                  View All Articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No articles published yet.</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article: any, index: number) => (
                  <Link to={`/insights/${article.slug}`} key={article.id}>
                    <motion.article
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group bg-background rounded-lg overflow-hidden shadow-elegant hover:shadow-hover transition-all duration-500 hover:-translate-y-2 h-full"
                    >
                      <div className="relative h-52 overflow-hidden">
                        {article.image_url ? (
                          <img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary" />
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                            {article.category}
                          </span>
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

                        <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                          {article.description}
                        </p>

                        <span className="inline-flex items-center text-primary text-sm font-medium uppercase tracking-wider group/btn">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>
            )}

            <div className="md:hidden mt-8 text-center">
              <Button variant="outline" asChild>
                <Link to="/insights/all">
                  View All Articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* News & Legal Updates Grid */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* News Column */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Newspaper className="w-5 h-5 text-gold" />
                    <p className="text-gold uppercase tracking-widest text-sm font-medium">
                      News & Announcements
                    </p>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                    Latest Updates
                  </h2>
                </motion.div>

                {newsLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : newsArticles.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground text-sm">No news articles yet.</div>
                ) : (
                  <div className="space-y-6">
                    {newsArticles.map((news: any, index: number) => (
                      <Link to={`/insights/${news.slug}`} key={news.id}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="group p-6 bg-card rounded-lg border border-border hover:border-primary/30 hover:shadow-elegant transition-all duration-300"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                              {news.category}
                            </span>
                            <span className="text-sm text-muted-foreground flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(news.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                            </span>
                          </div>
                          <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                            {news.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {news.description}
                          </p>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Legal Updates Sidebar */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Scale className="w-5 h-5 text-gold" />
                    <p className="text-gold uppercase tracking-widest text-sm font-medium">
                      Legal Updates
                    </p>
                  </div>
                  <h2 className="font-serif text-2xl text-foreground">
                    Regulatory Changes
                  </h2>
                </motion.div>

                {legalLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : legalArticles.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">No legal updates yet.</div>
                ) : (
                  <div className="space-y-4">
                    {legalArticles.map((update: any, index: number) => (
                      <Link to={`/insights/${update.slug}`} key={update.id}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="p-5 bg-card rounded-lg border border-border hover:border-gold/30 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Scale className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground mb-1">
                                {update.title}
                              </h4>
                              <p className="text-xs text-gold mb-2">
                                {new Date(update.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {update.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Newsletter CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-8 p-6 bg-gradient-to-br from-primary to-burgundy-dark rounded-lg text-primary-foreground"
                >
                  <h3 className="font-serif text-xl mb-3">Stay Informed</h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Subscribe to receive legal updates and insights directly in your inbox.
                  </p>
                  <Button variant="heroSecondary" size="sm" className="w-full">
                    Subscribe to Newsletter
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </LuxuryPageShell>
  );
};

export default Insights;
