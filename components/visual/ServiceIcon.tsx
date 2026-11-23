"use client";

import { useState } from "react";
import type { Service } from "@/data/plans";
import { cn } from "@/lib/utils";

/**
 * Renders a service as its logo on a white chip.
 *
 * `service.logo` points at a file in /public/logos. The files that ship are
 * plain name wordmarks in each brand's colour - clear placeholders, NOT the
 * partners' real logo artwork. Drop each partner's official logo in at the same
 * path (once Aerotel has the brand assets) and it appears automatically. If a
 * logo fails to load, a coloured monogram tile is shown instead.
 */
export function ServiceIcon({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const wide = service.monogram.length > 2;

  if (failed) {
    return (
      <span
        aria-label={service.name}
        role="img"
        className={cn(
          "grid h-10 place-items-center rounded-xl px-3 font-display font-bold text-white",
          wide ? "text-xs" : "text-sm",
          className,
        )}
        style={{ background: service.accent }}
      >
        {service.monogram}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "flex h-10 items-center rounded-xl bg-white px-3 shadow-sm ring-1 ring-black/5",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={service.logo}
        alt={`${service.name} logo`}
        width={96}
        height={28}
        loading="lazy"
        decoding="async"
        className="h-6 w-auto"
        onError={() => setFailed(true)}
      />
    </span>
  );
}
