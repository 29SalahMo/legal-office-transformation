import { lazy, Suspense } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollScene } from "@/contexts/ScrollSceneContext";

const ObsidianMonolithScene = lazy(
  () => import("@/components/three/ObsidianMonolithScene")
);

interface SceneBackgroundProps {
  className?: string;
  fixed?: boolean;
}

const SceneBackground = ({ className = "", fixed = true }: SceneBackgroundProps) => {
  const isMobile = useIsMobile();
  const { reducedMotion } = useScrollScene();

  const showFallback = isMobile || reducedMotion;

  return (
    <div
      className={`${fixed ? "fixed inset-0" : "absolute inset-0"} -z-10 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {showFallback ? (
        <div className="absolute inset-0 scene-fallback" />
      ) : (
        <Suspense fallback={<div className="absolute inset-0 scene-fallback" />}>
          <ObsidianMonolithScene />
        </Suspense>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/40 via-transparent to-[#050816]/90" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(91, 140, 255, 0.08), transparent)",
        }}
      />
    </div>
  );
};

export default SceneBackground;
