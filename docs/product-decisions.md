# HandyFEM — Product decisions

A log of decisions made during the kickoff sessions. Keep what's **decided**
separate from what's still **under discussion** so we don't lose the thread.

Last updated: 2026-06-11

---

## ✅ Decisions made

### Product identity (already in handyfem-specs.md)
- **What it is:** a PWA directory/marketplace of women trade professionals, with a
  **"direct contact, no intermediary"** model (not a booking platform with transactions).
- **Who it's for:** two sides — client (base role) + professional (activatable role).
  One account can hold both roles.
- **Geography:** Spain, filtered by self-declared city (no GPS in the MVP). Launch in Barcelona.
- **Platform:** mobile-first PWA.
- **Language:** Spanish.

### Monetization
- **MVP: 100% free.** No revenue model at launch (priority: reach a critical mass of
  professionals and clients). The revenue model is defined in v2.

### Verification (MVP)
- The **"Verified" badge is the core differentiator** → NOT deferred.
- Only the **technology** is deferred: in the MVP, the first cohort is verified
  **manually** (no storing IDs, no integration, no heavy GDPR burden).
- The **IDV provider integration** (see Didit below) comes in v2, when manual no
  longer scales.

### Plan review — 2026-06-11
- **Reviews are IN the MVP** (client → professional). Public profiles show
  ratings, so the MVP needs the flow that produces them. Gated on the
  both-party "job completed" confirmation, with right of reply for the
  professional.
- **Image storage: buckets private by default, with one deliberate public
  bucket** for portfolio/profile photos (public SSR pages + per-profile Open
  Graph previews need stable URLs; expiring signed URLs would break SEO/OG).
  Server-side MIME/size validation still applies. Provider under discussion
  (see Cloudflare R2 below).
- **2FA for professionals: strongly recommended, not mandatory.** Prompted at
  profile activation; mandatory 2FA is too much friction for the first cohort.
- **PWA installability: likely deferred to v1.5.** If/when implemented, use
  Serwist — `next-pwa` (shadowwalker) is unmaintained and doesn't target
  Next.js 16.
- **Professional → client ratings are IN the MVP** (backs the "client history
  visible before accepting a job" promise in mvp-plan §11). Numeric rating
  only, **no free text** — written notes about a client are a GDPR
  right-of-access and defamation risk with no moderation panel in MVP. Never
  public; visible only to professionals who share a conversation with that
  client. See `client_ratings` in data-model.md.
- **Visual tokens: the tweakcn theme in `app/globals.css` is the source of
  truth** over the hex values written in the DS specs (which predate it).
  Consequences: white text on primary buttons (not cream), no warm neutrals
  (ivory/sand replaced with cool grays), Geist + Bricolage Grotesque fonts,
  4px radius base. The specs doc carries a note at the top of Visual Identity.
- **Component styling layer: stock shadcn/ui** (what tweakcn previews — tweakcn
  exports only tokens, not styles). Inputs/select/checkbox/textarea keep shadcn
  defaults plus 44px touch minimums; focus rings are the stock teal
  `ring-ring/50` everywhere. Custom treatments are reserved for what shadcn
  doesn't define: button variants, badges, chips, the professional card, and
  the Field wrapper.

---

## 🟡 Under discussion / likely direction (not final)

### Image storage provider — Cloudflare R2 vs Supabase Storage
- Candidate: **Cloudflare R2** — ~10 GB storage free and **zero egress fees**,
  vs Supabase free tier (1 GB storage, metered egress). Attractive for an
  image-heavy directory.
- Trade-offs to confirm before deciding: a second vendor and SDK; no RLS
  integration (access control lives in bucket policy / our API routes — fine
  for the public portfolio bucket, more work for private files); needs its own
  GDPR check (DPA, EU data location); uploads go through our API route or
  presigned URLs instead of supabase-js.
- **Default if still undecided when we reach the photos slice:** start with
  Supabase Storage (one vendor, simpler) and migrate to R2 if limits bite.
  Keep image references provider-agnostic in the DB: store **paths/keys, never
  full URLs**, so migration is a config change.

### Monetization model (v2)
- Main idea: **list for free (unverified) + pay to get verified** (Meta Verified style:
  the check is still real, you're charging for the service).
- Possible launch promo: **verification free for the first year** (or free for the
  first cohort) so the badge is born with credibility.
- Professional subscription with a value ladder (ordered by what they value most):
  1. **Visibility** (featured in the directory, ranking higher) — the #1 lever
  2. **Richer profile** (more photos, video, longer bio, links)
  3. **Stats** (profile views, contacts, searches they appear in)
- ⚠️ **Trust/safety is NOT for sale** — verification and trust stay free for everyone.
  You charge for visibility and tools.

### Monetizing WITHOUT being an intermediary (key principle)
**Rule:** monetize the **software and visibility, NOT the transaction.** HandyFEM sells
a marketing/tooling product to professionals; it never touches the money from the job
nor mediates between the parties. This avoids legal liability over the jobs, payment
handling, and disputes.

Models that do NOT turn HandyFEM into an intermediary (ordered by fit):

| Model | How it works | Fit |
|---|---|---|
| **Professional subscription** | Recurring fee for a premium listing + tools (visibility, photos, stats) | ⭐ The best — recurring and clean |
| **Featured listings** | Pay to appear higher / highlighted | ⭐ Fits inside the subscription |
| **Paid verification** | Charge for the verification service (Meta style) | ✅ Possible, with brand care |
| **Partnerships / affiliate** | Commission for recommending insurance, tools, training for tradeswomen | ✅ Secondary and on-brand |
| **Pay per lead/contact** | Pay per contact received, or "credits" to reply | 🟡 Thumbtack/Bark model; creates friction if the lead doesn't convert |

**To avoid:**
- ❌ **Commission per job** → forces the transaction into the app = becoming an
  intermediary + legal liability. Exactly what we DON'T want.
- ❌ **Paywalling safety** → verification/trust stays free for everyone.

In one sentence: **HandyFEM is a visibility and trust platform for professionals,
not an agency that places jobs. It sells the storefront, not the service.**

### Badge system (v2)
Three types, with different rules:
- **A. Verification** (the platform confirms a fact): Identity (ID), Trade/qualification.
  → Can sit behind a payment (you're charging for the verification service).
- **B. Reputation** (earned through behavior): based on reviews, seniority, etc.
  → **NEVER bought**, only earned. If they could be sold, they'd be worthless.
- **C. Status/promo:** "Pioneer" (first professionals), etc. Free, marketing.
- Rules: each badge states **exactly** what it certifies ("identity", not "safe");
  few and clear (the card must build trust in 3 seconds); review-based badges need
  **verified reviews** (only after real contact/service) and anti-fraud.
- **MVP: 1-2 badges max** (Verified identity, maybe Trade). The full system is v2.

### Measuring "closed jobs" (open problem)
- With the "direct contact" model, the platform **doesn't know** whether a job closed
  (it happens off-app). You can't reward "closed jobs" without measuring them.
- Proposed solution (fits without adding transactions):
  - **Reviews** as a proxy for completed work.
  - A lightweight **"job completed" confirmation** by both parties → enables the review
    and counts toward stats. Hard to fake (requires both sides).
- Gamification/rewards: only tied to hard-to-fake signals; this is v2.

---

## 🔴 To research / decide
- **IDENTITY verification (IDV provider for v2):** candidate **Didit** — free tier of
  500 verifications/month, then ~$0.33 for full KYC. Confirm **EU data residency + DPA**
  before committing (GDPR requirement).
- **TRADE/qualification verification:** how it's checked (certificates, self-employed
  registration, references). Undefined.
- **Detailed verification flow:** what the professional sees, what's stored, how the
  badge is granted. The spec marks this "under construction".
- **Reconcile the "direct contact, no intermediary" copy vs privacy** (don't expose real
  phone/email; use internal chat). Adjust the messaging so it doesn't mislead.
