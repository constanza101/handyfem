import "server-only"

import { redirect } from "next/navigation"

import { createClient } from "./server"

/**
 * The one way to protect a page: verifies the session locally (getClaims —
 * JWT against cached JWKS, no network round-trip; proxy.ts already refreshed
 * the token) and redirects to /login when absent. Every protected page calls
 * this first; never copy ad-hoc getUser/redirect logic into pages.
 */
export async function requireUser(redirectTo = "/login") {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) redirect(redirectTo)

  return {
    supabase,
    userId: data.claims.sub as string,
    email: (data.claims.email as string | undefined) ?? null,
  }
}
