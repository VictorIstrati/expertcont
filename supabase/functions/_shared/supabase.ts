import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";

let cached: SupabaseClient | null = null;

/**
 * Returns a Supabase client authenticated with the secret key (`sb_secret_…`,
 * formerly service_role). Bypasses RLS — only use inside edge functions.
 *
 * Reads `SUPABASE_SECRET_KEY` first, falling back to the legacy
 * `SUPABASE_SERVICE_ROLE_KEY` for projects that haven't migrated yet.
 */
export function getServiceClient(): SupabaseClient {
  if (cached) return cached;
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SECRET_KEY") ?? Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SECRET_KEY (or legacy SUPABASE_SERVICE_ROLE_KEY) must be set",
    );
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
