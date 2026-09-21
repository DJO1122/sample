import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1E1B4B",
        royal: "#4338CA",
        violet: "#C026D3",
        cyan: "#22D3EE",
        surface: "#F7F8FC",
        ink: "#0F172A",
        muted: "#5B6A80", // darkened from #64748B to clear WCAG AA (4.48 -> 5.18) on #F7F8FC
        pack: {
          elite: "#2563EB",
          ultra: "#16A34A",
          pro: "#DC2626",
          special: "#7C3AED",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(120deg, #1E1B4B 0%, #4338CA 55%, #C026D3 100%)",
        "cyan-gradient": "linear-gradient(120deg, #4338CA 0%, #22D3EE 100%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(139,92,246,0.18), 0 18px 45px -18px rgba(11,26,92,0.45)",
        card: "0 12px 34px -20px rgba(15,23,42,0.45)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.65" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        shimmer: {
          "0%": { transform: "translate3d(-120%,0,0)" },
          "100%": { transform: "translate3d(220%,0,0)" },
        },
        dash: {
          to: { strokeDashoffset: "-260" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        pulseRing: "pulseRing 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        shimmer: "shimmer 3.2s ease-in-out infinite",
        dash: "dash 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
