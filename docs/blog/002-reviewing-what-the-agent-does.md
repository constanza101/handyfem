# AI Pair Programming Isn't Autopilot: Scaffolding My App and Catching What the Agent Threw Away

*Part of the #BuildingInPublic series on HandyFEM, a platform for women in the skilled trades.*

I'm building HandyFEM with an AI coding agent (Claude Code) as my pair. It's fast — sometimes startlingly so. But the way I work with it is deliberate: I treat everything it produces the way I'd treat a pull request from a capable junior developer. I read it. I question it. I decide what stays.

This post is a concrete example of why that habit matters — a small moment during project setup where a reasonable-looking decision by the agent would have quietly cost me something useful, and how reviewing the work caught it. Then I want to step back and reflect honestly on the *process*: are we doing this in the right order, with the right tools?

## The task: scaffolding the project

Before writing features, you "scaffold" a project — generate its skeleton: folder structure, config files, a base page that already runs. I had the agent set up the foundation for HandyFEM:

- A **Next.js** app with **TypeScript** and **Tailwind**
- **shadcn/ui** (a component approach where the component code lives *in your repo*, so you own it)
- My **design tokens** — the exact color palette from my specs — wired into the theme

Because my project folder already had docs, Git, and a `.env.local` with a real secret, the agent did the smart thing: it generated the app in a temporary folder and integrated the pieces carefully, without clobbering my existing files.

## The catch

During that integration, the agent mentioned — almost in passing — that the Next.js generator had created its own `CLAUDE.md` file, and that it had **discarded it** so as not to overwrite mine.

On the surface, that's the *right* call: don't overwrite the user's file. But it raised a question I didn't want to skip: **did that discarded file contain anything useful?**

So I asked. We went back and looked. The generated `CLAUDE.md` was just a pointer to a second file, `AGENTS.md`, and *that* one held something genuinely valuable:

```
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may
all differ from your training data. Read the relevant guide in
node_modules/next/dist/docs/ before writing any code.
```

That's a real heads-up. The framework version I'm using is newer than the knowledge most AI models (and most tutorials) were trained on. The note even points to version-specific documentation bundled inside the project. Losing it meant the agent might later write code using outdated patterns — confidently, and wrongly.

So we rescued the useful part into *my* project instructions, where it belongs. One small note, but it changes the quality of every future line of framework code.

## Why this matters

Here's the thing: the agent didn't do anything *wrong*. Discarding a file to protect mine was sensible. But the **side effect** — dropping a piece of context that mattered — was easy to miss, because it was buried in a one-line aside during a much bigger operation.

That's the pattern to internalize. AI agents make a high volume of fast, plausible decisions. Most are good. But "plausible" isn't "reviewed," and the cost of an unexamined one compounds over a codebase. The skill isn't prompting — it's **reading the output like a reviewer**: what did it change, what did it remove, and is each of those what I actually want?

I don't review because the tool is bad. I review *because it's good enough that I'd otherwise stop paying attention.* That's the trap.

## Reflecting on the process: are we even doing this in the right order?

The more interesting question is whether the *workflow* itself is optimal. Building this way is new, and I'm refining it as I go. A few honest observations:

**What's working:**

- **Security first, before any feature code.** We set up secret-handling (a `.gitignore`, a pre-commit hook, environment variables) before scaffolding. For a product whose whole premise is trust, that ordering is non-negotiable, and I'm glad it came first.
- **Detailed specs as the source of truth.** Because I'd already defined screens, components, and a color palette, the agent had a real guide to build against instead of inventing one. Good input, good output.
- **Project conventions in a `CLAUDE.md`.** Giving the agent written rules (mobile-first, accessibility minimums, "never hardcode secrets") means it defaults to my standards instead of generic ones.

**What I'd refine:**

- **Decide "manual vs. automated" *before* committing to a path.** Earlier I had the agent script a one-time setup task. It turned into a long debugging session — and honestly, doing it by hand would have been faster. Automation pays off when you'll repeat something; for a true one-off, manual is often the smarter, cheaper move. I'll make that call up front now.
- **Take inventory before opening a new thread.** Some questions I treated as "open" were already answered in my own specs. A five-minute review of existing docs before starting saves re-litigating settled decisions.
- **Set conventions and guardrails early.** The earlier the agent has a `CLAUDE.md` and a clear definition of done, the fewer corrections later. Front-load the thinking; it's cheaper than back-loading the fixes.

The meta-lesson: with an AI agent, the bottleneck shifts. It's no longer *writing the code* — it's **deciding well and reviewing carefully**. The typing got cheap; the judgment got more valuable, not less.

## Takeaway

An AI agent is a genuine force multiplier — but only for someone who stays in the driver's seat. It will move faster than you, make mostly-good calls, and occasionally drop something that matters in a sentence you could easily skim past. So don't skim. Read the diff. Ask "what did you remove, and why?" Keep the judgment where it belongs: with you.

The agent writes the code. You're still the engineer.

---

*Follow the build: #BuildingInPublic #HandyFEM #AI #ClaudeCode #WebDev*
