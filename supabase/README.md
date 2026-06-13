# Supabase — migrations & workflow

Migrations live in `supabase/migrations/`, named `<timestamp>_<description>.sql`
(the Supabase CLI's 14-digit `YYYYMMDDHHMMSS` format). **RLS is part of every
migration** — a table without a tested policy is a bug (see `CLAUDE.md`). After
applying any migration, prove the policies with the negative-case harness:

```
node --env-file=.env.local scripts/rls-test.mjs
```

The harness uses the Supabase keys already in `.env.local` (URL + publishable +
secret). It does **not** need a Postgres connection string.

---

## One-time CLI setup

The auth-slice migrations were first applied by hand (SQL Editor), so the CLI
doesn't yet know about them. This sequence installs the CLI, links the project,
and tells the CLI those migrations are already live so it won't re-run them.

```bash
# 1. Install
brew install supabase/tap/supabase

# 2. Generate supabase/config.toml (leaves existing migrations untouched). Commit it.
supabase init

# 3. Authenticate (opens a browser)
supabase login

# 4. Link this repo to the remote project.
#    PROJECT_REF = the reference id in Dashboard → Project Settings → General.
supabase link --project-ref <PROJECT_REF>

# 5. Mark the already-applied migrations as applied (no re-run).
supabase migration repair --status applied \
  20260611000001 20260611000002 20260613000001 20260613000002
```

After this, `supabase db push` and `supabase migration list` show a clean,
fully-applied history.

---

## Applying new migrations (the normal workflow)

```bash
supabase db push        # applies every migration not yet in the remote history
node --env-file=.env.local scripts/rls-test.mjs   # then prove RLS
```

`supabase db push` reads its credentials from `~/.supabase` (set by `login` +
`link`), never from `.env.local`.

---

## Fallback without the CLI (psql)

Add the **Session pooler** URI (Dashboard → Connect → Session pooler) to
`.env.local` as `SUPABASE_DB_URL`, unquoted, then:

```bash
psql "$(grep -E '^SUPABASE_DB_URL=' .env.local | sed -E 's/^[^=]*=//' | tr -d '"\r')" \
  -f supabase/migrations/<file>.sql
```

Or, simplest of all, paste a file into the dashboard SQL Editor:
`pbcopy < supabase/migrations/<file>.sql` → paste → Run.
