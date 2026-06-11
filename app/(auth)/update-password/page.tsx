import type { Metadata } from "next"

import { UpdatePasswordForm } from "./update-password-form"

export const metadata: Metadata = {
  title: "Nueva contraseña — HandyFEM",
}

export default function UpdatePasswordPage() {
  return <UpdatePasswordForm />
}
