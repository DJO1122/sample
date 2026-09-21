import type { Service } from "@/data/plans";
import { cn } from "@/lib/utils";

/**
 * A monogram "app icon" tile plus the service name.
 *
 * The tile is a stylized brand-accent monogram, not the partner's real logo.
 * To use the actual logo once permission is on file, drop an <Image> in place
 * of the monogram <span> below and keep the same wrapper.
 */
export function ServiceIcon({
  service,
  className,
  labelClassName,
}: {
  service: Service;
  className?: string;
  labelClassName?: string;
}) {
  const wide = service.monogram.length > 2;

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "grid h-9 w-9 shrink-0 place-items-center rounded-[11px] font-display font-bold text-white shadow-sm ring-1 ring-white/25",
          wide ? "text-[10px]" : "text-sm",
        )}
        style={{
          background: `linear-gradient(150deg, ${service.accent}, ${service.accent}cc)`,
        }}
      >
        {service.monogram}
      </span>
      <span className={cn("whitespace-nowrap text-sm font-semibold", labelClassName)}>
        {service.name}
      </span>
    </span>
  );
}
