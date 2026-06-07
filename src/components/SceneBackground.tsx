import { lazy, Suspense, Component, type ReactNode } from "react";
import { useScrollScene } from "@/contexts/ScrollSceneContext";

const ObsidianMonolithScene = lazy(
  () => import("@/components/three/ObsidianMonolithScene")
);

interface SceneBackgroundProps {
  className?: string;
  fixed?: boolean;
}

class SceneErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const SceneBackground = ({ className = "", fixed = true }: SceneBackgroundProps) => {
  const { reducedMotion, sceneQuality } = useScrollScene();

  const fallback = <div className="absolute inset-0 scene-fallback" />;
  const show3D = !reducedMotion;

  return (
    <div
      className={`${fixed ? "fixed inset-0" : "absolute inset-0"} -z-10 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {show3D ? (
        <SceneErrorBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            <ObsidianMonolithScene />
          </Suspense>
        </SceneErrorBoundary>
      ) : (
        fallback
      )}

      {/* Readability overlays — keep text/buttons unobstructed */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/40 via-transparent to-[#050816]/90" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(82, 11, 16, 0.1), transparent)",
        }}
      />
      {sceneQuality.tier === "mobile" && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/88 via-[#050816]/45 to-transparent" />
      )}
      {sceneQuality.tier === "tablet" && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/70 via-[#050816]/25 to-transparent" />
      )}
    </div>
  );
};

export default SceneBackground;
