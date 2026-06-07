import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

const SectionBadge = ({ children, className }: SectionBadgeProps) => {
  return <span className={cn("section-badge", className)}>{children}</span>;
};

export default SectionBadge;
