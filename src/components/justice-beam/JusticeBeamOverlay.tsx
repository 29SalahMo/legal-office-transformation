import { useEffect, useRef } from "react";
import { useJusticeBeam } from "@/contexts/JusticeBeamContext";
import { initJusticeBeam, highlightBeamBranch } from "@/lib/justiceBeam/engine";

const JusticeBeamOverlay = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { reducedMotion, tier, isHomepage, hoveredBranch } = useJusticeBeam();

  useEffect(() => {
    if (reducedMotion) return;
    return initJusticeBeam(svgRef.current, { isHomepage, tier, reducedMotion });
  }, [reducedMotion, tier, isHomepage]);

  useEffect(() => {
    if (reducedMotion) return;
    highlightBeamBranch(svgRef.current, hoveredBranch);
  }, [hoveredBranch, reducedMotion]);

  if (reducedMotion) return null;

  const showFull = isHomepage && tier !== "mobile";

  return (
    <svg
      ref={svgRef}
      className="beam-overlay fixed inset-0 w-full h-full pointer-events-none z-[1]"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="beamGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#AA7C11" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#E5C483" stopOpacity="1" />
          <stop offset="70%" stopColor="#F4D068" stopOpacity="1" />
          <stop offset="100%" stopColor="#906F33" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="beamGoldSoft" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#AA7C11" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#906F33" stopOpacity="0.08" />
        </linearGradient>
        <filter id="beamSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g id="beam-glow-layer" filter="url(#beamSoftGlow)">
        {/* Main spine — travels full page */}
        <path
          id="beam-spine"
          className="beam-path beam-path-glow"
          d="M 180 0 L 200 120 Q 220 280 195 420 Q 175 560 210 700 Q 240 820 720 880"
          fill="none"
          stroke="url(#beamGoldSoft)"
          strokeWidth={tier === "mobile" ? 1.5 : 2}
          strokeLinecap="round"
        />

        {showFull && (
          <>
            {/* Hero — enters from outside, curves toward headline */}
            <path
              id="beam-hero"
              className="beam-path"
              d="M -40 80 Q 120 140 280 220 Q 420 290 520 340"
              fill="none"
              stroke="url(#beamGold)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* About — architectural frame */}
            <path
              id="beam-about"
              className="beam-path"
              d="M 120 380 L 120 480 M 120 430 L 380 430 M 380 380 L 380 480 M 120 380 L 380 380"
              fill="none"
              stroke="url(#beamGold)"
              strokeWidth="1.2"
              strokeLinecap="square"
            />

            {/* Trust — geometric anchor */}
            <path
              id="beam-trust"
              className="beam-path"
              d="M 420 380 Q 560 380 700 420 Q 840 460 980 440"
              fill="none"
              stroke="url(#beamGold)"
              strokeWidth="1.3"
              strokeLinecap="round"
            />

            {/* Services — branches */}
            <path
              data-beam-branch-path="0"
              className="beam-path"
              d="M 210 520 Q 340 500 480 470"
              fill="none"
              stroke="url(#beamGold)"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              data-beam-branch-path="1"
              className="beam-path"
              d="M 210 540 Q 360 560 520 590"
              fill="none"
              stroke="url(#beamGold)"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.5"
            />

            {/* Process journey (connects 6 milestones horizontally) */}
            <path
              id="beam-process"
              className="beam-path"
              d="M 80 620 L 240 620 L 400 620 L 560 620 L 720 620 L 880 620"
              fill="none"
              stroke="url(#beamGold)"
              strokeWidth="1.3"
              strokeLinecap="round"
            />

            {/* Case Studies — wave progression */}
            <path
              id="beam-case-studies"
              className="beam-path"
              d="M 100 700 Q 300 750 600 700 Q 900 650 1100 710"
              fill="none"
              stroke="url(#beamGold)"
              strokeWidth="1.3"
              strokeLinecap="round"
            />

            {/* Expertise grid */}
            <path
              id="beam-expertise"
              className="beam-path"
              d="M 900 680 L 1100 680 M 900 760 L 1100 760 M 900 680 L 900 760 M 1100 680 L 1100 760 M 1000 680 L 1000 820"
              fill="none"
              stroke="url(#beamGold)"
              strokeWidth="1.1"
              strokeLinecap="square"
            />

            {/* Testimonials — connecting flow */}
            <path
              id="beam-testimonials"
              className="beam-path"
              d="M 200 780 Q 480 760 720 780 Q 960 800 1240 780"
              fill="none"
              stroke="url(#beamGold)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Contact — balanced convergence */}
            <path
              id="beam-contact"
              className="beam-path"
              d="M 620 840 L 720 820 L 820 840 M 720 820 L 720 860 M 680 860 L 760 860"
              fill="none"
              stroke="url(#beamGold)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </>
        )}
      </g>

      <circle id="beam-head" r="3" fill="#E5C483" opacity="0" />
    </svg>
  );
};

export default JusticeBeamOverlay;
