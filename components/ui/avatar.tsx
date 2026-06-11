"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn, getInitials } from "@/lib/utils"

const avatarVariants = cva(
  "group/avatar relative inline-flex shrink-0 rounded-full select-none",
  {
    variants: {
      size: {
        xs: "size-6 text-[10px]",
        sm: "size-8 text-xs",
        md: "size-10 text-ui",
        lg: "size-16 text-xl",
        xl: "size-24 text-2xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

/* Initials palette — DS-05. Deterministic: the same name always gets the
   same colour. */
const initialColors = [
  "bg-lavanda text-violet-dark",
  "bg-primary-pale text-primary-deep",
  "bg-amber/25 text-warning-foreground",
  "bg-inactive text-inactive-foreground",
]

const statusColors = {
  online: "bg-primary",
  busy: "bg-amber",
  offline: "bg-inactive",
} as const

const statusLabels = {
  online: "En línea",
  busy: "Ocupada",
  offline: "Desconectada",
} as const

type AvatarProps = VariantProps<typeof avatarVariants> & {
  name: string
  src?: string
  status?: keyof typeof statusColors
  className?: string
}

function Avatar({ name, src, size = "md", status, className }: AvatarProps) {
  // `|| 0` guards the empty-name case (charCodeAt → NaN); trim so leading
  // whitespace can't change the assigned colour
  const colorClass =
    initialColors[(name.trim().charCodeAt(0) || 0) % initialColors.length]

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(avatarVariants({ size }), className)}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={name}
          className="aspect-square size-full rounded-full object-cover"
        />
      )}
      <AvatarPrimitive.Fallback
        aria-label={name}
        className={cn(
          "flex size-full items-center justify-center rounded-full font-medium",
          colorClass
        )}
      >
        {getInitials(name)}
      </AvatarPrimitive.Fallback>
      {status && (
        <span
          className={cn(
            "absolute -right-0.5 -bottom-0.5 rounded-full border-2 border-background",
            statusColors[status],
            size === "sm" || size === "xs" ? "size-2" : "size-2.5"
          )}
        >
          {/* aria-label is prohibited on generic spans — sr-only text instead */}
          <span className="sr-only">{statusLabels[status]}</span>
        </span>
      )}
    </AvatarPrimitive.Root>
  )
}

function AvatarGroup({
  max = 3,
  children,
  className,
}: {
  max?: number
  children: React.ReactNode
  className?: string
}) {
  const items = React.Children.toArray(children)
  const visible = items.slice(0, max)
  const overflow = items.length - visible.length

  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "flex -space-x-2 *:data-[slot=avatar]:border-2 *:data-[slot=avatar]:border-background",
        className
      )}
    >
      {visible}
      {overflow > 0 && (
        <span className="z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-muted text-ui font-medium text-muted-foreground">
          +{overflow}
        </span>
      )}
    </div>
  )
}

export { Avatar, AvatarGroup }
