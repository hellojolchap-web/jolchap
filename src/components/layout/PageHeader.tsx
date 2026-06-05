import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

/** Reusable banner for inner pages (about, blog, category, legal, etc.). */
export function PageHeader({
  kicker,
  title,
  intro,
  crumbs,
  align = "left",
  variant = "light",
  children,
}: {
  kicker?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs?: Crumb[];
  align?: "left" | "center";
  variant?: "light" | "dark";
  children?: React.ReactNode;
}) {
  const dark = variant === "dark";
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        dark ? "bg-onyx-950 text-white" : "bg-bone"
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      {dark && (
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-ember-500/20 blur-[120px]" />
      )}
      <div
        className={cn(
          "container relative py-14 sm:py-16 lg:py-20",
          align === "center" && "flex flex-col items-center text-center"
        )}
      >
        {crumbs && <Breadcrumbs items={crumbs} light={dark} className="mb-6" />}
        {kicker && (
          <span className="kicker mb-3">
            <span className="h-px w-7 bg-ember-500" />
            {kicker}
          </span>
        )}
        <h1
          className={cn(
            "max-w-3xl text-balance text-4xl font-extrabold uppercase leading-[0.95] tracking-tightest sm:text-5xl lg:text-6xl",
            dark ? "text-white" : "text-onyx-950",
            align === "center" && "mx-auto"
          )}
        >
          {title}
        </h1>
        {intro && (
          <p
            className={cn(
              "mt-5 max-w-2xl text-lg leading-relaxed",
              dark ? "text-white/65" : "text-onyx-500",
              align === "center" && "mx-auto"
            )}
          >
            {intro}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
