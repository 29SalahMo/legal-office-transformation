import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Environment } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";
import * as THREE from "three";
import ScaleOfJustice from "./ScaleOfJustice";
import GoldenParticles from "./GoldenParticles";
import LightBeams from "./LightBeams";
import { useScrollScene } from "@/contexts/ScrollSceneContext";
import { scrollEngine } from "@/lib/scrollEngine";
import { BRAND } from "@/lib/brandColors";
import { sampleScrollTimeline } from "@/lib/scrollTimeline";

const CameraRig = () => {
  const { camera } = useThree();
  const { reducedMotion, sceneQuality, isTouchDevice } = useScrollScene();

  const camPos = useRef({ x: 0, y: 0.15, z: 5.8 });
  const camRot = useRef(0);
  const lookAt = useRef(new THREE.Vector3(0, 0, -0.5));

  useFrame((_, delta) => {
    const smoothScrollProgress = scrollEngine.smoothProgress;
    const { mouseX, mouseY } = scrollEngine;
    const timeline = sampleScrollTimeline(smoothScrollProgress);
    const isMobile = sceneQuality.tier === "mobile";
    const interact = isTouchDevice || reducedMotion ? 0 : 1;

    const targetX = isMobile ? 0 : mouseX * 0.18 * interact;
    const targetY = 0.15 + timeline.cameraLift * 0.5 + (isMobile ? 0 : mouseY * 0.08 * interact);
    const targetZ = (isMobile ? 6.2 : 5.8) - timeline.cameraPull * (isMobile ? 0.75 : 1.05);
    const targetRot = isMobile ? 0 : timeline.cameraRotationY + mouseX * 0.03 * interact;

    const lerp = 1 - Math.pow(0.0008, delta);
    camPos.current.x += (targetX - camPos.current.x) * lerp;
    camPos.current.y += (targetY - camPos.current.y) * lerp;
    camPos.current.z += (targetZ - camPos.current.z) * lerp;
    camRot.current += (targetRot - camRot.current) * lerp;

    camera.position.set(camPos.current.x, camPos.current.y, camPos.current.z);
    lookAt.current.set(
      isMobile ? 0 : mouseX * 0.05 * interact + Math.sin(camRot.current) * 0.12,
      timeline.groundedness * 0.08,
      -0.5 - smoothScrollProgress * 0.12
    );
    camera.lookAt(lookAt.current);
  });

  return null;
};

const DynamicLighting = () => {
  const spotRef = useRef<THREE.SpotLight>(null);
  const dirRef = useRef<THREE.DirectionalLight>(null);
  const fogRef = useRef<THREE.Fog | null>(null);
  const { scene } = useThree();

  useFrame((state) => {
    const timeline = sampleScrollTimeline(scrollEngine.smoothProgress);
    const spotIntensity = 0.5 + timeline.glowIntensity * 0.55;

    if (spotRef.current) spotRef.current.intensity = spotIntensity * 0.8;
    if (dirRef.current) dirRef.current.intensity = spotIntensity * 0.65;

    if (!fogRef.current && scene.fog instanceof THREE.Fog) {
      fogRef.current = scene.fog;
    }
    if (fogRef.current) {
      fogRef.current.near = 4 + timeline.fogDensity * 2;
      fogRef.current.far = 22 - timeline.fogDensity * 4;
    }

    const glow = state.scene.getObjectByName("volumetric-glow");
    if (glow && glow instanceof THREE.Mesh) {
      const mat = glow.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.04 + timeline.fogDensity * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.45} color={BRAND.cream} />
      <directionalLight ref={dirRef} position={[4, 6, 4]} intensity={0.5} color={BRAND.cream} />
      <directionalLight position={[-4, 3, 2]} intensity={0.35} color={BRAND.burgundyGlow} />
      <spotLight
        ref={spotRef}
        position={[0, 5, 3]}
        angle={0.35}
        penumbra={0.9}
        intensity={0.6}
        color={BRAND.cream}
      />
    </>
  );
};

const VolumetricGlow = () => (
  <mesh name="volumetric-glow" position={[0, 1.5, -2]}>
    <coneGeometry args={[2.5, 5, 16, 1, true]} />
    <meshBasicMaterial
      color={BRAND.burgundyGlow}
      transparent
      opacity={0.05}
      blending={THREE.AdditiveBlending}
      depthWrite={false}
      side={THREE.DoubleSide}
    />
  </mesh>
);

const SceneContent = () => {
  const { reducedMotion, sceneQuality } = useScrollScene();

  return (
    <>
      <color attach="background" args={[BRAND.cream]} />
      <fog attach="fog" args={[BRAND.parchment, 5, 20]} />

      {sceneQuality.tier === "desktop" || sceneQuality.tier === "ultra" ? (
        <Environment preset="apartment" background={false} environmentIntensity={0.28} />
      ) : null}

      <DynamicLighting />
      <VolumetricGlow />
      <CameraRig />
      <ScaleOfJustice />
      {sceneQuality.particleCount > 0 && <GoldenParticles />}
      {sceneQuality.tier !== "mobile" && <LightBeams />}

      {!reducedMotion && sceneQuality.sparkleCount > 0 && (
        <Sparkles
          count={sceneQuality.sparkleCount}
          scale={[10, 7, 7]}
          size={1}
          speed={0.12}
          color={BRAND.burgundyGlow}
          opacity={0.1}
        />
      )}

      {!reducedMotion && sceneQuality.enableBloom && (
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.45}
            luminanceSmoothing={0.9}
            intensity={0.35}
            mipmapBlur
          />
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
      camera={{ position: [0, 0.15, 5.8], fov: sceneQuality.fov }}
      dpr={sceneQuality.dpr}
      gl={{
        antialias: sceneQuality.tier !== "mobile",
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      style={{ background: "transparent" }}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
};

export default ObsidianMonolithScene;
