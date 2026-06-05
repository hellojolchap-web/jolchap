"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

/* ──────────────────────────────────────────────────────────────────────────
   Product tabs — Description (rich HTML) and Specifications (table).
   Reviews live in their own always-visible section (see ProductReviews).
   ────────────────────────────────────────────────────────────────────────── */

type TabKey = "description" | "specs";

export function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<TabKey>("description");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "description", label: "Description" },
    { key: "specs", label: "Specifications" },
  ];

  return (
    <section className="mt-20">
      <div className="relative flex gap-1 overflow-x-auto border-b border-onyx-100">
        {tabs.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "relative whitespace-nowrap px-5 py-4 text-sm font-bold uppercase tracking-wide transition-colors",
                active ? "text-onyx-950" : "text-onyx-400 hover:text-onyx-700"
              )}
            >
              {t.label}
              {active && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-ember-500"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="py-10">
        {tab === "description" && <DescriptionPanel product={product} />}
        {tab === "specs" && <SpecsPanel product={product} />}
      </div>
    </section>
  );
}

function DescriptionPanel({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="grid gap-12 lg:grid-cols-[1.4fr_1fr]"
    >
      <div
        className="prose prose-jolchap max-w-none"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
      {product.features.length > 0 && (
        <aside className="h-fit rounded-3xl bg-onyx-950 p-7 text-white lg:sticky lg:top-28">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-ember-400">
            Built with
          </h3>
          <ul className="mt-5 space-y-3.5">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-white/85">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-ember-500" />
                {f}
              </li>
            ))}
          </ul>
        </aside>
      )}
    </motion.div>
  );
}

function SpecsPanel({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-2xl"
    >
      {product.specs.length > 0 ? (
        <dl className="overflow-hidden rounded-2xl ring-1 ring-onyx-100">
          {product.specs.map((spec, i) => (
            <div
              key={spec.label}
              className={cn(
                "grid grid-cols-2 gap-4 px-5 py-4 sm:grid-cols-[200px_1fr]",
                i % 2 === 0 ? "bg-white" : "bg-onyx-50"
              )}
            >
              <dt className="text-sm font-semibold text-onyx-500">{spec.label}</dt>
              <dd className="text-sm font-bold text-onyx-950">{spec.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="text-onyx-500">Specifications coming soon.</p>
      )}

      <p className="mt-6 text-xs text-onyx-400">
        Measurements are approximate and may vary slightly by colourway and batch. Questions
        on fit or spec? Our team answers in minutes on WhatsApp.
      </p>
    </motion.div>
  );
}
