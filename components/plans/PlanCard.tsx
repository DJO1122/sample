"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import {
  formatINR,
  isIncluded,
  MAX_SPEED_MBPS,
  type BroadbandPlan,
  type TierId,
} from "@/data/plans";
import { useI18n } from "@/lib/i18n";
import { CTAButton } from "@/components/CTAButton";
import { cn } from "@/lib/utils";

/**
 * One broadband plan at one tier. Used for the mobile card list on /plans.
 * The price crossfades when the tier changes, keyed on the tier id.
 */
export function PlanCard({
  plan,
  tier,
  className,
}: {
  plan: BroadbandPlan;
  tier: TierId;
  className?: string;
}) {
  const { t } = useI18n();
  const price = plan.prices[tier];
  const included = isIncluded(price);
  const share = Math.round((plan.speedMbps / MAX_SPEED_MBPS) * 100);
  // A tier that is included free has no standalone price, so the booking link
  // points at the plan's WiFi option - the one the customer actually pays for.
  const planParam = included ? `${plan.id}-wifi` : `${plan.id}-${tier}`;

  return (
    <article
      className={cn(
        "card relative overflow-hidden p-5",
        plan.popular && "border-royal/40 ring-1 ring-royal/20",
        className,
      )}
    >
      {plan.popular && (
        <span className="absolute right-4 top-4 rounded-full bg-royal/10 px-2.5 py-1 text-[11px] font-semibold text-royal">
          Most chosen
        </span>
      )}

      <div className="flex items-center gap-2 text-navy">
        <Zap className="h-4 w-4 text-royal" aria-hidden="true" />
        <span className="font-display text-2xl font-bold">
          {plan.speedMbps}
        </span>
        <span className="text-sm font-semibold text-muted">
          {t("common.mbps")}
        </span>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="h-full rounded-full bg-cyan-gradient"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: share / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
          aria-hidden="true"
        />
      </div>

      <div className="mt-4 min-h-[56px]">
        {included ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
            <Check className="h-4 w-4" aria-hidden="true" />
            {t("plansPage.included")}
          </span>
        ) : (
          <p className="font-display text-3xl font-bold text-navy">
            {formatINR(price as number)}
            <span className="ml-1 text-sm font-medium text-muted">
              {t("common.perMonth")} {t("common.plusGst")}
            </span>
          </p>
        )}
      </div>

      <CTAButton
        href={`/contact?plan=${planParam}`}
        size="sm"
        variant={plan.popular ? "primary" : "secondary"}
        className="mt-4 w-full"
      >
        {t("plansPage.book")}
      </CTAButton>
    </article>
  );
}
