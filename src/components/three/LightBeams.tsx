import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollScene } from "@/contexts/ScrollSceneContext";

const LightBeams = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { phase, reducedMotion } = useScrollScene();

  useFrame((state) => {
    if (!groupRef.current) return;

    const isTeam = phase === "team";
    groupRef.current.visible = isTeam || phase === "contact";
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;

    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = isTeam
        ? 0.08 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.04
        : phase === "contact"
          ? 0.12
          : 0;
    });
  });

  if (reducedMotion) return null;

  return (
    <group ref={groupRef} position={[0, 1, -3]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[0, 0, (i - 1) * 0.15]} position={[i * 0.8 - 0.8, 0, 0]}>
          <planeGeometry args={[0.08, 12, 1, 1]} />
          <meshBasicMaterial
            color={i === 1 ? "#D4AF37" : "#5B8CFF"}
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
