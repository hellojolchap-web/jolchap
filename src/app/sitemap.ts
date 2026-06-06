import type { MetadataRoute } from "next";
import { getProducts, getBlogPosts, getCategories } from "@/lib/queries";
import { absoluteUrl } from "@/lib/seo";

type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts, categories] = await Promise.all([
    getProducts(),
    getBlogPosts(),
    getCategories(),
  ]);

  const now = new Date();

  const staticPages: { path: string; priority: number; freq: ChangeFreq }[] = [
    { path: "/", priority: 1, freq: "daily" },
    { path: "/shop", priority: 0.9, freq: "daily" },
    { path: "/blog", priority: 0.8, freq: "weekly" },
    { path: "/about", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.6, freq: "monthly" },
    { path: "/faq", priority: 0.5, freq: "monthly" },
    { path: "/shipping", priority: 0.4, freq: "yearly" },
    { path: "/returns", priority: 0.4, freq: "yearly" },
    { path: "/size-guide", priority: 0.4, freq: "yearly" },
    { path: "/privacy", priority: 0.3, freq: "yearly" },
    { path: "/terms", priority: 0.3, freq: "yearly" },
  ];

  return [
    ...staticPages.map((p) => ({
      url: absoluteUrl(p.path),
      lastModified: now,
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...categories.map((c) => ({
      url: absoluteUrl(`/category/${c.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as ChangeFreq,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: absoluteUrl(`/product/${p.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as ChangeFreq,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.6,
    })),
  ];
}
