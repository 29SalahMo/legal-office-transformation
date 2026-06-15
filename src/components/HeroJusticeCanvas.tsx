import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useScrollScene } from "@/contexts/ScrollSceneContext";
import JusticeSigil from "@/components/motion/JusticeSigil";

const ObsidianMonolithScene = lazy(
  () => import("@/components/three/ObsidianMonolithScene")
);

/**
 * Hero-only 3D — unmounts when scrolled out of view.
 * Mobile uses lightweight SVG instead of WebGL.
 */
const HeroJusticeCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const { reducedMotion, sceneQuality } = useScrollScene();
  const useSvg = reducedMotion || sceneQuality.tier === "mobile" || sceneQuality.tier === "tablet";

  useEffect(() => {
    const el = containerRef.current;
    if (!el || useSvg) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [useSvg]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 lg:inset-auto lg:right-[-5%] lg:top-1/2 lg:-translate-y-1/2 lg:w-[min(52vw,620px)] lg:h-[min(85vh,720px)] pointer-events-none z-0"
      aria-hidden="true"
    >
      {useSvg ? (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.14] lg:opacity-[0.22]">
          <JusticeSigil className="w-48 h-56 sm:w-64 sm:h-72 lg:w-80 lg:h-96 animate-float" />
        </div>
      ) : inView ? (
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <JusticeSigil className="w-64 h-72" />
            </div>
          }
        >
          <ObsidianMonolithScene compact />
        </Suspense>
      ) : null}

      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 40%, transparent 0%, rgba(250,247,245,0.7) 75%)",
        }}
      />
    </div>
  );
};

export default HeroJusticeCanvas;
