"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  /** Lucide icon component */
  Icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel?: string;
  onCta?: () => void;
  ctaHref?: string;
  /** Optional secondary action */
  secondaryLabel?: string;
  onSecondary?: () => void;
}

/**
 * Reusable empty state component used across Cart, Wishlist, Search, Filters, etc.
 * Renders a floating icon, heading, description, and primary CTA.
 */
export function EmptyState({
  Icon,
  title,
  description,
  ctaLabel,
  onCta,
  ctaHref,
  secondaryLabel,
  onSecondary,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center text-center py-24 px-6"
    >
      {/* Animated icon bubble */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-8 shadow-inner"
      >
        <Icon className="w-10 h-10 text-muted-foreground" strokeWidth={1.5} />
      </motion.div>

      <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3 text-foreground">
        {title}
      </h2>
      <p className="text-foreground/60 text-base md:text-lg max-w-md mb-8 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        {ctaLabel && (ctaHref ? (
          <a href={ctaHref}>
            <Button size="lg">{ctaLabel}</Button>
          </a>
        ) : (
          <Button size="lg" onClick={onCta}>{ctaLabel}</Button>
        ))}

        {secondaryLabel && (
          <Button variant="outline" size="lg" onClick={onSecondary}>
            {secondaryLabel}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
