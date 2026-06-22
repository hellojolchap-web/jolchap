"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSettings } from "@/components/providers/SettingsProvider";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ product }: { product: Product }) {
  const { hero, brand } = useSettings();
  const hasBanners = hero.images.length > 0;

  return (
    <section className="relative overflow-hidden bg-bone">
      {/* background flourishes */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.6]" />
      <div className="pointer-events-none absolute -right-32 top-0 h-[640px] w-[640px] rounded-full bg-ember-500/15 blur-[140px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-onyx-950/5 blur-[120px]" />

      <div className="container relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        {/* copy */}
        <div className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-onyx-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-onyx-700 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
            Custom Print &amp; Personalisation Studio
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease }}
            className="mt-6 text-5xl font-extrabold uppercase leading-[0.92] tracking-tightest text-onyx-950 sm:text-6xl lg:text-7xl"
          >
            <span className="text-ember-flow">Make</span> it
            <br />
            <span className="text-ember-flow">yours.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease }}
            className="mt-6 max-w-md text-lg leading-relaxed text-onyx-600"
          >
            {brand.shortDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href="/shop" size="lg">
              Start customising
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
            <Button href="/category/seals-stamps" variant="outline" size="lg">
              Browse products
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-onyx-600"
          >
            <span className="flex items-center gap-2">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-ember-500 text-ember-500" />
                ))}
              </span>
              <strong className="text-onyx-950">4.9</strong> / 8,000+ happy customers
            </span>
            <span className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-ember-500" /> Free delivery in Dhaka
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-ember-500" /> Quality guaranteed
            </span>
          </motion.div>
        </div>

        {/* visual — custom banner slideshow if set, else the product showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          {hasBanners ? (
            <BannerSlideshow images={hero.images} float={hero.float} autoplay={hero.autoplay} />
          ) : (
            <ProductShowcase product={product} float={hero.float} />
          )}

          {/* floating stat — only on the default product showcase, so it never
              covers a custom banner */}
          {!hasBanners && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="absolute -left-4 top-10 z-10 hidden rounded-2xl border border-onyx-100 bg-white p-4 shadow-card sm:block"
            >
              <p className="text-2xl font-extrabold text-onyx-950">50k+</p>
              <p className="text-xs text-onyx-500">Custom items printed</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* Settings-driven banner slideshow. Each image shows in FULL (no crop): the
   frame takes on each image's own aspect ratio and animates as slides change. */
function BannerSlideshow({
  images,
  float,
  autoplay,
}: {
  images: string[];
  float: boolean;
  autoplay: boolean;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!autoplay || images.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, [autoplay, images.length]);

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-onyx-100 shadow-elevated",
        float && "animate-float"
      )}
    >
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${src}-${i}`}
          src={src}
          alt=""
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            i === idx ? "opacity-100" : "opacity-0"
          )}
        />
      ))}

      {images.length > 1 && (
        <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Show slide ${i + 1}`}
              className={cn(
                "h-2 rounded-full bg-onyx-950/70 transition-all",
                i === idx ? "w-6 opacity-100" : "w-2 opacity-40 hover:opacity-70"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* Default visual — the featured product card. */
function ProductShowcase({ product, float }: { product: Product; float: boolean }) {
  return (
    <div className={cn("relative", float && "animate-float")}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-onyx-950 shadow-elevated">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority
          sizes="(max-width:1024px) 90vw, 45vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/70 via-transparent to-transparent" />

        {/* rotating seal */}
        <div className="absolute right-5 top-5 grid h-20 w-20 place-items-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow text-white/80">
            <defs>
              <path id="seal" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
            </defs>
            <text className="fill-current text-[10.5px] font-semibold uppercase tracking-[0.18em]">
              <textPath href="#seal" startOffset="0%">
                Jolchap • Make It Yours • Jolchap • Custom •
              </textPath>
            </text>
          </svg>
          <span className="h-2 w-2 rounded-full bg-ember-500" />
        </div>

        {/* product chip */}
        <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl bg-white/90 p-4 backdrop-blur">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-ember-600">
              {product.badge ?? "Featured"}
            </p>
            <p className="mt-0.5 text-sm font-bold leading-tight text-onyx-950">
              {product.name}
            </p>
          </div>
          <span className="rounded-full bg-onyx-950 px-3 py-1.5 text-sm font-extrabold text-white">
            {formatPrice(product.price, product.currency)}
          </span>
        </div>
      </div>
    </div>
  );
}
