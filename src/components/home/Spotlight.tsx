import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import { formatPrice, discountPercent } from "@/lib/utils";
import type { Product } from "@/types";

/**
 * Dark full-bleed product spotlight. One favourite product, given the full
 * editorial treatment: onyx stage, ember glow, oversized copy, a short feature
 * list and a direct CTA to the product page. The single loud ember moment on
 * the page.
 */
export function Spotlight({ product }: { product: Product }) {
  const discount = discountPercent(product.price, product.compareAtPrice);
  const features = product.features.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-onyx-950 text-white">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" aria-hidden />
      <div
        className="pointer-events-none absolute -right-32 top-1/2 h-[640px] w-[640px] -translate-y-1/2 rounded-full bg-ember-500/25 blur-[150px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-ember-700/20 blur-[140px]"
        aria-hidden
      />

      <Container className="relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        {/* copy */}
        <div className="order-2 max-w-xl lg:order-1">
          <span className="kicker text-ember-400">
            <span className="h-px w-7 bg-ember-500" />
            Customer favourite
          </span>

          <h2 className="mt-5 text-balance text-4xl font-extrabold uppercase leading-[0.95] tracking-tightest text-white sm:text-5xl lg:text-6xl">
            {product.name}
          </h2>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/65">
            {product.shortDescription}
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-white/80">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ember-500/15 text-ember-400">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-white">
                {formatPrice(product.price, product.currency)}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-white/40 line-through">
                  {formatPrice(product.compareAtPrice, product.currency)}
                </span>
              )}
              {discount > 0 && (
                <span className="rounded-full bg-ember-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
                  Save {discount}%
                </span>
              )}
            </div>
            <Stars rating={product.rating} count={product.reviewCount} size={15} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`/product/${product.slug}`} variant="primary" size="lg">
              Shop {product.name.split(" ")[0]}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
            <Button href={`/category/${product.categorySlug}`} variant="light" size="lg">
              More {product.categoryName}
            </Button>
          </div>
        </div>

        {/* visual */}
        <div className="relative order-1 mx-auto w-full max-w-lg lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-onyx-900 shadow-glow-lg ring-1 ring-white/10">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width:1024px) 90vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/60 via-transparent to-transparent" />

            {product.badge && (
              <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-onyx-950">
                {product.badge}
              </span>
            )}
          </div>

          {/* floating spec chip */}
          {product.specs[0] && (
            <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-white/10 bg-onyx-900/90 px-5 py-4 backdrop-blur sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                {product.specs[0].label}
              </p>
              <p className="mt-0.5 text-lg font-extrabold text-white">
                {product.specs[0].value}
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
