"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

const SUGGESTIONS = [
  "Custom stamp",
  "Photo mug",
  "T-shirt printing",
  "Wax seal",
  "Tote bag",
  "Wedding cards",
];

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (term: string) => {
    const value = term.trim();
    onClose();
    router.push(value ? `/shop?q=${encodeURIComponent(value)}` : "/shop");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-start justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Close search"
            onClick={onClose}
            className="absolute inset-0 bg-onyx-950/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-24 w-full max-w-2xl px-5"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit(q);
              }}
              className="flex items-center gap-3 rounded-2xl bg-white p-2 pl-5 shadow-elevated"
            >
              <Search className="h-5 w-5 shrink-0 text-onyx-400" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search stamps, mugs, t-shirts…"
                className="h-12 w-full bg-transparent text-lg text-onyx-900 outline-none placeholder:text-onyx-300"
              />
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-onyx-400 transition-colors hover:bg-onyx-100 hover:text-onyx-900"
              >
                <X className="h-5 w-5" />
              </button>
            </form>
            <div className="mt-4 flex flex-wrap items-center gap-2 px-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Popular:
              </span>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white backdrop-blur transition-colors hover:border-ember-500 hover:bg-ember-500"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
