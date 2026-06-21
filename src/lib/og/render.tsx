import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/* ──────────────────────────────────────────────────────────────────────────
   Shared dynamic Open Graph card (1200×630 PNG) used by every
   `opengraph-image` route, so any page shared on Facebook / WhatsApp / etc.
   gets a beautiful, on-brand, per-page preview. Pure flexbox + text (no image
   decoding) so it renders reliably in satori.
   ────────────────────────────────────────────────────────────────────────── */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const INK = "#0C141B";
const INK2 = "#16212B";
const TEAL = "#0E8388";
const TEAL_LIGHT = "#2FB4B6";
const TEAL_BRIGHT = "#3FD0CE";

// Footer host derived from the configured site URL, so cards always show the
// real domain (set NEXT_PUBLIC_SITE_URL to your production origin).
const OG_HOST = (() => {
  try {
    return new URL(siteConfig.url).host;
  } catch {
    return "jolchap.com.bd";
  }
})();

async function loadFonts() {
  // Read the bundled woff files from disk (works during prerender + on the
  // Node serverless runtime; the files are traced in via next.config).
  const dir = join(process.cwd(), "src", "lib", "og");
  const [bold, medium] = await Promise.all([
    readFile(join(dir, "inter-700.woff")),
    readFile(join(dir, "inter-500.woff")),
  ]);
  return [
    { name: "Inter", data: bold, weight: 700 as const, style: "normal" as const },
    { name: "Inter", data: medium, weight: 500 as const, style: "normal" as const },
  ];
}

interface OgInput {
  eyebrow?: string;
  title: string;
  chip?: string;
  footer?: string;
}

export async function renderOgImage({ eyebrow, title, chip, footer }: OgInput) {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px",
          backgroundColor: INK,
          backgroundImage: `linear-gradient(135deg, ${INK2} 0%, ${INK} 55%, #05080B 100%)`,
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        {/* teal accent corner */}
        <div
          style={{
            position: "absolute",
            top: "-160px",
            right: "-120px",
            width: "520px",
            height: "520px",
            borderRadius: "9999px",
            backgroundColor: TEAL,
            opacity: 0.22,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
            width: "100%",
            height: "8px",
            backgroundColor: TEAL,
          }}
        />

        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "66px",
              height: "66px",
              borderRadius: "9999px",
              border: `4px solid ${TEAL_LIGHT}`,
            }}
          >
            <div
              style={{
                width: "26px",
                height: "30px",
                borderRadius: "50% 50% 50% 50% / 65% 65% 35% 35%",
                backgroundColor: TEAL,
              }}
            />
          </div>
          <div
            style={{
              marginLeft: "20px",
              fontSize: "34px",
              fontWeight: 700,
              letterSpacing: "2px",
              color: "#FFFFFF",
            }}
          >
            JOLCHAP
          </div>
          <div
            style={{
              marginLeft: "20px",
              fontSize: "20px",
              fontWeight: 500,
              color: TEAL_LIGHT,
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>

        {/* title block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: TEAL_BRIGHT,
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "5px",
                  backgroundColor: TEAL,
                  marginRight: "16px",
                }}
              />
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: title.length > 48 ? "62px" : "76px",
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#FFFFFF",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
        </div>

        {/* footer row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {chip ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: TEAL,
                  color: "#FFFFFF",
                  fontSize: "26px",
                  fontWeight: 700,
                  padding: "12px 26px",
                  borderRadius: "9999px",
                }}
              >
                {chip}
              </div>
            ) : null}
          </div>
          <div style={{ fontSize: "24px", fontWeight: 500, color: "#9FACB6" }}>
            {footer ?? OG_HOST}
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts }
  );
}
