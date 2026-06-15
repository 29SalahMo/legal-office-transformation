import Lenis from "lenis";

let globalLenis: Lenis | null = null;

export function getGlobalLenis() {
  return globalLenis;
}

export function initGlobalLenis(reducedMotion: boolean): Lenis | null {
  if (reducedMotion) return null;

  if (globalLenis) {
    globalLenis.destroy();
    globalLenis = null;
  }

  globalLenis = new Lenis({
    duration: 1.45,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.3,
    autoResize: true,
  });

  const raf = (time: number) => {
    globalLenis?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  return globalLenis;
}

export function destroyGlobalLenis() {
  globalLenis?.destroy();
  globalLenis = null;
}

export function scrollToTop(smooth = true) {
  if (globalLenis) {
    globalLenis.scrollTo(0, { immediate: !smooth });
    return;
  }
  window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
}

export function getScrollProgress(): number {
  const lenis = globalLenis;
  if (lenis) {
    const limit = lenis.limit;
    return limit > 0 ? lenis.scroll / limit : 0;
  }
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  return max > 0 ? window.scrollY / max : 0;
}
