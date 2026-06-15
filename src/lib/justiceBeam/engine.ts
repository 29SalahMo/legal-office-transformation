import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { BeamSection, BeamTier } from "./types";

gsap.registerPlugin(ScrollTrigger);

let mouseX = 0.5;
let mouseY = 0.5;
let activeSection: BeamSection = "hero";
const sectionListeners = new Set<(s: BeamSection) => void>();

export function subscribeBeamSection(listener: (s: BeamSection) => void) {
  sectionListeners.add(listener);
  listener(activeSection);
  return () => sectionListeners.delete(listener);
}

export function getBeamSection() {
  return activeSection;
}

export function updateBeamMouse(x: number, y: number) {
  mouseX = x / window.innerWidth;
  mouseY = y / window.innerHeight;
}

function setSection(section: BeamSection) {
  if (section === activeSection) return;
  activeSection = section;
  sectionListeners.forEach((fn) => fn(section));
}

function prepPath(el: SVGPathElement | null) {
  if (!el) return 0;
  const len = el.getTotalLength();
  el.style.strokeDasharray = `${len}`;
  el.style.strokeDashoffset = `${len}`;
  return len;
}

export function initJusticeBeam(
  svg: SVGSVGElement | null,
  options: { isHomepage: boolean; tier: BeamTier; reducedMotion: boolean }
): () => void {
  if (!svg || options.reducedMotion) return () => {};

  const spine = svg.querySelector("#beam-spine") as SVGPathElement | null;
  const hero = svg.querySelector("#beam-hero") as SVGPathElement | null;
  const about = svg.querySelector("#beam-about") as SVGPathElement | null;
  const trust = svg.querySelector("#beam-trust") as SVGPathElement | null;
  const services = svg.querySelectorAll<SVGPathElement>("[data-beam-branch-path]");
  const process = svg.querySelector("#beam-process") as SVGPathElement | null;
  const caseStudies = svg.querySelector("#beam-case-studies") as SVGPathElement | null;
  const expertise = svg.querySelector("#beam-expertise") as SVGPathElement | null;
  const testimonials = svg.querySelector("#beam-testimonials") as SVGPathElement | null;
  const contact = svg.querySelector("#beam-contact") as SVGPathElement | null;
  const glow = svg.querySelector("#beam-glow-layer") as SVGGElement | null;
  const head = svg.querySelector("#beam-head") as SVGCircleElement | null;

  const lengths = {
    spine: prepPath(spine),
    hero: prepPath(hero),
    about: prepPath(about),
    trust: prepPath(trust),
    process: prepPath(process),
    caseStudies: prepPath(caseStudies),
    expertise: prepPath(expertise),
    testimonials: prepPath(testimonials),
    contact: prepPath(contact),
  };

  services.forEach((p) => prepPath(p));

  const triggers: ScrollTrigger[] = [];
  const isMobile = options.tier === "mobile";
  const isHome = options.isHomepage;

  const sectionMap: Record<string, BeamSection> = {
    hero: "hero",
    about: "about",
    trust: "trust",
    services: "services",
    process: "process",
    "case-studies": "case-studies",
    expertise: "expertise",
    testimonials: "testimonials",
    contact: "contact",
  };

  if (isHome) {
    document.querySelectorAll<HTMLElement>("[data-beam-section]").forEach((el) => {
      const key = el.dataset.beamSection as BeamSection | undefined;
      if (!key || !sectionMap[key]) return;

      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => setSection(key),
          onEnterBack: () => setSection(key),
        })
      );
    });

    const draw = (path: SVGPathElement | null, len: number, progress: number) => {
      if (!path || !len) return;
      gsap.set(path, { strokeDashoffset: len * (1 - progress) });
    };

    const bindDraw = (
      selector: string,
      path: SVGPathElement | null,
      len: number
    ) => {
      const el = document.querySelector(selector);
      if (!el || !path) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          end: "bottom 15%",
          scrub: isMobile ? 0.6 : 0.3,
          onUpdate: (self) => draw(path, len, self.progress),
        })
      );
    };

    bindDraw('[data-beam-section="hero"]', hero, lengths.hero);
    if (!isMobile) {
      bindDraw('[data-beam-section="about"]', about, lengths.about);
      bindDraw('[data-beam-section="trust"]', trust, lengths.trust);
      bindDraw('[data-beam-section="process"]', process, lengths.process);
      bindDraw('[data-beam-section="case-studies"]', caseStudies, lengths.caseStudies);
      bindDraw('[data-beam-section="expertise"]', expertise, lengths.expertise);
      bindDraw('[data-beam-section="testimonials"]', testimonials, lengths.testimonials);
      bindDraw('[data-beam-section="contact"]', contact, lengths.contact);
    }

    services.forEach((path, i) => {
      const len = path.getTotalLength();
      const card = document.querySelector(`[data-beam-card="${i}"]`);
      if (!card) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: '[data-beam-section="services"]',
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.4,
          onUpdate: (self) => {
            const threshold = (i + 1) / services.length;
            const p = Math.min(1, self.progress / threshold);
            gsap.set(path, { strokeDashoffset: len * (1 - p), opacity: 0.35 + p * 0.65 });
          },
        })
      );
    });

    triggers.push(
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: "max",
        scrub: 0.2,
        onUpdate: (self) => {
          spineProgress = self.progress;
          if (spine && lengths.spine) {
            gsap.set(spine, { strokeDashoffset: lengths.spine * (1 - self.progress) });
          }
        },
      })
    );
  } else if (spine && lengths.spine) {
    gsap.set(spine, { strokeDashoffset: 0, opacity: 0.25 });
  }

  let raf = 0;
  let spineProgress = 0;

  const tick = () => {
    if (glow && !isMobile) {
      const ox = (mouseX - 0.5) * 12;
      const oy = (mouseY - 0.5) * 8;
      gsap.set(glow, { x: ox, y: oy });
    }
    if (head && spine && lengths.spine) {
      try {
        const point = spine.getPointAtLength(lengths.spine * spineProgress);
        gsap.set(head, { attr: { cx: point.x, cy: point.y }, opacity: isHome ? 0.85 : 0.35 });
      } catch {
        /* path not ready */
      }
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  ScrollTrigger.refresh();

  return () => {
    cancelAnimationFrame(raf);
    triggers.forEach((t) => t.kill());
  };
}

export function highlightBeamBranch(svg: SVGSVGElement | null, index: number | null) {
  if (!svg) return;
  svg.querySelectorAll<SVGPathElement>("[data-beam-branch-path]").forEach((p, i) => {
    gsap.to(p, {
      opacity: index === null ? 0.5 : index === i ? 1 : 0.2,
      duration: 0.35,
      ease: "power2.out",
    });
  });
}
