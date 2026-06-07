import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollScene, type ScenePhase } from "@/contexts/ScrollSceneContext";
import { BRAND } from "@/lib/brandColors";

type PhaseMotion = {
  tilt: number;
  tiltOscillation: number;
  stability: number;
  floatAmp: number;
  breathe: number;
  lightBoost: number;
  panReact: number;
};

const phaseMotion = (phase: ScenePhase, t: number): PhaseMotion => {
  const configs: Record<ScenePhase, PhaseMotion> = {
    hero: {
      tilt: 0,
      tiltOscillation: 0,
      stability: 1,
      floatAmp: 0.1,
      breathe: 0.012,
      lightBoost: 0.6,
      panReact: 0.35,
    },
    about: {
      tilt: 0.015,
      tiltOscillation: 0.008,
      stability: 0.95,
      floatAmp: 0.08,
      breathe: 0.008,
      lightBoost: 0.75,
      panReact: 0.3,
    },
    services: {
      tilt: 0.06,
      tiltOscillation: 0.045,
      stability: 0.72,
      floatAmp: 0.12,
      breathe: 0.014,
      lightBoost: 0.85,
      panReact: 0.55,
    },
    team: {
      tilt: 0.02,
      tiltOscillation: 0.01,
      stability: 0.92,
      floatAmp: 0.06,
      breathe: 0.006,
      lightBoost: 1.25,
      panReact: 0.38,
    },
    testimonials: {
      tilt: 0.008,
      tiltOscillation: 0.004,
      stability: 0.98,
      floatAmp: 0.05,
      breathe: 0.004,
      lightBoost: 0.9,
      panReact: 0.22,
    },
    contact: {
      tilt: 0,
      tiltOscillation: 0,
      stability: 1,
      floatAmp: 0.07,
      breathe: 0.005,
      lightBoost: 1.1,
      panReact: 0.3,
    },
  };

  const c = configs[phase];
  const osc =
    c.tiltOscillation > 0
      ? Math.sin(t * (phase === "testimonials" ? 0.35 : 0.55)) * c.tiltOscillation
      : 0;

  return { ...c, tilt: c.tilt + osc };
};

const ScaleOfJustice = () => {
  const groupRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Group>(null);
  const leftPanRef = useRef<THREE.Group>(null);
  const rightPanRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const currentTilt = useRef(0);

  const { scrollProgress, mouseX, mouseY, phase, reducedMotion } = useScrollScene();

  const metalMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(BRAND.burgundy),
        metalness: 0.92,
        roughness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        reflectivity: 1,
        envMapIntensity: 1.4,
      }),
    []
  );

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(BRAND.burgundyMid),
        metalness: 0.35,
        roughness: 0.04,
        transmission: 0.55,
        thickness: 0.8,
        transparent: true,
        opacity: 0.92,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
      }),
    []
  );

  const accentMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(BRAND.burgundyGlow),
        metalness: 0.85,
        roughness: 0.12,
        emissive: new THREE.Color(BRAND.burgundy),
        emissiveIntensity: 0.15,
      }),
    []
  );

  const panMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(BRAND.burgundyDark),
        metalness: 0.75,
        roughness: 0.22,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
        side: THREE.DoubleSide,
      }),
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current || !beamRef.current) return;

    const t = state.clock.elapsedTime;
    const motion = phaseMotion(phase, t);

    const targetTilt = reducedMotion ? 0 : motion.tilt;
    currentTilt.current += (targetTilt - currentTilt.current) * delta * (2.5 * motion.stability);
    const tilt = currentTilt.current;

    const parallaxX = reducedMotion ? 0 : mouseX * 0.35;
    const parallaxY = reducedMotion ? 0 : mouseY * 0.2;
    const scrollX = scrollProgress * 0.6 - 0.3;

    const floatY =
      Math.sin(t * 0.45) * motion.floatAmp +
      Math.sin(t * 0.9) * motion.breathe;

    groupRef.current.position.set(
      scrollX + parallaxX,
      floatY + parallaxY * 0.5,
      -1.2 - scrollProgress * 0.4
    );
    groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.08 + mouseX * 0.04;

    beamRef.current.rotation.z = tilt;

    const panDrop = tilt * motion.panReact * 1.2;
    if (leftPanRef.current) {
      leftPanRef.current.position.y = -1.35 - Math.max(0, panDrop);
      leftPanRef.current.rotation.z = -tilt * 0.25;
    }
    if (rightPanRef.current) {
      rightPanRef.current.position.y = -1.35 + Math.min(0, -panDrop);
      rightPanRef.current.rotation.z = -tilt * 0.25;
    }

    if (glowRef.current) {
      glowRef.current.intensity = 0.8 + motion.lightBoost * 0.5 + Math.sin(t * 0.8) * 0.1;
    }
  });

  const ChainLinks = ({ side }: { side: -1 | 1 }) => (
    <group position={[side * 1.35, -0.15, 0]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, -i * 0.22, 0]} rotation={[Math.PI / 2, 0, 0]} material={accentMat}>
          <torusGeometry args={[0.055, 0.014, 10, 20]} />
        </mesh>
      ))}
    </group>
  );

  const PanBowl = () => (
    <>
      <mesh material={panMat} rotation={[0.05, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.36, 0.07, 32]} />
      </mesh>
      <mesh position={[0, -0.02, 0]} material={glassMat}>
        <cylinderGeometry args={[0.38, 0.34, 0.04, 32]} />
      </mesh>
      <mesh position={[0, 0.04, 0]} material={accentMat}>
        <torusGeometry args={[0.4, 0.018, 12, 40]} />
      </mesh>
    </>
  );

  return (
    <group ref={groupRef} scale={1.15}>
      <pointLight
        ref={glowRef}
        position={[0, 0.5, 1.5]}
        color={BRAND.burgundyGlow}
        intensity={1.2}
        distance={8}
      />
      <pointLight position={[-2, 2, 2]} color={BRAND.burgundySoft} intensity={0.4} />
      <pointLight position={[2, 1, 1]} color={BRAND.burgundyLight} intensity={0.3} />

      {/* Pedestal */}
      <mesh position={[0, -2.1, 0]} material={glassMat}>
        <cylinderGeometry args={[1.1, 1.25, 0.35, 48]} />
      </mesh>
      <mesh position={[0, -1.85, 0]} material={metalMat}>
        <cylinderGeometry args={[0.95, 1.05, 0.12, 48]} />
      </mesh>

      {/* Column */}
      <mesh position={[0, -0.55, 0]} material={metalMat}>
        <cylinderGeometry args={[0.14, 0.2, 2.4, 16]} />
      </mesh>
      <mesh position={[0, 0.55, 0]} material={accentMat}>
        <cylinderGeometry args={[0.22, 0.14, 0.2, 16]} />
      </mesh>

      {/* Decorative capital */}
      <mesh position={[0, 0.72, 0]} material={glassMat}>
        <boxGeometry args={[0.5, 0.12, 0.28]} />
      </mesh>

      {/* Balance beam assembly */}
      <group ref={beamRef} position={[0, 0.78, 0]}>
        <mesh material={metalMat}>
          <boxGeometry args={[3.2, 0.07, 0.12]} />
        </mesh>
        <mesh position={[0, 0.08, 0]} material={accentMat}>
          <sphereGeometry args={[0.09, 24, 24]} />
        </mesh>

        <ChainLinks side={-1} />
        <ChainLinks side={1} />

        <group ref={leftPanRef} position={[-1.35, -1.35, 0]}>
          <PanBowl />
        </group>
        <group ref={rightPanRef} position={[1.35, -1.35, 0]}>
          <PanBowl />
        </group>
      </group>

      {/* Base glow ring */}
      <mesh position={[0, -1.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.0, 1.35, 64]} />
        <meshBasicMaterial
          color={BRAND.burgundyGlow}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default ScaleOfJustice;
