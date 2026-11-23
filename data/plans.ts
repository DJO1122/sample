/**
 * SINGLE SOURCE OF TRUTH FOR ALL PRICING.
 *
 * Every price, speed and inclusion rendered anywhere on the site is read from
 * this file. Editing a number here updates the home page, the plans table, the
 * combo cards, the quiz, the contact form dropdown and the JSON-LD offers.
 *
 * All prices are monthly, in INR, EXCLUSIVE of 18% GST (see DISCLAIMERS).
 */

export type TierId = "wifi" | "iptv" | "ott";

/** A number is a rupee price; "included" renders as an "Included FREE" badge. */
export type Price = number | "included";

export interface Tier {
  id: TierId;
  label: string;
  shortLabel: string;
  description: string;
}

export interface BroadbandPlan {
  id: string;
  speedMbps: number;
  prices: Record<TierId, Price>;
  /** Highlighted in the table as the sweet spot for most homes. */
  popular?: boolean;
}

export interface WelcomeOffer {
  id: string;
  speedMbps: number;
  days: number;
  price: number;
  perk: string;
}

export interface ComboPack {
  id: string;
  name: string;
  speedMbps: number;
  price: number;
  colorVar: string;
  badge?: string;
  inclusions: string[];
}

export const TIERS: readonly Tier[] = [
  {
    id: "wifi",
    label: "WiFi",
    shortLabel: "WiFi",
    description: "Pure fiber broadband with a free router installed.",
  },
  {
    id: "iptv",
    label: "WiFi + IPTV",
    shortLabel: "IPTV",
    description: "Broadband plus 350+ live TV channels in SD and HD.",
  },
  {
    id: "ott",
    label: "WiFi + OTT",
    shortLabel: "OTT",
    description: "Broadband plus the Smart Play TV OTT app bundle.",
  },
] as const;

/** 90-day introductory offers from the current Aerotel price list. */
export const WELCOME_OFFERS: readonly WelcomeOffer[] = [
  { id: "welcome-50", speedMbps: 50, days: 90, price: 1200, perk: "Free IPTV" },
  { id: "welcome-100", speedMbps: 100, days: 90, price: 1500, perk: "Free IPTV" },
] as const;

/** Monthly broadband plans. "included" means the add-on comes free with the plan. */
export const BROADBAND_PLANS: readonly BroadbandPlan[] = [
  {
    id: "bb-30",
    speedMbps: 30,
    prices: { wifi: 399, iptv: 499, ott: 599 },
  },
  {
    id: "bb-50",
    speedMbps: 50,
    prices: { wifi: 499, iptv: 599, ott: 699 },
  },
  {
    id: "bb-100",
    speedMbps: 100,
    prices: { wifi: 599, iptv: 699, ott: 899 },
    popular: true,
  },
  {
    id: "bb-150",
    speedMbps: 150,
    prices: { wifi: 799, iptv: 899, ott: 999 },
  },
  {
    id: "bb-200",
    speedMbps: 200,
    prices: { wifi: 999, iptv: "included", ott: 1199 },
  },
  {
    id: "bb-300",
    speedMbps: 300,
    prices: { wifi: 1299, iptv: "included", ott: "included" },
  },
  {
    id: "bb-500",
    speedMbps: 500,
    prices: { wifi: 1599, iptv: "included", ott: "included" },
  },
] as const;

/**
 * OTT apps and TV channels carried on the Smart Play TV bundle.
 *
 * These are kept as NAMES ONLY on purpose. The app and channel logos are
 * third-party trademarks; render them as brand logos only once Aerotel has
 * written permission from each partner to display their marks.
 */
export type ServiceKind = "ott" | "channel";

export interface Service {
  /** Full display name. */
  name: string;
  /** 1-3 characters shown when the logo image is unavailable. */
  monogram: string;
  /** Brand-associated accent, used for the monogram fallback tile. */
  accent: string;
  /** Path under /public to the service logo (swap for official artwork). */
  logo: string;
  kind: ServiceKind;
}

/**
 * Service tiles rendered as monogram "app icons".
 *
 * These are STYLIZED monogram tiles in brand-associated colours, NOT the
 * partners' actual logos - the real logos are third-party trademarks and need
 * written permission from each partner before they can be shown. When those
 * permissions are on file, swap each tile's monogram for the partner's logo
 * image (see components/visual/ServiceIcon.tsx); the names and colours below
 * are the single source both this strip and the combo cards read from.
 */
export const SERVICES: readonly Service[] = [
  { name: "Sun NXT", monogram: "S", accent: "#E11D2E", logo: "/logos/sun-nxt.svg", kind: "ott" },
  { name: "aha", monogram: "aha", accent: "#F5761A", logo: "/logos/aha.svg", kind: "ott" },
  { name: "ZEE5", monogram: "Z5", accent: "#6D28D9", logo: "/logos/zee5.svg", kind: "ott" },
  { name: "Sony LIV", monogram: "LIV", accent: "#1D4ED8", logo: "/logos/sony-liv.svg", kind: "ott" },
  { name: "JioHotstar", monogram: "JH", accent: "#0F3CC9", logo: "/logos/jiohotstar.svg", kind: "ott" },
  { name: "Prime Video", monogram: "PV", accent: "#00A8E1", logo: "/logos/prime-video.svg", kind: "ott" },
  { name: "Sun TV", monogram: "Sun", accent: "#E11D2E", logo: "/logos/sun-tv.svg", kind: "channel" },
  { name: "KTV", monogram: "KTV", accent: "#DB2777", logo: "/logos/ktv.svg", kind: "channel" },
  { name: "Star Vijay", monogram: "SV", accent: "#9333EA", logo: "/logos/star-vijay.svg", kind: "channel" },
  { name: "Colors Tamil", monogram: "CT", accent: "#EA580C", logo: "/logos/colors-tamil.svg", kind: "channel" },
  { name: "Zee Tamil", monogram: "ZT", accent: "#7C3AED", logo: "/logos/zee-tamil.svg", kind: "channel" },
  { name: "Star Sports", monogram: "SS", accent: "#0EA5E9", logo: "/logos/star-sports.svg", kind: "channel" },
] as const;

/** Names only, derived from SERVICES so the two never drift apart. */
export const OTT_APPS: readonly string[] = SERVICES.filter(
  (service) => service.kind === "ott",
).map((service) => service.name);

export const IPTV_CHANNELS: readonly string[] = SERVICES.filter(
  (service) => service.kind === "channel",
).map((service) => service.name);

const COMBO_INCLUSIONS: readonly string[] = [
  `Smart Play TV OTT apps: ${OTT_APPS.join(", ")}`,
  `IPTV channels: ${IPTV_CHANNELS.join(", ")} and more`,
  "350+ live channels (SD + HD)",
  "Free modem and router installed",
  "24/7 service support",
] as const;

/** Triple Play = WiFi + IPTV + OTT in one bill. */
export const COMBO_PACKS: readonly ComboPack[] = [
  {
    id: "elite-50",
    name: "Elite Pack",
    speedMbps: 50,
    price: 699,
    colorVar: "#2563EB",
    inclusions: [...COMBO_INCLUSIONS],
  },
  {
    id: "ultra-100",
    name: "Ultra Pack",
    speedMbps: 100,
    price: 899,
    colorVar: "#16A34A",
    inclusions: [...COMBO_INCLUSIONS],
  },
  {
    id: "pro-200",
    name: "Pro Pack",
    speedMbps: 200,
    price: 1199,
    colorVar: "#DC2626",
    badge: "Most Popular",
    inclusions: [...COMBO_INCLUSIONS],
  },
  {
    id: "special-300",
    name: "Special Pack",
    speedMbps: 300,
    price: 1299,
    colorVar: "#7C3AED",
    badge: "Best Value",
    inclusions: [...COMBO_INCLUSIONS],
  },
] as const;

export const GST_RATE = 18;

/** Live TV channels carried on IPTV, quoted as "350+" across the site. */
export const LIVE_CHANNEL_COUNT = 350;

/** Shown next to every price table. Wording agreed with the client. */
export const DISCLAIMERS: readonly string[] = [
  `${GST_RATE}% GST applicable on all plan values.`,
  "Plans available in selected cities.",
  "Installation charges confirmed after verifying map location and wiring distance.",
  "Free modems and routers remain the property of Aerotel Net Pvt Ltd.",
] as const;

export const MAX_SPEED_MBPS = Math.max(
  ...BROADBAND_PLANS.map((plan) => plan.speedMbps),
);

export const SPEED_FILTERS: readonly number[] = BROADBAND_PLANS.map(
  (plan) => plan.speedMbps,
);

function lowestPrice(tier: TierId): number {
  return Math.min(
    ...BROADBAND_PLANS.map((plan) => plan.prices[tier]).filter(
      (price): price is number => typeof price === "number",
    ),
  );
}

/**
 * Entry prices, derived rather than written down, so page metadata and the
 * social card quote the same numbers as the tables.
 */
export const ENTRY_PRICES = {
  wifi: lowestPrice("wifi"),
  iptv: lowestPrice("iptv"),
  ott: lowestPrice("ott"),
  combo: Math.min(...COMBO_PACKS.map((pack) => pack.price)),
} as const;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** "₹1,299" — never rounds to a different value than the source data. */
export function formatINR(value: number): string {
  return inrFormatter.format(value);
}

export function isIncluded(price: Price): price is "included" {
  return price === "included";
}

export function priceWithGst(value: number): number {
  return Math.round(value * (1 + GST_RATE / 100));
}

export interface PlanOption {
  value: string;
  label: string;
  group: string;
}

/** Options for the booking form dropdown, built from the data above. */
export function getPlanOptions(): PlanOption[] {
  const welcome = WELCOME_OFFERS.map((offer) => ({
    value: offer.id,
    label: `Welcome Offer - ${offer.speedMbps} Mbps / ${offer.days} days - ${formatINR(offer.price)}`,
    group: "Welcome Offer",
  }));

  const combos = COMBO_PACKS.map((pack) => ({
    value: pack.id,
    label: `${pack.name} - ${pack.speedMbps} Mbps - ${formatINR(pack.price)}/month`,
    group: "Triple Play Combo",
  }));

  const broadband = BROADBAND_PLANS.flatMap((plan) =>
    TIERS.filter((tier) => !isIncluded(plan.prices[tier.id])).map((tier) => ({
      value: `${plan.id}-${tier.id}`,
      label: `${plan.speedMbps} Mbps ${tier.label} - ${formatINR(
        plan.prices[tier.id] as number,
      )}/month`,
      group: "Broadband Plans",
    })),
  );

  return [...welcome, ...combos, ...broadband];
}

const PLAN_OPTION_VALUES = new Set(getPlanOptions().map((option) => option.value));

/** Guards the `?plan=` query param and the submitted form value. */
export function isKnownPlanValue(value: string): boolean {
  return PLAN_OPTION_VALUES.has(value);
}

export function getComboById(id: string): ComboPack | undefined {
  return COMBO_PACKS.find((pack) => pack.id === id);
}

/** Powers the "which plan is right for me?" quiz on /plans. */
export function recommendPack(input: {
  users: "1-2" | "3-4" | "5+";
  wantsTv: boolean;
  wantsOtt: boolean;
}): ComboPack {
  const bySpeed = [...COMBO_PACKS].sort((a, b) => a.speedMbps - b.speedMbps);
  const base =
    input.users === "1-2" ? 0 : input.users === "3-4" ? 1 : 2;
  const bump = (input.wantsTv ? 1 : 0) + (input.wantsOtt ? 1 : 0) > 1 ? 1 : 0;
  const index = Math.min(base + bump, bySpeed.length - 1);
  return bySpeed[index];
}
