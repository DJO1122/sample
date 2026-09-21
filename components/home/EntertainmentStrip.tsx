"use client";

import { LIVE_CHANNEL_COUNT, SERVICES, type Service } from "@/data/plans";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { Reveal } from "@/components/visual/Reveal";
import { ServiceIcon } from "@/components/visual/ServiceIcon";
import { cn } from "@/lib/utils";

/**
 * Services shown as monogram app-icon tiles rather than plain text pills.
 *
 * The tiles are stylized brand-accent monograms, not the partners' real logos
 * (those are trademarks needing written permission). See ServiceIcon and the
 * SERVICES source in data/plans.ts for the swap-to-logo path.
 */
const OTT = SERVICES.filter((service) => service.kind === "ott");
const CHANNELS = SERVICES.filter((service) => service.kind === "channel");

function Marquee({
  items,
  reversed = false,
}: {
  items: Service[];
  reversed?: boolean;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className="relative [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]"
      role="list"
    >
      <div
        className={cn(
          "flex w-max gap-3 px-4",
          !reduced && "motion-safe:animate-marquee",
          reduced && "flex-wrap justify-center",
        )}
        style={
          !reduced && reversed
            ? { animationDirection: "reverse" }
            : undefined
        }
      >
        {(reduced ? items : [...items, ...items]).map((service, index) => (
          <span
            key={`${service.name}-${index}`}
            role="listitem"
            className="rounded-full border border-white/15 bg-white/10 py-2 pl-2 pr-4 backdrop-blur-sm"
          >
            <ServiceIcon service={service} labelClassName="text-white" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function EntertainmentStrip() {
  const { t } = useI18n();

  return (
    <section className="overflow-hidden bg-royal py-14" aria-labelledby="entertainment">
      <div className="container-page">
        <Reveal className="text-center">
          <h2
            id="entertainment"
            className="font-display text-2xl font-bold text-white sm:text-3xl"
          >
            {t("entertainment.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/70">
            {t("entertainment.subtitle")}
          </p>
        </Reveal>
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <p className="container-page mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
            OTT apps
          </p>
          <Marquee items={OTT} />
        </div>
        <div>
          <p className="container-page mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
            {LIVE_CHANNEL_COUNT}+ live channels include
          </p>
          <Marquee items={CHANNELS} reversed />
        </div>
      </div>

      <p className="container-page mt-8 text-center text-xs text-white/70">
        App and channel names are shown for the content available on Aerotel
        plans and belong to their respective owners.
      </p>
    </section>
  );
}
