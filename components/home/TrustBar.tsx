"use client";

import { Gauge, Radio, Smartphone, Headphones } from "lucide-react";
import { LIVE_CHANNEL_COUNT, MAX_SPEED_MBPS, OTT_APPS } from "@/data/plans";
import { useI18n } from "@/lib/i18n";
import { CountUp } from "@/components/visual/CountUp";
import { RevealGroup, RevealItem } from "@/components/visual/Reveal";

/** Compact proof-point band right under the hero. */
export function TrustBar() {
  const { t } = useI18n();

  const stats = [
    {
      icon: Gauge,
      value: <CountUp value={MAX_SPEED_MBPS} suffix=" Mbps" />,
      label: t("stats.trustBarStat1"),
    },
    {
      icon: Radio,
      value: <CountUp value={LIVE_CHANNEL_COUNT} suffix="+" />,
      label: t("stats.trustBarStat2"),
    },
    {
      icon: Smartphone,
      value: <CountUp value={OTT_APPS.length} suffix="+" />,
      label: t("stats.trustBarStat3"),
    },
    {
      icon: Headphones,
      value: t("stats.supportValue"),
      label: t("stats.trustBarStat4"),
    },
  ];

  return (
    <section aria-label="Highlights" className="container-page -mt-8 sm:-mt-10">
      <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-card lg:grid-cols-4">
        {stats.map((stat) => (
          <RevealItem key={stat.label}>
            <div className="flex h-full items-center gap-3 bg-white px-5 py-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white">
                <stat.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-xl font-bold text-navy sm:text-2xl">
                  {stat.value}
                </span>
                <span className="block text-xs font-medium text-muted">
                  {stat.label}
                </span>
              </span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
