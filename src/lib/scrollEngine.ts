import Lenis from "lenis";
import type { JourneyAct } from "@/lib/justiceScrollEngine";

export type ScenePhase =
  | "hero"
  | "about"
  | "services"
  | "team"
  | "testimonials"
  | "contact";

/** Mutable scroll state — read in useFrame, never via React state */
export const scrollEngine = {
  progress: 0,
  smoothProgress: 0,
  mouseX: 0,
  mouseY: 0,
  isHoveringScale: false,
};

type ActListener = (act: JourneyAct) => void;
type PhaseListener = (phase: ScenePhase) => void;

const actListeners = new Set<ActListener>();
const phaseListeners = new Set<PhaseListener>();

let lenis: Lenis | null = null;
let rafId = 0;
let progressBarEl: HTMLDivElement | null = null;
let smoothVelocity = 0;
let lastTime = 0;
let lastAct: JourneyAct = "intro";
let lastPhase: ScenePhase = "hero";
let reducedMotion = false;

const actFromProgress = (progress: number): JourneyAct => {
  if (progress < 0.15) return "intro";
  if (progress < 0.38) return "conflict";
  if (progress < 0.72) return "process";
  return "justice";
};

const phaseFromProgress = (progress: number): ScenePhase => {
  if (progress < 0.12) return "hero";
  if (progress < 0.28) return "about";
  if (progress < 0.45) return "services";
  if (progress < 0.62) return "team";
  if (progress < 0.82) return "testimonials";
  return "contact";
};

const readProgress = (): number => {
  if (lenis) {
    const limit = lenis.limit;
    return limit > 0 ? lenis.scroll / limit : 0;
  }
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? window.scrollY / max : 0;
};

const springSmooth = (target: number, delta: number) => {
  const diff = target - scrollEngine.smoothProgress;
  smoothVelocity = smoothVelocity * 0.78 + diff * 4.8 * delta;
  scrollEngine.smoothProgress += smoothVelocity;

  if (Math.abs(diff) < 0.00008 && Math.abs(smoothVelocity) < 0.00008) {
    scrollEngine.smoothProgress = target;
    smoothVelocity = 0;
  }
};

const notifyDiscrete = () => {
  const act = actFromProgress(scrollEngine.progress);
  if (act !== lastAct) {
    lastAct = act;
    actListeners.forEach((fn) => fn(act));
  }

  const phase = phaseFromProgress(scrollEngine.smoothProgress);
  if (phase !== lastPhase) {
    lastPhase = phase;
    phaseListeners.forEach((fn) => fn(phase));
  }
};

const tick = (time: number) => {
  const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 1 / 60;
  lastTime = time;

  lenis?.raf(time);

  scrollEngine.progress = readProgress();
  springSmooth(scrollEngine.progress, delta);

  const clamped = Math.min(1, Math.max(0, scrollEngine.progress));
  if (progressBarEl) {
    progressBarEl.style.transform = `scale3d(${clamped}, 1, 1)`;
  }
  document.documentElement.style.setProperty("--scroll-progress", String(clamped));

  notifyDiscrete();
  rafId = requestAnimationFrame(tick);
};

export function registerProgressBar(el: HTMLDivElement | null) {
  progressBarEl = el;
}

export function subscribeJourneyAct(listener: ActListener) {
  actListeners.add(listener);
  listener(lastAct);
  return () => actListeners.delete(listener);
}

export function subscribePhase(listener: PhaseListener) {
  phaseListeners.add(listener);
  listener(lastPhase);
  return () => phaseListeners.delete(listener);
}

export function getJourneyAct() {
  return lastAct;
}

export function getPhase() {
  return lastPhase;
}

export function initScrollEngine(prefersReducedMotion: boolean) {
  reducedMotion = prefersReducedMotion;
  destroyScrollEngine();

  if (!prefersReducedMotion) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.15,
      autoResize: true,
    });
    document.documentElement.classList.add("lenis-active");
  } else {
    document.documentElement.classList.remove("lenis-active");
  }

  scrollEngine.progress = readProgress();
  scrollEngine.smoothProgress = scrollEngine.progress;
  lastTime = 0;
  rafId = requestAnimationFrame(tick);

  if (!lenis) {
    const onNativeScroll = () => {
      scrollEngine.progress = readProgress();
    };
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    return () => window.removeEventListener("scroll", onNativeScroll);
  }

  return undefined;
}

export function destroyScrollEngine() {
  cancelAnimationFrame(rafId);
  rafId = 0;
  lenis?.destroy();
  lenis = null;
  lastTime = 0;
  smoothVelocity = 0;
  document.documentElement.classList.remove("lenis-active");
}

export function getGlobalLenis() {
  return lenis;
}

export function scrollToTop(smooth = true) {
  if (lenis) {
    lenis.scrollTo(0, { immediate: !smooth });
    return;
  }
  window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
}

export function isReducedMotion() {
  return reducedMotion;
}

export function updateMousePosition(e: MouseEvent, mobileTier: boolean) {
  scrollEngine.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  scrollEngine.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

  const scaleZoneX = mobileTier ? 0 : 0.35;
  scrollEngine.isHoveringScale =
    scrollEngine.mouseX > scaleZoneX - 0.5 &&
    scrollEngine.mouseX < scaleZoneX + 0.65 &&
    scrollEngine.mouseY > -0.55 &&
    scrollEngine.mouseY < 0.65;
}
