import { Truck, ShieldCheck, RotateCcw, Gift, PencilRuler, BadgeCheck, Stamp } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { siteConfig } from "@/config/site";

const icons = { Truck, ShieldCheck, RotateCcw, Gift, PencilRuler, BadgeCheck, Stamp } as const;

/** Slim ink trust bar above the header. */
export function AnnouncementBar() {
  const items = [
    ...siteConfig.trust,
    { label: "Designed with you, made to order in Dhaka", icon: "Stamp" as const },
  ];

  return (
    <div className="relative z-[60] bg-onyx-950 text-white">
      <Marquee className="py-2.5" itemClassName="text-xs font-medium tracking-wide">
        {items.map((item, i) => {
          const Icon = icons[item.icon as keyof typeof icons] ?? Gift;
          return (
            <span key={i} className="flex items-center gap-2 text-white/80">
              <Icon className="h-3.5 w-3.5 text-ember-500" />
              {item.label}
            </span>
          );
        })}
      </Marquee>
    </div>
  );
}
