// RLS test harness — CLAUDE.md workflow rule 0.
// Proves what the policies FORBID, not just what they allow.
// Run: node --env-file=.env.local scripts/rls-test.mjs
// Creates two throwaway users, runs the matrix, deletes them. Never prints keys.

import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
const secretKey = process.env.SUPABASE_SECRET_KEY

if (!url || !publishableKey || !secretKey) {
  console.error("Missing Supabase env vars — run with --env-file=.env.local")
  process.exit(1)
}

const NO_SESSION = { auth: { persistSession: false, autoRefreshToken: false } }

const admin = createClient(url, secretKey, NO_SESSION)

const results = []
function check(name, pass, detail = "") {
  results.push({ name, pass })
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`)
}

async function createUser(label) {
  const email = `rls-${label}-${Date.now()}@example.com`
  const password = crypto.randomUUID()
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })
  if (error) throw new Error(`createUser ${label}: ${error.message}`)
  return { id: data.user.id, email, password }
}

async function signedInClient(user) {
  const client = createClient(url, publishableKey, NO_SESSION)
  const { error } = await client.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  })
  if (error) throw new Error(`signIn: ${error.message}`)
  return client
}

let userA, userB
try {
  userA = await createUser("a")
  userB = await createUser("b")

  // Trigger: profiles auto-created on signup
  const { data: created } = await admin
    .from("profiles")
    .select("id")
    .in("id", [userA.id, userB.id])
  check("trigger creates a profile per signup", created?.length === 2)

  // Anonymous (signed-out) client sees nothing
  const anon = createClient(url, publishableKey, NO_SESSION)
  const { data: anonRows } = await anon.from("profiles").select("id")
  check("anon client reads zero profiles", (anonRows ?? []).length === 0)

  const asA = await signedInClient(userA)

  // Owner reads own row
  const { data: own } = await asA
    .from("profiles")
    .select("id")
    .eq("id", userA.id)
  check("owner reads own profile", own?.length === 1)

  // NEGATIVE: A cannot read B
  const { data: other } = await asA
    .from("profiles")
    .select("id")
    .eq("id", userB.id)
  check("user A cannot read user B's profile", (other ?? []).length === 0)

  // NEGATIVE: A cannot update B (0 rows affected)
  const { data: updated } = await asA
    .from("profiles")
    .update({ display_name: "hacked" })
    .eq("id", userB.id)
    .select("id")
  check("user A cannot update user B's profile", (updated ?? []).length === 0)
  const { data: bRow } = await admin
    .from("profiles")
    .select("display_name")
    .eq("id", userB.id)
    .single()
  check("user B's data is unchanged", bRow?.display_name !== "hacked")

  // Owner CAN update own row
  const { data: ownUpdate } = await asA
    .from("profiles")
    .update({ display_name: "legit" })
    .eq("id", userA.id)
    .select("id")
  check("owner updates own profile", ownUpdate?.length === 1)

  // NEGATIVE: no direct inserts (only the trigger creates rows)
  const { error: insertErr } = await asA
    .from("profiles")
    .insert({ id: crypto.randomUUID(), display_name: "rogue" })
  check("authenticated user cannot insert profiles", insertErr !== null)

  // NEGATIVE: no deletes via the API (GDPR erasure is service-role only)
  const { data: deleted } = await asA
    .from("profiles")
    .delete()
    .eq("id", userA.id)
    .select("id")
  check("owner cannot delete own profile via API", (deleted ?? []).length === 0)
} catch (err) {
  console.error("Harness error:", err.message)
  process.exitCode = 1
} finally {
  for (const u of [userA, userB]) {
    if (u) await admin.auth.admin.deleteUser(u.id).catch(() => {})
  }
}

const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
if (failed.length > 0 || results.length === 0) process.exitCode = 1
