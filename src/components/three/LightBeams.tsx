import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollScene } from "@/contexts/ScrollSceneContext";
import { BRAND } from "@/lib/brandColors";
import { sampleScrollTimeline } from "@/lib/scrollTimeline";

const LightBeams = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { smoothScrollProgress, reducedMotion, sceneQuality } = useScrollScene();

  useFrame((state) => {
    if (!groupRef.current) return;

    const timeline = sampleScrollTimeline(smoothScrollProgress);
    const grounded = timeline.groundedness;

    groupRef.current.visible = grounded > 0.4;
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.22) * 0.012;

    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      const base = grounded * 0.1;
      mat.opacity = base + Math.sin(state.clock.elapsedTime * 1.6 + i) * 0.03;
    });
  });

  if (reducedMotion || sceneQuality.tier === "mobile") return null;

  return (
    <group ref={groupRef} position={[0, 0.5, -2.5]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[0, 0, (i - 1) * 0.12]} position={[i * 0.7 - 0.7, 0, 0]}>
          <planeGeometry args={[0.06, 10, 1, 1]} />
          <meshBasicMaterial
            color={i === 1 ? BRAND.burgundyGlow : BRAND.burgundyLight}
            transparent
            opacity={0.06}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

export default LightBeams;
