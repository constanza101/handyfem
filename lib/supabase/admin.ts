import "server-only"

import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Admin client — secret key, BYPASSES RLS. Server-only, enforced at build
 * time by the "server-only" import: any file reachable from "use client"
 * that imports this module fails to compile.
 *
 * Use only for trusted operations that RLS intentionally forbids (e.g.
 * setting `verified` on a professional profile). Never for normal reads.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  )
}
