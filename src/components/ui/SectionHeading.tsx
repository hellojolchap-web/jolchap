import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
  className,
  light = false,
}: {
  kicker?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {kicker && (
        <span className="kicker">
          <span className="h-px w-7 bg-ember-500" />
          {kicker}
        </span>
      )}
      <h2
        className={cn(
          "text-balance text-3xl font-extrabold leading-[1.05] sm:text-4xl lg:text-5xl",
          light ? "text-white" : "text-onyx-950"
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            light ? "text-white/65" : "text-onyx-500",
            align === "center" && "mx-auto"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
