/** Continuous scroll timeline — values interpolate smoothly in both scroll directions */

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
  groundedness: number;
  particleDrift: number;
  ambientPulse: number;
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
 * Hero → About → Services → Team → Testimonials → Contact
 * Motion is symbolic: balance, analysis, trust, confidence, resolution
 */
export const sampleScrollTimeline = (progress: number): ScrollTimelineState => ({
  beamTilt: sampleKeyframes(progress, [
    [0, 0],
    [0.12, 0],
    [0.28, 0.012],
    [0.45, 0.058],
    [0.62, 0.018],
    [0.82, 0.005],
    [1, 0],
  ]),
  groupRotationY: sampleKeyframes(progress, [
    [0, 0],
    [0.2, 0.12],
    [0.45, 0.38],
    [0.62, 0.52],
    [0.82, 0.58],
    [1, 0.42],
  ]),
  floatAmplitude: sampleKeyframes(progress, [
    [0, 0.1],
    [0.28, 0.07],
    [0.45, 0.09],
    [0.62, 0.05],
    [0.82, 0.04],
    [1, 0.06],
  ]),
  glowIntensity: sampleKeyframes(progress, [
    [0, 0.55],
    [0.28, 0.72],
    [0.45, 0.82],
    [0.62, 1.15],
    [0.82, 0.88],
    [1, 1.05],
  ]),
  stability: sampleKeyframes(progress, [
    [0, 1],
    [0.28, 0.94],
    [0.45, 0.7],
    [0.62, 0.9],
    [0.82, 0.97],
    [1, 1],
  ]),
  panReactivity: sampleKeyframes(progress, [
    [0, 0.28],
    [0.45, 0.58],
    [0.62, 0.36],
    [0.82, 0.18],
    [1, 0.26],
  ]),
  cameraLift: sampleKeyframes(progress, [
    [0, 0],
    [0.45, 0.35],
    [0.62, 0.55],
    [0.82, 0.25],
    [1, 0.1],
  ]),
  cameraPull: sampleKeyframes(progress, [
    [0, 0],
    [0.45, 0.45],
    [0.62, 0.65],
    [1, 0.35],
  ]),
  groundedness: sampleKeyframes(progress, [
    [0, 0.2],
    [0.28, 0.45],
    [0.45, 0.35],
    [0.62, 0.85],
    [0.82, 0.75],
    [1, 0.95],
  ]),
  particleDrift: sampleKeyframes(progress, [
    [0, 0.15],
    [0.45, 0.65],
    [0.62, 0.55],
    [0.82, 0.3],
    [1, 0.45],
  ]),
  ambientPulse: sampleKeyframes(progress, [
    [0, 0.4],
    [0.45, 0.7],
    [0.62, 0.9],
    [0.82, 0.5],
    [1, 0.6],
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
