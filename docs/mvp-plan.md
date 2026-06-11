# HandyFEM — MVP Plan & Security Notes

App for tradeswomen (women in the skilled trades — electricians, plumbers, carpenters, welders, mechanics, HVAC technicians, construction, renovations, painting, installations, maintenance).

**Status:** Specs complete — in active development
**Last updated:** 2026-06-11

---

## 0. Decisions made — kickoff completed

The open questions from the idea phase are resolved:

| Question | Decision |
|----------|----------|
| What is HandyFEM? | Marketplace / directory — clients find professionals, direct contact |
| Who is it for? | Two sides: tradeswomen (supply) + clients who hire them (demand) |
| Initial geography? | Barcelona and surroundings → Spain → LATAM |
| Monetization? | No monetization in MVP. v2: freemium with featured visibility + training |
| Web or mobile? | Mobile-first PWA (responsive web that installs as an app) |
| Language? | Spanish in MVP. Multi-language in v2 |
| Roles? | One account, base role is client, activates a professional profile from the dashboard (Option C) |

---

## 1. Philosophy and differentiation

An app for women in the trades **is not a neutral app**. The security and privacy bar has to be visibly higher than any generic marketplace, because:

- Tradeswomen are a historic minority in their sectors → they already face real workplace harassment.
- A public app that combines **identity + trade + area + photo** is attractive to harassers if it isn't designed carefully.
- The product's differentiator is NOT "Yelp but pink" — it's **"the digital space where a tradeswoman feels safe to show herself and work"**.

If the architecture doesn't reflect this, the product has no reason to exist.

---

## 2. OWASP Top 10 applied to HandyFEM

### A01 — Broken Access Control
- Every read/write of personal data validates **on the backend** that the logged-in user is the owner / has permission
- Never trust frontend checks alone — an attacker bypasses the frontend
- Resource IDs in URLs are random UUIDs, not auto-incrementing (prevents enumeration attacks)
- Supabase RLS (Row Level Security) enabled on every table — never a table without a policy

### A02 — Cryptographic Failures
- HTTPS mandatory on all routes (Vercel provides it automatically)
- Passwords: Supabase Auth uses bcrypt internally — don't roll your own auth
- Session tokens: `httpOnly` + `Secure` + `SameSite=Strict` cookies via Supabase + Next.js middleware
- Sensitive data in the DB (if any): encrypted at rest — Supabase handles this at the infrastructure level

### A03 — Injection
- Supabase uses prepared statements internally — never concatenate input into manual queries
- React escapes automatically — never use `dangerouslySetInnerHTML` with external input
- Set a `Content-Security-Policy` header in `next.config.js`
- Schema validation with **zod** in all API routes and server actions

### A04 — Insecure Design
- **Reviews** system: only after a verified service (status "Completed" in the chat), right of reply for the professional, moderation enabled in v2
- **Messaging** system: designed assuming harassment will happen — one-click reports, fast escalation
- **Threat modeling** before coding sensitive features (messaging, reviews, photos)

### A05 — Security Misconfiguration
- No `console.log` with sensitive data in production
- Stack traces never visible to the user — generic error boundaries in the UI
- Default deny on CORS, on Supabase Storage buckets, on API routes
- Environment variables NEVER committed — `.env.local` in `.gitignore` from day one
- Storage buckets: private by default, signed URLs with expiration. **Deliberate
  exception (2026-06-11):** portfolio and profile photos live in a public bucket —
  they appear on public SSR pages with per-profile Open Graph previews, and
  expiring URLs would break SEO/OG caching. Server-side MIME/size validation
  still applies. Provider under discussion (Cloudflare R2 vs Supabase Storage —
  see product-decisions.md)

### A06 — Vulnerable Components
- `npm audit` in CI before every deploy (GitHub Actions)
- Dependabot enabled on GitHub
- Audit before adding any dependency: needed? maintained? what permissions does it request?

### A07 — Identification and Authentication Failures
- **Don't roll your own auth** — Supabase Auth
- **2FA strongly recommended for professionals** — prompted at profile activation,
  not mandatory (decision 2026-06-11: mandatory 2FA is too much friction for the
  first cohort of professionals)
- Rate limiting on login: 5 attempts, then captcha — Supabase handles it + additional middleware
- Max sessions 30 days with refresh token
- Google OAuth to reduce signup friction

### A08 — Software and Data Integrity Failures
- File uploads: validate MIME type on the server, not the client. Rename files when storing in Supabase Storage
- Size limit: 5MB per photo
- Allowed formats: JPG, PNG, WebP only
- CI/CD: don't allow merging PRs without review (branch protection on GitHub)
- Schema validation with **zod** before any DB write

### A09 — Security Logging and Monitoring Failures
- Log: successful/failed logins, password changes, reports/blocks, professional profile activation
- Do NOT log: passwords, tokens, private message content
- Tool: **Better Stack** or **Logtail** (free tier sufficient for MVP)
- Sentry for error tracking from day one
- Alerts for: spikes in failed logins, spikes in reports against the same user

### A10 — Server-Side Request Forgery (SSRF)
- If the app fetches external URLs (link previews, importing photos): allowlist of permitted domains
- Block private IPs (10.x, 192.168.x, 127.0.0.1)
- No automatic proxying of user-supplied URLs

---

## 3. Privacy by design

### Location data
- **Never expose the exact address** of a tradeswoman to the public
- Show: area / city / approximate radius
- Internally store the cities where she works (array), never exact coordinates in the MVP
- v2: let the user move the "center" of her area (Strava privacy-zones style)

### Contact data
- **Never show real email/phone** to the public
- Primary channel: HandyFEM internal messaging
- v2: masked number with Twilio Proxy if phone contact is added

### Identity — what is shown to the public
| Data | Public | Private |
|------|--------|---------|
| Name | ✅ (or pseudonym) | — |
| Profile photo | ✅ (optional) | — |
| Specialty | ✅ | — |
| City/area | ✅ (approximate) | — |
| Portfolio | ✅ | — |
| Ratings | ✅ | — |
| Email | ❌ | System only |
| Phone | ❌ | System only |
| ID/docs | ❌ | Moderation only |
| Real address | ❌ | Never stored |
| Date of birth | ❌ | Optional, private |

### GDPR / LOPDGDD (Spain)
- Detailed privacy policy in clear Spanish — no legalese
- Consent flow per data use (not a single "I accept everything")
- **Right to be forgotten implemented in code**: user requests deletion → a real script that erases data (not just a `deleted=true` flag)
- Breach notification to the AEPD within 72h — have a documented process
- Record of processing activities (Art. 30 GDPR)
- GDPR-friendly cookie banner — use Cloudflare Web Analytics or Plausible (privacy-first, no consent banner)

### Block / Report
- **Block**: bidirectional, instant, without the blocked party knowing
- **Report**: one-click, categorized (harassment, inappropriate content, fraud, impersonation)
- Always reaches moderation — in MVP: email to the founder. In v2: an admin panel
- Response time SLA: <24h in MVP
- Escalation to authorities if there are credible threats — have a written protocol

---

## 4. Stack — confirmed

| Layer | Decision | Reason |
|------|----------|-------|
| Framework | Next.js 16 (App Router) | SSR for directory SEO, API routes, Vercel deploy |
| Backend / DB | Supabase | Auth + PostgreSQL + Realtime + Storage in one |
| Styling | Tailwind CSS | Market standard, fast |
| Components | shadcn/ui | Accessible, no imposed styles, you own the code |
| Icons | Tabler Icons | Free, complete, consistent |
| Hosting | Vercel | Automatic deploy from GitHub, automatic HTTPS |
| Transactional email | Resend + React Email | Free up to 3,000/month, on-brand emails |
| Error tracking | Sentry | Free on the hobby tier |
| Logs | Better Stack | Free tier sufficient for MVP |
| Analytics | Plausible or Cloudflare Web Analytics | Privacy-first, no consent banner |
| Validation | zod | Type-safe, integrates with React Hook Form |

**Principles applied:**
- Don't roll your own auth — Supabase Auth
- Vendors with a DPA available for GDPR
- Start simple, migrate if it grows

**For v2 (not in MVP):**
- Twilio Proxy for phone masking
- Stripe Connect for payments
- ClamAV or a managed service for scanning uploaded files

---

## 5. MVP scope — confirmed

### ✅ In MVP v1

| Feature | Notes |
|---------|-------|
| Landing page | SSR, SEO, general Open Graph |
| Sign up / Log in | Email + Google OAuth, email verification, 2FA recommended for professionals |
| Public directory | Search by specialty + city, filters, SSR for SEO |
| Public professional profile | Friendly URL, custom Open Graph per profile, Schema.org |
| Unified dashboard | Client/professional role toggle |
| Professional onboarding | 4 steps, portfolio, cities of work |
| Basic chat | Realtime with Supabase, service status |
| Basic Block / Report | One-click, reaches the moderation email |
| Reviews (client → professional) | Added 2026-06-11 — public profiles show ratings, so the MVP needs the flow that produces them. Only after both parties confirm "job completed"; right of reply for the professional |
| PWA installability | 🟡 Likely deferred to v1.5 (decision pending). If kept: Serwist — `next-pwa` is unmaintained |
| Privacy policy + ToS | In Spanish, GDPR-compliant |
| Transactional emails | Verification, welcome, new-message notification |

### ❌ Not in MVP (v2)

| Feature | Reason |
|---------|-------|
| Moderation admin panel | High complexity, in MVP the founder moderates |
| In-app payments | Requires Stripe Connect + tax compliance |
| Geolocation / map | Complex privacy, v1.5 with a results map |
| Emergency button | Critical safety feature — do it right or don't do it |
| Push notifications | PWA + Supabase Realtime is enough for MVP |
| Multi-language | Spanish first, validate demand first |
| Native iOS/Android app | Responsive web first |
| Video calls | Not the primary channel |
| Community / forums | After reaching a critical mass of users |
| Group chat | High moderation complexity |
| Advanced KYC (documents) | Basic verification in MVP, KYC in v2 |
| Masked number | Twilio Proxy in v2 |

---

## 6. High-impact additional features (v1.5)

Identified during planning — not in MVP but very close:

- **Custom Open Graph per profile** — each professional shares her URL with a preview of photo + name + specialty. Every professional is an effortless ambassador
- **Friendly URL per profile** — `handyfem.com/maria-lopez-electricista-barcelona` — indexable, shareable, her own digital presence
- **Schema.org on profiles** — rich snippets in Google with name + rating + city
- **Guided post-signup onboarding** — 3 steps the first time you log in, reduces drop-off
- **Map view in the directory** — list / map toggle with Mapbox
- **View toggle in the directory** — list / grid by preference

---

## 7. Project documentation

| File | Content |
|---------|-----------|
| `docs/handyfem-specs.md` | Full specs: design system + 7 MVP screens |
| `docs/mvp-plan.md` | This file — security, privacy, decisions |
| `docs/data-model.md` | DB tables, RLS access matrix, migration order, deletion map |
| `docs/product-decisions.md` | Decision log — decided vs under discussion |
| `docs/handyfem-claude-code-prompt.md` | Prompt for Claude Code |

---

## 8. Setup checklist — before writing code

- [x] GitHub repo created and pushed, branch protection on `main` active (2026-06-11)
- [x] `.gitignore` with `.env.local` from day one (+ `.githooks/pre-commit` secret detection)
- [x] GitHub Actions CI on every PR: lint + build + `npm audit --audit-level=high` (2026-06-11). Add the test step when the first test suite exists (RLS harness, auth slice)
- [ ] Dependabot enabled
- [ ] Sentry configured
- [ ] Supabase: RLS enabled on all tables from the start
- [ ] Supabase Storage: private buckets by default
- [ ] Vercel: preview branches enabled
- [ ] Domain configured with automatic HTTPS
- [ ] Edge 404 short-circuit for bot scan paths (`/wp-admin/*`, `/wp-login.php`,
      `/xmlrpc.php`, `/.env`, `/.git/*`, `/phpmyadmin/*`, etc.) via middleware
      or `vercel.json` — bots probe these 50–200×/day and would otherwise burn
      serverless invocations rendering 404s (lesson from Borrissol)
- [ ] PWA setup with Serwist — only if PWA stays in MVP (likely deferred)
- [ ] Resend configured for transactional emails — **also unlocks editing the
      Supabase auth email templates** (locked behind custom SMTP), which is
      required to switch links to `/auth/confirm?token_hash=…` so
      verification/reset emails work cross-device (route is already built;
      snippets in the auth-slice PR description). Blocker for launch.

---

## 9. References

- [OWASP Top 10 (2021)](https://owasp.org/Top10/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [GDPR / AEPD resources in Spanish](https://www.aepd.es/)
- [Supabase RLS docs](https://supabase.com/docs/guides/auth/row-level-security)
- [Serwist](https://serwist.pages.dev/) — PWA tooling, successor to the unmaintained next-pwa
- [Resend + React Email](https://resend.com/docs/send-with-nextjs)
- [Sentry Next.js](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- Reference apps: Brigad (France) — KYC and matching, Vinted — messaging + masked number, Wallapop — block + reporting flows

---

## 10. Identity, gender, and inclusion

### Design decision — no gender as a required field

HandyFEM does not ask for gender at signup or in the profile. The platform attracts who it needs to attract through its name, tone, and purpose — not through a checkbox.

Verification is done on **trade and experience**, not on gender identity. This resolves the issue for trans people without turning it into a topic — it simply isn't a topic.

### Identity fields in the profile

| Field | Required | Notes |
|-------|-------------|-------|
| Professional name | ✅ | The name she uses in her work — doesn't have to be her legal name |
| Pronouns | ❌ optional | she/he/they and free text |
| Profile photo | ❌ optional | Never required |
| Specialty | ✅ | The trade, not the person |

### Legal framework

We don't formally exclude anyone. HandyFEM's name, tone, and purpose determine who signs up — just like AllWomen Tech, a company for women that doesn't ban men from entering. Before the public launch, review with legal counsel how to articulate this in the ToS.

---

## 11. Real safety vs promised safety

### What HandyFEM does NOT promise in the MVP

HandyFEM **does not guarantee the physical safety** of professionals. There is no emergency button, no real-time geolocation, no incident-response protocol for physical events.

Promising what doesn't exist is more dangerous than not having it.

### What HandyFEM DOES offer from the MVP

**Informed-decision tools:**
- The client's history visible to the professional before accepting a job — how many services she has hired, ratings from previous professionals
- Verified profiles — the client is who she says she is
- One-click block/report system

**Community as a safety mechanism:**
- Professionals can warn each other about problematic clients
- Horizontal support network — it doesn't depend on the platform, it depends on people
- A space to share experiences without public exposure

### Geolocation — explicit decision

**Real-time geolocation is not implemented in the MVP.** Reason: if something fails — a bug, a breach, a poorly implemented feature — it could expose the exact location of a woman to someone who shouldn't have it. The risk is not hypothetical.

What is implemented safely:
- Cities where she works — declared by her, without coordinates
- Approximate area on the public profile — never the exact address

Real-time geolocation, "accompanied" mode, and an alert button go in v2, when the platform has enough maturity and community to support them well.

---

## 12. Go-to-market — launch strategy

### The two-sided marketplace problem

Without professionals, clients don't find what they're looking for and leave. Without clients, professionals don't receive contacts and leave. You have to solve the supply side first.

### Supply strategy — getting the first professionals

**Primary channel: vocational schools (FPs) and trade schools**
- Vocational schools are where women are training in trades right now
- If HandyFEM reaches them before they finish their program, we accompany them from the start
- Concrete action: identify vocational schools in Barcelona with electricity, plumbing, and construction programs, and present HandyFEM as a digital career path

**Secondary channel: existing communities**
- WhatsApp, Telegram, Instagram groups of women in the trades in Spain
- Don't start from scratch — integrate into networks that already exist
- AllWomen communities, associations of self-employed women, local cooperatives

**B2B channel (to explore in parallel):**
- Construction companies, architecture studios, maintenance cooperatives that want to hire women
- The pitch is direct: "Here you'll find verified candidates"
- More predictable decision cycle than the freelance market
- Possible before having an app — a simple Notion or Airtable directory validates demand

### The first 10 professionals

The most important question before launch: **who are the first 10 professionals who will trust HandyFEM?**

Not the first 100. The first 10. Identify them, talk to them, understand their fears and their needs. They are the ones who validate the platform, leave the first ratings, and recommend others.

### Communication — tone and positioning

Don't lead with safety as the main feature. Don't promise what can't be guaranteed.

The message is:
- **For professionals:** "Digital visibility you didn't have before. A network that looks after you."
- **For clients:** "Find the professional you need. With confidence."

---

## 13. Identified risks and mitigations

| Risk | Probability | Impact | Mitigation |
|--------|-------------|---------|------------|
| Too few professionals at launch | High | High | Manual recruitment before launch, vocational-school channel |
| A professional has a bad experience | Medium | Very high | Block/report from day one, support community, don't promise safety that doesn't exist |
| Founder burnout | High | High | Small MVP, tight scope, document everything to be able to delegate |
| Legal framework around gender | Medium | Medium | Legal counsel before public launch, well-drafted ToS |
| A large platform copies the model | Low | Medium | The advantage isn't technological — it's cultural and community-based, hard to copy |
| Low organic traffic at the start | High | Medium | SEO from day one (SSR + Schema.org + friendly URLs), blog/social content |

---

## 14. Ongoing notes

*(Space for future notes)*
