import type { Metadata } from "next";
import { Suspense } from "react";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { ContactAside } from "@/components/ContactAside";
import { ContactForm } from "@/components/ContactForm";
import { ContactHero } from "@/components/ContactHero";

export const metadata: Metadata = {
  title: "Book a Fiber Connection in Tirupur",
  description:
    "Book an Aerotel fiber broadband connection in Tirupur. Call 99949 10101 or 90801 10101, message us on WhatsApp, or send the booking form for a free site check.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Book a Fiber Connection in Tirupur",
    description:
      "Share your area and preferred plan. Our team calls you back to confirm coverage and installation.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ContactHero />

      <section className="section pt-0">
        <div className="container-page grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* useSearchParams needs a Suspense boundary so this page can stay static. */}
          <Suspense
            fallback={
              <div className="card min-h-[640px] animate-pulse p-8" aria-hidden="true" />
            }
          >
            <ContactForm />
          </Suspense>
          <ContactAside />
        </div>
      </section>
    </>
  );
}
