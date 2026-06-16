import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BrandMark } from "@/components/brand/BrandMark";

/**
 * Closing call-to-action. A full-bleed onyx panel over a lifestyle image,
 * ember-washed and grained, with one warm headline and CTA. The last thing on
 * the page should feel like an invitation, not a footer.
 */
export function FinalCta() {
  return (
    <section className="section bg-bone">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-onyx-950 px-6 py-20 text-center text-white shadow-elevated sm:px-12 sm:py-24 lg:py-32">
          {/* background image */}
          <Image
            src="/images/about/cta.webp"
            alt=""
            fill
            sizes="(max-width:1320px) 100vw, 1320px"
            className="object-cover opacity-30"
          />
          {/* tone + texture */}
          <div className="absolute inset-0 bg-gradient-to-b from-onyx-950/70 via-onyx-950/85 to-onyx-950" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-ember-grad opacity-[0.12]" aria-hidden />
          <div className="noise pointer-events-none absolute inset-0" aria-hidden />
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-ember-500/25 blur-[140px]"
            aria-hidden
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <BrandMark badge={false} className="h-12 w-12" />

            <h2 className="mt-7 text-balance text-4xl font-extrabold uppercase leading-[0.92] tracking-tightest text-white sm:text-6xl lg:text-7xl">
              Bring your idea to life.
              <br />
              <span className="text-gradient-ember">Make it yours.</span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
              Free design preview, quality guaranteed, fast delivery across Bangladesh.
              Whatever you're dreaming up — let's print it together.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button href="/shop" variant="primary" size="lg">
                Start customising
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
              <Button href="/about" variant="light" size="lg">
                Our story
              </Button>
            </div>

            <p className="mt-8 text-[11px] font-semibold uppercase tracking-widest text-white/40">
              Free design preview · Quality guaranteed · Nationwide delivery
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
