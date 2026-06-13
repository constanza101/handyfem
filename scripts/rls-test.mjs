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

  // ── specialties (public lookup) ──────────────────────────────────────────
  const { data: specs } = await anon.from("specialties").select("id, slug")
  check("anon reads specialties (public lookup)", (specs ?? []).length > 0)

  const { error: specWriteErr } = await asA
    .from("specialties")
    .insert({ name: "Rogue", slug: `rogue-${Date.now()}` })
  check("authenticated user cannot insert specialties", specWriteErr !== null)

  const specialtyId = specs?.find((s) => s.slug === "electricidad")?.id ?? specs?.[0]?.id

  // ── professional_profiles (public storefront) ────────────────────────────
  const asB = await signedInClient(userB)

  // Owner creates her own profile, as a draft (is_published defaults false)
  const { data: ppA } = await asA
    .from("professional_profiles")
    .insert({
      profile_id: userA.id,
      slug: `rls-a-${Date.now()}`,
      specialty_id: specialtyId,
      professional_name: "Pro A",
      bio: "x".repeat(60),
      work_cities: ["Barcelona"],
    })
    .select("id")
    .single()
  check("owner creates own professional_profile (draft)", !!ppA?.id)

  // NEGATIVE: anon cannot see a draft
  const { data: anonDraft } = await anon
    .from("professional_profiles")
    .select("id")
    .eq("id", ppA.id)
  check("anon cannot read unpublished professional_profile", (anonDraft ?? []).length === 0)

  // Owner can see her own draft
  const { data: ownDraft } = await asA
    .from("professional_profiles")
    .select("id")
    .eq("id", ppA.id)
  check("owner reads own draft profile", ownDraft?.length === 1)

  // NEGATIVE: A cannot create a profile owned by B
  const { error: forgeErr } = await asA
    .from("professional_profiles")
    .insert({
      profile_id: userB.id,
      slug: `rls-forge-${Date.now()}`,
      specialty_id: specialtyId,
      professional_name: "Forged",
      bio: "y".repeat(60),
      work_cities: ["Barcelona"],
    })
    .select("id")
  check("user A cannot create a profile owned by user B", forgeErr !== null)

  // NEGATIVE: owner cannot self-grant verified (column privilege, not RLS)
  const { error: verifyErr } = await asA
    .from("professional_profiles")
    .update({ verified: true })
    .eq("id", ppA.id)
    .select("id")
  check("owner cannot self-set verified", verifyErr !== null)

  // Owner publishes her own profile
  const { data: published } = await asA
    .from("professional_profiles")
    .update({ is_published: true })
    .eq("id", ppA.id)
    .select("id")
  check("owner can publish own profile", published?.length === 1)

  // Anon now reads the published profile
  const { data: anonPub } = await anon
    .from("professional_profiles")
    .select("id")
    .eq("id", ppA.id)
  check("anon reads published professional_profile", anonPub?.length === 1)

  // NEGATIVE: B cannot update A's profile
  const { data: bUpdate } = await asB
    .from("professional_profiles")
    .update({ bio: "hacked" })
    .eq("id", ppA.id)
    .select("id")
  check("user B cannot update user A's profile", (bUpdate ?? []).length === 0)

  // NEGATIVE: owner cannot delete her profile via the API (GDPR script only)
  const { data: ppDeleted } = await asA
    .from("professional_profiles")
    .delete()
    .eq("id", ppA.id)
    .select("id")
  check("owner cannot delete professional_profile via API", (ppDeleted ?? []).length === 0)

  // ── portfolio_photos ─────────────────────────────────────────────────────
  const { data: photo } = await asA
    .from("portfolio_photos")
    .insert({ professional_id: ppA.id, storage_path: `a/${crypto.randomUUID()}.jpg`, position: 0 })
    .select("id")
    .single()
  check("owner adds portfolio photo to own profile", !!photo?.id)

  // NEGATIVE: B cannot add a photo to A's profile
  const { error: photoForgeErr } = await asB
    .from("portfolio_photos")
    .insert({ professional_id: ppA.id, storage_path: `b/${crypto.randomUUID()}.jpg`, position: 0 })
    .select("id")
  check("user B cannot add a photo to user A's profile", photoForgeErr !== null)

  // Anon reads a photo of a published profile
  const { data: anonPhoto } = await anon
    .from("portfolio_photos")
    .select("id")
    .eq("id", photo.id)
  check("anon reads photo of published profile", anonPhoto?.length === 1)
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
