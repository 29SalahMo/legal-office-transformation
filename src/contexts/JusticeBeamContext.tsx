import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import { useGlobalMotion } from "@/contexts/GlobalMotionContext";
import { subscribeBeamSection, updateBeamMouse } from "@/lib/justiceBeam/engine";
import type { BeamSection, BeamTier } from "@/lib/justiceBeam/types";

interface JusticeBeamContextValue {
  activeSection: BeamSection;
  hoveredBranch: number | null;
  setHoveredBranch: (branch: number | null) => void;
  reducedMotion: boolean;
  tier: BeamTier;
  isHomepage: boolean;
}

const JusticeBeamContext = createContext<JusticeBeamContextValue>({
  activeSection: "hero",
  hoveredBranch: null,
  setHoveredBranch: () => {},
  reducedMotion: false,
  tier: "desktop",
  isHomepage: false,
});

const getTier = (width: number): BeamTier => {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};

export const JusticeBeamProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const { reducedMotion } = useGlobalMotion();
  const [activeSection, setActiveSection] = useState<BeamSection>("hero");
  const [hoveredBranch, setHoveredBranch] = useState<number | null>(null);
  const [tier, setTier] = useState<BeamTier>("desktop");

  const isHomepage = pathname === "/";

  useEffect(() => {
    const update = () => setTier(getTier(window.innerWidth));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => subscribeBeamSection(setActiveSection), []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => updateBeamMouse(e.clientX, e.clientY);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const setBranch = useCallback((branch: number | null) => {
    setHoveredBranch(branch);
  }, []);

  return (
    <JusticeBeamContext.Provider
      value={{
        activeSection,
        hoveredBranch,
        setHoveredBranch: setBranch,
        reducedMotion,
        tier,
        isHomepage,
      }}
    >
      {children}
    </JusticeBeamContext.Provider>
  );
};

export const useJusticeBeam = () => useContext(JusticeBeamContext);
