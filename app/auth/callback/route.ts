import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

/**
 * PKCE callback for email links (signup confirmation, password recovery)
 * and OAuth (Google). Exchanges the code for a session, then redirects.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")

  // Open-redirect guard (Spec 02 security): internal paths only
  let next = searchParams.get("next") ?? "/dashboard"
  if (!next.startsWith("/") || next.startsWith("//")) next = "/dashboard"

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(`${origin}${next}`)
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
