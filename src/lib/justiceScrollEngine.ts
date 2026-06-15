import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export type JourneyAct = "intro" | "conflict" | "process" | "justice";

export interface JusticeScrollCallbacks {
  onProgress: (progress: number) => void;
  onActChange?: (act: JourneyAct) => void;
}

const actFromProgress = (progress: number): JourneyAct => {
  if (progress < 0.15) return "intro";
  if (progress < 0.38) return "conflict";
  if (progress < 0.72) return "process";
  return "justice";
};

/** Cinematic easing curve for scroll-linked 3D values (not scroll position itself) */
export const cinematicEase = (t: number) => {
  const clamped = Math.min(1, Math.max(0, t));
  return clamped < 0.5
    ? 2 * clamped * clamped * (3 - 2 * clamped) * 0.5
    : 0.5 + 2 * (clamped - 0.5) * (clamped - 0.5) * (3 - 2 * (clamped - 0.5)) * 0.5;
};

export function initJusticeScroll(
  callbacks: JusticeScrollCallbacks,
  reducedMotion: boolean
): () => void {
  if (reducedMotion) {
    const handleScroll = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const clamped = Math.min(1, Math.max(0, progress));
      callbacks.onProgress(clamped);
      callbacks.onActChange?.(actFromProgress(clamped));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }

  const lenis = new Lenis({
    duration: 1.55,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.35,
    autoResize: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const tickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  let lastAct: JourneyAct | null = null;
  const triggers: ScrollTrigger[] = [];

  const master = ScrollTrigger.create({
    trigger: document.documentElement,
    start: 0,
    end: "max",
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const progress = Math.min(1, Math.max(0, self.progress));
      callbacks.onProgress(progress);

      const act = actFromProgress(progress);
      if (act !== lastAct) {
        lastAct = act;
        callbacks.onActChange?.(act);
      }
    },
  });
  triggers.push(master);

  document.querySelectorAll<HTMLElement>("[data-justice-journey]").forEach((el) => {
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        end: "bottom 20%",
        invalidateOnRefresh: true,
      })
    );
  });

  ScrollTrigger.refresh();

  return () => {
    triggers.forEach((t) => t.kill());
    gsap.ticker.remove(tickerCallback);
    lenis.destroy();
  };
}
