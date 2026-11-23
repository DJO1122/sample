import type { Metadata } from "next";
import Link from "next/link";
import { FULL_ADDRESS, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Aerotel Net Pvt Ltd collects, uses and protects the personal information submitted through the booking form.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const UPDATED = "21 September 2026";

export default function PrivacyPage() {
  return (
    <article className="container-page prose-slate max-w-3xl py-16">
      <h1 className="font-display text-4xl font-bold text-navy">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: {UPDATED}</p>

      <div className="mt-8 space-y-8 text-slate-700">
        <section>
          <h2 className="font-display text-xl font-bold text-navy">Who we are</h2>
          <p className="mt-2">
            {SITE.legalName} operates {SITE.domain} and provides fiber broadband,
            IPTV and OTT services. Our registered office is at {FULL_ADDRESS}.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-navy">
            What we collect
          </h2>
          <p className="mt-2">
            When you submit the booking form we collect your name, mobile number,
            area or locality, full installation address, preferred plan, preferred
            call-back time and any message you write. We also process your IP
            address for rate limiting and bot protection.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-navy">Why we use it</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>To call you back and confirm whether service is available at your address.</li>
            <li>To arrange a site check and schedule installation.</li>
            <li>To raise your connection, billing and GST invoice once you subscribe.</li>
            <li>To protect the form against automated abuse.</li>
          </ul>
          <p className="mt-2">
            We do not sell your information and we do not use it for unrelated
            marketing without your consent.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-navy">Who sees it</h2>
          <p className="mt-2">
            Form submissions are delivered to our sales inbox and, where enabled, a
            private internal sheet. We use service providers to host the site,
            deliver that email and run bot protection; they process the data on our
            instructions only. We disclose information to authorities only where the
            law requires it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-navy">How long we keep it</h2>
          <p className="mt-2">
            Enquiries that do not become connections are kept for up to 12 months.
            Records for active subscribers are kept for as long as the service is
            live and afterwards for the period required by telecom and tax rules.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-navy">Cookies</h2>
          <p className="mt-2">
            This site sets no advertising or tracking cookies. Your language choice
            is stored in your browser&apos;s local storage and never leaves your
            device. Cloudflare Turnstile may set a short-lived token to confirm the
            form was submitted by a person.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-navy">Your choices</h2>
          <p className="mt-2">
            You can ask us to correct or delete the details you sent us. Call{" "}
            <a className="font-semibold text-royal hover:underline" href={`tel:${SITE.phones[0].tel}`}>
              {SITE.phones[0].display}
            </a>{" "}
            or write to us at the address above and we will action the request.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-navy">Contact</h2>
          <p className="mt-2">
            Questions about this policy: {SITE.phones[0].display} or{" "}
            {SITE.phones[1].display}. See also our{" "}
            <Link className="font-semibold text-royal hover:underline" href="/terms">
              Terms of Service
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
