"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { mainNav, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="absolute inset-0 bg-onyx-950/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-bone shadow-elevated"
          >
            <div className="flex items-center justify-between border-b border-onyx-100 px-5 py-4">
              <Link href="/" onClick={onClose}>
                <Logo withTagline />
              </Link>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full text-onyx-500 hover:bg-onyx-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              {mainNav.map((group) => {
                const hasChildren = !!group.columns?.length;
                const isOpen = expanded === group.label;
                return (
                  <div key={group.label} className="border-b border-onyx-100/80">
                    <div className="flex items-center">
                      <Link
                        href={group.href}
                        onClick={onClose}
                        className="flex-1 py-4 pl-2 text-lg font-semibold text-onyx-900"
                      >
                        {group.label}
                      </Link>
                      {hasChildren && (
                        <button
                          aria-label={`Toggle ${group.label}`}
                          onClick={() => setExpanded(isOpen ? null : group.label)}
                          className="grid h-10 w-10 place-items-center text-onyx-500"
                        >
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 transition-transform",
                              isOpen && "rotate-180"
                            )}
                          />
                        </button>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {hasChildren && isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1 pb-4 pl-2">
                            {group.columns!.flatMap((col) => col.links).map((link) => (
                              <Link
                                key={link.href + link.label}
                                href={link.href}
                                onClick={onClose}
                                className="rounded-lg py-2 text-sm text-onyx-500 hover:text-ember-600"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <div className="space-y-3 border-t border-onyx-100 px-5 py-5">
              <Button href="/shop" className="w-full" onClick={onClose}>
                Shop all products
              </Button>
              <Button href="/account" variant="outline" className="w-full" onClick={onClose}>
                Sign in / Account
              </Button>
              <div className="flex flex-col gap-2 text-sm text-onyx-500">
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-2 hover:text-ember-600"
                >
                  <Phone className="h-4 w-4 text-ember-500" />
                  {siteConfig.contact.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 hover:text-ember-600"
                >
                  <Mail className="h-4 w-4 text-ember-500" />
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
