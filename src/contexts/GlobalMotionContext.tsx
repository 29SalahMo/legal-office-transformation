import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { initScrollEngine, destroyScrollEngine } from "@/lib/scrollEngine";
import ScrollProgressBar from "@/components/motion/ScrollProgressBar";

interface GlobalMotionContextValue {
  reducedMotion: boolean;
}

const GlobalMotionContext = createContext<GlobalMotionContextValue>({
  reducedMotion: false,
});

export const GlobalMotionProvider = ({ children }: { children: ReactNode }) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      destroyScrollEngine();
      initScrollEngine(e.matches);
    };

    motionQuery.addEventListener("change", onChange);
    const cleanupNative = initScrollEngine(motionQuery.matches);

    return () => {
      motionQuery.removeEventListener("change", onChange);
      cleanupNative?.();
      destroyScrollEngine();
    };
  }, []);

  return (
    <GlobalMotionContext.Provider value={{ reducedMotion }}>
      <ScrollProgressBar />
      {children}
    </GlobalMotionContext.Provider>
  );
};

export const useGlobalMotion = () => useContext(GlobalMotionContext);
