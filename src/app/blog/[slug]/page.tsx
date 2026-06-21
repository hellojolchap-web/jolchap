import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, CalendarDays, ArrowLeft, ArrowRight, Tag } from "lucide-react";

import { getBlogPosts, getBlogPost, getRelatedPosts } from "@/lib/queries";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { pageMetadata, blogPostingLd, breadcrumbLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 3600;

/* ── Static params ────────────────────────────────────────────────── */
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

/* ── Open Graph metadata ──────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Article not found" };

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.publishedAt,
    keywords: post.tags,
  });
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post, 3);
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <>
      <JsonLd data={[
        blogPostingLd(post),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]),
      ]} />
      {/* ── Article header ──────────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-onyx-100 bg-bone pb-0 pt-10 sm:pt-12">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <Container className="relative">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Journal", href: "/blog" },
              { label: post.title },
            ]}
            className="mb-8"
          />

          {/* Category + reading time */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full bg-ember-500/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-ember-600">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-onyx-400">
              <Clock className="h-3 w-3" />
              {post.readingTime} min read
            </span>
            <span className="flex items-center gap-1.5 text-xs text-onyx-400">
              <CalendarDays className="h-3 w-3" />
              {formatDate(post.publishedAt)}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-7 max-w-3xl text-balance text-3xl font-extrabold uppercase leading-[1.02] tracking-tightest text-onyx-950 sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-onyx-500">
            {post.excerpt}
          </p>

          {/* Author + share row */}
          <div className="flex flex-wrap items-center justify-between gap-6 pb-10 sm:pb-12">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-onyx-200">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-onyx-900">{post.author.name}</p>
                <p className="text-xs text-onyx-400">{post.author.role}</p>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium uppercase tracking-widest text-onyx-400">
                Share
              </span>
              <ShareButtons url={postUrl} title={post.title} />
            </div>
          </div>
        </Container>
      </header>

      {/* ── Cover image ─────────────────────────────────────────────── */}
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-onyx-100 sm:aspect-[3/1]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bone/25 via-transparent to-transparent" />
      </div>

      {/* ── Article body + sidebar ───────────────────────────────────── */}
      <section className="section">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_280px]">
            {/* Body */}
            <Reveal>
              <div
                className="prose prose-jolchap max-w-none
                  prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tightest
                  prose-h2:mt-10 prose-h2:text-2xl prose-h2:font-extrabold
                  prose-h3:mt-8 prose-h3:text-xl prose-h3:font-bold
                  prose-p:leading-relaxed prose-p:text-onyx-700
                  prose-li:leading-relaxed prose-li:text-onyx-700
                  prose-blockquote:border-l-4 prose-blockquote:border-ember-500
                  prose-blockquote:bg-ember-50 prose-blockquote:px-6 prose-blockquote:py-4
                  prose-blockquote:rounded-r-2xl prose-blockquote:not-italic
                  prose-blockquote:text-onyx-800 prose-blockquote:font-medium
                  prose-a:font-semibold prose-a:text-ember-600 prose-a:no-underline
                  hover:prose-a:underline
                  prose-strong:text-onyx-900
                  prose-img:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </Reveal>

            {/* Sticky sidebar */}
            <aside className="space-y-8">
              {/* Share */}
              <Reveal delay={0.1}>
                <div className="rounded-2xl bg-white p-6 ring-1 ring-onyx-100 shadow-card">
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-onyx-400">
                    Share this article
                  </h3>
                  <ShareButtons url={postUrl} title={post.title} className="flex-wrap" />
                </div>
              </Reveal>

              {/* Tags */}
              {post.tags.length > 0 && (
                <Reveal delay={0.15}>
                  <div className="rounded-2xl bg-white p-6 ring-1 ring-onyx-100 shadow-card">
                    <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-onyx-400">
                      <Tag className="h-3 w-3" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-onyx-50 px-3 py-1 text-xs font-medium text-onyx-600 ring-1 ring-onyx-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Shop CTA */}
              <Reveal delay={0.2}>
                <div className="relative overflow-hidden rounded-2xl bg-onyx-950 p-6 ring-1 ring-onyx-800">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-ember-500/20 blur-2xl" />
                  <p className="relative mb-1 text-xs font-bold uppercase tracking-widest text-ember-400">
                    Gear up
                  </p>
                  <p className="relative mb-4 text-base font-bold leading-snug text-white">
                    Ready for your next session?
                  </p>
                  <Button href="/shop" variant="primary" size="sm" className="w-full justify-center">
                    Shop the gear
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>

      {/* ── Author bio card ──────────────────────────────────────────── */}
      <section className="border-t border-onyx-100 bg-white py-16">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-3xl bg-bone p-8 ring-1 ring-onyx-100 sm:p-10">
              <p className="mb-6 text-xs font-bold uppercase tracking-widest text-onyx-400">
                About the author
              </p>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-7">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl ring-2 ring-onyx-200">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="mb-1 text-xl font-extrabold uppercase tracking-tightest text-onyx-950">
                    {post.author.name}
                  </h3>
                  <p className="mb-4 text-sm font-semibold text-ember-600">{post.author.role}</p>
                  <p className="text-base leading-relaxed text-onyx-500">
                    Writing for the Jolchap Journal, sharing practical ideas on print, personalisation and making things that mean something.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Related reading ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="section border-t border-onyx-100">
          <Container>
            <Reveal className="mb-10 flex flex-col gap-1">
              <span className="kicker">
                <span className="h-px w-7 bg-ember-500" />
                Related reading
              </span>
              <h2 className="text-balance text-2xl font-extrabold uppercase tracking-tightest text-onyx-950 sm:text-3xl">
                More to read
              </h2>
            </Reveal>

            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rp, i) => (
                <Reveal key={rp.id} delay={i * 0.08}>
                  <BlogCard post={rp} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Footer nav bar ───────────────────────────────────────────── */}
      <section className="border-t border-onyx-100 py-14">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-onyx-600 transition-colors hover:text-ember-600"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Back to the Jolchap Journal
            </Link>

            {/* Shop CTA — wide strip */}
            <div className="flex items-center gap-4 rounded-2xl bg-onyx-950 px-7 py-4 ring-1 ring-onyx-800">
              <p className="text-sm font-semibold leading-snug text-white/80">
                Browse our custom prints and gifts
              </p>
              <Button href="/shop" variant="primary" size="sm">
                Shop now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
