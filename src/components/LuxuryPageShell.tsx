import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { JusticeBeamProvider } from "@/contexts/JusticeBeamContext";
import JusticeBeamOverlay from "@/components/justice-beam/JusticeBeamOverlay";
import InteractiveAmbient from "@/components/motion/InteractiveAmbient";

interface LuxuryPageShellProps {
  children: ReactNode;
  withBeam?: boolean;
  className?: string;
}

const LuxuryPageShell = ({ children, withBeam = true, className = "" }: LuxuryPageShellProps) => {
  const inner = (
    <div className={cn("relative min-h-screen isolate overflow-x-hidden max-w-[100vw]", className)}>
      <InteractiveAmbient />
      <div className="fixed inset-0 -z-10 scene-fallback pointer-events-none" aria-hidden="true" />
      {withBeam && <JusticeBeamOverlay />}
      <div className="relative z-10">{children}</div>
    </div>
  );

  if (!withBeam) return inner;

  return <JusticeBeamProvider>{inner}</JusticeBeamProvider>;
};

export default LuxuryPageShell;
