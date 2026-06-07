import { cn } from "@/lib/utils";

interface StyledAmpersandProps {
  className?: string;
}

const StyledAmpersand = ({ className }: StyledAmpersandProps) => {
  return (
    <span
      className={cn(
        "font-serif text-[1em] mx-[0.1em]",
        className
      )}
    >
      &amp;
    </span>
  );
};

export default StyledAmpersand;
