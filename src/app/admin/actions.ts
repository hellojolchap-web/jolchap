"use server";

import { revalidatePath } from "next/cache";
import slugify from "slugify";

import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";
import type { Author, ProductSpec, ProductVariantColor } from "@/types";

/* ──────────────────────────────────────────────────────────────────────────
   Server actions for the Jolchap admin. Every mutation funnels through the
   privileged service-role client (bypasses RLS). When Supabase isn't
   configured each action returns a structured error the UI surfaces inline,
   instead of throwing.
   ────────────────────────────────────────────────────────────────────────── */

export type ActionResult = { ok: true; id: string } | { ok: false; error: string };

const NOT_CONFIGURED =
  "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY to enable saving.";

/* ── Input shapes (camelCase, mirror the domain types) ── */
export interface ProductInput {
  id?: string;
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  price: number;
  compareAtPrice: number | null;
  currency: string;
  badge: string | null;
  shortDescription: string;
  description: string;
  features: string[];
  specs: ProductSpec[];
  images: string[];
  colors: ProductVariantColor[];
  sizes: string[];
  tags: string[];
  inStock: boolean;
  stockCount: number;
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
}

export interface PostInput {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: Author;
  readingTime: number;
  publishedAt: string;
  featured: boolean;
}

/** Stable id derived from a slug, e.g. "prd-apex-pro-16oz". */
function idFromSlug(prefix: string, slug: string): string {
  const base =
    slugify(slug || "", { lower: true, strict: true, trim: true }) ||
    Math.random().toString(36).slice(2, 10);
  return `${prefix}-${base}`;
}

/* ── Products ─────────────────────────────────────────────────────────────── */

function productRow(input: ProductInput, id: string) {
  return {
    id,
    slug: input.slug,
    name: input.name,
    category_slug: input.categorySlug,
    category_name: input.categoryName,
    price: input.price,
    compare_at_price: input.compareAtPrice,
    currency: input.currency || "BDT",
    badge: input.badge,
    short_description: input.shortDescription,
    description: input.description,
    features: input.features,
    specs: input.specs,
    images: input.images,
    colors: input.colors,
    sizes: input.sizes,
    tags: input.tags,
    in_stock: input.inStock,
    stock_count: input.stockCount,
    is_featured: input.isFeatured,
    is_new: input.isNew,
    is_bestseller: input.isBestseller,
  };
}

function revalidateProductRoutes(slug: string) {
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/shop");
  revalidatePath("/");
  revalidatePath(`/product/${slug}`);
}

export async function createProduct(input: ProductInput): Promise<ActionResult> {
  if (!isSupabaseAdminConfigured()) return { ok: false, error: NOT_CONFIGURED };
  const id = input.id?.trim() || idFromSlug("prd", input.slug);
  try {
    const admin = createAdminClient();
    const { error } = await admin.from("products").insert(productRow(input, id));
    if (error) return { ok: false, error: error.message };
    revalidateProductRoutes(input.slug);
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to create product." };
  }
}

export async function updateProduct(input: ProductInput): Promise<ActionResult> {
  if (!isSupabaseAdminConfigured()) return { ok: false, error: NOT_CONFIGURED };
  const id = input.id?.trim() || idFromSlug("prd", input.slug);
  try {
    const admin = createAdminClient();
    // Upsert so an edit succeeds even if the row only exists in fallback content.
    const { error } = await admin
      .from("products")
      .upsert(productRow(input, id), { onConflict: "id" });
    if (error) return { ok: false, error: error.message };
    revalidateProductRoutes(input.slug);
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to update product." };
  }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  if (!isSupabaseAdminConfigured()) return { ok: false, error: NOT_CONFIGURED };
  try {
    const admin = createAdminClient();
    const { error } = await admin.from("products").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/products");
    revalidatePath("/admin");
    revalidatePath("/shop");
    revalidatePath("/");
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to delete product." };
  }
}

/* ── Blog posts ───────────────────────────────────────────────────────────── */

function postRow(input: PostInput, id: string) {
  return {
    id,
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    content: input.content,
    cover_image: input.coverImage,
    category: input.category || "Journal",
    tags: input.tags,
    author: input.author,
    reading_time: input.readingTime,
    published_at: input.publishedAt,
    featured: input.featured,
  };
}

function revalidatePostRoutes(slug: string) {
  revalidatePath("/admin/blog");
  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
}

export async function createPost(input: PostInput): Promise<ActionResult> {
  if (!isSupabaseAdminConfigured()) return { ok: false, error: NOT_CONFIGURED };
  const id = input.id?.trim() || idFromSlug("post", input.slug);
  try {
    const admin = createAdminClient();
    const { error } = await admin.from("blog_posts").insert(postRow(input, id));
    if (error) return { ok: false, error: error.message };
    revalidatePostRoutes(input.slug);
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to create post." };
  }
}

export async function updatePost(input: PostInput): Promise<ActionResult> {
  if (!isSupabaseAdminConfigured()) return { ok: false, error: NOT_CONFIGURED };
  const id = input.id?.trim() || idFromSlug("post", input.slug);
  try {
    const admin = createAdminClient();
    const { error } = await admin
      .from("blog_posts")
      .upsert(postRow(input, id), { onConflict: "id" });
    if (error) return { ok: false, error: error.message };
    revalidatePostRoutes(input.slug);
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to update post." };
  }
}

export async function deletePost(id: string): Promise<ActionResult> {
  if (!isSupabaseAdminConfigured()) return { ok: false, error: NOT_CONFIGURED };
  try {
    const admin = createAdminClient();
    const { error } = await admin.from("blog_posts").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/blog");
    revalidatePath("/admin");
    revalidatePath("/blog");
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to delete post." };
  }
}
