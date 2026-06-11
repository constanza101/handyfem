import type { Metadata } from "next"

import { ResetPasswordForm } from "./reset-password-form"

export const metadata: Metadata = {
  title: "Restablecer contraseña — HandyFEM",
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
