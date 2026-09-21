"use client";

import { Info } from "lucide-react";
import { DISCLAIMERS } from "@/data/plans";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Mandatory legal block. Rendered next to every price table on the site. */
export function Disclaimers({ className }: { className?: string }) {
  const { t } = useI18n();

  return (
    <aside
      className={cn(
        "rounded-2xl border border-royal/15 bg-royal/5 p-5 text-sm text-slate-700",
        className,
      )}
      aria-label={t("common.disclaimerTitle")}
    >
      <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-navy">
        <Info className="h-4 w-4 text-royal" aria-hidden="true" />
        {t("common.disclaimerTitle")}
      </h3>
      <ul className="mt-3 space-y-1.5">
        {DISCLAIMERS.map((line) => (
          <li key={line} className="flex gap-2">
            <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-royal" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
