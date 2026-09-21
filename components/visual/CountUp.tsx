"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Counts from 0 to `value` when scrolled into view.
 * With reduced motion - and before the animation starts - the final value is
 * what renders, so the number is never hidden from the reader or a crawler.
 */
export function CountUp({
  value,
  duration = 1200,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = usePrefersReducedMotion();
  const shouldAnimate = inView && !reduced;

  // null until the first animation frame runs, so nothing is set synchronously
  // inside the effect body.
  const [animated, setAnimated] = useState<number | null>(null);

  useEffect(() => {
    if (!shouldAnimate) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimated(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shouldAnimate, value, duration]);

  const display = shouldAnimate ? (animated ?? 0) : value;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
