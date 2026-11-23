"use client";

import { MotionConfig } from "framer-motion";

/**
 * Framer Motion animates with inline styles and rAF, so the CSS
 * `prefers-reduced-motion` block cannot reach it. `reducedMotion="user"`
 * makes Motion skip transform and layout animations for those visitors while
 * keeping opacity fades, so every reveal still ends in its final state.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
