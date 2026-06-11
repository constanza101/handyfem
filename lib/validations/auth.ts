// zod/mini: same schemas, ~4KB gz in the client bundle instead of ~65KB —
// these schemas run client-side for onBlur validation (and again on the
// server, authoritatively).
import * as z from "zod/mini"

// UI copy is Spanish (app language); schema/code in English.

/** Single source of truth for the password policy and its user-facing hint. */
export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_HINT = "Mínimo 8 caracteres y 1 número"

const trimmed = z.pipe(
  z.string(),
  z.transform((s) => s.trim())
)

const email = z.pipe(trimmed, z.email("Introduce un email válido"))

const password = z
  .string()
  .check(
    z.minLength(PASSWORD_MIN_LENGTH, "Mínimo 8 caracteres"),
    z.regex(/\d/, "Debe incluir al menos 1 número")
  )

// NFC-normalize before validating: macOS/iCloud autofill and some IMEs
// produce decomposed accents (María as i + combining ´), which are \p{M},
// not \p{L} — without normalization real names fail "letters only".
const personName = z.pipe(
  z.pipe(
    z.string(),
    z.transform((s) => s.trim().normalize("NFC"))
  ),
  z
    .string()
    .check(
      z.minLength(2, "Mínimo 2 caracteres"),
      z.regex(/^[\p{L}\s.'-]+$/u, "Solo letras")
    )
)

export const loginSchema = z.strictObject({
  email,
  // Login never validates password shape — that would leak the policy and
  // annoy users with old passwords. Presence only.
  password: z.string().check(z.minLength(1, "Introduce tu contraseña")),
})

export const signupSchema = z.strictObject({
  firstName: personName,
  lastName: personName,
  email,
  password,
  terms: z.literal("on", "Debes aceptar los términos para continuar"),
  role: z._default(z.enum(["professional", "client"]), "client"),
})

export const resetRequestSchema = z.strictObject({ email })

export const updatePasswordSchema = z.strictObject({ password })

export type FieldErrors = Record<string, string>

type AnyObjectSchema =
  | typeof loginSchema
  | typeof signupSchema
  | typeof resetRequestSchema
  | typeof updatePasswordSchema

/**
 * Parse a server-action FormData against a schema, reading only the
 * schema's own keys. Next.js injects internal $ACTION_* fields into action
 * forms; reading everything + a strict object would reject them all.
 */
export function parseForm<T extends AnyObjectSchema>(
  schema: T,
  formData: FormData
) {
  const raw = Object.fromEntries(
    Object.keys(schema.shape).map((k) => [k, formData.get(k) ?? undefined])
  )
  return schema.safeParse(raw) as ReturnType<T["safeParse"]>
}

/** Flatten zod issues to one message per field (first wins). */
export function toFieldErrors(error: z.core.$ZodError): FieldErrors {
  const out: FieldErrors = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form")
    if (!(key in out)) out[key] = issue.message
  }
  return out
}

/** Client-side onBlur helper: validate a single field against a schema. */
export function validateField(
  schema: AnyObjectSchema,
  name: string,
  value: string
): string | undefined {
  const shape = schema.shape as Record<
    string,
    { safeParse: (v: unknown) => { success: boolean; error?: z.core.$ZodError } }
  >
  const fieldSchema = shape[name]
  if (!fieldSchema) return undefined
  const result = fieldSchema.safeParse(value)
  return result.success ? undefined : result.error?.issues[0]?.message
}
