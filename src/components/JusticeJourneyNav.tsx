import { motion } from "framer-motion";
import { useScrollScene } from "@/contexts/ScrollSceneContext";
import type { JourneyAct } from "@/lib/justiceScrollEngine";

const ACTS: { id: JourneyAct; label: string; subtitle: string }[] = [
  { id: "intro", label: "Balance", subtitle: "Introduction" },
  { id: "conflict", label: "Tension", subtitle: "The challenge" },
  { id: "process", label: "Process", subtitle: "Legal path" },
  { id: "justice", label: "Justice", subtitle: "Resolution" },
];

const JusticeJourneyNav = () => {
  const { journeyAct, reducedMotion } = useScrollScene();

  if (reducedMotion) return null;

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 pointer-events-none"
      aria-label="Justice journey progress"
    >
      {ACTS.map((act) => {
        const active = journeyAct === act.id;
        return (
          <div key={act.id} className="flex items-center gap-3 justify-end">
            <motion.div
              initial={false}
              animate={{
                opacity: active ? 1 : 0.35,
                x: active ? 0 : 4,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-right"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-burgundy font-medium">
                {act.label}
              </p>
              <p className="text-[11px] text-muted-foreground">{act.subtitle}</p>
            </motion.div>
            <motion.span
              className="block rounded-full bg-burgundy"
              initial={false}
              animate={{
                width: active ? 14 : 6,
                height: active ? 14 : 6,
                opacity: active ? 1 : 0.35,
                boxShadow: active
                  ? "0 0 20px rgba(82, 11, 16, 0.45)"
                  : "0 0 0 rgba(82, 11, 16, 0)",
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        );
      })}
    </nav>
  );
};

export default JusticeJourneyNav;
