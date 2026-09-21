"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MAX_SPEED_MBPS } from "@/data/plans";
import { usePrefersReducedMotion } from "@/lib/motion";
import { CountUp } from "@/components/visual/CountUp";

const START_ANGLE = -120;
const END_ANGLE = 120;
const RADIUS = 78;
const CENTER = 100;

function polar(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function arcPath(from: number, to: number, radius: number) {
  const start = polar(from, radius);
  const end = polar(to, radius);
  const largeArc = to - from > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

const TICKS = [0, 100, 200, 300, 400, 500];

/**
 * Gauge that sweeps 0 → max plan speed once, on view.
 * The reading is exposed to assistive tech via role="img" + aria-label, and
 * the needle sits at the final angle when reduced motion is requested.
 */
export function SpeedMeter({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = usePrefersReducedMotion();

  const sweep = END_ANGLE - START_ANGLE;

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[320px]"
      role="img"
      aria-label={`${label} ${MAX_SPEED_MBPS} Mbps`}
    >
      <svg viewBox="0 0 200 150" className="w-full">
        <defs>
          <linearGradient id="meterArc" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#4338CA" />
            <stop offset="60%" stopColor="#C026D3" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>

        <path
          d={arcPath(START_ANGLE, END_ANGLE, RADIUS)}
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth={12}
          strokeLinecap="round"
        />

        <motion.path
          d={arcPath(START_ANGLE, END_ANGLE, RADIUS)}
          fill="none"
          stroke="url(#meterArc)"
          strokeWidth={12}
          strokeLinecap="round"
          pathLength={1}
          initial={{ pathLength: reduced ? 1 : 0 }}
          animate={inView || reduced ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: reduced ? 0 : 1.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {TICKS.map((tick) => {
          const angle = START_ANGLE + (tick / MAX_SPEED_MBPS) * sweep;
          const outer = polar(angle, RADIUS - 12);
          const inner = polar(angle, RADIUS - 20);
          const text = polar(angle, RADIUS - 32);
          return (
            <g key={tick}>
              <line
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke="rgba(255,255,255,0.45)"
                strokeWidth={2}
              />
              <text
                x={text.x}
                y={text.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white/60"
                style={{ fontSize: 9 }}
              >
                {tick}
              </text>
            </g>
          );
        })}

        <motion.g
          style={{ originX: `${CENTER}px`, originY: `${CENTER}px` }}
          initial={{ rotate: reduced ? END_ANGLE : START_ANGLE }}
          animate={
            inView || reduced ? { rotate: END_ANGLE } : { rotate: START_ANGLE }
          }
          transition={{
            duration: reduced ? 0 : 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <line
            x1={CENTER}
            y1={CENTER}
            x2={CENTER}
            y2={CENTER - RADIUS + 18}
            stroke="#22D3EE"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </motion.g>

        <circle cx={CENTER} cy={CENTER} r={7} fill="#1E1B4B" stroke="#22D3EE" strokeWidth={2} />
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-1 text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-white/60">
          {label}
        </div>
        <div className="font-display text-3xl font-bold text-white">
          <CountUp value={MAX_SPEED_MBPS} duration={1800} />
          <span className="ml-1 text-base font-semibold text-cyan">Mbps</span>
        </div>
      </div>
    </div>
  );
}
