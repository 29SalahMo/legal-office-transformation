import type { Transition, Variants } from "framer-motion";

export const cinematicEase = [0.22, 1, 0.36, 1] as const;

export const cinematicTransition: Transition = {
  duration: 0.9,
  ease: cinematicEase,
};

export const viewportReveal = {
  once: true,
  margin: "-10% 0px -10% 0px",
  amount: 0.25,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 56, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: cinematicTransition,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: cinematicEase } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: cinematicEase },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -48, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: cinematicTransition,
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 48, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: cinematicTransition,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
};

export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: cinematicEase },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: cinematicEase },
  },
};

export const cardHover = {
  y: -6,
  scale: 1.02,
  transition: { duration: 0.35, ease: cinematicEase },
};
