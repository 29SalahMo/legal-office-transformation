export type BeamSection =
  | "hero"
  | "about"
  | "services"
  | "process"
  | "expertise"
  | "testimonials"
  | "contact";

export type BeamTier = "mobile" | "tablet" | "desktop";

export const BEAM_SECTIONS: { id: BeamSection; label: string; subtitle: string }[] = [
  { id: "hero", label: "Origin", subtitle: "The beam arrives" },
  { id: "about", label: "Foundation", subtitle: "Architectural truth" },
  { id: "services", label: "Practice", subtitle: "Paths divide" },
  { id: "process", label: "Process", subtitle: "Guided journey" },
  { id: "expertise", label: "Expertise", subtitle: "Precision grid" },
  { id: "testimonials", label: "Trust", subtitle: "Client continuity" },
  { id: "contact", label: "Resolution", subtitle: "Perfect balance" },
];
