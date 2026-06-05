"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Fixed page-scroll progress bar pinned to the very top of the viewport.
 * Brand ember gradient, sits above everything else.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[110] h-[3px] origin-left bg-gradient-to-r from-ember-400 via-ember-500 to-ember-700"
    />
  );
}
