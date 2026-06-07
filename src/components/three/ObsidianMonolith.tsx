import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollScene } from "@/contexts/ScrollSceneContext";

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uLineSpeed;
  uniform float uBrightness;
  uniform float uEnergyIntensity;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.5);

    vec3 obsidian = vec3(0.02, 0.03, 0.07);
    vec3 gold = vec3(0.83, 0.69, 0.22);
    vec3 goldBright = vec3(0.97, 0.84, 0.45);

    float flow1 = sin(vWorldPosition.y * 8.0 + uTime * uLineSpeed) * 0.5 + 0.5;
    float flow2 = sin(vWorldPosition.x * 6.0 - uTime * uLineSpeed * 0.7 + vWorldPosition.z * 4.0) * 0.5 + 0.5;
    float flow3 = noise(vUv * 12.0 + vec2(uTime * uLineSpeed * 0.15, 0.0));
    float lines = smoothstep(0.72, 0.95, flow1 * flow2) * (0.4 + flow3 * 0.6);
    lines *= uEnergyIntensity;

    float pulse = sin(uTime * 1.5) * 0.08 + 0.92;
    vec3 energy = mix(gold, goldBright, flow3) * lines * pulse;

    vec3 reflection = vec3(0.15, 0.2, 0.35) * fresnel;
    vec3 blueGlow = vec3(0.36, 0.55, 1.0) * fresnel * 0.15 * uBrightness;

    vec3 color = obsidian + energy * uBrightness + reflection + blueGlow;
    float alpha = 0.88 + fresnel * 0.12;

    gl_FragColor = vec4(color, alpha);
  }
`;

const ObsidianMonolith = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { scrollProgress, mouseX, mouseY, phase, reducedMotion } = useScrollScene();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uLineSpeed: { value: 0.8 },
      uBrightness: { value: 1.0 },
      uEnergyIntensity: { value: 0.6 },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    const t = state.clock.elapsedTime;
    materialRef.current.uniforms.uTime.value = t;

    const phaseConfig = {
      hero: { speed: 0.8, brightness: 1.0, energy: 0.55, rotY: 0.08, floatY: 0.15 },
      about: { speed: 1.0, brightness: 1.05, energy: 0.65, rotY: 0.12, floatY: 0.2 },
      services: { speed: 1.2, brightness: 1.1, energy: 0.85, rotY: 0.15, floatY: 0.25 },
      team: { speed: 0.9, brightness: 1.25, energy: 0.75, rotY: 0.1, floatY: 0.18 },
      testimonials: { speed: 1.0, brightness: 1.15, energy: 0.7, rotY: 0.12, floatY: 0.2 },
      contact: { speed: 2.2, brightness: 1.5, energy: 1.0, rotY: 0.18, floatY: 0.12 },
    }[phase];

    const scrollBoost = 1 + scrollProgress * 0.35;
    materialRef.current.uniforms.uLineSpeed.value = phaseConfig.speed * scrollBoost;
    materialRef.current.uniforms.uBrightness.value = phaseConfig.brightness;
    materialRef.current.uniforms.uEnergyIntensity.value = phaseConfig.energy;

    const parallaxX = reducedMotion ? 0 : mouseX * 0.25;
    const parallaxY = reducedMotion ? 0 : mouseY * 0.15;

    const baseX = -0.5 + scrollProgress * 1.8 + parallaxX;
    const baseY = 0.2 + Math.sin(t * 0.4) * phaseConfig.floatY + parallaxY;
    const baseZ = -2 - scrollProgress * 1.5;

    meshRef.current.position.set(baseX, baseY, baseZ);
    meshRef.current.rotation.y += delta * phaseConfig.rotY;
    meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.05 + mouseY * 0.03;
  });

  return (
    <mesh ref={meshRef} scale={[1.8, 4.2, 0.45]}>
      <boxGeometry args={[1, 1, 1, 32, 32, 8]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default ObsidianMonolith;
