import { motion } from "framer-motion";
import { useJusticeBeam } from "@/contexts/JusticeBeamContext";
import { BEAM_SECTIONS } from "@/lib/justiceBeam/types";

const JusticeBeamNav = () => {
  const { activeSection, reducedMotion } = useJusticeBeam();

  if (reducedMotion) return null;

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 pointer-events-none"
      aria-label="Justice Beam journey"
    >
      {BEAM_SECTIONS.map((section) => {
        const active = activeSection === section.id;
        return (
          <div key={section.id} className="flex items-center gap-3 justify-end">
            <motion.div
              initial={false}
              animate={{ opacity: active ? 1 : 0.3, x: active ? 0 : 4 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-right"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-burgundy font-medium">
                {section.label}
              </p>
              <p className="text-[11px] text-muted-foreground">{section.subtitle}</p>
            </motion.div>
            <motion.span
              className="block rounded-full bg-burgundy"
              initial={false}
              animate={{
                width: active ? 12 : 5,
                height: active ? 12 : 5,
                opacity: active ? 1 : 0.3,
                boxShadow: active ? "0 0 16px rgba(122, 21, 32, 0.35)" : "none",
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        );
      })}
    </nav>
  );
};

export default JusticeBeamNav;
