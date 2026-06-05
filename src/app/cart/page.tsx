"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { CheckoutForm } from "@/components/commerce/CheckoutForm";
import { useCart, lineKey, cartSubtotal, cartCount } from "@/lib/store/cart";
import { cn, formatPrice } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 99;
const SHIPPING_FLAT = 9.99;
const TAX_RATE = 0.08;

export default function CartPage() {
  const { items, remove, setQty } = useCart();
  const subtotal = cartSubtotal(items);
  const count = cartCount(items);
  const currency = items[0]?.currency ?? "USD";

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const [promo, setPromo] = useState("");
  const [promoMsg, setPromoMsg] = useState<string | null>(null);

  const applyPromo = () => {
    if (!promo.trim()) return;
    setPromoMsg("Promo codes are applied at our demo checkout — your total stands.");
    toast.message("Code noted", {
      description: `“${promo.trim().toUpperCase()}” will be reviewed at checkout.`,
    });
  };

  /* ── Empty state ── */
  if (items.length === 0) {
    return (
      <div className="bg-bone">
        <Container className="py-7">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: "Cart" },
            ]}
          />
        </Container>
        <Container className="flex flex-col items-center justify-center px-6 py-20 text-center lg:py-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="grid h-24 w-24 place-items-center rounded-full bg-white shadow-card ring-1 ring-onyx-100"
          >
            <ShoppingBag className="h-10 w-10 text-onyx-300" />
          </motion.div>
          <h1 className="mt-7 text-3xl font-extrabold uppercase tracking-tightest text-onyx-950 sm:text-4xl">
            Your bag is empty
          </h1>
          <p className="mt-3 max-w-md text-onyx-500">
            Nothing in the bag yet. Browse our custom stamps, mugs, apparel and more.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ember-500 px-7 py-3.5 text-sm font-bold text-white shadow-glow-sm transition-all hover:bg-ember-600 hover:shadow-glow"
          >
            Shop all products
            <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="mt-14 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            <PerkCard icon={<Truck className="h-5 w-5" />} title="Free shipping" copy="On orders over $99" />
            <PerkCard icon={<RotateCcw className="h-5 w-5" />} title="30-day returns" copy="No-sweat exchanges" />
            <PerkCard icon={<ShieldCheck className="h-5 w-5" />} title="Lifetime guarantee" copy="On every build" />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-bone">
      <Container className="py-7">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: "Cart" },
          ]}
        />
      </Container>

      <Container className="pb-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <h1 className="text-3xl font-extrabold uppercase tracking-tightest text-onyx-950 sm:text-4xl">
            Your bag
          </h1>
          <span className="text-sm text-onyx-500">
            <span className="font-bold text-onyx-950">{count}</span>{" "}
            {count === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_420px]">
          {/* ── Left: line items + checkout ── */}
          <div className="min-w-0">
            {/* free shipping meter */}
            <div className="mb-6 rounded-2xl border border-onyx-100 bg-white p-4">
              <p className="mb-2 flex items-center gap-2 text-sm text-onyx-600">
                <Truck className="h-4 w-4 text-ember-500" />
                {remaining > 0 ? (
                  <>
                    You&apos;re{" "}
                    <strong className="text-onyx-950">
                      {formatPrice(remaining, currency)}
                    </strong>{" "}
                    away from free shipping
                  </>
                ) : (
                  <strong className="text-ember-600">
                    Free shipping unlocked — nice work.
                  </strong>
                )}
              </p>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-onyx-100">
                <motion.div
                  className="h-full rounded-full bg-ember-grad"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            {/* items */}
            <ul className="divide-y divide-onyx-100 overflow-hidden rounded-3xl border border-onyx-100 bg-white">
              {items.map((item) => {
                const key = lineKey(item);
                const variant = [item.color, item.size].filter(Boolean).join(" · ");
                return (
                  <motion.li
                    key={key}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-4 p-4 sm:p-5"
                  >
                    <Link
                      href={`/product/${item.slug}`}
                      className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-bone ring-1 ring-onyx-100 sm:h-32 sm:w-28"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            href={`/product/${item.slug}`}
                            className="line-clamp-2 text-[15px] font-bold leading-snug text-onyx-950 hover:text-ember-600"
                          >
                            {item.name}
                          </Link>
                          {variant && (
                            <p className="mt-1 text-xs font-medium text-onyx-400">
                              {variant}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            remove(key);
                            toast.success("Removed from bag");
                          }}
                          aria-label={`Remove ${item.name}`}
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-onyx-300 transition-colors hover:bg-ember-50 hover:text-ember-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-end justify-between pt-3">
                        <div className="flex items-center rounded-full border border-onyx-200">
                          <button
                            onClick={() => setQty(key, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                            className="grid h-9 w-9 place-items-center rounded-l-full text-onyx-600 transition-colors hover:text-ember-600 disabled:opacity-40"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => setQty(key, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="grid h-9 w-9 place-items-center rounded-r-full text-onyx-600 transition-colors hover:text-ember-600"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-base font-extrabold text-onyx-950">
                            {formatPrice(item.price * item.quantity, item.currency)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-onyx-400">
                              {formatPrice(item.price, item.currency)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-5 flex items-center justify-between">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-sm font-semibold text-onyx-700 transition-colors hover:text-ember-600"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Continue shopping
              </Link>
            </div>

            {/* checkout */}
            <div id="checkout" className="mt-12">
              <h2 className="mb-6 text-2xl font-extrabold uppercase tracking-tightest text-onyx-950">
                Checkout
              </h2>
              <CheckoutForm />
            </div>
          </div>

          {/* ── Right: sticky summary ── */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-onyx-100 bg-white p-6 shadow-card">
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-onyx-950">
                Order summary
              </h2>

              {/* promo */}
              <div className="mt-5">
                <label className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-onyx-400">
                  <Tag className="h-3.5 w-3.5" />
                  Promo code
                </label>
                <div className="flex gap-2">
                  <input
                    value={promo}
                    onChange={(e) => {
                      setPromo(e.target.value);
                      setPromoMsg(null);
                    }}
                    placeholder="JOLCHAP10"
                    className="h-11 flex-1 rounded-full border border-onyx-200 bg-white px-4 text-sm font-medium uppercase tracking-wide text-onyx-900 outline-none transition-colors placeholder:font-normal placeholder:tracking-normal placeholder:text-onyx-300 focus:border-onyx-950"
                  />
                  <button
                    onClick={applyPromo}
                    className="shrink-0 rounded-full bg-onyx-950 px-5 text-sm font-bold text-white transition-colors hover:bg-onyx-800"
                  >
                    Apply
                  </button>
                </div>
                {promoMsg && (
                  <p className="mt-2 text-xs text-onyx-400">{promoMsg}</p>
                )}
              </div>

              <div className="my-5 hairline" />

              <dl className="space-y-3 text-sm">
                <Row label="Subtotal">
                  {formatPrice(subtotal, currency)}
                </Row>
                <Row label="Shipping">
                  {shipping === 0 ? (
                    <span className="font-bold text-ember-600">Free</span>
                  ) : (
                    formatPrice(shipping, currency)
                  )}
                </Row>
                <Row label="Estimated tax (8%)">
                  {formatPrice(tax, currency)}
                </Row>
              </dl>

              <div className="my-5 hairline" />

              <div className="flex items-end justify-between">
                <span className="text-sm font-bold uppercase tracking-wide text-onyx-950">
                  Total
                </span>
                <div className="text-right">
                  <span className="block text-2xl font-extrabold text-onyx-950">
                    {formatPrice(total, currency)}
                  </span>
                  <span className="text-xs text-onyx-400">
                    {currency} · tax included
                  </span>
                </div>
              </div>

              <a
                href="#checkout"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ember-500 py-4 text-base font-bold text-white shadow-glow-sm transition-all hover:bg-ember-600 hover:shadow-glow"
              >
                Go to checkout
                <ArrowRight className="h-4 w-4" />
              </a>

              {/* trust */}
              <ul className="mt-6 space-y-2.5 text-xs text-onyx-500">
                <TrustLi icon={<ShieldCheck className="h-4 w-4 text-ember-500" />}>
                  Secure 256-bit encrypted checkout
                </TrustLi>
                <TrustLi icon={<RotateCcw className="h-4 w-4 text-ember-500" />}>
                  30-day no-sweat returns &amp; exchanges
                </TrustLi>
                <TrustLi icon={<Truck className="h-4 w-4 text-ember-500" />}>
                  Free shipping on orders over $99
                </TrustLi>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-onyx-500">{label}</dt>
      <dd className="font-semibold text-onyx-950">{children}</dd>
    </div>
  );
}

function TrustLi({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-2">
      {icon}
      {children}
    </li>
  );
}

function PerkCard({
  icon,
  title,
  copy,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-onyx-100 bg-white p-5 text-center">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-ember-50 text-ember-600">
        {icon}
      </span>
      <p className="text-sm font-bold text-onyx-950">{title}</p>
      <p className="text-xs text-onyx-500">{copy}</p>
    </div>
  );
}
