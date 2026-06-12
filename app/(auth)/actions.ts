"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import {
  loginSchema,
  signupSchema,
  resetRequestSchema,
  updatePasswordSchema,
  toFieldErrors,
  parseForm,
  type FieldErrors,
} from "@/lib/validations/auth"

export type AuthState = {
  fieldErrors?: FieldErrors
  formError?: string
  /** "exists" → signup found an existing account; "verify" → check email */
  status?: "exists" | "verify" | "sent"
  email?: string
  /** Entered values round-tripped on failure so React 19's form reset
   *  doesn't wipe the user's typing. NEVER includes passwords. */
  values?: Record<string, string>
} | null

/** Deploy config first; header fallback keeps localhost working without it. */
async function siteOrigin() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  const h = await headers()
  return h.get("origin") ?? `https://${h.get("x-forwarded-host") ?? "localhost:3000"}`
}

function safeValues(formData: FormData, keys: string[]) {
  return Object.fromEntries(
    keys.map((k) => [k, String(formData.get(k) ?? "")])
  )
}

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const values = safeValues(formData, ["email"])
  const parsed = parseForm(loginSchema, formData)
  if (!parsed.success)
    return { fieldErrors: toFieldErrors(parsed.error), values }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(parsed.data)
  // Never reveal whether the email exists (user enumeration)
  if (error) return { formError: "Email o contraseña incorrectos", values }

  redirect("/dashboard")
}

export async function signup(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const values = safeValues(formData, ["firstName", "lastName", "email"])
  const parsed = parseForm(signupSchema, formData)
  if (!parsed.success)
    return { fieldErrors: toFieldErrors(parsed.error), values }

  const { firstName, lastName, email, password, role } = parsed.data
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: `${firstName} ${lastName}`,
        first_name: firstName,
        last_name: lastName,
        // Recorded at signup so the onboarding slice (Spec 06) can route
        // professionals correctly — even for accounts created before it ships.
        signup_role: role,
      },
      // Confirmation emails use the token_hash template → /auth/confirm
      // (works cross-device); emailRedirectTo feeds {{ .RedirectTo }} as a
      // fallback for projects still on the default template.
      emailRedirectTo: `${await siteOrigin()}/auth/callback?next=/dashboard`,
    },
  })

  if (error)
    return { formError: "No se pudo crear la cuenta. Inténtalo de nuevo.", values }
  // Supabase obfuscates existing emails: a user with no identities means
  // the email is already registered
  if (data.user && data.user.identities?.length === 0) {
    return { status: "exists", values }
  }

  return { status: "verify", email }
}

export async function requestPasswordReset(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const values = safeValues(formData, ["email"])
  const parsed = parseForm(resetRequestSchema, formData)
  if (!parsed.success)
    return { fieldErrors: toFieldErrors(parsed.error), values }

  const supabase = await createClient()
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${await siteOrigin()}/auth/callback?next=/update-password`,
  })
  // Always "sent" — even for unknown emails (user enumeration)
  return { status: "sent" }
}

export async function updatePassword(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = parseForm(updatePasswordSchema, formData)
  if (!parsed.success) return { fieldErrors: toFieldErrors(parsed.error) }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password })
  if (error)
    return { formError: "No se pudo guardar. El enlace puede haber caducado." }

  redirect("/dashboard")
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}
