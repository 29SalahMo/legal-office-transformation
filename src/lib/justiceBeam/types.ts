export type BeamSection =
  | "hero"
  | "about"
  | "trust"
  | "services"
  | "process"
  | "case-studies"
  | "expertise"
  | "testimonials"
  | "contact";

export type BeamTier = "mobile" | "tablet" | "desktop";

export const BEAM_SECTIONS: { id: BeamSection; label: string; subtitle: string }[] = [
  { id: "hero", label: "Origin", subtitle: "The beam arrives" },
  { id: "about", label: "Foundation", subtitle: "Architectural truth" },
  { id: "trust", label: "Prestige", subtitle: "Credibility grid" },
  { id: "services", label: "Practice", subtitle: "Paths divide" },
  { id: "process", label: "Process", subtitle: "Guided journey" },
  { id: "case-studies", label: "Outcomes", subtitle: "Proven results" },
  { id: "expertise", label: "Expertise", subtitle: "Precision grid" },
  { id: "testimonials", label: "Trust", subtitle: "Client continuity" },
  { id: "contact", label: "Resolution", subtitle: "Perfect balance" },
];
