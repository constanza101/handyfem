import type { Metadata } from "next"

import { requireUser } from "@/lib/supabase/auth"

import { UpdatePasswordForm } from "./update-password-form"

export const metadata: Metadata = {
  title: "Nueva contraseña — HandyFEM",
}

export default async function UpdatePasswordPage() {
  // No recovery session → the link failed or expired; fail fast before the
  // user types a new password that can't be saved
  await requireUser("/reset-password")
  return <UpdatePasswordForm />
}
