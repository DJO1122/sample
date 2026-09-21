import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { ENTRY_PRICES, formatINR, LIVE_CHANNEL_COUNT, MAX_SPEED_MBPS } from "@/data/plans";
import { SITE } from "@/data/site";
import { I18nProvider } from "@/lib/i18n";
import { localBusinessSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { MotionProvider } from "@/components/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Aerotel Fiber Net | Broadband, IPTV & OTT in Tirupur",
    template: "%s | Aerotel Fiber Net",
  },
  description: `Fiber broadband from ${formatINR(ENTRY_PRICES.wifi)} in Tirupur with ${LIVE_CHANNEL_COUNT}+ live IPTV channels, OTT apps and free router installation. Speeds up to ${MAX_SPEED_MBPS} Mbps. Call ${SITE.phones[0].display}.`,
  applicationName: SITE.brand,
  keywords: [
    "fiber broadband Tirupur",
    "internet connection Poyampalayam",
    "IPTV Tirupur",
    "cheap WiFi plans Tirupur",
    "broadband plans Tirupur",
    "Aerotel Net Pvt Ltd",
    "OTT broadband Tamil Nadu",
  ],
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.brand,
    title: "Aerotel Fiber Net | Broadband, IPTV & OTT in Tirupur",
    description: `Internet + ${LIVE_CHANNEL_COUNT}+ live TV channels + OTT — one connection, one bill. Plans from ${formatINR(ENTRY_PRICES.wifi)} + GST across Tirupur.`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Aerotel Fiber Net | Broadband, IPTV & OTT in Tirupur",
    description: `Fiber broadband, IPTV and OTT bundles in Tirupur. Speeds up to ${MAX_SPEED_MBPS} Mbps.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, address: true },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0B1A5C",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={localBusinessSchema()} />
        <I18nProvider>
          <MotionProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy"
            >
              Skip to main content
            </a>
            <ScrollProgress />
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <FloatingActions />
          </MotionProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
