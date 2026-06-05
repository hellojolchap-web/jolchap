"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  PackageCheck,
  Search,
  SlidersHorizontal,
  Tag,
  X,
} from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { cn, formatPrice } from "@/lib/utils";
import type { Category, Product } from "@/types";

/* ──────────────────────────────────────────────────────────────────────────
   Jolchap — Shop browser
   Client-side faceted catalogue: category, price, in-stock & on-sale filters,
   a six-way sort, instant search, live result count, active-filter chips and
   a sticky desktop sidebar / animated mobile drawer.
   ────────────────────────────────────────────────────────────────────────── */

type SortKey =
  | "featured"
  | "new"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "bestsellers";

const SORTS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "new", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top rated" },
  { value: "bestsellers", label: "Bestsellers" },
];

const SORT_LABEL: Record<SortKey, string> = SORTS.reduce(
  (acc, s) => ({ ...acc, [s.value]: s.label }),
  {} as Record<SortKey, string>
);

export interface ShopInitialState {
  q?: string;
  sort?: string;
  sale?: string;
}

interface ShopBrowserProps {
  products: Product[];
  categories: Category[];
  initial?: ShopInitialState;
}

function normaliseSort(value?: string): SortKey {
  switch (value) {
    case "new":
    case "newest":
      return "new";
    case "price-asc":
    case "price-low":
      return "price-asc";
    case "price-desc":
    case "price-high":
      return "price-desc";
    case "rating":
    case "top-rated":
      return "rating";
    case "bestsellers":
    case "best":
      return "bestsellers";
    default:
      return "featured";
  }
}

export function ShopBrowser({ products, categories, initial }: ShopBrowserProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Only surface categories that actually contain products.
  const shownCategories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) {
      counts.set(p.categorySlug, (counts.get(p.categorySlug) ?? 0) + 1);
    }
    return categories
      .filter((c) => counts.has(c.slug))
      .map((c) => ({ ...c, count: counts.get(c.slug) ?? 0 }));
  }, [products, categories]);

  // Price bounds derived from the live catalogue.
  const priceBounds = useMemo(() => {
    const prices = products.map((p) => p.price);
    const min = Math.floor(Math.min(...prices, 0));
    const max = Math.ceil(Math.max(...prices, 100));
    return { min, max };
  }, [products]);

  /* ── Filter state ── */
  const [query, setQuery] = useState(initial?.q ?? "");
  const [activeCats, setActiveCats] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(priceBounds.max);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(initial?.sale === "true");
  const [sort, setSort] = useState<SortKey>(normaliseSort(initial?.sort));
  const [sortOpen, setSortOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Keep ?q in sync with the URL (shallow, no scroll jump).
  useEffect(() => {
    const handle = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) params.set("q", query.trim());
      else params.delete("q");
      const next = params.toString();
      router.replace(next ? `/shop?${next}` : "/shop", { scroll: false });
    }, 250);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [drawerOpen]);

  const toggleCat = useCallback((slug: string) => {
    setActiveCats((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const clearAll = useCallback(() => {
    setQuery("");
    setActiveCats([]);
    setMaxPrice(priceBounds.max);
    setInStockOnly(false);
    setOnSaleOnly(false);
  }, [priceBounds.max]);

  /* ── Derived list ── */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (activeCats.length && !activeCats.includes(p.categorySlug)) return false;
      if (p.price > maxPrice) return false;
      if (inStockOnly && !p.inStock) return false;
      if (onSaleOnly && !(p.compareAtPrice && p.compareAtPrice > p.price)) return false;
      if (q) {
        const haystack = [
          p.name,
          p.categoryName,
          p.shortDescription,
          ...p.tags,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating || b.reviewCount - a.reviewCount;
        case "new":
          return Number(b.isNew) - Number(a.isNew) || b.reviewCount - a.reviewCount;
        case "bestsellers":
          return (
            Number(b.isBestseller) - Number(a.isBestseller) ||
            b.reviewCount - a.reviewCount
          );
        case "featured":
        default:
          return (
            Number(b.isFeatured) - Number(a.isFeatured) ||
            b.rating - a.rating
          );
      }
    });

    return list;
  }, [products, activeCats, maxPrice, inStockOnly, onSaleOnly, query, sort]);

  const activeFilterCount =
    activeCats.length +
    (inStockOnly ? 1 : 0) +
    (onSaleOnly ? 1 : 0) +
    (maxPrice < priceBounds.max ? 1 : 0) +
    (query.trim() ? 1 : 0);

  /* ── Reusable facet panel (shared by sidebar + drawer) ── */
  const Facets = (
    <div className="space-y-8">
      {/* search */}
      <FacetGroup label="Search">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-onyx-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Stamps, mugs, t-shirts…"
            className="h-11 w-full rounded-full border border-onyx-200 bg-white pl-10 pr-4 text-sm text-onyx-900 outline-none transition-colors placeholder:text-onyx-400 focus:border-onyx-950"
          />
        </div>
      </FacetGroup>

      {/* category */}
      <FacetGroup label="Category">
        <ul className="space-y-1">
          {shownCategories.map((c) => {
            const checked = activeCats.includes(c.slug);
            return (
              <li key={c.slug}>
                <button
                  onClick={() => toggleCat(c.slug)}
                  className="group flex w-full items-center justify-between rounded-xl px-2 py-2 text-left transition-colors hover:bg-onyx-50"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid h-5 w-5 place-items-center rounded-md border transition-colors",
                        checked
                          ? "border-ember-500 bg-ember-500 text-white"
                          : "border-onyx-300 bg-white text-transparent group-hover:border-onyx-400"
                      )}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        checked ? "text-onyx-950" : "text-onyx-600"
                      )}
                    >
                      {c.name}
                    </span>
                  </span>
                  <span className="text-xs font-medium text-onyx-400">{c.count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </FacetGroup>

      {/* price */}
      <FacetGroup label="Max price">
        <div className="px-2">
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            step={1}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="brand-range w-full"
            aria-label="Maximum price"
          />
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-onyx-400">{formatPrice(priceBounds.min, "USD")}</span>
            <span className="font-bold text-onyx-950">
              Up to {formatPrice(maxPrice, "USD")}
            </span>
          </div>
        </div>
      </FacetGroup>

      {/* toggles */}
      <FacetGroup label="Availability">
        <div className="space-y-2">
          <ToggleRow
            label="In stock only"
            icon={<PackageCheck className="h-4 w-4" />}
            checked={inStockOnly}
            onChange={() => setInStockOnly((v) => !v)}
          />
          <ToggleRow
            label="On sale"
            icon={<Tag className="h-4 w-4" />}
            checked={onSaleOnly}
            onChange={() => setOnSaleOnly((v) => !v)}
          />
        </div>
      </FacetGroup>
    </div>
  );

  return (
    <div className="container py-12 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[270px_1fr] xl:grid-cols-[290px_1fr]">
        {/* ── Desktop sidebar ── */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-onyx-950">
                Filters
              </h2>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs font-semibold text-ember-600 hover:text-ember-700"
                >
                  Clear all
                </button>
              )}
            </div>
            {Facets}
          </div>
        </aside>

        {/* ── Results column ── */}
        <div className="min-w-0">
          {/* toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-onyx-500">
              <span className="font-bold text-onyx-950">{results.length}</span>{" "}
              {results.length === 1 ? "product" : "products"}
              {query.trim() && (
                <>
                  {" "}
                  for{" "}
                  <span className="font-semibold text-onyx-950">
                    &ldquo;{query.trim()}&rdquo;
                  </span>
                </>
              )}
            </p>

            <div className="flex items-center gap-3">
              {/* mobile filter trigger */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-onyx-200 bg-white px-4 py-2 text-sm font-semibold text-onyx-900 transition-colors hover:border-onyx-950 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-ember-500 px-1 text-[11px] font-bold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* sort */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  onBlur={() => setTimeout(() => setSortOpen(false), 120)}
                  className="inline-flex items-center gap-2 rounded-full border border-onyx-200 bg-white px-4 py-2 text-sm font-semibold text-onyx-900 transition-colors hover:border-onyx-950"
                  aria-haspopup="listbox"
                  aria-expanded={sortOpen}
                >
                  <span className="text-onyx-400">Sort:</span>
                  {SORT_LABEL[sort]}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      sortOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {sortOpen && (
                    <motion.ul
                      role="listbox"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16 }}
                      className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-2xl border border-onyx-100 bg-white p-1.5 shadow-elevated"
                    >
                      {SORTS.map((s) => (
                        <li key={s.value}>
                          <button
                            onClick={() => {
                              setSort(s.value);
                              setSortOpen(false);
                            }}
                            className={cn(
                              "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-onyx-50",
                              sort === s.value
                                ? "font-bold text-onyx-950"
                                : "font-medium text-onyx-600"
                            )}
                          >
                            {s.label}
                            {sort === s.value && (
                              <Check className="h-4 w-4 text-ember-500" />
                            )}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* active chips */}
          {activeFilterCount > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {activeCats.map((slug) => {
                const cat = shownCategories.find((c) => c.slug === slug);
                return (
                  <Chip key={slug} onClear={() => toggleCat(slug)}>
                    {cat?.name ?? slug}
                  </Chip>
                );
              })}
              {maxPrice < priceBounds.max && (
                <Chip onClear={() => setMaxPrice(priceBounds.max)}>
                  Under {formatPrice(maxPrice, "USD")}
                </Chip>
              )}
              {inStockOnly && (
                <Chip onClear={() => setInStockOnly(false)}>In stock</Chip>
              )}
              {onSaleOnly && <Chip onClear={() => setOnSaleOnly(false)}>On sale</Chip>}
              {query.trim() && (
                <Chip onClear={() => setQuery("")}>&ldquo;{query.trim()}&rdquo;</Chip>
              )}
              <button
                onClick={clearAll}
                className="ml-1 text-xs font-semibold text-onyx-400 underline-offset-2 hover:text-ember-600 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          {/* grid */}
          {results.length > 0 ? (
            <motion.div
              layout
              className="mt-8 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {results.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, delay: Math.min(i, 8) * 0.025 }}
                  >
                    <ProductCard product={product} priority={i < 4} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <EmptyState onReset={clearAll} />
          )}
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 z-[130] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label="Close filters"
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-onyx-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-bone shadow-elevated"
            >
              <header className="flex items-center justify-between border-b border-onyx-100 px-5 py-4">
                <h2 className="flex items-center gap-2 text-lg font-bold text-onyx-950">
                  <SlidersHorizontal className="h-5 w-5 text-ember-500" />
                  Filters
                </h2>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close filters"
                  className="grid h-10 w-10 place-items-center rounded-full text-onyx-500 hover:bg-onyx-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </header>
              <div className="flex-1 overflow-y-auto px-5 py-6">{Facets}</div>
              <footer className="flex items-center gap-3 border-t border-onyx-100 bg-white px-5 py-4">
                <button
                  onClick={clearAll}
                  className="h-12 flex-1 rounded-full border border-onyx-200 text-sm font-semibold text-onyx-900 transition-colors hover:border-onyx-950"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="h-12 flex-[1.4] rounded-full bg-ember-500 text-sm font-bold text-white shadow-glow-sm transition-colors hover:bg-ember-600"
                >
                  Show {results.length} {results.length === 1 ? "result" : "results"}
                </button>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Small building blocks ── */

function FacetGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-onyx-400">
        {label}
      </h3>
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  icon,
  checked,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left transition-colors hover:bg-onyx-50"
    >
      <span className="flex items-center gap-3">
        <span
          className={cn(
            "transition-colors",
            checked ? "text-ember-500" : "text-onyx-400"
          )}
        >
          {icon}
        </span>
        <span
          className={cn(
            "text-sm font-medium",
            checked ? "text-onyx-950" : "text-onyx-600"
          )}
        >
          {label}
        </span>
      </span>
      <span
        className={cn(
          "relative h-5 w-9 rounded-full transition-colors",
          checked ? "bg-ember-500" : "bg-onyx-200"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all",
            checked ? "left-[18px]" : "left-0.5"
          )}
        />
      </span>
    </button>
  );
}

function Chip({
  children,
  onClear,
}: {
  children: React.ReactNode;
  onClear: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-onyx-200 bg-white py-1 pl-3 pr-1.5 text-xs font-semibold text-onyx-800">
      {children}
      <button
        onClick={onClear}
        aria-label="Remove filter"
        className="grid h-5 w-5 place-items-center rounded-full text-onyx-400 transition-colors hover:bg-ember-500 hover:text-white"
      >
        <X className="h-3 w-3" strokeWidth={2.5} />
      </button>
    </span>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-onyx-200 bg-white/60 px-6 py-20 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-onyx-50 ring-1 ring-onyx-100">
        <Search className="h-7 w-7 text-onyx-400" />
      </div>
      <h3 className="mt-5 text-xl font-extrabold text-onyx-950">Nothing matches that</h3>
      <p className="mt-2 max-w-sm text-sm text-onyx-500">
        Try widening your price range or clearing a filter — the rest of the collection is
        just a tweak away.
      </p>
      <button
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-onyx-950 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-onyx-800"
      >
        Clear all filters
      </button>
    </div>
  );
}
