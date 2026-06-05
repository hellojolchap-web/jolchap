"use client";

import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * Bold metrics band. Onyx surface with an ember wash; each numeral counts up
 * once when the band scrolls into view (respecting reduced-motion). Pure
 * social proof, set in heavy display type.
 */

type Stat = {
  /** numeric target for the count-up */
  value: number;
  /** characters appended after the number, e.g. "+", "★", "k" */
  suffix?: string;
  /** characters shown before the number */
  prefix?: string;
  /** keep one decimal place (used for the 4.9 rating) */
  decimal?: boolean;
  label: string;
};

const STATS: Stat[] = [
  { value: 8, suffix: "k+", label: "Happy customers" },
  { value: 50, suffix: "k+", label: "Items printed" },
  { value: 4.9, decimal: true, suffix: "★", label: "Average rating" },
  { value: 48, suffix: "hr", label: "Typical turnaround" },
];

function Counter({ stat }: { stat: Stat }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1600, bounce: 0 });
  const [display, setDisplay] = useState(reduce ? stat.value : 0);

  useEffect(() => {
    if (inView && !reduce) motionValue.set(stat.value);
  }, [inView, reduce, motionValue, stat.value]);

  useEffect(() => {
    if (reduce) return;
    return spring.on("change", (latest) => setDisplay(latest));
  }, [spring, reduce]);

  const formatted = stat.decimal
    ? display.toFixed(1)
    : Math.round(display).toLocaleString("en-US");

  return (
    <span ref={ref}>
      {stat.prefix}
      {formatted}
      {stat.suffix}
    </span>
  );
}

export function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-onyx-950 text-white">
      {/* ember wash + grain */}
      <div className="pointer-events-none absolute inset-0 bg-ember-grad opacity-[0.14]" aria-hidden />
      <div className="noise pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-ember-500/20 blur-[140px]"
        aria-hidden
      />

      <Container className="relative py-16 lg:py-20">
        <dl className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={
                "flex flex-col items-center text-center" +
                (i < STATS.length - 1 ? " lg:border-r lg:border-white/10" : "")
              }
            >
              <dd className="text-5xl font-extrabold uppercase tracking-tightest text-white sm:text-6xl lg:text-7xl">
                <Counter stat={stat} />
              </dd>
              <dt className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-white/55 sm:text-xs">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
