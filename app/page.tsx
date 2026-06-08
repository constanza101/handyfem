import { Button } from "@/components/ui/button"

const semantic = [
  { name: "Primary", bg: "bg-primary", fg: "text-primary-foreground" },
  { name: "Secondary", bg: "bg-secondary", fg: "text-secondary-foreground" },
  { name: "Accent", bg: "bg-accent", fg: "text-accent-foreground" },
  { name: "Muted", bg: "bg-muted", fg: "text-muted-foreground" },
  { name: "Destructive", bg: "bg-destructive", fg: "text-destructive-foreground" },
]

const brand = [
  { name: "Teal", bg: "bg-chart-1" },
  { name: "Violet", bg: "bg-chart-2" },
  { name: "Sage", bg: "bg-chart-3" },
  { name: "Violet light", bg: "bg-chart-4" },
  { name: "Amber", bg: "bg-chart-5" },
]

export default function StyleGuide() {
  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto max-w-3xl space-y-12">
        <header className="space-y-1">
          <h1 className="font-serif text-4xl font-bold text-primary">HandyFEM</h1>
          <p className="text-muted-foreground">
            Design system — theme preview (fonts, colors, radius, shadows)
          </p>
        </header>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-semibold">Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button>Buscar profesional</Button>
            <Button variant="secondary">Soy profesional</Button>
            <Button variant="outline">Ver perfil</Button>
            <Button variant="ghost">Cómo funciona</Button>
            <Button variant="destructive">Eliminar</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Semantic colors */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-semibold">Semantic colors</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {semantic.map((c) => (
              <div
                key={c.name}
                className={`flex h-20 items-end rounded-lg border p-2 ${c.bg} ${c.fg}`}
              >
                <span className="text-xs font-medium">{c.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Brand palette */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-semibold">Brand palette</h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {brand.map((c) => (
              <div key={c.name} className="space-y-1">
                <div className={`h-16 rounded-lg border ${c.bg}`} />
                <div className="text-xs text-muted-foreground">{c.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Card */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-semibold">Card</h2>
          <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                ML
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">María López</span>
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                    Verificada
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Electricista · Barcelona · ★ 4.9
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold">Typography</h2>
          <p className="font-serif text-3xl">Playfair Display — headings</p>
          <p className="font-sans text-base">
            Geist — body text. La red de mujeres profesionales de oficios.
          </p>
          <p className="font-mono text-sm text-muted-foreground">
            Courier Prime — mono · const verified = true
          </p>
        </section>
      </div>
    </main>
  )
}
