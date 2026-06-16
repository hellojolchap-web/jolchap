import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/brand/BrandMark";
import { mainNav } from "@/config/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-bone">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-ember-500/15 blur-[130px]" />

      <Container className="relative flex min-h-[72vh] flex-col items-center justify-center py-20 text-center sm:py-28">
        <BrandMark className="h-14 w-14" />

        <p className="text-ember-flow mt-8 font-display text-[110px] font-extrabold leading-none tracking-tightest sm:text-[170px]">
          404
        </p>

        <h1 className="mt-1 text-3xl font-extrabold uppercase tracking-tightest text-onyx-950 sm:text-4xl">
          Hmm, nothing here.
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-onyx-500">
          The page you&apos;re looking for may have moved, sold out, or never existed.
          Let&apos;s get you back on track.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" size="lg">
            <Home className="h-4 w-4" />
            Back to home
          </Button>
          <Button href="/shop" variant="outline" size="lg">
            Shop all gear
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>

        <div className="mt-14 w-full max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-onyx-400">
            Popular destinations
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {mainNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full border border-onyx-200 bg-white px-4 py-2 text-sm font-semibold text-onyx-700 transition-all hover:border-ember-500 hover:bg-ember-500 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
