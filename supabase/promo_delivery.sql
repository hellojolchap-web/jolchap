-- ============================================================================
-- Jolchap — per-product free-delivery toggle + per-product promo
-- ----------------------------------------------------------------------------
-- Run once in the Supabase SQL Editor. Safe to re-run. Delivery zone charges
-- (inside / outside Dhaka) live in site_settings — no column needed for them.
-- ============================================================================

alter table public.products
  add column if not exists free_delivery  boolean       not null default false,
  add column if not exists promo_code     text          not null default '',
  add column if not exists promo_discount numeric(10,2) not null default 0,
  add column if not exists promo_type     text          not null default 'flat',
  add column if not exists promo_expiry   date;

-- Reload the API cache so the new columns are visible immediately.
notify pgrst, 'reload schema';
