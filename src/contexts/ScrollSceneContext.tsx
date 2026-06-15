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
import { useGlobalMotion } from "@/contexts/GlobalMotionContext";
import type { JourneyAct } from "@/lib/justiceScrollEngine";

const actFromProgress = (progress: number): JourneyAct => {
  if (progress < 0.15) return "intro";
  if (progress < 0.38) return "conflict";
  if (progress < 0.72) return "process";
  return "justice";
};

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
  journeyAct: JourneyAct;
  reducedMotion: boolean;
  sceneQuality: SceneQuality;
  isTouchDevice: boolean;
  isHoveringScale: boolean;
}

const ScrollSceneContext = createContext<ScrollSceneContextValue>({
  scrollProgress: 0,
  smoothScrollProgress: 0,
  mouseX: 0,
  mouseY: 0,
  phase: "hero",
  journeyAct: "intro",
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
  isHoveringScale: false,
});

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
  const [journeyAct, setJourneyAct] = useState<JourneyAct>("intro");
  const [isHoveringScale, setIsHoveringScale] = useState(false);

  const targetProgressRef = useRef(0);
  const smoothRef = useRef(0);
  const velocityRef = useRef(0);

  const { quality: sceneQuality } = useDeviceTier();
  const { scrollProgress: globalProgress, reducedMotion: globalReduced } = useGlobalMotion();

  useEffect(() => {
    targetProgressRef.current = globalProgress;
    setScrollProgress(globalProgress);
    setJourneyAct(actFromProgress(globalProgress));
  }, [globalProgress]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMouseX(x);
    setMouseY(y);

    const scaleZoneX = sceneQuality.tier === "mobile" ? 0 : 0.35;
    const inScaleZone =
      x > scaleZoneX - 0.5 && x < scaleZoneX + 0.65 && y > -0.55 && y < 0.65;
    setIsHoveringScale(inScaleZone);
  }, [sceneQuality.tier]);

  useEffect(() => {
    setReducedMotion(globalReduced);
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let rafId = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;

      const target = targetProgressRef.current;
      const diff = target - smoothRef.current;

      velocityRef.current = velocityRef.current * 0.78 + diff * 4.8 * delta;
      smoothRef.current += velocityRef.current;

      if (Math.abs(diff) < 0.00008 && Math.abs(velocityRef.current) < 0.00008) {
        smoothRef.current = target;
        velocityRef.current = 0;
      }

      setSmoothScrollProgress(smoothRef.current);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [handleMouseMove, globalReduced]);

  const phase = phaseFromProgress(smoothScrollProgress);

  return (
    <ScrollSceneContext.Provider
      value={{
        scrollProgress,
        smoothScrollProgress,
        mouseX,
        mouseY,
        phase,
        journeyAct,
        reducedMotion,
        sceneQuality,
        isTouchDevice,
        isHoveringScale,
      }}
    >
      {children}
    </ScrollSceneContext.Provider>
  );
};

export const useScrollScene = () => useContext(ScrollSceneContext);
