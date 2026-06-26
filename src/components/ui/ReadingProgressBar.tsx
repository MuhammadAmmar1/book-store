"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin (3px) reading progress bar fixed to the top of the viewport.
 * Uses Framer Motion spring for a smooth, natural feel.
 */
export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="reading-progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
