import Link from "next/link"

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-4 py-8">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-6 block text-center font-serif text-2xl font-medium text-foreground"
        >
          Handy<span className="text-violet">FEM</span>
        </Link>
        <div className="border-hairline rounded-xl border-border bg-background p-6 md:p-8">
          {children}
        </div>
      </div>
    </main>
  )
}
