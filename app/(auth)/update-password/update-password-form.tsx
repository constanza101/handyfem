"use client"

import * as React from "react"

import { updatePassword, type AuthState } from "@/app/(auth)/actions"
import { Field } from "@/components/forms/field"
import { PasswordInput } from "@/components/forms/password-input"
import { Button } from "@/components/ui/button"

export function UpdatePasswordForm() {
  const [state, formAction, pending] = React.useActionState<AuthState, FormData>(
    updatePassword,
    null
  )

  return (
    <div className="flex flex-col gap-5">
      <header>
        <h1 className="text-2xl font-medium">Elige una nueva contraseña</h1>
        <p className="mt-1 text-base text-muted-foreground">
          Mínimo 8 caracteres y 1 número.
        </p>
      </header>

      <form action={formAction} className="flex flex-col gap-4">
        <fieldset disabled={pending} className="flex flex-col gap-4">
          <Field
            label="Nueva contraseña"
            required
            error={state?.fieldErrors?.password}
          >
            <PasswordInput name="password" autoComplete="new-password" autoFocus />
          </Field>
        </fieldset>
        <Button type="submit" className="w-full" loading={pending}>
          {pending ? "Guardando…" : "Guardar contraseña"}
        </Button>
        <div aria-live="polite">
          {state?.formError && (
            <p className="text-sm text-error-foreground">{state.formError}</p>
          )}
        </div>
      </form>
    </div>
  )
}
