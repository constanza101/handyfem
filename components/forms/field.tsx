"use client"

import * as React from "react"
import { Field as FieldPrimitive } from "@base-ui/react/field"

import { cn } from "@/lib/utils"

type FieldProps = {
  label: string
  required?: boolean
  error?: string
  /** Character counter, e.g. for textareas with a max length */
  counter?: { current: number; max: number }
  className?: string
  children: React.ReactElement<{ required?: boolean }>
}

/**
 * DS-02 field anatomy on Base UI Field primitives: label and error are wired
 * to the control via Field context (Input, Select, Checkbox consume it
 * natively; Textarea registers through Field.Control). Every input in the
 * app goes through this wrapper — never a standalone input.
 */
function Field({ label, required, error, counter, className, children }: FieldProps) {
  const control = required
    ? React.cloneElement(children, { required: true })
    : children

  return (
    <FieldPrimitive.Root
      invalid={error ? true : undefined}
      className={cn("flex flex-col", className)}
    >
      <FieldPrimitive.Label
        className={cn(
          "mb-1.5 text-ui font-medium",
          error ? "text-error-foreground" : "text-primary-light"
        )}
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-error-foreground">
            {" "}
            *
          </span>
        )}
      </FieldPrimitive.Label>
      {control}
      {(error || counter) && (
        <div className="flex items-baseline">
          {error && (
            <FieldPrimitive.Error
              match={true}
              role="alert"
              className="mt-1 text-sm text-error-foreground"
            >
              {error}
            </FieldPrimitive.Error>
          )}
          {counter && (
            <p
              aria-hidden="true"
              className={cn(
                "mt-1 ml-auto text-sm",
                counter.current > counter.max
                  ? "text-error-foreground"
                  : "text-muted-foreground"
              )}
            >
              {counter.current}/{counter.max}
            </p>
          )}
        </div>
      )}
    </FieldPrimitive.Root>
  )
}

export { Field }
