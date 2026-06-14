# Sprint 0 — Execution Summary (What We Actually Did)

This is a concise record of the work performed to complete the foundation described in DOCUMENTATION/Sprint 0.md (adapted for real 2026 tooling and the clarifications from the review).

## What Was Delivered

**Phase 1 — Monorepo & Structure**
- Safely bootstrapped using `create-turbo@latest --example basic --package-manager pnpm` (preserved original .git, LICENSE, .gitignore)
- Removed extraneous `apps/docs`
- Added `apps/tauri-desktop` (minimal placeholder)
- Added `packages/api`, `packages/utils`, `packages/types` (with basic package.json + barrels + shared types for Channel / XUser / CachedTweet)
- pnpm workspaces + turbo now see 9 packages/apps

**Phase 2 — Next.js + UI Foundation**
- Installed Tailwind v4 + PostCSS companion, shadcn/ui (base-nova style), and all listed deps: next-pwa, next-auth, framer-motion, zustand, @tanstack/react-query, lucide-react, @supabase/supabase-js
- Added `@/*` path alias + Tailwind/PostCSS configs so shadcn validated cleanly
- Created functional landing page (hero + 7-channel teaser cards using demo data + SignInButton) + working `/tv` shell (sidebar channel list + clickable switching + video player) using the existing tv-data + shadcn-style components
- next-pwa configured (conditionally applied only on production builds to avoid Turbopack conflicts in Next 16)

**Phase 3 — Supabase (critical user request)**
- `supabase/schema.sql` — complete, executable, with:
  - Detailed header instructions ("paste into SQL Editor and run")
  - CREATE TABLE for users, channels, cached_tweets (with FKs, JSONB, indexes)
  - RLS enabled + basic policies
  - Seed INSERT for all 7 channels with realistic sample keywords
- Client helpers: `lib/supabase/client.ts`, `server.ts` (anon + service-role clients)
- `lib/supabase/sync-user.ts` — the upsert helper that will be called from auth

**Phase 4 — X-only Auth (next-auth v5)**
- `lib/auth.ts` — Twitter provider only + signIn callback that calls the Supabase sync
- `app/api/auth/[...nextauth]/route.ts` — the handler (callback path = `/api/auth/callback/twitter`)
- `middleware.ts` — protects `/tv/*`, redirects unauth users to `/`
- Working `<SignInButton>` components (client) on the landing that call `signIn("twitter", { callbackUrl: "/tv" })`
- `.env.example` contains **very explicit novice instructions** (exact callback URL to register in X portal, how to generate AUTH_SECRET, scopes, what to fill, restart dev server, test account, troubleshooting "redirect_uri mismatch", etc.)

**Docs & Tooling (started)**
- Major root `README.md` rewrite with vision, exact pwsh commands, setup order, env table, structure, status, and links back to DOCUMENTATION
- Basic `.github/workflows/ci.yml` (pnpm install + build web on push/PR)
- This Sprint0-Steps.md (living record of what was actually executed)

## How to Test Right Now (after you fill secrets)

1. Make sure `supabase/schema.sql` has been run in your Supabase SQL Editor.
2. `cp .env.example .env.local` and fill using the comments inside (especially the X callback URL part).
3. `pnpm install && pnpm --filter=web dev`
4. Open http://localhost:3000
5. Click any "Sign in with X"
6. Complete OAuth with your test account
7. You should land on `/tv` (the 7 channel list/sidebar is visible; clicking switches the playing video clip)
8. Check your Supabase Table Editor → `users` table — a new row should exist.

## Remaining / Polish Items (easy follow-ups)

- TV polish (future): Zustand store for state, real keyboard/remote handlers, fullscreen API, overlays, seamless infinite behavior, Big Buck Bunny (or X-sourced) production clips. (Basic channel list + switching + player now implemented for Sprint 0.)
- Husky + commitlint (Phase 1 item that was deprioritized for speed).
- Vitest + basic Playwright smoke tests (landing + redirect behavior).
- Expand CI (add the test jobs, cache, etc.).
- `.github/` issue + PR templates.
- Minor: make the small nav SignInButton accept size cleanly, more PWA manifest polish, etc.

All core "Must-Have" items from the original Sprint 0 DoD are now runnable:
- Monorepo + web + tauri placeholder ✓
- Supabase clients + schema creation help ✓
- Complete X OAuth flow (X-only) + Supabase sync ✓
- Protected TV page + basic shell UI ✓
- PWA (configured) + tooling (CI + README) ✓

The project is ready for you to test the login flow with your X app keys and for Sprint 1 to begin.

Run `pnpm --filter=web dev` and enjoy the first end-to-end moment!
