"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { recommendPack, type ComboPack } from "@/data/plans";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ComboCard } from "@/components/plans/ComboCard";

type Users = "1-2" | "3-4" | "5+";

const USER_OPTIONS: Users[] = ["1-2", "3-4", "5+"];

function Choice({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "rounded-xl border px-5 py-2.5 text-sm font-semibold transition-colors",
        selected
          ? "border-royal bg-royal text-white"
          : "border-slate-200 bg-white text-navy hover:border-royal/50",
      )}
    >
      {children}
    </button>
  );
}

/** Three questions, one recommendation. Pure client state, no tracking. */
export function PlanQuiz() {
  const { t } = useI18n();
  const [users, setUsers] = useState<Users | null>(null);
  const [wantsTv, setWantsTv] = useState<boolean | null>(null);
  const [wantsOtt, setWantsOtt] = useState<boolean | null>(null);

  const complete = users !== null && wantsTv !== null && wantsOtt !== null;
  const result: ComboPack | null = complete
    ? recommendPack({ users, wantsTv, wantsOtt })
    : null;

  const reset = () => {
    setUsers(null);
    setWantsTv(null);
    setWantsOtt(null);
  };

  return (
    <div className="card p-6 sm:p-8">
      <h3 className="font-display text-2xl font-bold text-navy">
        {t("plansPage.quizTitle")}
      </h3>
      <p className="mt-2 text-sm text-muted">{t("plansPage.quizSubtitle")}</p>

      <div className="mt-6 space-y-6">
        <fieldset>
          <legend className="text-sm font-semibold text-navy">
            {t("plansPage.quizUsers")}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {USER_OPTIONS.map((option) => (
              <Choice
                key={option}
                selected={users === option}
                onClick={() => setUsers(option)}
              >
                {option}
              </Choice>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-navy">
            {t("plansPage.quizTv")}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <Choice selected={wantsTv === true} onClick={() => setWantsTv(true)}>
              {t("plansPage.quizYes")}
            </Choice>
            <Choice selected={wantsTv === false} onClick={() => setWantsTv(false)}>
              {t("plansPage.quizNo")}
            </Choice>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-navy">
            {t("plansPage.quizOtt")}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <Choice selected={wantsOtt === true} onClick={() => setWantsOtt(true)}>
              {t("plansPage.quizYes")}
            </Choice>
            <Choice selected={wantsOtt === false} onClick={() => setWantsOtt(false)}>
              {t("plansPage.quizNo")}
            </Choice>
          </div>
        </fieldset>
      </div>

      <div aria-live="polite" className="mt-8">
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-royal">
                {t("plansPage.quizResult")}
              </p>
              <div className="max-w-sm">
                <ComboCard pack={result} compact />
              </div>
              <button
                type="button"
                onClick={reset}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-navy"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                {t("plansPage.quizRestart")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
