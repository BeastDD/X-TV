// Shared types for the X-TV monorepo.
// These will be expanded in later sprints and used by web + api packages.

// Basic channel definition (used by TV shell in Sprint 0)
export type ChannelId =
  | 'news'
  | 'music'
  | 'adult-x'
  | 'animals'
  | 'cartoon'
  | 'anime'
  | 'trending';

export interface Channel {
  id: ChannelId;
  name: string;
  icon: string; // lucide icon name or component key
  keywords: string[]; // X search keywords for later curation
  description?: string;
}

// Minimal user shape synced from X OAuth (matches Supabase users table)
export interface XUser {
  x_id: string;
  handle: string;
  created_at?: string;
  prefs?: Record<string, unknown>;
}

// Placeholder for cached tweet metadata (Sprint 1+)
export interface CachedTweet {
  id: string;
  tweet_id: string;
  channel_id: ChannelId;
  text: string;
  media_variants: unknown; // JSONB from X
  expiry?: string;
}
