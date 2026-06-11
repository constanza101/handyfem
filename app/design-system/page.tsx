"use client"

import * as React from "react"
import { IconSearch } from "@tabler/icons-react"

import { Avatar, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Chip } from "@/components/ui/chip"
import { Field } from "@/components/forms/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ProfessionalCard } from "@/components/professionals/professional-card"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="border-b border-border pb-2 text-xl font-medium">{title}</h2>
      {children}
    </section>
  )
}

export default function DesignSystemPage() {
  const [filters, setFilters] = React.useState<Record<string, boolean>>({
    Electricidad: true,
    Fontanería: false,
    Carpintería: false,
  })
  const [bio, setBio] = React.useState("")

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-4 py-12 md:px-6">
      <header>
        <h1 className="text-3xl font-medium">HandyFEM — Design System</h1>
        <p className="mt-2 text-base text-muted-foreground">
          DS-01 … DS-07 — internal verification page
        </p>
      </header>

      <Section title="DS-01 — Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Buscar profesional</Button>
          <Button variant="secondary">Iniciar sesión</Button>
          <Button variant="ghost">Ver más</Button>
          <Button variant="destructive">Eliminar cuenta</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg">Large 48px</Button>
          <Button size="md">Medium 44px</Button>
          <Button size="sm">Small 32px</Button>
          <Button size="icon-md" aria-label="Buscar">
            <IconSearch />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Disabled</Button>
          <Button loading>Cargando…</Button>
          <Button variant="secondary">
            <IconSearch />
            Con icono
          </Button>
        </div>
      </Section>

      <Section title="DS-02 — Forms">
        <div className="flex max-w-md flex-col gap-4">
          <Field label="Nombre" required>
            <Input placeholder="María López" />
          </Field>
          <Field label="Email" required error="Introduce un email válido">
            <Input type="email" defaultValue="maria@" />
          </Field>
          <Field label="Ciudad (deshabilitado)">
            <Input disabled placeholder="Barcelona" />
          </Field>
          <Field
            label="Descripción profesional"
            counter={{ current: bio.length, max: 500 }}
          >
            <Textarea
              placeholder="Cuéntanos sobre tu experiencia…"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </Field>
          <Field label="Especialidad" required>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tu especialidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electricidad">Electricidad</SelectItem>
                <SelectItem value="fontaneria">Fontanería</SelectItem>
                <SelectItem value="carpinteria">Carpintería</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <label className="flex min-h-11 items-center gap-3 text-base">
            <Checkbox />
            Acepto los términos y condiciones
          </label>
        </div>
      </Section>

      <Section title="DS-04 — Badges & Chips">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="verified">Verificada</Badge>
          <Badge variant="pending">Pendiente</Badge>
          <Badge variant="new">Nuevo</Badge>
          <Badge variant="in-progress">En curso</Badge>
          <Badge variant="completed">Completado</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Chip variant="specialty">Electricidad</Chip>
          <Chip variant="city">Barcelona</Chip>
          {Object.entries(filters).map(([name, active]) => (
            <Chip
              key={name}
              variant="filter"
              active={active}
              onToggle={() =>
                setFilters((f) => ({ ...f, [name]: !f[name] }))
              }
            >
              {name}
            </Chip>
          ))}
        </div>
      </Section>

      <Section title="DS-05 — Avatar">
        <div className="flex flex-wrap items-end gap-4">
          <Avatar name="María López" size="xs" />
          <Avatar name="Carmen Ruiz" size="sm" />
          <Avatar name="Lucía Fernández" size="md" status="online" />
          <Avatar name="Ana Torres" size="lg" status="busy" />
          <Avatar name="Sofía García" size="xl" status="offline" />
        </div>
        <AvatarGroup>
          <Avatar name="María López" />
          <Avatar name="Carmen Ruiz" />
          <Avatar name="Lucía Fernández" />
          <Avatar name="Ana Torres" />
          <Avatar name="Sofía García" />
        </AvatarGroup>
      </Section>

      <Section title="DS-03 — Professional cards">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ProfessionalCard
            name="María López"
            specialty="Electricista"
            city="Barcelona"
            rating={{ average: 4.8, count: 23 }}
            isVerified
            href="#"
          />
          <ProfessionalCard
            name="Carmen Ruiz"
            specialty="Fontanera"
            city="Hospitalet de Llobregat"
          />
        </div>
      </Section>
    </main>
  )
}
