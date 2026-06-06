import type { Config } from "tailwindcss";

/**
 * Jolchap design system.
 * The whole brand is built on a small palette derived from the logo:
 *   • Jol Teal (#0E8388) — the brand colour (water + ink), accents / CTAs
 *   • Ink      (#16212B) — near-black ink, used for surfaces / text
 *   • Cream    (#F7F4EF) — warm paper-like background
 * (The `ember` / `onyx` / `bone` token names are kept as internal aliases so
 *  the colour can be retuned in one place — `ember` is the primary brand teal.)
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem", xl: "2.5rem" },
      screens: { "2xl": "1320px" },
    },
    extend: {
      colors: {
        // ── Brand colour #1 — JOL TEAL (primary) ───────────────────────
        ember: {
          50: "#ECFBFA",
          100: "#CFF3F2",
          200: "#A2E7E6",
          300: "#67D2D2",
          400: "#2FB4B6",
          500: "#0E8388", // ◀ primary brand teal (from logo)
          600: "#0A6A6F",
          700: "#0D565A",
          800: "#114448",
          900: "#123A3D",
          950: "#04211F",
        },
        // ── Brand colour #2 — INK (near-black) ──────────────────────────
        onyx: {
          50: "#F4F6F7",
          100: "#E3E8EB",
          200: "#C7D0D6",
          300: "#9FACB6",
          400: "#71818E",
          500: "#536472",
          600: "#3F4E5B",
          700: "#33404B",
          800: "#222C35",
          900: "#16212B", // ◀ primary ink (from logo)
          950: "#0C141B",
        },
        // ── Neutral — CREAM (warm paper) ────────────────────────────────
        bone: {
          DEFAULT: "#F7F4EF",
          50: "#FCFAF7",
          100: "#F7F4EF",
          200: "#EFE9E0",
          300: "#E1D8C9",
        },
        brand: "rgb(var(--brand) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-bengali)", "Archivo", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "var(--font-bengali)", "Inter", "system-ui", "sans-serif"],
        bengali: ["var(--font-bengali)", "Hind Siliguri", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        widest: "0.28em",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(14,131,136,0.25), 0 18px 50px -12px rgba(14,131,136,0.42)",
        "glow-sm": "0 10px 30px -12px rgba(14,131,136,0.5)",
        "glow-lg": "0 0 80px -10px rgba(14,131,136,0.5)",
        elevated: "0 30px 60px -25px rgba(12,20,27,0.5)",
        card: "0 1px 0 0 rgba(12,20,27,0.04), 0 18px 40px -28px rgba(12,20,27,0.32)",
      },
      backgroundImage: {
        "ember-grad": "linear-gradient(135deg,#2FB4B6 0%,#0E8388 45%,#0D565A 100%)",
        "onyx-grad": "linear-gradient(160deg,#222C35 0%,#0C141B 100%)",
        "grid-faint":
          "linear-gradient(to right, rgba(12,20,27,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(12,20,27,0.045) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 32s linear infinite",
        "marquee-rev": "marquee-rev 32s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.2,1) infinite",
        "spin-slow": "spin-slow 14s linear infinite",
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        jolchap: {
          css: {
            "--tw-prose-body": theme("colors.onyx.700"),
            "--tw-prose-headings": theme("colors.onyx.950"),
            "--tw-prose-links": theme("colors.ember.600"),
            "--tw-prose-bold": theme("colors.onyx.900"),
            "--tw-prose-quotes": theme("colors.onyx.900"),
            "--tw-prose-quote-borders": theme("colors.ember.500"),
            "--tw-prose-bullets": theme("colors.ember.500"),
            "--tw-prose-counters": theme("colors.ember.600"),
            maxWidth: "72ch",
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};

export default config;
