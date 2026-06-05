import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Mail } from "lucide-react";

import { getBlogPosts, getFeaturedPosts } from "@/lib/queries";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { Pagination } from "@/components/ui/Pagination";
import { formatDate, clamp } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "The Jolchap Journal",
  description:
    "Design tips, gifting inspiration, product guides and behind-the-scenes stories from the Jolchap custom print & personalisation studio in Dhaka.",
  openGraph: {
    title: "The Jolchap Journal · Jolchap",
    description:
      "Design tips, gifting inspiration, product guides and studio stories from Jolchap.",
    url: `${siteConfig.url}/blog`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "The Jolchap Journal" }],
  },
};

const PAGE_SIZE = 9; // 3 columns × 3 rows

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const [{ page }, allPosts, featuredPosts] = await Promise.all([
    searchParams,
    getBlogPosts(),
    getFeaturedPosts(),
  ]);

  const featured = featuredPosts[0] ?? allPosts[0];

  // The grid never repeats the featured article.
  const pool = featured ? allPosts.filter((p) => p.id !== featured.id) : allPosts;

  const totalPages = Math.max(1, Math.ceil(pool.length / PAGE_SIZE));
  const currentPage = clamp(parseInt(page ?? "1", 10) || 1, 1, totalPages);
  const isFirst = currentPage === 1;

  const gridPosts = pool.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      <PageHeader
        kicker="The Jolchap Journal"
        title="Ideas worth printing."
        intro="Design tips, gifting inspiration, product guides and behind-the-scenes stories — written by the makers who personalise your stamps, apparel, mugs and gifts every day."
        variant="dark"
      />

      {/* ── Featured hero post (first page only) ────────────────────────── */}
      {isFirst && featured && (
        <section className="bg-onyx-950 pb-20 pt-0">
          <Container>
            <Reveal>
              <article className="group relative grid overflow-hidden rounded-3xl ring-1 ring-onyx-800 lg:grid-cols-[1fr_42%]">
                <div className="relative min-h-[280px] overflow-hidden sm:min-h-[360px] lg:min-h-[520px]">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-onyx-950/30 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-onyx-950/80 via-transparent to-transparent lg:hidden" />
                  <span className="absolute left-5 top-5 rounded-full bg-ember-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    Featured
                  </span>
                </div>

                <div className="flex flex-col justify-center gap-6 bg-onyx-950 p-8 sm:p-10 lg:p-12">
                  <span className="inline-flex w-fit rounded-full bg-ember-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-ember-400">
                    {featured.category}
                  </span>
                  <h2 className="text-balance text-2xl font-extrabold uppercase leading-[1.05] tracking-tightest text-white sm:text-3xl lg:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="text-base leading-relaxed text-white/60 line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-ember-500/30">
                        <Image
                          src={featured.author.avatar}
                          alt={featured.author.name}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{featured.author.name}</p>
                        <p className="text-[11px] text-white/45">{featured.author.role}</p>
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-3 text-xs text-white/40">
                      <span>{formatDate(featured.publishedAt)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {featured.readingTime} min
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Button href={`/blog/${featured.slug}`} variant="primary" size="md">
                      Read article
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </div>
                </div>

                <Link
                  href={`/blog/${featured.slug}`}
                  className="absolute inset-0"
                  aria-label={`Read: ${featured.title}`}
                />
              </article>
            </Reveal>
          </Container>
        </section>
      )}

      {/* ── Paginated article grid (9 per page) ─────────────────────────── */}
      <section id="articles" className="section scroll-mt-24">
        <Container>
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-col gap-1">
              <span className="kicker">
                <span className="h-px w-7 bg-ember-500" />
                {isFirst ? "Latest articles" : "More articles"}
              </span>
              <h2 className="text-balance text-3xl font-extrabold uppercase leading-tight tracking-tightest text-onyx-950 sm:text-4xl">
                Every article, every topic
              </h2>
            </div>
            <p className="text-sm font-medium text-onyx-400">
              Page {currentPage} of {totalPages}
            </p>
          </Reveal>

          {gridPosts.length > 0 ? (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post, i) => (
                <Reveal key={post.id} delay={Math.min(i * 0.05, 0.3)}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-onyx-400">No articles on this page.</p>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
            hash="#articles"
          />
        </Container>
      </section>

      {/* ── Newsletter strip ───────────────────────────────────────────── */}
      <section className="mb-20">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-onyx-950 px-8 py-12 text-center ring-1 ring-onyx-800 sm:px-12 sm:py-16">
              <div className="pointer-events-none absolute -bottom-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-ember-500/20 blur-[80px]" />
              <div className="relative">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-ember-500/15">
                  <Mail className="h-5 w-5 text-ember-400" />
                </div>
                <h2 className="mb-3 text-balance text-2xl font-extrabold uppercase tracking-tightest text-white sm:text-3xl">
                  Fresh ideas, direct to your inbox
                </h2>
                <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/55">
                  New articles, design inspiration and exclusive offers — no spam, just good stuff.
                  Drop your email in the footer to join 6,400+ subscribers.
                </p>
                <Button href="#newsletter" variant="primary" size="lg">
                  Subscribe below
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
