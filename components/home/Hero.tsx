"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, CalendarCheck, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { CTAButton } from "@/components/CTAButton";
import { FiberBackground } from "@/components/visual/FiberBackground";
import { SpeedMeter } from "@/components/SpeedMeter";

export function Hero() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden bg-navy">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(91,33,182,0.55),transparent),radial-gradient(50%_50%_at_85%_20%,rgba(34,211,238,0.22),transparent)]"
      />
      <FiberBackground className="absolute inset-0 opacity-70" />

      <div className="container-page relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="eyebrow border-cyan/30 bg-cyan/10 text-cyan"
          >
            {t("hero.eyebrow")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-5 max-w-xl text-lg text-white/75"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <CTAButton href="/plans" size="lg">
              {t("hero.ctaPlans")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CTAButton>
            <CTAButton href="/contact" variant="ghost" size="lg">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              {t("hero.ctaBook")}
            </CTAButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
          >
            {["hero.trust1", "hero.trust2", "hero.trust3"].map((key) => (
              <li
                key={key}
                className="flex items-center gap-2 text-sm font-medium text-white/80"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-cyan/20 text-cyan">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {t(key)}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 right-2 hidden h-28 w-28 opacity-90 lg:block"
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
          >
            <Image src="/logo.svg" alt="" width={112} height={112} priority />
          </motion.div>

          <div className="rounded-3xl border border-white/12 bg-white/[0.05] p-6 backdrop-blur-sm sm:p-8">
            <SpeedMeter label={t("hero.meterLabel")} />
          </div>
        </div>
      </div>
    </section>
  );
}
