import type { XUser } from 'types';
import { createServiceRoleClient } from './server';

/**
 * Upsert a user record into Supabase from the X OAuth profile.
 * Called on successful sign-in (see Phase 4 auth callbacks).
 *
 * Uses the SERVICE ROLE key so it works even with strict RLS on the users table.
 */
export async function syncXUserToSupabase(profile: {
  id: string;
  username?: string;
  name?: string;
}) {
  const supabase = createServiceRoleClient();

  const user: Partial<XUser> = {
    x_id: profile.id,
    handle: profile.username || profile.name || 'unknown',
  };

  const { data, error } = await supabase
    .from('users')
    .upsert(user, { onConflict: 'x_id' })
    .select()
    .single();

  if (error) {
    console.error('Failed to sync X user to Supabase:', error);
    return null;
  }

  return data;
}
