import { createBrowserClient } from "@supabase/ssr"

/**
 * Browser client — publishable key, RLS-protected. The ONLY Supabase client
 * allowed in "use client" code (CLAUDE.md: two clients, never mixed).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
