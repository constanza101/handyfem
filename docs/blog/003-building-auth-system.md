# Building a Production-Ready Auth System: How I Shipped a Complete MVP Foundation in One Day

**Or: Why Comprehensive Code Review Matters More Than You Think**

Today, I shipped the authentication foundation for HandyFEM—a marketplace app for women in the skilled trades. What started as a scaffolded Next.js project became a fully-tested, security-audited auth system with database migrations, login/signup flows, and a verified access control layer. Here's how I did it (and what I'd do differently).

## The Starting Point

I had a design system and a blank canvas. The scope seemed straightforward on paper: wire up Supabase, build login/signup screens, add some database tables. In reality, "straightforward" auth is where most apps spring security leaks and user experience disasters.

I could have built it quickly. Instead, I chose to build it *right*, and that decision shaped everything that followed.

## The Methodical Approach: Security First, Not Last

Before writing a single authentication component, I did three things:

### 1. Defined the Rules

I documented (in code comments and CLAUDE.md) what "correct" meant for this project: Zod validation on every input, Row-Level Security on every table, two separate Supabase clients (one browser-safe, one admin-only), and a test harness that *proves* what attackers can't do—not just what they can.

This sounds boring. It's actually the thing that saved me from shipping vulnerabilities I wouldn't have caught in isolation.

### 2. Built the Test First

Before the forms existed, I wrote `rls-test.mjs`: a script that creates two throwaway users, attempts nine different attack scenarios (can user A read user B's data? Can they forge rows? Can they delete their own account?), and reports which ones fail as expected.

When the database migrations went live, the test went green: **9/9 checks passed**. That number meant something. It meant the security model actually worked.

### 3. Invited Rigorous Review

Here's where AI became a force multiplier. I ran a high-effort code review using multiple specialized agents, each approaching the code from a different angle (line-by-line bugs, security vulnerabilities, performance issues, design patterns, etc.). The review surfaced **10 concrete findings**, each with a reproduction scenario.

Most teams would call this overkill. I called it necessary.

## The 10 Findings: What I Got Wrong (and Fixed)

The review caught things I'd have shipped:

1. **Professional users lost in the system**: The signup form had a `?rol=profesional` flag that only changed the subtitle—the intent was never stored. This meant women signing up as professionals would silently get routed as clients. I fixed it by storing `signup_role` in user metadata, unrecoverable later.

2. **Email links that broke across devices**: I'd used PKCE (OAuth code exchange), which only works if you open the link in the same browser. Opened it on your laptop instead of your phone? Link fails. I added a parallel route (`/auth/confirm`) using token_hash, which works cross-device.

3. **Google users' email addresses leaking**: When users signed in with Google, the database trigger looked for `display_name` (which Gmail doesn't send), fell back to the email local-part, and now every professional sees the other woman's email address. I added fallbacks for Google's actual fields (`name`, `full_name`).

4. **Forms that humiliate you after an error**: React 19 clears uncontrolled form inputs after a failed submit, but my error messages stayed—pointing at now-empty fields. I added state round-tripping and a shared validation hook so errors clear when you fix them.

5. **Bundle bloat for validation**: I had the full Zod library (~65KB gzipped) on the signup page just to validate 5 fields client-side. I switched to `zod/mini` (~4KB), same APIs, 16× smaller.

And five more. Each one mattered. Each one would've shipped.

## How I Used AI as a Copilot (Not a Crutch)

Here's what's easy to hide: every piece of code I wrote, I understood. I didn't ask for "build me auth." I asked:

- **"What would a careful code reviewer catch here?"** → Multi-agent deep review, found the 10 issues.
- **"Is zod/mini API-compatible with my schemas?"** → Tested it, verified the regex and validation patterns worked.
- **"What would the Supabase email templates need to be?"** → Got specific template syntax, understood the tradeoff (pending custom SMTP setup).

I used AI to augment my thinking, not replace it. When the review suggested a new validation hook, I understood *why* (reducing duplicate state logic across forms), not just *that* I should do it. When it flagged the Google OAuth name leak, I verified the actual fields Google sends before applying the fix.

This is the difference between using AI well and just copy-pasting answers.

## The Details That Mattered

Some of the things I was careful about (because the review held me to it):

- **No browser-native validation preempting server validation.** I added `noValidate` on forms so the browser's English error messages don't interrupt my Spanish Zod errors.
- **Password rules persisted, not hidden.** The hint stays visible while you type (not a placeholder that vanishes).
- **Error messages never reveal whether an email exists** (prevents user enumeration attacks). Same message for both "wrong password" and "no such user."
- **150ms of network latency removed** by switching from `getUser()` (network round-trip on every page) to `getClaims()` (local JWT verification, network only on actual refresh).
- **Every protected page uses the same `requireUser()` guard**, so the next developer can't accidentally ship an unprotected page.

None of these are fancy. All of them are the difference between "works" and "ships."

## What I Learned

1. **Comprehensive review is worth the time cost.** The high-effort review took longer, but catching 10 issues before launch beats fixing them in production while users are affected. I'll do this for every auth system and critical path.

2. **AI-assisted review works best with constraints.** "Review my code" → generic feedback. "Scan this code from 7 different angles (security, performance, patterns, etc.) and find concrete bugs with reproduction scenarios" → finds real things.

3. **Testing security means proving what *doesn't* happen.** The RLS harness validates 9 negative cases (what attackers can't do), not just the happy path. That asymmetry matters.

4. **Details compound.** The small UX fix (round-trip form values on error) saves a user from retyping a password. The bundle optimization (zod → zod/mini) saves 61KB from every signup page on mobile. None is dramatic alone; together they're the difference between "works" and "delights."

## What's Next

The auth system is ready for the next layer: onboarding (where that `signup_role` starts paying off), the public directory, and professional profiles. CI/CD is set up to catch regressions automatically.

There are three small lingering items (Google OAuth provider config, custom email templates for cross-device links, terms/privacy pages), all tracked and non-blocking.

But the foundation—the thing users never see and that everything else builds on—is solid. I can prove it.

---

## For Other Builders

If you're using AI to ship faster, here's what I'd recommend:

- **Define "correct" before you build.** Know your constraints (security model, performance budget, accessibility rules) and encode them as tests.
- **Use AI for breadth, not just speed.** Ask it to review from multiple angles, not just write faster.
- **Understand the code you ship.** Use AI to think harder, not to think less. The best results come when you're skeptical.
- **Test the invisible.** Build a harness that proves what *doesn't* happen (attacks fail, unauthorized access is blocked). That confidence is worth more than any UI test.

HandyFEM's auth system isn't cutting-edge tech. It's careful, tested, audited, and documented. That's the kind of foundation worth being proud of.

---

**You can follow the technical journey** in [PR #11 on GitHub](https://github.com/constanza101/handyfem/pull/11), which includes the security review findings and the code fixes. The RLS test harness lives in `scripts/rls-test.mjs` and runs anytime to prove the access controls work.

---

*Built with Next.js 16, Supabase, React 19, and a lot of deliberation. No corners cut.*

---

**Date:** 2026-06-11  
**Status:** Published
