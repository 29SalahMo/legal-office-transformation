import LuxuryPageShell from "@/components/LuxuryPageShell";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Briefcase, Users, Award, TrendingUp, MapPin, Clock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const benefits = [
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Clear progression path with mentorship from senior partners and international training opportunities.",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Work alongside Egypt's finest legal minds in a supportive, team-oriented environment.",
  },
  {
    icon: Award,
    title: "Recognition & Rewards",
    description: "Competitive compensation, performance bonuses, and recognition for exceptional work.",
  },
  {
    icon: Briefcase,
    title: "Meaningful Work",
    description: "Handle landmark cases and transactions that shape Egyptian business and legal landscape.",
  },
];

const Careers = () => {
  const { data: openPositions = [], isLoading } = useQuery({
    queryKey: ["job_postings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_postings")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
     <LuxuryPageShell withScene={false}>
       <SEOHead title="Careers" description="Join A&A Legal Advisors — explore career opportunities at one of Egypt's most respected boutique law firms." />
       <Header />
 
       {/* Hero Section */}
       <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-primary via-primary to-burgundy-dark overflow-hidden">
         <div className="absolute inset-0 opacity-10">
           <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
           <div className="absolute bottom-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
         </div>
         <div className="container mx-auto px-6 lg:px-12 relative z-10">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="max-w-3xl"
           >
             <Badge className="bg-white/20 text-white border-white/30 mb-6">
               Join Our Team
             </Badge>
             <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
               Build Your Legal Career with Excellence
             </h1>
             <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
               Join one of Egypt's most respected law firms and work on matters that make a difference. We're looking for talented individuals who share our commitment to excellence.
             </p>
           </motion.div>
         </div>
       </section>
 
       {/* Why Join Us */}
       <section className="py-20 lg:py-28">
         <div className="container mx-auto px-6 lg:px-12">
           <div className="text-center mb-16">
             <Badge variant="outline" className="mb-4">Why A&A Legal</Badge>
             <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
               Why Build Your Career Here
             </h2>
             <p className="text-muted-foreground max-w-2xl mx-auto">
               We invest in our people because we know that our success is built on the talent and dedication of our team.
             </p>
           </div>
 
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {benefits.map((benefit, index) => (
               <motion.div
                 key={benefit.title}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
               >
                 <Card className="h-full border-0 shadow-card hover:shadow-hover transition-all duration-300 bg-card">
                   <CardContent className="p-6">
                     <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                       <benefit.icon className="w-6 h-6 text-primary" />
                     </div>
                     <h3 className="font-serif text-lg text-foreground mb-2">{benefit.title}</h3>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                       {benefit.description}
                     </p>
                   </CardContent>
                 </Card>
               </motion.div>
             ))}
           </div>
         </div>
       </section>
 
       {/* Open Positions */}
       <section className="py-20 lg:py-28 bg-secondary/30">
         <div className="container mx-auto px-6 lg:px-12">
           <div className="text-center mb-16">
             <Badge variant="outline" className="mb-4">Opportunities</Badge>
             <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
               Open Positions
             </h2>
             <p className="text-muted-foreground max-w-2xl mx-auto">
               Explore our current openings and find the role that matches your expertise and ambitions.
             </p>
           </div>
 
           <div className="max-w-4xl mx-auto space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : openPositions.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">No open positions at the moment. Check back soon!</p>
            ) : (
              openPositions.map((position, index) => (
                <motion.div
                  key={position.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-card hover:shadow-hover transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">
                              {position.title}
                            </h3>
                            {position.department && (
                              <Badge variant="secondary" className="text-xs">
                                {position.department}
                              </Badge>
                            )}
                          </div>
                          {position.description && (
                            <p className="text-muted-foreground text-sm mb-3">
                              {position.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {position.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {position.location}
                              </span>
                            )}
                            {position.type && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {position.type}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button variant="outline" className="rounded-full shrink-0 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                          Apply Now
                          <ArrowUpRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
            </div>
          </div>
        </section>
 
       {/* CTA Section */}
       <section className="py-20 lg:py-28">
         <div className="container mx-auto px-6 lg:px-12">
           <Card className="bg-charcoal border-0 overflow-hidden">
             <CardContent className="p-12 lg:p-16 text-center">
               <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                 Don't See the Right Role?
               </h2>
               <p className="text-white/70 max-w-2xl mx-auto mb-8">
                 We're always looking for exceptional talent. Send us your CV and we'll keep you in mind for future opportunities that match your profile.
               </p>
               <Button className="rounded-full px-8 bg-white text-charcoal hover:bg-white/90">
                 Submit Your CV
                 <ArrowUpRight className="w-4 h-4 ml-2" />
               </Button>
             </CardContent>
           </Card>
         </div>
       </section>
 
       <Footer />
     </LuxuryPageShell>
   );
 };
 
 export default Careers;