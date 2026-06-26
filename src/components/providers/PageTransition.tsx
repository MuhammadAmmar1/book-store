"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Wraps page content with a subtle fade+slide transition.
 * Keyed by pathname so each route change triggers the animation.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
