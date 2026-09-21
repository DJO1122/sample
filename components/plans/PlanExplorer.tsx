"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BROADBAND_PLANS, SPEED_FILTERS, TIERS, type TierId } from "@/data/plans";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { PlanCard } from "@/components/plans/PlanCard";
import { PlanTable } from "@/components/plans/PlanTable";

/**
 * Tabs + speed chips over the same data set.
 * Desktop gets the comparison table, mobile gets a swipeable card rail.
 */
export function PlanExplorer() {
  const { t } = useI18n();
  const [tier, setTier] = useState<TierId>("wifi");
  const [speed, setSpeed] = useState<number | null>(null);

  const plans = speed
    ? BROADBAND_PLANS.filter((plan) => plan.speedMbps === speed)
    : BROADBAND_PLANS;

  const activeTier = TIERS.find((item) => item.id === tier)!;

  return (
    <div>
      <div
        role="tablist"
        aria-label={t("plansPage.explorerTitle")}
        className="mx-auto flex w-full max-w-xl rounded-full border border-slate-200 bg-white p-1 shadow-card"
      >
        {TIERS.map((item) => {
          const selected = item.id === tier;
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              id={`tab-${item.id}`}
              aria-selected={selected}
              aria-controls="plan-panel"
              onClick={() => setTier(item.id)}
              className={cn(
                "relative flex-1 rounded-full px-3 py-2.5 text-sm font-semibold transition-colors",
                selected ? "text-white" : "text-muted hover:text-navy",
              )}
            >
              {selected && (
                <motion.span
                  layoutId="tier-pill"
                  className="absolute inset-0 rounded-full bg-brand-gradient"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  aria-hidden="true"
                />
              )}
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-center text-sm text-muted">
        {activeTier.description}
      </p>

      <fieldset className="mt-8">
        <legend className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-muted">
          {t("plansPage.filterLabel")}
        </legend>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setSpeed(null)}
            aria-pressed={speed === null}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
              speed === null
                ? "border-royal bg-royal text-white"
                : "border-slate-200 bg-white text-navy hover:border-royal/50",
            )}
          >
            {t("plansPage.filterAll")}
          </button>
          {SPEED_FILTERS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setSpeed(speed === value ? null : value)}
              aria-pressed={speed === value}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                speed === value
                  ? "border-royal bg-royal text-white"
                  : "border-slate-200 bg-white text-navy hover:border-royal/50",
              )}
            >
              {value}
            </button>
          ))}
        </div>
      </fieldset>

      <div
        id="plan-panel"
        role="tabpanel"
        aria-labelledby={`tab-${tier}`}
        className="mt-8"
      >
        {/* Mobile: swipeable cards */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 lg:hidden">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              tier={tier}
              className="w-[78vw] max-w-[300px] shrink-0 snap-center"
            />
          ))}
        </div>

        {/* Desktop: comparison table with a sticky header */}
        <div className="hidden lg:block">
          <PlanTable activeTier={tier} speedFilter={speed} />
        </div>
      </div>
    </div>
  );
}
