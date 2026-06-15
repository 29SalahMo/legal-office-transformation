import {
  getGlobalLenis,
  scrollToTop,
  destroyScrollEngine,
  initScrollEngine,
  scrollEngine,
} from "@/lib/scrollEngine";

export { getGlobalLenis, scrollToTop };

export function getScrollProgress(): number {
  return scrollEngine.progress;
}

export function initGlobalLenis(reducedMotion: boolean) {
  initScrollEngine(reducedMotion);
  return getGlobalLenis();
}

export function destroyGlobalLenis() {
  destroyScrollEngine();
}
