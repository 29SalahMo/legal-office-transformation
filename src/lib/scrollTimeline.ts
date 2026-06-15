/** Cinematic justice journey timeline — 4 acts driven by scroll progress */

export type TimelineKeyframe = [progress: number, value: number];

export type ScrollTimelineState = {
  beamTilt: number;
  groupRotationY: number;
  floatAmplitude: number;
  glowIntensity: number;
  stability: number;
  panReactivity: number;
  cameraLift: number;
  cameraPull: number;
  cameraRotationY: number;
  groundedness: number;
  particleDrift: number;
  ambientPulse: number;
  rimGlow: number;
  fogDensity: number;
};

const smoothstep = (t: number) => t * t * (3 - 2 * t);

export const sampleKeyframes = (progress: number, keyframes: TimelineKeyframe[]): number => {
  const p = Math.min(1, Math.max(0, progress));
  if (p <= keyframes[0][0]) return keyframes[0][1];
  if (p >= keyframes[keyframes.length - 1][0]) return keyframes[keyframes.length - 1][1];

  for (let i = 0; i < keyframes.length - 1; i++) {
    const [p0, v0] = keyframes[i];
    const [p1, v1] = keyframes[i + 1];
    if (p >= p0 && p <= p1) {
      const t = (p - p0) / (p1 - p0);
      return v0 + (v1 - v0) * smoothstep(t);
    }
  }
  return keyframes[keyframes.length - 1][1];
};

/**
 * Four-act legal journey:
 * Intro (hero) → Conflict (tilt) → Process (rebalancing) → Justice (stable)
 */
export const sampleScrollTimeline = (progress: number): ScrollTimelineState => ({
  beamTilt: sampleKeyframes(progress, [
    [0, 0],
    [0.08, 0],
    [0.15, 0.002],
    [0.28, 0.085],
    [0.38, 0.072],
    [0.52, 0.038],
    [0.65, 0.014],
    [0.78, 0.004],
    [0.9, 0],
    [1, 0],
  ]),
  groupRotationY: sampleKeyframes(progress, [
    [0, 0],
    [0.15, 0.06],
    [0.28, 0.22],
    [0.45, 0.34],
    [0.65, 0.18],
    [0.82, 0.08],
    [1, 0.04],
  ]),
  floatAmplitude: sampleKeyframes(progress, [
    [0, 0.12],
    [0.15, 0.1],
    [0.28, 0.06],
    [0.45, 0.08],
    [0.65, 0.05],
    [0.82, 0.03],
    [1, 0.02],
  ]),
  glowIntensity: sampleKeyframes(progress, [
    [0, 0.45],
    [0.15, 0.55],
    [0.28, 0.78],
    [0.45, 0.88],
    [0.65, 0.95],
    [0.82, 0.72],
    [1, 0.85],
  ]),
  stability: sampleKeyframes(progress, [
    [0, 1],
    [0.15, 0.96],
    [0.28, 0.42],
    [0.38, 0.38],
    [0.52, 0.62],
    [0.65, 0.82],
    [0.78, 0.94],
    [0.9, 0.99],
    [1, 1],
  ]),
  panReactivity: sampleKeyframes(progress, [
    [0, 0.22],
    [0.28, 0.72],
    [0.45, 0.58],
    [0.65, 0.32],
    [0.82, 0.16],
    [1, 0.12],
  ]),
  cameraLift: sampleKeyframes(progress, [
    [0, 0],
    [0.15, 0.08],
    [0.28, 0.28],
    [0.45, 0.42],
    [0.65, 0.22],
    [0.82, 0.06],
    [1, 0],
  ]),
  cameraPull: sampleKeyframes(progress, [
    [0, 0],
    [0.15, 0.12],
    [0.28, 0.55],
    [0.45, 0.72],
    [0.65, 0.48],
    [0.82, 0.22],
    [1, 0.08],
  ]),
  cameraRotationY: sampleKeyframes(progress, [
    [0, 0],
    [0.28, 0.14],
    [0.45, 0.22],
    [0.65, 0.1],
    [0.82, 0.04],
    [1, 0],
  ]),
  groundedness: sampleKeyframes(progress, [
    [0, 0.15],
    [0.15, 0.2],
    [0.28, 0.25],
    [0.45, 0.55],
    [0.65, 0.78],
    [0.82, 0.92],
    [1, 1],
  ]),
  particleDrift: sampleKeyframes(progress, [
    [0, 0.1],
    [0.28, 0.55],
    [0.45, 0.7],
    [0.65, 0.45],
    [0.82, 0.25],
    [1, 0.18],
  ]),
  ambientPulse: sampleKeyframes(progress, [
    [0, 0.35],
    [0.28, 0.65],
    [0.45, 0.8],
    [0.65, 0.55],
    [0.82, 0.4],
    [1, 0.45],
  ]),
  rimGlow: sampleKeyframes(progress, [
    [0, 0.4],
    [0.28, 0.85],
    [0.45, 0.95],
    [0.65, 0.75],
    [0.82, 0.55],
    [1, 0.65],
  ]),
  fogDensity: sampleKeyframes(progress, [
    [0, 0.35],
    [0.28, 0.55],
    [0.45, 0.65],
    [0.65, 0.45],
    [0.82, 0.3],
    [1, 0.25],
  ]),
});

/** Critically-damped spring step — reversible on scroll up */
export const springStep = (
  current: number,
  velocity: number,
  target: number,
  delta: number,
  stiffness = 5.5,
  damping = 0.78
): [number, number] => {
  const accel = (target - current) * stiffness;
  let v = (velocity + accel * delta) * damping;
  let x = current + v * delta;
  return [x, v];
};
