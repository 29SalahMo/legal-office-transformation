import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollScene } from "@/contexts/ScrollSceneContext";
import { BRAND } from "@/lib/brandColors";
import { sampleScrollTimeline, springStep } from "@/lib/scrollTimeline";

type PlatePhysics = {
  beamAngle: number;
  beamVelocity: number;
  leftPanOffset: number;
  leftPanVelocity: number;
  rightPanOffset: number;
  rightPanVelocity: number;
  leftSwing: number;
  leftSwingVel: number;
  rightSwing: number;
  rightSwingVel: number;
};

const ScaleOfJustice = () => {
  const groupRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Group>(null);
  const leftPanRef = useRef<THREE.Group>(null);
  const rightPanRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  const physics = useRef<PlatePhysics>({
    beamAngle: 0,
    beamVelocity: 0,
    leftPanOffset: 0,
    leftPanVelocity: 0,
    rightPanOffset: 0,
    rightPanVelocity: 0,
    leftSwing: 0,
    leftSwingVel: 0,
    rightSwing: 0,
    rightSwingVel: 0,
  });

  const {
    smoothScrollProgress,
    mouseX,
    mouseY,
    reducedMotion,
    sceneQuality,
    isTouchDevice,
  } = useScrollScene();

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
    const timeline = sampleScrollTimeline(smoothScrollProgress);
    const p = physics.current;

    const stiffness = 4.2 + timeline.stability * 2.2;
    const microSway =
      reducedMotion ? 0 : Math.sin(t * 0.55) * 0.004 * (1 - timeline.groundedness);
    const targetTilt = timeline.beamTilt + microSway;

    [p.beamAngle, p.beamVelocity] = springStep(
      p.beamAngle,
      p.beamVelocity,
      targetTilt,
      delta,
      stiffness,
      0.8
    );

    const panInteract = isTouchDevice ? 0 : 1;
    const parallaxX = reducedMotion ? 0 : mouseX * 0.22 * panInteract;
    const parallaxY = reducedMotion ? 0 : mouseY * 0.12 * panInteract;

    const offset = sceneQuality.positionOffset;
    const scrollX = (smoothScrollProgress - 0.5) * 0.45;

    const breathe =
      Math.sin(t * 0.38) * timeline.floatAmplitude * 0.55 +
      Math.sin(t * 0.72) * timeline.floatAmplitude * 0.25;

    groupRef.current.position.set(
      scrollX + parallaxX + offset.x,
      breathe + parallaxY * 0.4 + offset.y,
      -1.2 - smoothScrollProgress * 0.35 + offset.z
    );

    const rotTarget = timeline.groupRotationY + (reducedMotion ? 0 : mouseX * 0.03);
    groupRef.current.rotation.y += (rotTarget - groupRef.current.rotation.y) * delta * 1.8;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.025 * timeline.floatAmplitude;

    beamRef.current.rotation.z = p.beamAngle;

    const panDrop = p.beamAngle * timeline.panReactivity * 1.15;
    const leftBase = -1.35 - Math.max(0, panDrop);
    const rightBase = -1.35 + Math.min(0, -panDrop);

    const leftMicro = reducedMotion ? 0 : Math.sin(t * 1.15 + 0.4) * 0.012 * timeline.panReactivity;
    const rightMicro = reducedMotion ? 0 : Math.sin(t * 1.15 + 2.1) * 0.012 * timeline.panReactivity;

    const leftTarget = leftBase + leftMicro;
    const rightTarget = rightBase + rightMicro;

    [p.leftPanOffset, p.leftPanVelocity] = springStep(
      p.leftPanOffset,
      p.leftPanVelocity,
      leftTarget,
      delta,
      9,
      0.76
    );
    [p.rightPanOffset, p.rightPanVelocity] = springStep(
      p.rightPanOffset,
      p.rightPanVelocity,
      rightTarget,
      delta,
      9,
      0.76
    );

    const swingTargetL = -p.beamAngle * 0.28 + leftMicro * 0.5;
    const swingTargetR = -p.beamAngle * 0.28 + rightMicro * 0.5;

    [p.leftSwing, p.leftSwingVel] = springStep(p.leftSwing, p.leftSwingVel, swingTargetL, delta, 6, 0.74);
    [p.rightSwing, p.rightSwingVel] = springStep(p.rightSwing, p.rightSwingVel, swingTargetR, delta, 6, 0.74);

    if (leftPanRef.current) {
      leftPanRef.current.position.y = p.leftPanOffset;
      leftPanRef.current.rotation.z = p.leftSwing;
    }
    if (rightPanRef.current) {
      rightPanRef.current.position.y = p.rightPanOffset;
      rightPanRef.current.rotation.z = p.rightSwing;
    }

    if (glowRef.current) {
      const pulse = Math.sin(t * 0.65) * 0.06 * timeline.ambientPulse;
      glowRef.current.intensity = 0.65 + timeline.glowIntensity * 0.55 + pulse;
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
    <group ref={groupRef} scale={sceneQuality.scaleMultiplier}>
      <pointLight
        ref={glowRef}
        position={[0, 0.5, 1.5]}
        color={BRAND.burgundyGlow}
        intensity={1.2}
        distance={8}
      />
      <pointLight position={[-2, 2, 2]} color={BRAND.burgundySoft} intensity={0.4} />
      <pointLight position={[2, 1, 1]} color={BRAND.burgundyLight} intensity={0.3} />

      <mesh position={[0, -2.1, 0]} material={glassMat}>
        <cylinderGeometry args={[1.1, 1.25, 0.35, 48]} />
      </mesh>
      <mesh position={[0, -1.85, 0]} material={metalMat}>
        <cylinderGeometry args={[0.95, 1.05, 0.12, 48]} />
      </mesh>

      <mesh position={[0, -0.55, 0]} material={metalMat}>
        <cylinderGeometry args={[0.14, 0.2, 2.4, 16]} />
      </mesh>
      <mesh position={[0, 0.55, 0]} material={accentMat}>
        <cylinderGeometry args={[0.22, 0.14, 0.2, 16]} />
      </mesh>

      <mesh position={[0, 0.72, 0]} material={glassMat}>
        <boxGeometry args={[0.5, 0.12, 0.28]} />
      </mesh>

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
