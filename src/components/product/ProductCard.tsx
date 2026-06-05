"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Stars } from "@/components/ui/Stars";
import { useCart } from "@/lib/store/cart";
import { formatPrice, discountPercent, cn } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCard({
  product,
  className,
  priority = false,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);
  const discount = discountPercent(product.price, product.compareAtPrice);

  const quickAdd = () => {
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      currency: product.currency,
      size: product.sizes[0] ?? null,
      color: product.colors[0]?.name ?? null,
      quantity: 1,
    });
    setAdded(true);
    toast.success(`${product.name} added to bag`);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white ring-1 ring-onyx-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          className="object-cover transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-0"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
          />
        )}

        {/* badges */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.badge && (
            <span className="rounded-full bg-onyx-950 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-ember-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              −{discount}%
            </span>
          )}
        </div>

        {/* quick add */}
        <button
          onClick={quickAdd}
          aria-label={`Add ${product.name} to bag`}
          className="absolute bottom-3 right-3 z-20 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-white text-onyx-950 opacity-0 shadow-card transition-all duration-300 hover:bg-ember-500 hover:text-white group-hover:translate-y-0 group-hover:opacity-100"
        >
          {added ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-3.5">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-onyx-400">
          {product.categoryName}
        </span>
        <h3 className="mt-1 text-[15px] font-semibold leading-snug text-onyx-950">
          {product.name}
        </h3>
        <div className="mt-1.5">
          <Stars rating={product.rating} count={product.reviewCount} size={13} />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-base font-extrabold text-onyx-950">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-onyx-400 line-through">
              {formatPrice(product.compareAtPrice, product.currency)}
            </span>
          )}
        </div>
      </div>

      {/* stretched link (sits below the quick-add button) */}
      <Link
        href={`/product/${product.slug}`}
        className="absolute inset-0 z-10"
        aria-label={product.name}
      />
    </article>
  );
}
