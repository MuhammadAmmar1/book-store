"use client";

import * as React from "react";
import { useInView } from "framer-motion";

interface UseScrollRevealOptions {
  /** Fraction of the element that must be visible. Default: 0.15 */
  threshold?: number;
  /** Only trigger once. Default: true */
  once?: boolean;
  /** Delay in ms before triggering. Default: 0 */
  delay?: number;
}

/**
 * Lightweight scroll-reveal hook backed by Framer Motion's useInView.
 * Returns a ref to attach to the target element and a boolean indicating visibility.
 *
 * @example
 * const { ref, inView } = useScrollReveal();
 * <motion.div ref={ref} animate={inView ? 'visible' : 'hidden'} variants={fadeUp} />
 */
export function useScrollReveal<T extends Element = HTMLDivElement>({
  threshold = 0.15,
  once = true,
}: UseScrollRevealOptions = {}) {
  const ref = React.useRef<T>(null);
  const inView = useInView(ref, { once, amount: threshold });

  return { ref, inView };
}
