"use client";

import { motion } from "framer-motion";
import { PhoneCall, MapPinned, Wrench, PartyPopper } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/visual/Reveal";

const STEPS = [
  { icon: PhoneCall, title: "steps.s1Title", body: "steps.s1Body" },
  { icon: MapPinned, title: "steps.s2Title", body: "steps.s2Body" },
  { icon: Wrench, title: "steps.s3Title", body: "steps.s3Body" },
  { icon: PartyPopper, title: "steps.s4Title", body: "steps.s4Body" },
];

/** Four-step timeline. The connecting line draws itself as you scroll past. */
export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section className="section" aria-labelledby="how-it-works">
      <div className="container-page">
        <Reveal className="text-center">
          <h2 id="how-it-works" className="font-display text-3xl font-bold text-navy sm:text-4xl">
            {t("steps.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">{t("steps.subtitle")}</p>
        </Reveal>

        <ol className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-6">
          <motion.span
            aria-hidden="true"
            className="absolute left-6 top-2 hidden h-[2px] w-full origin-left bg-gradient-to-r from-royal via-violet to-cyan lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: "calc(100% - 3rem)" }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute left-6 top-0 h-full w-[2px] origin-top bg-gradient-to-b from-royal via-violet to-cyan lg:hidden"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />

          {STEPS.map(({ icon: Icon, title, body }, index) => (
            <motion.li
              key={title}
              className="relative gpu pl-16 lg:pl-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <span className="absolute left-0 top-0 grid h-12 w-12 -translate-x-[22px] place-items-center rounded-full border-4 border-surface bg-brand-gradient text-white lg:relative lg:-translate-x-0 lg:mb-5 lg:-mt-5">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-royal">
                Step {index + 1}
              </span>
              <h3 className="mt-1 font-display text-lg font-bold text-navy">
                {t(title)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t(body)}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
