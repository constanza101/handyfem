import * as React from "react"
import { Field as FieldPrimitive } from "@base-ui/react/field"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  // Field.Control registers with Field context (label htmlFor, aria-invalid,
  // aria-describedby); context is optional, so standalone use works too.
  return (
    <FieldPrimitive.Control
      data-slot="textarea"
      render={
        <textarea
          className={cn(
            "flex field-sizing-content min-h-16 w-full resize-y rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
            className
          )}
          {...props}
        />
      }
    />
  )
}

export { Textarea }
