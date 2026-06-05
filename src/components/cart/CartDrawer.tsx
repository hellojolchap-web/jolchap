"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart, lineKey, cartSubtotal } from "@/lib/store/cart";
import { formatPrice, clamp } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 99;

export function CartDrawer() {
  const { items, isOpen, close, remove, setQty } = useCart();
  const subtotal = cartSubtotal(items);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = clamp((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 0, 100);
  const currency = items[0]?.currency ?? "USD";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[120]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Close cart"
            onClick={close}
            className="absolute inset-0 bg-onyx-950/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-bone shadow-elevated"
          >
            <header className="flex items-center justify-between border-b border-onyx-100 px-5 py-4">
              <h2 className="flex items-center gap-2 text-lg font-bold text-onyx-950">
                <ShoppingBag className="h-5 w-5 text-ember-500" />
                Your Bag
                <span className="text-onyx-400">({items.length})</span>
              </h2>
              <button
                onClick={close}
                aria-label="Close cart"
                className="grid h-10 w-10 place-items-center rounded-full text-onyx-500 hover:bg-onyx-100"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {/* free shipping bar */}
            {items.length > 0 && (
              <div className="border-b border-onyx-100 bg-white px-5 py-3">
                <p className="mb-2 flex items-center gap-2 text-xs font-medium text-onyx-600">
                  <Truck className="h-4 w-4 text-ember-500" />
                  {remaining > 0 ? (
                    <>
                      Add <strong className="text-onyx-950">{formatPrice(remaining, currency)}</strong> for free shipping
                    </>
                  ) : (
                    <strong className="text-ember-600">You&apos;ve unlocked free shipping! 🎉</strong>
                  )}
                </p>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-onyx-100">
                  <div
                    className="h-full rounded-full bg-ember-grad transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-onyx-100">
                    <ShoppingBag className="h-7 w-7 text-onyx-400" />
                  </div>
                  <p className="text-onyx-500">Your bag is empty.</p>
                  <Button href="/shop" variant="outline" size="sm" onClick={close}>
                    Start shopping
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => {
                    const key = lineKey(item);
                    return (
                      <li key={key} className="flex gap-4">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={close}
                          className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-white"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/product/${item.slug}`}
                              onClick={close}
                              className="text-sm font-semibold leading-snug text-onyx-950 hover:text-ember-600"
                            >
                              {item.name}
                            </Link>
                            <button
                              onClick={() => remove(key)}
                              aria-label="Remove item"
                              className="text-onyx-300 hover:text-ember-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="mt-0.5 text-xs text-onyx-400">
                            {[item.size, item.color].filter(Boolean).join(" · ")}
                          </p>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center rounded-full border border-onyx-200">
                              <button
                                onClick={() => setQty(key, item.quantity - 1)}
                                aria-label="Decrease quantity"
                                className="grid h-8 w-8 place-items-center text-onyx-600 hover:text-ember-600"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-6 text-center text-sm font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => setQty(key, item.quantity + 1)}
                                aria-label="Increase quantity"
                                className="grid h-8 w-8 place-items-center text-onyx-600 hover:text-ember-600"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="text-sm font-bold text-onyx-950">
                              {formatPrice(item.price * item.quantity, item.currency)}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-onyx-100 bg-white px-5 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-onyx-500">Subtotal</span>
                  <span className="text-xl font-extrabold text-onyx-950">
                    {formatPrice(subtotal, currency)}
                  </span>
                </div>
                <Button href="/cart" className="w-full" size="lg" onClick={close}>
                  Checkout
                </Button>
                <button
                  onClick={close}
                  className="mt-3 w-full text-center text-sm font-medium text-onyx-500 hover:text-onyx-900"
                >
                  Continue shopping
                </button>
              </footer>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
