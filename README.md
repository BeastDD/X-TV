# 𝕏 TV (X TV)

**A seamless, infinite TV-like experience for video content from X (Twitter).**

X-only OAuth login → 7 topic channels → fullscreen autoplay "TV mode".

This is the monorepo (Turborepo + pnpm) for the project.

**Single source of truth for the full plan**: see the sibling `../DOCUMENTATION/` folder (Roadmap.md + Sprint 0.md). This README is the developer quickstart.

---

## Current Status (Sprint 0 — Foundation)

**Completed in this sprint:**
- Turborepo monorepo with Next.js (latest) web app + Tauri placeholder + shared packages
- Tailwind + shadcn/ui + core UI libs (framer-motion, zustand, TanStack Query, lucide-react)
- Supabase client (browser + server + service role) + complete schema.sql with tables + RLS + 7-channel seed
- X-only authentication with next-auth v5 (Twitter provider)
  - Correct callback: `/api/auth/callback/twitter`
  - Middleware protection for `/tv`
  - Automatic sync of X profile → Supabase `users` table on first login
- Basic TV UI shell route (`/tv`) + clean landing page with channel teaser
- PWA support via next-pwa (manifest + service worker on production builds)
- Working `pnpm dev` and production build for the web app

**Next**: Sprint 1 (real X API client, channel curation jobs, direct video playback).

---

## Quick Start (for the solo dev on Windows)

**Prerequisites**
- Node.js 20+
- pnpm (corepack or `npm i -g pnpm`)
- Git
- A Supabase project (you already created it)
- An X Developer App with OAuth 2.0 enabled (you said you have it ready)

**1. Clone & install**
```pwsh
cd F:\New_folder\Visual-x_RE\X-TV
pnpm install
```

**2. Set up your local secrets (the most important step)**
```pwsh
cp .env.example .env.local
```

Open `.env.local` and fill the values. The file itself contains **very detailed novice instructions** (exact callback URL, how to generate `AUTH_SECRET`, which scopes to request in the X portal, etc.).

Required vars for Sprint 0:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `AUTH_SECRET`
- `AUTH_TWITTER_ID`
- `AUTH_TWITTER_SECRET`

**3. Apply the database schema (one-time)**
- Open your Supabase project → SQL Editor
- Paste the entire contents of `supabase/schema.sql`
- Run it
- Verify in Table Editor that the `channels` table has 7 rows

**4. Run the app**
```pwsh
pnpm dev
# or for just the web app:
pnpm --filter=web dev
```

Visit http://localhost:3000

Click **"Sign in with X"** → complete the OAuth flow with your test account → you should land on `/tv`.

A row should appear in your Supabase `users` table.

---

## Project Structure (after Sprint 0)

```
X-TV/
├── apps/
│   ├── web/                 # Main Next.js app (latest + React 19 + App Router)
│   │   ├── app/
│   │   │   ├── (landing + /tv protected shell)
│   │   │   └── api/auth/[...nextauth]/route.ts
│   │   ├── components/ (shadcn/ui + custom tv/ + auth/)
│   │   ├── lib/ (supabase clients, auth config, channels, sync-user, etc.)
│   │   └── ...
│   └── tauri-desktop/       # Placeholder (real work in Sprint 4)
├── packages/
│   ├── api/                 # Future X client + curation (Sprint 1+)
│   ├── utils/
│   ├── types/               # Shared TS types (Channel, XUser, etc.)
│   ├── ui/                  # (from turbo starter)
│   └── ... (eslint-config, typescript-config)
├── supabase/
│   └── schema.sql           # Full creation + RLS + seed for the 7 channels
├── .env.example             # Copy to .env.local and fill (with long instructions)
├── turbo.json, pnpm-workspace.yaml
└── README.md (this file)
```

DOCUMENTATION/ (sibling, not committed here) contains the full sprint-by-sprint plan.

---

## Key Commands

```pwsh
pnpm dev                 # Start everything (turbo)
pnpm --filter=web dev    # Only the web app (recommended while iterating UI)
pnpm exec turbo build --filter=web
pnpm lint
```

---

## The 7 Channels (Sprint 0)

News • Music • Adult X • Animals • Cartoon • Anime • Trending/Viral

Keywords and real X fetching are coming in Sprint 1. The UI shell already renders them with icons.

---

## Authentication Details (X-only)

- Provider: Twitter (works for X) via next-auth v5
- Callback you **must** have registered in the X Developer Portal:
  `http://localhost:3000/api/auth/callback/twitter`
- On successful login we automatically upsert into Supabase `users` using the service role key.
- `/tv` is protected by middleware. Unauthenticated users are sent back to the landing page.

Full instructions + exact env var names live in `.env.example`.

---

## What's Next (high level)

- Sprint 1: Real X API client, background jobs, video URL playback
- Sprint 2: Infinite autoplay player, keyboard/remote, seamless channel switching
- Later: Tauri desktop, personalization, moderation, deployment

See the full backlog in the sibling DOCUMENTATION folder.

---

## Contributing / Solo Workflow

- Conventional commits (husky + commitlint will be enforced once fully wired)
- Feature branches + PRs to main (per the original plan)
- Daily commits, end-of-sprint demo video

---

**Let's ship this thing. The foundation is solid.**

If anything in the setup instructions is unclear, the comments in `.env.example` and `supabase/schema.sql` were written specifically to be copy-paste friendly for the first run.

— Grok (executing the plan)