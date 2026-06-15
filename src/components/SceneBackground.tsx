import { Component, type ReactNode } from "react";

/** CSS-only background — no WebGL. 3D lives in HeroJusticeCanvas only. */
const SceneBackground = ({ className = "" }: { className?: string; fixed?: boolean }) => (
  <div
    className={`fixed inset-0 -z-10 pointer-events-none overflow-hidden ${className}`}
    aria-hidden="true"
  >
    <div className="absolute inset-0 scene-fallback" />
    <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F5]/40 via-transparent to-[#FAF7F5]/90" />
    <div
      className="absolute inset-0 opacity-50"
      style={{
        background:
          "radial-gradient(ellipse 55% 45% at 70% 15%, rgba(82, 11, 16, 0.04), transparent 60%)",
      }}
    />
    <div
      className="absolute bottom-0 left-0 right-0 h-1/3 opacity-30"
      style={{
        background: "linear-gradient(to top, hsl(220 45% 12% / 0.03), transparent)",
      }}
    />
  </div>
);

export default SceneBackground;
