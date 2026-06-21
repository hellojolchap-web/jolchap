-- ============================================================================
-- Jolchap — per-product return window (run once in the Supabase SQL Editor)
-- ----------------------------------------------------------------------------
-- Adds a `return_days` column to products (days a customer has to return it;
-- 0 = no returns). Safe to re-run.
-- ============================================================================

alter table public.products
  add column if not exists return_days integer not null default 7;

-- Reload the API cache so the new column is visible immediately.
notify pgrst, 'reload schema';
