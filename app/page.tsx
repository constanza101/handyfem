import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-3xl font-medium text-primary">HandyFEM</h1>
      <p className="max-w-sm text-center text-base text-muted-foreground">
        La red de mujeres profesionales de oficios. Landing en construcción
        (Spec 01).
      </p>
      <Button
        variant="secondary"
        nativeButton={false}
        render={<Link href="/design-system" />}
      >
        Ver design system
      </Button>
    </main>
  )
}
