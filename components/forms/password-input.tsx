"use client"

import * as React from "react"
import { IconEye, IconEyeOff } from "@tabler/icons-react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

function PasswordInput({
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "type">) {
  const [visible, setVisible] = React.useState(false)

  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        className={cn("pr-11", className)}
        {...props}
      />
      <button
        type="button"
        aria-pressed={visible}
        aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        onClick={() => setVisible((v) => !v)}
        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground outline-none hover:text-foreground focus-visible:text-foreground"
      >
        {visible ? (
          <IconEyeOff aria-hidden="true" className="size-4.5" />
        ) : (
          <IconEye aria-hidden="true" className="size-4.5" />
        )}
      </button>
    </div>
  )
}

export { PasswordInput }
