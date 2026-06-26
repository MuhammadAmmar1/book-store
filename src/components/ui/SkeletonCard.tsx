"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

/**
 * Skeleton book card — used as a loading placeholder in the shop grid.
 * Renders shimmer via the global `.skeleton` CSS class.
 */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn("rounded-2xl overflow-hidden bg-card border border-border/50", className)}
      aria-hidden="true"
    >
      {/* Cover image area */}
      <div className="skeleton aspect-[3/4] w-full" />
      {/* Content area */}
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
        <div className="flex items-center justify-between mt-4">
          <div className="skeleton h-5 w-16" />
          <div className="skeleton h-9 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * Grid of skeleton cards for initial page load.
 */
export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
