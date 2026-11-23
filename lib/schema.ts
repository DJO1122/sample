import {
  BROADBAND_PLANS,
  LIVE_CHANNEL_COUNT,
  COMBO_PACKS,
  isIncluded,
  TIERS,
  WELCOME_OFFERS,
} from "@/data/plans";
import { FULL_ADDRESS, SITE } from "@/data/site";

/** JSON-LD for the business itself, with every plan as an Offer. */
export function localBusinessSchema() {
  const offers = [
    ...BROADBAND_PLANS.flatMap((plan) =>
      TIERS.filter((tier) => !isIncluded(plan.prices[tier.id])).map((tier) => ({
        "@type": "Offer",
        name: `${plan.speedMbps} Mbps ${tier.label}`,
        price: String(plan.prices[tier.id]),
        priceCurrency: "INR",
        category: "Broadband",
        url: `${SITE.url}/plans`,
      })),
    ),
    ...COMBO_PACKS.map((pack) => ({
      "@type": "Offer",
      name: `${pack.name} - ${pack.speedMbps} Mbps Triple Play`,
      price: String(pack.price),
      priceCurrency: "INR",
      category: "Broadband, IPTV and OTT",
      url: `${SITE.url}/plans`,
    })),
    ...WELCOME_OFFERS.map((offer) => ({
      "@type": "Offer",
      name: `Welcome Offer ${offer.speedMbps} Mbps - ${offer.days} days`,
      price: String(offer.price),
      priceCurrency: "INR",
      category: "Introductory offer",
      url: `${SITE.url}/plans`,
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@type": ["InternetServiceProvider", "LocalBusiness"],
    "@id": `${SITE.url}/#business`,
    name: SITE.legalName,
    alternateName: SITE.brand,
    url: SITE.url,
    telephone: SITE.phones.map((phone) => phone.tel),
    email: SITE.email,
    description: `Fiber broadband, IPTV with ${LIVE_CHANNEL_COUNT}+ live channels and OTT bundles for homes and businesses in Tirupur, Tamil Nadu.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: SITE.serviceArea.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    priceRange: "₹₹",
    makesOffer: offers,
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      SITE.mapsQuery,
    )}`,
    slogan: SITE.tagline,
    logo: `${SITE.url}/logo.svg`,
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(
  crumbs: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE.url}${crumb.path}`,
    })),
  };
}

export const ADDRESS_LINE = FULL_ADDRESS;
