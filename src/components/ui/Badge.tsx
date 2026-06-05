import { cn } from "@/lib/utils";

type BadgeTone = "ember" | "onyx" | "outline" | "sale" | "new";

const tones: Record<BadgeTone, string> = {
  ember: "bg-ember-500 text-white",
  onyx: "bg-onyx-950 text-white",
  outline: "border border-onyx-300 text-onyx-700",
  sale: "bg-ember-500 text-white",
  new: "bg-onyx-950 text-white",
};

export function Badge({
  children,
  tone = "ember",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
