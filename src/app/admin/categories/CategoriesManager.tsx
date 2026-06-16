"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Save, Trash2, Pencil, X } from "lucide-react";
import slugify from "slugify";
import { toast } from "sonner";

import type { Category } from "@/types";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  type CategoryInput,
} from "@/app/admin/actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Field, FormSection, fieldInput, fieldArea } from "@/components/admin/FormKit";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { NotConfiguredNotice } from "@/components/admin/AdminUI";
import { useConfirm } from "@/components/providers/ConfirmProvider";
import { cn } from "@/lib/utils";

type FormState = {
  id: string;
  slug: string;
  slugTouched: boolean;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  image: string;
  sort: string;
};

const EMPTY: FormState = {
  id: "",
  slug: "",
  slugTouched: false,
  name: "",
  tagline: "",
  description: "",
  icon: "Stamp",
  image: "",
  sort: "0",
};

function fromCategory(c: Category): FormState {
  return {
    id: c.id,
    slug: c.slug,
    slugTouched: true,
    name: c.name,
    tagline: c.tagline,
    description: c.description,
    icon: c.icon,
    image: c.image,
    sort: String(c.sort),
  };
}

export function CategoriesManager({ initial }: { initial: Category[] }) {
  const router = useRouter();
  const configured = isSupabaseConfigured();
  const confirm = useConfirm();
  const [s, setS] = useState<FormState>(EMPTY);
  const [pending, startTransition] = useTransition();
  const editing = Boolean(s.id);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setS((p) => ({ ...p, [k]: v }));

  const autoSlug = slugify(s.name || "", { lower: true, strict: true });
  const slug = s.slugTouched ? s.slug : autoSlug;

  function reset() {
    setS(EMPTY);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!s.name.trim()) return toast.error("Category name is required.");
    if (!slug) return toast.error("A URL slug is required.");
    if (!configured) return toast.error("Connect Supabase to save.");

    const input: CategoryInput = {
      id: s.id || undefined,
      slug,
      name: s.name.trim(),
      tagline: s.tagline.trim(),
      description: s.description.trim(),
      icon: s.icon.trim() || "Stamp",
      image: s.image,
      sort: Number(s.sort) || 0,
    };

    startTransition(async () => {
      const result = editing ? await updateCategory(input) : await createCategory(input);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(editing ? "Category updated." : "Category added.");
      reset();
      router.refresh();
    });
  }

  async function handleDelete(c: Category) {
    if (!configured) return toast.error("Connect Supabase to delete.");
    const ok = await confirm({
      title: `Delete "${c.name}"?`,
      message:
        "It disappears from your nav, footer and filters. Products keep their data but lose this department.",
      confirmText: "Delete category",
      tone: "danger",
    });
    if (!ok) return;
    const result = await deleteCategory(c.id);
    if (!result.ok) return toast.error(result.error);
    toast.success("Category deleted.");
    if (s.id === c.id) reset();
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-ember-600">Catalogue</p>
        <h1 className="mt-1 font-display text-2xl font-extrabold uppercase tracking-tightest text-onyx-950 sm:text-3xl">
          Categories
        </h1>
        <p className="mt-1.5 text-sm text-onyx-500">
          Add or remove departments — they update your nav, footer, filters and homepage everywhere.
        </p>
      </div>

      {!configured && (
        <NotConfiguredNotice detail="Editing works, but saving needs a live Supabase project with the categories table." />
      )}

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Form */}
        <form onSubmit={handleSave} className="h-fit">
          <FormSection
            title={editing ? "Edit category" : "Add category"}
            description={editing ? `Editing "${s.name}"` : "Create a new storefront department."}
          >
            <Field label="Name" htmlFor="cname" required>
              <input id="cname" value={s.name} onChange={(e) => set("name", e.target.value)} placeholder="Seals & Stamps" className={fieldInput} />
            </Field>
            <Field label="URL slug" htmlFor="cslug" hint="Auto from name — edit if needed" required>
              <input
                id="cslug"
                value={slug}
                onChange={(e) => {
                  set("slugTouched", true);
                  set("slug", slugify(e.target.value, { lower: true, strict: true }));
                }}
                placeholder="seals-stamps"
                className={cn(fieldInput, "font-mono text-sm")}
              />
            </Field>
            <Field label="Tagline" htmlFor="ctag" hint="Short line shown on the category page">
              <input id="ctag" value={s.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="Crisp, lasting impressions" className={fieldInput} />
            </Field>
            <Field label="Description" htmlFor="cdesc">
              <textarea id="cdesc" rows={2} value={s.description} onChange={(e) => set("description", e.target.value)} className={fieldArea} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Icon" htmlFor="cicon" hint="Lucide name, e.g. Stamp">
                <input id="cicon" value={s.icon} onChange={(e) => set("icon", e.target.value)} placeholder="Stamp" className={fieldInput} />
              </Field>
              <Field label="Sort order" htmlFor="csort" hint="Lower shows first">
                <input id="csort" inputMode="numeric" value={s.sort} onChange={(e) => set("sort", e.target.value)} className={fieldInput} />
              </Field>
            </div>
            <Field label="Image" htmlFor="cimage" hint="Shown on the homepage showcase">
              <ImageUploader value={s.image} onChange={(url) => set("image", url)} />
            </Field>

            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={pending || !configured}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-ember-500 px-5 text-sm font-semibold text-white shadow-glow-sm transition-all hover:bg-ember-600 disabled:opacity-50"
              >
                {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : editing ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {editing ? "Save changes" : "Add category"}
              </button>
              {editing && (
                <button type="button" onClick={reset} className="inline-flex h-11 items-center gap-2 rounded-full border border-onyx-200 px-4 text-sm font-semibold text-onyx-700 hover:bg-onyx-50">
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              )}
            </div>
          </FormSection>
        </form>

        {/* List */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-onyx-400">
            {initial.length} categories
          </p>
          {initial.length === 0 && (
            <p className="rounded-2xl border border-dashed border-onyx-200 p-8 text-center text-sm text-onyx-400">
              No categories yet — add your first on the left.
            </p>
          )}
          {[...initial]
            .sort((a, b) => a.sort - b.sort)
            .map((c) => (
              <div
                key={c.id}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border bg-white p-3 transition-colors",
                  s.id === c.id ? "border-ember-400 ring-1 ring-ember-200" : "border-onyx-100"
                )}
              >
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-ember-50 text-xs font-bold text-ember-700">
                  {c.sort}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-onyx-950">{c.name}</p>
                  <p className="truncate font-mono text-xs text-onyx-400">/{c.slug}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setS(fromCategory(c))}
                  aria-label="Edit"
                  className="grid h-9 w-9 place-items-center rounded-lg text-onyx-500 transition-colors hover:bg-onyx-50 hover:text-ember-600"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(c)}
                  aria-label="Delete"
                  className="grid h-9 w-9 place-items-center rounded-lg text-onyx-500 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
