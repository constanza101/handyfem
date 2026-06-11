import Image from "next/image"
import Link from "next/link"
import { IconMapPin, IconStarFilled, IconTool } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { cn, getInitials } from "@/lib/utils"

type ProfessionalCardProps = {
  name: string
  specialty: string
  city: string
  /** Average and count travel together — a half-provided rating is unrepresentable */
  rating?: { average: number; count: number }
  isVerified?: boolean
  avatarUrl?: string
  /** Profile URL. Without it the card renders as a non-interactive article. */
  href?: string
  className?: string
}

/**
 * DS-03 — the directory's most important element: it must build trust in
 * 3 seconds. Responsive in one component: horizontal (photo left) on
 * mobile, vertical (photo top) inside the desktop grid.
 */
function ProfessionalCard({
  name,
  specialty,
  city,
  rating,
  isVerified = false,
  avatarUrl,
  href,
  className,
}: ProfessionalCardProps) {
  const content = (
    <>
      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg md:h-45 md:w-full">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`${name}, ${specialty}`}
            fill
            sizes="(max-width: 768px) 80px, 430px"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-muted">
            <span
              aria-hidden="true"
              className="flex size-14 items-center justify-center rounded-full bg-lavanda text-lg font-medium text-violet-dark"
            >
              {getInitials(name)}
            </span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-sans text-md font-medium text-foreground">
            {name}
          </h3>
          {isVerified && <Badge variant="verified">Verificada</Badge>}
        </div>

        <p className="flex items-center gap-1 text-ui text-primary-light">
          <IconTool aria-hidden="true" className="size-3.5 shrink-0" />
          <span className="truncate">{specialty}</span>
        </p>

        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <IconMapPin aria-hidden="true" className="size-3.5 shrink-0" />
          <span className="truncate">{city}</span>
        </p>

        {rating ? (
          <p className="flex items-center gap-1 text-ui">
            <IconStarFilled
              aria-hidden="true"
              className="size-4 shrink-0 text-amber"
            />
            <span className="sr-only">Valoración:</span>
            <span className="font-medium text-foreground">
              {rating.average.toFixed(1)}
            </span>
            <span className="text-muted-foreground">({rating.count})</span>
          </p>
        ) : (
          <p className="text-ui text-muted-foreground">
            Sin valoraciones todavía
          </p>
        )}
      </div>
    </>
  )

  const baseClasses = cn(
    "border-hairline flex flex-row gap-3 rounded-xl border-border bg-card p-3 md:flex-col md:gap-4 md:p-4",
    className
  )

  if (!href) {
    return <article className={baseClasses}>{content}</article>
  }

  return (
    <Link
      href={href}
      aria-label={`Ver perfil de ${name}, ${specialty}`}
      className={cn(
        baseClasses,
        "outline-none transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      )}
    >
      {content}
    </Link>
  )
}

export { ProfessionalCard }
