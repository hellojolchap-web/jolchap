"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────────────
   Branded confirm dialog — replaces the browser's native window.confirm().
   Usage:
     const confirm = useConfirm();
     if (await confirm({ title: "Delete this?", tone: "danger" })) { ... }
   ────────────────────────────────────────────────────────────────────────── */

export type ConfirmOptions = {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  tone?: "default" | "danger";
};

const ConfirmContext = createContext<(o: ConfirmOptions) => Promise<boolean>>(
  async () => false
);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolver = useRef<((v: boolean) => void) | null>(null);

  const confirm = useCallback((opts: ConfirmOptions) => {
    setOptions(opts);
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  const settle = useCallback((result: boolean) => {
    resolver.current?.(result);
    resolver.current = null;
    setOptions(null);
  }, []);

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <AnimatePresence>
        {options && (
          <Dialog
            options={options}
            onCancel={() => settle(false)}
            onConfirm={() => settle(true)}
          />
        )}
      </AnimatePresence>
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmContext);
}

function Dialog({
  options,
  onCancel,
  onConfirm,
}: {
  options: ConfirmOptions;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const danger = options.tone === "danger";
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    confirmRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
      if (e.key === "Enter") onConfirm();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel, onConfirm]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="absolute inset-0 bg-onyx-950/55 backdrop-blur-sm"
      />
      <motion.div
        role="alertdialog"
        aria-modal="true"
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-7 shadow-elevated ring-1 ring-onyx-100"
      >
        <span
          className={cn(
            "grid h-12 w-12 place-items-center rounded-2xl",
            danger ? "bg-red-50 text-red-600" : "bg-ember-50 text-ember-600"
          )}
        >
          {danger ? <Trash2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
        </span>

        <h2 className="mt-5 font-display text-xl font-extrabold tracking-tightest text-onyx-950">
          {options.title}
        </h2>
        {options.message && (
          <p className="mt-2 text-sm leading-relaxed text-onyx-500">{options.message}</p>
        )}

        <div className="mt-7 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-onyx-200 px-4 py-2.5 text-sm font-semibold text-onyx-700 transition-colors hover:bg-onyx-50"
          >
            {options.cancelText ?? "Cancel"}
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            className={cn(
              "flex-1 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              danger
                ? "bg-red-600 hover:bg-red-700 focus-visible:ring-red-500"
                : "bg-ember-500 hover:bg-ember-600 focus-visible:ring-ember-500"
            )}
          >
            {options.confirmText ?? "Confirm"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
