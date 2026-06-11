import { z } from "zod"

// UI copy is Spanish (app language); schema/code in English.

const email = z
  .string()
  .trim()
  .email("Introduce un email válido")

const password = z
  .string()
  .min(8, "Mínimo 8 caracteres")
  .regex(/\d/, "Debe incluir al menos 1 número")

const personName = z
  .string()
  .trim()
  .min(2, "Mínimo 2 caracteres")
  .regex(/^[\p{L}\s'-]+$/u, "Solo letras")

export const loginSchema = z
  .object({
    email,
    // Login never validates password shape — that would leak the policy and
    // annoy users with old passwords. Presence only.
    password: z.string().min(1, "Introduce tu contraseña"),
  })
  .strict()

export const signupSchema = z
  .object({
    firstName: personName,
    lastName: personName,
    email,
    password,
    terms: z.literal("on", {
      message: "Debes aceptar los términos para continuar",
    }),
  })
  .strict()

export const resetRequestSchema = z.object({ email }).strict()

export const updatePasswordSchema = z.object({ password }).strict()

export type FieldErrors = Record<string, string>

/** Flatten zod issues to one message per field (first wins). */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form")
    if (!(key in out)) out[key] = issue.message
  }
  return out
}

/** Client-side onBlur helper: validate a single field against a schema. */
export function validateField(
  schema: z.ZodObject<z.ZodRawShape>,
  name: string,
  value: string
): string | undefined {
  const fieldSchema = schema.shape[name]
  if (!fieldSchema) return undefined
  const result = (fieldSchema as z.ZodType).safeParse(value)
  return result.success ? undefined : result.error.issues[0]?.message
}
