# Jolchap (জলছাপ) — Setup Guide

A complete, beginner-friendly walkthrough: from a fresh clone to a live, deployed store with a working admin dashboard. No prior Supabase experience required — every step is spelled out.

> **The short version:** `npm install` → fill in `.env.local` (optional at first) → `npm run gen:images` → `npm run dev`. The site works immediately. Connect Supabase whenever you're ready for a live database and admin panel.

---

## Table of contents

0. [Prerequisites](#0-prerequisites)
1. [Install & run locally](#1-install--run-locally)
2. [Create a Supabase project](#2-create-a-supabase-project)
3. [Get your API keys](#3-get-your-api-keys)
4. [Create the storage bucket](#4-create-the-storage-bucket)
5. [Run the database](#5-run-the-database)
6. [Create an admin user](#6-create-an-admin-user)
7. [Configure WhatsApp, contact & socials](#7-configure-whatsapp-contact--socials)
8. [Deploy to Vercel](#8-deploy-to-vercel)
9. [Going-live checklist](#9-going-live-checklist)

---

## 0. Prerequisites

You'll need:

- **Node.js 18.18 or newer.** Check with `node -v`. If you don't have it, download the LTS build from [nodejs.org](https://nodejs.org).
- **A Supabase account** (free tier is plenty) — sign up at [supabase.com](https://supabase.com). _Only needed from Step 2 onward; the site runs without it._
- A code editor (VS Code is great) and a terminal.

---

## 1. Install & run locally

From the project folder:

```bash
# 1. Install all dependencies
npm install

# 2. The repo already includes a ready-to-fill .env.local.
#    You can leave the Supabase keys blank for now.

# 3. Generate the WebP imagery the storefront uses
npm run gen:images

# 4. Start the dev server
npm run dev
```

Now open **http://localhost:3000**.

> **The site works fully before Supabase.** With the Supabase keys blank, Jolchap serves bundled **offline fallback content** — the entire catalogue, all journal articles, the cart, search and every page render exactly as they will in production. You only need Supabase to make the data **editable** (via the admin) and to **persist** newsletter sign-ups and contact messages.

---

## 2. Create a Supabase project

1. Go to [app.supabase.com](https://app.supabase.com) and sign in.
2. Click **New project**.
3. Pick (or create) an **organisation**.
4. Give the project a **Name** (e.g. `jolchap`), set a strong **Database Password** (save it somewhere safe), and choose the **Region** closest to your customers (Singapore is a good pick for Bangladesh).
5. Click **Create new project** and wait ~1–2 minutes while it provisions.

---

## 3. Get your API keys

Open your project, then go to **Settings → API**. You need three values, plus the bucket name from the next step.

| Key                | Env var                          | Where to find it                                                                 |
| ------------------ | -------------------------------- | -------------------------------------------------------------------------------- |
| Project URL        | `NEXT_PUBLIC_SUPABASE_URL`       | Settings → API → **Project URL** (looks like `https://xxxx.supabase.co`)         |
| anon public key    | `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | Settings → API → **Project API keys → `anon` `public`**                          |
| service_role key   | `SUPABASE_SERVICE_ROLE_KEY`      | Settings → API → **Project API keys → `service_role`** — **keep this secret!**   |
| Storage bucket     | `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` | The name of the bucket you create in Step 4 — leave it as `media`           |

Open **`.env.local`** in the project root and paste the values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...your-anon-key...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...your-service-role-key...
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=media
```

> ⚠️ **Never expose the `service_role` key.** It bypasses all security rules. It must only ever live in `.env.local` and in your Vercel **server-side** environment variables. Never commit it, and never put it behind a `NEXT_PUBLIC_` name. (`.env.local` is already git-ignored.)

After editing `.env.local`, **stop and restart** `npm run dev` so Next.js picks up the new values.

---

## 4. Create the storage bucket

This bucket stores all uploaded product/journal imagery (as WebP).

1. In the Supabase dashboard, open **Storage** (left sidebar).
2. Click **New bucket**.
3. Name it exactly **`media`**.
4. Toggle **Public bucket** **ON** (so images can be served to visitors).
5. Click **Create bucket**.

Then make sure your env has:

```bash
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=media
```

> The storage **access policies** (public read, authenticated write) are created for you automatically when you run `schema.sql` in the next step — you don't need to add them by hand.

---

## 5. Run the database

You'll run two SQL files, in order, using Supabase's built-in editor.

1. In the dashboard, open **SQL Editor** (left sidebar) → **New query**.
2. Open the project file **`supabase/schema.sql`**, copy its entire contents, paste into the editor, and click **Run**.
   - This creates the `categories`, `products`, `blog_posts`, `newsletter_subscribers` and `contact_messages` tables, enables row-level security with the right policies, adds the `updated_at` triggers, and registers the `media` storage bucket and its policies.
   - It's **idempotent** — safe to run more than once.
3. Open **`supabase/seed.sql`**, copy all of it, paste into a **new query**, and click **Run**.
   - This loads all **6 categories**, **21 products** and **19 journal articles**.
   - Every statement uses `ON CONFLICT DO NOTHING`, so re-running it will never error or create duplicates.

**Verify it worked:** open **Table Editor → `products`** — you should see 21 rows. Reload **http://localhost:3000** and the catalogue is now served live from your database.

> **Tip:** to start over, you can re-run `seed.sql` any time. To wipe and rebuild, drop the tables and run `schema.sql` then `seed.sql` again.

---

## 6. Create an admin user

The admin dashboard at **`/admin`** is protected by Supabase Auth. Create yourself a login:

1. In the dashboard, open **Authentication → Users**.
2. Click **Add user → Create new user**.
3. Enter an **email** and a strong **password**.
4. (Recommended) Tick **Auto Confirm User** so you can sign in immediately without an email confirmation step.
5. Click **Create user**.

Now visit **http://localhost:3000/admin**, sign in with that email and password, and you can manage products and journal posts. Authenticated writes are permitted by the row-level-security policies created in Step 5; the public can only read.

---

## 7. Configure WhatsApp, contact & socials

These power the floating WhatsApp button, the header/footer contact details, and the social icons. Edit them in **`.env.local`**:

```bash
# WhatsApp — international format, NO spaces or dashes.
# The floating button links to https://wa.me/<this number>.
NEXT_PUBLIC_WHATSAPP_NUMBER=+8801700000000

# Shown in the header, footer and on the contact page.
NEXT_PUBLIC_CONTACT_PHONE=+880 1700 000000
NEXT_PUBLIC_CONTACT_EMAIL=hello@jolchap.com.bd

# Full profile URLs for the footer icons.
NEXT_PUBLIC_SOCIAL_INSTAGRAM=https://instagram.com/jolchaplifestyle
NEXT_PUBLIC_SOCIAL_FACEBOOK=https://www.facebook.com/jolchaplifestyle
NEXT_PUBLIC_SOCIAL_YOUTUBE=https://youtube.com/@jolchaplifestyle
NEXT_PUBLIC_SOCIAL_TIKTOK=https://tiktok.com/@jolchaplifestyle
NEXT_PUBLIC_SOCIAL_X=https://x.com/jolchaplifestyle
```

**About the WhatsApp format:** use the full international number with country code and **no spaces, dashes or parentheses** — for example `+8801700000000` (Bangladesh) or `+447700900123` (UK). The display phone (`NEXT_PUBLIC_CONTACT_PHONE`) can be formatted nicely with spaces; only the WhatsApp number must be compact, because it becomes part of the `wa.me/` link.

Restart `npm run dev` after changing any env value.

---

## 8. Deploy to Vercel

1. Push this repository to **GitHub** (or GitLab/Bitbucket).
2. Go to [vercel.com](https://vercel.com), click **Add New → Project**, and **import** your repository. Vercel auto-detects Next.js — no build settings to change.
3. Before deploying, expand **Environment Variables** and add **every** key from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`  ← server-side secret
   - `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` = `media`
   - `NEXT_PUBLIC_SITE_URL` = your production URL (e.g. `https://jolchap.com.bd`)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_CONTACT_EMAIL`
   - `NEXT_PUBLIC_SOCIAL_INSTAGRAM`, `NEXT_PUBLIC_SOCIAL_FACEBOOK`, `NEXT_PUBLIC_SOCIAL_YOUTUBE`, `NEXT_PUBLIC_SOCIAL_TIKTOK`, `NEXT_PUBLIC_SOCIAL_X`
4. Click **Deploy**.
5. After it builds, open your live URL. If you add or change env vars later, **redeploy** so they take effect.

> Your Supabase project already allows requests from any origin by default, so the deployed site connects to the same database with no extra CORS configuration.

---

## 9. Going-live checklist

Before you announce the store:

- [ ] **Replace the placeholder imagery** with real photographs. Drop your own `.webp` files into the matching paths under `public/images/` (keep the filenames), or upload through `/admin` (uploads are auto-converted to WebP). Regenerate the branded set any time with `npm run gen:images`.
- [ ] **Set `NEXT_PUBLIC_SITE_URL`** to your real domain (locally and in Vercel) so SEO, canonical URLs and Open Graph tags are correct.
- [ ] **Confirm the database is seeded** — `products` shows 21 rows, `blog_posts` shows 19.
- [ ] **Test the admin login** at `/admin` with your Supabase user.
- [ ] **Set the real WhatsApp number, phone, email and social links** in env (Step 7) and verify the floating WhatsApp button opens a chat to the right number.
- [ ] **Submit a test newsletter sign-up and contact message**, then confirm the rows appear in Supabase (Table Editor → `newsletter_subscribers` / `contact_messages`).
- [ ] **Run `npm run build` locally** once to catch any issues before deploying.
- [ ] **Double-check `SUPABASE_SERVICE_ROLE_KEY` is never exposed** — it should only exist in `.env.local` and Vercel's environment variables, never in client code or your git history.

---

You're set. Your idea, beautifully printed. 🎨
