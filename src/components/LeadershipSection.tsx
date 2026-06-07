import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import SectionBadge from "@/components/ui/SectionBadge";
import partnerMale from "@/assets/partner-male.jpg";

const LeadershipSection = () => {
  const { data: teamMembers = [] } = useQuery({
    queryKey: ["team-members-home"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order", { ascending: true })
        .limit(4);
      if (error) throw error;
      return data;
    },
  });

  const leaders = teamMembers.length > 0
    ? teamMembers.map((m, i) => ({
        id: m.id,
        image: m.photo_url || partnerMale,
        name: m.name,
        title: m.title,
        bio: m.bio?.join(" ") || "",
        linkedin: m.linkedin_url || "",
        featured: i === 0,
      }))
    : [
        { id: "", image: partnerMale, name: "Partner Name", title: "Managing Partner", bio: "", linkedin: "", featured: true },
      ];

  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] ambient-glow bg-luxury-gold/10 pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <SectionBadge className="mb-6">Leadership</SectionBadge>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight"
            >
              Explore our comprehensive
              <br />
              <span className="text-white/50">leadership team.</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {leaders.length > 0 && (
            <Link to={`/team/${leaders[0].id}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative rounded-3xl overflow-hidden h-[400px] cursor-pointer border border-white/10 hover:border-luxury-gold/30 transition-all duration-500 hover:shadow-luxury"
              >
                <img
                  src={leaders[0].image}
                  alt={leaders[0].name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/95 via-[#050816]/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-serif text-xl text-white mb-1">{leaders[0].name}</h3>
                  <p className="text-white/60 text-sm">{leaders[0].title}</p>
                </div>
              </motion.div>
            </Link>
          )}

          {leaders.slice(1).map((leader, index) => (
            <Link to={`/team/${leader.id}`} key={leader.name}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group relative rounded-3xl overflow-hidden h-[400px] cursor-pointer border border-white/10 hover:border-luxury-gold/30 transition-all duration-500"
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/95 via-[#050816]/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-serif text-xl text-white mb-1">{leader.name}</h3>
                  <p className="text-white/60 text-sm">{leader.title}</p>
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
            <Button variant="outline" size="lg" className="rounded-full px-8 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-luxury-gold/40">
              View All Team Members
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipSection;
