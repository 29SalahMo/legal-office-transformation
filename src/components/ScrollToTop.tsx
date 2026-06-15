import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "@/lib/globalSmoothScroll";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop(true);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
