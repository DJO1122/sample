# Aerotel Fiber Net — Marketing Website

Three-page marketing site for **Aerotel Net Private Limited**, a fiber broadband,
IPTV and OTT provider in Tirupur, Tamil Nadu. Built to drive one action: **book a
connection** (call, WhatsApp or booking form).

- **Home** (`/`) — hero, speed meter, welcome offers, why Aerotel, Triple Play
  preview, entertainment strip, how it works, testimonials and stats, final CTA.
- **Plans** (`/plans`) — interactive plan explorer (WiFi / WiFi+IPTV / WiFi+OTT),
  speed filters, Triple Play combos, plan quiz, disclaimers, FAQ.
- **Contact** (`/contact`) — booking form, one-tap call/WhatsApp, office map.

Plus `/privacy`, `/terms` and a custom 404.

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion (`MotionConfig reducedMotion="user"`) |
| Icons | lucide-react |
| Forms | React Hook Form + Zod (client **and** server) |
| Email | Resend, via a Node route handler |
| Bot protection | Cloudflare Turnstile (verified server-side) |
| Rate limiting | Upstash Redis (in-memory fallback) |
| Hosting | Vercel |

> The brief asked for "Next.js 14+". We ship **Next 16** because the entire
> Next 14 line is flagged by `npm audit` with unpatched advisories and the fix is
> a major upgrade. `npm audit` currently reports **0 vulnerabilities**.

Every page is statically rendered (SSG). The only dynamic route is
`POST /api/lead`.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint       # ESLint (flat config; `next lint` was removed in Next 16)
npm run typecheck  # tsc --noEmit
```

---

## Environment variables

Set these in Vercel → Project → Settings → Environment Variables. None of them
are exposed to the browser except `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, which is
public by design.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | production | Sends the lead email. |
| `LEAD_TO_EMAIL` | production | Destination inbox. Comma-separate for several. |
| `LEAD_FROM_EMAIL` | production | Sender; must be on a Resend-verified domain. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | production | Renders the Turnstile widget. |
| `TURNSTILE_SECRET_KEY` | production | Server-side token verification. |
| `UPSTASH_REDIS_REST_URL` | recommended | Distributed rate limiting. |
| `UPSTASH_REDIS_REST_TOKEN` | recommended | Distributed rate limiting. |
| `SHEET_WEBHOOK_URL` | optional | Apps Script endpoint that appends a sheet row. |
| `SHEET_WEBHOOK_SECRET` | optional | Shared secret sent as `x-webhook-secret`. |

**Fail-closed behaviour.** In production, a missing `TURNSTILE_SECRET_KEY` makes
every submission fail the bot check, and missing email variables make the route
return an error instead of silently dropping the lead. Locally both are skipped
so you can develop without keys. **Set them before launch.**

Without the Upstash variables the limiter falls back to a per-instance in-memory
window — fine locally, not sufficient on Vercel where requests spread across
instances.

---

## Deploying to Vercel

1. Push this repository and import it at [vercel.com/new](https://vercel.com/new).
   Framework preset: **Next.js**. No build overrides needed.
2. Add the environment variables above for **Production** and **Preview**.
3. Add the domain `www.aerotelfibernet.com` under Settings → Domains, and set the
   apex `aerotelfibernet.com` to redirect to `www`.
4. Point DNS at Vercel (`CNAME www → cname.vercel-dns.com`, plus Vercel's
   A record for the apex).
5. Verify the sending domain in Resend (SPF + DKIM) or lead mail will bounce.
6. Add the production domain to the Cloudflare Turnstile widget's allowed
   hostnames.
7. After the first deploy, submit `https://www.aerotelfibernet.com/sitemap.xml`
   in Google Search Console.

HSTS is sent with `preload`; only submit the domain to the preload list once you
are certain every subdomain can serve HTTPS.

---

## Editing plans and prices

**`data/plans.ts` is the single source of truth.** Change a number there and it
updates everywhere automatically — the home page, the comparison table, the
mobile cards, the combo cards, the quiz, the booking form's dropdown, the page
metadata, the social card and the JSON-LD offers. This is verified: changing
`30 Mbps` WiFi from ₹399 to ₹349 moved all 8 rendered occurrences plus the
structured-data offer.

```ts
{ id: "bb-100", speedMbps: 100, prices: { wifi: 599, iptv: 699, ott: 899 } }
```

- A numeric price renders as a rupee amount; `"included"` renders an
  **Included FREE** badge, exactly as the flyer shows those cells.
- `WELCOME_OFFERS`, `COMBO_PACKS`, `DISCLAIMERS`, `GST_RATE` and
  `LIVE_CHANNEL_COUNT` live in the same file.
- `ENTRY_PRICES` is derived, so "from ₹399" in the page metadata can never drift
  from the tables.

All prices are **monthly and exclusive of 18% GST**. The four mandatory
disclaimers render next to every price table via `<Disclaimers />`.

---

## Project structure

```
app/
  layout.tsx            fonts, metadata, JSON-LD, providers, chrome
  template.tsx          route transition
  page.tsx              home
  plans/page.tsx        plans
  contact/page.tsx      contact + booking
  privacy/ terms/       legal pages
  not-found.tsx         404 with "signal lost" animation
  api/lead/route.ts     form handler (the only dynamic route)
  opengraph-image.tsx   generated social card
  sitemap.ts robots.ts
components/
  CTAButton FAQ ContactForm ContactAside ContactHero
  Turnstile JsonLd MotionProvider SpeedMeter
  home/     Hero WhyAerotel ComboPreview EntertainmentStrip
            HowItWorks SocialProof FinalCta
  plans/    PlanCard PlanTable ComboCard PlanExplorer PlanQuiz
            WelcomeOffers Disclaimers PlansHero PlansPageContent
  layout/   Navbar Footer FloatingActions ScrollProgress
  visual/   FiberBackground Reveal CountUp WaveDivider
data/       plans.ts (prices) site.ts (company) faq.ts
lib/        validation rate-limit turnstile mail sanitize schema i18n motion utils
locales/    en.json ta.json
public/     logo.svg
```

---

## Security

- **Headers** (`next.config.mjs`): CSP, HSTS (`max-age=63072000; includeSubDomains; preload`),
  `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, a `Permissions-Policy` that
  disables camera/mic/geolocation, and `Cross-Origin-Opener-Policy`.
- **CSP** allows only self, Google Fonts, the Google Maps embed and Turnstile.
  `object-src 'none'`, `frame-ancestors 'none'`, no `unsafe-eval` in production.
  `script-src` does include `'unsafe-inline'`: Next's App Router ships its
  hydration payload as inline scripts, and a per-request nonce would force every
  page to render dynamically, losing SSG. The trade-off is documented at the top
  of `next.config.mjs`. Development additionally allows `'unsafe-eval'` and
  `ws:` so HMR works; production does not.
- **Form handler**: rejects non-JSON, caps the body at 8 KB, rate-limits per IP
  (5 per 10 minutes), validates with Zod, verifies the Turnstile token
  server-side, and only then sends mail. The plan field is checked against the
  known plan list, so a submission cannot invent a price.
- **Honeypot**: the hidden `company` field is deliberately *accepted* by the
  schema and checked afterwards, so a bot gets a normal `200` and never learns
  which field caught it.
- **Injection**: every lead value is control-character stripped and HTML-escaped
  before it is placed in the email; the subject line is collapsed to one line so
  a submission cannot forge headers.
- **Secrets** are server-only; leads go to email and an optional private sheet,
  never to a public database.
- Consent checkbox plus Privacy Policy and Terms pages, since the form collects
  phone numbers and addresses.
- No "disable right-click" theatre — it protects nothing.

Re-run `npm audit` after any dependency change.

---

## Accessibility and performance

- **axe-core reports 0 WCAG 2.1 A/AA violations** on `/`, `/plans`, `/contact`,
  `/privacy` and `/terms`, at 1280px and 390px.
- The `muted` text token was darkened from the brief's `#64748B` to `#5B6A80`;
  the original measured 4.48:1 on the page background, just under the 4.5:1 AA
  threshold. The sticky navbar was made more opaque for the same reason.
- Semantic `<table>` with `<caption>` and scoped headers for the price grid,
  real `<button>`s with `aria-expanded` for the FAQ, labelled form controls,
  visible focus rings, a skip link, and `aria-label`s on icon-only buttons.
- Animations use transform and opacity only. `prefers-reduced-motion` is honored
  in CSS, in JS (marquee, fiber streaks, count-ups, card tilt) and through
  `MotionConfig reducedMotion="user"` for everything Framer drives.
- Fonts are self-hosted through `next/font`; images use `next/image` with
  AVIF/WebP.

Run Lighthouse against a production build (`npm run build && npm start`), not the
dev server.

---

## Language toggle

English is the default and Tamil is available from the header. Strings live in
`locales/en.json` and `locales/ta.json`, which are checked to have identical key
sets. The choice is stored in `localStorage` and read through
`useSyncExternalStore`, so the prerendered HTML is always English and there is no
hydration mismatch. Any key missing from Tamil falls back to English.

---

## Before launch — open items for the client

1. **Logos are text, not images.** The OTT app and TV channel names (Sun NXT,
   aha, ZEE5, Sony LIV, JioHotstar, Prime Video, Sun TV, KTV, Star Vijay, Colors
   Tamil, Zee Tamil, Star Sports) render as styled text chips. These are
   third-party trademarks — swap in logo images only once written permission from
   each partner is on file. The swap point is `OTT_APPS` / `IPTV_CHANNELS` in
   `data/plans.ts` and `components/home/EntertainmentStrip.tsx`.
2. **Confirm the prices and GST wording.** Everything in `data/plans.ts` is
   transcribed from the supplied flyer and verified against it value by value,
   but a published price list is read as a binding offer. Have the client sign
   off before the domain goes live.
3. **Supply the real logo.** `public/logo.svg` is a brand-coloured stand-in built
   from the flyer. Replace it with the original vector artwork; the file name is
   referenced by the header, footer, hero and JSON-LD.
4. **Replace the placeholder testimonials** in `components/home/SocialProof.tsx`
   with real, attributable quotes. Do not publish invented reviews.
5. **Confirm the office coordinates** in `data/site.ts` (`geo`) — they are
   approximate for Poyampalayam and feed the local-business structured data.
6. Confirm the support email used for form replies (`SITE.email`) and the office
   hours shown on the contact page.
