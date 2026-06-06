"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save, Trash2 } from "lucide-react";
import slugify from "slugify";
import { toast } from "sonner";

import type { Product } from "@/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  type ProductInput,
} from "@/app/admin/actions";
import {
  Field,
  FormSection,
  Toggle,
  StringListEditor,
  PairListEditor,
  fieldInput,
  fieldArea,
} from "./FormKit";
import { ImageUploader } from "./ImageUploader";
import { RichTextField } from "./RichTextField";
import { NotConfiguredNotice } from "./AdminUI";
import { cn } from "@/lib/utils";

/** The six storefront categories (slug + display name). */
const CATEGORIES: { slug: string; name: string }[] = [
  { slug: "seals-stamps", name: "Seals & Stamps" },
  { slug: "apparel", name: "Custom Apparel" },
  { slug: "drinkware", name: "Mugs & Bottles" },
  { slug: "bags", name: "Bags" },
  { slug: "gifts", name: "Personalised Gifts" },
  { slug: "stationery", name: "Business & Stationery" },
];

type Mode = "create" | "edit";

interface State {
  id: string;
  slug: string;
  slugTouched: boolean;
  name: string;
  categorySlug: string;
  price: string;
  compareAtPrice: string;
  currency: string;
  badge: string;
  shortDescription: string;
  description: string;
  features: string[];
  specs: { a: string; b: string }[];
  colors: { a: string; b: string }[];
  sizes: string;
  tags: string;
  images: string[];
  stockCount: string;
  inStock: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
}

function initialState(initial?: Product): State {
  return {
    id: initial?.id ?? "",
    slug: initial?.slug ?? "",
    slugTouched: Boolean(initial?.slug),
    name: initial?.name ?? "",
    categorySlug: initial?.categorySlug ?? CATEGORIES[0].slug,
    price: initial ? String(initial.price) : "",
    compareAtPrice: initial?.compareAtPrice != null ? String(initial.compareAtPrice) : "",
    currency: initial?.currency ?? "BDT",
    badge: initial?.badge ?? "",
    shortDescription: initial?.shortDescription ?? "",
    description: initial?.description ?? "",
    features: initial?.features.length ? initial.features : [""],
    specs: initial?.specs.length
      ? initial.specs.map((s) => ({ a: s.label, b: s.value }))
      : [{ a: "", b: "" }],
    colors: initial?.colors.length
      ? initial.colors.map((c) => ({ a: c.name, b: c.hex }))
      : [{ a: "", b: "" }],
    sizes: initial?.sizes.join(", ") ?? "",
    tags: initial?.tags.join(", ") ?? "",
    images: initial?.images ?? [],
    stockCount: initial ? String(initial.stockCount) : "0",
    inStock: initial?.inStock ?? true,
    isFeatured: initial?.isFeatured ?? false,
    isNew: initial?.isNew ?? false,
    isBestseller: initial?.isBestseller ?? false,
  };
}

const commaToArray = (s: string) =>
  s.split(",").map((v) => v.trim()).filter(Boolean);

export function ProductForm({ initial }: { initial?: Product }) {
  const router = useRouter();
  const mode: Mode = initial ? "edit" : "create";
  const configured = isSupabaseConfigured();

  const [s, setS] = useState<State>(() => initialState(initial));
  const [pending, startTransition] = useTransition();
  const [deleting, setDeleting] = useState(false);

  const set = <K extends keyof State>(key: K, value: State[K]) =>
    setS((prev) => ({ ...prev, [key]: value }));

  // Auto-slug from name unless the user has edited the slug directly.
  const autoSlug = useMemo(
    () => slugify(s.name || "", { lower: true, strict: true, trim: true }),
    [s.name]
  );
  const effectiveSlug = s.slugTouched ? s.slug : autoSlug;

  function validate(): string | null {
    if (!s.name.trim()) return "Product name is required.";
    if (!effectiveSlug) return "A URL slug is required.";
    const price = Number(s.price);
    if (!s.price || Number.isNaN(price) || price < 0) return "Enter a valid price.";
    if (s.compareAtPrice && Number.isNaN(Number(s.compareAtPrice)))
      return "Compare-at price must be a number.";
    return null;
  }

  function buildInput(): ProductInput {
    const category =
      CATEGORIES.find((c) => c.slug === s.categorySlug) ?? CATEGORIES[0];
    return {
      id: s.id || undefined,
      slug: effectiveSlug,
      name: s.name.trim(),
      categorySlug: category.slug,
      categoryName: category.name,
      price: Number(s.price),
      compareAtPrice: s.compareAtPrice ? Number(s.compareAtPrice) : null,
      currency: s.currency || "BDT",
      badge: s.badge.trim() || null,
      shortDescription: s.shortDescription.trim(),
      description: s.description.trim(),
      features: s.features.map((f) => f.trim()).filter(Boolean),
      specs: s.specs
        .filter((row) => row.a.trim() || row.b.trim())
        .map((row) => ({ label: row.a.trim(), value: row.b.trim() })),
      colors: s.colors
        .filter((row) => row.a.trim() || row.b.trim())
        .map((row) => ({ name: row.a.trim(), hex: row.b.trim() })),
      sizes: commaToArray(s.sizes),
      tags: commaToArray(s.tags),
      images: s.images,
      stockCount: Number(s.stockCount) || 0,
      inStock: s.inStock,
      isFeatured: s.isFeatured,
      isNew: s.isNew,
      isBestseller: s.isBestseller,
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }
    if (!configured) {
      toast.error("Connect Supabase to save changes.");
      return;
    }

    const input = buildInput();
    startTransition(async () => {
      const result =
        mode === "edit" ? await updateProduct(input) : await createProduct(input);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(mode === "edit" ? "Product updated." : "Product created.");
      router.push("/admin/products");
      router.refresh();
    });
  }

  async function handleDelete() {
    if (mode !== "edit" || !s.id) return;
    if (!configured) {
      toast.error("Connect Supabase to delete.");
      return;
    }
    if (!window.confirm(`Delete "${s.name}"? This cannot be undone.`)) return;

    setDeleting(true);
    const result = await deleteProduct(s.id);
    setDeleting(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Product deleted.");
    router.push("/admin/products");
    router.refresh();
  }

  const busy = pending || deleting;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-4">
      {/* Header / actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl border border-onyx-200 text-onyx-600 transition-colors hover:bg-onyx-50"
            aria-label="Back to products"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-display text-xl font-extrabold uppercase tracking-tightest text-onyx-950 sm:text-2xl">
              {mode === "edit" ? "Edit product" : "New product"}
            </h1>
            <p className="text-xs text-onyx-400">
              {mode === "edit" ? s.name : "Add an item to the catalogue"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {mode === "edit" && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={busy}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-onyx-200 px-4 text-sm font-semibold text-onyx-700 transition-colors hover:border-ember-300 hover:text-ember-600 disabled:opacity-50"
            >
              {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              Delete
            </button>
          )}
          <button
            type="submit"
            disabled={busy || !configured}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ember-500 px-5 text-sm font-semibold text-white shadow-glow-sm transition-all hover:bg-ember-600 hover:shadow-glow disabled:pointer-events-none disabled:opacity-50"
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {mode === "edit" ? "Save changes" : "Create product"}
          </button>
        </div>
      </div>

      {!configured && (
        <NotConfiguredNotice detail="You can fill in everything below, but saving needs a live Supabase project. The form stays fully interactive." />
      )}

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* ── Left column ── */}
        <div className="space-y-6">
          <FormSection title="Basics">
            <Field label="Product name" htmlFor="name" required>
              <input
                id="name"
                value={s.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Custom Round Rubber Stamp"
                className={fieldInput}
              />
            </Field>

            <Field
              label="URL slug"
              htmlFor="slug"
              hint="Auto-generated from name — edit if needed"
              required
            >
              <input
                id="slug"
                value={effectiveSlug}
                onChange={(e) => {
                  set("slugTouched", true);
                  set("slug", slugify(e.target.value, { lower: true, strict: true }));
                }}
                placeholder="custom-round-rubber-stamp"
                className={cn(fieldInput, "font-mono text-sm")}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Category" htmlFor="category" required>
                <select
                  id="category"
                  value={s.categorySlug}
                  onChange={(e) => set("categorySlug", e.target.value)}
                  className={cn(fieldInput, "appearance-none")}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Badge" htmlFor="badge" hint="Optional ribbon">
                <input
                  id="badge"
                  value={s.badge}
                  onChange={(e) => set("badge", e.target.value)}
                  placeholder="Bestseller"
                  className={fieldInput}
                />
              </Field>
            </div>

            <Field label="Short description" htmlFor="short">
              <textarea
                id="short"
                value={s.shortDescription}
                onChange={(e) => set("shortDescription", e.target.value)}
                rows={2}
                placeholder="A short, friendly sentence shown on cards and the product hero."
                className={fieldArea}
              />
            </Field>

            <Field label="Full description" htmlFor="description" hint="Write normally — no HTML needed">
              <RichTextField
                id="description"
                value={s.description}
                onChange={(html) => set("description", html)}
                rows={9}
              />
            </Field>
          </FormSection>

          <FormSection title="Media" description="Uploads are auto-converted to optimised WebP.">
            <ImageUploader
              multiple
              value={s.images}
              onChange={(urls) => set("images", urls)}
            />
          </FormSection>

          <FormSection title="Features">
            <StringListEditor
              items={s.features}
              onChange={(items) => set("features", items)}
              placeholder="Full-grain cowhide leather shell"
              addLabel="Add feature"
            />
          </FormSection>

          <FormSection title="Specifications">
            <PairListEditor
              items={s.specs}
              onChange={(items) => set("specs", items)}
              aPlaceholder="Weight"
              bPlaceholder="16oz"
              addLabel="Add specification"
            />
          </FormSection>
        </div>

        {/* ── Right column ── */}
        <div className="space-y-6">
          <FormSection title="Pricing">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Price" htmlFor="price" required>
                <input
                  id="price"
                  inputMode="decimal"
                  value={s.price}
                  onChange={(e) => set("price", e.target.value)}
                  placeholder="129"
                  className={fieldInput}
                />
              </Field>
              <Field label="Compare-at" htmlFor="compare" hint="Was-price">
                <input
                  id="compare"
                  inputMode="decimal"
                  value={s.compareAtPrice}
                  onChange={(e) => set("compareAtPrice", e.target.value)}
                  placeholder="169"
                  className={fieldInput}
                />
              </Field>
            </div>
            <Field label="Currency" htmlFor="currency">
              <input
                id="currency"
                value={s.currency}
                onChange={(e) => set("currency", e.target.value.toUpperCase())}
                placeholder="USD"
                maxLength={3}
                className={cn(fieldInput, "uppercase")}
              />
            </Field>
          </FormSection>

          <FormSection title="Inventory">
            <Field label="Stock count" htmlFor="stock">
              <input
                id="stock"
                inputMode="numeric"
                value={s.stockCount}
                onChange={(e) => set("stockCount", e.target.value)}
                placeholder="64"
                className={fieldInput}
              />
            </Field>
            <Toggle
              checked={s.inStock}
              onChange={(v) => set("inStock", v)}
              label="In stock"
              description="Available to purchase on the storefront"
            />
          </FormSection>

          <FormSection title="Variants">
            <Field label="Sizes" htmlFor="sizes" hint="Comma-separated">
              <input
                id="sizes"
                value={s.sizes}
                onChange={(e) => set("sizes", e.target.value)}
                placeholder="12oz, 14oz, 16oz"
                className={fieldInput}
              />
            </Field>
            <div>
              <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-onyx-500">
                Colours
              </p>
              <PairListEditor
                items={s.colors}
                onChange={(items) => set("colors", items)}
                aPlaceholder="Black Ink"
                bPlaceholder="#E11D2A"
                addLabel="Add colour"
                swatch
              />
            </div>
            <Field label="Tags" htmlFor="tags" hint="Comma-separated">
              <input
                id="tags"
                value={s.tags}
                onChange={(e) => set("tags", e.target.value)}
                placeholder="stamp, rubber, logo, office"
                className={fieldInput}
              />
            </Field>
          </FormSection>

          <FormSection title="Flags">
            <div className="space-y-2.5">
              <Toggle
                checked={s.isFeatured}
                onChange={(v) => set("isFeatured", v)}
                label="Featured"
                description="Surface on the homepage"
              />
              <Toggle
                checked={s.isNew}
                onChange={(v) => set("isNew", v)}
                label="New arrival"
              />
              <Toggle
                checked={s.isBestseller}
                onChange={(v) => set("isBestseller", v)}
                label="Bestseller"
              />
            </div>
          </FormSection>
        </div>
      </div>
    </form>
  );
}
