import { useEffect, useRef } from "react";

/** Subtle gold cursor glow — imperative DOM, zero React re-renders */
const PremiumCursor = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = glowRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      visible.current = true;
    };

    const onLeave = () => {
      visible.current = false;
    };

    let raf = 0;
    const tick = () => {
      if (el) {
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
        el.style.opacity = visible.current ? "1" : "0";
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[45] opacity-0 will-change-transform hidden lg:block"
      style={{
        background: "radial-gradient(circle, rgba(122, 21, 32, 0.07) 0%, transparent 65%)",
      }}
      aria-hidden="true"
    />
  );
};

export default PremiumCursor;
