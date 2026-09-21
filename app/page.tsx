import type { Metadata } from "next";
import {
  ENTRY_PRICES,
  formatINR,
  LIVE_CHANNEL_COUNT,
  MAX_SPEED_MBPS,
} from "@/data/plans";
import { Hero } from "@/components/home/Hero";
import { WelcomeOffers } from "@/components/plans/WelcomeOffers";
import { WhyAerotel } from "@/components/home/WhyAerotel";
import { TrustBar } from "@/components/home/TrustBar";
import { ComboPreview } from "@/components/home/ComboPreview";
import { EntertainmentStrip } from "@/components/home/EntertainmentStrip";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SocialProof } from "@/components/home/SocialProof";
import { FinalCta } from "@/components/home/FinalCta";
import { Disclaimers } from "@/components/plans/Disclaimers";
import { WaveDivider } from "@/components/visual/WaveDivider";

export const metadata: Metadata = {
  title: "Fiber Broadband, IPTV & OTT in Tirupur",
  description: `Aerotel Net Pvt Ltd brings fiber broadband to Tirupur from ${formatINR(ENTRY_PRICES.wifi)} + GST, with ${LIVE_CHANNEL_COUNT}+ live IPTV channels, OTT apps and a free router. Speeds up to ${MAX_SPEED_MBPS} Mbps.`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WaveDivider />
      <TrustBar />
      <WhyAerotel />
      <WelcomeOffers />
      <ComboPreview />
      <EntertainmentStrip />
      <HowItWorks />
      <SocialProof />

      <section className="container-page pb-16">
        <Disclaimers />
      </section>

      <FinalCta />
    </>
  );
}
