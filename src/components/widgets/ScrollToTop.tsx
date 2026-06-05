"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * Bottom-right scroll-to-top button wrapped in a circular scroll-progress ring
 * (the ring fills as you scroll the page). Appears after the first viewport.
 */
export function ScrollToTop() {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Scroll back to top"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-5 right-5 z-[90] grid h-14 w-14 place-items-center sm:bottom-7 sm:right-7"
        >
          {/* progress ring */}
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 56 56">
            <circle
              cx="28"
              cy="28"
              r="25"
              fill="rgb(12 20 27)"
              className="drop-shadow-[0_10px_30px_rgba(12,20,27,0.45)]"
            />
            <circle
              cx="28"
              cy="28"
              r="25"
              fill="none"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="3"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="25"
              fill="none"
              stroke="#0E8388"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>
          {/* arrow */}
          <span className="relative grid h-9 w-9 place-items-center rounded-full text-white transition-transform duration-300 group-hover:-translate-y-0.5">
            <ArrowUp className="h-5 w-5 transition-colors group-hover:text-ember-400" strokeWidth={2.5} />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
