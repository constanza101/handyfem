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

## Git workflow

- **Branch protection is active on `main`** (since 2026-06-11). Never commit or
  push directly to `main`: create a feature branch, push it, open a PR with
  `gh`, and I merge it on GitHub. Run `/code-review` on the branch before
  opening the PR.

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

## Backend & Security — hard rules (Supabase + Next.js)

I'm strongest in frontend; I rely on you to enforce these backend/security rules
proactively — flag violations even when I don't ask.

### Database (Supabase)

- **RLS on every table, no exceptions.** A new table without an enabled, tested
  Row Level Security policy is a bug, not a TODO. Before calling a migration
  done, prove that an anonymous/other-user client cannot read or write rows it
  shouldn't.
- **Ownership in RLS, not just in app code.** Marketplace rule of thumb: users
  read/write only their own listings, bookings, and messages —
  `auth.uid() = owner_id` (or equivalent) in the policy itself.
- **Two Supabase clients, never mixed:** the anon client (browser, RLS-protected)
  and the `service_role` client (server-only, bypasses RLS). The service-role
  client may only be imported in server-only code — never in any file reachable
  from a `"use client"` module.
- **Storage too:** buckets need access policies plus server-side file-type and
  size validation. A public bucket is a deliberate decision, never a default.

### API routes & server actions

- **Never trust the client.** Auth checks, ownership checks, and business rules
  live server-side. Client-sent IDs, prices, and roles are claims to verify, not
  facts.
- **Zod on every input, with `.strict()`** — reject unknown fields, don't just
  validate known ones.
- **Every mutating route: auth check → ownership check → validation → action.**
  If one of those steps is missing, say so before writing the code.
- **Don't leak internals in errors.** Return generic messages to the client; log
  details server-side.
- **Rate-limit auth and write endpoints** (login, signup, listing creation)
  before launch — track this as a pre-launch blocker.

### Workflow

After any feature touching the backend, run this checklist before saying "done":

0. **First-ever Supabase migration?** → before building anything on top of it,
   create the RLS test script (`scripts/rls-test.ts` or similar): queries with
   the anon client and with a second user's client asserting that reads/writes
   outside their ownership are denied. This script becomes the harness for
   rule 1 from then on. **Do not skip this — propose it proactively.**
1. New table? → RLS enabled + policy tested (including the negative case).
2. New data exposed? → confirm the anon client can't read it without auth.
3. New route/action? → zod `.strict()` + auth + ownership checks present.
4. Touches auth, payments, or PII? → run `/security-review` before merge.

Run `/code-review` after meaningful changes without being asked; suggest
`/security-review` whenever a change qualifies under rule 4.

## Project context

HandyFEM is a mobile-first PWA marketplace for women in the skilled trades.
Stack: Next.js 16 + React 19 + Tailwind v4 + shadcn/ui + Supabase + Vercel.
Full specs: docs/handyfem-specs.md
Project plan: docs/mvp-plan.md
Product decisions: docs/product-decisions.md
Data model (tables, RLS access matrix, migration order): docs/data-model.md

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
- **No arbitrary-value utilities** (`p-[13px]`, `text-[#4A7C7D]`, `w-[37px]`).
  They are the Tailwind equivalent of hardcoding. If a value isn't in the
  theme, add it to `@theme` in `app/globals.css` first, then use the generated
  utility. One-off layout measurements with no reusable meaning are the only
  exception — and deserve a comment.
- **Route paths and anchor IDs in English, lowercase** (`/login`, `/dashboard`,
  `#services`) even though the UI is Spanish — matches the specs and keeps one
  canonical slug per resource. Professional profile slugs are **user data**,
  not routes: Spanish is correct there and SEO-positive for the Spanish market
  (`/maria-lopez-electricista-barcelona`).
- Validate with zod in every API route.
- Accessibility: 44px min-height on interactive elements, aria-labels, focus rings.
- Always `@media (hover: hover)` for hover effects.
- Always respect `prefers-reduced-motion` in animations.

## Reuse-first — never copy structure into a third place

Lesson imported from Borrissol: utility-class styling makes duplication
invisible. Two JSX blocks that both use theme utilities pass every "no
hardcoding" rule and still drift apart (one card keeps an old radius after the
others change). Tokens prevent **value** drift; this rule prevents
**structure** drift.

- **Triggers — stop and extract, don't wait for a third copy:**
  - (a) the same section/card/list JSX appears in **2+ files** → extract a
    component now;
  - (b) building several similar screens in one session → build the first,
    extract the shared skeleton, compose the rest from it — never generate
    screen 2 by copy-pasting screen 1;
  - (c) two copies differ only incidentally → assume the differences are
    accidental, verify with the spec before preserving any "variant" (most
    collapse into one).
- Pass per-instance values as **props**; use `children` / composition for the
  one-off exception instead of a pile of boolean flags. If unsure whether two
  things are "identical enough," propose the extraction and its prop shape
  before writing it.
- **Repeated Tailwind class strings are the drift vector.** If the same string
  of utilities expressing one visual pattern shows up in 2+ places, extract a
  component or a `cva` variant (the shadcn/ui pattern). Never rebuild what a
  shadcn/ui component already provides — extend it with variants.

## Verification workflow

- **UI work: guided manual verification.** After a significant UI change,
  don't run test suites on your own — give me the dev server command/URL and
  tell me exactly what to look at and what "correct" looks like. Visual
  accuracy in the browser beats terminal output during the UI build phase.
- **Backend & security: automated tests, always.** RLS negative tests and
  validation tests run without being asked — never "guided manual" for
  security (see Backend & Security). This is the deliberate opposite of the
  UI rule.

## Assets

- Always `next/image` — never a raw `<img>`. Hero/LCP image gets `priority`;
  everything else stays lazy (the default).
- Nothing in `/public/` over 500 KB without written justification. OG images:
  JPG (not PNG), 1200×630, under 300 KB — a Figma PNG export silently eating
  bandwidth is how Borrissol shipped a 4 MB OG image.
- Fonts via `next/font` (self-hosted, WOFF2), only the weights actually used.
- Pre-deploy audit for offenders:
  `find public -type f -exec ls -laS {} + | sort -k5 -n -r | head -10`
