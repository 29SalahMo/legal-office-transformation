import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { useDeviceTier, type SceneQuality } from "@/hooks/useDeviceTier";

export type ScenePhase =
  | "hero"
  | "about"
  | "services"
  | "team"
  | "testimonials"
  | "contact";

interface ScrollSceneContextValue {
  scrollProgress: number;
  smoothScrollProgress: number;
  mouseX: number;
  mouseY: number;
  phase: ScenePhase;
  reducedMotion: boolean;
  sceneQuality: SceneQuality;
  isTouchDevice: boolean;
}

const ScrollSceneContext = createContext<ScrollSceneContextValue>({
  scrollProgress: 0,
  smoothScrollProgress: 0,
  mouseX: 0,
  mouseY: 0,
  phase: "hero",
  reducedMotion: false,
  sceneQuality: {
    tier: "desktop",
    scaleMultiplier: 1,
    particleCount: 160,
    sparkleCount: 48,
    starCount: 600,
    enableBloom: true,
    enableDof: true,
    dpr: [1, 1.5],
    fov: 42,
    positionOffset: { x: 0, y: 0, z: 0 },
  },
  isTouchDevice: false,
});

/** Matches homepage section order: Hero → About → Services → Team → Testimonials → Contact */
const phaseFromProgress = (progress: number): ScenePhase => {
  if (progress < 0.12) return "hero";
  if (progress < 0.28) return "about";
  if (progress < 0.45) return "services";
  if (progress < 0.62) return "team";
  if (progress < 0.82) return "testimonials";
  return "contact";
};

export const ScrollSceneProvider = ({ children }: { children: ReactNode }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [smoothScrollProgress, setSmoothScrollProgress] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const targetProgressRef = useRef(0);
  const smoothRef = useRef(0);
  const velocityRef = useRef(0);

  const { quality: sceneQuality } = useDeviceTier();

  const handleScroll = useCallback(() => {
    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    const clamped = Math.min(1, Math.max(0, progress));
    targetProgressRef.current = clamped;
    setScrollProgress(clamped);
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
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);

    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", onMotionChange);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let rafId = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;

      const target = targetProgressRef.current;
      const diff = target - smoothRef.current;

      // Spring-damper: smooth bidirectional interpolation, no snapping
      velocityRef.current = velocityRef.current * 0.82 + diff * 5.2 * delta;
      smoothRef.current += velocityRef.current;

      if (Math.abs(diff) < 0.0001 && Math.abs(velocityRef.current) < 0.0001) {
        smoothRef.current = target;
        velocityRef.current = 0;
      }

      setSmoothScrollProgress(smoothRef.current);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [handleScroll, handleMouseMove]);

  const phase = phaseFromProgress(smoothScrollProgress);

  return (
    <ScrollSceneContext.Provider
      value={{
        scrollProgress,
        smoothScrollProgress,
        mouseX,
        mouseY,
        phase,
        reducedMotion,
        sceneQuality,
        isTouchDevice,
      }}
    >
      {children}
    </ScrollSceneContext.Provider>
  );
};

export const useScrollScene = () => useContext(ScrollSceneContext);
