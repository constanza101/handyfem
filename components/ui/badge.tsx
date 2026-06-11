import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1.25 rounded-full px-2.5 py-0.75 text-xs leading-none font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        verified: "bg-success text-success-foreground",
        pending: "bg-warning text-warning-foreground",
        new: "bg-lavanda-pale text-violet-deep",
        "in-progress": "bg-success text-success-foreground",
        completed: "bg-inactive text-inactive-foreground",
      },
    },
  }
)

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>

function Badge({
  className,
  variant,
  render,
  children,
  ...props
}: useRender.ComponentProps<"span"> & { variant: BadgeVariant }) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
        children: (
          <>
            {variant === "verified" && (
              <span
                aria-hidden="true"
                className="size-1.5 shrink-0 animate-pulse rounded-full bg-primary motion-reduce:animate-none"
              />
            )}
            {children}
          </>
        ),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
