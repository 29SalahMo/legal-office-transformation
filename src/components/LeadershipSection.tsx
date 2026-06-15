import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import SectionBadge from "@/components/ui/SectionBadge";
import { fetchHomepageLeaders, STATIC_TEAM_ROSTER } from "@/lib/teamData";
import TeamMemberPhoto from "@/components/TeamMemberPhoto";
import TiltCard from "@/components/motion/TiltCard";
import { slideFromLeft, slideFromRight, viewportReveal } from "@/lib/motionPresets";

const HOMEPAGE_LEADER_PLACEHOLDER = [
  ...STATIC_TEAM_ROSTER.filter((m) => m.role_category === "Partner"),
  ...STATIC_TEAM_ROSTER.filter((m) => m.role_category !== "Partner"),
].slice(0, 4);

const LeadershipSection = () => {
  const { data: teamMembers = STATIC_TEAM_ROSTER } = useQuery({
    queryKey: ["team-members-home"],
    queryFn: () => fetchHomepageLeaders(4),
    placeholderData: HOMEPAGE_LEADER_PLACEHOLDER,
    staleTime: 1000 * 60 * 5,
  });

  const leaders = teamMembers.map((m, i) => ({
    id: m.id,
    name: m.name,
    title: m.title,
    roleCategory: m.role_category,
    photoUrl: m.photo_url,
    bio: m.bio?.join(" ") || m.name + " is a highly qualified legal professional specializing in litigation and corporate advisory.",
    linkedin: m.linkedin_url || "",
    featured: i === 0,
  }));

  return (
    <section data-beam-section="expertise" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="architectural-grid opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] ambient-glow bg-burgundy/8 pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <SectionBadge className="mb-6">Leadership</SectionBadge>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight"
            >
              Advocates of Distinction
              <br />
              <span className="text-muted-foreground">& Legislative Authority</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((leader, index) => {
            const isEven = index % 2 === 0;
            return (
              <Link to={`/team/${leader.id}`} key={leader.id} className="block group">
                <motion.div
                  variants={isEven ? slideFromLeft : slideFromRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportReveal}
                  transition={{ 
                    delay: index * 0.08,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                <TiltCard>
                  <div className="relative rounded-3xl overflow-hidden h-[420px] cursor-pointer border border-border group-hover:border-luxury-gold/50 transition-all duration-500 shadow-card gold-border-trace">
                    
                    {/* Portrait Photo */}
                    <TeamMemberPhoto
                      name={leader.name}
                      photoUrl={leader.photoUrl}
                      roleCategory={leader.roleCategory}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter group-hover:brightness-[0.95]"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/30 to-transparent" />
                    
                    {/* Golden Sweep Glow Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Bio Snippet and Title Details */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end min-h-[140px] translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                      
                      <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold mb-1 opacity-80">
                        {leader.roleCategory}
                      </span>
                      
                      <h3 className="font-serif text-xl text-white mb-1 group-hover:text-luxury-gold transition-colors duration-300">
                        {leader.name}
                      </h3>
                      
                      <p className="text-white/70 text-xs mb-3 font-light">
                        {leader.title}
                      </p>

                      {/* Revealed Biography summary */}
                      <p className="text-white/60 text-[11px] leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {leader.bio}
                      </p>

                    </div>
                  </div>
                </TiltCard>
                </motion.div>
              </Link>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link to="/team">
            <Button variant="outline" size="lg" className="rounded-full px-8 border-border bg-background/60 text-foreground hover:bg-background hover:border-burgundy/30 transition-all duration-300">
              View All Team Members
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipSection;
