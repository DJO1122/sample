import type { Metadata } from "next";
import { FAQS } from "@/data/faq";
import {
  BROADBAND_PLANS,
  ENTRY_PRICES,
  formatINR,
  GST_RATE,
  MAX_SPEED_MBPS,
} from "@/data/plans";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PlansHero } from "@/components/plans/PlansHero";
import { PlansPageContent } from "@/components/plans/PlansPageContent";
import { WelcomeOffers } from "@/components/plans/WelcomeOffers";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Broadband, IPTV & OTT Plans in Tirupur",
  description: `Compare Aerotel broadband plans from ${BROADBAND_PLANS[0].speedMbps} Mbps to ${MAX_SPEED_MBPS} Mbps. WiFi from ${formatINR(ENTRY_PRICES.wifi)}, IPTV from ${formatINR(ENTRY_PRICES.iptv)} and Triple Play combos from ${formatINR(ENTRY_PRICES.combo)}, all + ${GST_RATE}% GST.`,
  alternates: { canonical: "/plans" },
  openGraph: {
    title: "Broadband, IPTV & OTT Plans in Tirupur",
    description: `WiFi, WiFi + IPTV and WiFi + OTT pricing for every speed from ${BROADBAND_PLANS[0].speedMbps} to ${MAX_SPEED_MBPS} Mbps.`,
    url: "/plans",
  },
};

export default function PlansPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Plans", path: "/plans" },
        ])}
      />
      <PlansHero />
      <WelcomeOffers />
      <PlansPageContent />
      <FinalCta />
    </>
  );
}
