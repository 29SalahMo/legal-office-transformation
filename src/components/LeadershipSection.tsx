import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import SectionBadge from "@/components/ui/SectionBadge";
import { fetchHomepageLeaders, STATIC_TEAM_ROSTER } from "@/lib/teamData";
import TeamMemberPhoto from "@/components/TeamMemberPhoto";
import { scaleIn, viewportReveal } from "@/lib/motionPresets";

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
    bio: m.bio?.join(" ") || "",
    linkedin: m.linkedin_url || "",
    featured: i === 0,
  }));

  return (
    <section data-justice-journey="process" className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] ambient-glow bg-burgundy/8 pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <SectionBadge className="mb-6">Leadership</SectionBadge>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight"
            >
              Explore our comprehensive
              <br />
              <span className="text-muted-foreground">leadership team.</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {leaders.length > 0 && (
            <Link to={`/team/${leaders[0].id}`}>
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportReveal}
                className="group relative rounded-3xl overflow-hidden h-[400px] cursor-pointer border border-border hover:border-burgundy/30 transition-all duration-500 hover:shadow-hover"
              >
                <TeamMemberPhoto
                  name={leaders[0].name}
                  photoUrl={leaders[0].photoUrl}
                  roleCategory={leaders[0].roleCategory}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-serif text-xl text-white mb-1">{leaders[0].name}</h3>
                  <p className="text-white/80 text-sm">{leaders[0].title}</p>
                </div>
              </motion.div>
            </Link>
          )}

          {leaders.slice(1).map((leader, index) => (
            <Link to={`/team/${leader.id}`} key={leader.id}>
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportReveal}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="group relative rounded-3xl overflow-hidden h-[400px] cursor-pointer border border-border hover:border-burgundy/30 transition-all duration-500"
              >
                <TeamMemberPhoto
                  name={leader.name}
                  photoUrl={leader.photoUrl}
                  roleCategory={leader.roleCategory}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-serif text-xl text-white mb-1">{leader.name}</h3>
                  <p className="text-white/80 text-sm">{leader.title}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link to="/team">
            <Button variant="outline" size="lg" className="rounded-full px-8 border-border bg-background/60 text-foreground hover:bg-background hover:border-burgundy/30">
              View All Team Members
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipSection;
