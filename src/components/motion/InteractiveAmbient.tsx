import { motion } from "framer-motion";
import { useGlobalMotion } from "@/contexts/GlobalMotionContext";

const InteractiveAmbient = () => {
  const { scrollProgress, reducedMotion } = useGlobalMotion();

  if (reducedMotion) return null;

  const parallaxY = scrollProgress * -60;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute top-[15%] right-[8%] w-72 h-72 rounded-full bg-burgundy/6 blur-3xl"
        style={{ y: parallaxY * 0.6 }}
        animate={{ y: [parallaxY * 0.6, parallaxY * 0.6 - 30, parallaxY * 0.6], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[5%] w-96 h-96 rounded-full bg-burgundy-light/5 blur-3xl"
        style={{ y: parallaxY * -0.4 }}
        animate={{ y: [parallaxY * -0.4, parallaxY * -0.4 + 25, parallaxY * -0.4], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[45%] left-[40%] w-48 h-48 rounded-full bg-burgundy/4 blur-2xl"
        style={{ y: parallaxY * 0.25 }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default InteractiveAmbient;
