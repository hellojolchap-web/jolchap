"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  add: (item: CartItem) => void;
  remove: (key: string) => void;
  setQty: (key: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  /** Applied promo code (validated against in-cart products at checkout). */
  promoCode: string;
  setPromoCode: (code: string) => void;
  /** Delivery zone — drives which settings charge applies. */
  deliveryZone: "inside" | "outside";
  setDeliveryZone: (zone: "inside" | "outside") => void;
}

/** Unique line key combining product + chosen variant. */
export const lineKey = (i: Pick<CartItem, "productId" | "size" | "color">) =>
  `${i.productId}::${i.size ?? "-"}::${i.color ?? "-"}`;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (item) =>
        set((state) => {
          const key = lineKey(item);
          const existing = state.items.find((i) => lineKey(i) === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                lineKey(i) === key
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              isOpen: true,
            };
          }
          return { items: [...state.items, item], isOpen: true };
        }),
      remove: (key) =>
        set((state) => ({
          items: state.items.filter((i) => lineKey(i) !== key),
        })),
      setQty: (key, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              lineKey(i) === key ? { ...i, quantity: Math.max(1, quantity) } : i
            )
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [], promoCode: "" }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      promoCode: "",
      setPromoCode: (code) => set({ promoCode: code }),
      deliveryZone: "inside",
      setDeliveryZone: (zone) => set({ deliveryZone: zone }),
    }),
    { name: "jolchap-cart" }
  )
);

/** Derived selectors. */
export const cartCount = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.quantity, 0);

export const cartSubtotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0);

/** True when at least one item in the bag is NOT free-delivery. */
export const cartHasPaidDelivery = (items: CartItem[]) =>
  items.some((i) => !i.freeDelivery);

/** Per-product promo: sum the discount across items whose code matches `code`
    (and isn't past its expiry). Returns the discount + whether anything matched. */
export function cartPromoDiscount(items: CartItem[], code: string) {
  const c = code.trim().toUpperCase();
  if (!c) return { discount: 0, matched: false };
  const now = new Date();
  let discount = 0;
  let matched = false;
  for (const i of items) {
    if (!i.promoCode || i.promoCode.trim().toUpperCase() !== c) continue;
    if (i.promoExpiry) {
      const exp = new Date(`${i.promoExpiry}T23:59:59`);
      if (!Number.isNaN(exp.getTime()) && exp < now) continue; // expired
    }
    matched = true;
    const line = i.price * i.quantity;
    discount +=
      i.promoType === "percent"
        ? (line * (i.promoDiscount || 0)) / 100
        : Math.min(i.promoDiscount || 0, line);
  }
  return { discount: Math.round(discount), matched };
}
