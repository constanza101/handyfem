# HandyFEM — MVP Plan & Security Notes

App for tradeswomen (mujeres en oficios — electricistas, fontaneras, carpinteras, soldadoras, mecánicas, técnicas HVAC, construcción, reformas, pintura, instalaciones, mantenimiento).

**Status:** Specs completas — en desarrollo activo
**Last updated:** 2026-05-29

---

## 0. Decisiones tomadas — kickoff completado

Las preguntas pendientes de la fase de idea están resueltas:

| Pregunta | Decisión |
|----------|----------|
| ¿Qué es HandyFEM? | Marketplace / directorio — clientas encuentran profesionales, contacto directo |
| ¿Para quién? | Dos lados: tradeswomen (oferta) + clientas que las contratan (demanda) |
| ¿Geografía inicial? | Barcelona y alrededores → España → LATAM |
| ¿Monetización? | MVP sin monetización. v2: freemium con visibilidad destacada + formación |
| ¿Web o móvil? | PWA mobile-first (web responsive que se instala como app) |
| ¿Idioma? | Castellano en MVP. Multi-idioma en v2 |
| ¿Roles? | Una cuenta, rol base clienta, activa perfil profesional desde dashboard (Opción C) |

---

## 1. Filosofía y diferenciación

Una app para mujeres en oficios **no es una app neutral**. La barra de seguridad y privacidad tiene que ser visiblemente más alta que cualquier marketplace genérico, porque:

- Las tradeswomen son una minoría histórica en sus sectores → ya enfrentan acoso laboral real.
- Una app pública que combine **identidad + oficio + zona + foto** es atractiva para acosadores si no se diseña con cuidado.
- El diferenciador del producto NO es "Yelp pero rosa" — es **"el espacio digital donde una tradeswoman se siente segura para mostrarse y trabajar"**.

Si la arquitectura no refleja esto, el producto no tiene razón de ser.

---

## 2. OWASP Top 10 aplicado a HandyFEM

### A01 — Broken Access Control
- Toda lectura/escritura de datos personales valida **en el backend** que el usuario logueado es el dueño / tiene permiso
- Nunca confiar en checks del frontend solamente — un atacante salta el frontend
- IDs de recursos en URLs son UUIDs aleatorios, no autoincrementales (evita ataques de enumeración)
- Supabase RLS (Row Level Security) habilitado en todas las tablas — nunca una tabla sin política

### A02 — Cryptographic Failures
- HTTPS obligatorio en todas las rutas (Vercel lo da automático)
- Passwords: Supabase Auth usa bcrypt internamente — no rollear auth propia
- Tokens de sesión: cookies `httpOnly` + `Secure` + `SameSite=Strict` via Supabase + Next.js middleware
- Datos sensibles en DB (si aplica): encriptados at-rest — Supabase lo gestiona a nivel de infraestructura

### A03 — Injection
- Supabase usa prepared statements internamente — nunca concatenar input en queries manuales
- React escapa automáticamente — nunca usar `dangerouslySetInnerHTML` con input externo
- Configurar `Content-Security-Policy` header en `next.config.js`
- Validación de esquema con **zod** en todas las API routes y server actions

### A04 — Insecure Design
- Sistema de **reviews**: solo después de servicio verificado (status "Completado" en el chat), derecho a réplica de la profesional, moderación habilitada en v2
- Sistema de **mensajería**: diseñado asumiendo que habrá acoso — reports one-click, escalation rápida
- **Threat modeling** antes de codear features sensibles (mensajería, reviews, fotos)

### A05 — Security Misconfiguration
- Nada de `console.log` con datos sensibles en producción
- Stack traces nunca visibles al usuario — error boundaries genéricos en UI
- Default deny en CORS, en Supabase Storage buckets, en API routes
- Variables de entorno NUNCA commiteadas — `.env.local` en `.gitignore` desde el día 1
- Supabase buckets de fotos: privados por defecto, URLs firmadas con expiración

### A06 — Vulnerable Components
- `npm audit` en CI antes de cada deploy (GitHub Actions)
- Dependabot habilitado en GitHub
- Auditar antes de añadir cualquier dependencia: ¿necesaria? ¿mantenida? ¿qué permisos pide?

### A07 — Identification and Authentication Failures
- **NO rollear auth propia** — Supabase Auth
- **2FA obligatorio para profesionales** al activar perfil (no opcional)
- Rate limiting en login: 5 intentos, después captcha — Supabase lo gestiona + middleware adicional
- Sesiones máximas 30 días con refresh token
- Google OAuth para reducir fricción de registro

### A08 — Software and Data Integrity Failures
- Subida de archivos: validar tipo MIME en el servidor, no en el cliente. Renombrar archivos al guardar en Supabase Storage
- Límite de tamaño: 5MB por foto
- Formatos permitidos: JPG, PNG, WebP únicamente
- CI/CD: no permitir merge de PRs sin review (branch protection en GitHub)
- Validación de schema con **zod** antes de cualquier escritura en DB

### A09 — Security Logging and Monitoring Failures
- Loguear: logins exitosos/fallidos, cambios de password, reports/blocks, activación de perfil profesional
- NO loguear: passwords, tokens, contenido de mensajes privados
- Herramienta: **Better Stack** o **Logtail** (tier gratuito suficiente para MVP)
- Sentry para error tracking desde el día 1
- Alertas para: pico de logins fallidos, pico de reports a una misma usuaria

### A10 — Server-Side Request Forgery (SSRF)
- Si la app fetches URLs externas (link previews, importar fotos): whitelist de dominios permitidos
- Bloquear IPs privadas (10.x, 192.168.x, 127.0.0.1)
- No proxy automático de URLs entregadas por el usuario

---

## 3. Privacidad por diseño

### Datos de ubicación
- **Nunca exponer dirección exacta** de una tradeswoman al público
- Mostrar: zona / ciudad / radio aproximado
- Internamente guardar ciudades donde trabaja (array), nunca coordenadas exactas en MVP
- v2: permitir a la usuaria mover el "centro" de su zona (estilo Strava privacy zones)

### Datos de contacto
- **Nunca mostrar email/teléfono real** al público
- Canal principal: mensajería interna de HandyFEM
- v2: número enmascarado con Twilio Proxy si se añade contacto telefónico

### Identidad — qué se muestra al público
| Dato | Público | Privado |
|------|---------|---------|
| Nombre | ✅ (o pseudónimo) | — |
| Foto de perfil | ✅ (opcional) | — |
| Especialidad | ✅ | — |
| Ciudad/zona | ✅ (aproximada) | — |
| Portfolio | ✅ | — |
| Valoraciones | ✅ | — |
| Email | ❌ | Solo sistema |
| Teléfono | ❌ | Solo sistema |
| DNI/docs | ❌ | Solo moderación |
| Dirección real | ❌ | Nunca se guarda |
| Fecha nacimiento | ❌ | Opcional, privado |

### GDPR / LOPDGDD (España)
- Política de privacidad detallada y en castellano claro — no legalese
- Consent flow por cada uso de datos (no un solo "acepto todo")
- **Right to be forgotten implementado en código**: usuario pide borrado → script real que elimina datos (no solo flag `deleted=true`)
- Notification de breach al AEPD en 72h — tener proceso documentado
- Registro de actividades de tratamiento (Art. 30 GDPR)
- Cookie banner GDPR-friendly — usar Cloudflare Web Analytics o Plausible (privacy-first, sin consent banner)

### Block / Report
- **Block**: bidireccional, instantáneo, sin que el bloqueado lo sepa
- **Report**: one-click, categorizado (acoso, contenido inapropiado, fraude, suplantación)
- Siempre llega a moderación — en MVP: email a la fundadora. En v2: panel de admin
- Response time SLA: <24h en MVP
- Escalation a autoridades si hay amenazas creíbles — tener protocolo escrito

---

## 4. Stack — confirmado

| Capa | Decisión | Razón |
|------|----------|-------|
| Framework | Next.js 14 (App Router) | SSR para SEO del directorio, API routes, Vercel deploy |
| Backend / DB | Supabase | Auth + PostgreSQL + Realtime + Storage en uno |
| Estilos | Tailwind CSS | Estándar del mercado, rápido |
| Componentes | shadcn/ui | Accesible, sin estilos impuestos, código propio |
| Iconos | Tabler Icons | Libre, completo, consistente |
| Hosting | Vercel | Deploy automático desde GitHub, HTTPS automático |
| Email transaccional | Resend + React Email | Gratuito hasta 3.000/mes, emails on-brand |
| Error tracking | Sentry | Gratis en tier hobby |
| Logs | Better Stack | Tier gratuito suficiente para MVP |
| Analytics | Plausible o Cloudflare Web Analytics | Privacy-first, sin consent banner |
| Validación | zod | Type-safe, integra con React Hook Form |

**Principios aplicados:**
- No rollear auth propia — Supabase Auth
- Vendors con DPA disponible para GDPR
- Empezar simple, migrar si crece

**Para v2 (no en MVP):**
- Twilio Proxy para enmascaramiento de teléfono
- Stripe Connect para pagos
- ClamAV o servicio gestionado para escaneo de archivos subidos

---

## 5. MVP scope — confirmado

### ✅ Entra en MVP v1

| Feature | Notas |
|---------|-------|
| Landing page | SSR, SEO, Open Graph general |
| Sign up / Log in | Email + Google OAuth, verificación de email, 2FA para profesionales |
| Directorio público | Búsqueda por especialidad + ciudad, filtros, SSR para SEO |
| Perfil profesional público | URL amigable, Open Graph personalizado por perfil, Schema.org |
| Dashboard unificado | Role toggle clienta/profesional |
| Onboarding profesional | 4 pasos, portfolio, ciudades de trabajo |
| Chat básico | Realtime con Supabase, status de servicio |
| Block / Report básico | One-click, llega a email de moderación |
| PWA installability | manifest.json, iconos, splash screen, `next-pwa` |
| Privacy policy + ToS | En castellano, GDPR-compliant |
| Emails transaccionales | Verificación, bienvenida, notificación de mensaje nuevo |

### ❌ No entra en MVP (v2)

| Feature | Razón |
|---------|-------|
| Admin panel de moderación | Complejidad alta, en MVP modera la fundadora |
| Pagos in-app | Requiere Stripe Connect + compliance fiscal |
| Geolocalización / mapa | Privacidad compleja, v1.5 con mapa de resultados |
| Botón de emergencia | Feature crítica de seguridad — hacerla bien o no hacerla |
| Notificaciones push | PWA + Supabase Realtime es suficiente para MVP |
| Multi-idioma | Castellano primero, validar demanda antes |
| App nativa iOS/Android | Web responsive primero |
| Videollamadas | No es el canal principal |
| Comunidad / foros | Después de tener masa crítica de usuarias |
| Chat grupal | Complejidad de moderación alta |
| KYC avanzado (documentos) | Verificación básica en MVP, KYC en v2 |
| Número enmascarado | Twilio Proxy en v2 |

---

## 6. Features adicionales de alto impacto (v1.5)

Identificadas durante la planificación — no en MVP pero muy cerca:

- **Open Graph personalizado por perfil** — cada profesional comparte su URL con preview de foto + nombre + especialidad. Cada profesional es embajadora sin esfuerzo
- **URL amigable por perfil** — `handyfem.com/maria-lopez-electricista-barcelona` — indexable, compartible, presencia digital propia
- **Schema.org en perfiles** — rich snippets en Google con nombre + valoración + ciudad
- **Onboarding guiado post-registro** — 3 pasos la primera vez que entras, reduce abandono
- **Vista de mapa en directorio** — toggle lista / mapa con Mapbox
- **Toggle de vista en directorio** — lista / grid según preferencia

---

## 7. Documentación del proyecto

| Archivo | Contenido |
|---------|-----------|
| `docs/handyfem-specs.md` | Specs completas DS + 7 pantallas MVP |
| `docs/mvp-plan.md` | Este archivo — seguridad, privacidad, decisiones |
| `docs/handyfem-claude-code-prompt.md` | Prompt para Claude Code |

---

## 8. Setup checklist — antes de escribir código

- [ ] Crear repo GitHub con branch protection en `main`
- [ ] `.gitignore` con `.env.local` desde el día 1
- [ ] GitHub Actions: `npm audit` + tests en cada PR
- [ ] Dependabot habilitado
- [ ] Sentry configurado
- [ ] Supabase: RLS habilitado en todas las tablas desde el inicio
- [ ] Supabase Storage: buckets privados por defecto
- [ ] Vercel: preview branches habilitadas
- [ ] Dominio configurado con HTTPS automático
- [ ] `next-pwa` configurado para PWA installability
- [ ] Resend configurado para emails transaccionales

---

## 9. Referencias

- [OWASP Top 10 (2021)](https://owasp.org/Top10/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [GDPR / AEPD recursos en castellano](https://www.aepd.es/)
- [Supabase RLS docs](https://supabase.com/docs/guides/auth/row-level-security)
- [next-pwa](https://github.com/shadowwalker/next-pwa)
- [Resend + React Email](https://resend.com/docs/send-with-nextjs)
- [Sentry Next.js](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- Apps de referencia: Brigad (Francia) — KYC y matching, Vinted — mensajería + número enmascarado, Wallapop — block + reporting flows

---

## 10. Identidad, género e inclusión

### Decisión de diseño — sin género como campo obligatorio

HandyFEM no pide género en el registro ni en el perfil. La plataforma atrae a quien tiene que atraer por su nombre, tono y propósito — no por una casilla.

La verificación se hace sobre el **oficio y la experiencia**, no sobre la identidad de género. Esto resuelve el problema de personas trans sin convertirlo en un tema — simplemente no es un tema.

### Campos de identidad en el perfil

| Campo | Obligatorio | Notas |
|-------|-------------|-------|
| Nombre profesional | ✅ | El nombre que usa en su trabajo — no tiene que ser el legal |
| Pronombres | ❌ opcional | ella/él/elle y texto libre |
| Foto de perfil | ❌ opcional | Nunca obligatoria |
| Especialidad | ✅ | El oficio, no la persona |

### Marco legal

No excluimos formalmente a nadie. El nombre, el tono y el propósito de HandyFEM determinan quién se apunta — igual que AllWomen Tech, que es una empresa para mujeres sin prohibir la entrada a hombres. Antes del lanzamiento público hay que revisar con asesoría legal cómo articular esto en los ToS.

---

## 11. Seguridad real vs seguridad prometida

### Lo que HandyFEM NO promete en el MVP

HandyFEM **no garantiza la seguridad física** de las profesionales. No hay botón de emergencia, no hay geolocalización en tiempo real, no hay protocolo de respuesta ante incidentes físicos.

Prometlo que no existe es más peligroso que no tenerlo.

### Lo que HandyFEM SÍ ofrece desde el MVP

**Herramientas de decisión informada:**
- Historial de la clienta visible para la profesional antes de aceptar un trabajo — cuántos servicios ha contratado, valoraciones de profesionales anteriores
- Perfiles verificados — la clienta es quien dice ser
- Sistema de block/report one-click

**Comunidad como mecanismo de seguridad:**
- Las profesionales pueden avisarse entre sí sobre clientas problemáticas
- Red de apoyo horizontal — no depende de la plataforma, depende de las personas
- Espacio para compartir experiencias sin exposición pública

### Geolocalización — decisión explícita

**No se implementa geolocalización en tiempo real en el MVP.** Razón: si algo falla — un bug, una brecha, una feature mal implementada — puede exponer la ubicación exacta de una mujer a alguien que no debería tenerla. El riesgo no es hipotético.

Lo que sí se implementa de forma segura:
- Ciudades donde trabaja — declaradas por ella, sin coordenadas
- Zona aproximada en el perfil público — nunca dirección exacta

Geolocalización en tiempo real, modo acompañada y botón de alerta van en v2, cuando la plataforma tenga madurez y comunidad suficiente para sostenerlos bien.

---

## 12. Go-to-market — estrategia de lanzamiento

### El problema del marketplace de dos lados

Sin profesionales, las clientas no encuentran lo que buscan y se van. Sin clientas, las profesionales no reciben contactos y se van. Hay que resolver el lado de la oferta primero.

### Estrategia de oferta — conseguir las primeras profesionales

**Canal principal: FPs y escuelas de oficios**
- Las FPs son donde están las mujeres formándose en oficios ahora mismo
- Si HandyFEM llega antes de que terminen el ciclo formativo, las acompañamos desde el inicio
- Acción concreta: identificar FPs en Barcelona con ciclos de electricidad, fontanería, construcción, y presentar HandyFEM como salida laboral digital

**Canal secundario: comunidades ya existentes**
- Grupos de WhatsApp, Telegram, Instagram de mujeres en oficios en España
- No empezar desde cero — integrarse en redes que ya existen
- Comunidades de AllWomen, asociaciones de mujeres autónomas, cooperativas locales

**Canal B2B (a explorar en paralelo):**
- Empresas de construcción, estudios de arquitectura, cooperativas de mantenimiento que quieren contratar mujeres
- El argumento de venta es directo: "Aquí encontráis candidatas verificadas"
- Ciclo de decisión más predecible que el mercado de autónomas
- Posible antes de tener app — un directorio simple en Notion o Airtable valida la demanda

### Las primeras 10 profesionales

La pregunta más importante antes del lanzamiento: **¿quiénes son las primeras 10 profesionales que van a confiar en HandyFEM?**

No las primeras 100. Las primeras 10. Identificarlas, hablar con ellas, entender sus miedos y sus necesidades. Son las que validan la plataforma, dejan las primeras valoraciones y recomiendan a otras.

### Comunicación — tono y posicionamiento

No hacer hincapié en la seguridad como feature principal. No prometer lo que no se puede garantizar.

El mensaje es:
- **Para profesionales:** "Visibilidad digital que antes no tenías. Una red que te cuida."
- **Para clientas:** "Encuentra a la profesional que necesitas. Con confianza."

---

## 13. Riesgos identificados y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Pocas profesionales al lanzar | Alta | Alto | Reclutamiento manual previo al launch, canal FPs |
| Una profesional sufre una mala experiencia | Media | Muy alto | Block/report desde día 1, comunidad de apoyo, no prometer seguridad que no existe |
| Burnout de la fundadora | Alta | Alto | MVP pequeño, scope acotado, documentar todo para poder delegar |
| Marco legal del género | Media | Medio | Asesoría legal antes del lanzamiento público, ToS bien redactados |
| Plataforma grande copia el modelo | Baja | Medio | La ventaja no es tecnológica — es cultural y comunitaria, difícil de copiar |
| Poco tráfico orgánico al inicio | Alta | Medio | SEO desde el día 1 (SSR + Schema.org + URLs amigables), contenido en blog/redes |

---

## 14. Notas en curso

*(Espacio para apuntes futuros)*