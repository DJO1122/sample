"use client";

import { LIVE_CHANNEL_COUNT, SERVICES } from "@/data/plans";
import { useI18n } from "@/lib/i18n";
import { ServiceIcon } from "@/components/visual/ServiceIcon";
import { Reveal, RevealGroup, RevealItem } from "@/components/visual/Reveal";

const OTT = SERVICES.filter((service) => service.kind === "ott");
const CHANNELS = SERVICES.filter((service) => service.kind === "channel");

/**
 * Static grid of the OTT app and live-channel logo chips, for the plans page
 * (under the pricing). Uses the same ServiceIcon chips as the home strip; the
 * logo files are brand-colour name wordmarks that swap for official artwork at
 * the /public/logos paths. SERVICES in data/plans.ts is the single source.
 */
export function ServicesShowcase() {
  const { t } = useI18n();

  return (
    <section className="section" aria-labelledby="services-showcase">
      <div className="container-page">
        <Reveal className="text-center">
          <span className="eyebrow">{t("entertainment.title")}</span>
          <h2
            id="services-showcase"
            className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl"
          >
            {t("services.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            {t("services.subtitle")}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal className="card p-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-royal">
              {t("services.ottHeading")}
            </h3>
            <RevealGroup className="mt-4 flex flex-wrap gap-3">
              {OTT.map((service) => (
                <RevealItem key={service.name}>
                  <ServiceIcon service={service} />
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>

          <Reveal delay={0.08} className="card p-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-royal">
              {t("services.channelsHeading")}
            </h3>
            <RevealGroup className="mt-4 flex flex-wrap gap-3">
              {CHANNELS.map((service) => (
                <RevealItem key={service.name}>
                  <ServiceIcon service={service} />
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          {LIVE_CHANNEL_COUNT}+ live channels in SD and HD. App and channel names
          belong to their respective owners.
        </p>
      </div>
    </section>
  );
}
