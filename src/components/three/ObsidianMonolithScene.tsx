import { Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import * as THREE from "three";
import ObsidianMonolith from "./ObsidianMonolith";
import GoldenParticles from "./GoldenParticles";
import LightBeams from "./LightBeams";
import { useScrollScene } from "@/contexts/ScrollSceneContext";

const CameraRig = () => {
  const { camera } = useThree();
  const { scrollProgress, mouseX, mouseY, reducedMotion } = useScrollScene();

  useFrame(() => {
    const targetX = reducedMotion ? 0 : mouseX * 0.4;
    const targetY = reducedMotion ? 0 : mouseY * 0.25 + scrollProgress * 0.8;
    const targetZ = 6 - scrollProgress * 1.2;

    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.04;
    camera.lookAt(0, 0, -1);
  });

  return null;
};

const SceneContent = () => {
  const { scrollProgress, phase, reducedMotion } = useScrollScene();

  const bloomIntensity = useMemo(() => {
    const base = 0.6 + scrollProgress * 0.4;
    if (phase === "team") return base + 0.3;
    if (phase === "contact") return base + 0.5;
    return base;
  }, [scrollProgress, phase]);

  return (
    <>
      <color attach="background" args={["#050816"]} />
      <fog attach="fog" args={["#0B1020", 6, 28]} />

      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 8, 5]} intensity={0.4} color="#5B8CFF" />
      <pointLight position={[-4, 2, 2]} intensity={0.6} color="#D4AF37" />
      <pointLight position={[4, -1, -2]} intensity={0.35} color="#8B5CF6" />

      <CameraRig />
      <ObsidianMonolith />
      <GoldenParticles />
      <LightBeams />

      {!reducedMotion && (
        <>
          <Sparkles
            count={60}
            scale={[12, 8, 8]}
            size={1.5}
            speed={0.3}
            color="#F7D774"
            opacity={0.25}
          />
          <Stars
            radius={50}
            depth={30}
            count={800}
            factor={2}
            saturation={0}
            fade
            speed={0.5}
          />
        </>
      )}

      {!reducedMotion && (
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={bloomIntensity}
            mipmapBlur
          />
          <DepthOfField
            focusDistance={0.01}
            focalLength={0.02}
            bokehScale={phase === "hero" ? 2 : 3}
          />
        </EffectComposer>
      )}
    </>
  );
};

const ObsidianMonolithScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
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
