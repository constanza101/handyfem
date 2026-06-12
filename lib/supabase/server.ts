import "server-only"

import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

/**
 * Server client for Server Components, Server Actions, and Route Handlers.
 * Still RLS-protected (publishable key) — it acts as the logged-in user via
 * their session cookies, not as an admin.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from a Server Component, where cookies are read-only.
            // Safe to ignore: proxy.ts refreshes sessions for those requests.
          }
        },
      },
    }
  )
}
