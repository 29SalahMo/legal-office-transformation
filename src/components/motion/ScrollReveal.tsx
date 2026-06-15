import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  fadeUp,
  scaleIn,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  viewportReveal,
} from "@/lib/motionPresets";

type RevealVariant = "fadeUp" | "scaleIn" | "slideLeft" | "slideRight";

const variantMap: Record<RevealVariant, Variants> = {
  fadeUp,
  scaleIn,
  slideLeft: slideFromLeft,
  slideRight: slideFromRight,
};

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  stagger?: boolean;
  as?: "div" | "section" | "article" | "li";
}

const ScrollReveal = ({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  stagger = false,
  as = "div",
}: ScrollRevealProps) => {
  const Component = motion[as];

  return (
    <Component
      className={cn(className)}
      variants={stagger ? staggerContainer : variantMap[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={viewportReveal}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;
