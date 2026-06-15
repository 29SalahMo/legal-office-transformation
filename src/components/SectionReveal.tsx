import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, viewportReveal } from "@/lib/motionPresets";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  stagger?: boolean;
}

const SectionReveal = ({
  children,
  className,
  variant = fadeUp,
  stagger = false,
}: SectionRevealProps) => (
  <motion.div
    className={cn(className)}
    initial="hidden"
    whileInView="visible"
    viewport={viewportReveal}
    variants={stagger ? staggerContainer : variant}
  >
    {children}
  </motion.div>
);

export default SectionReveal;
