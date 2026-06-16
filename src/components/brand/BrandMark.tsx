"use client";

import { useSettings } from "@/components/providers/SettingsProvider";
import { JolchapMark } from "./Logo";
import { cn } from "@/lib/utils";

/* The compact brand mark — shows the uploaded logo image when one is set,
   otherwise the built-in seal mark. Used in decorative spots (404, CTA, admin)
   so a custom logo propagates everywhere. */
export function BrandMark({
  className,
  tone = "default",
  badge = true,
}: {
  className?: string;
  tone?: "default" | "light" | "invert";
  badge?: boolean;
}) {
  const { brand } = useSettings();

  if (brand.logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={brand.logoUrl}
        alt={brand.name}
        className={cn("h-9 w-9 object-contain", className)}
      />
    );
  }

  return <JolchapMark tone={tone} badge={badge} title={brand.name} className={className} />;
}
