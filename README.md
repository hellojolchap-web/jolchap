<div align="center">

# Jolchap · জলছাপ

### Custom print & personalisation studio storefront

Custom seals & stamps, printed apparel, photo mugs, tote bags, personalised gifts and stationery — made to order in Dhaka, priced in Bangladeshi Taka (৳).
A fast, polished, fully responsive e-commerce experience built with **Next.js 15** and **Supabase**.

</div>

---

## Highlights

- **Full storefront** — home, shop with live filtering & sorting, category pages, rich product detail with image gallery, variant pickers and a slide-out cart.
- **The Jolchap Journal** — a built-in blog with featured posts, categories, author bylines and reading times, packed with real print & personalisation advice.
- **Admin dashboard** — sign in at `/admin` to manage products and journal articles, backed by Supabase Auth and row-level security.
- **Automatic WebP image pipeline** — every asset is WebP; admin uploads convert to WebP on the way into storage, so the catalogue stays lean and fast.
- **Supabase-backed with offline fallback** — wire up a database when you're ready; until then the site renders perfectly from bundled content.
- **Custom widgets** — scroll progress bar, scroll-to-top, and a floating WhatsApp button that deep-links to your number.
- **Fully responsive** — designed mobile-first, refined on every breakpoint, with motion that respects reduced-motion preferences.
- **SEO ready** — semantic markup, per-page metadata, Open Graph imagery and a canonical site URL.

## Tech stack

| Layer        | Choice                                              |
| ------------ | --------------------------------------------------- |
| Framework    | Next.js 15 (App Router) · React 19                  |
| Language     | TypeScript                                          |
| Styling      | Tailwind CSS · `@tailwindcss/typography`            |
| Motion       | Framer Motion                                       |
| Carousel     | Embla                                               |
| Icons        | lucide-react                                        |
| State        | Zustand (cart)                                       |
| Backend      | Supabase (Postgres · Auth · Storage)                |
| Images       | `next/image` + Sharp (WebP-only pipeline)           |
| Notifications| Sonner                                              |

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (the repo ships a ready-to-fill .env.local)
#    The Supabase keys can stay blank — the site runs on offline content.
#    See SETUP-GUIDE.md for where to find each value.

# 3. Generate the on-brand WebP imagery
npm run gen:images

# 4. Start the dev server
npm run dev
```

Open **http://localhost:3000**. The full site — storefront, blog, cart — works immediately, before you connect a database.

## Scripts

| Script              | What it does                                                        |
| ------------------- | ------------------------------------------------------------------- |
| `npm run dev`       | Start the Next.js development server with hot reload.               |
| `npm run build`     | Create an optimised production build.                               |
| `npm run start`     | Serve the production build (run after `build`).                     |
| `npm run lint`      | Run ESLint across the project.                                      |
| `npm run gen:images`| Generate every WebP image the storefront references into `/public`. |

## Project structure

```
jolchap/
├─ public/
│  └─ images/              # All imagery — WebP only (products, categories, blog, authors, og)
├─ scripts/
│  └─ generate-placeholders.mjs   # Builds the WebP image set (npm run gen:images)
├─ supabase/
│  ├─ schema.sql           # Idempotent DDL: tables, RLS, triggers, storage bucket
│  └─ seed.sql             # Categories, products and journal content
├─ src/
│  ├─ app/                 # App Router routes, layout & global styles
│  ├─ components/          # UI building blocks
│  │  ├─ brand/            #   logo & brand marks
│  │  ├─ ui/               #   buttons, badges, headings, reveal, marquee…
│  │  ├─ layout/           #   header, footer, nav, search, announcement bar
│  │  ├─ home/             #   hero, showcases, value props, stats
│  │  ├─ product/          #   product cards
│  │  ├─ commerce/         #   shop browser (filter/sort)
│  │  ├─ cart/             #   cart drawer
│  │  ├─ blog/             #   blog index & cards
│  │  ├─ contact/          #   contact form
│  │  └─ widgets/          #   scroll progress, scroll-to-top, WhatsApp button
│  ├─ config/
│  │  └─ site.ts           # Brand content & navigation (reads env for contact/socials)
│  ├─ lib/
│  │  ├─ data/             # Bundled offline content (categories, products, blog, testimonials)
│  │  ├─ queries.ts        # Data access — Supabase-first with offline fallback
│  │  ├─ store/            # Zustand cart store
│  │  └─ supabase/         # Browser, server & admin clients + config helpers
│  └─ types/
│     └─ index.ts          # Shared domain types (mirror the DB schema)
├─ .env.local             # Your local env (paste keys here — never commit)
├─ .env.local.example     # Template documenting every env var
├─ next.config.mjs        # WebP image config + Supabase storage remote patterns
├─ README.md
└─ SETUP-GUIDE.md         # Beginner-friendly, step-by-step setup
```

## Supabase setup

The storefront works offline out of the box. To enable the live database, admin dashboard and image uploads:

1. Create a Supabase project.
2. Create a public Storage bucket named `media`.
3. Run `supabase/schema.sql` then `supabase/seed.sql` in the Supabase SQL editor.
4. Add your Supabase keys to `.env.local`.

Full, screenshot-level instructions — including creating your admin login — are in **[SETUP-GUIDE.md](./SETUP-GUIDE.md)**.

## Deployment

Deploy to **Vercel** in a couple of minutes:

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import it into Vercel — the Next.js framework preset is detected automatically.
3. Add **every** variable from your `.env.local` under **Project → Settings → Environment Variables**.
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
5. Deploy.

See [SETUP-GUIDE.md → Deploy to Vercel](./SETUP-GUIDE.md) for the detailed walkthrough.

## Replacing the imagery

Every image in the project is **WebP**, generated into `/public/images` by `npm run gen:images`.

- **Swap in your own photos:** drop real `.webp` files into the matching paths under `/public/images` (e.g. `public/images/products/custom-round-rubber-stamp-1.webp`). Keep the filenames so the catalogue keeps referencing them.
- **Regenerate the branded set** at any time with `npm run gen:images`.
- **Admin uploads auto-convert to WebP** — when you upload a JPG or PNG through the admin dashboard, it is converted to optimised WebP before it is stored in the `media` bucket, so the whole project stays WebP-only.

---

<div align="center">
<sub>Jolchap · জলছাপ — your idea, beautifully printed.</sub>
</div>
