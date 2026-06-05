"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Package, Pencil } from "lucide-react";

import type { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { FlagPill } from "./AdminUI";

/**
 * Searchable product table for the admin. Search is client-side over the
 * already-loaded list (name, category, tags) — instant and offline-friendly.
 */
export function ProductsTable({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [p.name, p.categoryName, p.slug, ...p.tags]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [products, query]);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-onyx-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          className="h-11 w-full rounded-xl border border-onyx-200 bg-white pl-10 pr-4 text-sm text-onyx-900 outline-none transition-colors placeholder:text-onyx-300 focus:border-ember-500 focus:ring-2 focus:ring-ember-500/25"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-onyx-100 bg-white shadow-card">
        {/* Desktop table */}
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-onyx-100 text-[11px] font-bold uppercase tracking-widest text-onyx-400">
                <th className="px-5 py-3 font-bold">Product</th>
                <th className="px-3 py-3 font-bold">Category</th>
                <th className="px-3 py-3 font-bold">Price</th>
                <th className="px-3 py-3 font-bold">Stock</th>
                <th className="px-3 py-3 font-bold">Flags</th>
                <th className="px-5 py-3 text-right font-bold">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-onyx-50">
              {filtered.map((p) => (
                <tr key={p.id} className="group transition-colors hover:bg-onyx-50/50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Thumb product={p} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-onyx-900">
                          {p.name}
                        </p>
                        <p className="truncate font-mono text-[11px] text-onyx-400">
                          {p.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-sm text-onyx-600">{p.categoryName}</td>
                  <td className="px-3 py-3">
                    <span className="text-sm font-bold text-onyx-900">
                      {formatPrice(p.price, p.currency)}
                    </span>
                    {p.compareAtPrice && (
                      <span className="ml-1.5 text-xs text-onyx-300 line-through">
                        {formatPrice(p.compareAtPrice, p.currency)}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        p.inStock && p.stockCount > 0 ? "text-onyx-700" : "text-ember-600"
                      )}
                    >
                      {p.inStock && p.stockCount > 0 ? p.stockCount : "Out"}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <Flags product={p} />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-onyx-200 px-3 py-1.5 text-xs font-semibold text-onyx-700 transition-colors hover:border-ember-300 hover:text-ember-600"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-onyx-50 md:hidden">
          {filtered.map((p) => (
            <Link
              key={p.id}
              href={`/admin/products/${p.id}`}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-onyx-50/50"
            >
              <Thumb product={p} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-onyx-900">{p.name}</p>
                <p className="text-xs text-onyx-400">{p.categoryName}</p>
                <div className="mt-1">
                  <Flags product={p} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-onyx-900">
                  {formatPrice(p.price, p.currency)}
                </p>
                <p
                  className={cn(
                    "text-xs",
                    p.inStock && p.stockCount > 0 ? "text-onyx-400" : "text-ember-600"
                  )}
                >
                  {p.inStock && p.stockCount > 0 ? `${p.stockCount} in stock` : "Out of stock"}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="px-5 py-12 text-center text-sm text-onyx-400">
            No products match &ldquo;{query}&rdquo;.
          </p>
        )}
      </div>
    </div>
  );
}

function Thumb({ product }: { product: Product }) {
  const src = product.images[0];
  return (
    <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg bg-onyx-50 ring-1 ring-onyx-100">
      {src ? (
        // Uploaded assets may live on the Supabase domain; plain img avoids
        // next/image remotePatterns config requirements.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <span className="grid h-full w-full place-items-center text-onyx-300">
          <Package className="h-4 w-4" />
        </span>
      )}
    </div>
  );
}

function Flags({ product }: { product: Product }) {
  const flags: { label: string; tone: "ember" | "onyx" | "muted" }[] = [];
  if (product.isFeatured) flags.push({ label: "Featured", tone: "ember" });
  if (product.isNew) flags.push({ label: "New", tone: "onyx" });
  if (product.isBestseller) flags.push({ label: "Bestseller", tone: "muted" });

  if (flags.length === 0) {
    return <span className="text-xs text-onyx-300">—</span>;
  }
  return (
    <div className="flex flex-wrap gap-1">
      {flags.map((f) => (
        <FlagPill key={f.label} label={f.label} tone={f.tone} />
      ))}
    </div>
  );
}
