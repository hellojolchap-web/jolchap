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
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    { name: "jolchap-cart" }
  )
);

/** Derived selectors. */
export const cartCount = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.quantity, 0);

export const cartSubtotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0);
