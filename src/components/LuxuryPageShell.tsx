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
      <div className={cn("relative min-h-screen", className)}>
        <div className="fixed inset-0 -z-10 scene-fallback pointer-events-none" aria-hidden="true" />
        {children}
      </div>
    );
  }

  return (
    <ScrollSceneProvider>
      <div className={cn("relative min-h-screen", className)}>
        <SceneBackground />
        {children}
      </div>
    </ScrollSceneProvider>
  );
};

export default LuxuryPageShell;
