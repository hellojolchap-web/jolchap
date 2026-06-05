import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { BrandStrip } from "@/components/home/BrandStrip";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ValueProps } from "@/components/home/ValueProps";
import { Spotlight } from "@/components/home/Spotlight";
import { StatsBand } from "@/components/home/StatsBand";
import { TestimonialWall } from "@/components/home/TestimonialWall";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FinalCta } from "@/components/home/FinalCta";

import {
  getFeaturedProducts,
  getBestsellers,
  getNewArrivals,
  getCategories,
  getBlogPosts,
  getTestimonials,
} from "@/lib/queries";
import { siteConfig } from "@/config/site";
import type { Product } from "@/types";

export const metadata: Metadata = {
  description:
    "Jolchap — a Dhaka-based custom print & personalisation studio. Design custom seals & stamps, printed t-shirts, photo mugs, tote bags, personalised gifts and wedding stationery. Free design preview before you pay and fast delivery across Bangladesh.",
};

/** De-duplicate a list of products by id, preserving first-seen order. */
function dedupe(products: Product[]): Product[] {
  const seen = new Set<string>();
  return products.filter((p) => (seen.has(p.id) ? false : seen.add(p.id)));
}

export default async function HomePage() {
  const [featured, bestsellers, newArrivals, categories, posts, testimonials] =
    await Promise.all([
      getFeaturedProducts(),
      getBestsellers(),
      getNewArrivals(),
      getCategories(),
      getBlogPosts(),
      getTestimonials(),
    ]);

  // Hero leads with the first featured product.
  const heroProduct = featured[0] ?? bestsellers[0] ?? newArrivals[0];

  // "Most loved": featured first, then bestsellers, then new — de-duped.
  // FeaturedProducts caps the visible count and powers its own tab filter.
  const mostLoved = dedupe([...featured, ...bestsellers, ...newArrivals]);

  // Spotlight: a different favourite that isn't already in the hero.
  // Prefer an apparel or wax-seal piece for visual contrast, else any other
  // featured product, else any product that isn't the hero.
  const spotlightProduct =
    featured.find(
      (p) => p.id !== heroProduct?.id && (p.tags.includes("tshirt") || p.tags.includes("wax"))
    ) ??
    featured.find((p) => p.id !== heroProduct?.id) ??
    mostLoved.find((p) => p.id !== heroProduct?.id) ??
    heroProduct;

  return (
    <>
      {heroProduct && <Hero product={heroProduct} />}

      <BrandStrip />

      <CategoryShowcase categories={categories} />

      <FeaturedProducts products={mostLoved} />

      <ValueProps />

      {spotlightProduct && <Spotlight product={spotlightProduct} />}

      <StatsBand />

      <TestimonialWall testimonials={testimonials} />

      <BlogPreview posts={posts.slice(0, 3)} />

      <FinalCta />
    </>
  );
}
