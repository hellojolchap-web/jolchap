"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save, Trash2 } from "lucide-react";
import slugify from "slugify";
import { toast } from "sonner";

import type { BlogPost } from "@/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPost, updatePost, deletePost, type PostInput } from "@/app/admin/actions";
import { estimateReadingTime } from "@/lib/utils";
import { Field, FormSection, Toggle, fieldInput, fieldArea } from "./FormKit";
import { ImageUploader } from "./ImageUploader";
import { NotConfiguredNotice } from "./AdminUI";
import { cn } from "@/lib/utils";

/** Suggested journal categories (free text is also allowed). */
const CATEGORIES = [
  "Buying Guides",
  "Technique",
  "Training",
  "Recovery",
  "Nutrition",
  "Journal",
];

type Mode = "create" | "edit";

interface State {
  id: string;
  slug: string;
  slugTouched: boolean;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  readingTime: string;
  readingTouched: boolean;
  publishedAt: string;
  featured: boolean;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function toDateInput(value: string): string {
  if (!value) return todayISO();
  // Accept both "2026-05-22" and full ISO timestamps.
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? todayISO() : d.toISOString().slice(0, 10);
}

function initialState(initial?: BlogPost): State {
  return {
    id: initial?.id ?? "",
    slug: initial?.slug ?? "",
    slugTouched: Boolean(initial?.slug),
    title: initial?.title ?? "",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
    coverImage: initial?.coverImage ?? "",
    category: initial?.category ?? CATEGORIES[0],
    tags: initial?.tags.join(", ") ?? "",
    authorName: initial?.author.name ?? "",
    authorRole: initial?.author.role ?? "",
    authorAvatar: initial?.author.avatar ?? "",
    readingTime: initial ? String(initial.readingTime) : "",
    readingTouched: Boolean(initial?.readingTime),
    publishedAt: toDateInput(initial?.publishedAt ?? ""),
    featured: initial?.featured ?? false,
  };
}

const commaToArray = (s: string) =>
  s.split(",").map((v) => v.trim()).filter(Boolean);

export function PostForm({ initial }: { initial?: BlogPost }) {
  const router = useRouter();
  const mode: Mode = initial ? "edit" : "create";
  const configured = isSupabaseConfigured();

  const [s, setS] = useState<State>(() => initialState(initial));
  const [pending, startTransition] = useTransition();
  const [deleting, setDeleting] = useState(false);

  const set = <K extends keyof State>(key: K, value: State[K]) =>
    setS((prev) => ({ ...prev, [key]: value }));

  const autoSlug = useMemo(
    () => slugify(s.title || "", { lower: true, strict: true, trim: true }),
    [s.title]
  );
  const effectiveSlug = s.slugTouched ? s.slug : autoSlug;

  // Auto-estimate reading time from content unless overridden.
  const autoReading = useMemo(
    () => (s.content ? String(estimateReadingTime(s.content)) : ""),
    [s.content]
  );
  const effectiveReading = s.readingTouched ? s.readingTime : autoReading;

  function validate(): string | null {
    if (!s.title.trim()) return "Title is required.";
    if (!effectiveSlug) return "A URL slug is required.";
    if (!s.authorName.trim()) return "Author name is required.";
    return null;
  }

  function buildInput(): PostInput {
    return {
      id: s.id || undefined,
      slug: effectiveSlug,
      title: s.title.trim(),
      excerpt: s.excerpt.trim(),
      content: s.content,
      coverImage: s.coverImage,
      category: s.category.trim() || "Journal",
      tags: commaToArray(s.tags),
      author: {
        name: s.authorName.trim(),
        role: s.authorRole.trim(),
        avatar: s.authorAvatar.trim(),
      },
      readingTime: Number(effectiveReading) || estimateReadingTime(s.content) || 5,
      publishedAt: s.publishedAt || todayISO(),
      featured: s.featured,
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }
    if (!configured) {
      toast.error("Connect Supabase to save changes.");
      return;
    }

    const input = buildInput();
    startTransition(async () => {
      const result = mode === "edit" ? await updatePost(input) : await createPost(input);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(mode === "edit" ? "Post updated." : "Post published.");
      router.push("/admin/blog");
      router.refresh();
    });
  }

  async function handleDelete() {
    if (mode !== "edit" || !s.id) return;
    if (!configured) {
      toast.error("Connect Supabase to delete.");
      return;
    }
    if (!window.confirm(`Delete "${s.title}"? This cannot be undone.`)) return;

    setDeleting(true);
    const result = await deletePost(s.id);
    setDeleting(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Post deleted.");
    router.push("/admin/blog");
    router.refresh();
  }

  const busy = pending || deleting;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-4">
      {/* Header / actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl border border-onyx-200 text-onyx-600 transition-colors hover:bg-onyx-50"
            aria-label="Back to journal"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-display text-xl font-extrabold uppercase tracking-tightest text-onyx-950 sm:text-2xl">
              {mode === "edit" ? "Edit post" : "New journal post"}
            </h1>
            <p className="truncate text-xs text-onyx-400">
              {mode === "edit" ? s.title : "Publish to the Jolchap Journal"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {mode === "edit" && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={busy}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-onyx-200 px-4 text-sm font-semibold text-onyx-700 transition-colors hover:border-ember-300 hover:text-ember-600 disabled:opacity-50"
            >
              {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              Delete
            </button>
          )}
          <button
            type="submit"
            disabled={busy || !configured}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ember-500 px-5 text-sm font-semibold text-white shadow-glow-sm transition-all hover:bg-ember-600 hover:shadow-glow disabled:pointer-events-none disabled:opacity-50"
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {mode === "edit" ? "Save changes" : "Publish post"}
          </button>
        </div>
      </div>

      {!configured && (
        <NotConfiguredNotice detail="You can draft the whole post below, but publishing needs a live Supabase project. The editor stays fully interactive." />
      )}

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* ── Left column ── */}
        <div className="space-y-6">
          <FormSection title="Article">
            <Field label="Title" htmlFor="title" required>
              <input
                id="title"
                value={s.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="How to Design the Perfect Custom Stamp"
                className={fieldInput}
              />
            </Field>

            <Field
              label="URL slug"
              htmlFor="slug"
              hint="Auto-generated from title"
              required
            >
              <input
                id="slug"
                value={effectiveSlug}
                onChange={(e) => {
                  set("slugTouched", true);
                  set("slug", slugify(e.target.value, { lower: true, strict: true }));
                }}
                placeholder="how-to-design-the-perfect-custom-stamp"
                className={cn(fieldInput, "font-mono text-sm")}
              />
            </Field>

            <Field label="Excerpt" htmlFor="excerpt" hint="Shown on cards & previews">
              <textarea
                id="excerpt"
                value={s.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                rows={3}
                placeholder="A short, compelling summary of the article."
                className={fieldArea}
              />
            </Field>

            <Field label="Content" htmlFor="content" hint="HTML allowed">
              <textarea
                id="content"
                value={s.content}
                onChange={(e) => set("content", e.target.value)}
                rows={16}
                placeholder="<p>Start writing…</p>"
                className={cn(fieldArea, "font-mono text-[13px]")}
              />
            </Field>
          </FormSection>

          <FormSection title="Cover image" description="Auto-converted to optimised WebP.">
            <ImageUploader
              value={s.coverImage}
              onChange={(url) => set("coverImage", url)}
            />
          </FormSection>
        </div>

        {/* ── Right column ── */}
        <div className="space-y-6">
          <FormSection title="Publishing">
            <Field label="Category" htmlFor="category">
              <input
                id="category"
                list="post-categories"
                value={s.category}
                onChange={(e) => set("category", e.target.value)}
                placeholder="Training"
                className={fieldInput}
              />
              <datalist id="post-categories">
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Published" htmlFor="published">
                <input
                  id="published"
                  type="date"
                  value={s.publishedAt}
                  onChange={(e) => set("publishedAt", e.target.value)}
                  className={fieldInput}
                />
              </Field>
              <Field label="Read time" htmlFor="reading" hint="min">
                <input
                  id="reading"
                  inputMode="numeric"
                  value={effectiveReading}
                  onChange={(e) => {
                    set("readingTouched", true);
                    set("readingTime", e.target.value);
                  }}
                  placeholder="6"
                  className={fieldInput}
                />
              </Field>
            </div>

            <Field label="Tags" htmlFor="tags" hint="Comma-separated">
              <input
                id="tags"
                value={s.tags}
                onChange={(e) => set("tags", e.target.value)}
                placeholder="stamp, custom, printing, gifts"
                className={fieldInput}
              />
            </Field>

            <Toggle
              checked={s.featured}
              onChange={(v) => set("featured", v)}
              label="Featured"
              description="Pin to the top of the journal"
            />
          </FormSection>

          <FormSection title="Author">
            <Field label="Name" htmlFor="authorName" required>
              <input
                id="authorName"
                value={s.authorName}
                onChange={(e) => set("authorName", e.target.value)}
                placeholder="Coach Ray Mercer"
                className={fieldInput}
              />
            </Field>
            <Field label="Role" htmlFor="authorRole">
              <input
                id="authorRole"
                value={s.authorRole}
                onChange={(e) => set("authorRole", e.target.value)}
                placeholder="Creative Director, Jolchap Studio"
                className={fieldInput}
              />
            </Field>
            <div>
              <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-onyx-500">
                Avatar
              </p>
              <ImageUploader
                value={s.authorAvatar}
                onChange={(url) => set("authorAvatar", url)}
              />
            </div>
          </FormSection>
        </div>
      </div>
    </form>
  );
}
