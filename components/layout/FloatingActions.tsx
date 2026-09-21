"use client";

import { MessageCircle, Phone } from "lucide-react";
import { SITE, WHATSAPP_URL } from "@/data/site";

/** Thumb-reach call and WhatsApp buttons. Most visitors arrive on a phone. */
export function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Aerotel on WhatsApp"
        className="relative grid h-[52px] w-[52px] place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] motion-safe:animate-pulseRing" aria-hidden="true" />
        <MessageCircle className="relative h-6 w-6" aria-hidden="true" />
      </a>
      <a
        href={`tel:${SITE.phones[0].tel}`}
        aria-label={`Call Aerotel on ${SITE.phones[0].display}`}
        className="relative grid h-[52px] w-[52px] place-items-center rounded-full bg-brand-gradient text-white shadow-lg transition-transform hover:scale-105"
      >
        <Phone className="relative h-5 w-5" aria-hidden="true" />
      </a>
    </div>
  );
}
