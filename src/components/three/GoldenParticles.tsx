import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollScene } from "@/contexts/ScrollSceneContext";
import { BRAND } from "@/lib/brandColors";

const GoldenParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { scrollProgress, phase, reducedMotion } = useScrollScene();

  const count = reducedMotion ? 80 : 180;
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    speeds[i] = 0.15 + Math.random() * 0.6;
  }

  useFrame((state) => {
    if (!pointsRef.current) return;

    const showParticles =
      phase === "services" ||
      phase === "about" ||
      phase === "team" ||
      phase === "contact" ||
      scrollProgress > 0.25;

    pointsRef.current.visible = showParticles;
    if (!showParticles) return;

    const intensity =
      phase === "services" ? 0.55 :
      phase === "team" ? 0.75 :
      phase === "testimonials" ? 0.35 :
      phase === "contact" ? 0.65 : 0.4;

    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = intensity * (0.3 + scrollProgress * 0.35);

    const posAttr = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      posAttr.array[i * 3 + 1] += speeds[i] * 0.0015;
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
        size={0.022}
        color={BRAND.burgundyGlow}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default GoldenParticles;
