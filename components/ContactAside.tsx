"use client";

import { Clock, Headphones, MapPin, MessageCircle, Phone } from "lucide-react";
import { FULL_ADDRESS, MAPS_EMBED_URL, MAPS_LINK, SITE, WHATSAPP_URL } from "@/data/site";
import { useI18n } from "@/lib/i18n";

export function ContactAside() {
  const { t } = useI18n();

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        {SITE.phones.map((phone) => (
          <a
            key={phone.tel}
            href={`tel:${phone.tel}`}
            className="card flex items-center gap-3 p-4 transition-colors hover:border-royal/40"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-gradient text-white">
              <Phone className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-widest text-muted">
                {t("contactPage.callCta")}
              </span>
              <span className="block font-display text-base font-bold text-navy">
                {phone.display}
              </span>
            </span>
          </a>
        ))}

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="card flex items-center gap-3 p-4 transition-colors hover:border-[#25D366] sm:col-span-2"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25D366] text-white">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-xs font-semibold uppercase tracking-widest text-muted">
              {t("contactPage.whatsappCta")}
            </span>
            <span className="block font-display text-base font-bold text-navy">
              {SITE.phones[0].display}
            </span>
          </span>
        </a>
      </div>

      <div className="card p-5">
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-navy">
          <MapPin className="h-4 w-4 text-royal" aria-hidden="true" />
          {t("contactPage.officeTitle")}
        </h2>
        <p className="mt-2 text-sm text-slate-700">{FULL_ADDRESS}</p>
        <a
          className="mt-2 inline-block text-sm font-semibold text-royal hover:underline"
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("footer.directions")}
        </a>

        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
          <iframe
            title="Aerotel Net Pvt Ltd office location on Google Maps"
            src={MAPS_EMBED_URL}
            className="h-64 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="card p-5">
          <h2 className="flex items-center gap-2 font-display text-base font-bold text-navy">
            <Clock className="h-4 w-4 text-royal" aria-hidden="true" />
            {t("contactPage.hoursTitle")}
          </h2>
          <p className="mt-2 text-sm text-slate-700">{SITE.officeHours}</p>
        </div>
        <div className="card border-royal/30 bg-royal/5 p-5">
          <h2 className="flex items-center gap-2 font-display text-base font-bold text-navy">
            <Headphones className="h-4 w-4 text-royal" aria-hidden="true" />
            {t("contactPage.supportTitle")}
          </h2>
          <p className="mt-2 text-sm font-semibold text-royal">
            {SITE.supportHours}
          </p>
        </div>
      </div>
    </div>
  );
}
