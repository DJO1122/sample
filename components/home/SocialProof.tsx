"use client";

import { Quote, Star } from "lucide-react";
import { LIVE_CHANNEL_COUNT, MAX_SPEED_MBPS } from "@/data/plans";
import { useI18n } from "@/lib/i18n";
import { CountUp } from "@/components/visual/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/visual/Reveal";

/**
 * Placeholder testimonials.
 *
 * Replace the three entries below with real, attributable customer quotes
 * before launch. Do not publish invented reviews.
 */
const TESTIMONIALS = [
  {
    name: "Customer name",
    area: "Poyampalayam",
    quote:
      "Placeholder review. Replace with a real quote collected from a customer.",
  },
  {
    name: "Customer name",
    area: "Tirupur",
    quote:
      "Placeholder review. Replace with a real quote collected from a customer.",
  },
  {
    name: "Customer name",
    area: "Avinashi Road",
    quote:
      "Placeholder review. Replace with a real quote collected from a customer.",
  },
];

export function SocialProof() {
  const { t } = useI18n();

  return (
    <section className="section bg-white" aria-labelledby="testimonials">
      <div className="container-page">
        <Reveal className="text-center">
          <h2 id="testimonials" className="font-display text-3xl font-bold text-navy sm:text-4xl">
            {t("testimonials.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            {t("testimonials.subtitle")}
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <RevealItem key={index}>
              <figure className="card h-full p-6">
                <Quote className="h-7 w-7 text-royal/30" aria-hidden="true" />
                <blockquote className="mt-3 text-sm leading-relaxed text-slate-700">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span>
                    <span className="block text-sm font-semibold text-navy">
                      {item.name}
                    </span>
                    <span className="text-xs text-muted">{item.area}</span>
                  </span>
                  <span className="flex gap-0.5" role="img" aria-label="Rated 5 out of 5">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star
                        key={star}
                        className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-14 grid gap-5 rounded-2xl bg-brand-gradient p-8 text-center text-white sm:grid-cols-3">
          <RevealItem>
            <div className="font-display text-4xl font-bold">
              <CountUp value={LIVE_CHANNEL_COUNT} suffix="+" />
            </div>
            <p className="mt-1 text-sm text-white/75">{t("stats.channels")}</p>
          </RevealItem>
          <RevealItem>
            <div className="font-display text-4xl font-bold">
              <CountUp value={MAX_SPEED_MBPS} />
            </div>
            <p className="mt-1 text-sm text-white/75">{t("stats.maxSpeed")}</p>
          </RevealItem>
          <RevealItem>
            <div className="font-display text-4xl font-bold">
              {t("stats.supportValue")}
            </div>
            <p className="mt-1 text-sm text-white/75">{t("stats.support")}</p>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
