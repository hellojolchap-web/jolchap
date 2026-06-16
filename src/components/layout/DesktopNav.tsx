"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { NavNode } from "@/config/site";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────────────
   Desktop navigation — top bar with a hover dropdown, plus cascading flyouts
   for nested items (sub → sub-sub). Top level uses a small hover state; the
   nested flyouts are pure CSS group-hover so they stay rock-solid.
   ────────────────────────────────────────────────────────────────────────── */

export function DesktopNav({ nav }: { nav: NavNode[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <nav
      className="hidden items-center gap-1 lg:flex"
      onMouseLeave={() => setActive(null)}
    >
      {nav.map((node, i) => {
        const open = active === node.label && node.children.length > 0;
        return (
          <div
            key={`${node.label}-${i}`}
            className="relative"
            onMouseEnter={() => setActive(node.label)}
          >
            <Link
              href={node.href}
              className={cn(
                "relative flex items-center gap-1 px-3.5 py-2 text-[15px] font-semibold tracking-tight transition-colors",
                node.label === "Offers" || node.label === "Sale"
                  ? "text-ember-600"
                  : "text-onyx-800 hover:text-ember-600"
              )}
            >
              {node.label}
              {node.children.length > 0 && (
                <ChevronDown
                  className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
                />
              )}
            </Link>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-full z-50 pt-2"
                >
                  <Flyout nodes={node.children} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}

/** A dropdown/flyout panel. Items with children reveal their own flyout on hover. */
function Flyout({ nodes }: { nodes: NavNode[] }) {
  return (
    <ul className="min-w-[230px] rounded-2xl border border-onyx-100 bg-white p-2 shadow-elevated">
      {nodes.map((node, i) => (
        <li key={`${node.label}-${i}`} className="group/sub relative">
          <Link
            href={node.href}
            className="flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-onyx-700 transition-colors hover:bg-ember-50 hover:text-ember-700"
          >
            {node.label}
            {node.children.length > 0 && (
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-onyx-300 transition-colors group-hover/sub:text-ember-500" />
            )}
          </Link>

          {node.children.length > 0 && (
            <div className="absolute left-full top-0 hidden pl-1 group-hover/sub:block">
              <Flyout nodes={node.children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
