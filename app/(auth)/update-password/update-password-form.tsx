"use client"

import * as React from "react"

import { updatePassword, type AuthState } from "@/app/(auth)/actions"
import { AuthHeader, FormError } from "@/components/forms/auth-chrome"
import { Field } from "@/components/forms/field"
import { PasswordInput } from "@/components/forms/password-input"
import { useBlurValidation } from "@/components/forms/use-blur-validation"
import { Button } from "@/components/ui/button"
import { updatePasswordSchema, PASSWORD_HINT } from "@/lib/validations/auth"

export function UpdatePasswordForm() {
  const [state, formAction, pending] = React.useActionState<AuthState, FormData>(
    updatePassword,
    null
  )
  const { onBlur, errorFor } = useBlurValidation(updatePasswordSchema, state)

  return (
    <div className="flex flex-col gap-5">
      <AuthHeader
        title="Elige una nueva contraseña"
        subtitle={`${PASSWORD_HINT}.`}
      />

      <form action={formAction} noValidate className="flex flex-col gap-4">
        <fieldset disabled={pending} className="flex flex-col gap-4">
          <Field
            label="Nueva contraseña"
            required
            error={errorFor("password")}
          >
            <PasswordInput
              name="password"
              autoComplete="new-password"
              autoFocus
              onBlur={onBlur}
            />
          </Field>
        </fieldset>
        <Button type="submit" className="w-full" loading={pending}>
          {pending ? "Guardando…" : "Guardar contraseña"}
        </Button>
        <FormError>{state?.formError}</FormError>
      </form>
    </div>
  )
}
