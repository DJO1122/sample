import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-white shadow-glow hover:shadow-[0_0_0_1px_rgba(34,211,238,0.5),0_18px_45px_-16px_rgba(34,211,238,0.55)]",
  secondary:
    "bg-white text-navy border border-slate-200 hover:border-royal/40 hover:text-royal",
  ghost:
    "border border-white/30 text-white hover:border-cyan hover:text-cyan",
  light: "bg-cyan text-navy hover:bg-white",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm sm:text-base",
  lg: "px-7 py-3.5 text-base",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,box-shadow,background-color,color,border-color] duration-200 will-change-transform hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type LinkProps = CommonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >;

type ButtonProps = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children">;

export function CTAButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: LinkProps | ButtonProps) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props as LinkProps;
    const external = href.startsWith("http") || href.startsWith("tel:");

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...(rest as ComponentProps<"a">)}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonProps)}>
      {children}
    </button>
  );
}
