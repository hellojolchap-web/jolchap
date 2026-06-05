/** Shared Supabase env helpers. */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? "media";

/**
 * Whether public Supabase credentials are present. When false, the storefront
 * transparently falls back to the bundled offline content so the site renders
 * perfectly before the database is wired up.
 */
export const isSupabaseConfigured = (): boolean =>
  Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Whether the privileged service-role key is available (server-only). */
export const isSupabaseAdminConfigured = (): boolean =>
  Boolean(SUPABASE_URL && SUPABASE_SERVICE_KEY);
