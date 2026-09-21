import type { Metadata } from "next";
import Link from "next/link";
import { DISCLAIMERS, GST_RATE } from "@/data/plans";
import { FULL_ADDRESS, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms covering Aerotel Net Pvt Ltd broadband, IPTV and OTT plans, pricing, installation and equipment.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "21 September 2026";

export default function TermsPage() {
  return (
    <article className="container-page max-w-3xl py-16">
      <h1 className="font-display text-4xl font-bold text-navy">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted">Last updated: {UPDATED}</p>

      <div className="mt-8 space-y-8 text-slate-700">
        <section>
          <h2 className="font-display text-xl font-bold text-navy">These terms</h2>
          <p className="mt-2">
            These terms cover your use of {SITE.domain} and the plans shown on it,
            offered by {SITE.legalName}, {FULL_ADDRESS}. Your subscription is also
            governed by the customer agreement you sign at the time of installation.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-navy">Pricing and taxes</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {DISCLAIMERS.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="mt-2">
            All prices on this site are in Indian rupees, per month unless stated
            otherwise, and exclusive of {GST_RATE}% GST. Prices may change; the
            price confirmed by our team at the time of booking applies to your
            connection.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-navy">
            Availability and installation
          </h2>
          <p className="mt-2">
            Service is offered in selected cities and localities. A booking is an
            enquiry, not a confirmed connection: we verify coverage, map location
            and wiring distance first, then confirm installation charges before any
            work begins.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-navy">Equipment</h2>
          <p className="mt-2">
            Modems and routers supplied free with a plan remain the property of{" "}
            {SITE.shortName}. Keep them in working condition and return them if the
            service is discontinued. Loss or damage may be charged at replacement
            cost.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-navy">
            Speeds, IPTV and OTT
          </h2>
          <p className="mt-2">
            Plan speeds are the maximum available on the fiber link. Actual speeds
            depend on your device, wiring and in-home WiFi conditions. Channel
            line-ups and OTT app availability are set by the content partners and
            may change without notice.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-navy">
            Acceptable use
          </h2>
          <p className="mt-2">
            The connection must not be resold or used for unlawful activity. We may
            suspend a connection for non-payment or for misuse, after notifying you.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-navy">Trademarks</h2>
          <p className="mt-2">
            Channel and OTT application names on this site belong to their
            respective owners and are used to describe the content available on our
            plans. No affiliation or endorsement is implied.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-navy">Contact</h2>
          <p className="mt-2">
            Call {SITE.phones[0].display} or {SITE.phones[1].display}. See also our{" "}
            <Link className="font-semibold text-royal hover:underline" href="/privacy">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
