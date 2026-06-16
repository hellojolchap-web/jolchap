-- ============================================================================
-- Jolchap (জলছাপ) — Database schema
-- ----------------------------------------------------------------------------
-- Idempotent DDL for the Jolchap storefront. Safe to run multiple times.
--
-- Run this FIRST in the Supabase SQL editor, then run `seed.sql` to load the
-- catalogue and journal content. See SETUP-GUIDE.md for the full walkthrough.
--
-- Column names are snake_case and intentionally match the row mappers in
-- src/lib/queries.ts and the domain types in src/types/index.ts. Do not rename
-- columns without updating those mappers.
-- ============================================================================

-- gen_random_uuid() lives in pgcrypto.
create extension if not exists pgcrypto;

-- ============================================================================
-- TABLES
-- ============================================================================

-- ---------------------------------------------------------------------------
-- categories
--   Storefront departments (Seals & Stamps, Custom Apparel, ...). `id` is a
--   stable text key that matches the seed data (e.g. 'cat-seals-stamps'). `sort`
--   drives display order; `icon` is a lucide icon name resolved in the UI.
-- ---------------------------------------------------------------------------
create table if not exists public.categories (
  id          text primary key,
  slug        text not null unique,
  name        text not null,
  tagline     text not null default '',
  description text not null default '',
  icon        text not null default 'Dumbbell',
  image       text not null default '',
  sort        integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- products
--   The catalogue. JSON-shaped fields (features, specs, images, colors, sizes,
--   tags) are stored as jsonb so they round-trip cleanly to the app types.
--   `description` is sanitised HTML. `price`/`compare_at_price` are stored as
--   numeric so currency math stays exact.
-- ---------------------------------------------------------------------------
create table if not exists public.products (
  id                text primary key,
  slug              text not null unique,
  name              text not null,
  category_slug     text not null,
  category_name     text not null default '',
  price             numeric(10, 2) not null default 0,
  compare_at_price  numeric(10, 2),
  currency          text not null default 'USD',
  rating            numeric(2, 1) not null default 0,
  review_count      integer not null default 0,
  badge             text,
  short_description text not null default '',
  description       text not null default '',   -- sanitised HTML
  features          jsonb not null default '[]'::jsonb,
  specs             jsonb not null default '[]'::jsonb,
  images            jsonb not null default '[]'::jsonb,
  colors            jsonb not null default '[]'::jsonb,
  sizes             jsonb not null default '[]'::jsonb,
  in_stock          boolean not null default true,
  stock_count       integer not null default 0,
  free_delivery     boolean not null default false,
  promo_code        text not null default '',
  promo_discount    numeric(10, 2) not null default 0,
  promo_type        text not null default 'flat',
  promo_expiry      date,
  is_featured       boolean not null default false,
  is_new            boolean not null default false,
  is_bestseller     boolean not null default false,
  tags              jsonb not null default '[]'::jsonb,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Helpful indexes for the storefront's common filters.
create index if not exists products_category_slug_idx on public.products (category_slug);
create index if not exists products_is_featured_idx    on public.products (is_featured);
create index if not exists products_is_bestseller_idx  on public.products (is_bestseller);
create index if not exists products_is_new_idx         on public.products (is_new);
create index if not exists products_created_at_idx     on public.products (created_at desc);

-- ---------------------------------------------------------------------------
-- blog_posts
--   The Jolchap Journal. `content` is sanitised multi-paragraph HTML, `author`
--   is a jsonb object {name, role, avatar}, and `published_at` is a date.
-- ---------------------------------------------------------------------------
create table if not exists public.blog_posts (
  id           text primary key,
  slug         text not null unique,
  title        text not null,
  excerpt      text not null default '',
  content      text not null default '',   -- sanitised HTML
  cover_image  text not null default '',
  category     text not null default 'Journal',
  tags         jsonb not null default '[]'::jsonb,
  author       jsonb not null default '{}'::jsonb,
  reading_time integer not null default 5,
  published_at date not null default current_date,
  featured     boolean not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists blog_posts_published_at_idx on public.blog_posts (published_at desc);
create index if not exists blog_posts_featured_idx     on public.blog_posts (featured);

-- ---------------------------------------------------------------------------
-- newsletter_subscribers
--   Captured by the footer newsletter form. Public can INSERT (subscribe) but
--   cannot read the list — only authenticated/service roles can.
-- ---------------------------------------------------------------------------
create table if not exists public.newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- contact_messages
--   Captured by the contact form. Public can INSERT (send) but cannot read —
--   only authenticated/service roles can.
-- ---------------------------------------------------------------------------
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  subject    text not null default '',
  message    text not null,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- updated_at TRIGGER
--   Auto-bumps updated_at on every UPDATE so the app can sort/track freshness.
-- ============================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_categories_updated_at on public.categories;
create trigger set_categories_updated_at
  before update on public.categories
  for each row execute function public.set_updated_at();

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY
--   Catalogue/journal: world-readable, writable only by authenticated users
--   (your signed-in admin). Lead-capture tables: world can INSERT, nobody but
--   authenticated/service can SELECT.
-- ============================================================================
alter table public.categories             enable row level security;
alter table public.products               enable row level security;
alter table public.blog_posts             enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages       enable row level security;

-- ── categories ─────────────────────────────────────────────────────────────
drop policy if exists "categories public read"      on public.categories;
drop policy if exists "categories auth insert"      on public.categories;
drop policy if exists "categories auth update"      on public.categories;
drop policy if exists "categories auth delete"      on public.categories;

create policy "categories public read"
  on public.categories for select
  using (true);

create policy "categories auth insert"
  on public.categories for insert
  to authenticated
  with check (true);

create policy "categories auth update"
  on public.categories for update
  to authenticated
  using (true)
  with check (true);

create policy "categories auth delete"
  on public.categories for delete
  to authenticated
  using (true);

-- ── products ───────────────────────────────────────────────────────────────
drop policy if exists "products public read" on public.products;
drop policy if exists "products auth insert"  on public.products;
drop policy if exists "products auth update"  on public.products;
drop policy if exists "products auth delete"  on public.products;

create policy "products public read"
  on public.products for select
  using (true);

create policy "products auth insert"
  on public.products for insert
  to authenticated
  with check (true);

create policy "products auth update"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

create policy "products auth delete"
  on public.products for delete
  to authenticated
  using (true);

-- ── blog_posts ─────────────────────────────────────────────────────────────
drop policy if exists "blog_posts public read" on public.blog_posts;
drop policy if exists "blog_posts auth insert"  on public.blog_posts;
drop policy if exists "blog_posts auth update"  on public.blog_posts;
drop policy if exists "blog_posts auth delete"  on public.blog_posts;

create policy "blog_posts public read"
  on public.blog_posts for select
  using (true);

create policy "blog_posts auth insert"
  on public.blog_posts for insert
  to authenticated
  with check (true);

create policy "blog_posts auth update"
  on public.blog_posts for update
  to authenticated
  using (true)
  with check (true);

create policy "blog_posts auth delete"
  on public.blog_posts for delete
  to authenticated
  using (true);

-- ── newsletter_subscribers ─────────────────────────────────────────────────
-- Public may subscribe (INSERT). No public SELECT — the list stays private.
drop policy if exists "newsletter public insert" on public.newsletter_subscribers;
drop policy if exists "newsletter auth read"      on public.newsletter_subscribers;

create policy "newsletter public insert"
  on public.newsletter_subscribers for insert
  to anon, authenticated
  with check (true);

create policy "newsletter auth read"
  on public.newsletter_subscribers for select
  to authenticated
  using (true);

-- ── contact_messages ───────────────────────────────────────────────────────
-- Public may send (INSERT). No public SELECT — only authenticated can read.
drop policy if exists "contact public insert" on public.contact_messages;
drop policy if exists "contact auth read"      on public.contact_messages;

create policy "contact public insert"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

create policy "contact auth read"
  on public.contact_messages for select
  to authenticated
  using (true);

-- ============================================================================
-- STORAGE
--   A single public bucket 'media' holds all uploaded WebP imagery. Admin
--   uploads convert to WebP before they ever reach the bucket. Public can read
--   the files; only authenticated users can write/replace/delete them.
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- ── storage.objects policies (scoped to the 'media' bucket) ─────────────────
drop policy if exists "media public read"   on storage.objects;
drop policy if exists "media auth insert"    on storage.objects;
drop policy if exists "media auth update"    on storage.objects;
drop policy if exists "media auth delete"    on storage.objects;

create policy "media public read"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "media auth insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

create policy "media auth update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');

create policy "media auth delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');

-- ============================================================================
-- SITE SETTINGS
--   A single JSONB row holding owner-editable store settings (brand, colours,
--   contact, socials, hero banner, badge list). World-readable; admin-writable.
-- ============================================================================
create table if not exists public.site_settings (
  id         integer primary key default 1,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

insert into public.site_settings (id, data)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

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
-- Done. Next: run seed.sql to populate categories, products and blog_posts.
-- ============================================================================
