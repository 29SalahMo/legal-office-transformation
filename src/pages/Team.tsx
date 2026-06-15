import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Award, Briefcase, Scale, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LuxuryPageShell from "@/components/LuxuryPageShell";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/motion/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { fetchTeamMembers, STATIC_TEAM_ROSTER, type TeamMember } from "@/lib/teamData";
import TeamMemberPhoto from "@/components/TeamMemberPhoto";
import { cardHover, staggerItem } from "@/lib/motionPresets";

const CATEGORY_ICONS: Record<string, typeof Scale> = {
  "Senior Associate": Scale,
  "Associate": Briefcase,
  "Junior Associate": Award,
  "Counsel": Scale,
  "Corporate": Building2,
};

const Team = () => {
  const { data: members = STATIC_TEAM_ROSTER } = useQuery({
    queryKey: ["team-members"],
    queryFn: fetchTeamMembers,
    placeholderData: STATIC_TEAM_ROSTER,
    staleTime: 1000 * 60 * 5,
  });

  const partners = members.filter((m) => m.role_category === "Partner");
  const otherCategories = ["Senior Associate", "Associate", "Junior Associate", "Counsel", "Corporate"];
  const grouped = otherCategories.reduce((acc, cat) => {
    const items = members.filter((m) => m.role_category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {} as Record<string, TeamMember[]>);

  return (
    <LuxuryPageShell>
      <SEOHead title="Our Team" description="Meet the founding partners and legal professionals at A&A Legal Advisors — experienced attorneys dedicated to exceptional client service." />
      <Header />
      <main id="main-content">

      <PageHero
        badge="Leadership"
        title={
          <>
            Meet Our
            <span className="text-primary block">Founding Partners</span>
          </>
        }
        subtitle="Our leadership team brings together decades of experience from Egypt's most prestigious law firms and international practice."
      />

      {/* Partners Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          {partners.map((partner, index) => (
            <ScrollReveal
              key={partner.id}
              variant={index % 2 === 0 ? "slideLeft" : "slideRight"}
              delay={index * 0.1}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start ${
                index !== partners.length - 1 ? "mb-24 pb-24 border-b border-border" : ""
              }`}
            >
              <Link to={`/team/${partner.id}`} className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                    <TeamMemberPhoto
                      name={partner.name}
                      photoUrl={partner.photo_url}
                      roleCategory={partner.role_category}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {partner.experience && (
                    <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-lg">
                      <p className="text-3xl font-bold">{partner.experience}</p>
                      <p className="text-sm text-primary-foreground/80">Experience</p>
                    </div>
                  )}
                </motion.div>
              </Link>

              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
                  {partner.name}
                </h2>
                <p className="text-primary font-medium text-lg mb-8">
                  {partner.title}
                </p>
                <div className="space-y-4 mb-8">
                  {(partner.bio || []).map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="flex gap-3">
                  {partner.linkedin_url && (
                    <a href={partner.linkedin_url} className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {partner.email && (
                    <a href={`mailto:${partner.email}`} className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                  {!partner.linkedin_url && !partner.email && (
                    <>
                      <a href="#" className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="#" className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Mail className="w-5 h-5" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal variant="fadeUp" className="mb-16">
            <span className="inline-block px-4 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground mb-6">
              Our Team
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
              A Strong Team Is
              <span className="text-primary block">Key to Success</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
              At A&A Legal Advisors, our success is driven by a team of highly skilled and dedicated professionals committed to delivering exceptional legal representation.
            </p>
          </ScrollReveal>

          {Object.entries(grouped).map(([category, items]) => {
            const Icon = CATEGORY_ICONS[category] || Briefcase;
            return (
              <ScrollReveal key={category} variant="fadeUp" className="mb-16 last:mb-0">
                <h3 className="font-serif text-2xl text-foreground mb-8 flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary" />
                  {category === "Corporate" ? "Counsel & Corporate" : `${category}s`}
                </h3>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-8% 0px" }}
                >
                  {items.map((member) => (
                    <Link to={`/team/${member.id}`} key={member.id}>
                      <motion.div
                        variants={staggerItem}
                        whileHover={cardHover}
                        className="bg-background rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer border border-transparent hover:border-burgundy/10"
                      >
                      <div className="w-14 h-14 rounded-full mb-4 overflow-hidden shrink-0">
                        <TeamMemberPhoto
                          name={member.name}
                          photoUrl={member.photo_url}
                          roleCategory={member.role_category}
                          className="w-full h-full object-cover"
                          fallbackClassName="w-full h-full text-lg"
                        />
                      </div>
                      <h4 className="font-serif text-lg text-foreground mb-1">{member.name}</h4>
                      <p className="text-primary text-sm font-medium mb-1">{member.title}</p>
                      {member.focus && <p className="text-muted-foreground text-sm">{member.focus}</p>}
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Work With Us CTA */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal variant="scaleIn" className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6">
              Work With Us
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Join a team built on integrity, expertise, and excellence. We're always looking for talented legal professionals who share our commitment to exceptional client service.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link to="/careers">View Career Opportunities</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </main>
    <Footer />
    </LuxuryPageShell>
  );
};

export default Team;
