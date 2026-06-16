-- ============================================================================
-- Jolchap — site_settings table (run once in the Supabase SQL Editor)
-- ----------------------------------------------------------------------------
-- Holds the editable store settings (brand, colours, contact, socials, hero,
-- badges) as a single JSONB row. Safe to run multiple times.
-- ============================================================================

create table if not exists public.site_settings (
  id         integer primary key default 1,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

-- Ensure the single settings row exists.
insert into public.site_settings (id, data)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

-- Keep updated_at fresh on every write.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- World-readable (the storefront reads brand/colours), writable by the admin.
alter table public.site_settings enable row level security;

drop policy if exists "settings public read" on public.site_settings;
create policy "settings public read"
  on public.site_settings for select
  using (true);

drop policy if exists "settings auth write" on public.site_settings;
create policy "settings auth write"
  on public.site_settings for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================================
-- Done. Reload the API cache so the new table is visible immediately:
notify pgrst, 'reload schema';
-- ============================================================================
