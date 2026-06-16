"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  Trash2,
  Save,
  Loader2,
  GripVertical,
  Link2,
} from "lucide-react";
import { toast } from "sonner";

import type { Category } from "@/types";
import type { ResolvedSettings, MenuItem } from "@/lib/settings";
import { updateSettings } from "@/app/admin/actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { fieldInput } from "@/components/admin/FormKit";
import { NotConfiguredNotice } from "@/components/admin/AdminUI";
import { useConfirm } from "@/components/providers/ConfirmProvider";
import { cn } from "@/lib/utils";

const QUICK = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Offers", href: "/shop?sale=true" },
];

const PAGES = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Size guide", href: "/size-guide" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

function newId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `m-${Math.random().toString(36).slice(2)}`;
}

export function MenuBuilder({
  initial,
  categories,
}: {
  initial: ResolvedSettings;
  categories: Category[];
}) {
  const router = useRouter();
  const configured = isSupabaseConfigured();
  const confirm = useConfirm();
  const [items, setItems] = useState<MenuItem[]>(initial.menu);
  const [custom, setCustom] = useState({ label: "", href: "" });
  const [pending, startTransition] = useTransition();

  const add = (label: string, href: string) =>
    setItems((prev) => [...prev, { id: newId(), label, href, depth: 0 }]);

  const addCustom = () => {
    if (!custom.label.trim() || !custom.href.trim()) return toast.error("Enter a label and a URL.");
    add(custom.label.trim(), custom.href.trim());
    setCustom({ label: "", href: "" });
  };

  const patch = (id: string, p: Partial<MenuItem>) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...p } : i)));

  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[idx], next[j]] = [next[j], next[idx]];
    setItems(next);
  };

  const indent = (idx: number) =>
    setItems((prev) => {
      if (idx === 0) return prev;
      const max = Math.min(2, prev[idx - 1].depth + 1);
      return prev.map((it, i) => (i === idx ? { ...it, depth: Math.min(max, it.depth + 1) } : it));
    });

  const outdent = (idx: number) =>
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, depth: Math.max(0, it.depth - 1) } : it)));

  async function removeItem(item: MenuItem) {
    const ok = await confirm({
      title: `Remove "${item.label}"?`,
      message: "It's removed from the menu when you save.",
      confirmText: "Remove",
      tone: "danger",
    });
    if (!ok) return;
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }

  function save() {
    if (!configured) return toast.error("Connect Supabase to save.");
    startTransition(async () => {
      const result = await updateSettings({ ...initial, menu: items });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Menu saved — your site nav is updated.");
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-ember-600">Navigation</p>
          <h1 className="mt-1 font-display text-2xl font-extrabold uppercase tracking-tightest text-onyx-950 sm:text-3xl">
            Menu builder
          </h1>
          <p className="mt-1.5 max-w-xl text-sm text-onyx-500">
            Build your header menu. Add pages, categories or custom links, reorder them, and use the
            arrows (→) to nest one item under another. Empty menu = the automatic default nav.
          </p>
        </div>
        <button
          onClick={save}
          disabled={pending || !configured}
          className="inline-flex h-11 items-center gap-2 self-start rounded-full bg-ember-500 px-6 text-sm font-semibold text-white shadow-glow-sm transition-all hover:bg-ember-600 hover:shadow-glow disabled:pointer-events-none disabled:opacity-50"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save menu
        </button>
      </div>

      {!configured && (
        <NotConfiguredNotice detail="You can build the menu, but saving needs a live Supabase project + the site_settings table." />
      )}

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        {/* ── Add items ── */}
        <div className="h-fit space-y-5 rounded-2xl border border-onyx-100 bg-white p-5">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-onyx-900">
            Add to menu
          </h2>

          <AddGroup title="Quick links">
            {QUICK.map((p) => (
              <AddChip key={p.href} onClick={() => add(p.label, p.href)}>
                {p.label}
              </AddChip>
            ))}
          </AddGroup>

          <AddGroup title="Pages">
            {PAGES.map((p) => (
              <AddChip key={p.href} onClick={() => add(p.label, p.href)}>
                {p.label}
              </AddChip>
            ))}
          </AddGroup>

          {categories.length > 0 && (
            <AddGroup title="Categories">
              {[...categories]
                .sort((a, b) => a.sort - b.sort)
                .map((c) => (
                  <AddChip key={c.id} onClick={() => add(c.name, `/category/${c.slug}`)}>
                    {c.name}
                  </AddChip>
                ))}
            </AddGroup>
          )}

          <div className="space-y-2 border-t border-onyx-100 pt-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-onyx-400">
              Custom link
            </p>
            <input
              value={custom.label}
              onChange={(e) => setCustom((c) => ({ ...c, label: e.target.value }))}
              placeholder="Link text"
              className={fieldInput}
            />
            <input
              value={custom.href}
              onChange={(e) => setCustom((c) => ({ ...c, href: e.target.value }))}
              placeholder="/page or https://…"
              className={cn(fieldInput, "font-mono text-sm")}
            />
            <button
              type="button"
              onClick={addCustom}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-onyx-200 text-sm font-semibold text-onyx-800 transition-colors hover:border-ember-400 hover:text-ember-600"
            >
              <Plus className="h-4 w-4" />
              Add custom link
            </button>
          </div>
        </div>

        {/* ── Menu structure ── */}
        <div className="rounded-2xl border border-onyx-100 bg-white p-5">
          <h2 className="mb-1 font-display text-sm font-bold uppercase tracking-wide text-onyx-900">
            Menu structure
          </h2>
          <p className="mb-4 text-xs text-onyx-400">
            Use <ChevronRight className="inline h-3 w-3" /> to nest an item under the one above it,
            and the arrows to reorder.
          </p>

          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-onyx-200 px-6 py-14 text-center text-sm text-onyx-400">
              No items yet — add pages, categories or links from the left.
            </div>
          ) : (
            <ul className="space-y-2">
              {items.map((item, idx) => (
                <li
                  key={item.id}
                  style={{ marginLeft: item.depth * 28 }}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border bg-white p-2.5 transition-colors",
                    item.depth === 0 ? "border-onyx-200" : "border-onyx-100 bg-onyx-50/40"
                  )}
                >
                  <GripVertical className="h-4 w-4 flex-shrink-0 text-onyx-300" />

                  <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center">
                    <input
                      value={item.label}
                      onChange={(e) => patch(item.id, { label: e.target.value })}
                      className="w-full rounded-lg border border-transparent bg-transparent px-2 py-1 text-sm font-semibold text-onyx-950 outline-none transition-colors hover:border-onyx-200 focus:border-ember-400"
                      placeholder="Label"
                    />
                    <div className="flex items-center gap-1 sm:w-1/2">
                      <Link2 className="h-3.5 w-3.5 flex-shrink-0 text-onyx-300" />
                      <input
                        value={item.href}
                        onChange={(e) => patch(item.id, { href: e.target.value })}
                        className="w-full rounded-lg border border-transparent bg-transparent px-1 py-1 font-mono text-xs text-onyx-500 outline-none transition-colors hover:border-onyx-200 focus:border-ember-400"
                        placeholder="/link"
                      />
                    </div>
                  </div>

                  <div className="flex flex-shrink-0 items-center">
                    <IconBtn onClick={() => outdent(idx)} disabled={item.depth === 0} label="Outdent">
                      <ChevronLeft className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn
                      onClick={() => indent(idx)}
                      disabled={idx === 0 || item.depth >= Math.min(2, (items[idx - 1]?.depth ?? 0) + 1)}
                      label="Indent (nest)"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn onClick={() => move(idx, -1)} disabled={idx === 0} label="Move up">
                      <ArrowUp className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn onClick={() => move(idx, 1)} disabled={idx === items.length - 1} label="Move down">
                      <ArrowDown className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn onClick={() => removeItem(item)} label="Remove" danger>
                      <Trash2 className="h-4 w-4" />
                    </IconBtn>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function AddGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-bold uppercase tracking-widest text-onyx-400">{title}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function AddChip({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-lg border border-onyx-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-onyx-700 transition-colors hover:border-ember-400 hover:bg-ember-50 hover:text-ember-700"
    >
      <Plus className="h-3 w-3" />
      {children}
    </button>
  );
}

function IconBtn({
  onClick,
  disabled,
  label,
  danger,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "grid h-8 w-8 place-items-center rounded-lg text-onyx-500 transition-colors disabled:opacity-25",
        danger ? "hover:bg-red-50 hover:text-red-600" : "hover:bg-onyx-100 hover:text-ember-600"
      )}
    >
      {children}
    </button>
  );
}
