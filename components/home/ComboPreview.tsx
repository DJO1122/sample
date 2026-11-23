"use client";

import { COMBO_PACKS } from "@/data/plans";
import { useI18n } from "@/lib/i18n";
import { ComboCard } from "@/components/plans/ComboCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/visual/Reveal";
import { CTAButton } from "@/components/CTAButton";

export function ComboPreview() {
  const { t } = useI18n();

  return (
    <section className="section bg-white" aria-labelledby="combo-preview">
      <div className="container-page">
        <Reveal className="text-center">
          <span className="eyebrow">Triple Play</span>
          <h2 id="combo-preview" className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl">
            {t("combo.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">{t("combo.subtitle")}</p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COMBO_PACKS.map((pack) => (
            <RevealItem key={pack.id} className="h-full">
              <ComboCard pack={pack} compact />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 text-center">
          <CTAButton href="/plans" variant="secondary">
            {t("hero.ctaPlans")}
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}
