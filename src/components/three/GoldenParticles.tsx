import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollScene } from "@/contexts/ScrollSceneContext";
import { BRAND } from "@/lib/brandColors";
import { sampleScrollTimeline } from "@/lib/scrollTimeline";

const GoldenParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { smoothScrollProgress, reducedMotion, sceneQuality } = useScrollScene();

  const count = sceneQuality.particleCount;
  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
      spd[i] = 0.12 + Math.random() * 0.5;
    }
    return { positions: pos, speeds: spd };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const timeline = sampleScrollTimeline(smoothScrollProgress);
    const showParticles = smoothScrollProgress > 0.08 || timeline.particleDrift > 0.2;

    pointsRef.current.visible = showParticles;
    if (!showParticles) return;

    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.012 * timeline.particleDrift;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = timeline.particleDrift * (0.28 + smoothScrollProgress * 0.32);

    if (reducedMotion) return;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const speedMul = sceneQuality.tier === "mobile" ? 0.001 : 0.0015;
    for (let i = 0; i < count; i++) {
      posAttr.array[i * 3 + 1] += speeds[i] * speedMul * timeline.particleDrift;
      if (posAttr.array[i * 3 + 1] > 3) {
        posAttr.array[i * 3 + 1] = -3;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={sceneQuality.tier === "mobile" ? 0.018 : 0.022}
        color={BRAND.burgundyGlow}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default GoldenParticles;
