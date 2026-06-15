import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Linkedin, Mail, ArrowLeft, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import LuxuryPageShell from "@/components/LuxuryPageShell";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchTeamMemberById } from "@/lib/teamData";

const TeamMember = () => {
  const { id } = useParams<{ id: string }>();

  const { data: member, isLoading } = useQuery({
    queryKey: ["team-member", id],
    queryFn: () => fetchTeamMemberById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <LuxuryPageShell withScene={false}>
        <Header />
        <div className="pt-32 pb-20 container mx-auto px-6 lg:px-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-48 bg-muted rounded" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-[4/5] bg-muted rounded-3xl" />
              <div className="space-y-4">
                <div className="h-10 w-64 bg-muted rounded" />
                <div className="h-6 w-40 bg-muted rounded" />
                <div className="h-32 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </LuxuryPageShell>
    );
  }

  if (!member) {
    return (
      <LuxuryPageShell withScene={false}>
        <Header />
        <div className="pt-32 pb-20 container mx-auto px-6 lg:px-12 text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Member Not Found</h1>
          <Link to="/team">
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Team
            </Button>
          </Link>
        </div>
        <Footer />
      </LuxuryPageShell>
    );
  }

  return (
    <LuxuryPageShell withScene={false}>
      <Header />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <Link to="/team" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Team</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-card">
                  <img
                    src={member.photo_url!}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {member.experience && (
                  <div className="absolute -bottom-6 -right-6 glass-panel rounded-2xl p-6">
                    <p className="text-3xl font-bold text-gradient-gold">{member.experience}</p>
                    <p className="text-sm text-muted-foreground">Experience</p>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="section-badge mb-4">
                {member.role_category}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-2">
                {member.name}
              </h1>
              <p className="text-burgundy font-medium text-lg mb-2">{member.title}</p>
              {member.focus && (
                <p className="text-muted-foreground flex items-center gap-2 mb-8">
                  <Briefcase className="w-4 h-4" />
                  {member.focus}
                </p>
              )}

              {member.bio && member.bio.length > 0 && (
                <div className="space-y-4 mb-8">
                  {member.bio.map((paragraph: string, i: number) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center text-burgundy hover:border-burgundy/40 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center text-burgundy hover:border-burgundy/40 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy/5 via-transparent to-burgundy/5 pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto glass-panel p-10"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              Get in Touch
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Reach out to discuss how we can assist you with your legal needs.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-border text-foreground hover:border-burgundy/30"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </LuxuryPageShell>
  );
};

export default TeamMember;
