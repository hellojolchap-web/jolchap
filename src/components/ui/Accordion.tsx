"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  q: string;
  a: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  /** Allow multiple panels open simultaneously */
  multi?: boolean;
}

export function Accordion({ items, className, multi = false }: AccordionProps) {
  const [open, setOpen] = useState<Set<number>>(new Set());

  function toggle(idx: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        if (!multi) next.clear();
        next.add(idx);
      }
      return next;
    });
  }

  return (
    <div className={cn("divide-y divide-onyx-100", className)}>
      {items.map((item, idx) => {
        const isOpen = open.has(idx);
        return (
          <div key={idx}>
            <button
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className={cn(
                "group flex w-full items-start justify-between gap-4 py-5 text-left transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-inset"
              )}
            >
              <span
                className={cn(
                  "font-display text-[15px] font-bold uppercase tracking-tightest leading-snug transition-colors",
                  isOpen ? "text-ember-600" : "text-onyx-950 group-hover:text-ember-600"
                )}
              >
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-colors",
                  isOpen
                    ? "bg-ember-500 text-white"
                    : "bg-onyx-100 text-onyx-500 group-hover:bg-ember-50 group-hover:text-ember-600"
                )}
              >
                <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.5} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="pb-5 pr-10 text-[15px] leading-relaxed text-onyx-600">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
