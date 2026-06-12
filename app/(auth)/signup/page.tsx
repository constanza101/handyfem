import type { Metadata } from "next"

import { SignupForm } from "./signup-form"

export const metadata: Metadata = {
  title: "Crear cuenta — HandyFEM",
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ rol?: string }>
}) {
  const { rol } = await searchParams
  return <SignupForm isProfessional={rol === "profesional"} />
}
