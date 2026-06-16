"use client";

import { useEffect, useState } from "react";
import { useSettings } from "@/components/providers/SettingsProvider";
import { whatsappLink } from "@/lib/utils";

/**
 * Floating WhatsApp call-to-action, bottom-left on every page.
 * Uses the authentic WhatsApp glyph + brand green so visitors recognise it
 * instantly, and deep-links straight into a chat with the store number.
 */
export function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { contact } = useSettings();
  const href = whatsappLink(contact.whatsapp, contact.whatsappMessage);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 left-5 z-[90] flex items-center gap-3 sm:bottom-7 sm:left-7"
    >
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-[0_12px_34px_-8px_rgba(37,211,102,0.7)] transition-transform duration-300 group-hover:scale-105">
        {/* pulse ring */}
        {mounted && (
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]/50" />
        )}
        <svg viewBox="0 0 32 32" className="relative h-7 w-7" aria-hidden>
          <path
            fill="#fff"
            d="M16.004 5.333c-5.882 0-10.667 4.785-10.667 10.667 0 1.88.49 3.72 1.423 5.34L5.333 26.667l5.49-1.41a10.62 10.62 0 0 0 5.18 1.32h.004c5.882 0 10.667-4.785 10.667-10.667 0-2.85-1.11-5.53-3.126-7.546a10.6 10.6 0 0 0-7.544-3.03zm0 1.92a8.7 8.7 0 0 1 6.19 2.566 8.7 8.7 0 0 1 2.566 6.19c0 4.826-3.93 8.747-8.756 8.747h-.004a8.72 8.72 0 0 1-4.443-1.217l-.318-.19-3.258.837.87-3.175-.207-.327a8.72 8.72 0 0 1-1.337-4.642c.002-4.826 3.93-8.748 8.756-8.748z"
          />
          <path
            fill="#fff"
            d="M12.86 10.93c-.196-.435-.402-.444-.588-.452l-.5-.006c-.174 0-.457.066-.696.327-.24.262-.913.893-.913 2.178 0 1.284.935 2.525 1.066 2.7.13.174 1.815 2.91 4.485 3.965 2.22.876 2.672.702 3.154.658.48-.044 1.55-.633 1.77-1.244.218-.611.218-1.135.153-1.244-.066-.11-.24-.174-.5-.305-.262-.13-1.55-.764-1.79-.851-.24-.087-.414-.13-.588.131-.174.262-.674.851-.826 1.026-.152.174-.305.196-.566.066-.262-.131-1.105-.407-2.105-1.299-.778-.694-1.303-1.55-1.456-1.812-.152-.262-.016-.403.114-.533.117-.117.262-.305.392-.458.131-.152.174-.262.262-.436.087-.174.044-.327-.022-.458-.066-.13-.574-1.422-.806-1.94z"
          />
        </svg>
      </span>

      {/* hover label (desktop) */}
      <span className="pointer-events-none hidden -translate-x-2 rounded-full bg-onyx-950 px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-elevated transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        Chat with us
      </span>
    </a>
  );
}
