"use client"

import * as React from "react"

import type { AuthState } from "@/app/(auth)/actions"
import { validateField, type FieldErrors } from "@/lib/validations/auth"

type Schema = Parameters<typeof validateField>[0]

/**
 * onBlur field validation merged with server-action fieldErrors.
 * Precedence rules that both auth forms share:
 * - a blur result for a field (even "valid") overrides the server error —
 *   the user has edited since the last submit;
 * - a new server response clears all blur state (the server has the
 *   authoritative view of what was just submitted).
 */
export function useBlurValidation(schema: Schema, state: AuthState) {
  const [blurErrors, setBlurErrors] = React.useState<
    Record<string, string | undefined>
  >({})

  // Reset blur state when a new server response arrives — done during
  // render (React's documented pattern for state derived from props),
  // not in an effect.
  const [prevState, setPrevState] = React.useState(state)
  if (state !== prevState) {
    setPrevState(state)
    setBlurErrors({})
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setBlurErrors((prev) => ({
      ...prev,
      [name]: validateField(schema, name, value),
    }))
  }

  const serverErrors: FieldErrors = state?.fieldErrors ?? {}
  const errorFor = (name: string) =>
    name in blurErrors ? blurErrors[name] : serverErrors[name]

  return { onBlur, errorFor }
}
