# HandyFEM — Product Specs MVP

## General Information

- **Project:** HandyFEM
- **Type:** PWA mobile-first
- **Stack:** Next.js + Supabase + Tailwind CSS + shadcn/ui
- **Deploy:** Vercel
- **Language:** Spanish (app UI)
- **Status:** MVP v1

---

## Visual Identity

| Token | Value |
|-------|-------|
| Primary (teal) | `#4A7C7D` |
| Primary light | `#699794` |
| Accent (violet) | `#776AAA` |
| Accent dark | `#60569C` |
| Accent light | `#8D7BB8` |
| Lavender | `#D0C2E5` |
| Amber | `#FCC970` |

> **Source of truth (decision 2026-06-11):** colors, radius, fonts and shadows
> live in the tweakcn theme in `app/globals.css`. The DS-01…07 specs below
> were rewritten on 2026-06-11 to match it (warm neutrals removed, white text
> on primary, Geist + Bricolage Grotesque, 4px radius base). If doc and code
> ever drift again, `globals.css` wins.

---

## User Roles

- **Base role:** client (assigned at registration)
- **Professional role:** activated from the dashboard (Option C)
- **A single account** can hold both roles
- **Admin Panel:** out of scope for MVP (v2)

---

## MVP Screens

1. Landing page
2. Sign up / Log in
3. Directory + filters
4. Public professional profile
5. Dashboard with role toggle
6. Professional onboarding
7. Basic chat

---

## Spec 01 — Landing Page

### Objective
Convert visitors into registered users. The primary CTA is registration.

### Primary target user
A client looking for a trusted professional.

### Secondary target user
A professional seeking visibility and work.

---

### Sections

#### 1. Navbar

| Element | Detail |
|---------|--------|
| Logo | Roof icon + "Handy" (teal) + "FEM" (violet) |
| Links | Hidden on mobile, visible on desktop: "How it works", "Directory" |
| Left CTA | "Log in" — secondary button → `/login` |
| Right CTA | "Sign up" — primary button → `/signup` |
| Behavior | Sticky on scroll. Cream background with subtle shadow when scrolling. |

---

#### 2. Hero

| Element | Detail |
|---------|--------|
| Headline | "The network of women trade professionals." |
| Subtitle | "Find electricians, plumbers, carpenters and more. Verified, with a real portfolio and reviews from other clients." |
| Primary CTA | "Find a professional" → `/directory` |
| Secondary CTA | "I'm a professional" → `/signup?rol=profesional` |
| Image | Hero photo of a woman trade professional (mobile: vertical, desktop: horizontal) |
| Background | Muted `#FAFAF9` *(was cream — removed in tweakcn pass; use accent `#FFD894` sparingly if a warm band is wanted)* |

**States:**
- Mobile: large headline, subtitle, CTAs stacked vertically, image below
- Desktop: text on the left, image on the right

---

#### 3. How It Works

| Element | Detail |
|---------|--------|
| Section title | "How does it work?" |
| Subtitle | Two tabs or toggle: "I'm a client" / "I'm a professional" |
| Client tab | 3 steps: 1. Search by specialty and city → 2. Review profiles and ratings → 3. Contact directly |
| Professional tab | 3 steps: 1. Create your profile with portfolio → 2. Wait for verification → 3. Receive client inquiries |
| Icons | Tabler icons, teal color |
| Background | White `#fff` |

---

#### 4. Features

| Element | Detail |
|---------|--------|
| Section title | "Why HandyFEM?" |
| Features | 4 cards in a 2×2 grid: |
| Feature 1 | Shield icon — "Verified profiles" — "All professionals go through a verification process." |
| Feature 2 | Star icon — "Real reviews" — "Ratings from clients who have hired the service." |
| Feature 3 | People icon — "Women professionals only" — "A network built by and for women." |
| Feature 4 | Message icon — "Direct contact" — "No intermediaries. Talk directly to the professional." |
| Background | Background `#FAFAF9` (muted) |

---

#### 5. Testimonials

| Element | Detail |
|---------|--------|
| Section title | "What people say about HandyFEM" |
| Count | 3 testimonials |
| Content | Name, avatar with initials, specialty or city, testimonial text, star rating |
| Data | Fictitious for MVP |
| Background | White `#fff` *(was cream — removed in tweakcn pass)* |

---

#### 6. Final CTA

| Element | Detail |
|---------|--------|
| Headline | "Join HandyFEM" |
| Subtitle | "Whether you're looking for a professional or want to offer your services." |
| Primary CTA | "Create a free account" → `/signup` |
| Background | Teal `#4A7C7D`, cream text |

---

#### 7. Footer

| Element | Detail |
|---------|--------|
| Logo | Small version |
| Links | How it works · Directory · About us · Contact |
| Legal | Privacy policy · Terms of use |
| Copyright | © 2026 HandyFEM |
| Background | `#2B2A28`, text `#E5E7EB` |

---

### Global Page States

| State | Behavior |
|-------|----------|
| Logged-out user | Navbar shows "Log in" + "Sign up" |
| Logged-in user | Navbar shows avatar + "My dashboard" instead of auth CTAs |
| Initial load | Skeleton loader in hero image |

---

### Technical Notes

- Page rendered server-side (SSR) for SEO
- Meta tags: title, description, og:image for social networks
- Hero image served with `next/image` for automatic optimisation
- "How it works" tabs are client components
- Fully responsive: mobile (390px) → tablet (768px) → desktop (1280px)

---

*Document in progress — specs for remaining screens will be added.*

---

## Spec 01b — Interaction & Motion Details

### Philosophy
Maximum 4 effects, all subtle. Interaction reinforces the experience rather than competing with content.

---

### Floating Pill Navbar

Based on the Borrissol.com system, adapted for HandyFEM.

#### Visual structure
- Shape: centred floating pill (`border-radius: 9999px`)
- Position: `position: fixed`, `top: 16px`, horizontally centred
- Background: `backdrop-filter: blur(12px)` + semi-transparent cream background
- Border: `0.5px solid` lavender `#D0C2E5`
- Shadow on scroll: `--shadow-nav-scroll`

#### Breakpoints
| Width | Layout |
|-------|--------|
| ≥ 768px | Desktop: logo + links + CTAs visible |
| ≤ 767px | Mobile: logo + hamburger, expandable panel |

No separate tablet breakpoint — intentional decision to simplify maintenance.

#### Scroll shrink
- 0–80px scrolled: 100% size, no shadow
- 80–420px: progressively shrinks to 88%, soft shadow
- +420px: fixed at 88% with shadow
- Implementation: `animation-timeline: scroll()` (graceful degradation in Firefox — stays static at 100%, functional)

#### HandyFEM Tokens
| Token | Value |
|-------|-------|
| `--primary` | `#4A7C7D` |
| `--color-violet` | `#776AAA` |
| `--background` | `#ffffff` |
| `--color-lavanda` | `#D0C2E5` |
| `--color-primary-light` | `#699794` |
| `--foreground` | `#2B2A28` |
| `rounded-full` | `9999px` (pill) |
| `rounded-xl` | `8px` |
| `border-hairline` + `--border` | `0.5px solid #E5E7EB` |
| `--t-fast` | `150ms ease` |
| `--t-normal` | `300ms ease` |
| `--shadow-nav-scroll` | `0 4px 24px rgba(74,124,125,0.12)` |
| `--min-touch-target` | `44px` |
| `--font-size-ui` | `0.8rem` |
| `--font-size-p2` | `1.1rem` |
| `--font-weight-btn` | `500` |
| `--letter-spacing-btn` | `0.05em` |

#### Desktop content
- Left: logo (roof icon + "Handy" teal + "FEM" violet)
- Centre: links — Directory · How it works · About us
- Right: "Log in" (secondary button) + "Sign up" (primary pill button)

#### Mobile content
- Left: logo
- Right: hamburger (`min-height: 44px`)
- Expandable panel: stacked links + CTAs

#### Logged-in behavior
- Circular avatar with initials + name + "My dashboard"
- No "Log in" or "Sign up"

#### Accessibility
- `min-height: 44px` on all interactive elements
- `aria-label`, `aria-expanded`, `aria-controls`, `aria-haspopup` on hamburger
- `role="dialog"` on mobile menu
- Close with Escape key
- `flex-shrink: 0` on logo, CTAs, hamburger
- `white-space: nowrap` on links
- Logo with `aria-label`

#### Support & degradation
| Feature | Support | Without support |
|---------|---------|-----------------|
| `animation-timeline: scroll()` | Chrome/Edge 115+, Safari 26+ | No shrink, functional |
| `backdrop-filter` | All modern browsers | Solid cream background, acceptable |
| `color-mix()` | All modern 2023+ | Solid colour without transparency |
| `:has()` | All modern 2023+ | No overlay when menu opens |

---

### Effect 2 — Hero Fade + Slide Up

- Headline, subtitle and CTAs enter with `opacity: 0 → 1` + `translateY(16px → 0)`
- Stagger: headline first, subtitle 100ms later, CTAs 200ms later
- Duration: 500ms, `ease-out`
- Fires only once on page load
- Implementation: CSS `@keyframes` + class applied on component mount

---

### Effect 3 — Card Hover in Directory

- `transform: translateY(-2px)` on hover
- Soft shadow: `0 8px 24px rgba(74,124,125,0.10)`
- Transition: `--t-normal` (300ms ease)
- Mobile: no hover (activated only on pointer devices)
- Implementation: `@media (hover: hover)` to avoid applying on touch

Verified badge:
- Green dot `#4A7C7D` with looping `pulse` animation
- Pulsing `box-shadow` every 2s

---

### Effect 4 — Scroll-Triggered Section Fade

- Sections: "How it works", "Features", "Testimonials", Final CTA
- Each section enters with `opacity: 0 → 1` + `translateY(24px → 0)` when entering the viewport
- Threshold: 20% visible to trigger the animation
- Duration: 600ms, `ease-out`
- Implementation: `IntersectionObserver` in a reusable `useScrollReveal` hook
- Degradation: if JS doesn't load, sections are visible by default (`opacity: 1` as CSS fallback)

---

### What HandyFEM Does NOT Have (intentional decisions)

- No parallax
- No custom cursors
- No heavy page loaders
- No animations longer than 600ms
- No effects that interfere with `prefers-reduced-motion`

Note: all effects must respect `@media (prefers-reduced-motion: reduce)` — if the user has it enabled, animations are completely disabled.

---

*Document in progress — next: Spec 02 Sign up / Log in*

---

## Spec DS-01 — Buttons

### Philosophy
A single primary button visible per screen. All others are secondary, ghost, or destructive depending on context. Never two primary buttons together.

---

### Variants

#### Primary
- Background: `#4A7C7D` (teal)
- Text: `#FFFFFF` (white — tweakcn `--primary-foreground`)
- Hover: `#3A6B6C` (teal darkened 10%)
- Active: `scale(0.98)` + darker teal
- Disabled: `opacity: 0.4`, `cursor: not-allowed`
- Use: main screen action — "Find a professional", "Sign up", "Contact", "Save changes"

#### Secondary
- Background: transparent
- Border: `1.5px solid #776AAA` (violet)
- Text: `#60569C` (dark violet)
- Hover: background `#D0C2E520` (very soft lavender)
- Active: `scale(0.98)`
- Disabled: `opacity: 0.4`, `cursor: not-allowed`
- Use: alternative action — "Log in", "View profile", "Cancel"

#### Ghost
- Background: transparent
- Border: none
- Text: `#4A7C7D` (teal)
- Hover: background `#4A7C7D10`
- Active: `scale(0.98)`
- Disabled: `opacity: 0.4`, `cursor: not-allowed`
- Use: tertiary actions, coloured background contexts — "See more", "Back"

#### Destructive
- Background: transparent
- Border: `1.5px solid #E24B4A`
- Text: `#A32D2D`
- Hover: background `#FCEBEB`
- Active: `scale(0.98)`
- Disabled: `opacity: 0.4`, `cursor: not-allowed`
- Use: irreversible actions — "Delete account", "Deactivate profile"
- Note: always accompanied by a confirmation dialog before executing the action

---

### Sizes

| Size | Height | Horizontal padding | Font size | Use |
|------|--------|--------------------|-----------|-----|
| Large | 48px | 28px | 1rem | Hero CTAs, main sections |
| Medium | 44px | 20px | 0.9rem | Cards, forms, dashboard — 44px touch minimum wins over the old 40px |
| Small | 32px | 14px | 0.8rem | Filters, chips, inline actions |

---

### Common Properties (all variants)

| Property | Value |
|----------|-------|
| `border-radius` | `4px` (`rounded-lg`, tweakcn base radius) |
| `font-weight` | `500` |
| `letter-spacing` | `0.02em` |
| `white-space` | `nowrap` |
| `transition` | `all 150ms ease` |
| `min-height` | `44px` (Large and Medium) · `32px` (Small, desktop only) |
| `min-width` | `44px` |
| `display` | `inline-flex` |
| `align-items` | `center` |
| `gap` | `8px` (for icons) |

---

### States

| State | Behavior |
|-------|----------|
| Default | Base style as described above |
| Hover | Darker colour / soft background. `@media (hover: hover)` only |
| Active | `scale(0.98)` — immediate tactile feedback |
| Focus | Teal ring `ring-3 ring-ring/50` + `border-ring` — stock shadcn treatment, consistent across all interactive elements |
| Disabled | `opacity: 0.4`, `cursor: not-allowed`, non-interactive |
| Loading | Inline spinner on the left + text changes to "Loading..." + disabled |

---

### With Icon

- Icon always to the left of the text
- Icon size: 16px (Small) · 18px (Medium) · 20px (Large)
- Library: Tabler Icons (outline)
- Gap between icon and text: `8px`
- Icon-only button: width = height (square), `aria-label` required

---

### Width

| Context | Width |
|---------|-------|
| Inline (navbar, cards) | `fit-content` |
| Mobile forms | `width: 100%` |
| Hero CTAs mobile | `width: 100%` |
| Hero CTAs desktop | `fit-content` |

---

### Accessibility

- `min-height: 44px` on Large and Medium — Apple/Material touch standard
- Visible focus ring: teal `ring-3 ring-ring/50` (stock shadcn)
- Minimum AA contrast: verified on primary (cream on teal) and destructive
- `aria-disabled="true"` in disabled state (not native `disabled` if a tooltip is needed)
- `aria-busy="true"` in loading state
- Icon-only buttons: descriptive `aria-label` required

---

### Implementation with shadcn/ui

Base: `Button` component from shadcn/ui with custom variants in `buttonVariants` (cva).

```
components/
  ui/
    button.tsx   ← shadcn base + HandyFEM variants
```

cva variants:
- `variant`: primary · secondary · ghost · destructive
- `size`: lg · md · sm

---

### Usage Notes

- Never two primary buttons together in the same view
- The destructive button always precedes an `AlertDialog` for confirmation
- On mobile, primary CTAs take full width
- Loading state blocks double submit — critical on registration and contact forms
- `prefers-reduced-motion`: removes `scale(0.98)` and transitions, retains colour changes

---

*Next component: DS-02 Inputs / Forms*

---

## Spec DS-02 — Inputs / Forms

### Philosophy
Label always visible above the input. Placeholder as a secondary hint, never as a label substitute. Immediate error feedback on blur (onBlur), not on submit.

---

### Field anatomy

```
Label                    ← always visible, 13px, muted colour
┌─────────────────────┐
│ Placeholder / value │  ← input, 40px height
└─────────────────────┘
Error message            ← only visible in error state, 12px, red
```

---

### Types

#### Text
- Use: name, surname, city, free-form specialty
- Height: 40px
- Border-radius: 8px
- Padding: 0 14px

#### Email
- Use: registration, login
- `type="email"` — native browser validation + custom validation
- Envelope icon on the right (decorative, `aria-hidden`)

#### Password
- Use: registration, login
- Show/hide toggle with eye icon — `aria-label="Show password"` / `aria-label="Hide password"`
- Never display the password in plain text for more than 3 seconds without interaction

#### Textarea
- Use: professional profile description, onboarding message
- Minimum height: 64px (stock `min-h-16`; grows with content via `field-sizing-content`)
- Resize: vertical only (`resize: vertical`)
- Character counter in the bottom-right corner when there is a limit

#### Select
- Use: specialty, province
- Chevron-down icon on the right
- Mobile: opens the OS native selector
- Desktop: custom dropdown with shadcn/ui Select

#### Checkbox
- Use: accept terms and conditions
- Size: 20×20px
- Check colour: teal `#4A7C7D`
- Clickable label (label wraps the input)
- `min-height: 44px` for the full touch area

#### File upload
- Use: profile photo, portfolio photos
- Appearance: drag & drop zone + "Upload photo" button
- Accepted formats: JPG, PNG, WebP
- Maximum size: 5MB per file
- Immediate preview of the selected image
- Mobile: opens the system camera or gallery

---

### States

*(Decision 2026-06-11: inputs use **stock shadcn styling** — the design tweakcn
previews — with 44px touch minimums. The earlier custom 1.5px-border treatment
is retired.)*

| State | Border | Label colour | Background |
|-------|--------|--------------|------------|
| Default | `1px solid #D0C2E5` (`--input`) | `#699794` | transparent |
| Focus | `1px solid #4A7C7D` (`--ring`) + teal ring `ring-3 ring-ring/50` | `#60569C` | transparent |
| Error (`aria-invalid`) | `1px solid` destructive + red ring `/20` | `#A32D2D` | transparent |
| Disabled | `1px solid #D0C2E5` | `#7A736B` | `--input` at 50% + `opacity: 50%` · `cursor: not-allowed` |
| Success | *(not implemented in MVP — v2)* | | |

---

### Common Properties

| Property | Value |
|----------|-------|
| `border-radius` | `4px` (`rounded-lg`) |
| `font-size` | `0.9rem` |
| `font-weight` | `400` |
| `color` (value) | `#2B2A28` (foreground) |
| `color` (placeholder) | `#7A736B` (muted-foreground) |
| `transition` | `border-color 150ms ease, background 150ms ease` |
| `width` | `100%` always |
| `min-height` | `44px` (text, email, password, select) |
| Label `font-size` | `13px` |
| Label `font-weight` | `500` |
| Label `margin-bottom` | `6px` |
| Error `font-size` | `12px` |
| Error `color` | `#A32D2D` |
| Error `margin-top` | `4px` |

---

### Focus ring

Teal `ring-3 ring-ring/50` + `border-ring` (stock shadcn, `--ring: #4A7C7D`) —
the same treatment on buttons, chips and cards.

---

### Validation

| Field | Rule |
|-------|------|
| Email | Valid format · required |
| Password | Minimum 8 characters · at least 1 number |
| Name | Minimum 2 characters · letters only |
| Professional description | Minimum 50 characters · maximum 500 |
| Photo | JPG/PNG/WebP · maximum 5MB |

- Client-side validation: `onBlur` (on leaving the field)
- Server-side validation: Supabase + logic in Next.js API route
- Never show errors in real time while typing — only after leaving the field

---

### Form grouping

- Gap between fields: `16px`
- Gap between field groups: `24px`
- Submit button always at the bottom, full width on mobile
- Required fields: asterisk `*` in the label — `aria-required="true"` on the input
- Never more than 6 fields visible at once — if more, split into steps

---

### Accessibility

- Each input has a unique `id` linked to the label's `htmlFor`
- `aria-required="true"` on required fields
- `aria-invalid="true"` in error state
- `aria-describedby` points to the error message when present
- Error message has `role="alert"` for screen readers
- Password toggle: `aria-pressed` to indicate state
- File upload: descriptive `aria-label` on the drop zone

---

### Implementation with shadcn/ui

```
components/
  ui/
    input.tsx      ← shadcn base + HandyFEM styles
    textarea.tsx   ← shadcn base + HandyFEM styles
    select.tsx     ← shadcn base + HandyFEM styles
    checkbox.tsx   ← shadcn base + HandyFEM styles
  forms/
    field.tsx      ← wrapper: label + input + error message
    file-upload.tsx ← custom drag & drop component
```

---

### Usage Notes

- Always use the `<Field>` wrapper — never a standalone input without a label
- Full-form loading state: all inputs `disabled` + submit button in loading state
- On mobile, the virtual keyboard may cover the active input — use `scrollIntoView` on focus
- `prefers-reduced-motion`: removes transitions, retains colour and border changes

---

*Next component: DS-03 Professional cards*

---

## Product Notes — Pending Implementation Decisions

### Location Search

| Version | Feature |
|---------|---------|
| MVP | Text field "City or postcode" → filter by city declared in profile |
| v1.5 | Visual map of results + list/map toggle (Mapbox or Google Maps) |
| v2 | "Near me" with real device geolocation |

**Work radius (MVP):** when creating their profile, the professional specifies one or more cities where they work. The search filters by any of those cities. No GPS, no map, but useful from day one.

→ Add to professional onboarding: field "Which cities do you offer your services in?" (multi-select with main Spanish cities)
→ Add to directory spec: city filter searches in each professional's work city array

---

### Directory Layout

| Version | Feature |
|---------|---------|
| MVP | Horizontal cards on mobile (photo left, info right) · 2-column grid on desktop |
| v1.5 | List / map toggle |
| v2 | "Near me" geolocation |

---

### Directory View Toggle
- Not included in MVP — design and maintenance cost not justified without real users
- Add in v1.5 if users request it

---

## Spec DS-03 — Professional Cards

### Philosophy
The card is the most important element in the directory. It needs to build trust in 3 seconds. Photo, name, specialty, rating and verified badge are the minimum elements to achieve this.

---

### Variants

#### Horizontal card (mobile)
- Layout: photo on the left · info on the right
- Photo: 80×80px, `border-radius: 4px`, `object-fit: cover`
- Width: 100%
- Height: auto (minimum 96px)

#### Vertical card (desktop grid)
- Layout: photo on top · info below
- Photo: full width, height 180px, `border-radius: 4px`, `object-fit: cover`
- Width: 100% of grid column

---

### Content

| Element | Detail |
|---------|--------|
| Photo | Professional's avatar. Fallback: initials in a lavender circle |
| Name | `font-size: 15px` · `font-weight: 500` · dark colour |
| Specialty | `font-size: 13px` · muted teal colour · wrench icon on left |
| Location | `font-size: 12px` · muted colour · map-pin icon on left |
| Rating | Amber star + `font-weight: 500` number + muted review count |
| Verified badge | Small teal pill · pulsing dot · "Verified" |

---

### Card States

| State | Behavior |
|-------|----------|
| Default | Hairline border `0.5px solid #E5E7EB` · white background |
| Hover (desktop) | `translateY(-2px)` · soft teal shadow · `@media (hover: hover)` |
| No photo | Initials in circle `#D0C2E5` with text `#60569C` |
| No ratings | "No ratings yet" in muted grey |
| Incomplete profile | Does not appear in the directory |

---

### Properties

| Property | Value |
|----------|-------|
| `border-radius` | `8px` (`rounded-xl`) |
| `border` | `0.5px solid #E5E7EB` (hairline — polish 2026-06-11) |
| `background` | `#fff` |
| `padding` | `12px` (horizontal) · `16px` (vertical desktop) |
| `transition` | `transform 300ms ease, box-shadow 300ms ease` |
| Hover `transform` | `translateY(-2px)` |
| Hover `box-shadow` | `var(--shadow-lg)` (tweakcn ramp, alias `shadow-card-hover`) |
| `cursor` | `pointer` |

---

### Verified Badge

- Background: `#E1F5EE` (very light teal)
- Text: `#0F6E56` · `font-size: 11px` · `font-weight: 500`
- Pulsing dot: `6px` · `background: #4A7C7D` · `pulse` animation 2s loop
- `border-radius: 9999px`
- Padding: `3px 8px`

---

### Accessibility

- The entire card is clickable → `role="article"` + `tabIndex={0}`
- `aria-label="View profile of {name}, {specialty}"` on the wrapper
- Photo with `alt="{name}, {specialty}"`
- Verified badge with `aria-label="Verified profile"`
- Rating with `aria-label="{n} stars, {n} reviews"`
- Focus ring: teal `ring-3 ring-ring/50` (stock shadcn)

---

### Implementation

```
components/
  professionals/
    professional-card.tsx       ← full card
    professional-card-mobile.tsx ← horizontal variant
```

Props:
- `name: string`
- `specialty: string`
- `city: string`
- `rating: number`
- `reviewCount: number`
- `isVerified: boolean`
- `avatarUrl?: string`
- `initials: string`

---

*Next component: DS-04 Badges / Chips*

---

## Spec DS-04 — Badges / Chips

### Philosophy
Pill for unique, important states. Rounded for categories and informational labels that appear in groups. Shape communicates hierarchy without needing extra colour.

---

### Types and Variants

#### States — pill (border-radius: 9999px)

| Badge | Background | Text | Use |
|-------|-----------|------|-----|
| Verified | `#E1F5EE` | `#0F6E56` | Profile verified by HandyFEM |
| Pending | `#FAEEDA` | `#854F0B` | Profile submitted, awaiting verification |
| New | `#EEEDFE` | `#3C3489` | New chat without a reply |
| In progress | `#E1F5EE` | `#0F6E56` | Service underway |
| Completed | `#E5E7EB` | `#525252` | Service finished — cool gray (`inactive` token) |

#### Categories — rounded (border-radius: 4px)

| Badge | Background | Text | Use |
|-------|-----------|------|-----|
| Specialty | `#D0C2E530` | `#60569C` | Electrical, Plumbing, Carpentry… |
| City | `#4A7C7D15` | `#3A5E5F` | Barcelona, Madrid, Valencia… |
| Active filter | `#4A7C7D` | `#FFFFFF` | Selected filter in the directory |
| Inactive filter | `#FAFAF9` (muted) | `#699794` | Available unselected filter |

---

### Common Properties

| Property | Value |
|----------|-------|
| `font-size` | `11px` |
| `font-weight` | `500` |
| `padding` | `3px 10px` (pill) · `3px 8px` (rounded) |
| `display` | `inline-flex` |
| `align-items` | `center` |
| `gap` | `5px` (for icon or dot) |
| `white-space` | `nowrap` |
| `line-height` | `1` |

---

### Verified Badge — Detail

- Pulsing dot: `6px` · `background: #4A7C7D` · `pulse` animation 2s loop
- `aria-label="Profile verified by HandyFEM"`

---

### Filter Chips — Behavior

- Click on inactive filter → activates (teal background, cream text)
- Click on active filter → deactivates (returns to inactive state)
- Active filters show a `ti-x` icon on the right to clear
- Multiple filters can be active simultaneously
- `role="checkbox"` · `aria-checked="true/false"`

---

### Accessibility

- Informational badges: descriptive `aria-label` when colour is the only differentiator
- Filter chips: `role="checkbox"` + `aria-checked`
- Verified pulsing dot: `aria-hidden="true"` — decorative
- Minimum AA contrast verified on all states

---

### Implementation

```
components/
  ui/
    badge.tsx    ← variants: verified · pending · new · active · complete
    chip.tsx     ← variants: specialty · city · filter-active · filter-inactive
```

Badge props:
- `variant`: verified · pending · new · in-progress · completed
- `children`: badge text

Chip props:
- `variant`: specialty · city · filter
- `active?: boolean` (filters only)
- `onRemove?: () => void` (shows X icon when active)
- `children`: chip text

---

*Next component: DS-05 Avatar*

---

## Pending Polish — Fine-Tuning Items

- [x] DS-04 Active filter chip — X icon too small and misaligned. Adjust size (13–14px) and vertical alignment in the code. *(Applied 2026-06-11: 14px icon in `chip.tsx`.)*

---

## Spec DS-05 — Avatar

### Philosophy
The avatar identifies the user throughout the app. Always circular. Photo if available, initials if not. Never a generic person icon — initials are more personal and consistent with HandyFEM's identity.

---

### Sizes

| Size | Dimension | Use |
|------|-----------|-----|
| XS | 24px | Comments, dense lists |
| SM | 32px | Navbar, inline mentions |
| MD | 40px | Professional cards, chat list |
| LG | 64px | Public profile, dashboard |
| XL | 96px | Profile header |

---

### Variants

#### With photo
- `object-fit: cover`
- `border-radius: 50%`
- Automatic fallback to initials if the image fails to load

#### With initials
- Background: colour assigned by name (consistent — always the same colour for the same user)
- Text: 2 initials — first name + surname
- `font-weight: 500`
- Rotating background palette:

| Colour | Background | Text |
|--------|-----------|------|
| Lavender | `#D0C2E5` | `#60569C` |
| Light teal | `#B3D4D6` | `#3A5E5F` |
| Light amber | `#FCC97040` | `#854F0B` |
| Cool gray | `#E5E7EB` | `#525252` |

#### With status indicator
- Dot in the bottom-right corner
- Online: `#4A7C7D` · Busy: `#FCC970` · Offline: `#E5E7EB`
- Dot size: 10px (MD+) · 8px (SM)
- White `2px` border around the dot to separate it from the avatar

---

### Common Properties

| Property | Value |
|----------|-------|
| `border-radius` | `50%` |
| `flex-shrink` | `0` |
| `overflow` | `hidden` |
| `position` | `relative` (for the status indicator) |
| `user-select` | `none` |

---

### Avatar Group (stack)

For showing multiple participants — for example in a future group view.
- Overlap: `-8px` margin-left from the second avatar
- Border: `2px solid #fff` on each avatar for visual separation
- Maximum visible: 3 avatars + "+N" counter if there are more

---

### Accessibility

- `alt="{full name}"` if it has a photo
- `aria-label="{full name}"` if it has initials
- Status indicator: `aria-label="Online"` / `"Busy"` / `"Offline"`

---

### Implementation

```
components/
  ui/
    avatar.tsx    ← sizes: xs · sm · md · lg · xl
                    variants: photo · initials · with-status
```

Props:
- `size`: xs · sm · md · lg · xl
- `src?: string` — photo URL
- `name: string` — for initials and alt
- `status?: 'online' | 'busy' | 'offline'`

Colour logic by initials:
```ts
const colors = ['lavanda', 'teal', 'amber', 'gray']
const colorIndex = name.charCodeAt(0) % colors.length
```

---

*Next: Spec DS-06 — Summary and global tokens*

- [x] DS-05 Avatar — status indicator does not extend beyond the main circle. Adjust `bottom: -2px; right: -2px` so the dot sits outside the avatar border. *(Applied 2026-06-11 in `avatar.tsx`.)*
- [x] ~~DS-01 Navbar — cream background~~ — obsolete: cream was removed from the palette in the tweakcn pass (2026-06-11). The navbar uses white / muted `#FAFAF9`.
- [x] DS-03 Cards — border too thick. Reduce from `1.5px` to `0.5px` hairline. *(Applied 2026-06-11 with the tweakcn border colour `#E5E7EB`.)*
- [x] Global — background change. Cream removed as a screen background. *(Superseded by the tweakcn theme: main `#FFFFFF`, secondary surfaces = muted `#FAFAF9`. Cream no longer exists as a light-mode token.)*

---

## Spec DS-06 — Global Tokens

### Philosophy
A single source of truth for all DS values: the tweakcn theme in
`app/globals.css` (`:root` + `@theme inline`). This section documents it —
**if this doc and the code ever disagree, the code wins.** Tailwind v4:
tokens live in CSS; there is no `tailwind.config`.

---

### Colours — semantic (shadcn convention)

| Token | Light value | Use |
|-------|-------------|-----|
| `--background` | `#FFFFFF` | Page and card background |
| `--foreground` | `#2B2A28` | Main text, names, titles |
| `--primary` / `-foreground` | `#4A7C7D` / `#FFFFFF` | Primary button (white text), step numbers, main icons |
| `--secondary` / `-foreground` | `#D0C2E5` / `#60569C` | Lavender surfaces, badge backgrounds |
| `--muted` / `-foreground` | `#FAFAF9` / `#7A736B` | Disabled/inactive backgrounds · placeholders, tertiary text |
| `--accent` / `-foreground` | `#FFD894` / `#2B2A28` | Warm amber accent surfaces |
| `--destructive` / `-foreground` | `#E7000B` / `#FFFFFF` | Destructive borders/states |
| `--border` | `#E5E7EB` | Card hairlines, dividers |
| `--input` | `#D0C2E5` | Default input border |
| `--ring` | `#4A7C7D` | Outline ring |

A full dark-mode palette exists in `globals.css` (`.dark`) — no toggle in the
MVP, but don't hardcode light values that would break it.

### Colours — HandyFEM extras (defined in `@theme`)

| Token | Value | Use |
|-------|-------|-----|
| `--color-primary-light` | `#699794` | Muted teal text — specialty, labels |
| `--color-primary-pale` | `#B3D4D6` | Teal avatar, very soft backgrounds |
| `--color-primary-deep` | `#3A5E5F` | Text on pale teal (city chip, avatar) |
| `--color-primary-hover` | `#3A6B6C` | Primary button hover |
| `--color-violet` | `#776AAA` | Secondary button border, links |
| `--color-violet-dark` | `#60569C` | Text on lavender |
| `--color-violet-light` | `#8D7BB8` | Light variant |
| `--color-violet-deep` | `#3C3489` | "New" badge text |
| `--color-lavanda` | `#D0C2E5` | Lavender fills, focus ring base |
| `--color-lavanda-pale` | `#EEEDFE` | "New" badge background |
| `--color-success` / `-foreground` | `#E1F5EE` / `#0F6E56` | Verified, in-progress badges |
| `--color-warning` / `-foreground` | `#FAEEDA` / `#854F0B` | Pending badge |
| `--color-error` / `-foreground` | `#FCEBEB` / `#A32D2D` | Input error background / error text |
| `--color-inactive` / `-foreground` | `#E5E7EB` / `#525252` | Completed badge, offline dot, gray avatar |
| `--color-amber` | `#FCC970` | **Rating stars only** |

---

### Typography

Fonts: see DS-07 (Geist body · Bricolage Grotesque headings). Type scale
(11–32px, 14px base, mobile-first):

| Utility | Size | Line height |
|---------|------|-------------|
| `text-xs` | 11px | 1.3 |
| `text-sm` | 12px | 1.3 |
| `text-ui` | 13px | 1.3 |
| `text-base` | 14px | 1.6 |
| `text-md` | 15px | 1.6 |
| `text-lg` | 16px | 1.6 |
| `text-xl` | 20px | 1.3 |
| `text-2xl` | 24px | 1.3 |
| `text-3xl` | 32px | 1.3 |

Weights: `400` (regular) and `500` (medium) only.
Tracking: `tracking-btn` `0.02em` (buttons) · `tracking-label` `0.05em` (labels/eyebrows).

---

### Spacing

Tailwind default 4px base (`--spacing: 0.25rem`). All values are multiples
of 4 via the standard utilities (`gap-2` = 8px, `p-4` = 16px, …). No custom
spacing tokens.

---

### Border Radius

Base `--radius: 0.25rem` (4px) — sharp, from the tweakcn pass. Derived scale:

| Utility | Value | Use |
|---------|-------|-----|
| `rounded-md` | 2px | (rarely used) |
| `rounded-lg` | 4px | Buttons, inputs, chips, card photos |
| `rounded-xl` | 8px | Cards, modals, panels |
| `rounded-full` | pill | Status badges, filter chips, avatars |

### Border widths

No Tailwind theme namespace exists for border-width, so two `@utility`
classes carry the spec values: `border-emphasis` (1.5px — inputs, secondary
and destructive buttons) and `border-hairline` (0.5px — cards).

---

### Shadows

The tweakcn ramp (`--shadow-2xs` … `--shadow-2xl`, warm-tinted) plus
component aliases:

| Alias | Maps to | Use |
|-------|---------|-----|
| `shadow-card` | `--shadow-xs` | Cards at rest |
| `shadow-card-hover` | `--shadow-lg` | Cards on hover |
| `shadow-nav` | `--shadow-xs` | Navbar at rest |
| `shadow-nav-scroll` | `--shadow-md` | Navbar on scroll |

Focus rings are **not** a shadow: all interactive elements use the stock
shadcn treatment `ring-3 ring-ring/50` (+ `border-ring` where a border
exists), teal via `--ring`.

---

### Transitions

| Duration | Use |
|----------|-----|
| `150ms ease` | Button hover, colour changes |
| `300ms ease` | Card hover, panel transitions |
| `600ms ease-out` | Scroll-triggered entry animations |

Always paired with `motion-reduce:` variants (`prefers-reduced-motion`
removes transforms/transitions, keeps colour changes).

---

### Breakpoints

Single breakpoint at **768px** (Tailwind `md:`). Mobile-first, no tablet
breakpoint — intentional decision, same as Borrissol.

### Touch targets

**44px minimum** on all interactive elements (`min-h-11` / `min-w-11` /
`size-11`).

---

### Implementation

Everything lives in `app/globals.css`: tweakcn variables in `:root`/`.dark`,
Tailwind mappings + HandyFEM extras in `@theme inline`, border-width
`@utility` classes, and heading font assignment in `@layer base`. Fonts load
via `next/font/google` in `app/layout.tsx` (see DS-07). Never create a
`tailwind.config` — that's the v3 pattern.

---
## Design System — Completed ✓

### Components defined
- DS-01 Buttons
- DS-02 Inputs / Forms
- DS-03 Professional cards
- DS-04 Badges / Chips
- DS-05 Avatar
- DS-06 Global tokens

### Next phase
MVP screen specs:
- Spec 01 Landing page ✓
- Spec 02 Sign up / Log in
- Spec 03 Directory + filters
- Spec 04 Public professional profile
- Spec 05 Dashboard with role toggle
- Spec 06 Professional onboarding
- Spec 07 Basic chat

---

## Spec 02 — Sign Up / Log In

### Objective
Register or authenticate the user with minimum friction. Registration creates an account with the base client role. Google OAuth reduces onboarding time to a single click.

---

### URLs
- `/login` — login screen
- `/signup` — registration screen
- `/signup?rol=profesional` — registration with professional intent (coming from the "I'm a professional" landing CTA)

---

### Layout

- Background: muted (`#FAFAF9`)
- Central card: `--background` (`#ffffff`) · `rounded-xl` (8px) · `border-hairline` `#E5E7EB`
- Card maximum width: `440px`
- Horizontally and vertically centred on desktop
- Mobile: full width with no card — form directly on the background

---

### /login Screen

#### Content
| Element | Detail |
|---------|--------|
| Logo | HandyFEM centred at the top |
| Title | "Welcome back" |
| Subtitle | "Log in to your HandyFEM account" |
| Google button | "Continue with Google" · Google icon · full width |
| Divider | line + centred "or" |
| Email field | label "Email" · `type="email"` · `autocomplete="email"` |
| Password field | label "Password" · show/hide toggle · `autocomplete="current-password"` |
| Link | "Forgot your password?" → `/reset-password` |
| Submit button | "Log in" · primary · full width · loading state |
| Bottom link | "Don't have an account? Sign up" → `/signup` |

#### States
| State | Behavior |
|-------|----------|
| Default | Empty form |
| Loading | Button in loading · inputs disabled |
| Credentials error | Inline message "Incorrect email or password" below the button |
| Google error | Toast "Could not connect to Google. Please try again" |
| Success | Redirect to `/dashboard` |

---

### /signup Screen

#### Content
| Element | Detail |
|---------|--------|
| Logo | HandyFEM centred at the top |
| Title | "Create your account" |
| Subtitle | "Join the network of women professionals" |
| Google button | "Continue with Google" · full width |
| Divider | line + centred "or" |
| Name field | label "First name" · `type="text"` · `autocomplete="given-name"` |
| Surname field | label "Surname" · `type="text"` · `autocomplete="family-name"` |
| Email field | label "Email" · `type="email"` · `autocomplete="email"` |
| Password field | label "Password" · show/hide toggle · hint "Minimum 8 characters and 1 number" |
| Checkbox | "I accept the terms and conditions and privacy policy" · required |
| Submit button | "Create account" · primary · full width · loading state |
| Bottom link | "Already have an account? Log in" → `/login` |

#### If coming from `/signup?rol=profesional`
- Same fields
- Subtitle changes to "Start offering your services on HandyFEM"
- After registration, redirect to `/onboarding` instead of `/dashboard`

#### States
| State | Behavior |
|-------|----------|
| Default | Empty form |
| Validation | `onBlur` per field — never in real time |
| Loading | Button in loading · inputs disabled |
| Email exists error | "An account with this email already exists. Would you like to log in?" with link to `/login` |
| Success | Email verification screen |

---

### Email Verification Screen

Appears after registration with email + password (not with Google).

| Element | Detail |
|---------|--------|
| Icon | Large envelope / email · teal colour |
| Title | "Check your email" |
| Subtitle | "We've sent a link to {email}. Click on it to verify your account." |
| Button | "Resend email" · ghost · with 60s cooldown |
| Link | "Change email" → returns to `/signup` |

---

### Password Reset

URL: `/reset-password`

| Element | Detail |
|---------|--------|
| Title | "Reset your password" |
| Email field | label "Email" · `type="email"` |
| Button | "Send link" · primary · full width |
| Success | "We've sent you a link. Check your email." |

---

### Implementation with Supabase

```ts
// Login with email
const { error } = await supabase.auth.signInWithPassword({ email, password })

// Registration with email
const { error } = await supabase.auth.signUp({ email, password,
  options: { data: { nombre, apellido } }
})

// Google OAuth
const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })

// Reset password
const { error } = await supabase.auth.resetPasswordForEmail(email)
```

---

### Security

- Never reveal whether the email exists in login error messages — always use "Incorrect email or password" (prevents user enumeration)
- Rate limiting on login attempts — Supabase handles this by default
- Password never stored in plain text — Supabase handles this
- Session tokens in httpOnly cookies — configure in Supabase + Next.js middleware
- Redirect after login always to an internal URL — never to an external URL (prevents open redirect)

---

### Accessibility

- `autocomplete` on all auth fields
- `aria-live="polite"` on error messages
- Automatic focus on the first field on load
- Submit with Enter from any form field
- Google button has `aria-label="Continue with Google"`

---

*Next: Spec 03 — Directory + filters*

- [x] Spec 02 Sign up / Log in — visual approved ✓

---

## Spec 03 — Directory + Filters

### Objective
Allow the client to find the right professional with minimum friction. Filters reduce noise, cards build trust, and the result is a decision to make contact.

---

### URL
`/directorio`

### Access
- Public — no login required to browse
- Login required only when pressing "Contact"

---

### Layout

| Zone | Detail |
|------|--------|
| Background | Muted `#FAFAF9` |
| Search bar | White background · sticky on scroll · `border-bottom: 0.5px solid #E5E7EB` |
| Filter chips | Below the bar · horizontal scroll on mobile |
| Results | Vertical list on mobile · 2-column grid on desktop |
| Side padding | `16px` mobile · `24px` desktop |

---

### Search Bar

| Element | Detail |
|---------|--------|
| Specialty input | Placeholder "What service do you need?" · search icon on left |
| City input | Placeholder "City or postcode" · map-pin icon on left |
| Search button | "Search" · primary · `height: 40px` |
| Behavior | Sticky on scroll — stays pinned at the top |

---

### Filters

| Filter | Type | Values |
|--------|------|--------|
| Specialty | Multi-select chips | Electrical · Plumbing · Carpentry · Painting · Renovations · Installations · Maintenance |
| City | Text input | Free — filters by cities declared in professional profile |
| Verified only | Toggle chip | Enabled by default |
| 4+ stars | Toggle chip | Disabled by default |

**Behavior:**
- Chips are cumulative — several can be active simultaneously
- Active chip: teal background · cream text · X icon to remove
- Inactive chip: `#FAFAF9` (muted) background · `#E5E7EB` border
- "Clear filters" — ghost link — visible only when filters are active
- Mobile: chips in horizontal scroll with no wrap

---

### Results

| State | Behavior |
|-------|----------|
| Loading | Skeleton cards — 3 animated placeholders |
| With results | Counter "N professionals found" + card list/grid |
| No results | Illustration + "No professionals found with these filters" + "Clear filters" |
| No search | Shows all verified professionals ordered by rating |

**Default order:** verified first → highest rating → most reviews

---

### Card in Directory

Uses DS-03 with these specifications:
- Mobile: horizontal card (photo left · info right)
- Desktop: vertical card (photo top · info below) in 2-column grid
- Click on card → navigates to `/directorio/{id}` (public profile)
- Photo: `object-fit: cover` · initials fallback

---

### Skeleton Loader

While results are loading:
- 3 cards with animated grey blocks (`animation: shimmer`)
- Same dimensions as real cards
- `background: linear-gradient(90deg, #FAFAF9 25%, #E5E7EB 50%, #FAFAF9 75%)`
- Duration: 1.5s loop

---

### Pagination

- MVP: infinite scroll — loads 12 cards initially · 12 more on reaching the end
- Implementation: `IntersectionObserver` on the last visible element
- Loading indicator: centred teal spinner when loading more

---

### SEO

- Server-rendered page (SSR) with Next.js
- Dynamic `<title>` based on active filters: "Electricians in Barcelona — HandyFEM"
- Dynamic `<meta description>`
- URL with query params for sharing searches: `/directorio?especialidad=electricidad&ciudad=barcelona`
- Each card is an `<article>` with structured data (Schema.org Person)

---

### Accessibility

- `<main>` wrapping the main content
- `<search>` wrapping the search bar and filters
- Filter chips: `role="checkbox"` · `aria-checked`
- Results counter: `aria-live="polite"` — announced when changed
- Cards: `role="article"` · `tabIndex={0}` · keyboard navigable
- Skeleton: `aria-busy="true"` on the container during load

---

### Technical Notes

- Supabase query with combined filters:
```ts
let query = supabase
  .from('professionals')
  .select('*')
  .eq('is_verified', true)

if (especialidad) query = query.contains('specialties', [especialidad])
if (ciudad) query = query.contains('cities', [ciudad])
if (soloVerificadas) query = query.eq('is_verified', true)
if (altaValoracion) query = query.gte('rating', 4)
```
- Supabase indices: `specialties`, `cities`, `rating`, `is_verified`
- Results cache with `React Query` or `SWR` — avoids unnecessary refetch when returning from a profile

---

*Next: Spec 04 — Public professional profile*

---

## Spec 04 — Public Professional Profile

### Objective
Give the client enough information to make the decision to get in touch. This is the screen that converts visits into conversations. It needs to build trust in 10 seconds.

---

### URL
`/directorio/[id]`

### Access
- Public — no login required to view
- Login required when pressing "Contact"

---

### Mobile Layout (single column)

```
Header photo (hero image)
Avatar + name + specialty
Verified badge + rating
Work cities
Description
Specialties (chips)
Portfolio (photo grid)
Reviews
Floating CTA "Contact"
```

---

### Sections

#### Header
| Element | Detail |
|---------|--------|
| Hero photo | Full width · height 200px · `object-fit: cover` · light teal fallback |
| Avatar | 72px · overlaid on the hero photo · `border: 3px solid #fff` |
| Name | `font-size: 20px` · `font-weight: 500` · dark colour |
| Main specialty | `font-size: 14px` · muted colour · wrench icon |
| Verified badge | Green pill with pulsing dot |
| Rating | Amber stars + number + review count |

#### Work Cities
| Element | Detail |
|---------|--------|
| Title | "Works in" |
| Chips | City 1 · City 2 · ... (light teal rounded chips) |

#### Description
| Element | Detail |
|---------|--------|
| Title | "About me" |
| Text | Free description · maximum 500 characters |
| Behavior | Truncated to 3 lines with "See more" if it exceeds the visible limit |

#### Specialties
| Element | Detail |
|---------|--------|
| Title | "Specialties" |
| Chips | List of specialties in lavender rounded chips |

#### Portfolio
| Element | Detail |
|---------|--------|
| Title | "Portfolio" |
| Grid | 3 columns · square photos · `object-fit: cover` · `border-radius: 8px` |
| Click | Opens photo full screen (lightbox) |
| No photos | Message "No portfolio photos added yet" |

#### Reviews
| Element | Detail |
|---------|--------|
| Title | "Reviews" · total count |
| Summary | Large star average + 5→1 star distribution bar |
| List | Maximum 5 reviews visible · "See all" if there are more |
| Each review | Client avatar + name + date + stars + text |
| No reviews | "No reviews yet. Be the first." |

---

### Floating CTA

| Element | Detail |
|---------|--------|
| Position | Fixed bottom · full width · padding 12px 16px · white background · `border-top: 0.5px solid #E5E7EB` |
| Button | "Contact {name}" · primary · full width |
| If not logged in | Pressing opens login modal / redirect to `/login?redirect=/directorio/[id]` |
| If logged in | Creates conversation in Supabase + redirect to `/chats/[conversationId]` |

---

### States

| State | Behavior |
|-------|----------|
| Loading | Full-screen skeleton |
| Complete profile | Full layout as described |
| No hero photo | Light teal background `#B3D4D6` as fallback |
| No portfolio | Portfolio section hidden |
| No reviews | Empty state message |
| Profile not found | 404 page with "This professional doesn't exist" + link to directory |

---

### SEO

- SSR with Next.js — page indexable by Google
- `<title>`: "{name} — {specialty} in {city} · HandyFEM"
- `<meta description>`: description truncated to 160 characters
- `og:image`: professional's profile photo
- Schema.org `Person` with name, specialty, city, rating

---

### Accessibility

- `<main>` wrapping the content
- Hero photo with `alt="{name}, {specialty}"`
- Portfolio: each photo with `alt="Portfolio photo by {name}"`
- Lightbox: `role="dialog"` · close with Escape · focus trap
- Floating CTA: `aria-label="Contact {name}"`
- Reviews: `aria-label="{n} stars out of 5"`

---

### Technical Notes

- Data loaded with `generateStaticParams` + `revalidate: 3600` — Next.js ISR
- Reviews loaded client-side to always have the most recent ones
- Portfolio lightbox: `yet-another-react-lightbox` library (accessible, lightweight)
- Post-login redirect: store URL in `sessionStorage` before redirecting to login

---

*Next: Spec 05 — Dashboard with role toggle*

---

## Spec 05 — Dashboard with Role Toggle

### Objective
Main entry point after login. Shows relevant content based on the active role. A single screen that adapts without confusion.

---

### URL
`/dashboard`

### Access
- Login required — redirect to `/login?redirect=/dashboard` if not authenticated

---

### Layout

- Background: muted `#FAFAF9`
- Fixed header: avatar + name + notifications
- Role toggle: tab switcher "Client / Professional"
- Content: changes based on the active role
- Bottom nav (mobile): Home · Directory · Chats · Profile

---

### Dashboard Header

| Element | Detail |
|---------|--------|
| Avatar | SM 32px with initials or photo |
| Greeting | "Hello, {name}" · `font-size: 16px` · `font-weight: 500` |
| Notifications icon | `ti-bell` · numeric badge if there are pending items |
| Background | `#fff` · `border-bottom: 0.5px solid #E5E7EB` |

---

### Role Toggle

| Element | Detail |
|---------|--------|
| Type | Two-option tab switcher |
| Option 1 | "Client" |
| Option 2 | "Professional" |
| Client only | "Professional" tab shows CTA "Activate professional profile" |
| Both roles | Functional toggle between the two modes |
| Persistence | Last active role saved in `localStorage` |
| Background | Grey pill · active tab white background with subtle shadow |

---

### Content — Client Mode

| Section | Detail |
|---------|--------|
| Quick search | Search field → `/directorio` with query |
| Recent chats | Last 3 conversations with professionals · "See all" link → `/chats` |
| Quick access | "Find a professional" button → `/directorio` |

---

### Content — Professional Mode

| Section | Detail |
|---------|--------|
| Profile status | Card with status: Active · Pending · Inactive |
| Quick stats | No. of contacts received · average rating · no. of reviews |
| Recent chats | Last 3 conversations with clients · "See all" link → `/chats` |
| Quick access | "Edit profile" → `/perfil/editar` · "View my public profile" → `/directorio/[id]` |

---

### State — Professional Profile Not Activated

When the user is in professional mode but hasn't activated their profile:

| Element | Detail |
|---------|--------|
| Highlighted card | Icon + "You don't have a professional profile yet" |
| CTA | "Activate professional profile" → `/onboarding` |
| Subtext | "Start receiving client enquiries" |

---

### Mobile Bottom Nav

| Tab | Icon | Destination |
|-----|------|-------------|
| Home | `ti-home` | `/dashboard` |
| Directory | `ti-search` | `/directorio` |
| Chats | `ti-message` · badge for new messages | `/chats` |
| Profile | `ti-user` | `/perfil` |

- Height: 60px · white background · `border-top: 0.5px solid #E5E7EB`
- Active tab: teal icon + label · rest in muted grey
- `min-height: 44px` on each tab

---

### States

| State | Behavior |
|-------|----------|
| Loading | Header skeleton + section skeletons |
| Client only | Toggle shows activation CTA on professional tab |
| Both roles | Functional toggle |
| No chats | "No conversations yet. Find a professional." |
| No professional profile | Highlighted activation card |

---

### Accessibility

- Role toggle: `role="tablist"` · each tab `role="tab"` · `aria-selected` · `aria-controls`
- Each tab content: `role="tabpanel"` · `aria-labelledby`
- Bottom nav: `role="navigation"` · `aria-label="Main navigation"`
- Notifications badge: `aria-label="{n} pending notifications"`
- Chats badge: `aria-label="{n} unread messages"`

---

### Technical Notes

- Active role read from Supabase on load — `profiles.roles[]`
- `localStorage` only to persist the last active tab between sessions
- Professional mode stats calculated in Supabase with RPC functions
- Notification badge uses Supabase Realtime to update without reload

---

*Next: Spec 06 — Professional onboarding*

---

## Spec 06 — Professional Onboarding

### Objective
Guide the user through creating their professional profile clearly and without friction. Split into steps to avoid overwhelming. On completion, the profile becomes active in the directory.

---

### URL
`/onboarding`

### Access
- Login required
- Redirected here from `/signup?rol=profesional` or from the dashboard when pressing "Activate professional profile"

---

### Structure — 4 Steps

```
Step 1 → Specialty and cities
Step 2 → Description and rates
Step 3 → Photos (profile + portfolio)
Step 4 → Confirmation
```

---

### Onboarding Header

| Element | Detail |
|---------|--------|
| Logo | HandyFEM centred |
| Progress bar | 4 segments · teal for completed · grey for pending |
| Indicator | "Step 2 of 4" · `font-size: 12px` · muted colour |
| Back button | `ti-arrow-left` · ghost · returns to the previous step |

---

### Step 1 — Specialty and Cities

| Field | Type | Detail |
|-------|------|--------|
| Main specialty | Select | Electrical · Plumbing · Carpentry · Painting · Renovations · Installations · Maintenance · Other |
| Additional specialties | Multi-select chips | Same options · optional |
| Cities where you work | Multi-select chips | Main Spanish cities · minimum 1 |

**Validation:**
- Main specialty: required
- Cities: minimum 1 required

---

### Step 2 — Description and Rates

| Field | Type | Detail |
|-------|------|--------|
| Professional description | Textarea | Minimum 50 · maximum 500 characters · visible counter |
| Approximate rate | Optional text | "What is your approximate rate? E.g. €40/hour" · no strict validation |

**Note:** The rate is optional and indicative — not used for payments, just as information for the client.

---

### Step 3 — Photos

| Field | Type | Detail |
|-------|------|--------|
| Profile photo | File upload | Required · JPG/PNG/WebP · max 5MB · circular preview |
| Portfolio photos | Multiple file upload | Optional · up to 6 photos · grid preview |

**Behavior:**
- Profile photo: if the user already has a Google account photo, it is used as the default with an option to change it
- Portfolio: drag & drop or selector · immediate preview · X button to remove each photo

---

### Step 4 — Confirmation

| Element | Detail |
|---------|--------|
| Summary | Specialty · cities · truncated description · profile photo |
| CTA | "Publish profile" · primary · full width |
| Subtext | "Your profile will be visible in the directory immediately" |
| Link | "Go back and edit" · ghost |

**When pressing "Publish profile":**
- Saves to Supabase `professionals` table
- Activates the professional role in `profiles.roles[]`
- Redirect to `/dashboard` with toast "Your profile is now active!"

---

### States

| State | Behavior |
|-------|----------|
| Incomplete step | "Continue" button disabled until required fields are complete |
| Uploading photos | Spinner in the upload area · continue button disabled |
| Upload error | Toast "Could not upload the photo. Please try again." |
| Success | Redirect to dashboard + confirmation toast |

---

### Accessibility

- Progress bar: `role="progressbar"` · `aria-valuenow` · `aria-valuemax="4"`
- Each step: `aria-live="polite"` when changing step
- Multi-select chips: `role="checkbox"` · `aria-checked`
- File upload: descriptive `aria-label` · `aria-describedby` with format hint

---

### Technical Notes

- Form state in `useState` — not lost when navigating between steps
- Photos are uploaded to Supabase Storage in step 3 when selected — not on final submit
- If the user abandons onboarding halfway, data is saved in `localStorage` as a draft
- On return, the draft is recovered and the user is asked "Continue where you left off?"

---

*Next: Spec 07 — Basic chat*

---

## Spec 07 — Basic Chat

### Objective
Allow direct communication between client and professional without intermediaries. Simple, functional and real-time.

---

### URLs
- `/chats` — conversations list
- `/chats/[id]` — individual conversation

### Access
- Login required on both routes

---

### /chats Screen — Conversations List

#### Layout
| Element | Detail |
|---------|--------|
| Header | "My chats" · `font-size: 18px` · `font-weight: 500` |
| Background | Muted `#FAFAF9` |
| List | Conversation cards ordered by latest activity |

#### Conversation Card
| Element | Detail |
|---------|--------|
| Avatar | MD 40px of the other person |
| Name | Full name · `font-weight: 500` |
| Preview | Last message truncated to 1 line |
| Timestamp | Time if today · day if this week · date if older |
| Status badge | Pill — New · In progress · Completed |
| Unread badge | Violet dot if there are unread messages |

#### States
| State | Behavior |
|-------|----------|
| No conversations | Icon + "No conversations yet" + "Find a professional" button |
| Loading | Skeleton of 3 cards |
| With conversations | List ordered by latest activity |

---

### /chats/[id] Screen — Conversation

#### Mobile Layout
```
Fixed header    → avatar + name + status badge + back button
Messages        → vertical scroll · bubbles
Fixed input     → text field + attach photo + send
```

#### Conversation Header
| Element | Detail |
|---------|--------|
| Back button | `ti-arrow-left` → `/chats` |
| Avatar | SM 32px |
| Name | `font-size: 14px` · `font-weight: 500` |
| Status badge | Pill — New · In progress · Completed · clickable to change |
| Background | `#fff` · `border-bottom: 0.5px solid #E5E7EB` |

#### Message Bubbles
| Element | Detail |
|---------|--------|
| Own message | Right · teal background `#4A7C7D` · white text · `border-radius: 8px 8px 2px 8px` |
| Other's message | Left · muted `#FAFAF9` background · dark text · `border-radius: 8px 8px 8px 2px` |
| Timestamp | Below the message · `font-size: 11px` · muted colour |
| Attached photo | 200px thumbnail · click opens lightbox |
| Grouping | Consecutive messages from the same sender without repeated avatar |

#### Message Input
| Element | Detail |
|---------|--------|
| Text field | Placeholder "Write a message..." · grows with content · max 4 lines |
| Attach button | `ti-paperclip` · opens photo selector |
| Send button | `ti-send` · teal · disabled if the field is empty |
| Background | `#fff` · `border-top: 0.5px solid #E5E7EB` · padding `8px 16px` |

#### Status Change
- Clicking the status badge opens a bottom sheet with options
- Options: New → In progress → Completed
- Only the professional can change the status
- On marking "Completed" → prompt appears "Leave a review?" → `/valoracion/[id]`

---

### Real Time

- Implementation: Supabase Realtime subscriptions
- On new message: automatic scroll to last message
- "Typing..." indicator when the other person is typing
- New messages marked as read when the conversation is opened

---

### Message States

| State | Icon |
|-------|------|
| Sending | Clock `ti-clock` · grey |
| Sent | Single check `ti-check` · grey |
| Read | Double check `ti-checks` · teal |
| Error | `ti-alert-circle` · red · tap to retry |

---

### Accessibility

- `role="log"` on the messages container · `aria-live="polite"`
- `aria-label="Message from {name}, {timestamp}"` on each bubble
- Input: `aria-label="Write a message"` · `aria-multiline="true"`
- Send button: `aria-label="Send message"` · `aria-disabled` when empty
- Status bottom sheet: `role="dialog"` · focus trap · close with Escape

---

### Technical Notes

- Supabase table: `messages` — `id, conversation_id, sender_id, content, type, created_at, read_at`
- Supabase table: `conversations` — `id, client_id, professional_id, status, created_at, updated_at`
- Attached photos: uploaded to Supabase Storage · thumbnail generated automatically
- Message pagination: loads the last 50 · scroll up loads more
- `useEffect` cleanup of the subscription on component unmount

---

## MVP Specs — Completed ✓

| Screen | Status |
|--------|--------|
| Spec 01 Landing page | ✓ |
| Spec 02 Sign up / Log in | ✓ |
| Spec 03 Directory + filters | ✓ |
| Spec 04 Public professional profile | ✓ |
| Spec 05 Dashboard with role toggle | ✓ |
| Spec 06 Professional onboarding | ✓ |
| Spec 07 Basic chat | ✓ |

- [x] Spec 07 Basic chat — visual approved ✓

---

## Spec DS-07 — Typography & Global Layout

### Typography

| Use | Font | Fallback |
|-----|------|----------|
| Headlines (h1–h4, hero) | Bricolage Grotesque | ui-sans-serif |
| Body, UI, components | Geist | ui-sans-serif, system-ui |
| Mono (rare) | Courier Prime | monospace |

*(tweakcn decision 2026-06-11 — replaces the earlier DM Sans / Plus Jakarta
choice.)* All via `next/font/google` — zero layout shift, optimised loading.

```ts
// app/layout.tsx
import { Geist, Bricolage_Grotesque, Courier_Prime } from "next/font/google"

const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const fontSerif = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-serif", display: "swap" })
const fontMono = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono", display: "swap" })
```

Tokens (`app/globals.css`):
```css
--font-sans: Geist, ui-sans-serif, sans-serif, system-ui;
--font-serif: "Bricolage Grotesque", ui-sans-serif, sans-serif;
--font-mono: "Courier Prime", monospace;
```

`h1`–`h4` get `font-serif` (Bricolage) automatically via `@layer base`.

---

### Global Layout

| Token | Value | Use |
|-------|-------|-----|
| `--max-width` | `1024px` | Maximum container width on desktop |
| `--padding-mobile` | `16px` | Mobile side padding |
| `--padding-desktop` | `24px` | Desktop side padding |
| Visual density | Airy | Generous space between elements — conveys calm and trust |

```css
.container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--padding-mobile);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--padding-desktop);
  }
}
```