"use client";

import { MessageCircle, PhoneCall } from "lucide-react";
import { SITE, WHATSAPP_URL } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { CTAButton } from "@/components/CTAButton";
import { FiberBackground } from "@/components/visual/FiberBackground";
import { Reveal } from "@/components/visual/Reveal";

export function FinalCta() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-brand-gradient" aria-labelledby="final-cta">
      <FiberBackground className="absolute inset-0 opacity-40" />
      <div className="container-page relative py-16 text-center sm:py-20">
        <Reveal>
          <h2 id="final-cta" className="font-display text-3xl font-bold text-white sm:text-4xl">
            {t("finalCta.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            {t("finalCta.subtitle")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTAButton href="/contact" variant="light" size="lg">
              {t("finalCta.primary")}
            </CTAButton>
            <CTAButton href={WHATSAPP_URL} variant="ghost" size="lg">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t("finalCta.secondary")}
            </CTAButton>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/80">
            <span className="font-semibold uppercase tracking-widest text-cyan">
              {t("common.callUs")}
            </span>
            {SITE.phones.map((phone) => (
              <a
                key={phone.tel}
                href={`tel:${phone.tel}`}
                className="inline-flex items-center gap-2 font-semibold hover:text-white"
              >
                <PhoneCall className="h-4 w-4" aria-hidden="true" />
                {phone.display}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
