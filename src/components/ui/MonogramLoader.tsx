import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Shutter Monogram Reveal Loader.
 * Displays on initial site load to hide layout shifts and build visual prestige.
 * Splits into left and right panels with smooth spring transitions on exit.
 */
const MonogramLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lock scrolling on load to prevent content shifts
    document.documentElement.classList.add("overflow-hidden");

    const timer = setTimeout(() => {
      setLoading(false);
      document.documentElement.classList.remove("overflow-hidden");
    }, 1800);

    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal"
        >
          {/* Left Curtain Split Panel */}
          <motion.div 
            initial={{ x: 0 }}
            exit={{ x: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
            className="absolute inset-y-0 left-0 w-1/2 bg-charcoal border-r border-luxury-gold/5 pointer-events-none"
          />
          {/* Right Curtain Split Panel */}
          <motion.div 
            initial={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
            className="absolute inset-y-0 right-0 w-1/2 bg-charcoal border-l border-luxury-gold/5 pointer-events-none"
          />

          {/* Central Monogram Content Container */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
            }}
            exit={{ 
              scale: 1.05, 
              opacity: 0, 
              transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="relative z-[102] flex flex-col items-center gap-5 pointer-events-none"
          >
            {/* Styled Gold Branding Symbol */}
            <svg 
              width="80" 
              height="80" 
              viewBox="0 0 30.2 46" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-luxury-gold animate-pulse"
              style={{ animationDuration: "3s" }}
            >
              <path 
                d="M17.7707 15.2438H12.3611V21.0982H17.7707V15.2438Z" 
                fill="url(#gold-grad-loader)"
              />
              <path 
                d="M0 0V46H30.2093V0H0ZM24.7149 40.4019H5.49436V39.2113C5.49436 38.5876 5.99054 38.0798 6.60533 38.0798H23.6064C24.2187 38.0798 24.7173 38.5876 24.7173 39.2113V40.4019H24.7149ZM12.3611 23.4203V32.4965H12.8307V33.0758H9.61634V32.4965H10.0859V12.9242H20.0508V32.4965H20.5179V33.0758H17.3036V32.4965H17.7732V23.4203H12.3635H12.3611ZM8.88053 11.7631C8.26816 11.7631 7.77197 11.2553 7.77197 10.6317V9.44108H22.4325V10.6317C22.4325 11.2553 21.9363 11.7631 21.3239 11.7631H8.87811H8.88053ZM8.88053 34.2369H21.3263C21.9387 34.2369 22.4349 34.7422 22.4349 35.3683V36.5589H7.77439V35.3683C7.77439 34.7422 8.27058 34.2369 8.88295 34.2369H8.88053ZM24.7149 6.78624C24.7149 7.40989 24.2163 7.91769 23.604 7.91769H6.60533C5.99054 7.91769 5.49436 7.40989 5.49436 6.78624V5.59563H24.7149V6.78624Z" 
                fill="url(#gold-grad-loader)"
              />
              <defs>
                <linearGradient id="gold-grad-loader" x1="0" y1="0" x2="30.2" y2="46" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#AA7C11" />
                  <stop offset="50%" stopColor="#E5C483" />
                  <stop offset="100%" stopColor="#906F33" />
                </linearGradient>
              </defs>
            </svg>

            {/* Logo Text */}
            <div className="flex flex-col items-center">
              <span className="font-serif text-2xl text-gradient-gold tracking-widest uppercase font-semibold">
                Abdallah
              </span>
              <span className="text-[9px] text-white/40 tracking-[0.4em] uppercase font-light mt-1">
                Legal Advisors
              </span>
            </div>

            {/* Sweep Loading Line */}
            <div className="w-28 h-[1.5px] bg-white/5 relative overflow-hidden rounded-full mt-2">
              <motion.div 
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-luxury-gold to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MonogramLoader;
