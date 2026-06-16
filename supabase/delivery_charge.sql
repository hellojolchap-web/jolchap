-- ============================================================================
-- Jolchap — add per-product delivery charge (run once in the SQL Editor)
-- ----------------------------------------------------------------------------
-- Adds a `delivery_charge` column to products (0 = free delivery). Promo codes
-- need NO database change — they live in the site_settings JSON. Safe to re-run.
-- ============================================================================

alter table public.products
  add column if not exists delivery_charge numeric(10, 2) not null default 0;

-- Reload the API cache so the new column is visible immediately.
notify pgrst, 'reload schema';
