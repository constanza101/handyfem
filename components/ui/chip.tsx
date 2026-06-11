"use client"

import * as React from "react"
import { IconX } from "@tabler/icons-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1.25 text-xs leading-none font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        specialty: "rounded-lg bg-lavanda/20 px-2 py-0.75 text-violet-dark",
        city: "rounded-lg bg-primary/10 px-2 py-0.75 text-primary-deep",
        // Filter chips are pill-shaped (DS-06) and interactive. The pill stays
        // visually compact; the ::after hit-area (same idiom as Checkbox)
        // extends the touch target to the 44px minimum.
        filter:
          "relative cursor-pointer rounded-full px-3 py-1 transition-colors duration-150 outline-none after:absolute after:inset-x-0 after:-inset-y-3 focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none",
      },
      active: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "filter",
        active: true,
        className: "bg-primary text-primary-foreground",
      },
      {
        variant: "filter",
        active: false,
        className: "bg-muted text-primary-light hover:bg-inactive/60",
      },
    ],
    defaultVariants: {
      active: false,
    },
  }
)

type ChipVariant = NonNullable<VariantProps<typeof chipVariants>["variant"]>

type ChipProps = {
  variant: ChipVariant
  active?: boolean
  onToggle?: () => void
  className?: string
  children: React.ReactNode
}

function Chip({ variant, active = false, onToggle, className, children }: ChipProps) {
  if (variant !== "filter") {
    return (
      <span data-slot="chip" className={cn(chipVariants({ variant }), className)}>
        {children}
      </span>
    )
  }

  return (
    <button
      type="button"
      data-slot="chip"
      role="checkbox"
      aria-checked={active}
      onClick={onToggle}
      className={cn(chipVariants({ variant, active }), className)}
    >
      {children}
      {active && <IconX aria-hidden="true" className="size-3.5 shrink-0" />}
    </button>
  )
}

export { Chip, chipVariants }
