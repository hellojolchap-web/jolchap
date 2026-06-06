import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/* ──────────────────────────────────────────────────────────────────────────
   SEO helpers — canonical/OG/Twitter metadata builder + JSON-LD schema.
   ────────────────────────────────────────────────────────────────────────── */

export const SITE_URL = siteConfig.url.replace(/\/$/, "");

export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

interface PageMetaInput {
  title?: string;
  description?: string;
  /** path beginning with "/" — used for canonical + og:url */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  keywords?: string[];
  /** explicit OG image; omit to use the route's generated opengraph-image */
  image?: string;
}

/**
 * Build a complete Metadata object: canonical, Open Graph and Twitter.
 * When `image` is omitted the route's file-based `opengraph-image` is used
 * automatically by Next, so social shares always get a per-page preview.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex,
  keywords,
  image,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const images = image
    ? [{ url: image, width: 1200, height: 630, alt: title ?? siteConfig.name }]
    : undefined;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title: title ?? `${siteConfig.name} — ${siteConfig.tagline}`,
      description: description ?? siteConfig.shortDescription,
      locale: "en_US",
      ...(images ? { images } : {}),
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.shortDescription,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ── JSON-LD builders ─────────────────────────────────────────────────────── */

const sameAs = Object.values(siteConfig.socials).filter(Boolean);

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: SITE_URL,
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl(siteConfig.ogImage),
    description: siteConfig.shortDescription,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "customer service",
      areaServed: "BD",
      availableLanguage: ["en", "bn"],
    },
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: siteConfig.name,
    url: SITE_URL,
    description: siteConfig.shortDescription,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function localBusinessLd() {
  const a = siteConfig.contact.address;
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${SITE_URL}/#store`,
    name: siteConfig.legalName,
    image: absoluteUrl(siteConfig.ogImage),
    url: SITE_URL,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: "৳৳",
    address: {
      "@type": "PostalAddress",
      streetAddress: a.line1,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postcode,
      addressCountry: "BD",
    },
    openingHours: "Sa-Th 10:00-20:00",
    sameAs,
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function blogPostingLd(post: {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  author: { name: string };
  readingTime: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": absoluteUrl(`/blog/${post.slug}`),
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.coverImage),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${post.slug}`) },
    wordCount: post.readingTime * 200,
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
