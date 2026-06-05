import {
  Building2,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Music2,
  Twitter,
  Lock,
  type LucideIcon,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Panel, StatusPill } from "@/components/admin/AdminUI";

export default function AdminSettingsPage() {
  const { contact, socials } = siteConfig;
  const configured = isSupabaseConfigured();

  const brandRows: { label: string; value: string }[] = [
    { label: "Brand name", value: siteConfig.name },
    { label: "Legal name", value: siteConfig.legalName },
    { label: "Tagline", value: siteConfig.tagline },
    { label: "Established", value: String(siteConfig.established) },
    { label: "Site URL", value: siteConfig.url },
  ];

  const contactRows: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Phone, label: "Phone", value: contact.phone },
    { icon: Mail, label: "Email", value: contact.email },
    { icon: MessageCircle, label: "WhatsApp", value: contact.whatsapp },
    {
      icon: MapPin,
      label: "Address",
      value: `${contact.address.line1}, ${contact.address.city}, ${contact.address.region} ${contact.address.postcode}, ${contact.address.country}`,
    },
    { icon: Clock, label: "Hours", value: contact.hours },
  ];

  const socialRows: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Instagram, label: "Instagram", value: socials.instagram },
    { icon: Facebook, label: "Facebook", value: socials.facebook },
    { icon: Youtube, label: "YouTube", value: socials.youtube },
    { icon: Music2, label: "TikTok", value: socials.tiktok },
    { icon: Twitter, label: "X", value: socials.x },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-ember-600">
            Settings
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold uppercase tracking-tightest text-onyx-950 sm:text-3xl">
            Store settings
          </h1>
          <p className="mt-1.5 text-sm text-onyx-500">
            Brand &amp; contact details surfaced across the storefront.
          </p>
        </div>
        <StatusPill connected={configured} />
      </div>

      {/* Env-managed notice */}
      <div className="flex items-start gap-3 rounded-2xl border border-onyx-100 bg-onyx-50/60 p-4">
        <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-onyx-950 text-white">
          <Lock className="h-4 w-4" />
        </span>
        <p className="text-sm leading-relaxed text-onyx-600">
          These values are read-only here. They&rsquo;re configured via environment
          variables so they can change without touching code — see{" "}
          <span className="font-semibold text-onyx-900">SETUP-GUIDE.md</span> for every key
          and its default.
        </p>
      </div>

      {/* Brand */}
      <SettingsCard icon={Building2} title="Brand">
        <dl className="divide-y divide-onyx-50">
          {brandRows.map((row) => (
            <Row key={row.label} label={row.label} value={row.value} />
          ))}
        </dl>
      </SettingsCard>

      {/* Contact */}
      <SettingsCard icon={Phone} title="Contact">
        <dl className="divide-y divide-onyx-50">
          {contactRows.map((row) => (
            <Row key={row.label} icon={row.icon} label={row.label} value={row.value} />
          ))}
        </dl>
      </SettingsCard>

      {/* Socials */}
      <SettingsCard icon={Instagram} title="Social channels">
        <dl className="divide-y divide-onyx-50">
          {socialRows.map((row) => (
            <Row key={row.label} icon={row.icon} label={row.label} value={row.value} link />
          ))}
        </dl>
      </SettingsCard>
    </div>
  );
}

function SettingsCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Panel>
      <div className="flex items-center gap-2 border-b border-onyx-100 px-5 py-4">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-ember-50 text-ember-600">
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="font-display text-sm font-bold uppercase tracking-wide text-onyx-900">
          {title}
        </h2>
      </div>
      <div className="px-5">{children}</div>
    </Panel>
  );
}

function Row({
  icon: Icon,
  label,
  value,
  link,
}: {
  icon?: LucideIcon;
  label: string;
  value: string;
  link?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3.5">
      <div className="flex items-center gap-2 text-sm font-medium text-onyx-500">
        {Icon && <Icon className="h-4 w-4 text-onyx-400" />}
        {label}
      </div>
      {link ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-[60%] truncate text-right text-sm font-semibold text-ember-600 hover:text-ember-700"
        >
          {value}
        </a>
      ) : (
        <span className="max-w-[60%] text-right text-sm font-semibold text-onyx-900">
          {value}
        </span>
      )}
    </div>
  );
}
