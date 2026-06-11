"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { MobileNav } from "./MobileNav";
import { SearchOverlay } from "./SearchOverlay";
import { mainNav } from "@/config/site";
import { useCart, cartCount } from "@/lib/store/cart";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const items = useCart((s) => s.items);
  const openCart = useCart((s) => s.open);
  const count = cartCount(items);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeGroup = mainNav.find((g) => g.label === active && g.columns?.length);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[80] transition-all duration-300",
          scrolled
            ? "glass border-b border-onyx-100 shadow-[0_8px_30px_-18px_rgba(10,10,12,0.3)]"
            : "bg-bone/80 backdrop-blur-md"
        )}
        onMouseLeave={() => setActive(null)}
      >
        <div className="container flex h-[72px] items-center justify-between gap-4">
          {/* left */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full text-onyx-900 hover:bg-onyx-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" aria-label="Jolchap home">
              <Logo animated />
            </Link>
          </div>

          {/* desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {mainNav.map((group) => (
              <Link
                key={group.label}
                href={group.href}
                onMouseEnter={() => setActive(group.label)}
                className={cn(
                  "relative px-3.5 py-2 text-[15px] font-semibold tracking-tight transition-colors",
                  group.label === "Sale" ? "text-ember-600" : "text-onyx-800 hover:text-ember-600"
                )}
              >
                {group.label}
                {active === group.label && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-ember-500"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* right */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="grid h-10 w-10 place-items-center rounded-full text-onyx-900 transition-colors hover:bg-onyx-100"
            >
              <Search className="h-[19px] w-[19px]" />
            </button>
            <Link
              href="/account"
              aria-label="Your account"
              className="hidden h-10 w-10 place-items-center rounded-full text-onyx-900 transition-colors hover:bg-onyx-100 sm:grid"
            >
              <User className="h-[19px] w-[19px]" />
            </Link>
            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative grid h-10 w-10 place-items-center rounded-full text-onyx-900 transition-colors hover:bg-onyx-100"
            >
              <ShoppingBag className="h-[19px] w-[19px]" />
              {mounted && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-ember-500 px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* mega menu */}
        <AnimatePresence>
          {activeGroup && (
            <motion.div
              key={activeGroup.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full hidden lg:block"
              onMouseEnter={() => setActive(activeGroup.label)}
            >
              <div className="container pb-6">
                <div className="grid grid-cols-12 gap-6 rounded-3xl border border-onyx-100 bg-white p-6 shadow-elevated">
                  <div
                    className={cn(
                      "grid gap-x-8 gap-y-6",
                      activeGroup.featured ? "col-span-8 grid-cols-2" : "col-span-12 grid-cols-4"
                    )}
                  >
                    {activeGroup.columns!.map((col) => (
                      <div key={col.heading}>
                        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-ember-600">
                          {col.heading}
                        </p>
                        <ul className="space-y-1.5">
                          {col.links.map((link) => (
                            <li key={link.href + link.label}>
                              <Link
                                href={link.href}
                                onClick={() => setActive(null)}
                                className="group flex items-center text-[15px] text-onyx-600 transition-colors hover:text-ember-600"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {activeGroup.featured && (
                    <Link
                      href={activeGroup.featured.href}
                      onClick={() => setActive(null)}
                      className="group relative col-span-4 overflow-hidden rounded-2xl bg-onyx-950"
                    >
                      <Image
                        src={activeGroup.featured.image}
                        alt={activeGroup.featured.title}
                        fill
                        sizes="380px"
                        className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-onyx-950/30 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-ember-400">
                          Featured
                        </span>
                        <p className="mt-1 text-lg font-bold leading-tight text-white">
                          {activeGroup.featured.title}
                        </p>
                        <p className="mt-1 text-xs text-white/70">{activeGroup.featured.copy}</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
