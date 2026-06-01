# HandyFEM — Product Specs MVP

## Información general

- **Proyecto:** HandyFEM
- **Tipo:** PWA mobile-first
- **Stack:** Next.js + Supabase + Tailwind CSS + shadcn/ui
- **Deploy:** Vercel
- **Idioma:** Español
- **Estado:** MVP v1

---

## Identidad visual

| Token | Valor |
|-------|-------|
| Primary (teal) | `#4A7C7D` |
| Primary light | `#699794` |
| Accent (violet) | `#776AAA` |
| Accent dark | `#60569C` |
| Accent light | `#8D7BB8` |
| Lavanda | `#D0C2E5` |
| Amber | `#FCC970` |
| Cream | `#F4EBD7` |
| Cream dark | `#F1EDE4` |
| Background | `#F8F5F0` |

---

## Roles de usuaria

- **Rol base:** clienta (se asigna al registrarse)
- **Rol profesional:** se activa desde el dashboard (Opción C)
- **Una sola cuenta** puede tener ambos roles
- **Admin Panel:** fuera del MVP (v2)

---

## Pantallas del MVP

1. Landing page
2. Sign up / Log in
3. Directorio + filtros
4. Perfil profesional público
5. Dashboard con role toggle
6. Onboarding profesional
7. Chat básico

---

## Spec 01 — Landing page

### Objetivo
Convertir visitantes en usuarias registradas. El CTA principal es el registro.

### Usuaria objetivo primaria
Clienta que busca una profesional de confianza.

### Usuaria objetivo secundaria
Profesional que quiere visibilidad y trabajo.

---

### Secciones

#### 1. Navbar

| Elemento | Detalle |
|----------|---------|
| Logo | Icono tejado + "Handy" (teal) + "FEM" (violet) |
| Links | Ocultos en mobile, visible en desktop: "Cómo funciona", "Directorio" |
| CTA izquierda | "Entrar" — botón secundario → `/login` |
| CTA derecha | "Registrarse" — botón primario → `/signup` |
| Comportamiento | Sticky en scroll. Fondo cream con sombra sutil al hacer scroll. |

---

#### 2. Hero

| Elemento | Detalle |
|----------|---------|
| Titular | "La red de mujeres profesionales de oficios." |
| Subtítulo | "Encuentra electricistas, fontaneras, carpinteras y más. Verificadas, con portfolio real y valoraciones de otras clientas." |
| CTA primario | "Buscar profesional" → `/directorio` |
| CTA secundario | "Soy profesional" → `/signup?rol=profesional` |
| Imagen | Foto hero de mujer profesional en oficios (mobile: vertical, desktop: horizontal) |
| Fondo | Cream `#F4EBD7` |

**Estados:**
- Mobile: titular grande, subtítulo, CTAs apilados verticalmente, imagen debajo
- Desktop: texto a la izquierda, imagen a la derecha

---

#### 3. Cómo funciona

| Elemento | Detalle |
|----------|---------|
| Título sección | "¿Cómo funciona?" |
| Subtítulo | Dos tabs o toggle: "Soy clienta" / "Soy profesional" |
| Tab clienta | 3 pasos: 1. Busca por especialidad y ciudad → 2. Revisa perfiles y valoraciones → 3. Contacta directamente |
| Tab profesional | 3 pasos: 1. Crea tu perfil con portfolio → 2. Espera la verificación → 3. Recibe contactos de clientas |
| Iconos | Tabler icons, color teal |
| Fondo | Blanco `#fff` |

---

#### 4. Features

| Elemento | Detalle |
|----------|---------|
| Título sección | "¿Por qué HandyFEM?" |
| Features | 4 cards en grid 2x2: |
| Feature 1 | Icono escudo — "Perfiles verificados" — "Todas las profesionales pasan por un proceso de verificación." |
| Feature 2 | Icono estrella — "Valoraciones reales" — "Reseñas de clientas que han contratado el servicio." |
| Feature 3 | Icono personas — "Solo mujeres profesionales" — "Una red pensada desde y para mujeres." |
| Feature 4 | Icono mensaje — "Contacto directo" — "Sin intermediarios. Habla directamente con la profesional." |
| Fondo | Background `#F8F5F0` |

---

#### 5. Testimonios

| Elemento | Detalle |
|----------|---------|
| Título sección | "Lo que dicen de HandyFEM" |
| Número | 3 testimonios |
| Contenido | Nombre, avatar con iniciales, especialidad o ciudad, texto de testimonio, valoración en estrellas |
| Datos | Ficticios para el MVP |
| Fondo | Cream `#F4EBD7` |

---

#### 6. CTA final

| Elemento | Detalle |
|----------|---------|
| Titular | "Únete a HandyFEM" |
| Subtítulo | "Tanto si buscas una profesional como si quieres ofrecer tus servicios." |
| CTA primario | "Crear cuenta gratis" → `/signup` |
| Fondo | Teal `#4A7C7D`, texto cream |

---

#### 7. Footer

| Elemento | Detalle |
|----------|---------|
| Logo | Versión pequeña |
| Links | Cómo funciona · Directorio · Sobre nosotras · Contacto |
| Legal | Política de privacidad · Términos de uso |
| Copyright | © 2026 HandyFEM |
| Fondo | `#2C2C2A`, texto `#D3D1C7` |

---

### Estados globales de la página

| Estado | Comportamiento |
|--------|---------------|
| Usuaria no logueada | Navbar muestra "Entrar" + "Registrarse" |
| Usuaria logueada | Navbar muestra avatar + "Mi dashboard" en vez de los CTAs de auth |
| Carga inicial | Skeleton loader en hero image |

---

### Notas técnicas

- Página renderizada en servidor (SSR) para SEO
- Meta tags: título, descripción, og:image para redes sociales
- La imagen del hero se sirve con `next/image` para optimización automática
- Los tabs de "Cómo funciona" son client components
- Totalmente responsive: mobile (390px) → tablet (768px) → desktop (1280px)

---

*Documento en construcción — se añadirán specs de las pantallas restantes.*

---

## Spec 01b — Detalles de interacción y motion

### Filosofía
Máximo 4 efectos, todos sutiles. La interacción refuerza la experiencia, no compite con el contenido.

---

### Navbar pill flotante

Basado en el sistema de Borrissol.com, adaptado a HandyFEM.

#### Estructura visual
- Forma: pill flotante centrada (`border-radius: 9999px`)
- Posición: `position: fixed`, `top: 16px`, centrada horizontalmente
- Fondo: `backdrop-filter: blur(12px)` + fondo cream semitransparente
- Borde: `0.5px solid` lavanda `#D0C2E5`
- Sombra en scroll: `--shadow-nav-scroll`

#### Breakpoints
| Ancho | Layout |
|-------|--------|
| ≥ 768px | Desktop: logo + links + CTAs visibles |
| ≤ 767px | Mobile: logo + hamburguesa, panel desplegable |

Sin modo tablet separado — decisión intencional para simplificar mantenimiento.

#### Scroll shrink
- 0–80px scrolleados: tamaño 100%, sin sombra
- 80–420px: achica progresivamente hasta 88%, sombra suave
- +420px: fijo al 88% con sombra
- Implementación: `animation-timeline: scroll()` (degradación elegante en Firefox — queda estático al 100%, funcional)

#### Tokens HandyFEM
| Token | Valor |
|-------|-------|
| `--color-primary` | `#4A7C7D` |
| `--color-accent` | `#776AAA` |
| `--color-bg-primary` | `#ffffff` |
| `--color-lavanda` | `#D0C2E5` |
| `--color-muted` | `#699794` |
| `--color-dark` | `#2C2C2A` |
| `--radius-pill` | `9999px` |
| `--radius-lg` | `16px` |
| `--border-default` | `0.5px solid #D0C2E5` |
| `--t-fast` | `150ms ease` |
| `--t-normal` | `300ms ease` |
| `--shadow-nav-scroll` | `0 4px 24px rgba(74,124,125,0.12)` |
| `--min-touch-target` | `44px` |
| `--font-size-ui` | `0.8rem` |
| `--font-size-p2` | `1.1rem` |
| `--font-weight-btn` | `500` |
| `--letter-spacing-btn` | `0.05em` |

#### Contenido desktop
- Izquierda: logo (icono tejado + "Handy" teal + "FEM" violet)
- Centro: links — Directorio · Cómo funciona · Nosotras
- Derecha: "Entrar" (botón secundario) + "Registrarse" (botón primario pill)

#### Contenido mobile
- Izquierda: logo
- Derecha: hamburguesa (`min-height: 44px`)
- Panel desplegable: links apilados + CTAs

#### Comportamiento logueada
- Avatar circular con iniciales + nombre + "Mi dashboard"
- Sin "Entrar" ni "Registrarse"

#### Accesibilidad
- `min-height: 44px` en todos los elementos interactivos
- `aria-label`, `aria-expanded`, `aria-controls`, `aria-haspopup` en hamburguesa
- `role="dialog"` en menú mobile
- Cierre con tecla Escape
- `flex-shrink: 0` en logo, CTAs, hamburguesa
- `white-space: nowrap` en links
- Logo con `aria-label`

#### Soporte y degradación
| Feature | Soporte | Sin soporte |
|---------|---------|-------------|
| `animation-timeline: scroll()` | Chrome/Edge 115+, Safari 26+ | Sin shrink, funcional |
| `backdrop-filter` | Todos los modernos | Fondo sólido cream, aceptable |
| `color-mix()` | Todos los modernos 2023+ | Color sólido sin transparencia |
| `:has()` | Todos los modernos 2023+ | Sin overlay al abrir menú |

---

### Efecto 2 — Hero fade + slide up

- Titular, subtítulo y CTAs entran con `opacity: 0 → 1` + `translateY(16px → 0)`
- Stagger: titular primero, subtítulo 100ms después, CTAs 200ms después
- Duración: 500ms, `ease-out`
- Solo se ejecuta una vez al cargar la página
- Implementación: CSS `@keyframes` + clase que se aplica al montar el componente

---

### Efecto 3 — Hover en cards del directorio

- `transform: translateY(-2px)` al hacer hover
- Sombra suave: `0 8px 24px rgba(74,124,125,0.10)`
- Transición: `--t-normal` (300ms ease)
- En mobile: sin hover (se activa solo en dispositivos con puntero)
- Implementación: `@media (hover: hover)` para no aplicar en touch

Badge "Verificada":
- Punto verde `#4A7C7D` con animación `pulse` en loop
- `box-shadow` pulsante cada 2s

---

### Efecto 4 — Scroll-triggered fade en secciones

- Secciones: "Cómo funciona", "Features", "Testimonios", CTA final
- Cada sección entra con `opacity: 0 → 1` + `translateY(24px → 0)` al entrar en viewport
- Threshold: 20% visible para disparar la animación
- Duración: 600ms, `ease-out`
- Implementación: `IntersectionObserver` en un hook reutilizable `useScrollReveal`
- Degradación: si JS no carga, las secciones son visibles por defecto (`opacity: 1` como fallback en CSS)

---

### Lo que NO tiene HandyFEM (decisión intencional)

- Sin parallax
- Sin cursores personalizados
- Sin loaders de página pesados
- Sin animaciones de más de 600ms
- Sin efectos que interfieran con `prefers-reduced-motion`

Nota: todos los efectos deben respetar `@media (prefers-reduced-motion: reduce)` — si la usuaria lo tiene activado, las animaciones se desactivan completamente.

---

*Documento en construcción — siguiente: Spec 02 Sign up / Log in*

---

## Spec DS-01 — Botones

### Filosofía
Un solo botón primario visible por pantalla. Los demás son secundarios, ghost o destructivos según el contexto. Nunca dos botones primarios juntos.

---

### Variantes

#### Primario
- Fondo: `#4A7C7D` (teal)
- Texto: `#F4EBD7` (cream)
- Hover: `#3A6B6C` (teal oscurecido 10%)
- Active: `scale(0.98)` + teal más oscuro
- Disabled: `opacity: 0.4`, `cursor: not-allowed`
- Uso: acción principal de la pantalla — "Buscar profesional", "Registrarse", "Contactar", "Guardar cambios"

#### Secundario
- Fondo: transparente
- Borde: `1.5px solid #776AAA` (violet)
- Texto: `#60569C` (violet oscuro)
- Hover: fondo `#D0C2E520` (lavanda muy suave)
- Active: `scale(0.98)`
- Disabled: `opacity: 0.4`, `cursor: not-allowed`
- Uso: acción alternativa — "Entrar", "Ver perfil", "Cancelar"

#### Ghost
- Fondo: transparente
- Borde: ninguno
- Texto: `#4A7C7D` (teal)
- Hover: fondo `#4A7C7D10`
- Active: `scale(0.98)`
- Disabled: `opacity: 0.4`, `cursor: not-allowed`
- Uso: acciones terciarias, contextos con fondo de color — "Ver más", "Volver"

#### Destructivo
- Fondo: transparente
- Borde: `1.5px solid #E24B4A`
- Texto: `#A32D2D`
- Hover: fondo `#FCEBEB`
- Active: `scale(0.98)`
- Disabled: `opacity: 0.4`, `cursor: not-allowed`
- Uso: acciones irreversibles — "Eliminar cuenta", "Desactivar perfil"
- Nota: siempre va acompañado de un dialog de confirmación antes de ejecutar la acción

---

### Tamaños

| Tamaño | Height | Padding horizontal | Font size | Uso |
|--------|--------|--------------------|-----------|-----|
| Large | 48px | 28px | 1rem | CTAs hero, secciones principales |
| Medium | 40px | 20px | 0.9rem | Cards, formularios, dashboard |
| Small | 32px | 14px | 0.8rem | Filtros, chips, acciones inline |

---

### Propiedades comunes a todas las variantes

| Propiedad | Valor |
|-----------|-------|
| `border-radius` | `8px` (rounded) |
| `font-weight` | `500` |
| `letter-spacing` | `0.02em` |
| `white-space` | `nowrap` |
| `transition` | `all 150ms ease` |
| `min-height` | `44px` (Large y Medium) · `32px` (Small, solo desktop) |
| `min-width` | `44px` |
| `display` | `inline-flex` |
| `align-items` | `center` |
| `gap` | `8px` (para iconos) |

---

### Estados

| Estado | Comportamiento |
|--------|---------------|
| Default | Estilo base descrito arriba |
| Hover | Color más oscuro / fondo suave. Solo `@media (hover: hover)` |
| Active | `scale(0.98)` — feedback táctil inmediato |
| Focus | `box-shadow: 0 0 0 3px #D0C2E5` — ring de lavanda para accesibilidad teclado |
| Disabled | `opacity: 0.4`, `cursor: not-allowed`, no interactivo |
| Loading | Spinner inline izquierda + texto cambia a "Cargando..." + disabled |

---

### Con icono

- Icono siempre a la izquierda del texto
- Tamaño icono: 16px (Small) · 18px (Medium) · 20px (Large)
- Librería: Tabler Icons (outline)
- Gap entre icono y texto: `8px`
- Botón solo icono: width = height (cuadrado), `aria-label` obligatorio

---

### Ancho

| Contexto | Ancho |
|----------|-------|
| Inline (navbar, cards) | `fit-content` |
| Formularios mobile | `width: 100%` |
| CTAs hero mobile | `width: 100%` |
| CTAs hero desktop | `fit-content` |

---

### Accesibilidad

- `min-height: 44px` en Large y Medium — estándar Apple/Material para touch
- Focus ring visible: `box-shadow: 0 0 0 3px #D0C2E5`
- Contraste mínimo AA: verificado en primario (cream sobre teal) y destructivo
- `aria-disabled="true"` en estado disabled (no `disabled` nativo si necesita tooltip)
- `aria-busy="true"` en estado loading
- Botones con solo icono: `aria-label` descriptivo obligatorio

---

### Implementación con shadcn/ui

Base: componente `Button` de shadcn/ui con variantes personalizadas en `buttonVariants` (cva).

```
components/
  ui/
    button.tsx   ← shadcn base + variantes HandyFEM
```

Variantes cva:
- `variant`: primary · secondary · ghost · destructive
- `size`: lg · md · sm

---

### Notas de uso

- Nunca dos botones primarios juntos en la misma vista
- El botón destructivo siempre va precedido de un `AlertDialog` de confirmación
- En mobile, los CTAs principales ocupan ancho completo
- El estado loading bloquea el doble submit — crítico en formularios de registro y contacto
- `prefers-reduced-motion`: elimina `scale(0.98)` y transiciones, mantiene cambios de color

---

*Siguiente componente: DS-02 Inputs / Formularios*

---

## Spec DS-02 — Inputs / Formularios

### Filosofía
Label siempre visible arriba del input. Placeholder como hint secundario, nunca como sustituto del label. Feedback de error inmediato al perder el foco (onBlur), no al submit.

---

### Anatomía de un campo

```
Label                    ← siempre visible, 13px, color muted
┌─────────────────────┐
│ Placeholder / valor │  ← input, 40px height
└─────────────────────┘
Mensaje de error         ← solo visible en estado error, 12px, rojo
```

---

### Tipos

#### Text
- Uso: nombre, apellido, ciudad, especialidad libre
- Height: 40px
- Border-radius: 8px
- Padding: 0 14px

#### Email
- Uso: registro, login
- `type="email"` — validación nativa del navegador + validación custom
- Icono envelope a la derecha (decorativo, `aria-hidden`)

#### Password
- Uso: registro, login
- Toggle show/hide con icono ojo — `aria-label="Mostrar contraseña"` / `aria-label="Ocultar contraseña"`
- Nunca mostrar la contraseña en texto plano por más de 3 segundos sin interacción

#### Textarea
- Uso: descripción de perfil profesional, mensaje de onboarding
- Height mínima: 120px
- Resize: vertical únicamente (`resize: vertical`)
- Contador de caracteres en la esquina inferior derecha cuando hay límite

#### Select
- Uso: especialidad, provincia
- Icono chevron-down a la derecha
- En mobile: abre el selector nativo del sistema operativo
- En desktop: dropdown custom con shadcn/ui Select

#### Checkbox
- Uso: aceptar términos y condiciones
- Tamaño: 20x20px
- Check color: teal `#4A7C7D`
- Label clickable (label envuelve el input)
- `min-height: 44px` para el área táctil completa

#### File upload
- Uso: foto de perfil, fotos de portfolio
- Aspecto: zona de drag & drop + botón "Subir foto"
- Formatos aceptados: JPG, PNG, WebP
- Tamaño máximo: 5MB por archivo
- Preview inmediata de la imagen seleccionada
- En mobile: abre la cámara o galería del sistema

---

### Estados

| Estado | Border | Label color | Fondo |
|--------|--------|-------------|-------|
| Default | `1.5px solid #D0C2E5` | `#699794` | `#fff` |
| Focus | `1.5px solid #776AAA` | `#60569C` | `#fff` |
| Filled | `1.5px solid #D0C2E5` | `#699794` | `#fff` |
| Error | `1.5px solid #E24B4A` | `#A32D2D` | `#FCEBEB` |
| Disabled | `1.5px solid #D0C2E5` | `#B4B2A9` | `#F8F5F0` · `cursor: not-allowed` |
| Success | `1.5px solid #4A7C7D` | `#4A7C7D` | `#fff` · icono check derecha |

---

### Propiedades comunes

| Propiedad | Valor |
|-----------|-------|
| `border-radius` | `8px` |
| `font-size` | `0.9rem` |
| `font-weight` | `400` |
| `color` (valor) | `#2C2C2A` |
| `color` (placeholder) | `#B4B2A9` |
| `transition` | `border-color 150ms ease, background 150ms ease` |
| `width` | `100%` siempre |
| `min-height` | `44px` (text, email, password, select) |
| Label `font-size` | `13px` |
| Label `font-weight` | `500` |
| Label `margin-bottom` | `6px` |
| Error `font-size` | `12px` |
| Error `color` | `#A32D2D` |
| Error `margin-top` | `4px` |

---

### Focus ring

```css
box-shadow: 0 0 0 3px #D0C2E550;
```
Lavanda semitransparente — consistente con el focus ring de los botones.

---

### Validación

| Campo | Regla |
|-------|-------|
| Email | Formato válido · obligatorio |
| Password | Mínimo 8 caracteres · al menos 1 número |
| Nombre | Mínimo 2 caracteres · solo letras |
| Descripción profesional | Mínimo 50 caracteres · máximo 500 |
| Foto | JPG/PNG/WebP · máximo 5MB |

- Validación en cliente: `onBlur` (al salir del campo)
- Validación en servidor: Supabase + lógica en API route de Next.js
- Nunca mostrar errores en tiempo real mientras escribe — solo al salir del campo

---

### Agrupación en formularios

- Gap entre campos: `16px`
- Gap entre grupos de campos: `24px`
- Botón submit siempre al final, ancho completo en mobile
- Campos obligatorios: asterisco `*` en el label — `aria-required="true"` en el input
- Nunca más de 6 campos visibles a la vez — si hay más, dividir en pasos

---

### Accesibilidad

- Cada input tiene su `id` único vinculado al `htmlFor` del label
- `aria-required="true"` en campos obligatorios
- `aria-invalid="true"` en estado error
- `aria-describedby` apunta al mensaje de error cuando existe
- El mensaje de error tiene `role="alert"` para lectores de pantalla
- El toggle de password: `aria-pressed` para indicar estado
- File upload: `aria-label` descriptivo en la zona de drop

---

### Implementación con shadcn/ui

```
components/
  ui/
    input.tsx      ← shadcn base + estilos HandyFEM
    textarea.tsx   ← shadcn base + estilos HandyFEM
    select.tsx     ← shadcn base + estilos HandyFEM
    checkbox.tsx   ← shadcn base + estilos HandyFEM
  forms/
    field.tsx      ← wrapper: label + input + error message
    file-upload.tsx ← componente custom drag & drop
```

---

### Notas de uso

- Usar siempre el wrapper `<Field>` — nunca un input suelto sin label
- El estado loading del formulario completo: todos los inputs `disabled` + botón submit en loading
- En mobile, el teclado virtual puede tapar el input activo — usar `scrollIntoView` al hacer focus
- `prefers-reduced-motion`: elimina transiciones, mantiene cambios de color y border

---

*Siguiente componente: DS-03 Cards de profesional*

---

## Notas de producto — decisiones pendientes de implementar

### Búsqueda por ubicación

| Versión | Feature |
|---------|---------|
| MVP | Campo texto "Ciudad o código postal" → filtro por ciudad declarada en perfil |
| v1.5 | Mapa visual de resultados + toggle lista/mapa (Mapbox o Google Maps) |
| v2 | "Cerca de mí" con geolocalización real del dispositivo |

**Radio de trabajo (MVP):** al crear su perfil, la profesional indica una o varias ciudades donde trabaja. La búsqueda filtra por cualquiera de esas ciudades. Sin GPS, sin mapa, pero útil desde el día 1.

→ Añadir al onboarding profesional: campo "¿En qué ciudades ofreces tus servicios?" (select múltiple con ciudades principales de España)
→ Añadir a la spec del directorio: filtro por ciudad busca en el array de ciudades de trabajo de cada profesional

---

### Layout del directorio

| Versión | Feature |
|---------|---------|
| MVP | Cards horizontales en mobile (foto izquierda, info derecha) · Grid 2 columnas en desktop |
| v1.5 | Toggle lista / mapa |
| v2 | Geolocalización "cerca de mí" |

---

### Toggle de vista en directorio
- No incluir en MVP — coste de diseño y mantenimiento no justificado sin usuarias reales
- Añadir en v1.5 si las usuarias lo piden


---

## Spec DS-03 — Cards de profesional

### Filosofía
La card es el elemento más importante del directorio. Tiene que generar confianza en 3 segundos. Foto, nombre, especialidad, valoración y badge de verificada son los elementos mínimos para lograrlo.

---

### Variantes

#### Card horizontal (mobile)
- Layout: foto a la izquierda · info a la derecha
- Foto: 80x80px, `border-radius: 8px`, `object-fit: cover`
- Ancho: 100%
- Height: auto (mínimo 96px)

#### Card vertical (desktop grid)
- Layout: foto arriba · info abajo
- Foto: ancho completo, height 180px, `border-radius: 8px 8px 0 0`, `object-fit: cover`
- Ancho: 100% del grid column

---

### Contenido

| Elemento | Detalle |
|----------|---------|
| Foto | Avatar de la profesional. Fallback: iniciales en círculo lavanda |
| Nombre | `font-size: 15px` · `font-weight: 500` · color dark |
| Especialidad | `font-size: 13px` · color muted teal · icono wrench izquierda |
| Ubicación | `font-size: 12px` · color muted · icono map-pin izquierda |
| Valoración | Estrella ámbar + número `font-weight: 500` + nº reseñas muted |
| Badge verificada | Pill pequeña teal · punto pulsante · "Verificada" |

---

### Estados de la card

| Estado | Comportamiento |
|--------|---------------|
| Default | Borde lavanda `1.5px solid #D0C2E5` · fondo blanco |
| Hover (desktop) | `translateY(-2px)` · sombra teal suave · `@media (hover: hover)` |
| Sin foto | Iniciales en círculo `#D0C2E5` con texto `#60569C` |
| Sin valoraciones | "Sin valoraciones aún" en gris muted |
| Perfil incompleto | No aparece en el directorio |

---

### Propiedades

| Propiedad | Valor |
|-----------|-------|
| `border-radius` | `12px` |
| `border` | `1.5px solid #E0DDD6` (gris neutro) |
| `background` | `#fff` |
| `padding` | `12px` (horizontal) · `16px` (vertical desktop) |
| `transition` | `transform 300ms ease, box-shadow 300ms ease` |
| Hover `transform` | `translateY(-2px)` |
| Hover `box-shadow` | `0 8px 24px rgba(74,124,125,0.10)` |
| `cursor` | `pointer` |

---

### Badge verificada

- Fondo: `#E1F5EE` (teal muy claro)
- Texto: `#0F6E56` · `font-size: 11px` · `font-weight: 500`
- Punto pulsante: `6px` · `background: #4A7C7D` · animación `pulse` 2s loop
- `border-radius: 9999px`
- Padding: `3px 8px`

---

### Accesibilidad

- La card entera es clickable → `role="article"` + `tabIndex={0}`
- `aria-label="Ver perfil de {nombre}, {especialidad}"` en el wrapper
- Foto con `alt="{nombre}, {especialidad}"`
- Badge verificada con `aria-label="Perfil verificado"`
- Valoración con `aria-label="{n} estrellas, {n} reseñas"`
- Focus ring: `box-shadow: 0 0 0 3px #D0C2E550`

---

### Implementación

```
components/
  professionals/
    professional-card.tsx       ← card completa
    professional-card-mobile.tsx ← variante horizontal
```

Props:
- `name: string`
- `specialty: string`
- `city: string`
- `rating: number`
- `reviewCount: number`
- `isVerified: boolean`
- `avatarUrl?: string`
- `initials: string`

---

*Siguiente componente: DS-04 Badge / Chips*

---

## Spec DS-04 — Badges / Chips

### Filosofía
Pill para estados únicos e importantes. Rounded para categorías y etiquetas informativas que aparecen en grupos. La forma comunica jerarquía sin necesidad de color extra.

---

### Tipos y variantes

#### Estados — pill (border-radius: 9999px)

| Badge | Fondo | Texto | Uso |
|-------|-------|-------|-----|
| Verificada | `#E1F5EE` | `#0F6E56` | Perfil verificado por HandyFEM |
| Pendiente | `#FAEEDA` | `#854F0B` | Perfil enviado, esperando verificación |
| Nuevo | `#EEEDFE` | `#3C3489` | Chat nuevo sin respuesta |
| En progreso | `#E1F5EE` | `#0F6E56` | Servicio en curso |
| Completado | `#D3D1C7` | `#444441` | Servicio finalizado |

#### Categorías — rounded (border-radius: 6px)

| Badge | Fondo | Texto | Uso |
|-------|-------|-------|-----|
| Especialidad | `#D0C2E530` | `#60569C` | Electricidad, Fontanería, Carpintería... |
| Ciudad | `#4A7C7D15` | `#3A5E5F` | Barcelona, Madrid, Valencia... |
| Filtro activo | `#4A7C7D` | `#F4EBD7` | Filtro seleccionado en el directorio |
| Filtro inactivo | `#F8F5F0` | `#699794` | Filtro disponible sin seleccionar |

---

### Propiedades comunes

| Propiedad | Valor |
|-----------|-------|
| `font-size` | `11px` |
| `font-weight` | `500` |
| `padding` | `3px 10px` (pill) · `3px 8px` (rounded) |
| `display` | `inline-flex` |
| `align-items` | `center` |
| `gap` | `5px` (para icono o punto) |
| `white-space` | `nowrap` |
| `line-height` | `1` |

---

### Badge verificada — detalle

- Punto pulsante: `6px` · `background: #4A7C7D` · animación `pulse` 2s loop
- `aria-label="Perfil verificado por HandyFEM"`

---

### Chips de filtro — comportamiento

- Click en filtro inactivo → se activa (fondo teal, texto cream)
- Click en filtro activo → se desactiva (vuelve a estado inactivo)
- Filtros activos muestran icono `ti-x` a la derecha para limpiar
- Múltiples filtros pueden estar activos simultáneamente
- `role="checkbox"` · `aria-checked="true/false"`

---

### Accesibilidad

- Badges informativos: `aria-label` descriptivo cuando el color es el único diferenciador
- Chips de filtro: `role="checkbox"` + `aria-checked`
- Punto pulsante de verificada: `aria-hidden="true"` — decorativo
- Contraste mínimo AA verificado en todos los estados

---

### Implementación

```
components/
  ui/
    badge.tsx    ← variantes: verified · pending · new · active · complete
    chip.tsx     ← variantes: specialty · city · filter-active · filter-inactive
```

Props badge:
- `variant`: verified · pending · new · in-progress · completed
- `children`: texto del badge

Props chip:
- `variant`: specialty · city · filter
- `active?: boolean` (solo para filtros)
- `onRemove?: () => void` (muestra icono X cuando está activo)
- `children`: texto del chip

---

*Siguiente componente: DS-05 Avatar*

---

## Pendientes de polish — ajustes finos para el código

- [ ] DS-04 Chips filtro activo — icono X demasiado pequeño y mal ubicado. Ajustar tamaño (13-14px) y alineación vertical en el código.


---

## Spec DS-05 — Avatar

### Filosofía
El avatar identifica a la usuaria en toda la app. Siempre circular. Con foto si existe, con iniciales si no. Nunca un icono genérico de persona — las iniciales son más personales y coherentes con la identidad de HandyFEM.

---

### Tamaños

| Tamaño | Dimensión | Uso |
|--------|-----------|-----|
| XS | 24px | Comentarios, listas densas |
| SM | 32px | Navbar, mentions inline |
| MD | 40px | Cards de profesional, chat list |
| LG | 64px | Perfil público, dashboard |
| XL | 96px | Cabecera de perfil |

---

### Variantes

#### Con foto
- `object-fit: cover`
- `border-radius: 50%`
- Fallback automático a iniciales si la imagen falla al cargar

#### Con iniciales
- Fondo: color asignado por nombre (consistente — siempre el mismo color para la misma usuaria)
- Texto: 2 iniciales — nombre + apellido
- `font-weight: 500`
- Paleta de fondos rotativos:

| Color | Fondo | Texto |
|-------|-------|-------|
| Lavanda | `#D0C2E5` | `#60569C` |
| Teal claro | `#B3D4D6` | `#3A5E5F` |
| Amber claro | `#FCC97040` | `#854F0B` |
| Cream oscuro | `#D3D1C7` | `#444441` |

#### Con indicador de estado
- Punto en esquina inferior derecha
- Online: `#4A7C7D` · Ocupada: `#FCC970` · Offline: `#D3D1C7`
- Tamaño del punto: 10px (MD+) · 8px (SM)
- Borde blanco `2px` alrededor del punto para separarlo del avatar

---

### Propiedades comunes

| Propiedad | Valor |
|-----------|-------|
| `border-radius` | `50%` |
| `flex-shrink` | `0` |
| `overflow` | `hidden` |
| `position` | `relative` (para el indicador de estado) |
| `user-select` | `none` |

---

### Grupo de avatares (stack)

Para mostrar múltiples participantes — por ejemplo en una vista futura de grupos.
- Overlap: `-8px` margin-left desde el segundo avatar
- Borde: `2px solid #fff` en cada avatar para separación visual
- Máximo visible: 3 avatares + contador "+N" si hay más

---

### Accesibilidad

- `alt="{nombre completo}"` si tiene foto
- `aria-label="{nombre completo}"` si tiene iniciales
- El indicador de estado: `aria-label="En línea"` / `"Ocupada"` / `"Desconectada"`

---

### Implementación

```
components/
  ui/
    avatar.tsx    ← tamaños: xs · sm · md · lg · xl
                    variantes: photo · initials · with-status
```

Props:
- `size`: xs · sm · md · lg · xl
- `src?: string` — URL de la foto
- `name: string` — para iniciales y alt
- `status?: 'online' | 'busy' | 'offline'`

Lógica de color por iniciales:
```ts
const colors = ['lavanda', 'teal', 'amber', 'gray']
const colorIndex = name.charCodeAt(0) % colors.length
```

---

*Siguiente: Spec DS-06 — Resumen y tokens globales*

- [ ] DS-05 Avatar — indicador de estado no sobresale del círculo mayor. Ajustar `bottom: -2px; right: -2px` para que el punto quede fuera del borde del avatar.
- [ ] DS-01 Navbar — revisar color de fondo en el preview, debe ser cream `#F4EBD7` no amarillo apagado. Verificar token `--color-cream` en el código.
- [ ] DS-03 Cards — borde demasiado grueso. Reducir de `1.5px` a `0.5px solid #E0DDD6`.

- [ ] Global — cambio de fondo. El cream (`#F4EBD7`) se elimina como color de fondo de pantallas. Sustituir por:
  - Fondo principal: `#ffffff`
  - Fondo secundario (surfaces, navbar, secciones alternas): `#F5F5F5`
  - El cream se reserva únicamente para elementos de acento muy puntuales si se necesita calidez (ej. CTA final de landing)

---

## Spec DS-06 — Tokens globales

### Filosofía
Un solo lugar de verdad para todos los valores del DS. Cualquier cambio de color, tipografía o espaciado se hace aquí y se propaga a toda la app automáticamente.

---

### Colores

#### Fondos
| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg-primary` | `#ffffff` | Fondo principal de pantallas y cards |
| `--color-bg-secondary` | `#F5F5F5` | Secciones alternas, search bar, navbar interior |
| `--color-bg-cream` | `#F4EBD7` | Uso muy puntual — CTA final landing, acento cálido |

#### Primario — teal
| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | `#4A7C7D` | Botón primario, step numbers, iconos principales |
| `--color-primary-light` | `#699794` | Texto muted, specialty label |
| `--color-primary-pale` | `#B3D4D6` | Avatar teal, fondos muy suaves |
| `--color-primary-hover` | `#3A6B6C` | Hover de botón primario |

#### Acento — violet
| Token | Valor | Uso |
|-------|-------|-----|
| `--color-accent` | `#776AAA` | Botón secundario borde, links, FEM del logo |
| `--color-accent-dark` | `#60569C` | Texto sobre lavanda, hover accent |
| `--color-accent-light` | `#8D7BB8` | Variante clara |
| `--color-lavanda` | `#D0C2E5` | Fondos de badge, avatar lavanda, focus ring |
| `--color-lavanda-pale` | `#EEEDFE` | Badge "Nuevo" fondo |

#### Texto
| Token | Valor | Uso |
|-------|-------|-----|
| `--color-text-primary` | `#2C2C2A` | Texto principal, nombres, títulos |
| `--color-text-muted` | `#699794` | Subtítulos, especialidad, labels |
| `--color-text-subtle` | `#B4B2A9` | Placeholder, ubicación, texto terciario |

#### Bordes
| Token | Valor | Uso |
|-------|-------|-----|
| `--color-border` | `#E0DDD6` | Borde neutro de cards, inputs default |
| `--color-border-focus` | `#776AAA` | Borde de input en focus |
| `--color-border-error` | `#E24B4A` | Borde de input en error |
| `--color-border-success` | `#4A7C7D` | Borde de input en success |

#### Semánticos
| Token | Valor | Uso |
|-------|-------|-----|
| `--color-success-bg` | `#E1F5EE` | Badge verificada, en progreso |
| `--color-success-text` | `#0F6E56` | Texto sobre success bg |
| `--color-warning-bg` | `#FAEEDA` | Badge pendiente |
| `--color-warning-text` | `#854F0B` | Texto sobre warning bg |
| `--color-error-bg` | `#FCEBEB` | Input error fondo |
| `--color-error-text` | `#A32D2D` | Texto de error |
| `--color-amber` | `#FCC970` | Estrellas de valoración únicamente |

---

### Tipografía

| Token | Valor |
|-------|-------|
| `--font-sans` | `Inter, system-ui, sans-serif` |
| `--font-size-xs` | `11px` |
| `--font-size-sm` | `12px` |
| `--font-size-ui` | `13px` |
| `--font-size-base` | `14px` |
| `--font-size-md` | `15px` |
| `--font-size-lg` | `16px` |
| `--font-size-xl` | `20px` |
| `--font-size-2xl` | `24px` |
| `--font-size-3xl` | `32px` |
| `--font-weight-regular` | `400` |
| `--font-weight-medium` | `500` |
| `--line-height-tight` | `1.3` |
| `--line-height-base` | `1.6` |
| `--letter-spacing-btn` | `0.02em` |
| `--letter-spacing-label` | `0.05em` |

---

### Espaciado

Sistema base 4px. Todos los valores son múltiplos de 4.

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-1` | `4px` | Gap mínimo entre elementos inline |
| `--space-2` | `8px` | Gap entre icono y texto |
| `--space-3` | `12px` | Padding interno de cards mobile |
| `--space-4` | `16px` | Gap entre campos de formulario |
| `--space-5` | `20px` | Padding horizontal de cards desktop |
| `--space-6` | `24px` | Gap entre grupos de campos |
| `--space-8` | `32px` | Padding de secciones |
| `--space-12` | `48px` | Separación entre secciones grandes |

---

### Border radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | `6px` | Badges categoría, chips |
| `--radius-md` | `8px` | Botones, inputs, fotos de avatar en cards |
| `--radius-lg` | `12px` | Cards, modales, panels |
| `--radius-xl` | `16px` | Secciones, contenedores grandes |
| `--radius-pill` | `9999px` | Navbar, badges estado, chips filtro activo |

---

### Sombras

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow-card` | `0 2px 12px rgba(0,0,0,0.06)` | Cards en reposo |
| `--shadow-card-hover` | `0 8px 24px rgba(74,124,125,0.08)` | Cards en hover |
| `--shadow-nav` | `0 2px 12px rgba(0,0,0,0.06)` | Navbar en reposo |
| `--shadow-nav-scroll` | `0 4px 24px rgba(74,124,125,0.12)` | Navbar al hacer scroll |
| `--shadow-focus` | `0 0 0 3px #D0C2E550` | Focus ring inputs y botones |

---

### Transiciones

| Token | Valor | Uso |
|-------|-------|-----|
| `--t-fast` | `150ms ease` | Hover de botones, cambios de color |
| `--t-normal` | `300ms ease` | Hover de cards, transiciones de panel |
| `--t-slow` | `600ms ease-out` | Animaciones de entrada scroll-triggered |

---

### Breakpoints

| Token | Valor | Descripción |
|-------|-------|-------------|
| `--bp-mobile` | `< 768px` | Mobile — layout de una columna |
| `--bp-desktop` | `≥ 768px` | Desktop — grid, navbar completa |

Sin breakpoint tablet — decisión intencional igual que en Borrissol.

---

### Touch targets

| Token | Valor |
|-------|-------|
| `--min-touch` | `44px` | Mínimo en todos los elementos interactivos |

---

### Implementación en Next.js + Tailwind

```css
/* globals.css */
:root {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #F5F5F5;
  --color-primary: #4A7C7D;
  --color-accent: #776AAA;
  /* ... resto de tokens */
}
```

```ts
/* tailwind.config.ts */
theme: {
  extend: {
    colors: {
      primary: '#4A7C7D',
      accent: '#776AAA',
      lavanda: '#D0C2E5',
      amber: '#FCC970',
    },
    borderRadius: {
      pill: '9999px',
    }
  }
}
```

---

## Design System — completado ✓

### Componentes definidos
- DS-01 Botones
- DS-02 Inputs / Formularios  
- DS-03 Cards de profesional
- DS-04 Badges / Chips
- DS-05 Avatar
- DS-06 Tokens globales

### Siguiente fase
Specs de pantallas del MVP:
- Spec 01 Landing page ✓
- Spec 02 Sign up / Log in
- Spec 03 Directorio + filtros
- Spec 04 Perfil profesional público
- Spec 05 Dashboard con role toggle
- Spec 06 Onboarding profesional
- Spec 07 Chat básico


---

## Spec 02 — Sign up / Log in

### Objetivo
Registrar o autenticar a la usuaria con la menor fricción posible. El registro crea una cuenta con rol base clienta. Google OAuth reduce el tiempo de onboarding a un solo click.

---

### URLs
- `/login` — pantalla de login
- `/signup` — pantalla de registro
- `/signup?rol=profesional` — registro con intención profesional (viene del CTA "Soy profesional" de la landing)

---

### Layout

- Fondo: `--color-bg-secondary` (`#F5F5F5`)
- Tarjeta central: `--color-bg-primary` (`#ffffff`) · `border-radius: 16px` · `border: 0.5px solid #E0DDD6`
- Ancho máximo tarjeta: `440px`
- Centrada horizontal y verticalmente en desktop
- En mobile: ocupa el ancho completo sin tarjeta — formulario directo sobre fondo

---

### Pantalla /login

#### Contenido
| Elemento | Detalle |
|----------|---------|
| Logo | HandyFEM centrado arriba |
| Título | "Bienvenida de nuevo" |
| Subtítulo | "Entra en tu cuenta de HandyFEM" |
| Botón Google | "Continuar con Google" · icono Google · ancho completo |
| Divisor | línea + "o" centrado |
| Campo email | label "Email" · `type="email"` · `autocomplete="email"` |
| Campo password | label "Contraseña" · toggle show/hide · `autocomplete="current-password"` |
| Link | "¿Olvidaste tu contraseña?" → `/reset-password` |
| Botón submit | "Entrar" · primario · ancho completo · estado loading |
| Link inferior | "¿No tienes cuenta? Regístrate" → `/signup` |

#### Estados
| Estado | Comportamiento |
|--------|---------------|
| Default | Formulario vacío |
| Loading | Botón en loading · inputs disabled |
| Error credenciales | Mensaje inline "Email o contraseña incorrectos" bajo el botón |
| Error Google | Toast "No se pudo conectar con Google. Inténtalo de nuevo" |
| Éxito | Redirect a `/dashboard` |

---

### Pantalla /signup

#### Contenido
| Elemento | Detalle |
|----------|---------|
| Logo | HandyFEM centrado arriba |
| Título | "Crea tu cuenta" |
| Subtítulo | "Únete a la red de mujeres profesionales" |
| Botón Google | "Continuar con Google" · ancho completo |
| Divisor | línea + "o" centrado |
| Campo nombre | label "Nombre" · `type="text"` · `autocomplete="given-name"` |
| Campo apellido | label "Apellido" · `type="text"` · `autocomplete="family-name"` |
| Campo email | label "Email" · `type="email"` · `autocomplete="email"` |
| Campo password | label "Contraseña" · toggle show/hide · hint "Mínimo 8 caracteres y 1 número" |
| Checkbox | "Acepto los términos y condiciones y la política de privacidad" · obligatorio |
| Botón submit | "Crear cuenta" · primario · ancho completo · estado loading |
| Link inferior | "¿Ya tienes cuenta? Entra aquí" → `/login` |

#### Si viene de `/signup?rol=profesional`
- Mismos campos
- Subtítulo cambia a "Empieza a ofrecer tus servicios en HandyFEM"
- Después del registro redirect a `/onboarding` en vez de `/dashboard`

#### Estados
| Estado | Comportamiento |
|--------|---------------|
| Default | Formulario vacío |
| Validación | `onBlur` por campo — nunca en tiempo real |
| Loading | Botón en loading · inputs disabled |
| Error email existe | "Ya existe una cuenta con este email. ¿Quieres entrar?" con link a `/login` |
| Éxito | Pantalla de verificación de email |

---

### Pantalla de verificación de email

Aparece después del registro con email + password (no con Google).

| Elemento | Detalle |
|----------|---------|
| Icono | Sobre / email grande · color teal |
| Título | "Revisa tu email" |
| Subtítulo | "Te hemos enviado un enlace a {email}. Haz click en él para verificar tu cuenta." |
| Botón | "Reenviar email" · ghost · con cooldown de 60s |
| Link | "Cambiar email" → vuelve a `/signup` |

---

### Reset de contraseña

URL: `/reset-password`

| Elemento | Detalle |
|----------|---------|
| Título | "Recupera tu contraseña" |
| Campo email | label "Email" · `type="email"` |
| Botón | "Enviar enlace" · primario · ancho completo |
| Éxito | "Te hemos enviado un enlace. Revisa tu email." |

---

### Implementación con Supabase

```ts
// Login con email
const { error } = await supabase.auth.signInWithPassword({ email, password })

// Registro con email
const { error } = await supabase.auth.signUp({ email, password,
  options: { data: { nombre, apellido } }
})

// Google OAuth
const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })

// Reset password
const { error } = await supabase.auth.resetPasswordForEmail(email)
```

---

### Seguridad

- Nunca mostrar si el email existe en mensajes de error de login — usar siempre "Email o contraseña incorrectos" (evita enumeración de usuarios)
- Rate limiting en intentos de login — Supabase lo gestiona por defecto
- Password nunca se guarda en texto plano — Supabase lo gestiona
- Tokens de sesión en cookies httpOnly — configurar en Supabase + Next.js middleware
- Redirect después de login siempre a URL interna — nunca a URL externa (evita open redirect)

---

### Accesibilidad

- `autocomplete` en todos los campos de auth
- `aria-live="polite"` en mensajes de error
- Focus automático en el primer campo al cargar
- Submit con Enter en cualquier campo del formulario
- El botón de Google tiene `aria-label="Continuar con Google"`

---

*Siguiente: Spec 03 — Directorio + filtros*

- [x] Spec 02 Sign up / Log in — visual aprobado ✓

---

## Spec 03 — Directorio + filtros

### Objetivo
Permitir a la clienta encontrar la profesional adecuada con la menor fricción posible. Los filtros reducen el ruido, las cards generan confianza, y el resultado es una decisión de contacto.

---

### URL
`/directorio`

### Acceso
- Pública — no requiere login para navegar
- Login requerido solo al pulsar "Contactar"

---

### Layout

| Zona | Detalle |
|------|---------|
| Fondo | `#F5F5F5` |
| Barra de búsqueda | Fondo `#fff` · sticky en scroll · `border-bottom: 0.5px solid #E0DDD6` |
| Chips de filtro | Debajo de la barra · scroll horizontal en mobile |
| Resultados | Lista vertical en mobile · grid 2 columnas en desktop |
| Padding lateral | `16px` mobile · `24px` desktop |

---

### Barra de búsqueda

| Elemento | Detalle |
|----------|---------|
| Input especialidad | Placeholder "¿Qué servicio necesitas?" · icono search izquierda |
| Input ciudad | Placeholder "Ciudad o CP" · icono map-pin izquierda |
| Botón buscar | "Buscar" · primario · `height: 40px` |
| Comportamiento | Sticky al hacer scroll — queda pegada arriba |

---

### Filtros

| Filtro | Tipo | Valores |
|--------|------|---------|
| Especialidad | Multi-select chips | Electricidad · Fontanería · Carpintería · Pintura · Reformas · Instalaciones · Mantenimiento |
| Ciudad | Text input | Libre — filtra por ciudades declaradas en perfil profesional |
| Verificadas | Toggle chip | Activado por defecto |
| 4+ estrellas | Toggle chip | Desactivado por defecto |

**Comportamiento:**
- Chips acumulables — varios activos simultáneamente
- Chip activo: fondo teal · texto cream · icono X para eliminar
- Chip inactivo: fondo `#F5F5F5` · borde `#E0DDD6`
- "Limpiar filtros" — link ghost — visible solo cuando hay filtros activos
- En mobile: chips en scroll horizontal sin wrap

---

### Resultados

| Estado | Comportamiento |
|--------|---------------|
| Cargando | Skeleton cards — 3 placeholders animados |
| Con resultados | Contador "N profesionales encontradas" + lista/grid de cards |
| Sin resultados | Ilustración + "No encontramos profesionales con estos filtros" + "Limpiar filtros" |
| Sin búsqueda | Muestra todas las profesionales verificadas ordenadas por valoración |

**Ordenación por defecto:** verificadas primero → mayor valoración → más reseñas

---

### Card en el directorio

Usa DS-03 con estas especificaciones:
- Mobile: card horizontal (foto izquierda · info derecha)
- Desktop: card vertical (foto arriba · info abajo) en grid 2 columnas
- Click en card → navega a `/directorio/{id}` (perfil público)
- Foto: `object-fit: cover` · fallback iniciales

---

### Skeleton loader

Mientras cargan los resultados:
- 3 cards con bloques grises animados (`animation: shimmer`)
- Mismas dimensiones que las cards reales
- `background: linear-gradient(90deg, #F5F5F5 25%, #E8E8E8 50%, #F5F5F5 75%)`
- Duración: 1.5s loop

---

### Paginación

- MVP: scroll infinito — carga 12 cards iniciales · 12 más al llegar al final
- Implementación: `IntersectionObserver` en el último elemento visible
- Loading indicator: spinner teal centrado al cargar más

---

### SEO

- Página renderizada en servidor (SSR) con Next.js
- `<title>` dinámico según filtros activos: "Electricistas en Barcelona — HandyFEM"
- `<meta description>` dinámico
- URL con query params para compartir búsquedas: `/directorio?especialidad=electricidad&ciudad=barcelona`
- Cada card es un `<article>` con datos estructurados (Schema.org Person)

---

### Accesibilidad

- `<main>` wrapping el contenido principal
- `<search>` wrapping la barra de búsqueda y filtros
- Chips filtro: `role="checkbox"` · `aria-checked`
- Contador de resultados: `aria-live="polite"` — se anuncia al cambiar
- Cards: `role="article"` · `tabIndex={0}` · navegables con teclado
- Skeleton: `aria-busy="true"` en el contenedor durante la carga

---

### Notas técnicas

- Query a Supabase con filtros combinados:
```ts
let query = supabase
  .from('professionals')
  .select('*')
  .eq('is_verified', true)

if (especialidad) query = query.contains('specialties', [especialidad])
if (ciudad) query = query.contains('cities', [ciudad])
if (soloVerificadas) query = query.eq('is_verified', true)
if (altaValoracion) query = query.gte('rating', 4)
```
- Índices en Supabase: `specialties`, `cities`, `rating`, `is_verified`
- Cache de resultados con `React Query` o `SWR` — evita refetch innecesario al volver de un perfil

---

*Siguiente: Spec 04 — Perfil profesional público*

---

## Spec 04 — Perfil profesional público

### Objetivo
Dar suficiente información a la clienta para que tome la decisión de contactar. Es la pantalla que convierte visitas en conversaciones. Tiene que generar confianza en 10 segundos.

---

### URL
`/directorio/[id]`

### Acceso
- Pública — no requiere login para ver
- Login requerido al pulsar "Contactar"

---

### Layout mobile (una columna)

```
Foto de cabecera (hero image)
Avatar + nombre + especialidad
Badge verificada + valoración
Ciudades de trabajo
Descripción
Especialidades (chips)
Portfolio (grid de fotos)
Valoraciones
CTA flotante "Contactar"
```

---

### Secciones

#### Cabecera
| Elemento | Detalle |
|----------|---------|
| Foto hero | Ancho completo · height 200px · `object-fit: cover` · fallback fondo teal claro |
| Avatar | 72px · superpuesto sobre la foto hero · `border: 3px solid #fff` |
| Nombre | `font-size: 20px` · `font-weight: 500` · color dark |
| Especialidad principal | `font-size: 14px` · color muted · icono wrench |
| Badge verificada | Pill verde con punto pulsante |
| Valoración | Estrellas ámbar + número + conteo de reseñas |

#### Ciudades de trabajo
| Elemento | Detalle |
|----------|---------|
| Título | "Trabaja en" |
| Chips | Ciudad 1 · Ciudad 2 · ... (chips rounded teal claro) |

#### Descripción
| Elemento | Detalle |
|----------|---------|
| Título | "Sobre mí" |
| Texto | Descripción libre · máximo 500 caracteres |
| Comportamiento | Truncado a 3 líneas con "Ver más" si supera el límite visible |

#### Especialidades
| Elemento | Detalle |
|----------|---------|
| Título | "Especialidades" |
| Chips | Lista de especialidades en chips rounded lavanda |

#### Portfolio
| Elemento | Detalle |
|----------|---------|
| Título | "Portfolio" |
| Grid | 3 columnas · fotos cuadradas · `object-fit: cover` · `border-radius: 8px` |
| Click | Abre la foto en pantalla completa (lightbox) |
| Sin fotos | Mensaje "Aún no ha añadido fotos de portfolio" |

#### Valoraciones
| Elemento | Detalle |
|----------|---------|
| Título | "Valoraciones" · número total |
| Resumen | Media de estrellas grande + barra de distribución 5→1 estrellas |
| Lista | Máximo 5 valoraciones visibles · "Ver todas" si hay más |
| Cada valoración | Avatar clienta + nombre + fecha + estrellas + texto |
| Sin valoraciones | "Aún no tiene valoraciones. Sé la primera." |

---

### CTA flotante

| Elemento | Detalle |
|----------|---------|
| Posición | Fixed bottom · ancho completo · padding 12px 16px · fondo blanco · `border-top: 0.5px solid #E0DDD6` |
| Botón | "Contactar a {nombre}" · primario · ancho completo |
| Si no logueada | Pulsar abre modal de login / redirect a `/login?redirect=/directorio/[id]` |
| Si logueada | Crea conversación en Supabase + redirect a `/chats/[conversationId]` |

---

### Estados

| Estado | Comportamiento |
|--------|---------------|
| Cargando | Skeleton de toda la pantalla |
| Perfil completo | Layout completo como descrito |
| Sin foto hero | Fondo teal claro `#B3D4D6` como fallback |
| Sin portfolio | Sección portfolio oculta |
| Sin valoraciones | Mensaje de estado vacío |
| Perfil no encontrado | Página 404 con "Esta profesional no existe" + link al directorio |

---

### SEO

- SSR con Next.js — página indexable por Google
- `<title>`: "{nombre} — {especialidad} en {ciudad} · HandyFEM"
- `<meta description>`: descripción truncada a 160 caracteres
- `og:image`: foto de perfil de la profesional
- Schema.org `Person` con nombre, especialidad, ciudad, valoración

---

### Accesibilidad

- `<main>` wrapping el contenido
- Foto hero con `alt="{nombre}, {especialidad}"`
- Portfolio: cada foto con `alt="Foto de portfolio de {nombre}"`
- Lightbox: `role="dialog"` · cierre con Escape · focus trap
- CTA flotante: `aria-label="Contactar a {nombre}"`
- Valoraciones: `aria-label="{n} estrellas de 5"`

---

### Notas técnicas

- Datos cargados con `generateStaticParams` + `revalidate: 3600` — ISR de Next.js
- Las valoraciones se cargan en cliente para tener siempre las más recientes
- El lightbox del portfolio: librería `yet-another-react-lightbox` (accesible, ligera)
- Redirect post-login: guardar URL en `sessionStorage` antes de redirigir a login

---

*Siguiente: Spec 05 — Dashboard con role toggle*

---

## Spec 05 — Dashboard con role toggle

### Objetivo
Punto de entrada principal después del login. Muestra contenido relevante según el rol activo. Una sola pantalla que se adapta sin confundir.

---

### URL
`/dashboard`

### Acceso
- Requiere login — redirect a `/login?redirect=/dashboard` si no autenticada

---

### Layout

- Fondo: `#F5F5F5`
- Header fijo: avatar + nombre + notificaciones
- Role toggle: tab switcher "Clienta / Profesional"
- Contenido: cambia según el rol activo
- Nav inferior (mobile): Home · Directorio · Chats · Perfil

---

### Header del dashboard

| Elemento | Detalle |
|----------|---------|
| Avatar | SM 32px con iniciales o foto |
| Saludo | "Hola, {nombre}" · `font-size: 16px` · `font-weight: 500` |
| Icono notificaciones | `ti-bell` · badge numérico si hay pendientes |
| Fondo | `#fff` · `border-bottom: 0.5px solid #E0DDD6` |

---

### Role toggle

| Elemento | Detalle |
|----------|---------|
| Tipo | Tab switcher de dos opciones |
| Opción 1 | "Clienta" |
| Opción 2 | "Profesional" |
| Si solo clienta | Tab "Profesional" muestra CTA "Activar perfil profesional" |
| Si ambos roles | Toggle funcional entre los dos modos |
| Persistencia | Último rol activo guardado en `localStorage` |
| Fondo | Pill gris · tab activo fondo blanco con sombra sutil |

---

### Contenido — modo clienta

| Sección | Detalle |
|---------|---------|
| Búsqueda rápida | Campo de búsqueda → `/directorio` con query |
| Chats recientes | Últimas 3 conversaciones con profesionales · link "Ver todos" → `/chats` |
| Acceso rápido | Botón "Buscar profesional" → `/directorio` |

---

### Contenido — modo profesional

| Sección | Detalle |
|---------|---------|
| Estado del perfil | Card con estado: Activo · Pendiente · Inactivo |
| Stats rápidas | Nº de contactos recibidos · valoración media · nº reseñas |
| Chats recientes | Últimas 3 conversaciones con clientas · link "Ver todos" → `/chats` |
| Accesos rápidos | "Editar perfil" → `/perfil/editar` · "Ver mi perfil público" → `/directorio/[id]` |

---

### Estado — perfil profesional no activado

Cuando la usuaria está en modo profesional pero no ha activado su perfil:

| Elemento | Detalle |
|----------|---------|
| Card destacada | Icono + "Aún no tienes perfil profesional" |
| CTA | "Activar perfil profesional" → `/onboarding` |
| Subtexto | "Empieza a recibir contactos de clientas" |

---

### Nav inferior mobile

| Tab | Icono | Destino |
|-----|-------|---------|
| Home | `ti-home` | `/dashboard` |
| Directorio | `ti-search` | `/directorio` |
| Chats | `ti-message` · badge si hay mensajes nuevos | `/chats` |
| Perfil | `ti-user` | `/perfil` |

- Height: 60px · fondo blanco · `border-top: 0.5px solid #E0DDD6`
- Tab activo: icono + label en teal · resto en gris muted
- `min-height: 44px` en cada tab

---

### Estados

| Estado | Comportamiento |
|--------|---------------|
| Cargando | Skeleton del header + skeleton de secciones |
| Solo clienta | Toggle muestra CTA de activación en tab profesional |
| Ambos roles | Toggle funcional |
| Sin chats | "Aún no tienes conversaciones. Busca una profesional." |
| Sin perfil profesional | Card de activación destacada |

---

### Accesibilidad

- Role toggle: `role="tablist"` · cada tab `role="tab"` · `aria-selected` · `aria-controls`
- Contenido de cada tab: `role="tabpanel"` · `aria-labelledby`
- Nav inferior: `role="navigation"` · `aria-label="Navegación principal"`
- Badge de notificaciones: `aria-label="{n} notificaciones pendientes"`
- Badge de chats: `aria-label="{n} mensajes sin leer"`

---

### Notas técnicas

- El rol activo se lee de Supabase al cargar — `profiles.roles[]`
- `localStorage` solo para persistir el último tab activo entre sesiones
- Las stats del modo profesional se calculan en Supabase con funciones RPC
- El badge de notificaciones usa Supabase Realtime para actualizarse sin reload

---

*Siguiente: Spec 06 — Onboarding profesional*

---

## Spec 06 — Onboarding profesional

### Objetivo
Guiar a la usuaria para crear su perfil profesional de forma clara y sin fricción. Dividido en pasos para no abrumar. Al completarlo, el perfil queda activo en el directorio.

---

### URL
`/onboarding`

### Acceso
- Requiere login
- Redirect aquí desde `/signup?rol=profesional` o desde el dashboard al pulsar "Activar perfil profesional"

---

### Estructura — 4 pasos

```
Paso 1 → Especialidad y ciudades
Paso 2 → Descripción y tarifas
Paso 3 → Fotos (perfil + portfolio)
Paso 4 → Confirmación
```

---

### Header de onboarding

| Elemento | Detalle |
|----------|---------|
| Logo | HandyFEM centrado |
| Barra de progreso | 4 segmentos · teal el completado · gris el pendiente |
| Indicador | "Paso 2 de 4" · `font-size: 12px` · color muted |
| Botón volver | `ti-arrow-left` · ghost · vuelve al paso anterior |

---

### Paso 1 — Especialidad y ciudades

| Campo | Tipo | Detalle |
|-------|------|---------|
| Especialidad principal | Select | Electricidad · Fontanería · Carpintería · Pintura · Reformas · Instalaciones · Mantenimiento · Otra |
| Especialidades adicionales | Multi-select chips | Mismas opciones · opcional |
| Ciudades donde trabajas | Multi-select chips | Ciudades principales de España · mínimo 1 |

**Validación:**
- Especialidad principal: obligatoria
- Ciudades: mínimo 1 obligatoria

---

### Paso 2 — Descripción y tarifas

| Campo | Tipo | Detalle |
|-------|------|---------|
| Descripción profesional | Textarea | Mínimo 50 · máximo 500 caracteres · contador visible |
| Tarifa orientativa | Text opcional | "¿Cuál es tu tarifa orientativa? Ej: 40€/hora" · sin validación estricta |

**Nota:** La tarifa es opcional y orientativa — no se usa para pagos, solo como información para la clienta.

---

### Paso 3 — Fotos

| Campo | Tipo | Detalle |
|-------|------|---------|
| Foto de perfil | File upload | Obligatoria · JPG/PNG/WebP · máx 5MB · preview circular |
| Fotos de portfolio | File upload múltiple | Opcional · hasta 6 fotos · preview en grid |

**Comportamiento:**
- Foto de perfil: si ya tiene foto de cuenta de Google, se usa como default con opción de cambiar
- Portfolio: drag & drop o selector · preview inmediata · botón X para eliminar cada foto

---

### Paso 4 — Confirmación

| Elemento | Detalle |
|----------|---------|
| Resumen | Especialidad · ciudades · descripción truncada · foto de perfil |
| CTA | "Publicar perfil" · primario · ancho completo |
| Subtexto | "Tu perfil será visible en el directorio inmediatamente" |
| Link | "Volver y editar" · ghost |

**Al pulsar "Publicar perfil":**
- Guarda en Supabase tabla `professionals`
- Activa el rol profesional en `profiles.roles[]`
- Redirect a `/dashboard` con toast "¡Tu perfil está activo!"

---

### Estados

| Estado | Comportamiento |
|--------|---------------|
| Paso incompleto | Botón "Continuar" disabled hasta que los campos obligatorios estén completos |
| Subiendo fotos | Spinner en el área de upload · botón continuar disabled |
| Error de subida | Toast "No se pudo subir la foto. Inténtalo de nuevo." |
| Éxito | Redirect a dashboard + toast de confirmación |

---

### Accesibilidad

- Barra de progreso: `role="progressbar"` · `aria-valuenow` · `aria-valuemax="4"`
- Cada paso: `aria-live="polite"` al cambiar de paso
- Chips multi-select: `role="checkbox"` · `aria-checked`
- File upload: `aria-label` descriptivo · `aria-describedby` con hint de formatos

---

### Notas técnicas

- Estado del formulario en `useState` — no se pierde al navegar entre pasos
- Las fotos se suben a Supabase Storage en el paso 3 al seleccionarlas — no al submit final
- Si la usuaria abandona el onboarding a mitad, los datos se guardan en `localStorage` como borrador
- Al volver, se recupera el borrador y se pregunta "¿Continuar donde lo dejaste?"

---

*Siguiente: Spec 07 — Chat básico*

---

## Spec 07 — Chat básico

### Objetivo
Permitir la comunicación directa entre clienta y profesional sin intermediarios. Simple, funcional y en tiempo real.

---

### URLs
- `/chats` — lista de conversaciones
- `/chats/[id]` — conversación individual

### Acceso
- Requiere login en ambas rutas

---

### Pantalla /chats — lista de conversaciones

#### Layout
| Elemento | Detalle |
|----------|---------|
| Header | "Mis chats" · `font-size: 18px` · `font-weight: 500` |
| Fondo | `#F5F5F5` |
| Lista | Cards de conversación ordenadas por última actividad |

#### Card de conversación
| Elemento | Detalle |
|----------|---------|
| Avatar | MD 40px de la otra persona |
| Nombre | Nombre completo · `font-weight: 500` |
| Preview | Último mensaje truncado a 1 línea |
| Timestamp | Hora si es hoy · día si es esta semana · fecha si es más antiguo |
| Badge estado | Pill — Nuevo · En progreso · Completado |
| Badge no leído | Punto violeta si hay mensajes sin leer |

#### Estados
| Estado | Comportamiento |
|--------|---------------|
| Sin conversaciones | Icono + "Aún no tienes conversaciones" + botón "Buscar profesional" |
| Cargando | Skeleton de 3 cards |
| Con conversaciones | Lista ordenada por última actividad |

---

### Pantalla /chats/[id] — conversación

#### Layout mobile
```
Header fijo    → avatar + nombre + badge estado + back button
Mensajes       → scroll vertical · burbujas
Input fijo     → campo texto + adjuntar foto + enviar
```

#### Header de conversación
| Elemento | Detalle |
|----------|---------|
| Botón volver | `ti-arrow-left` → `/chats` |
| Avatar | SM 32px |
| Nombre | `font-size: 14px` · `font-weight: 500` |
| Badge estado | Pill — Nuevo · En progreso · Completado · clickable para cambiar |
| Fondo | `#fff` · `border-bottom: 0.5px solid #E0DDD6` |

#### Burbujas de mensaje
| Elemento | Detalle |
|----------|---------|
| Mensaje propio | Derecha · fondo teal `#4A7C7D` · texto cream · `border-radius: 12px 12px 2px 12px` |
| Mensaje otro | Izquierda · fondo `#F5F5F5` · texto dark · `border-radius: 12px 12px 12px 2px` |
| Timestamp | Debajo del mensaje · `font-size: 11px` · color muted |
| Foto adjunta | Thumbnail 200px · click abre lightbox |
| Agrupación | Mensajes del mismo remitente seguidos sin avatar repetido |

#### Input de mensaje
| Elemento | Detalle |
|----------|---------|
| Campo texto | Placeholder "Escribe un mensaje..." · crece con el contenido · máx 4 líneas |
| Botón adjuntar | `ti-paperclip` · abre selector de fotos |
| Botón enviar | `ti-send` · teal · disabled si el campo está vacío |
| Fondo | `#fff` · `border-top: 0.5px solid #E0DDD6` · padding `8px 16px` |

#### Cambio de estado
- Click en el badge de estado abre un bottom sheet con las opciones
- Opciones: Nuevo → En progreso → Completado
- Solo la profesional puede cambiar el estado
- Al marcar "Completado" → aparece prompt "¿Dejar una valoración?" → `/valoracion/[id]`

---

### Tiempo real

- Implementación: Supabase Realtime subscriptions
- Al recibir mensaje nuevo: scroll automático al último mensaje
- Indicador de "escribiendo..." cuando la otra persona escribe
- Los mensajes nuevos se marcan como leídos al abrir la conversación

---

### Estados de mensaje

| Estado | Icono |
|--------|-------|
| Enviando | Reloj `ti-clock` · gris |
| Enviado | Check simple `ti-check` · gris |
| Leído | Check doble `ti-checks` · teal |
| Error | `ti-alert-circle` · rojo · tap para reintentar |

---

### Accesibilidad

- `role="log"` en el contenedor de mensajes · `aria-live="polite"`
- `aria-label="Mensaje de {nombre}, {timestamp}"` en cada burbuja
- Input: `aria-label="Escribe un mensaje"` · `aria-multiline="true"`
- Botón enviar: `aria-label="Enviar mensaje"` · `aria-disabled` cuando vacío
- Bottom sheet de estado: `role="dialog"` · focus trap · cierre con Escape

---

### Notas técnicas

- Tabla Supabase: `messages` — `id, conversation_id, sender_id, content, type, created_at, read_at`
- Tabla Supabase: `conversations` — `id, client_id, professional_id, status, created_at, updated_at`
- Fotos adjuntas: subida a Supabase Storage · thumbnail generado automáticamente
- Paginación de mensajes: carga los últimos 50 · scroll hacia arriba carga más
- `useEffect` cleanup de la subscription al desmontar el componente

---

## Specs MVP — completadas ✓

| Pantalla | Estado |
|----------|--------|
| Spec 01 Landing page | ✓ |
| Spec 02 Sign up / Log in | ✓ |
| Spec 03 Directorio + filtros | ✓ |
| Spec 04 Perfil profesional público | ✓ |
| Spec 05 Dashboard con role toggle | ✓ |
| Spec 06 Onboarding profesional | ✓ |
| Spec 07 Chat básico | ✓ |


- [x] Spec 07 Chat básico — visual aprobado ✓

---

## Spec DS-07 — Tipografía y layout global

### Tipografía

| Uso | Fuente | Fuente alternativa |
|-----|--------|--------------------|
| Titulares (h1, h2, hero) | Plus Jakarta Sans | system-ui |
| Cuerpo, UI, componentes | DM Sans | system-ui |

Ambas via `next/font/google` — zero layout shift, carga optimizada.

```ts
// app/layout.tsx
import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})
```

Tokens:
```css
--font-sans: 'DM Sans', system-ui, sans-serif;
--font-display: 'Plus Jakarta Sans', system-ui, sans-serif;
```

---

### Layout global

| Token | Valor | Uso |
|-------|-------|-----|
| `--max-width` | `1024px` | Contenedor máximo en desktop |
| `--padding-mobile` | `16px` | Padding lateral mobile |
| `--padding-desktop` | `24px` | Padding lateral desktop |
| Densidad visual | Aireada | Mucho espacio entre elementos — transmite calma y confianza |

```css
.container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--padding-mobile);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--padding-desktop);
  }
}
```