import { Marquee } from "@/components/ui/Marquee";

/**
 * Slim social-proof strip that sits directly under the hero.
 * Plausible customer & occasion names scroll in a seamless marquee, framed by a
 * "trusted by 8,000+ customers" headline. Intentionally quiet — onyx-on-bone,
 * the ember accent used only as a tiny separator dot.
 */

const CUSTOMERS = [
  "Startup Brands",
  "Wedding Couples",
  "Corporate Gifts",
  "School Merch",
  "Cafés & Restaurants",
  "Event Teams",
  "Online Sellers",
  "Boutiques",
  "Birthday Surprises",
  "NGOs & Clubs",
];

export function BrandStrip() {
  return (
    <section
      aria-label="People & businesses who print with Jolchap"
      className="border-y border-onyx-100 bg-bone-50"
    >
      <div className="container flex flex-col items-center gap-6 py-9 lg:flex-row lg:gap-10 lg:py-7">
        {/* label */}
        <p className="shrink-0 text-center text-[11px] font-semibold uppercase tracking-widest text-onyx-500 lg:max-w-[12rem] lg:text-left">
          Trusted by{" "}
          <span className="font-bold text-onyx-950">8,000+ customers</span> &amp;
          300+ businesses
        </p>

        {/* divider */}
        <span className="hidden h-10 w-px bg-onyx-100 lg:block" aria-hidden />

        {/* scrolling customer & occasion names */}
        <div className="mask-fade-x w-full flex-1">
          <Marquee itemClassName="[animation-duration:46s]">
            {CUSTOMERS.map((name) => (
              <span
                key={name}
                className="flex items-center gap-10 text-base font-bold uppercase tracking-tight text-onyx-400 transition-colors hover:text-onyx-950"
              >
                {name}
                <span className="h-1.5 w-1.5 rounded-full bg-ember-500/60" aria-hidden />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
