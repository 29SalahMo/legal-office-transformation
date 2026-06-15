import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
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
