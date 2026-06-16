import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/* ──────────────────────────────────────────────────────────────────────────
   Jolchap identity — a stamp seal cradling a water-drop:
   জল (water-drop) + ছাপ (stamp / imprint).
   The default tone is themed via CSS variables, so the mark re-colours when the
   admin changes the brand accent. A custom uploaded logo image overrides it.
   ────────────────────────────────────────────────────────────────────────── */

type Tone = "default" | "light" | "invert";

interface MarkProps {
  className?: string;
  badge?: boolean;
  tone?: Tone;
  title?: string;
}

const DROP_PATH = "M50 28C57.5 41 64.5 48 64.5 57.5A14.5 14.5 0 1 1 35.5 57.5C35.5 48 42.5 41 50 28Z";

/** The seal + drop mark on its own (favicons, loaders, compact spots). */
export function JolchapMark({
  className,
  badge = true,
  tone = "default",
  title = "Jolchap",
}: MarkProps) {
  // Default tone re-themes with the brand accent (CSS-var driven Tailwind fills).
  if (tone === "default") {
    return (
      <svg
        viewBox="0 0 100 100"
        className={cn("h-9 w-9", className)}
        role="img"
        aria-label={title}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {badge && <circle cx="50" cy="50" r="48" className="fill-onyx-900" />}
        <circle cx="50" cy="50" r="43" fill="none" className="stroke-ember-400" strokeWidth="1.4" opacity="0.45" />
        <circle
          cx="50"
          cy="50"
          r="39"
          fill="none"
          className="stroke-ember-400"
          strokeWidth="2.4"
          strokeDasharray="2.6 4.2"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path d={DROP_PATH} className="fill-ember-500" />
        <ellipse
          cx="44.5"
          cy="54"
          rx="2.6"
          ry="4.2"
          transform="rotate(-22 44.5 54)"
          className="fill-ember-300"
          opacity="0.75"
        />
      </svg>
    );
  }

  // Fixed-colour tones for dark/light surfaces.
  const drop = tone === "invert" ? "#16212B" : "#0E8388";
  const dropHi = tone === "invert" ? "#536472" : "#2FB4B6";
  const ring = tone === "light" ? "#0E8388" : "#16212B";
  const badgeFill = tone === "light" ? "#F7F4EF" : "#16212B";

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("h-9 w-9", className)}
      role="img"
      aria-label={title}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {badge && <circle cx="50" cy="50" r="48" fill={badgeFill} />}
      <circle cx="50" cy="50" r="43" fill="none" stroke={ring} strokeWidth="1.4" opacity="0.45" />
      <circle
        cx="50"
        cy="50"
        r="39"
        fill="none"
        stroke={ring}
        strokeWidth="2.4"
        strokeDasharray="2.6 4.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path d={DROP_PATH} fill={drop} />
      <ellipse cx="44.5" cy="54" rx="2.6" ry="4.2" transform="rotate(-22 44.5 54)" fill={dropHi} opacity="0.75" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  withWordmark?: boolean;
  withTagline?: boolean;
  tone?: Tone;
  badge?: boolean;
  markClassName?: string;
  /** animate the wordmark with the brand colour flow */
  animated?: boolean;
  /** Brand name (defaults to the built-in name). */
  name?: string;
  /** Optional uploaded logo image — replaces the seal + wordmark when set. */
  logoUrl?: string;
}

/** Full horizontal lockup: seal mark + wordmark (+ optional tagline). */
export function Logo({
  className,
  withWordmark = true,
  withTagline = false,
  tone = "default",
  badge = true,
  markClassName,
  animated = false,
  name = siteConfig.name,
  logoUrl,
}: LogoProps) {
  const text = tone === "light" ? "text-white" : "text-onyx-950";
  const sub = tone === "light" ? "text-white/55" : "text-onyx-400";

  // A custom uploaded logo image replaces the entire lockup.
  if (logoUrl) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt={name}
          className={cn("h-9 w-auto max-w-[180px] object-contain", markClassName)}
        />
      </span>
    );
  }

  const isJolchap = name.trim().toLowerCase() === "jolchap";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <JolchapMark badge={badge} tone={tone} title={name} className={cn("h-9 w-9", markClassName)} />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.5rem] font-extrabold uppercase tracking-tightest",
              animated ? "text-ember-flow" : text
            )}
          >
            {animated || !isJolchap ? (
              name
            ) : (
              <>
                Jol<span className="text-ember-500">chap</span>
              </>
            )}
          </span>
          {withTagline && (
            <span className={cn("mt-1 text-[9px] font-semibold uppercase tracking-[0.32em]", sub)}>
              Custom Print &amp; Gifts
            </span>
          )}
        </span>
      )}
    </span>
  );
}
