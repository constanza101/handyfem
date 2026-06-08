# HandyFEM — Instructions for Claude Code

An app for women in the skilled trades (tradeswomen). Phase: early development —
the project is scaffolded and we're building the design system.
Documentation lives in [docs/](docs/).

## Language

- **Document everything in English** — all docs, code comments, commit messages,
  file contents, and file names. English is the default for the entire project.
- **Reply to me in English**, even when I write in Spanish (or a mix). I may write
  in Spanish, English, or both at once; that never changes your output language.

## How to work on this project

### Tasks doable from the command line
When I ask for something that can be solved in the terminal (moving/renaming
files, `git status`, listing, etc.):

1. **Do it yourself the first time** — no friction for me.
2. **Append the equivalent command at the end of your reply**, so next time I can
   run it myself without spending AI tokens.

I'm cost-conscious about tokens: repeating mechanical operations through the
agent wastes tokens (the full context is re-sent every turn), whereas a
copy-paste command I run in my own terminal costs nothing.

Tasks that require judgment (reviewing code, debugging, architectural decisions)
are different — there the value is in the reasoning, so just do them directly.

## Secrets
- The Jira scripts (`docs/handyfem-jira-*.js`) read credentials from environment
  variables (`JIRA_EMAIL`, `JIRA_API_TOKEN`) — the token is never written in the code.
- Real credentials live in `.env.local` (git-ignored, never commit). The public
  template is `.env.example`.
- Run the scripts from the project root, loading `.env.local` natively (Node 20.6+):
  `node --env-file=.env.local docs/handyfem-jira-sprints.js`
- Defense in depth is active: `.gitignore` (prevention) + the `.githooks/pre-commit`
  hook (detection at commit time). Pending: secret scanning in CI before deploy.
- Heads-up: if a Jira script is re-downloaded, it comes back with the token
  hardcoded → the `process.env` read has to be re-applied.

## Security — ALWAYS follow these rules

- NEVER write tokens, passwords, API keys, or secrets in the code.
- NEVER modify or read `.env.local`, `.env`, or any environment-variable file.
- If you need a sensitive value (token, key, private URL), give me the exact
  instructions so I add it manually.
- All secrets go in `.env.local` — never in files that could be committed.
- If you spot a hardcoded secret in existing code, warn me before touching it.
- Never print or reproduce a secret in chat or terminal output — ask me, or give
  me instructions instead.

## Project context

HandyFEM is a mobile-first PWA marketplace for women in the skilled trades.
Stack: Next.js 16 + React 19 + Tailwind v4 + shadcn/ui + Supabase + Vercel.
Full specs: docs/handyfem-specs.md
Project plan: docs/mvp-plan.md
Product decisions: docs/product-decisions.md

⚠️ **Next.js 16 has breaking changes** vs earlier versions (APIs, conventions,
structure) — newer than typical training knowledge. Before writing Next code,
consult the docs for THIS version, bundled in the project at
`node_modules/next/dist/docs/` (01-app, 02-pages, 03-architecture).
Tailwind v4: config lives in CSS (`@theme` in app/globals.css), not in tailwind.config.

## Conventions

- **Styling with Tailwind v4 (utility-first) — confirmed decision.** In HandyFEM,
  components are styled with Tailwind utility classes directly in the markup
  (including responsive spacing: `pb-8 md:pb-12`, etc.), backed by shadcn/ui.
  We do NOT use the Borrissol pattern (scoped CSS + a custom design system in
  `theme.css`): they're different projects with deliberately different approaches.
  Here, Tailwind is the choice for UI iteration speed and for shadcn/ui. Tokens
  (colors, etc.) live in `@theme` inside `app/globals.css`.
- Mobile first — single breakpoint at 768px.
- Color tokens in globals.css — never hardcode hex values in components.
- Validate with zod in every API route.
- Accessibility: 44px min-height on interactive elements, aria-labels, focus rings.
- Always `@media (hover: hover)` for hover effects.
- Always respect `prefers-reduced-motion` in animations.
