import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Newspaper,
  Tags,
  Radio,
  Plus,
  Upload,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

import { getProducts, getBlogPosts, getCategories } from "@/lib/queries";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { formatPrice, formatDate, cn } from "@/lib/utils";
import { Panel, StatusPill, FlagPill, NotConfiguredNotice } from "@/components/admin/AdminUI";

export default async function AdminDashboardPage() {
  const [products, posts, categories] = await Promise.all([
    getProducts(),
    getBlogPosts(),
    getCategories(),
  ]);

  const configured = isSupabaseConfigured();

  const recentProducts = products.slice(0, 5);
  const recentPosts = [...posts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 5);

  const stats = [
    {
      label: "Products",
      value: products.length,
      icon: Package,
      href: "/admin/products",
      hint: `${products.filter((p) => p.inStock).length} in stock`,
    },
    {
      label: "Journal posts",
      value: posts.length,
      icon: Newspaper,
      href: "/admin/blog",
      hint: `${posts.filter((p) => p.featured).length} featured`,
    },
    {
      label: "Categories",
      value: categories.length,
      icon: Tags,
      href: "/admin/products",
      hint: "Catalogue sections",
    },
    {
      label: "Store status",
      value: "Live",
      icon: Radio,
      href: "/",
      hint: "Storefront online",
      accent: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-ember-600">
            Dashboard
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold uppercase tracking-tightest text-onyx-950 sm:text-3xl">
            Welcome back to Jolchap
          </h1>
          <p className="mt-1.5 text-sm text-onyx-500">
            A live overview of your catalogue, journal and storefront.
          </p>
        </div>
        <StatusPill connected={configured} />
      </div>

      {!configured && <NotConfiguredNotice />}

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-card",
                stat.accent
                  ? "border-transparent bg-onyx-grad text-white"
                  : "border-onyx-100 bg-white"
              )}
            >
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-xl",
                    stat.accent ? "bg-white/10 text-ember-400" : "bg-ember-50 text-ember-600"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight
                  className={cn(
                    "h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                    stat.accent ? "text-white/40" : "text-onyx-300"
                  )}
                />
              </div>
              <p
                className={cn(
                  "mt-4 font-display text-3xl font-extrabold tracking-tightest",
                  stat.accent ? "text-white" : "text-onyx-950"
                )}
              >
                {stat.value}
              </p>
              <p
                className={cn(
                  "mt-0.5 text-sm font-medium",
                  stat.accent ? "text-white/60" : "text-onyx-500"
                )}
              >
                {stat.label}
              </p>
              <p
                className={cn(
                  "mt-2 text-xs",
                  stat.accent ? "text-white/40" : "text-onyx-400"
                )}
              >
                {stat.hint}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="grid gap-3 sm:grid-cols-3">
        <QuickAction
          href="/admin/products/new"
          icon={<Plus className="h-5 w-5" />}
          title="New product"
          desc="Add an item to the catalogue"
        />
        <QuickAction
          href="/admin/blog/new"
          icon={<Newspaper className="h-5 w-5" />}
          title="New journal post"
          desc="Publish to the Jolchap Journal"
        />
        <QuickAction
          href="/admin/media"
          icon={<Upload className="h-5 w-5" />}
          title="Upload media"
          desc="Convert images to WebP"
        />
      </div>

      {/* Recent data */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Recent products */}
        <Panel>
          <div className="flex items-center justify-between border-b border-onyx-100 px-5 py-4">
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-onyx-900">
              Recent products
            </h2>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-ember-600 hover:text-ember-700"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-onyx-50">
            {recentProducts.map((p) => (
              <Link
                key={p.id}
                href={`/admin/products/${p.id}`}
                className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-onyx-50/60"
              >
                <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg bg-onyx-50 ring-1 ring-onyx-100">
                  {p.images[0] ? (
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="grid h-full w-full place-items-center text-onyx-300">
                      <Package className="h-4 w-4" />
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-onyx-900">{p.name}</p>
                  <p className="truncate text-xs text-onyx-400">{p.categoryName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-onyx-900">
                    {formatPrice(p.price, p.currency)}
                  </p>
                  <p
                    className={cn(
                      "text-xs",
                      p.stockCount > 0 ? "text-onyx-400" : "text-ember-600"
                    )}
                  >
                    {p.stockCount > 0 ? `${p.stockCount} in stock` : "Out of stock"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Panel>

        {/* Recent posts */}
        <Panel>
          <div className="flex items-center justify-between border-b border-onyx-100 px-5 py-4">
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-onyx-900">
              Recent journal
            </h2>
            <Link
              href="/admin/blog"
              className="text-xs font-semibold text-ember-600 hover:text-ember-700"
            >
              View all
            </Link>
          </div>
          <ul className="divide-y divide-onyx-50">
            {recentPosts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="block px-5 py-3.5 transition-colors hover:bg-onyx-50/60"
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex rounded-md bg-ember-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ember-700">
                      {post.category}
                    </span>
                    {post.featured && <FlagPill label="Featured" tone="onyx" />}
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-onyx-900">
                    {post.title}
                  </p>
                  <p className="mt-1 text-xs text-onyx-400">
                    {formatDate(post.publishedAt)} · {post.readingTime} min read
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Footer hint */}
      <div className="flex items-center gap-2 rounded-xl bg-onyx-50/70 px-4 py-3 text-xs text-onyx-500">
        <TrendingUp className="h-4 w-4 text-ember-500" />
        Counts reflect{" "}
        {configured ? "your live Supabase data" : "the bundled offline catalogue"}.
      </div>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  desc,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-2xl border border-onyx-100 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-ember-200 hover:shadow-card"
    >
      <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-onyx-950 text-white transition-colors group-hover:bg-ember-500">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-bold text-onyx-900">{title}</p>
        <p className="truncate text-xs text-onyx-400">{desc}</p>
      </div>
    </Link>
  );
}
