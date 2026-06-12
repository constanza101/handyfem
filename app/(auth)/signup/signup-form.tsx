"use client"

import * as React from "react"
import { IconMail } from "@tabler/icons-react"

import { signup, type AuthState } from "@/app/(auth)/actions"
import { AuthDivider } from "@/components/forms/auth-divider"
import { AuthHeader, TextLink } from "@/components/forms/auth-chrome"
import { Field } from "@/components/forms/field"
import { GoogleButton } from "@/components/forms/google-button"
import { PasswordInput } from "@/components/forms/password-input"
import { useBlurValidation } from "@/components/forms/use-blur-validation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { signupSchema, PASSWORD_HINT } from "@/lib/validations/auth"

const RESEND_COOLDOWN_S = 60

export function SignupForm({ isProfessional }: { isProfessional: boolean }) {
  const [state, formAction, pending] = React.useActionState<AuthState, FormData>(
    signup,
    null
  )
  const { onBlur, errorFor } = useBlurValidation(signupSchema, state)

  if (state?.status === "verify" && state.email) {
    return <VerifyEmail email={state.email} />
  }

  return (
    <div className="flex flex-col gap-5">
      <AuthHeader
        title="Crea tu cuenta"
        subtitle={
          isProfessional
            ? "Empieza a ofrecer tus servicios en HandyFEM"
            : "Únete a la red de mujeres profesionales"
        }
      />

      <GoogleButton />
      <AuthDivider />

      <form action={formAction} noValidate className="flex flex-col gap-4">
        {/* Records professional intent at signup so onboarding (Spec 06)
            can route her correctly later */}
        <input
          type="hidden"
          name="role"
          value={isProfessional ? "professional" : "client"}
        />
        <fieldset disabled={pending} className="flex flex-col gap-4">
          <Field label="Nombre" required error={errorFor("firstName")}>
            <Input
              name="firstName"
              autoComplete="given-name"
              autoFocus
              defaultValue={state?.values?.firstName}
              onBlur={onBlur}
            />
          </Field>
          <Field label="Apellidos" required error={errorFor("lastName")}>
            <Input
              name="lastName"
              autoComplete="family-name"
              defaultValue={state?.values?.lastName}
              onBlur={onBlur}
            />
          </Field>
          <Field label="Email" required error={errorFor("email")}>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={state?.values?.email}
              onBlur={onBlur}
            />
          </Field>
          <Field label="Contraseña" required error={errorFor("password")}>
            <PasswordInput
              name="password"
              autoComplete="new-password"
              aria-describedby="password-hint"
              onBlur={onBlur}
            />
          </Field>
          {/* Persistent hint (not a placeholder — those vanish on typing) */}
          <p id="password-hint" className="-mt-3 text-sm text-muted-foreground">
            {PASSWORD_HINT}
          </p>

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
              <TextLink href="/login">¿Quieres iniciar sesión?</TextLink>
            </p>
          )}
          {state?.formError && (
            <p className="text-sm text-error-foreground">{state.formError}</p>
          )}
        </div>
      </form>

      <p className="text-center text-base text-muted-foreground">
        ¿Ya tienes cuenta? <TextLink href="/login">Inicia sesión</TextLink>
      </p>
    </div>
  )
}

function VerifyEmail({ email }: { email: string }) {
  // Starts at the full cooldown: Supabase enforces its own server-side
  // send limit, so an immediate resend would fail anyway
  const [cooldown, setCooldown] = React.useState(RESEND_COOLDOWN_S)
  const [message, setMessage] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (cooldown <= 0) return
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [cooldown])

  async function resend() {
    const supabase = createClient()
    const { error } = await supabase.auth.resend({ type: "signup", email })
    if (error) {
      setMessage("No se pudo reenviar. Espera un momento e inténtalo de nuevo.")
      return
    }
    setMessage("Email reenviado.")
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
      <Button variant="ghost" onClick={resend} disabled={cooldown > 0}>
        {cooldown > 0 ? `Reenviar email (${cooldown}s)` : "Reenviar email"}
      </Button>
      <div aria-live="polite">
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
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
