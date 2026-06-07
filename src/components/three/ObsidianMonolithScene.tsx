import { Suspense, useMemo, useRef } from "react";
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
import { sampleScrollTimeline } from "@/lib/scrollTimeline";

const CameraRig = () => {
  const { camera } = useThree();
  const {
    smoothScrollProgress,
    mouseX,
    mouseY,
    reducedMotion,
    isTouchDevice,
  } = useScrollScene();

  const camPos = useRef({ x: 0, y: 0.2, z: 5.5 });
  const lookAt = useRef(new THREE.Vector3(0, 0, -0.5));

  useFrame((_, delta) => {
    const timeline = sampleScrollTimeline(smoothScrollProgress);
    const interact = isTouchDevice || reducedMotion ? 0 : 1;

    const targetX = mouseX * 0.28 * interact;
    const targetY = 0.2 + timeline.cameraLift * 0.55 + mouseY * 0.14 * interact;
    const targetZ = 5.5 - timeline.cameraPull * 0.95;

    const lerp = 1 - Math.pow(0.001, delta);
    camPos.current.x += (targetX - camPos.current.x) * lerp;
    camPos.current.y += (targetY - camPos.current.y) * lerp;
    camPos.current.z += (targetZ - camPos.current.z) * lerp;

    camera.position.set(camPos.current.x, camPos.current.y, camPos.current.z);

    lookAt.current.set(
      mouseX * 0.08 * interact,
      timeline.groundedness * 0.12,
      -0.5 - smoothScrollProgress * 0.15
    );
    camera.lookAt(lookAt.current);
  });

  return null;
};

const SceneContent = () => {
  const { smoothScrollProgress, reducedMotion, sceneQuality } = useScrollScene();

  const bloomIntensity = useMemo(() => {
    const timeline = sampleScrollTimeline(smoothScrollProgress);
    return 0.45 + timeline.glowIntensity * 0.45;
  }, [smoothScrollProgress]);

  const spotIntensity = useMemo(() => {
    const timeline = sampleScrollTimeline(smoothScrollProgress);
    return 0.55 + timeline.glowIntensity * 0.65;
  }, [smoothScrollProgress]);

  return (
    <>
      <color attach="background" args={[BRAND.obsidian]} />
      <fog attach="fog" args={[BRAND.obsidianLight, 5, 26]} />

      <ambientLight intensity={0.12} color={BRAND.cream} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={spotIntensity * 0.55}
        color={BRAND.burgundyLight}
      />
      <directionalLight position={[-3, 2, 2]} intensity={0.25} color={BRAND.burgundyGlow} />
      <spotLight
        position={[0, 4, 3]}
        angle={0.4}
        penumbra={0.8}
        intensity={spotIntensity}
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
            count={sceneQuality.sparkleCount}
            scale={[10, 7, 7]}
            size={sceneQuality.tier === "mobile" ? 1 : 1.2}
            speed={0.22}
            color={BRAND.burgundyGlow}
            opacity={0.18}
          />
          <Stars
            radius={50}
            depth={30}
            count={sceneQuality.starCount}
            factor={1.8}
            saturation={0.1}
            fade
            speed={0.35}
          />
        </>
      )}

      {!reducedMotion && sceneQuality.enableBloom && (
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.25}
            luminanceSmoothing={0.9}
            intensity={bloomIntensity}
            mipmapBlur
          />
          {sceneQuality.enableDof && (
            <DepthOfField
              focusDistance={0.015}
              focalLength={0.02}
              bokehScale={2.4}
            />
          )}
        </EffectComposer>
      )}
    </>
  );
};

const ObsidianMonolithScene = () => {
  const { sceneQuality, reducedMotion } = useScrollScene();

  if (reducedMotion) return null;

  return (
    <Canvas
      camera={{ position: [0, 0.2, 5.5], fov: sceneQuality.fov }}
      dpr={sceneQuality.dpr}
      gl={{
        antialias: sceneQuality.tier !== "mobile",
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
