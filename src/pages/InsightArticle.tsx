import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Loader2 } from "lucide-react";
import LuxuryPageShell from "@/components/LuxuryPageShell";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const InsightArticle = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <LuxuryPageShell withScene={false}>
        <Header />
        <main className="pt-32 pb-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </main>
        <Footer />
      </LuxuryPageShell>
    );
  }

  if (!article) {
    return (
      <LuxuryPageShell withScene={false}>
        <Header />
        <main className="pt-32 pb-20 container mx-auto px-6 lg:px-12 text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Button asChild><Link to="/insights">Back to Insights</Link></Button>
        </main>
        <Footer />
      </LuxuryPageShell>
    );
  }

  return (
    <LuxuryPageShell withScene={false}>
      <Header />
      <main>
        <section className="relative h-[50vh] min-h-[400px]">
          {article.image_url ? (
            <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary via-burgundy-dark to-charcoal" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
            <div className="container mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mt-4 max-w-3xl leading-tight">
                  {article.title}
                </h1>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <div className="flex items-center text-sm text-muted-foreground mb-10 pb-8 border-b border-border">
                  <User className="w-4 h-4 mr-2" />
                  <span className="font-medium text-primary">{article.author}</span>
                  <span className="mx-3">•</span>
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(article.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                </div>

                <div className="space-y-6">
                  {(article.content || []).map((paragraph: string, idx: number) => (
                    <p key={idx} className="text-foreground/85 text-lg leading-relaxed">{paragraph}</p>
                  ))}
                </div>

                <div className="mt-16 pt-8 border-t border-border">
                  <Button variant="outline" asChild>
                    <Link to="/insights"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </LuxuryPageShell>
  );
};

export default InsightArticle;
