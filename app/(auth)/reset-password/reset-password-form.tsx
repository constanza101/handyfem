"use client"

import * as React from "react"

import { requestPasswordReset, type AuthState } from "@/app/(auth)/actions"
import { AuthHeader, TextLink } from "@/components/forms/auth-chrome"
import { Field } from "@/components/forms/field"
import { useBlurValidation } from "@/components/forms/use-blur-validation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { resetRequestSchema } from "@/lib/validations/auth"

export function ResetPasswordForm() {
  const [state, formAction, pending] = React.useActionState<AuthState, FormData>(
    requestPasswordReset,
    null
  )
  const { onBlur, errorFor } = useBlurValidation(resetRequestSchema, state)

  if (state?.status === "sent") {
    return (
      <div className="flex flex-col gap-3 text-center" aria-live="polite">
        <h1 className="text-2xl font-medium">Enlace enviado</h1>
        <p className="text-base text-muted-foreground">
          Te hemos enviado un enlace. Revisa tu email.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <AuthHeader
        title="Restablece tu contraseña"
        subtitle="Te enviaremos un enlace para crear una nueva."
      />

      <form action={formAction} noValidate className="flex flex-col gap-4">
        <fieldset disabled={pending} className="flex flex-col gap-4">
          <Field label="Email" required error={errorFor("email")}>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              defaultValue={state?.values?.email}
              onBlur={onBlur}
            />
          </Field>
        </fieldset>
        <Button type="submit" className="w-full" loading={pending}>
          {pending ? "Enviando…" : "Enviar enlace"}
        </Button>
      </form>

      <p className="text-center text-base text-muted-foreground">
        <TextLink href="/login">Volver a iniciar sesión</TextLink>
      </p>
    </div>
  )
}
