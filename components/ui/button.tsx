import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { IconLoader2 } from "@tabler/icons-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex min-w-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent font-medium tracking-btn whitespace-nowrap transition-all duration-150 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 aria-busy:pointer-events-none motion-reduce:transition-none motion-reduce:active:scale-100 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary:
          "border-emphasis border-violet bg-transparent text-violet-dark hover:bg-lavanda/15",
        ghost: "bg-transparent text-primary hover:bg-primary/5",
        destructive:
          "border-emphasis border-destructive bg-transparent text-error-foreground hover:bg-error",
      },
      size: {
        lg: "min-h-12 px-7 text-lg [&_svg:not([class*='size-'])]:size-5",
        md: "min-h-11 px-5 text-base [&_svg:not([class*='size-'])]:size-4.5",
        // sm variants are visually 32px (desktop-only per DS-01) but the
        // ::after hit-area still meets the 44px touch minimum
        sm: "relative min-h-8 px-3.5 text-ui after:absolute after:inset-x-0 after:-inset-y-1.5 [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-12 [&_svg:not([class*='size-'])]:size-5",
        "icon-md": "size-11 [&_svg:not([class*='size-'])]:size-4.5",
        "icon-sm":
          "relative size-8 after:absolute after:-inset-1.5 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & { loading?: boolean }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading && <IconLoader2 aria-hidden="true" className="animate-spin" />}
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
