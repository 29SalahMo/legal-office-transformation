import { motion } from "framer-motion";

interface ScrollProgressBarProps {
  progress: number;
}

const ScrollProgressBar = ({ progress }: ScrollProgressBarProps) => (
  <motion.div
    className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-burgundy via-burgundy-light to-burgundy pointer-events-none"
    style={{ scaleX: Math.min(1, Math.max(0, progress)) }}
    aria-hidden="true"
  />
);

export default ScrollProgressBar;
