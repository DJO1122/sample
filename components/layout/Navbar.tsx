"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { SITE } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", key: "nav.home" },
  { href: "/plans", key: "nav.plans" },
  { href: "/contact", key: "nav.contact" },
];

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const pathname = usePathname();
  // The menu is tracked by the route it was opened on, so navigating away
  // closes it without an effect that resets state.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const open = openedOn === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-shadow duration-300",
        "glass",
        scrolled && "shadow-[0_10px_30px_-20px_rgba(0,0,0,0.9)]",
      )}
    >
      <nav
        className="container-page flex h-16 items-center justify-between gap-3"
        aria-label="Main"
      >
        <Link href="/" className="flex items-center gap-2.5 text-white">
          <Image
            src="/logo.svg"
            alt=""
            width={36}
            height={36}
            priority
            className="h-9 w-9"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-bold tracking-tight">
              AEROTEL
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-cyan">
              Net Pvt Ltd
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-white/20 text-white"
                      : "text-white/90 hover:bg-white/10 hover:text-white",
                  )}
                >
                  {t(link.key)}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div
            className="hidden items-center rounded-full border border-white/25 p-0.5 text-xs font-semibold sm:flex"
            role="group"
            aria-label="Language"
          >
            {(["en", "ta"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={cn(
                  "rounded-full px-2.5 py-1 transition-colors",
                  lang === code
                    ? "bg-cyan text-navy"
                    : "text-white/90 hover:text-white",
                )}
              >
                {code === "en" ? "EN" : "தமிழ்"}
              </button>
            ))}
          </div>

          <a
            href={`tel:${SITE.phones[0].tel}`}
            className="inline-flex items-center gap-2 rounded-full bg-cyan px-4 py-2 text-sm font-semibold text-navy transition-transform hover:-translate-y-0.5"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{t("nav.callNow")}</span>
            <span className="sm:hidden">{SITE.phones[0].display}</span>
          </a>

          <button
            type="button"
            className="rounded-full p-2 text-white md:hidden"
            onClick={() => setOpenedOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 md:hidden">
          <ul className="container-page space-y-1 py-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
            <li className="flex gap-2 pt-2">
              {(["en", "ta"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={cn(
                    "flex-1 rounded-xl border px-3 py-2 text-sm font-semibold",
                    lang === code
                      ? "border-cyan bg-cyan text-navy"
                      : "border-white/25 text-white/80",
                  )}
                >
                  {code === "en" ? "English" : "தமிழ்"}
                </button>
              ))}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
