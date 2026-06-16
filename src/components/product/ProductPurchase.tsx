"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  MessageCircle,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Stars } from "@/components/ui/Stars";
import { useCart } from "@/lib/store/cart";
import { siteConfig } from "@/config/site";
import { cn, discountPercent, formatPrice, whatsappLink } from "@/lib/utils";
import type { Product } from "@/types";

/* ──────────────────────────────────────────────────────────────────────────
   Jolchap — Product purchase panel
   Variant selection (colour + size), quantity, add-to-bag / buy-now actions,
   live stock signal, an accordion of shipping & returns, and a WhatsApp
   "ask about this product" deep link.
   ────────────────────────────────────────────────────────────────────────── */

export function ProductPurchase({ product }: { product: Product }) {
  const router = useRouter();
  const add = useCart((s) => s.add);
  const open = useCart((s) => s.open);

  const discount = discountPercent(product.price, product.compareAtPrice);
  const [color, setColor] = useState(product.colors[0]?.name ?? null);
  const [size, setSize] = useState(product.sizes[0] ?? null);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const lowStock = product.inStock && product.stockCount > 0 && product.stockCount <= 15;

  const buildItem = () => ({
    productId: product.id,
    slug: product.slug,
    name: product.name,
    image: product.images[0],
    price: product.price,
    currency: product.currency,
    size,
    color,
    quantity: qty,
    freeDelivery: product.freeDelivery ?? false,
    promoCode: product.promoCode ?? "",
    promoDiscount: product.promoDiscount ?? 0,
    promoType: product.promoType ?? "flat",
    promoExpiry: product.promoExpiry ?? "",
  });

  const handleAdd = () => {
    add(buildItem());
    open();
    setJustAdded(true);
    toast.success(`${product.name} added to bag`, {
      description: [color, size].filter(Boolean).join(" · ") || undefined,
    });
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleBuyNow = () => {
    add(buildItem());
    router.push("/cart");
  };

  const waHref = whatsappLink(
    siteConfig.contact.whatsapp,
    `Hi Jolchap 👋 — I'd like to ask about the ${product.name}${
      size ? ` (${size})` : ""
    }. Could you help me out?`
  );

  return (
    <div className="flex flex-col">
      {/* eyebrow + title */}
      <span className="text-[11px] font-bold uppercase tracking-widest text-ember-600">
        {product.categoryName}
      </span>
      <h1 className="mt-2 text-3xl font-extrabold uppercase leading-[0.98] tracking-tightest text-onyx-950 sm:text-4xl">
        {product.name}
      </h1>

      {/* rating */}
      <div className="mt-3 flex items-center gap-3">
        <Stars rating={product.rating} size={16} />
        <span className="text-sm text-onyx-500">
          <span className="font-semibold text-onyx-950">{product.rating.toFixed(1)}</span>{" "}
          · {product.reviewCount} reviews
        </span>
      </div>

      {/* price */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="text-3xl font-extrabold text-onyx-950">
          {formatPrice(product.price, product.currency)}
        </span>
        {product.compareAtPrice && (
          <span className="text-lg text-onyx-400 line-through">
            {formatPrice(product.compareAtPrice, product.currency)}
          </span>
        )}
        {discount > 0 && (
          <span className="rounded-full bg-ember-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-ember-600">
            Save {discount}%
          </span>
        )}
      </div>

      <p className="mt-5 max-w-prose text-[15px] leading-relaxed text-onyx-600">
        {product.shortDescription}
      </p>

      <div className="my-7 hairline" />

      {/* colour */}
      {product.colors.length > 0 && (
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-onyx-400">
              Colour
            </span>
            {color && (
              <span className="text-sm font-semibold text-onyx-950">{color}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {product.colors.map((c) => {
              const selected = c.name === color;
              return (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  title={c.name}
                  aria-label={c.name}
                  aria-pressed={selected}
                  className={cn(
                    "relative grid h-10 w-10 place-items-center rounded-full ring-1 ring-onyx-200 transition-all",
                    selected && "ring-2 ring-onyx-950 ring-offset-2 ring-offset-bone"
                  )}
                >
                  <span
                    className="h-7 w-7 rounded-full ring-1 ring-inset ring-black/10"
                    style={{ backgroundColor: c.hex }}
                  />
                  {selected && (
                    <Check
                      className={cn(
                        "absolute h-4 w-4",
                        isLight(c.hex) ? "text-onyx-950" : "text-white"
                      )}
                      strokeWidth={3}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* size */}
      {product.sizes.length > 0 && (
        <div className="mb-7">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-widest text-onyx-400">
              Size
            </span>
            <a
              href="/size-guide"
              className="text-xs font-semibold text-onyx-500 underline-offset-2 hover:text-ember-600 hover:underline"
            >
              Size guide
            </a>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {product.sizes.map((s) => {
              const selected = s === size;
              return (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  aria-pressed={selected}
                  className={cn(
                    "min-w-[3.25rem] rounded-xl border px-4 py-2.5 text-sm font-bold transition-all",
                    selected
                      ? "border-onyx-950 bg-onyx-950 text-white"
                      : "border-onyx-200 bg-white text-onyx-800 hover:border-onyx-950"
                  )}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* quantity + stock */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-full border border-onyx-200 bg-white">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
            className="grid h-11 w-11 place-items-center rounded-l-full text-onyx-700 transition-colors hover:text-ember-600 disabled:opacity-40"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-base font-bold tabular-nums text-onyx-950">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => Math.min(product.stockCount || 99, q + 1))}
            aria-label="Increase quantity"
            className="grid h-11 w-11 place-items-center rounded-r-full text-onyx-700 transition-colors hover:text-ember-600"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <StockSignal inStock={product.inStock} low={lowStock} count={product.stockCount} />
      </div>

      {/* actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className={cn(
            "group/btn relative inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-full text-base font-bold text-white shadow-glow-sm transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
            "bg-ember-500 hover:bg-ember-600 hover:shadow-glow"
          )}
        >
          {justAdded ? (
            <>
              <Check className="h-5 w-5" /> Added to bag
            </>
          ) : (
            <>
              <ShoppingBag className="h-5 w-5" />
              {product.inStock ? "Add to bag" : "Sold out"}
            </>
          )}
        </button>
        <button
          onClick={handleBuyNow}
          disabled={!product.inStock}
          className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-onyx-950 text-base font-bold text-white transition-all hover:bg-onyx-800 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
        >
          <Zap className="h-5 w-5 text-ember-400" />
          Buy it now
        </button>
      </div>

      {/* WhatsApp */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-onyx-200 bg-white py-3 text-sm font-semibold text-onyx-800 transition-colors hover:border-onyx-950"
      >
        <MessageCircle className="h-4 w-4 text-ember-500" />
        Ask about this product on WhatsApp
      </a>

      {/* trust row */}
      <div className="mt-7 grid grid-cols-3 gap-2 rounded-2xl bg-onyx-50 p-4 ring-1 ring-onyx-100">
        <TrustCell icon={<Truck className="h-5 w-5" />} label="Free shipping over $99" />
        <TrustCell icon={<RotateCcw className="h-5 w-5" />} label="30-day returns" />
        <TrustCell icon={<ShieldCheck className="h-5 w-5" />} label="Lifetime guarantee" />
      </div>

      {/* feature highlights */}
      {product.features.length > 0 && (
        <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
          {product.features.slice(0, 6).map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-onyx-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember-500" strokeWidth={3} />
              {f}
            </li>
          ))}
        </ul>
      )}

      {/* accordions */}
      <div className="mt-7 divide-y divide-onyx-100 border-y border-onyx-100">
        <Accordion title="Shipping & delivery" defaultOpen>
          <p>
            Free standard shipping on every order over $99 — flat $9.99 below that. Orders
            placed before 2pm EST ship the same business day, with delivery in 2–5 business
            days across the contiguous US. Tracking lands in your inbox the moment it leaves
            the warehouse.
          </p>
        </Accordion>
        <Accordion title="Returns & exchanges">
          <p>
            Not the right fit? Send it back within 30 days for a full refund or a free size
            exchange — unworn gear in its original packaging, no questions asked. We email a
            prepaid label and process refunds within three business days of receipt.
          </p>
        </Accordion>
        <Accordion title="Our print guarantee">
          <p>
            Every Jolchap order is checked by hand and backed by our reprint-if-it&apos;s-wrong
            guarantee. If the colour, print or personalisation isn&apos;t right, we&apos;ll redo it —
            no argument, no cost to you.
          </p>
        </Accordion>
      </div>
    </div>
  );
}

/* ── helpers ── */

function isLight(hex: string) {
  const h = hex.replace("#", "");
  if (h.length < 6) return false;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  // perceived luminance
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.7;
}

function StockSignal({
  inStock,
  low,
  count,
}: {
  inStock: boolean;
  low: boolean;
  count: number;
}) {
  if (!inStock) {
    return (
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-onyx-500">
        <span className="h-2 w-2 rounded-full bg-onyx-400" />
        Out of stock
      </span>
    );
  }
  if (low) {
    return (
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-ember-600">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ember-500" />
        </span>
        Only {count} left — selling fast
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold text-onyx-700">
      <Check className="h-4 w-4 text-ember-500" strokeWidth={3} />
      In stock, ready to ship
    </span>
  );
}

function TrustCell({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-ember-500">{icon}</span>
      <span className="text-[11px] font-medium leading-tight text-onyx-600">{label}</span>
    </div>
  );
}

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-bold text-onyx-950">{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-onyx-400 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-sm leading-relaxed text-onyx-600">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
