import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  rating,
  count,
  className,
  size = 14,
}: {
  rating: number;
  count?: number;
  className?: string;
  size?: number;
}) {
  const full = Math.round(rating);
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="inline-flex" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            width={size}
            height={size}
            className={cn(
              i < full ? "fill-ember-500 text-ember-500" : "fill-onyx-200 text-onyx-200"
            )}
          />
        ))}
      </span>
      {typeof count === "number" && (
        <span className="text-xs font-medium text-onyx-400">({count})</span>
      )}
    </span>
  );
}
