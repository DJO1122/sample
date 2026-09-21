"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

const STREAKS = [
  { d: "M-40 120 C 220 40, 420 220, 760 90 S 1180 10, 1480 140", delay: 0 },
  { d: "M-40 260 C 260 180, 500 360, 820 230 S 1220 150, 1480 300", delay: 1.1 },
  { d: "M-40 400 C 200 330, 480 500, 800 370 S 1200 300, 1480 430", delay: 2.2 },
  { d: "M-40 520 C 280 470, 520 620, 880 500 S 1240 440, 1480 560", delay: 3 },
];

/**
 * Decorative fiber-optic light streaks: static violet paths with a travelling
 * cyan pulse. Pure SVG stroke animation on transform/opacity-friendly
 * properties, hidden from assistive tech, and frozen when reduced motion is on.
 */
export function FiberBackground({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 1440 640"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="fiberLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C026D3" stopOpacity="0" />
            <stop offset="50%" stopColor="#C026D3" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="fiberPulse" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="1" />
            <stop offset="100%" stopColor="#E9D5FF" stopOpacity="0" />
          </linearGradient>
          <filter id="fiberGlow" x="-20%" y="-60%" width="140%" height="220%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {STREAKS.map((streak) => (
          <g key={streak.d}>
            <path
              d={streak.d}
              fill="none"
              stroke="url(#fiberLine)"
              strokeWidth={1.5}
            />
            {!reduced && (
              <motion.path
                d={streak.d}
                fill="none"
                stroke="url(#fiberPulse)"
                strokeWidth={3}
                strokeLinecap="round"
                filter="url(#fiberGlow)"
                pathLength={1}
                strokeDasharray="0.12 0.88"
                initial={{ strokeDashoffset: 1 }}
                animate={{ strokeDashoffset: -1 }}
                transition={{
                  duration: 7,
                  delay: streak.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
