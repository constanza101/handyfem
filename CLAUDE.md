# HandyFEM — Instrucciones para Claude Code

App para mujeres en oficios (tradeswomen). Fase: planificación / kickoff.
Documentación en [docs/](docs/).

## Cómo trabajar en este proyecto

### Tareas hacibles por línea de comandos
Cuando la usuaria pida algo que se puede resolver por terminal (mover/renombrar
archivos, `git status`, listar, etc.):

1. **Hazlo tú la primera vez** — sin fricción para ella.
2. **Adjunta el comando equivalente al final de la respuesta**, para que en las
   siguientes ocasiones lo ejecute ella sin gastar tokens de IA.

La usuaria es consciente del coste de tokens: repetir operaciones mecánicas a
través del agente desperdicia tokens (se reenvía todo el contexto cada turno),
mientras que un comando copiable que corre en su terminal cuesta cero.

Las tareas que requieren criterio (revisar código, depurar, decidir
arquitectura) son distintas: ahí el valor está en el razonamiento, así que
hazlas directamente.

## Secretos
- Los scripts de Jira (`docs/handyfem-jira-*.js`) leen las credenciales de
  variables de entorno (`JIRA_EMAIL`, `JIRA_API_TOKEN`) — nunca llevan el token
  en el código.
- Las credenciales reales van en `.env.local` (en `.gitignore`, nunca commitear).
  La plantilla pública es `.env.example`.
- Ejecutar los scripts desde la raíz del proyecto cargando el `.env.local` de
  forma nativa (Node 20.6+):
  `node --env-file=.env.local docs/handyfem-jira-sprints.js`
- Defensa en capas activa: `.gitignore` (prevención) + hook `.githooks/pre-commit`
  (detección al commitear). Pendiente: escaneo de secretos en CI antes de deploy.
- OJO: si se re-descarga un script de Jira, vuelve con el token hardcodeado →
  hay que re-aplicar la lectura desde `process.env`.


## Seguridad — SIEMPRE seguir estas reglas

- NUNCA escribas tokens, passwords, API keys ni secretos en el código
- NUNCA modifiques ni leas archivos .env.local, .env o cualquier archivo de variables de entorno
- Si necesitas un dato sensible (token, key, URL privada), dame las instrucciones exactas para que yo lo añada manualmente
- Todos los secretos van en .env.local — nunca en archivos que puedan ser commiteados
- Si ves un secreto hardcodeado en el código existente, avísame antes de tocarlo

## Contexto del proyecto

HandyFEM es una PWA marketplace para mujeres en oficios técnicos.
Stack: Next.js + Supabase + Tailwind + shadcn/ui + Vercel
Specs completas en: docs/handyfem-specs.md
Plan de proyecto en: docs/mvp-plan.md

## Convenciones

- Mobile first — breakpoint único en 768px
- Tokens de color en globals.css — nunca hardcodear hex en componentes
- Validación con zod en todas las API routes
- Accesibilidad: min-height 44px en elementos interactivos, aria-labels, focus rings
- Siempre @media (hover: hover) para efectos hover
- Siempre prefers-reduced-motion en animaciones