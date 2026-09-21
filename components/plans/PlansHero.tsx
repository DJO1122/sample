"use client";

import { useI18n } from "@/lib/i18n";
import { FiberBackground } from "@/components/visual/FiberBackground";
import { WaveDivider } from "@/components/visual/WaveDivider";

export function PlansHero() {
  const { t } = useI18n();

  return (
    <div className="relative overflow-hidden bg-navy">
      <FiberBackground className="absolute inset-0 opacity-60" />
      <div className="container-page relative py-16 text-center sm:py-20">
        <span className="eyebrow border-cyan/30 bg-cyan/10 text-cyan">
          {t("nav.plans")}
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
          {t("plansPage.title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/75">
          {t("plansPage.subtitle")}
        </p>
      </div>
      <WaveDivider />
    </div>
  );
}
