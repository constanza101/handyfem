import Link from "next/link"

import { cn } from "@/lib/utils"

/** Shared chrome for the auth forms — extracted so the four screens can't drift. */

function AuthHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header>
      <h1 className="text-2xl font-medium">{title}</h1>
      <p className="mt-1 text-base text-muted-foreground">{subtitle}</p>
    </header>
  )
}

function FormError({ children }: { children?: React.ReactNode }) {
  return (
    <div aria-live="polite">
      {children && <p className="text-sm text-error-foreground">{children}</p>}
    </div>
  )
}

function TextLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-violet-dark underline-offset-4 hover:underline",
        className
      )}
    >
      {children}
    </Link>
  )
}

export { AuthHeader, FormError, TextLink }
