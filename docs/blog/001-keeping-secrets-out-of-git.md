# Security by Design: Keeping API Tokens Out of Git with a 3-Layer Setup

*Part of the #BuildingInPublic series on HandyFEM, a platform for women in the skilled trades.*

When you build a product whose entire reason to exist is safety, security can't be something you bolt on later. It has to be a default — baked into the workflow before the first feature ships. So before I wrote any application code for HandyFEM, I set up how the project handles secrets.

This post walks through that setup: a deliberate, three-layer approach to making sure an API token never ends up in version control. The star of the show is a Git **pre-commit hook**, which I'll explain from scratch in case you haven't used one.

## The problem

Leaking credentials into a Git repository is one of the most common and most damaging mistakes in software. Once a token is committed, it's in the history — even if you delete it in a later commit, it's still recoverable. Bots scan public repos for exactly this. The fix is well known: secrets belong in environment variables, never in the code.

Knowing the rule isn't enough, though. Rules get broken by accident — a token pasted into a config file "just to test it," a generated script that ships with a credential field. So instead of relying on discipline alone, I designed the project so that **the tooling enforces the rule for me.** That means layers.

## Defense in depth

No single control should be the only thing standing between you and a leak. I use three layers, each catching what the previous one might miss:

1. **`.gitignore`** — prevention: keep secret-bearing files out of Git entirely.
2. **A `pre-commit` hook** — detection: scan every commit for secrets and block it if one slips through.
3. **Environment variables** — design: keep secrets out of the codebase in the first place.

Let's go through them.

### Layer 1 — `.gitignore` (prevention)

The first line of defense is telling Git which files to never track. My `.gitignore` ignores anything that holds real credentials:

```gitignore
# Environment variables (real secrets)
.env
.env.*
!.env.example
```

The `.env.*` pattern covers `.env.local`, where the real values live. The `!.env.example` exception keeps a **template** in the repo — a documented list of which variables are needed, with empty values — so anyone (including future me) knows what to fill in without ever seeing a secret.

This layer is great, but it only protects files I remember to ignore. What if a token ends up somewhere unexpected — say, hardcoded inside a script? That's where layer 2 comes in.

### Layer 2 — the `pre-commit` hook (detection)

A **Git hook** is a script that Git runs automatically at a specific moment in your workflow. You don't call it — Git does. Think of it as a guard at a door: every time someone tries to pass, the guard checks first.

A `pre-commit` hook runs *right before* a commit is created:

```
You run:  git commit
     │
     ▼
Git runs the pre-commit hook   ← automatic
     │
     ├─ secret found?   → ❌ commit is blocked
     │
     └─ all clean?      → ✅ commit proceeds
```

Mine scans the files staged for commit and looks for patterns that match real credentials — Atlassian tokens, AWS keys, private keys, and so on. If it finds one, it stops the commit and tells me where. Here's the core of it:

```bash
#!/usr/bin/env bash
set -euo pipefail

# Files staged for this commit (added/copied/modified only)
files=$(git diff --cached --name-only --diff-filter=ACM)
[ -z "$files" ] && exit 0

# Patterns for real secrets (extended regex)
patterns='ATATT[A-Za-z0-9_=-]{16,}|AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{20,}|-----BEGIN [A-Z ]*PRIVATE KEY-----'

found=0
while IFS= read -r f; do
  [ -n "$f" ] || continue
  content=$(git show ":$f" 2>/dev/null || true)
  if printf '%s' "$content" | grep -nEq "$patterns"; then
    echo "❌ Possible secret in: $f"
    found=1
  fi
done <<< "$files"

if [ "$found" -ne 0 ]; then
  echo "🛑 Commit blocked: secrets detected in staged files."
  exit 1   # a non-zero exit code aborts the commit
fi
```

A couple of things worth knowing:

- **The exit code is everything.** If a `pre-commit` hook exits non-zero, Git aborts the commit. That single line (`exit 1`) is what makes the guard real.
- **I keep the hook in the repo.** Git's default hooks live in `.git/hooks/`, which isn't versioned — so it wouldn't travel with the project. Instead I store mine in a tracked `.githooks/` folder and point Git at it:

  ```bash
  git config core.hooksPath .githooks
  ```

  Now the hook is part of the project, reviewed like any other code.
- **There's an escape hatch.** `git commit --no-verify` skips hooks. Useful for false positives — but only when you're certain there's no secret.

### Layer 3 — environment variables (design)

The first two layers stop secrets from being committed. The third makes sure they're not in the code to begin with. Any script that needs a credential reads it from the environment, never from a literal:

```js
const CONFIG = {
  apiToken: process.env.JIRA_API_TOKEN, // read from .env.local, never written here
}

// Fail fast if the credential isn't loaded
if (!CONFIG.apiToken) {
  console.error("Missing JIRA_API_TOKEN. Run with: node --env-file=.env.local script.js")
  process.exit(1)
}
```

On modern Node (20.6+), you don't even need a dependency like `dotenv` — the built-in `--env-file` flag loads your `.env.local` for you:

```bash
node --env-file=.env.local script.js
```

The real value lives only in `.env.local`, which layer 1 keeps out of Git. The code ships with a reference to a variable name — nothing sensitive.

## Seeing it work

The best way to trust a safety net is to test it. Drop a line shaped like a real Atlassian token (`ATATT3x…` followed by the rest) into a throwaway `leak-test.js`, then stage and try to commit:

```bash
git add leak-test.js
git commit -m "test"
# ❌ Possible secret in: leak-test.js
# 🛑 Commit blocked: secrets detected in staged files.
```

The commit never happens. Delete the test file and you're back to a clean state — with proof the guard works.

## Takeaway

Security isn't a single checkbox; it's layers, and it works best when the tooling — not your memory — enforces the rules. For a project like HandyFEM, where trust is the product, setting this up before the first feature wasn't over-engineering. It was the starting line.

Three small pieces of configuration — an ignore rule, a hook, and an environment variable — and a whole category of mistakes simply can't happen.

---

*Follow the build: #BuildingInPublic #HandyFEM #WebDev #Security #Git*
