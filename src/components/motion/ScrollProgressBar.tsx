import { useEffect, useRef } from "react";
import { registerProgressBar } from "@/lib/scrollEngine";

const ScrollProgressBar = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerProgressBar(barRef.current);
    return () => registerProgressBar(null);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-gradient-to-r from-burgundy via-burgundy-light to-burgundy pointer-events-none will-change-transform"
      style={{ transform: "scale3d(0, 1, 1)" }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgressBar;
