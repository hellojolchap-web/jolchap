"use client";

import { createContext, useContext } from "react";
import { DEFAULT_SETTINGS, type ResolvedSettings } from "@/lib/settings";

/* Makes the resolved store settings (brand, contact, socials, hero, badges)
   available to any client component. Fed once from the server in the root
   layout, so it never refetches on the client. */

const SettingsContext = createContext<ResolvedSettings>(DEFAULT_SETTINGS);

export function SettingsProvider({
  value,
  children,
}: {
  value: ResolvedSettings;
  children: React.ReactNode;
}) {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): ResolvedSettings {
  return useContext(SettingsContext);
}
