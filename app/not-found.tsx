"use client";

import { motion } from "framer-motion";
import { WifiOff } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { CTAButton } from "@/components/CTAButton";
import { FiberBackground } from "@/components/visual/FiberBackground";

/** 404 with a "signal lost" animation: the fiber pulse fades out. */
export default function NotFound() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy">
      <FiberBackground className="absolute inset-0 opacity-40" />

      <div className="container-page relative text-center">
        <motion.span
          className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-white/20 bg-white/5 text-cyan"
          animate={reduced ? undefined : { opacity: [1, 0.25, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <WifiOff className="h-9 w-9" aria-hidden="true" />
        </motion.span>

        <p className="mt-6 font-display text-6xl font-bold text-white/15">404</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
          {t("common.notFoundTitle")}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-white/70">
          {t("common.notFoundBody")}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton href="/" variant="light">
            {t("common.notFoundCta")}
          </CTAButton>
          <CTAButton href="/plans" variant="ghost">
            {t("nav.plans")}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
