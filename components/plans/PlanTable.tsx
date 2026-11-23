"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import {
  BROADBAND_PLANS,
  formatINR,
  isIncluded,
  MAX_SPEED_MBPS,
  TIERS,
  type BroadbandPlan,
  type TierId,
} from "@/data/plans";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function PriceCell({
  plan,
  tier,
  highlight,
}: {
  plan: BroadbandPlan;
  tier: TierId;
  highlight: boolean;
}) {
  const { t } = useI18n();
  const price = plan.prices[tier];

  return (
    <td
      className={cn(
        "px-4 py-4 text-center align-middle",
        highlight && "bg-royal/5",
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${plan.id}-${tier}-${String(price)}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
        >
          {isIncluded(price) ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              {t("plansPage.included")}
            </span>
          ) : (
            <span className="font-display text-lg font-bold text-navy">
              {formatINR(price as number)}
            </span>
          )}
        </motion.div>
      </AnimatePresence>
    </td>
  );
}

/**
 * Desktop comparison table. A real <table> with scope'd headers and a caption,
 * so screen readers and search engines can read the pricing grid.
 */
export function PlanTable({
  activeTier,
  speedFilter,
}: {
  activeTier: TierId;
  speedFilter: number | null;
}) {
  const { t } = useI18n();
  const plans = speedFilter
    ? BROADBAND_PLANS.filter((plan) => plan.speedMbps === speedFilter)
    : BROADBAND_PLANS;

  return (
    <div className="card overflow-hidden">
      <div className="max-h-[70vh] overflow-auto">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">
            Aerotel broadband plans. Monthly prices in Indian rupees, excluding
            18% GST.
          </caption>
          <thead className="sticky top-0 z-10 bg-navy text-white">
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-semibold">
                {t("plansPage.speed")}
              </th>
              {TIERS.map((tier) => (
                <th
                  key={tier.id}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-center font-semibold",
                    tier.id === activeTier && "text-cyan",
                  )}
                >
                  {tier.label}
                </th>
              ))}
              <th scope="col" className="px-4 py-3 text-center font-semibold">
                <span className="sr-only">Book</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => {
              const share = Math.round(
                (plan.speedMbps / MAX_SPEED_MBPS) * 100,
              );
              return (
                <tr
                  key={plan.id}
                  className={cn(
                    "border-t border-slate-100",
                    plan.popular && "bg-royal/[0.03]",
                  )}
                >
                  <th scope="row" className="px-4 py-4 text-left">
                    <span className="font-display text-base font-bold text-navy">
                      {plan.speedMbps} {t("common.mbps")}
                    </span>
                    <span className="mt-2 block h-1.5 w-32 overflow-hidden rounded-full bg-slate-100">
                      <motion.span
                        className="block h-full rounded-full bg-cyan-gradient"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: share / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformOrigin: "left" }}
                      />
                    </span>
                  </th>
                  {TIERS.map((tier) => (
                    <PriceCell
                      key={tier.id}
                      plan={plan}
                      tier={tier.id}
                      highlight={tier.id === activeTier}
                    />
                  ))}
                  <td className="px-4 py-4 text-center">
                    <Link
                      href={`/contact?plan=${plan.id}-${
                        isIncluded(plan.prices[activeTier]) ? "wifi" : activeTier
                      }`}
                      className="inline-flex rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-royal hover:text-royal"
                    >
                      {t("plansPage.book")}
                      <span className="sr-only">
                        {" "}
                        {plan.speedMbps} Mbps plan
                      </span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="border-t border-slate-100 px-4 py-3 text-xs text-muted">
        All prices are per month and exclude {""}
        <strong className="font-semibold text-navy">18% GST</strong>.
      </p>
    </div>
  );
}
