"use client"

import * as React from "react"

import { login, type AuthState } from "@/app/(auth)/actions"
import { AuthDivider } from "@/components/forms/auth-divider"
import { AuthHeader, FormError, TextLink } from "@/components/forms/auth-chrome"
import { Field } from "@/components/forms/field"
import { GoogleButton } from "@/components/forms/google-button"
import { PasswordInput } from "@/components/forms/password-input"
import { useBlurValidation } from "@/components/forms/use-blur-validation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/lib/validations/auth"

export function LoginForm({ linkError = false }: { linkError?: boolean }) {
  const [state, formAction, pending] = React.useActionState<AuthState, FormData>(
    login,
    null
  )
  const { onBlur, errorFor } = useBlurValidation(loginSchema, state)

  return (
    <div className="flex flex-col gap-5">
      <AuthHeader
        title="Bienvenida de nuevo"
        subtitle="Inicia sesión en tu cuenta de HandyFEM"
      />

      {linkError && (
        <p role="alert" className="text-sm text-error-foreground">
          El enlace ha caducado o no es válido. Inicia sesión o solicita uno
          nuevo desde &ldquo;¿Olvidaste tu contraseña?&rdquo;.
        </p>
      )}

      <GoogleButton />
      <AuthDivider />

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
          <Field label="Contraseña" required error={errorFor("password")}>
            <PasswordInput
              name="password"
              autoComplete="current-password"
              onBlur={onBlur}
            />
          </Field>
        </fieldset>

        <TextLink href="/reset-password" className="self-start text-ui">
          ¿Olvidaste tu contraseña?
        </TextLink>

        <Button type="submit" className="w-full" loading={pending}>
          {pending ? "Iniciando sesión…" : "Iniciar sesión"}
        </Button>

        <FormError>{state?.formError}</FormError>
      </form>

      <p className="text-center text-base text-muted-foreground">
        ¿No tienes cuenta? <TextLink href="/signup">Regístrate</TextLink>
      </p>
    </div>
  )
}
