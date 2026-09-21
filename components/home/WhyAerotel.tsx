"use client";

import { Gauge, Headphones, Router, Tv2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal, RevealGroup, RevealItem } from "@/components/visual/Reveal";

const CARDS = [
  { icon: Gauge, title: "why.speedTitle", body: "why.speedBody" },
  { icon: Headphones, title: "why.supportTitle", body: "why.supportBody" },
  { icon: Tv2, title: "why.bundleTitle", body: "why.bundleBody" },
  { icon: Router, title: "why.routerTitle", body: "why.routerBody" },
];

export function WhyAerotel() {
  const { t } = useI18n();

  return (
    <section className="section" aria-labelledby="why-aerotel">
      <div className="container-page">
        <Reveal className="text-center">
          <h2 id="why-aerotel" className="font-display text-3xl font-bold text-navy sm:text-4xl">
            {t("why.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">{t("why.subtitle")}</p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map(({ icon: Icon, title, body }) => (
            <RevealItem key={title}>
              <article className="card h-full p-6 transition-transform duration-300 hover:-translate-y-1">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">
                  {t(title)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t(body)}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
