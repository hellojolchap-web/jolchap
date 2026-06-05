"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Newspaper, Pencil, Clock } from "lucide-react";

import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import { FlagPill } from "./AdminUI";

/** Searchable journal table for the admin (client-side filter over the list). */
export function PostsTable({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");

  const sorted = useMemo(
    () => [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    [posts]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter((p) =>
      [p.title, p.category, p.slug, p.author.name, ...p.tags]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [sorted, query]);

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-onyx-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts…"
          className="h-11 w-full rounded-xl border border-onyx-200 bg-white pl-10 pr-4 text-sm text-onyx-900 outline-none transition-colors placeholder:text-onyx-300 focus:border-ember-500 focus:ring-2 focus:ring-ember-500/25"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-onyx-100 bg-white shadow-card">
        <ul className="divide-y divide-onyx-50">
          {filtered.map((post) => (
            <li key={post.id}>
              <Link
                href={`/admin/blog/${post.id}`}
                className="group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-onyx-50/50 sm:px-5"
              >
                <Thumb post={post} />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-md bg-ember-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ember-700">
                      {post.category}
                    </span>
                    {post.featured && <FlagPill label="Featured" tone="onyx" />}
                  </div>
                  <p className="mt-1 line-clamp-1 text-sm font-semibold text-onyx-900">
                    {post.title}
                  </p>
                  <p className="mt-0.5 flex items-center gap-2 text-xs text-onyx-400">
                    <span>{post.author.name}</span>
                    <span aria-hidden>·</span>
                    <span>{formatDate(post.publishedAt)}</span>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingTime} min
                    </span>
                  </p>
                </div>

                <span className="hidden flex-shrink-0 items-center gap-1.5 rounded-lg border border-onyx-200 px-3 py-1.5 text-xs font-semibold text-onyx-700 transition-colors group-hover:border-ember-300 group-hover:text-ember-600 sm:inline-flex">
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="px-5 py-12 text-center text-sm text-onyx-400">
            No posts match &ldquo;{query}&rdquo;.
          </p>
        )}
      </div>
    </div>
  );
}

function Thumb({ post }: { post: BlogPost }) {
  return (
    <div className="relative hidden h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-onyx-50 ring-1 ring-onyx-100 sm:block">
      {post.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <span className="grid h-full w-full place-items-center text-onyx-300">
          <Newspaper className="h-4 w-4" />
        </span>
      )}
    </div>
  );
}
