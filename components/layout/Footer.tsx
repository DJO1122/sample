"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Globe, Clock } from "lucide-react";
import { FULL_ADDRESS, MAPS_LINK, SITE } from "@/data/site";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/80">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 text-white">
            <Image src="/logo.svg" alt="" width={40} height={40} className="h-10 w-10" />
            <span className="font-display text-lg font-bold">AEROTEL</span>
          </div>
          <p className="mt-3 max-w-xs text-sm">{t("footer.tagline")}</p>
          <p className="mt-3 text-xs text-white/55">{SITE.legalName}</p>
        </div>

        <nav aria-labelledby="footer-links">
          <h2 id="footer-links" className="font-display text-sm font-semibold uppercase tracking-widest text-cyan">
            {t("footer.quickLinks")}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="hover:text-white" href="/">{t("nav.home")}</Link></li>
            <li><Link className="hover:text-white" href="/plans">{t("nav.plans")}</Link></li>
            <li><Link className="hover:text-white" href="/contact">{t("nav.contact")}</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-cyan">
            {t("footer.contact")}
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {SITE.phones.map((phone) => (
              <li key={phone.tel}>
                <a className="inline-flex items-center gap-2 hover:text-white" href={`tel:${phone.tel}`}>
                  <Phone className="h-4 w-4 text-cyan" aria-hidden="true" />
                  {phone.display}
                </a>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
              <span>
                {FULL_ADDRESS}
                <br />
                <a
                  className="text-cyan hover:underline"
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("footer.directions")}
                </a>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-cyan" aria-hidden="true" />
              <a className="hover:text-white" href={SITE.url} rel="noopener noreferrer">
                {SITE.domain}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan" aria-hidden="true" />
              <span>{SITE.supportHours}</span>
            </li>
          </ul>
        </div>

        <nav aria-labelledby="footer-legal">
          <h2 id="footer-legal" className="font-display text-sm font-semibold uppercase tracking-widest text-cyan">
            {t("footer.legal")}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="hover:text-white" href="/privacy">{t("footer.privacy")}</Link></li>
            <li><Link className="hover:text-white" href="/terms">{t("footer.terms")}</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/55">
        © {year} {SITE.legalName}. {t("footer.rights")}
      </div>
    </footer>
  );
}
