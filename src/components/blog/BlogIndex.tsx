"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Layers } from "lucide-react";

import { BlogCard } from "@/components/blog/BlogCard";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState<string>("All");
  const prefersReduced = useReducedMotion();

  const categories = useMemo<string[]>(() => {
    const seen = new Set<string>();
    posts.forEach((p) => seen.add(p.category));
    return ["All", ...Array.from(seen).sort()];
  }, [posts]);

  const filtered = useMemo(
    () => (active === "All" ? posts : posts.filter((p) => p.category === active)),
    [posts, active]
  );

  return (
    <div>
      {/* ── Category filter pills ──────────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Filter articles by category"
        className="mb-10 flex flex-wrap gap-2"
      >
        {categories.map((cat) => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bone",
                isActive
                  ? "bg-ember-500 text-white shadow-glow-sm"
                  : "bg-onyx-950/5 text-onyx-600 hover:bg-onyx-950/10 hover:text-onyx-900"
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Results grid ──────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4 py-24 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-onyx-100">
              <Layers className="h-7 w-7 text-onyx-400" />
            </div>
            <p className="text-lg font-semibold text-onyx-700">No articles yet</p>
            <p className="max-w-xs text-sm text-onyx-400">
              Nothing in this category right now — check back soon or browse all articles.
            </p>
            <button
              onClick={() => setActive("All")}
              className="mt-2 text-sm font-semibold text-ember-600 underline-offset-2 hover:underline"
            >
              Show all articles
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={active}
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: Math.min(i * 0.07, 0.35),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <BlogCard post={post} priority={i < 3} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Result count footnote ─────────────────────────────────── */}
      <p className="mt-12 text-sm text-onyx-400">
        {filtered.length === 1
          ? "1 article"
          : `${filtered.length} articles`}
        {active !== "All" && (
          <>
            {" "}in{" "}
            <span className="font-medium text-onyx-600">{active}</span>
          </>
        )}
      </p>
    </div>
  );
}
