import { ImageResponse } from "next/og";
import {
  ENTRY_PRICES,
  formatINR,
  LIVE_CHANNEL_COUNT,
  MAX_SPEED_MBPS,
} from "@/data/plans";
import { SITE } from "@/data/site";

export const alt =
  "Aerotel Fiber Net - broadband, IPTV and OTT in Tirupur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Brand-coloured social card, generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background:
            "linear-gradient(120deg, #0B1A5C 0%, #5B21B6 58%, #8B5CF6 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            color: "#22D3EE",
            fontWeight: 700,
          }}
        >
          AEROTEL NET PVT LTD
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 940,
          }}
        >
          Blazing-Fast Fiber for Every Home in Tirupur
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 30,
            color: "rgba(255,255,255,0.82)",
          }}
        >
          Internet + {LIVE_CHANNEL_COUNT}+ Live TV Channels + OTT
        </div>
        <div style={{ display: "flex", marginTop: 44, gap: 16 }}>
          {[`Up to ${MAX_SPEED_MBPS} Mbps`, `From ${formatINR(ENTRY_PRICES.wifi)} + GST`, SITE.phones[0].display].map(
            (chip) => (
              <div
                key={chip}
                style={{
                  display: "flex",
                  padding: "12px 24px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.35)",
                  background: "rgba(255,255,255,0.12)",
                  fontSize: 26,
                  fontWeight: 600,
                }}
              >
                {chip}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
