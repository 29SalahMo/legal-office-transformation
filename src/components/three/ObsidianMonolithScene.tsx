import { Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import * as THREE from "three";
import ScaleOfJustice from "./ScaleOfJustice";
import GoldenParticles from "./GoldenParticles";
import LightBeams from "./LightBeams";
import { useScrollScene } from "@/contexts/ScrollSceneContext";
import { BRAND } from "@/lib/brandColors";

const CameraRig = () => {
  const { camera } = useThree();
  const { scrollProgress, mouseX, mouseY, reducedMotion, phase } = useScrollScene();

  useFrame(() => {
    const teamBoost = phase === "team" ? 0.15 : 0;
    const targetX = reducedMotion ? 0 : mouseX * 0.35;
    const targetY = reducedMotion ? 0 : mouseY * 0.2 + scrollProgress * 0.5 + teamBoost;
    const targetZ = 5.5 - scrollProgress * 0.8;

    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.04;
    camera.lookAt(0, 0, -0.5);
  });

  return null;
};

const SceneContent = () => {
  const { scrollProgress, phase, reducedMotion } = useScrollScene();

  const bloomIntensity = useMemo(() => {
    const base = 0.55 + scrollProgress * 0.35;
    if (phase === "team") return base + 0.35;
    if (phase === "contact") return base + 0.25;
    if (phase === "testimonials") return base * 0.85;
    return base;
  }, [scrollProgress, phase]);

  return (
    <>
      <color attach="background" args={[BRAND.obsidian]} />
      <fog attach="fog" args={[BRAND.obsidianLight, 5, 26]} />

      <ambientLight intensity={0.12} color={BRAND.cream} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={phase === "team" ? 0.65 : 0.45}
        color={BRAND.burgundyLight}
      />
      <directionalLight position={[-3, 2, 2]} intensity={0.25} color={BRAND.burgundyGlow} />
      <spotLight
        position={[0, 4, 3]}
        angle={0.4}
        penumbra={0.8}
        intensity={phase === "team" ? 1.2 : 0.7}
        color={BRAND.burgundySoft}
        castShadow={false}
      />

      <CameraRig />
      <ScaleOfJustice />
      <GoldenParticles />
      <LightBeams />

      {!reducedMotion && (
        <>
          <Sparkles
            count={50}
            scale={[10, 7, 7]}
            size={1.2}
            speed={0.25}
            color={BRAND.burgundyGlow}
            opacity={0.2}
          />
          <Stars
            radius={50}
            depth={30}
            count={600}
            factor={1.8}
            saturation={0.1}
            fade
            speed={0.4}
          />
        </>
      )}

      {!reducedMotion && (
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.25}
            luminanceSmoothing={0.9}
            intensity={bloomIntensity}
            mipmapBlur
          />
          <DepthOfField
            focusDistance={0.015}
            focalLength={0.02}
            bokehScale={phase === "hero" ? 2 : 2.8}
          />
        </EffectComposer>
      )}
    </>
  );
};

const ObsidianMonolithScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5.5], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
};

export default ObsidianMonolithScene;
