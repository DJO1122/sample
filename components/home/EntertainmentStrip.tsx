"use client";

import { IPTV_CHANNELS, LIVE_CHANNEL_COUNT, OTT_APPS } from "@/data/plans";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { Reveal } from "@/components/visual/Reveal";
import { cn } from "@/lib/utils";

/**
 * Names only, not logos.
 *
 * The OTT app and TV channel logos are third-party trademarks. Aerotel needs
 * written permission from each partner before their marks can be displayed, so
 * this strip ships as styled text chips. Swap in logo images only after those
 * permissions are on file.
 */
const CHIPS = [
  ...OTT_APPS,
  ...IPTV_CHANNELS,
  `${LIVE_CHANNEL_COUNT}+ live channels`,
  "SD + HD",
];

export function EntertainmentStrip() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();

  return (
    <section className="overflow-hidden bg-royal py-14" aria-labelledby="entertainment">
      <div className="container-page">
        <Reveal className="text-center">
          <h2 id="entertainment" className="font-display text-2xl font-bold text-white sm:text-3xl">
            {t("entertainment.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/70">
            {t("entertainment.subtitle")}
          </p>
        </Reveal>
      </div>

      <div
        className="relative mt-8 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
        role="list"
        aria-label={t("entertainment.title")}
      >
        <div
          className={cn(
            "flex w-max gap-3 px-4",
            !reduced && "motion-safe:animate-marquee",
            reduced && "flex-wrap justify-center",
          )}
        >
          {(reduced ? CHIPS : [...CHIPS, ...CHIPS]).map((chip, index) => (
            <span
              key={`${chip}-${index}`}
              role="listitem"
              className="whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
