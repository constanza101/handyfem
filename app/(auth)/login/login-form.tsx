"use client"

import * as React from "react"
import Link from "next/link"

import { login, type AuthState } from "@/app/(auth)/actions"
import { AuthDivider } from "@/components/forms/auth-divider"
import { Field } from "@/components/forms/field"
import { GoogleButton } from "@/components/forms/google-button"
import { PasswordInput } from "@/components/forms/password-input"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginSchema, validateField } from "@/lib/validations/auth"

export function LoginForm() {
  const [state, formAction, pending] = React.useActionState<AuthState, FormData>(
    login,
    null
  )
  const [blurErrors, setBlurErrors] = React.useState<Record<string, string | undefined>>({})

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setBlurErrors((prev) => ({
      ...prev,
      [name]: validateField(loginSchema, name, value),
    }))
  }

  const errorFor = (name: string) =>
    blurErrors[name] ?? state?.fieldErrors?.[name]

  return (
    <div className="flex flex-col gap-5">
      <header>
        <h1 className="text-2xl font-medium">Bienvenida de nuevo</h1>
        <p className="mt-1 text-base text-muted-foreground">
          Inicia sesión en tu cuenta de HandyFEM
        </p>
      </header>

      <GoogleButton />
      <AuthDivider />

      <form action={formAction} className="flex flex-col gap-4">
        <fieldset disabled={pending} className="flex flex-col gap-4">
          <Field label="Email" required error={errorFor("email")}>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
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

        <Link
          href="/reset-password"
          className="self-start text-ui text-violet-dark underline-offset-4 hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>

        <Button type="submit" className="w-full" loading={pending}>
          {pending ? "Iniciando sesión…" : "Iniciar sesión"}
        </Button>

        <div aria-live="polite">
          {state?.formError && (
            <p className="text-sm text-error-foreground">{state.formError}</p>
          )}
        </div>
      </form>

      <p className="text-center text-base text-muted-foreground">
        ¿No tienes cuenta?{" "}
        <Link
          href="/signup"
          className="text-violet-dark underline-offset-4 hover:underline"
        >
          Regístrate
        </Link>
      </p>
    </div>
  )
}
