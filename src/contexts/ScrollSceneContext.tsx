import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useDeviceTier, type SceneQuality } from "@/hooks/useDeviceTier";
import { useGlobalMotion } from "@/contexts/GlobalMotionContext";
import type { JourneyAct } from "@/lib/justiceScrollEngine";
import {
  subscribeJourneyAct,
  subscribePhase,
  updateMousePosition,
  type ScenePhase,
} from "@/lib/scrollEngine";

export type { ScenePhase };

interface ScrollSceneContextValue {
  journeyAct: JourneyAct;
  phase: ScenePhase;
  reducedMotion: boolean;
  sceneQuality: SceneQuality;
  isTouchDevice: boolean;
}

const defaultQuality: SceneQuality = {
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
};

const ScrollSceneContext = createContext<ScrollSceneContextValue>({
  journeyAct: "intro",
  phase: "hero",
  reducedMotion: false,
  sceneQuality: defaultQuality,
  isTouchDevice: false,
});

export const ScrollSceneProvider = ({ children }: { children: ReactNode }) => {
  const [journeyAct, setJourneyAct] = useState<JourneyAct>("intro");
  const [phase, setPhase] = useState<ScenePhase>("hero");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const { quality: sceneQuality } = useDeviceTier();
  const { reducedMotion } = useGlobalMotion();

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    return subscribeJourneyAct(setJourneyAct);
  }, []);

  useEffect(() => subscribePhase(setPhase), []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      updateMousePosition(e, sceneQuality.tier === "mobile");
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [sceneQuality.tier]);

  return (
    <ScrollSceneContext.Provider
      value={{
        journeyAct,
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
