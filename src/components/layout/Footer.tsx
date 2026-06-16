import Link from "next/link";
import { Instagram, Facebook, Youtube, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NewsletterForm } from "./NewsletterForm";
import { footerNav, siteConfig } from "@/config/site";
import type { ResolvedSettings } from "@/lib/settings";
import type { Category } from "@/types";

function TikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.2v12.9a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.3-2.49V7.6a5.79 5.79 0 0 0-6.5 5.74 5.79 5.79 0 0 0 5.79 5.74 5.79 5.79 0 0 0 5.79-5.74V8.94a7.5 7.5 0 0 0 4.35 1.4V7.15a4.28 4.28 0 0 1-2.7-1.33z" />
    </svg>
  );
}

export function Footer({
  settings,
  categories,
}: {
  settings: ResolvedSettings;
  categories: Category[];
}) {
  const { brand, contact, socials: social } = settings;
  const shopLinks = [
    ...categories.map((c) => ({ label: c.name, href: `/category/${c.slug}` })),
    { label: "New Arrivals", href: "/shop?sort=new" },
  ];
  const columns = footerNav.map((col) =>
    col.heading === "Shop" ? { ...col, links: shopLinks } : col
  );
  const socials = [
    { href: social.instagram, label: "Instagram", Icon: Instagram },
    { href: social.facebook, label: "Facebook", Icon: Facebook },
    { href: social.youtube, label: "YouTube", Icon: Youtube },
    { href: social.tiktok, label: "TikTok", Icon: TikTok },
    { href: social.x, label: "X", Icon: Twitter },
  ];

  return (
    <footer className="relative overflow-hidden bg-onyx-950 text-white">
      {/* glow accent */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-ember-500/20 blur-[120px]" />

      <div className="container relative">
        {/* newsletter band */}
        <div className="grid gap-8 border-b border-white/10 py-14 lg:grid-cols-2 lg:items-center lg:py-16">
          <div>
            <h3 className="text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
              Join the <span className="text-ember-500">{brand.name}</span> inner circle
            </h3>
            <p className="mt-3 max-w-md text-white/60">
              New product drops, design inspiration, gifting ideas, and 10% off your
              first order. No spam — just good stuff worth printing.
            </p>
          </div>
          <div className="lg:pl-10">
            <NewsletterForm />
            <p className="mt-3 text-xs text-white/40">
              By subscribing you agree to our{" "}
              <Link href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* main grid */}
        <div className="grid gap-10 py-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" withTagline name={brand.name} logoUrl={brand.logoUrl || undefined} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              {brand.description}
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-white/60">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember-500" />
                {contact.address.line1}, {contact.address.city},{" "}
                {contact.address.region} {contact.address.postcode}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-ember-500" />
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="hover:text-white">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-ember-500" />
                <a href={`mailto:${contact.email}`} className="hover:text-white">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-ember-500" />
                {contact.hours}
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.heading} className="lg:col-span-2">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition-colors hover:text-ember-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 py-7 md:flex-row">
          <p className="order-2 text-sm text-white/40 md:order-1">
            © {siteConfig.established}–2026 {brand.legalName}. All rights reserved.
          </p>
          <div className="order-1 flex items-center gap-2 md:order-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 transition-all hover:border-ember-500 hover:bg-ember-500 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
