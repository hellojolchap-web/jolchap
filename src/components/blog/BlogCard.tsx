import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { formatDate, cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

export function BlogCard({
  post,
  className,
  priority = false,
}: {
  post: BlogPost;
  className?: string;
  priority?: boolean;
}) {
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-onyx-100">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority={priority}
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-onyx-900 backdrop-blur">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-center gap-3 text-xs text-onyx-400">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime} min read
          </span>
        </div>
        <h3 className="mt-2 text-lg font-bold leading-snug text-onyx-950 transition-colors group-hover:text-ember-600">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-onyx-500">
          {post.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ember-600">
          Read article
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
      <Link href={`/blog/${post.slug}`} className="absolute inset-0" aria-label={post.title} />
    </article>
  );
}
