"use client";

import { Plus, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────────────
   Reusable client form primitives for the admin editors. Consistent styling,
   accessible labels, and the dynamic list/row helpers the forms lean on.
   ────────────────────────────────────────────────────────────────────────── */

export const fieldInput =
  "h-11 w-full rounded-xl border border-onyx-200 bg-white px-3.5 text-[15px] text-onyx-900 outline-none transition-colors placeholder:text-onyx-300 focus:border-ember-500 focus:ring-2 focus:ring-ember-500/25";

export const fieldArea =
  "w-full rounded-xl border border-onyx-200 bg-white px-3.5 py-3 text-[15px] leading-relaxed text-onyx-900 outline-none transition-colors placeholder:text-onyx-300 focus:border-ember-500 focus:ring-2 focus:ring-ember-500/25";

export function Label({
  htmlFor,
  children,
  hint,
  required,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="mb-1.5 flex items-baseline justify-between gap-2">
      <label
        htmlFor={htmlFor}
        className="block text-xs font-bold uppercase tracking-widest text-onyx-500"
      >
        {children}
        {required && <span className="ml-0.5 text-ember-500">*</span>}
      </label>
      {hint && <span className="text-[11px] text-onyx-400">{hint}</span>}
    </div>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor} hint={hint} required={required}>
        {label}
      </Label>
      {children}
    </div>
  );
}

/** A bordered section with a heading inside a form. */
export function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-onyx-100 bg-white p-5 shadow-card sm:p-6">
      <div className="mb-5 border-b border-onyx-50 pb-4">
        <h2 className="font-display text-sm font-bold uppercase tracking-wide text-onyx-900">
          {title}
        </h2>
        {description && <p className="mt-1 text-xs text-onyx-400">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

/** A toggle switch bound to a boolean. */
export function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-onyx-100 bg-onyx-50/40 px-3.5 py-3 text-left transition-colors hover:bg-onyx-50"
    >
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-onyx-900">{label}</span>
        {description && <span className="block text-xs text-onyx-400">{description}</span>}
      </span>
      <span
        className={cn(
          "relative h-6 w-11 flex-shrink-0 rounded-full transition-colors",
          checked ? "bg-ember-500" : "bg-onyx-200"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
            checked ? "left-[22px]" : "left-0.5"
          )}
        />
      </span>
    </button>
  );
}

/** A dynamic list of single string inputs (features, etc.). */
export function StringListEditor({
  items,
  onChange,
  placeholder,
  addLabel = "Add item",
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}) {
  function update(i: number, value: string) {
    const next = [...items];
    next[i] = value;
    onChange(next);
  }
  function remove(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...items, ""]);
  }

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            value={item}
            onChange={(e) => update(i, e.target.value)}
            placeholder={placeholder}
            className={fieldInput}
          />
          <button
            type="button"
            onClick={() => remove(i)}
            aria-label="Remove"
            className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl border border-onyx-200 text-onyx-400 transition-colors hover:border-ember-300 hover:text-ember-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-ember-600 transition-colors hover:bg-ember-50"
      >
        <Plus className="h-4 w-4" />
        {addLabel}
      </button>
    </div>
  );
}

/** A dynamic list of {a, b} paired inputs (specs label/value, colors name/hex). */
export function PairListEditor({
  items,
  onChange,
  aPlaceholder,
  bPlaceholder,
  addLabel = "Add row",
  swatch = false,
}: {
  items: { a: string; b: string }[];
  onChange: (items: { a: string; b: string }[]) => void;
  aPlaceholder?: string;
  bPlaceholder?: string;
  addLabel?: string;
  swatch?: boolean;
}) {
  function update(i: number, key: "a" | "b", value: string) {
    const next = items.map((row, idx) => (idx === i ? { ...row, [key]: value } : row));
    onChange(next);
  }
  function remove(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...items, { a: "", b: "" }]);
  }

  return (
    <div className="space-y-2">
      {items.map((row, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            value={row.a}
            onChange={(e) => update(i, "a", e.target.value)}
            placeholder={aPlaceholder}
            className={cn(fieldInput, "flex-1")}
          />
          <div className="flex flex-1 items-center gap-2">
            {swatch && (
              <span
                className="h-8 w-8 flex-shrink-0 rounded-lg border border-onyx-200"
                style={{ backgroundColor: /^#?[0-9a-fA-F]{3,8}$/.test(row.b) ? row.b : "transparent" }}
              />
            )}
            <input
              value={row.b}
              onChange={(e) => update(i, "b", e.target.value)}
              placeholder={bPlaceholder}
              className={cn(fieldInput, "flex-1")}
            />
          </div>
          <button
            type="button"
            onClick={() => remove(i)}
            aria-label="Remove row"
            className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl border border-onyx-200 text-onyx-400 transition-colors hover:border-ember-300 hover:text-ember-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-ember-600 transition-colors hover:bg-ember-50"
      >
        <Plus className="h-4 w-4" />
        {addLabel}
      </button>
    </div>
  );
}
