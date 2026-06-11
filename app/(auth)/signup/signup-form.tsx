"use client"

import * as React from "react"
import Link from "next/link"
import { IconMail } from "@tabler/icons-react"

import { signup, type AuthState } from "@/app/(auth)/actions"
import { AuthDivider } from "@/components/forms/auth-divider"
import { Field } from "@/components/forms/field"
import { GoogleButton } from "@/components/forms/google-button"
import { PasswordInput } from "@/components/forms/password-input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { signupSchema, validateField } from "@/lib/validations/auth"

const RESEND_COOLDOWN_S = 60

export function SignupForm({ isProfessional }: { isProfessional: boolean }) {
  const [state, formAction, pending] = React.useActionState<AuthState, FormData>(
    signup,
    null
  )
  const [blurErrors, setBlurErrors] = React.useState<Record<string, string | undefined>>({})

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setBlurErrors((prev) => ({
      ...prev,
      [name]: validateField(signupSchema, name, value),
    }))
  }

  const errorFor = (name: string) =>
    blurErrors[name] ?? state?.fieldErrors?.[name]

  if (state?.status === "verify" && state.email) {
    return <VerifyEmail email={state.email} />
  }

  return (
    <div className="flex flex-col gap-5">
      <header>
        <h1 className="text-2xl font-medium">Crea tu cuenta</h1>
        <p className="mt-1 text-base text-muted-foreground">
          {isProfessional
            ? "Empieza a ofrecer tus servicios en HandyFEM"
            : "Únete a la red de mujeres profesionales"}
        </p>
      </header>

      {/* Professional signups will route to /onboarding when that slice exists */}
      <GoogleButton />
      <AuthDivider />

      <form action={formAction} className="flex flex-col gap-4">
        <fieldset disabled={pending} className="flex flex-col gap-4">
          <Field label="Nombre" required error={errorFor("firstName")}>
            <Input
              name="firstName"
              autoComplete="given-name"
              autoFocus
              onBlur={onBlur}
            />
          </Field>
          <Field label="Apellidos" required error={errorFor("lastName")}>
            <Input name="lastName" autoComplete="family-name" onBlur={onBlur} />
          </Field>
          <Field label="Email" required error={errorFor("email")}>
            <Input name="email" type="email" autoComplete="email" onBlur={onBlur} />
          </Field>
          <Field label="Contraseña" required error={errorFor("password")}>
            <PasswordInput
              name="password"
              autoComplete="new-password"
              placeholder="Mínimo 8 caracteres y 1 número"
              onBlur={onBlur}
            />
          </Field>

          <div className="flex flex-col gap-1">
            <label className="flex min-h-11 items-center gap-3 text-base">
              <Checkbox name="terms" />
              <span>
                Acepto los términos y condiciones y la política de privacidad
              </span>
            </label>
            {errorFor("terms") && (
              <p role="alert" className="text-sm text-error-foreground">
                {errorFor("terms")}
              </p>
            )}
          </div>
        </fieldset>

        <Button type="submit" className="w-full" loading={pending}>
          {pending ? "Creando cuenta…" : "Crear cuenta"}
        </Button>

        <div aria-live="polite">
          {state?.status === "exists" && (
            <p className="text-sm text-error-foreground">
              Ya existe una cuenta con este email.{" "}
              <Link href="/login" className="text-violet-dark underline">
                ¿Quieres iniciar sesión?
              </Link>
            </p>
          )}
          {state?.formError && (
            <p className="text-sm text-error-foreground">{state.formError}</p>
          )}
        </div>
      </form>

      <p className="text-center text-base text-muted-foreground">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="text-violet-dark underline-offset-4 hover:underline"
        >
          Inicia sesión
        </Link>
      </p>
    </div>
  )
}

function VerifyEmail({ email }: { email: string }) {
  const [cooldown, setCooldown] = React.useState(0)
  const [resent, setResent] = React.useState(false)

  React.useEffect(() => {
    if (cooldown <= 0) return
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [cooldown])

  async function resend() {
    const supabase = createClient()
    await supabase.auth.resend({ type: "signup", email })
    setResent(true)
    setCooldown(RESEND_COOLDOWN_S)
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <IconMail aria-hidden="true" className="size-12 text-primary" />
      <h1 className="text-2xl font-medium">Revisa tu email</h1>
      <p className="text-base text-muted-foreground">
        Hemos enviado un enlace a <strong>{email}</strong>. Haz clic en él para
        verificar tu cuenta.
      </p>
      <Button
        variant="ghost"
        onClick={resend}
        disabled={cooldown > 0}
        aria-live="polite"
      >
        {cooldown > 0 ? `Reenviar email (${cooldown}s)` : "Reenviar email"}
      </Button>
      {resent && cooldown > 0 && (
        <p className="text-sm text-muted-foreground">Email reenviado.</p>
      )}
      {/* Plain <a>: full reload resets the form state */}
      <a
        href="/signup"
        className="text-ui text-violet-dark underline-offset-4 hover:underline"
      >
        Cambiar email
      </a>
    </div>
  )
}
