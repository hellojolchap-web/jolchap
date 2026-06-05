"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

/**
 * "Most loved" — the home page's product wall. A lightweight tab switcher
 * filters the curated set (All / Bestsellers / New) client-side; the parent
 * passes pre-deduped lists so we never refetch. Caps at 8 tiles for rhythm.
 */

type TabId = "all" | "bestsellers" | "new";

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "bestsellers", label: "Bestsellers" },
  { id: "new", label: "New In" },
];

const LIMIT = 8;

export function FeaturedProducts({ products }: { products: Product[] }) {
  const [tab, setTab] = useState<TabId>("all");
  const reduce = useReducedMotion();

  const visible = useMemo(() => {
    const filtered =
      tab === "bestsellers"
        ? products.filter((p) => p.isBestseller)
        : tab === "new"
          ? products.filter((p) => p.isNew)
          : products;
    // never render an empty grid — fall back to the full set
    return (filtered.length ? filtered : products).slice(0, LIMIT);
  }, [products, tab]);

  return (
    <section className="section bg-bone">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            kicker="Most loved"
            title={
              <>
                The pieces customers <span className="text-gradient-ember">adore.</span>
              </>
            }
            intro="Hand-picked from the Jolchap catalogue — the products people personalise again and again."
            className="max-w-2xl"
          />

          {/* segmented tab control */}
          <div className="inline-flex shrink-0 self-start rounded-full border border-onyx-200 bg-white p-1 shadow-card lg:self-end">
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  aria-pressed={active}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5",
                    active ? "text-white" : "text-onyx-500 hover:text-onyx-900"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="arsenal-tab"
                      className="absolute inset-0 rounded-full bg-onyx-950"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((product, i) => (
              <motion.div
                key={product.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={product} priority={i < 4} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-14 flex justify-center">
          <Button href="/shop" variant="outline" size="lg">
            View all products
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
