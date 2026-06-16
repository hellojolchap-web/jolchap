/* ──────────────────────────────────────────────────────────────────────────
   Brand theming engine.

   The whole UI keys off the `ember` accent scale (ember-50 … ember-950). Those
   shades are exposed as CSS variables (`--ember-50` … `--ember-950`, in "R G B"
   channel form for Tailwind's `<alpha-value>` support). The admin picks ONE
   accent colour; we derive a full, balanced scale from it and inject the
   variables at the document root — so every `bg-ember-*`, `text-ember-*`,
   `ring-ember-*` re-themes instantly, site-wide.
   ────────────────────────────────────────────────────────────────────────── */

export const ACCENT_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
export type AccentStep = (typeof ACCENT_STEPS)[number];

/** The default Jol-teal accent (matches the original design exactly). */
export const DEFAULT_ACCENT = "#0E8388";

/** Default scale as "R G B" channel strings — used as the CSS fallback. */
export const DEFAULT_ACCENT_SCALE: Record<AccentStep, string> = {
  50: "236 251 250",
  100: "207 243 242",
  200: "162 231 230",
  300: "103 210 210",
  400: "47 180 182",
  500: "14 131 136",
  600: "10 106 111",
  700: "13 86 90",
  800: "17 68 72",
  900: "18 58 61",
  950: "4 33 31",
};

/* ── colour math ─────────────────────────────────────────────────────────── */

function clamp(n: number, lo = 0, hi = 1): number {
  return Math.min(hi, Math.max(lo, n));
}

/** Parse #rgb / #rrggbb → {r,g,b} (0-255). Returns null when unparseable. */
export function parseHex(hex: string): { r: number; g: number; b: number } | null {
  if (typeof hex !== "string") return null;
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return { h, s, l };
}

function hslToChannels(h: number, s: number, l: number): string {
  s = clamp(s);
  l = clamp(l);
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return `${Math.round((r + m) * 255)} ${Math.round((g + m) * 255)} ${Math.round((b + m) * 255)}`;
}

// How far each step's lightness moves from the picked colour toward white (tints)
// or toward near-black (shades). 500 stays exactly as picked.
const TINT_TO_WHITE: Record<number, number> = { 50: 0.92, 100: 0.82, 200: 0.64, 300: 0.44, 400: 0.2 };
const SHADE_TO_DARK: Record<number, number> = { 600: 0.18, 700: 0.34, 800: 0.48, 900: 0.58, 950: 0.78 };

/**
 * Build a full ember scale (as "R G B" channel strings) from one accent hex.
 * Keeps the picked colour as the 500 anchor and derives balanced tints/shades.
 */
export function deriveAccentScale(hex: string): Record<AccentStep, string> {
  const rgb = parseHex(hex);
  if (!rgb) return { ...DEFAULT_ACCENT_SCALE };
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const out = {} as Record<AccentStep, string>;
  for (const step of ACCENT_STEPS) {
    if (step === 500) {
      out[step] = hslToChannels(h, s, l);
    } else if (step < 500) {
      const t = TINT_TO_WHITE[step];
      const nl = l + (0.97 - l) * t;
      // ease saturation down for the lightest tints so they don't read neon
      const ns = step <= 100 ? s * 0.7 : s * 0.9;
      out[step] = hslToChannels(h, ns, nl);
    } else {
      const t = SHADE_TO_DARK[step];
      const nl = l + (0.1 - l) * t;
      out[step] = hslToChannels(h, Math.min(1, s * 1.02), nl);
    }
  }
  return out;
}

/**
 * Inline CSS that overrides the accent scale at :root. Empty string when the
 * accent equals the default (no override needed → smaller HTML).
 */
export function accentStyle(hex: string | undefined | null): string {
  if (!hex || hex.toUpperCase() === DEFAULT_ACCENT.toUpperCase() || !parseHex(hex)) return "";
  const scale = deriveAccentScale(hex);
  const vars = ACCENT_STEPS.map((s) => `--ember-${s}:${scale[s]}`).join(";");
  return `:root{${vars}}`;
}
