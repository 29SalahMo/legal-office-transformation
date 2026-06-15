import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Custom hook for premium magnetic button attraction.
 * Attracts the element toward the cursor when the mouse is within range.
 * Runs on GPU-accelerated motion values with zero React component re-renders.
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef<any>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for magnetic snap back
  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const elCenterX = rect.left + rect.width / 2;
      const elCenterY = rect.top + rect.height / 2;

      // Distance vectors between cursor and element center
      const distanceX = e.clientX - elCenterX;
      const distanceY = e.clientY - elCenterY;
      const distance = Math.hypot(distanceX, distanceY);

      const triggerRadius = 90; // Pull radius in px

      if (distance < triggerRadius) {
        // Attract element slightly toward cursor coordinates
        x.set(distanceX * strength);
        y.set(distanceY * strength);
      } else {
        // Return element to original center position
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, strength]);

  return { ref, x: springX, y: springY };
}
