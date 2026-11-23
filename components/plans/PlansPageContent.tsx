"use client";

import { COMBO_PACKS } from "@/data/plans";
import { FAQS } from "@/data/faq";
import { useI18n } from "@/lib/i18n";
import { FAQ } from "@/components/FAQ";
import { ComboCard } from "@/components/plans/ComboCard";
import { Disclaimers } from "@/components/plans/Disclaimers";
import { PlanExplorer } from "@/components/plans/PlanExplorer";
import { PlanQuiz } from "@/components/plans/PlanQuiz";
import { ServicesShowcase } from "@/components/plans/ServicesShowcase";
import { Reveal, RevealGroup, RevealItem } from "@/components/visual/Reveal";

/** The interactive half of /plans. Static copy stays in the server page. */
export function PlansPageContent() {
  const { t } = useI18n();

  return (
    <>
      <section className="section" aria-labelledby="plan-explorer">
        <div className="container-page">
          <Reveal className="text-center">
            <h2
              id="plan-explorer"
              className="font-display text-3xl font-bold text-navy sm:text-4xl"
            >
              {t("plansPage.explorerTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              {t("plansPage.explorerSubtitle")}
            </p>
          </Reveal>

          <div className="mt-10">
            <PlanExplorer />
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="combo-packs">
        <div className="container-page">
          <Reveal className="text-center">
            <span className="eyebrow">Triple Play</span>
            <h2
              id="combo-packs"
              className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl"
            >
              {t("combo.title")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              {t("combo.subtitle")}
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {COMBO_PACKS.map((pack) => (
              <RevealItem key={pack.id} className="h-full">
                <ComboCard pack={pack} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <ServicesShowcase />

      <section className="section" aria-labelledby="plan-quiz">
        <div className="container-page grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <h2 id="plan-quiz" className="sr-only">
              {t("plansPage.quizTitle")}
            </h2>
            <PlanQuiz />
          </Reveal>
          <Reveal delay={0.1}>
            <Disclaimers />
          </Reveal>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="faq">
        <div className="container-page max-w-3xl">
          <Reveal className="text-center">
            <h2 id="faq" className="font-display text-3xl font-bold text-navy sm:text-4xl">
              {t("plansPage.faqTitle")}
            </h2>
          </Reveal>
          <Reveal className="mt-10">
            <FAQ items={FAQS} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
