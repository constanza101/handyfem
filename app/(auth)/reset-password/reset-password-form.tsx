"use client"

import * as React from "react"
import Link from "next/link"

import { requestPasswordReset, type AuthState } from "@/app/(auth)/actions"
import { Field } from "@/components/forms/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ResetPasswordForm() {
  const [state, formAction, pending] = React.useActionState<AuthState, FormData>(
    requestPasswordReset,
    null
  )

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
      <header>
        <h1 className="text-2xl font-medium">Restablece tu contraseña</h1>
        <p className="mt-1 text-base text-muted-foreground">
          Te enviaremos un enlace para crear una nueva.
        </p>
      </header>

      <form action={formAction} className="flex flex-col gap-4">
        <fieldset disabled={pending} className="flex flex-col gap-4">
          <Field label="Email" required error={state?.fieldErrors?.email}>
            <Input name="email" type="email" autoComplete="email" autoFocus />
          </Field>
        </fieldset>
        <Button type="submit" className="w-full" loading={pending}>
          {pending ? "Enviando…" : "Enviar enlace"}
        </Button>
      </form>

      <p className="text-center text-base text-muted-foreground">
        <Link
          href="/login"
          className="text-violet-dark underline-offset-4 hover:underline"
        >
          Volver a iniciar sesión
        </Link>
      </p>
    </div>
  )
}
