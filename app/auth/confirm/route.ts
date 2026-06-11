import { NextResponse } from "next/server"
import * as z from "zod/mini"
import type { EmailOtpType } from "@supabase/supabase-js"

import { createClient } from "@/lib/supabase/server"

const paramsSchema = z.object({
  token_hash: z.string().check(z.minLength(1)),
  type: z.enum(["signup", "recovery", "email_change", "email", "invite"]),
})

const DEFAULT_NEXT: Partial<Record<EmailOtpType, string>> = {
  recovery: "/update-password",
}

/**
 * Email-link confirmation via token_hash + verifyOtp. Unlike the PKCE code
 * exchange (/auth/callback), this works when the link is opened on a
 * different device or browser than the one that started the flow — the
 * normal case for email. Requires the Supabase email templates to link to
 * /auth/confirm?token_hash={{ .TokenHash }}&type=... (see PR notes).
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)

  const parsed = paramsSchema.safeParse({
    token_hash: searchParams.get("token_hash"),
    type: searchParams.get("type"),
  })
  if (!parsed.success) {
    return NextResponse.redirect(`${origin}/login?error=auth`)
  }
  const { token_hash, type } = parsed.data

  // Open-redirect guard: internal paths only
  let next = searchParams.get("next") ?? DEFAULT_NEXT[type] ?? "/dashboard"
  if (!next.startsWith("/") || next.startsWith("//")) next = "/dashboard"

  const supabase = await createClient()
  const { error } = await supabase.auth.verifyOtp({ type, token_hash })
  if (!error) return NextResponse.redirect(`${origin}${next}`)

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
