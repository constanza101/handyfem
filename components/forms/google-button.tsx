"use client"

import * as React from "react"
import { IconBrandGoogle } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

function GoogleButton({ next = "/dashboard" }: { next?: string }) {
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  async function signIn() {
    setLoading(true)
    setError(false)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (error) {
      setError(true)
      setLoading(false)
    }
    // On success the browser navigates away — no state to reset
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant="secondary"
        className="w-full"
        loading={loading}
        onClick={signIn}
        aria-label="Continuar con Google"
      >
        <IconBrandGoogle aria-hidden="true" />
        Continuar con Google
      </Button>
      {error && (
        <p role="alert" className="text-sm text-error-foreground">
          No se pudo conectar con Google. Inténtalo de nuevo.
        </p>
      )}
    </div>
  )
}

export { GoogleButton }
