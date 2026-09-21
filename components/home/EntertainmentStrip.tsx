"use client";

import { LIVE_CHANNEL_COUNT, SERVICES, type Service } from "@/data/plans";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { Reveal } from "@/components/visual/Reveal";
import { ServiceIcon } from "@/components/visual/ServiceIcon";
import { cn } from "@/lib/utils";

/**
 * Services shown as logo chips (see ServiceIcon). The logos that ship are plain
 * name wordmarks in each brand's colour - placeholders for the partners'
 * official artwork, which drops in at the same /public/logos paths once Aerotel
 * has the brand assets. SERVICES in data/plans.ts is the single source.
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
    <div className="relative [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
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
          <ServiceIcon
            key={`${service.name}-${index}`}
            service={service}
            className="shrink-0"
          />
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
          <p className="container-page mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            OTT apps
          </p>
          <Marquee items={OTT} />
        </div>
        <div>
          <p className="container-page mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">
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
