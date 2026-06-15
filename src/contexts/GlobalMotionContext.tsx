import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { initGlobalLenis, destroyGlobalLenis, getScrollProgress } from "@/lib/globalSmoothScroll";
import ScrollProgressBar from "@/components/motion/ScrollProgressBar";

interface GlobalMotionContextValue {
  scrollProgress: number;
  reducedMotion: boolean;
}

const GlobalMotionContext = createContext<GlobalMotionContextValue>({
  scrollProgress: 0,
  reducedMotion: false,
});

export const GlobalMotionProvider = ({ children }: { children: ReactNode }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", onChange);

    const lenis = initGlobalLenis(motionQuery.matches);

    let raf = 0;
    const tick = () => {
      setScrollProgress(getScrollProgress());
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onNativeScroll = () => setScrollProgress(getScrollProgress());
    if (!lenis) {
      window.addEventListener("scroll", onNativeScroll, { passive: true });
    }

    return () => {
      motionQuery.removeEventListener("change", onChange);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onNativeScroll);
      destroyGlobalLenis();
    };
  }, []);

  return (
    <GlobalMotionContext.Provider value={{ scrollProgress, reducedMotion }}>
      <ScrollProgressBar progress={scrollProgress} />
      {children}
    </GlobalMotionContext.Provider>
  );
};

export const useGlobalMotion = () => useContext(GlobalMotionContext);
