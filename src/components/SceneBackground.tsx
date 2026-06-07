import { lazy, Suspense, Component, type ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const isMobile = useIsMobile();
  const { reducedMotion } = useScrollScene();

  const showFallback = isMobile || reducedMotion;
  const fallback = <div className="absolute inset-0 scene-fallback" />;

  return (
    <div
      className={`${fixed ? "fixed inset-0" : "absolute inset-0"} -z-10 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {showFallback ? (
        fallback
      ) : (
        <SceneErrorBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            <ObsidianMonolithScene />
          </Suspense>
        </SceneErrorBoundary>
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
