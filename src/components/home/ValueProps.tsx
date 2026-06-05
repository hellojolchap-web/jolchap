import { PencilRuler, Stamp, BadgeCheck, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "Why Jolchap" — four brand pillars as editorial cards. Restrained palette:
 * onyx cards on bone, the ember accent reserved for the icon and a hairline
 * top-rule that draws on hover.
 */

const PILLARS = [
  {
    icon: PencilRuler,
    title: "Free design preview",
    copy: "Send your logo, photo or idea and we'll mock it up first. You approve exactly how it looks before any money changes hands.",
    stat: "See it before you pay",
  },
  {
    icon: Stamp,
    title: "Made to order in Dhaka",
    copy: "Every stamp, tee, mug and gift is produced right here in our Dhaka studio — printed and finished by hand for your order alone.",
    stat: "Crafted locally, just for you",
  },
  {
    icon: BadgeCheck,
    title: "Quality guaranteed",
    copy: "We quality-check every item before it leaves us. If the print isn't right, we reprint it — no fine print, no fuss.",
    stat: "Satisfaction guaranteed",
  },
  {
    icon: Truck,
    title: "Fast nationwide delivery",
    copy: "Free delivery inside Dhaka and quick, reliable courier to every district in Bangladesh — with cash on delivery available.",
    stat: "Dhaka & all 64 districts",
  },
] as const;

export function ValueProps() {
  return (
    <section className="section relative overflow-hidden bg-bone">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden />
      <Container className="relative">
        <SectionHeading
          align="center"
          kicker="Why Jolchap"
          title={
            <>
              Personal, made <span className="text-gradient-ember">simple.</span>
            </>
          }
          intro="No templates, no guesswork. Just thoughtful custom work by people who love a good print — and stand behind every order."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 0.08}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-7 shadow-card ring-1 ring-onyx-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
            >
              {/* ember top-rule grows on hover */}
              <span className="absolute inset-x-0 top-0 h-[3px] w-0 bg-ember-500 transition-all duration-500 group-hover:w-full" />

              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-onyx-950 text-white transition-colors duration-300 group-hover:bg-ember-500">
                <pillar.icon className="h-7 w-7" strokeWidth={1.75} />
              </span>

              <h3 className="mt-6 text-xl font-extrabold uppercase tracking-tight text-onyx-950">
                {pillar.title}
              </h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-onyx-500">
                {pillar.copy}
              </p>

              <p className="mt-6 border-t border-onyx-100 pt-4 text-[11px] font-semibold uppercase tracking-widest text-onyx-400">
                {pillar.stat}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
