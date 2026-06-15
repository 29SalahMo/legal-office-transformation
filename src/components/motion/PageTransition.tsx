import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(4px)",
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => (
  <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
    {children}
  </motion.div>
);

export default PageTransition;
