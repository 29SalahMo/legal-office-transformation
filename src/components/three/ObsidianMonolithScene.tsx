import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Environment } from "@react-three/drei";
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

  const camPos = useRef({ x: 0, y: 0.15, z: 5.8 });
  const camRot = useRef(0);
  const lookAt = useRef(new THREE.Vector3(0, 0, -0.5));

  useFrame((_, delta) => {
    const timeline = sampleScrollTimeline(smoothScrollProgress);
    const interact = isTouchDevice || reducedMotion ? 0 : 1;

    const targetX = mouseX * 0.22 * interact;
    const targetY = 0.15 + timeline.cameraLift * 0.5 + mouseY * 0.1 * interact;
    const targetZ = 5.8 - timeline.cameraPull * 1.05;
    const targetRot = timeline.cameraRotationY + mouseX * 0.04 * interact;

    const lerp = 1 - Math.pow(0.0008, delta);
    camPos.current.x += (targetX - camPos.current.x) * lerp;
    camPos.current.y += (targetY - camPos.current.y) * lerp;
    camPos.current.z += (targetZ - camPos.current.z) * lerp;
    camRot.current += (targetRot - camRot.current) * lerp;

    camera.position.set(camPos.current.x, camPos.current.y, camPos.current.z);

    lookAt.current.set(
      mouseX * 0.06 * interact + Math.sin(camRot.current) * 0.15,
      timeline.groundedness * 0.1,
      -0.5 - smoothScrollProgress * 0.12
    );
    camera.lookAt(lookAt.current);
  });

  return null;
};

const VolumetricGlow = () => {
  const ref = useRef<THREE.Mesh>(null);
  const { smoothScrollProgress } = useScrollScene();

  useFrame((state) => {
    if (!ref.current) return;
    const timeline = sampleScrollTimeline(smoothScrollProgress);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.04 + timeline.fogDensity * 0.06 + Math.sin(state.clock.elapsedTime * 0.3) * 0.01;
  });

  return (
    <mesh ref={ref} position={[0, 1.5, -2]} rotation={[0, 0, 0]}>
      <coneGeometry args={[2.5, 5, 32, 1, true]} />
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
};

const SceneContent = () => {
  const { smoothScrollProgress, reducedMotion, sceneQuality } = useScrollScene();

  const bloomIntensity = useMemo(() => {
    const timeline = sampleScrollTimeline(smoothScrollProgress);
    return 0.35 + timeline.glowIntensity * 0.4;
  }, [smoothScrollProgress]);

  const spotIntensity = useMemo(() => {
    const timeline = sampleScrollTimeline(smoothScrollProgress);
    return 0.5 + timeline.glowIntensity * 0.55;
  }, [smoothScrollProgress]);

  const fogRange = useMemo(() => {
    const timeline = sampleScrollTimeline(smoothScrollProgress);
    const near = 4 + timeline.fogDensity * 2;
    const far = 22 - timeline.fogDensity * 4;
    return [near, far] as [number, number];
  }, [smoothScrollProgress]);

  return (
    <>
      <color attach="background" args={[BRAND.cream]} />
      <fog attach="fog" args={[BRAND.parchment, fogRange[0], fogRange[1]]} />

      {sceneQuality.tier !== "mobile" && (
        <Environment preset="apartment" background={false} environmentIntensity={0.35} />
      )}

      <ambientLight intensity={0.45} color={BRAND.cream} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={spotIntensity * 0.65}
        color={BRAND.cream}
      />
      <directionalLight
        position={[-4, 3, 2]}
        intensity={0.35 + spotIntensity * 0.2}
        color={BRAND.burgundyGlow}
      />
      <spotLight
        position={[0, 5, 3]}
        angle={0.35}
        penumbra={0.9}
        intensity={spotIntensity * 0.8}
        color={BRAND.cream}
        castShadow={false}
      />
      <spotLight
        position={[-3, 2, -1]}
        angle={0.5}
        penumbra={1}
        intensity={spotIntensity * 0.35}
        color={BRAND.burgundySoft}
        castShadow={false}
      />

      <VolumetricGlow />
      <CameraRig />
      <ScaleOfJustice />
      <GoldenParticles />
      <LightBeams />

      {!reducedMotion && sceneQuality.tier !== "mobile" && (
        <Sparkles
          count={sceneQuality.sparkleCount}
          scale={[10, 7, 7]}
          size={sceneQuality.tier === "tablet" ? 1 : 1.15}
          speed={0.18}
          color={BRAND.burgundyGlow}
          opacity={0.12}
        />
      )}

      {!reducedMotion && sceneQuality.enableBloom && (
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.35}
            luminanceSmoothing={0.92}
            intensity={bloomIntensity}
            mipmapBlur
          />
          {sceneQuality.enableDof && (
            <DepthOfField
              focusDistance={0.018}
              focalLength={0.022}
              bokehScale={2.2}
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
      camera={{ position: [0, 0.15, 5.8], fov: sceneQuality.fov }}
      dpr={sceneQuality.dpr}
      gl={{
        antialias: sceneQuality.tier !== "mobile",
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
