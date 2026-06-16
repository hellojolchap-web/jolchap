import "server-only";

import { unstable_cache } from "next/cache";
import { createClient as createAnonClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import {
  isSupabaseConfigured,
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
} from "@/lib/supabase/config";
import {
  products as localProducts,
  productBySlug,
  productsByCategory,
  featuredProducts,
  bestsellers,
  newArrivals,
  relatedProducts as localRelated,
} from "@/lib/data/products";
import { categories as localCategories, categoryBySlug } from "@/lib/data/categories";
import {
  blogPosts as localPosts,
  postBySlug,
  featuredPosts,
  relatedPosts as localRelatedPosts,
} from "@/lib/data/blog";
import { testimonials as localTestimonials } from "@/lib/data/testimonials";
import { mergeSettings, type PartialSettings, type ResolvedSettings } from "@/lib/settings";
import type { BlogPost, Category, Product, Testimonial } from "@/types";

/* ──────────────────────────────────────────────────────────────────────────
   Data access. Every reader prefers Supabase when it's configured and the
   query succeeds with rows; otherwise it transparently falls back to the
   bundled offline content so the storefront always renders.
   ────────────────────────────────────────────────────────────────────────── */

/** Row → Product mapper (snake_case DB → camelCase domain). */
function mapProduct(r: Record<string, unknown>): Product {
  return {
    id: String(r.id),
    slug: String(r.slug),
    name: String(r.name),
    categorySlug: String(r.category_slug),
    categoryName: String(r.category_name),
    price: Number(r.price),
    compareAtPrice: r.compare_at_price == null ? null : Number(r.compare_at_price),
    currency: String(r.currency ?? "USD"),
    rating: Number(r.rating ?? 0),
    reviewCount: Number(r.review_count ?? 0),
    badge: (r.badge as string) ?? null,
    shortDescription: String(r.short_description ?? ""),
    description: String(r.description ?? ""),
    features: (r.features as string[]) ?? [],
    specs: (r.specs as Product["specs"]) ?? [],
    images: (r.images as string[]) ?? [],
    colors: (r.colors as Product["colors"]) ?? [],
    sizes: (r.sizes as string[]) ?? [],
    inStock: Boolean(r.in_stock ?? true),
    stockCount: Number(r.stock_count ?? 0),
    isFeatured: Boolean(r.is_featured),
    isNew: Boolean(r.is_new),
    isBestseller: Boolean(r.is_bestseller),
    tags: (r.tags as string[]) ?? [],
  };
}

function mapCategory(r: Record<string, unknown>): Category {
  return {
    id: String(r.id),
    slug: String(r.slug),
    name: String(r.name),
    tagline: String(r.tagline ?? ""),
    description: String(r.description ?? ""),
    icon: String(r.icon ?? "Dumbbell"),
    image: String(r.image ?? ""),
    sort: Number(r.sort ?? 0),
  };
}

function mapPost(r: Record<string, unknown>): BlogPost {
  return {
    id: String(r.id),
    slug: String(r.slug),
    title: String(r.title),
    excerpt: String(r.excerpt ?? ""),
    content: String(r.content ?? ""),
    coverImage: String(r.cover_image ?? ""),
    category: String(r.category ?? "Journal"),
    tags: (r.tags as string[]) ?? [],
    author: r.author as BlogPost["author"],
    readingTime: Number(r.reading_time ?? 5),
    publishedAt: String(r.published_at),
    featured: Boolean(r.featured),
  };
}

/** Run a Supabase read, returning null on any failure so callers can fall back. */
async function trySupabase<T>(
  fn: (db: Awaited<ReturnType<typeof createClient>>) => Promise<T | null>
): Promise<T | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const db = await createClient();
    return await fn(db);
  } catch {
    return null;
  }
}

/* ── Site settings ──
   Read in the root layout (every page), so it must stay static-friendly: a
   cookie-free anon read wrapped in the Next data cache. Busted on save via the
   "site-settings" tag, so edits propagate without making pages dynamic. */
const readSettings = unstable_cache(
  async (): Promise<ResolvedSettings> => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return mergeSettings(null);
    try {
      const db = createAnonClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      const { data } = await db.from("site_settings").select("data").eq("id", 1).single();
      return mergeSettings((data?.data as PartialSettings) ?? null);
    } catch {
      return mergeSettings(null);
    }
  },
  ["site-settings-v1"],
  { tags: ["site-settings"], revalidate: 3600 }
);

export async function getSettings(): Promise<ResolvedSettings> {
  return readSettings();
}

/* ── Categories ── */
export async function getCategories(): Promise<Category[]> {
  const remote = await trySupabase(async (db) => {
    const { data } = await db.from("categories").select("*").order("sort");
    return data && data.length ? data.map(mapCategory) : null;
  });
  return remote ?? localCategories;
}

export async function getCategory(slug: string): Promise<Category | null> {
  const remote = await trySupabase(async (db) => {
    const { data } = await db.from("categories").select("*").eq("slug", slug).single();
    return data ? mapCategory(data) : null;
  });
  return remote ?? categoryBySlug(slug) ?? null;
}

/* ── Products ── */
export async function getProducts(): Promise<Product[]> {
  const remote = await trySupabase(async (db) => {
    const { data } = await db
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    return data && data.length ? data.map(mapProduct) : null;
  });
  return remote ?? localProducts;
}

export async function getProduct(slug: string): Promise<Product | null> {
  const remote = await trySupabase(async (db) => {
    const { data } = await db.from("products").select("*").eq("slug", slug).single();
    return data ? mapProduct(data) : null;
  });
  return remote ?? productBySlug(slug) ?? null;
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const remote = await trySupabase(async (db) => {
    const { data } = await db.from("products").select("*").eq("category_slug", slug);
    return data && data.length ? data.map(mapProduct) : null;
  });
  return remote ?? productsByCategory(slug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getProducts();
  const featured = all.filter((p) => p.isFeatured);
  return featured.length ? featured : featuredProducts();
}

export async function getBestsellers(): Promise<Product[]> {
  const all = await getProducts();
  const list = all.filter((p) => p.isBestseller);
  return list.length ? list : bestsellers();
}

export async function getNewArrivals(): Promise<Product[]> {
  const all = await getProducts();
  const list = all.filter((p) => p.isNew);
  return list.length ? list : newArrivals();
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const all = await getProducts();
  const list = all
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);
  return list.length ? list : localRelated(product, limit);
}

/* ── Blog ── */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const remote = await trySupabase(async (db) => {
    const { data } = await db
      .from("blog_posts")
      .select("*")
      .eq("featured", false)
      .order("published_at", { ascending: false });
    // (we don't filter featured here — fetch all and sort)
    const { data: all } = await db
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false });
    void data;
    return all && all.length ? all.map(mapPost) : null;
  });
  return remote ?? [...localPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const remote = await trySupabase(async (db) => {
    const { data } = await db.from("blog_posts").select("*").eq("slug", slug).single();
    return data ? mapPost(data) : null;
  });
  return remote ?? postBySlug(slug) ?? null;
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const all = await getBlogPosts();
  const list = all.filter((p) => p.featured);
  return list.length ? list : featuredPosts();
}

export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const all = await getBlogPosts();
  const sameCat = all.filter((p) => p.id !== post.id && p.category === post.category);
  const others = all.filter((p) => p.id !== post.id && p.category !== post.category);
  const list = [...sameCat, ...others].slice(0, limit);
  return list.length ? list : localRelatedPosts(post, limit);
}

/* ── Testimonials ── */
export async function getTestimonials(): Promise<Testimonial[]> {
  return localTestimonials;
}
