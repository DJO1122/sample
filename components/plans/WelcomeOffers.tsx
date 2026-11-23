"use client";

import { Gift, Tv } from "lucide-react";
import { formatINR, WELCOME_OFFERS } from "@/data/plans";
import { useI18n } from "@/lib/i18n";
import { CTAButton } from "@/components/CTAButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/visual/Reveal";

/** The 90-day introductory offers, styled as the flyer's highlight band. */
export function WelcomeOffers() {
  const { t } = useI18n();

  return (
    <section className="section bg-navy" aria-labelledby="welcome-offers">
      <div className="container-page">
        <Reveal className="text-center">
          <span className="eyebrow border-cyan/30 bg-cyan/10 text-cyan">
            <Gift className="h-3.5 w-3.5" aria-hidden="true" />
            {t("welcome.ribbon")}
          </span>
          <h2
            id="welcome-offers"
            className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl"
          >
            {t("welcome.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            {t("welcome.subtitle")}
          </p>
        </Reveal>

        <RevealGroup className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          {WELCOME_OFFERS.map((offer) => (
            <RevealItem key={offer.id}>
              <article className="relative h-full overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-6 text-white shadow-glow backdrop-blur-sm">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent motion-safe:animate-shimmer"
                />
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold">
                    {offer.speedMbps}
                  </span>
                  <span className="text-sm font-semibold text-cyan">
                    {t("common.mbps")}
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/70">{t("welcome.days")}</p>

                <p className="mt-5 font-display text-3xl font-bold text-cyan">
                  {formatINR(offer.price)}
                  <span className="ml-1 text-sm font-medium text-white/60">
                    {t("common.plusGst")}
                  </span>
                </p>

                <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold">
                  <Tv className="h-4 w-4 text-cyan" aria-hidden="true" />
                  {offer.perk}
                </p>

                <CTAButton
                  href={`/contact?plan=${offer.id}`}
                  variant="light"
                  size="sm"
                  className="mt-6 w-full"
                >
                  {t("welcome.cta")}
                </CTAButton>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-8 text-center text-xs text-white/55">
          18% GST applicable on all plan values. Plans available in selected cities.
        </p>
      </div>
    </section>
  );
}
