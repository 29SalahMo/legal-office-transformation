import * as React from "react";

export type DeviceTier = "mobile" | "tablet" | "desktop" | "ultra";

const getTier = (width: number): DeviceTier => {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  if (width < 1920) return "desktop";
  return "ultra";
};

export interface SceneQuality {
  tier: DeviceTier;
  scaleMultiplier: number;
  particleCount: number;
  sparkleCount: number;
  starCount: number;
  enableBloom: boolean;
  enableDof: boolean;
  dpr: [number, number];
  fov: number;
  positionOffset: { x: number; y: number; z: number };
}

export const getSceneQuality = (tier: DeviceTier): SceneQuality => {
  const configs: Record<DeviceTier, SceneQuality> = {
    mobile: {
      tier: "mobile",
      scaleMultiplier: 0.62,
      particleCount: 40,
      sparkleCount: 18,
      starCount: 200,
      enableBloom: true,
      enableDof: false,
      dpr: [1, 1.25],
      fov: 48,
      positionOffset: { x: 1.1, y: -0.55, z: -0.6 },
    },
    tablet: {
      tier: "tablet",
      scaleMultiplier: 0.82,
      particleCount: 90,
      sparkleCount: 32,
      starCount: 400,
      enableBloom: true,
      enableDof: true,
      dpr: [1, 1.35],
      fov: 44,
      positionOffset: { x: 0.55, y: -0.25, z: -0.35 },
    },
    desktop: {
      tier: "desktop",
      scaleMultiplier: 1.12,
      particleCount: 160,
      sparkleCount: 48,
      starCount: 600,
      enableBloom: true,
      enableDof: true,
      dpr: [1, 1.5],
      fov: 42,
      positionOffset: { x: 0, y: 0, z: 0 },
    },
    ultra: {
      tier: "ultra",
      scaleMultiplier: 1.22,
      particleCount: 200,
      sparkleCount: 60,
      starCount: 800,
      enableBloom: true,
      enableDof: true,
      dpr: [1, 2],
      fov: 40,
      positionOffset: { x: -0.15, y: 0.05, z: 0.1 },
    },
  };
  return configs[tier];
};

export function useDeviceTier() {
  const [tier, setTier] = React.useState<DeviceTier>(() =>
    typeof window !== "undefined" ? getTier(window.innerWidth) : "desktop"
  );

  React.useEffect(() => {
    const update = () => setTier(getTier(window.innerWidth));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return { tier, quality: getSceneQuality(tier) };
}
