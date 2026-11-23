"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import type { MouseEvent } from "react";
import { formatINR, type ComboPack } from "@/data/plans";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { CTAButton } from "@/components/CTAButton";
import { cn } from "@/lib/utils";

/**
 * Triple Play pack card with a subtle 3D tilt on pointer move.
 * Tilt is transform-only and disabled for reduced motion and touch input.
 */
export function ComboCard({
  pack,
  compact = false,
}: {
  pack: ComboPack;
  compact?: boolean;
}) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), {
    stiffness: 180,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), {
    stiffness: 180,
    damping: 18,
  });

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        reduced
          ? undefined
          : { rotateX, rotateY, transformPerspective: 900 }
      }
      className="gpu group relative h-full"
    >
      <article
        className={cn(
          "card relative flex h-full flex-col overflow-hidden p-6 transition-shadow duration-300",
          "hover:shadow-[0_24px_60px_-28px_var(--pack-color)]",
        )}
        style={{ ["--pack-color" as string]: pack.colorVar }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1.5"
          style={{ background: pack.colorVar }}
        />

        {pack.badge && (
          <span
            className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold text-white"
            style={{ background: pack.colorVar }}
          >
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            {pack.badge}
          </span>
        )}

        <div
          className="grid h-24 w-24 place-items-center rounded-full text-white shadow-lg"
          style={{
            background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,.35), ${pack.colorVar} 62%)`,
          }}
        >
          <div className="text-center leading-none">
            <div className="font-display text-xl font-bold">
              {pack.speedMbps}
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-widest">
              {t("common.mbps")}
            </div>
          </div>
        </div>

        <h3 className="mt-5 font-display text-xl font-bold text-navy">
          {pack.name}
        </h3>

        <p className="mt-1 font-display text-3xl font-bold" style={{ color: pack.colorVar }}>
          {formatINR(pack.price)}
          <span className="ml-1 text-sm font-medium text-muted">
            {t("combo.perMonth")} {t("common.plusGst")}
          </span>
        </p>

        {!compact && (
          <>
            <h4 className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted">
              {t("combo.includes")}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {pack.inclusions.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: pack.colorVar }}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <CTAButton
          href={`/contact?plan=${pack.id}`}
          size="sm"
          className="mt-6 w-full"
          variant={pack.badge ? "primary" : "secondary"}
        >
          {t("combo.cta")}
          <span className="sr-only"> - {pack.name}</span>
        </CTAButton>
      </article>
    </motion.div>
  );
}
