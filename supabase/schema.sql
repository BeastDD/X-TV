-- ============================================================================
-- X-TV Supabase Schema + Seed (Sprint 0)
-- ============================================================================
-- PURPOSE
--   Creates the three tables defined in the Sprint 0 plan:
--     - users (synced from X OAuth on first login)
--     - channels (the 7 fixed channels + later user custom ones)
--     - cached_tweets (metadata only — no video blobs)
--
-- HOW TO USE (for the user who has the Supabase project)
--   1. Go to https://supabase.com/dashboard  → your X-TV project
--   2. Open the SQL Editor (left sidebar)
--   3. Delete any default content, paste this ENTIRE file
--   4. Click "Run" (or Ctrl/Cmd + Enter)
--   5. Go to Table Editor and verify:
--        • channels has exactly 7 rows (the seeds below)
--        • users and cached_tweets are empty (ready for app)
--   6. (Optional but recommended) Enable "Realtime" on cached_tweets later if needed
--
-- NOTES
--   - All timestamps use timestamptz (good practice)
--   - keywords and media_variants are JSONB for flexible queries later
--   - Basic RLS is enabled. The login sync (Phase 4) will use the SERVICE ROLE key
--     on the server so it can insert into users even when RLS is strict.
--   - You can loosen/tighten policies in the Supabase dashboard or by editing this file.
-- ============================================================================

-- Enable useful extensions (id generation etc.)
create extension if not exists "pgcrypto";

-- ============================================================================
-- TABLES
-- ============================================================================

-- Users table: minimal profile synced from X OAuth (via next-auth)
create table if not exists public.users (
  id           uuid primary key default gen_random_uuid(),
  x_id         text unique not null,
  handle       text not null,
  created_at   timestamptz not null default now(),
  prefs        jsonb not null default '{}'::jsonb
);

comment on table public.users is 'X-authenticated users (synced on first login in Sprint 0/4)';
comment on column public.users.x_id is 'X/Twitter numeric or string user id from OAuth profile';
comment on column public.users.handle is 'X handle / username (without @)';
comment on column public.users.prefs is 'Future user preferences (JSON)';

-- Channels (7 fixed + room for user-created in Sprint 3)
create table if not exists public.channels (
  id           serial primary key,
  name         text unique not null,
  keywords     jsonb not null default '[]'::jsonb,
  description  text,
  icon         text
);

comment on table public.channels is 'Topic channels for the TV experience';
comment on column public.channels.keywords is 'Array of search terms/keywords used by X API in later sprints';

-- Cached tweet metadata only (no actual media files — compliance friendly)
create table if not exists public.cached_tweets (
  id             bigserial primary key,
  tweet_id       text not null,
  channel_id     integer not null references public.channels(id) on delete cascade,
  media_variants jsonb not null,           -- direct X video URLs + metadata
  text           text,
  expiry         timestamptz,
  created_at     timestamptz not null default now()
);

comment on table public.cached_tweets is 'Recent/relevant tweets with video for each channel (populated in Sprint 1+)';
comment on column public.cached_tweets.media_variants is 'The variants object returned by X API (hls/mp4 urls etc.)';

-- Useful indexes for later queries
create index if not exists idx_cached_tweets_channel_created on public.cached_tweets (channel_id, created_at desc);
create index if not exists idx_users_x_id on public.users (x_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

alter table public.users           enable row level security;
alter table public.channels        enable row level security;
alter table public.cached_tweets   enable row level security;

-- Basic policies (adjust as needed in dashboard or future migrations)
-- Allow anyone (anon + authenticated) to read channels (public data)
create policy "Channels are readable by everyone"
  on public.channels for select
  using (true);

-- Allow anyone to read cached tweets (the video metadata is public-ish)
create policy "Cached tweets are readable by everyone"
  on public.cached_tweets for select
  using (true);

-- Users table: only service role (server) can insert/update on login sync.
-- Regular users can read their own row if we later map auth.uid or similar.
-- For Sprint 0 we keep it simple — the sync uses the service_role key from .env.
create policy "Users can be read by authenticated users (example)"
  on public.users for select
  using (auth.role() = 'authenticated');

-- No broad insert policy on users — we rely on server-side service role key for the upsert.
-- This is the recommended pattern when mixing next-auth (X) + Supabase data.

-- ============================================================================
-- SEED DATA — The 7 official channels (Sprint 0)
-- ============================================================================
-- These keywords are starter values. They will be refined and used by the X API
-- client in Sprint 1. Feel free to tweak after running.

insert into public.channels (name, keywords, description, icon)
values
  ('News',          '["news","breaking","politics","world","election"]',                    'Breaking news and current events from X',                    'newspaper'),
  ('Music',         '["music","song","album","concert","artist","rap","pop"]',              'Music videos, performances, and artist clips',               'music'),
  ('Adult X',       '["adult","nsfw","18+"]',                                               'Mature / 18+ content (opt-in channel)',                      'eye-off'),
  ('Animals',       '["animals","pets","cats","dogs","wildlife","zoo","cute"]',             'Adorable (and wild) animals doing animal things',            'paw'),
  ('Cartoon',       '["cartoon","animation","kids","classic cartoon"]',                     'Classic and modern cartoons / animation',                    'smile'),
  ('Anime',         '["anime","manga","japan","otaku","studio ghibli"]',                    'Japanese animation and related clips',                       'sparkles'),
  ('Trending / Viral','["viral","trending","memes","challenge","fyp","funny"]',             'What is blowing up on X right now',                          'trending-up')
on conflict (name) do update
  set keywords = excluded.keywords,
      description = excluded.description,
      icon = excluded.icon;

-- ============================================================================
-- VERIFICATION QUERIES (run these in SQL Editor after the script)
-- ============================================================================
-- select * from channels order by id;
-- select count(*) from channels;   -- should be 7
-- select * from users limit 5;
-- select * from cached_tweets limit 5;

-- Done! You can now proceed with setting the Supabase env vars and running the app.
-- Tables are ready for the login sync (users will be populated on first X OAuth).