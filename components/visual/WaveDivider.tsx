import { cn } from "@/lib/utils";

/** Decorative wave between a dark hero band and the light page body. */
export function WaveDivider({
  className,
  fill = "#F7F8FC",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <div className={cn("pointer-events-none -mt-px leading-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block h-[60px] w-full sm:h-[90px]"
      >
        <path
          d="M0 40 C 240 96, 480 0, 720 32 C 960 64, 1200 96, 1440 48 L1440 90 L0 90 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
