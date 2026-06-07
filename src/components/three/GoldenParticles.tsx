import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollScene } from "@/contexts/ScrollSceneContext";

const GoldenParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { scrollProgress, phase, reducedMotion } = useScrollScene();

  const count = reducedMotion ? 80 : 200;
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    speeds[i] = 0.2 + Math.random() * 0.8;
  }

  useFrame((state) => {
    if (!pointsRef.current) return;

    const showParticles =
      phase === "services" ||
      phase === "team" ||
      phase === "contact" ||
      scrollProgress > 0.3;

    pointsRef.current.visible = showParticles;
    if (!showParticles) return;

    const intensity =
      phase === "services" ? 0.6 :
      phase === "team" ? 0.8 :
      phase === "contact" ? 1.0 : 0.4;

    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = intensity * (0.35 + scrollProgress * 0.4);

    const posAttr = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      posAttr.array[i * 3 + 1] += speeds[i] * 0.002;
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
        size={0.025}
        color="#F7D774"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default GoldenParticles;
