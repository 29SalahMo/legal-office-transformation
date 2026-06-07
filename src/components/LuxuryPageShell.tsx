import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollSceneProvider } from "@/contexts/ScrollSceneContext";
import SceneBackground from "@/components/SceneBackground";

interface LuxuryPageShellProps {
  children: ReactNode;
  withScene?: boolean;
  className?: string;
}

const LuxuryPageShell = ({ children, withScene = true, className = "" }: LuxuryPageShellProps) => {
  if (!withScene) {
    return (
      <div className={cn("relative min-h-screen isolate", className)}>
        <div className="fixed inset-0 -z-10 scene-fallback pointer-events-none" aria-hidden="true" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <ScrollSceneProvider>
      <div className={cn("relative min-h-screen isolate", className)}>
        <SceneBackground />
        <div className="relative z-10">{children}</div>
      </div>
    </ScrollSceneProvider>
  );
};

export default LuxuryPageShell;
