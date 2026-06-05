"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stars } from "@/components/ui/Stars";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

/**
 * "Loved by customers" — an embla carousel of customer testimonials on an
 * onyx stage. Autoplays gently, pauses on interaction, and exposes dot +
 * arrow controls. Each slide is a premium quote card.
 */
export function TestimonialWall({ testimonials }: { testimonials: Testimonial[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", containScroll: "trimSnaps" },
    [Autoplay({ delay: 5200, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden bg-onyx-950 py-20 text-white sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 top-10 h-[460px] w-[460px] rounded-full bg-ember-500/15 blur-[150px]"
        aria-hidden
      />

      <Container className="relative">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            light
            kicker="Loved by customers"
            title={
              <>
                Made with care, <span className="text-gradient-ember">worn proudly.</span>
              </>
            }
            intro="Couples, founders and gift-givers on what it's like to order from Jolchap — every word from a real customer."
            className="max-w-2xl"
          />

          {/* arrow controls */}
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              onClick={scrollPrev}
              aria-label="Previous testimonial"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-ember-500 hover:bg-ember-500"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next testimonial"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-ember-500 hover:bg-ember-500"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* viewport */}
        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="min-w-0 shrink-0 grow-0 basis-full pr-4 sm:basis-1/2 sm:pr-5 lg:basis-1/3"
              >
                <figure className="flex h-full flex-col rounded-3xl bg-onyx-900 p-7 ring-1 ring-white/10">
                  <Quote className="h-8 w-8 text-ember-500" />
                  <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-white/80">
                    {t.quote}
                  </blockquote>

                  <div className="mt-7 flex items-center gap-3.5 border-t border-white/10 pt-6">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="min-w-0">
                      <p className="truncate text-sm font-bold text-white">{t.name}</p>
                      <p className="truncate text-xs text-white/50">
                        {t.role} · {t.location}
                      </p>
                    </figcaption>
                    <div className="ml-auto">
                      <Stars rating={t.rating} size={13} />
                    </div>
                  </div>
                </figure>
              </div>
            ))}
          </div>
        </div>

        {/* dot pagination */}
        <div className="mt-9 flex items-center justify-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={selected === i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                selected === i ? "w-7 bg-ember-500" : "w-2.5 bg-white/25 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
