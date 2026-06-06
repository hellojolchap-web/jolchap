import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import {
  getCategories,
  getCategory,
  getProductsByCategory,
} from "@/lib/queries";
import { cn, deslugify } from "@/lib/utils";
import { pageMetadata, breadcrumbLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ type?: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: "Category not found" };

  return pageMetadata({
    title: category.name,
    description: category.description,
    path: `/category/${category.slug}`,
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const [{ slug }, { type }] = await Promise.all([params, searchParams]);

  const category = await getCategory(slug);
  if (!category) notFound();

  const [allProducts, categories] = await Promise.all([
    getProductsByCategory(slug),
    getCategories(),
  ]);

  // Build a tag-chip row from tags that actually appear in this category.
  const tagCounts = new Map<string, number>();
  for (const p of allProducts) {
    for (const tag of p.tags) {
      // skip the category slug itself if it sneaks in as a tag
      if (tag === slug) continue;
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }
  const typeChips = [...tagCounts.entries()]
    .filter(([, n]) => n >= 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([tag]) => tag);

  const activeType = type && tagCounts.has(type) ? type : undefined;
  const products = activeType
    ? allProducts.filter((p) => p.tags.includes(activeType))
    : allProducts;

  const otherCategories = categories.filter((c) => c.slug !== slug).slice(0, 5);

  return (
    <>
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: category.name, path: `/category/${category.slug}` },
      ])} />
      <PageHeader
        variant="dark"
        kicker={category.tagline}
        title={category.name}
        intro={category.description}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: category.name },
        ]}
      />

      <Container className="py-12 lg:py-16">
        {/* type subfilter + count */}
        <div className="flex flex-col gap-5">
          {typeChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/category/${slug}`}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold capitalize transition-colors",
                  !activeType
                    ? "border-onyx-950 bg-onyx-950 text-white"
                    : "border-onyx-200 bg-white text-onyx-700 hover:border-onyx-950"
                )}
              >
                All {category.name}
              </Link>
              {typeChips.map((tag) => {
                const active = tag === activeType;
                return (
                  <Link
                    key={tag}
                    href={`/category/${slug}?type=${tag}`}
                    scroll={false}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-semibold capitalize transition-colors",
                      active
                        ? "border-ember-500 bg-ember-500 text-white"
                        : "border-onyx-200 bg-white text-onyx-700 hover:border-onyx-950"
                    )}
                  >
                    {deslugify(tag)}
                  </Link>
                );
              })}
            </div>
          )}

          <p className="text-sm text-onyx-500">
            <span className="font-bold text-onyx-950">{products.length}</span>{" "}
            {products.length === 1 ? "product" : "products"}
            {activeType && (
              <>
                {" "}
                in{" "}
                <span className="font-semibold capitalize text-onyx-950">
                  {deslugify(activeType)}
                </span>
              </>
            )}
          </p>
        </div>

        {/* grid */}
        {products.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3 xl:grid-cols-4">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-onyx-200 bg-white/60 px-6 py-16 text-center">
            <h3 className="text-xl font-extrabold text-onyx-950">
              Nothing here yet
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-onyx-500">
              We&apos;re restocking this line. Browse the full {category.name} range while
              you wait.
            </p>
            <Link
              href={`/category/${slug}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-onyx-950 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-onyx-800"
            >
              View all {category.name}
            </Link>
          </div>
        )}
      </Container>

      {/* editorial intro band */}
      <section className="border-y border-onyx-100 bg-white">
        <Container className="grid items-center gap-10 py-16 lg:grid-cols-[1fr_1.1fr] lg:py-20">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-onyx-950 ring-1 ring-onyx-100">
              {category.image && (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width:1024px) 100vw, 45vw"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/60 via-transparent to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="kicker">
              <span className="h-px w-7 bg-ember-500" />
              Why Jolchap {category.name}
            </span>
            <h2 className="mt-4 text-3xl font-extrabold uppercase leading-[1.02] tracking-tightest text-onyx-950 sm:text-4xl">
              {category.tagline}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-onyx-600">
              {category.description}
            </p>
            <ul className="mt-6 space-y-3">
              {CATEGORY_PROMISES.map((promise) => (
                <li key={promise} className="flex items-start gap-3 text-sm text-onyx-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-500" />
                  {promise}
                </li>
              ))}
            </ul>
            <Link
              href="/shop"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-onyx-950 transition-colors hover:text-ember-600"
            >
              Explore the full collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* cross-links */}
      {otherCategories.length > 0 && (
        <Container className="py-16 lg:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold uppercase tracking-tightest text-onyx-950 sm:text-3xl">
              Keep exploring
            </h2>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-onyx-900 transition-colors hover:text-ember-600"
            >
              All categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {otherCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-onyx-950 p-5 ring-1 ring-onyx-100"
              >
                {c.image && (
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                    className="object-cover opacity-55 transition-all duration-500 group-hover:scale-105 group-hover:opacity-70"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/85 via-onyx-950/20 to-transparent" />
                <div className="relative">
                  <p className="text-sm font-extrabold uppercase tracking-tight text-white">
                    {c.name}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-white/70 transition-colors group-hover:text-ember-400">
                    Shop now
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      )}
    </>
  );
}

const CATEGORY_PROMISES = [
  "Made to order from your design, photo or text — checked before it ships",
  "Premium materials chosen for lasting quality in our climate",
  "Backed by our reprint-if-it's-wrong guarantee",
];
