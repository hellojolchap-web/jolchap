import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({
  items,
  light = false,
  className,
}: {
  items: Crumb[];
  light?: boolean;
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm",
        light ? "text-white/60" : "text-onyx-400",
        className
      )}
    >
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {item.href && !last ? (
              <Link
                href={item.href}
                className={cn(
                  "transition-colors",
                  light ? "hover:text-white" : "hover:text-ember-600"
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span className={last ? (light ? "text-white" : "text-onyx-900") : ""}>
                {item.label}
              </span>
            )}
            {!last && <ChevronRight className="h-3.5 w-3.5 opacity-50" />}
          </span>
        );
      })}
    </nav>
  );
}
