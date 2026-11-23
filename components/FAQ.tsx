"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Accessible accordion built on native <button> + aria-expanded.
 * The answers stay in the DOM (hidden), so they are indexed and match the
 * FAQPage JSON-LD emitted on the plans page.
 */
export function FAQ({ items, className }: { items: FaqItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white", className)}>
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : index)}
                aria-expanded={expanded}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-semibold text-navy transition-colors hover:bg-slate-50"
              >
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 shrink-0 text-royal transition-transform duration-300",
                    expanded && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              hidden={!expanded}
              className="px-5 pb-5 text-sm leading-relaxed text-slate-700"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
