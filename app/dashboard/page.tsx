import type { Metadata } from "next"

import { signOut } from "@/app/(auth)/actions"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { requireUser } from "@/lib/supabase/auth"

export const metadata: Metadata = {
  title: "Panel — HandyFEM",
}

/** Placeholder until Spec 05 (dashboard with role toggle). Proves the auth
 *  loop end to end: session → RLS-protected profile read → sign out. */
export default async function DashboardPage() {
  const { supabase, userId, email } = await requireUser()

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", userId)
    .single()

  if (error) {
    // A missing profile means the signup trigger failed — surface it in
    // logs instead of silently greeting the user with a placeholder.
    console.error("profiles row missing for authenticated user:", error.code)
  }

  const name = profile?.display_name || email || "HandyFEM"

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-4 py-12 md:px-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={name} size="md" />
          <div>
            <h1 className="text-xl font-medium">Hola, {name}</h1>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>
        <form action={signOut}>
          <Button type="submit" variant="ghost" size="sm">
            Cerrar sesión
          </Button>
        </form>
      </header>

      <p className="text-base text-muted-foreground">
        Panel en construcción (Spec 05 — toggle de rol clienta/profesional).
      </p>
    </main>
  )
}
