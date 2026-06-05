import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Build a compact page list with ellipses, e.g. [1, '…', 4, 5, 6, '…', 12]. */
function pageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("…");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total - 1) pages.push("…");
  pages.push(total);
  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  hash = "",
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
  /** optional anchor appended to links, e.g. "#articles" */
  hash?: string;
}) {
  if (totalPages <= 1) return null;

  const href = (p: number) =>
    (p <= 1 ? basePath : `${basePath}?page=${p}`) + hash;

  const cell =
    "grid h-11 min-w-11 place-items-center rounded-full px-3.5 text-sm font-bold transition-all";

  return (
    <nav
      aria-label="Pagination"
      className="mt-14 flex flex-wrap items-center justify-center gap-2"
    >
      {currentPage > 1 ? (
        <Link href={href(currentPage - 1)} aria-label="Previous page" className={cn(cell, "text-onyx-700 ring-1 ring-onyx-200 hover:bg-onyx-950 hover:text-white")}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span className={cn(cell, "cursor-not-allowed text-onyx-300 ring-1 ring-onyx-100")}>
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      {pageList(currentPage, totalPages).map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-1 text-onyx-300">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={href(p)}
            aria-current={p === currentPage ? "page" : undefined}
            className={cn(
              cell,
              p === currentPage
                ? "bg-ember-500 text-white shadow-glow-sm"
                : "text-onyx-700 ring-1 ring-onyx-200 hover:border-ember-500 hover:text-ember-600"
            )}
          >
            {p}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link href={href(currentPage + 1)} aria-label="Next page" className={cn(cell, "text-onyx-700 ring-1 ring-onyx-200 hover:bg-onyx-950 hover:text-white")}>
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className={cn(cell, "cursor-not-allowed text-onyx-300 ring-1 ring-onyx-100")}>
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
