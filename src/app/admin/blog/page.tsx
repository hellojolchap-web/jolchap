import Link from "next/link";
import { Plus } from "lucide-react";

import { getBlogPosts } from "@/lib/queries";
import { Panel, EmptyState } from "@/components/admin/AdminUI";
import { PostsTable } from "@/components/admin/PostsTable";

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-ember-600">
            The Jolchap Journal
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold uppercase tracking-tightest text-onyx-950 sm:text-3xl">
            Journal
          </h1>
          <p className="mt-1.5 text-sm text-onyx-500">
            {posts.length} post{posts.length === 1 ? "" : "s"} published.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-ember-500 px-5 text-sm font-semibold text-white shadow-glow-sm transition-all hover:bg-ember-600 hover:shadow-glow"
        >
          <Plus className="h-4 w-4" />
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <Panel>
          <EmptyState
            title="No posts yet"
            hint="Write your first journal article to publish to the storefront."
            action={
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ember-600 hover:text-ember-700"
              >
                <Plus className="h-4 w-4" />
                New post
              </Link>
            }
          />
        </Panel>
      ) : (
        <PostsTable posts={posts} />
      )}
    </div>
  );
}
