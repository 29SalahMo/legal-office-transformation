import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { BeamSection } from "@/lib/justiceBeam/types";

interface BeamCardProps {
  children: ReactNode;
  className?: string;
  branchIndex?: number;
  onBranchEnter?: () => void;
  onBranchLeave?: () => void;
}

const BeamCard = ({
  children,
  className,
  branchIndex,
  onBranchEnter,
  onBranchLeave,
}: BeamCardProps) => (
  <div
    className={cn("beam-card group relative", className)}
    data-beam-card={branchIndex}
    onMouseEnter={onBranchEnter}
    onMouseLeave={onBranchLeave}
  >
    <span className="beam-card-trace" aria-hidden="true" />
    {children}
  </div>
);

export const BeamSection = ({
  section,
  children,
  className,
}: {
  section: BeamSection;
  children: ReactNode;
  className?: string;
}) => (
  <div data-beam-section={section} className={className}>
    {children}
  </div>
);

export default BeamCard;
