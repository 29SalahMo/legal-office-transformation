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
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:rounded-md focus:border focus:border-burgundy/30 focus:shadow-md transition-all duration-300"
      >
        Skip to main content
      </a>
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
