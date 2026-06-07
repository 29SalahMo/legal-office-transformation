import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type ScenePhase =
  | "hero"
  | "about"
  | "services"
  | "team"
  | "testimonials"
  | "contact";

interface ScrollSceneContextValue {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  phase: ScenePhase;
  reducedMotion: boolean;
}

const ScrollSceneContext = createContext<ScrollSceneContextValue>({
  scrollProgress: 0,
  mouseX: 0,
  mouseY: 0,
  phase: "hero",
  reducedMotion: false,
});

const phaseFromProgress = (progress: number): ScenePhase => {
  if (progress < 0.15) return "hero";
  if (progress < 0.32) return "about";
  if (progress < 0.5) return "services";
  if (progress < 0.68) return "team";
  if (progress < 0.85) return "testimonials";
  return "contact";
};

export const ScrollSceneProvider = ({ children }: { children: ReactNode }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const handleScroll = useCallback(() => {
    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    setScrollProgress(Math.min(1, Math.max(0, progress)));
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMouseX(x);
    setMouseY(y);
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", onMotionChange);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleScroll, handleMouseMove]);

  const phase = phaseFromProgress(scrollProgress);

  return (
    <ScrollSceneContext.Provider
      value={{ scrollProgress, mouseX, mouseY, phase, reducedMotion }}
    >
      {children}
    </ScrollSceneContext.Provider>
  );
};

export const useScrollScene = () => useContext(ScrollSceneContext);
