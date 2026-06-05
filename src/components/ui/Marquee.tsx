import { cn } from "@/lib/utils";

/** Infinite horizontal marquee. Children are duplicated for a seamless loop. */
export function Marquee({
  children,
  reverse = false,
  className,
  itemClassName,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={cn("group flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center gap-10 pr-10",
          reverse ? "animate-marquee-rev" : "animate-marquee",
          "group-hover:[animation-play-state:paused]",
          itemClassName
        )}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          "flex shrink-0 items-center gap-10 pr-10",
          reverse ? "animate-marquee-rev" : "animate-marquee",
          "group-hover:[animation-play-state:paused]",
          itemClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
