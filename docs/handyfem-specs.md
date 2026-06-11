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
| Background | Cream `#F4EBD7` |

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
| Background | Background `#F8F5F0` |

---

#### 5. Testimonials

| Element | Detail |
|---------|--------|
| Section title | "What people say about HandyFEM" |
| Count | 3 testimonials |
| Content | Name, avatar with initials, specialty or city, testimonial text, star rating |
| Data | Fictitious for MVP |
| Background | Cream `#F4EBD7` |

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
| Background | `#2C2C2A`, text `#D3D1C7` |

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
| `--color-primary` | `#4A7C7D` |
| `--color-accent` | `#776AAA` |
| `--color-bg-primary` | `#ffffff` |
| `--color-lavanda` | `#D0C2E5` |
| `--color-muted` | `#699794` |
| `--color-dark` | `#2C2C2A` |
| `--radius-pill` | `9999px` |
| `--radius-lg` | `16px` |
| `--border-default` | `0.5px solid #D0C2E5` |
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
- Text: `#F4EBD7` (cream)
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
| Medium | 40px | 20px | 0.9rem | Cards, forms, dashboard |
| Small | 32px | 14px | 0.8rem | Filters, chips, inline actions |

---

### Common Properties (all variants)

| Property | Value |
|----------|-------|
| `border-radius` | `8px` (rounded) |
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
| Focus | `box-shadow: 0 0 0 3px #D0C2E5` — lavender ring for keyboard accessibility |
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
- Visible focus ring: `box-shadow: 0 0 0 3px #D0C2E5`
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
- Minimum height: 120px
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

| State | Border | Label colour | Background |
|-------|--------|--------------|------------|
| Default | `1.5px solid #D0C2E5` | `#699794` | `#fff` |
| Focus | `1.5px solid #776AAA` | `#60569C` | `#fff` |
| Filled | `1.5px solid #D0C2E5` | `#699794` | `#fff` |
| Error | `1.5px solid #E24B4A` | `#A32D2D` | `#FCEBEB` |
| Disabled | `1.5px solid #D0C2E5` | `#B4B2A9` | `#F8F5F0` · `cursor: not-allowed` |
| Success | `1.5px solid #4A7C7D` | `#4A7C7D` | `#fff` · check icon on right |

---

### Common Properties

| Property | Value |
|----------|-------|
| `border-radius` | `8px` |
| `font-size` | `0.9rem` |
| `font-weight` | `400` |
| `color` (value) | `#2C2C2A` |
| `color` (placeholder) | `#B4B2A9` |
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

```css
box-shadow: 0 0 0 3px #D0C2E550;
```
Semi-transparent lavender — consistent with the button focus ring.

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
- Photo: 80×80px, `border-radius: 8px`, `object-fit: cover`
- Width: 100%
- Height: auto (minimum 96px)

#### Vertical card (desktop grid)
- Layout: photo on top · info below
- Photo: full width, height 180px, `border-radius: 8px 8px 0 0`, `object-fit: cover`
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
| Default | Lavender border `1.5px solid #D0C2E5` · white background |
| Hover (desktop) | `translateY(-2px)` · soft teal shadow · `@media (hover: hover)` |
| No photo | Initials in circle `#D0C2E5` with text `#60569C` |
| No ratings | "No ratings yet" in muted grey |
| Incomplete profile | Does not appear in the directory |

---

### Properties

| Property | Value |
|----------|-------|
| `border-radius` | `12px` |
| `border` | `1.5px solid #E0DDD6` (neutral grey) |
| `background` | `#fff` |
| `padding` | `12px` (horizontal) · `16px` (vertical desktop) |
| `transition` | `transform 300ms ease, box-shadow 300ms ease` |
| Hover `transform` | `translateY(-2px)` |
| Hover `box-shadow` | `0 8px 24px rgba(74,124,125,0.10)` |
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
- Focus ring: `box-shadow: 0 0 0 3px #D0C2E550`

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
| Completed | `#D3D1C7` | `#444441` | Service finished |

#### Categories — rounded (border-radius: 6px)

| Badge | Background | Text | Use |
|-------|-----------|------|-----|
| Specialty | `#D0C2E530` | `#60569C` | Electrical, Plumbing, Carpentry… |
| City | `#4A7C7D15` | `#3A5E5F` | Barcelona, Madrid, Valencia… |
| Active filter | `#4A7C7D` | `#F4EBD7` | Selected filter in the directory |
| Inactive filter | `#F8F5F0` | `#699794` | Available unselected filter |

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

- [ ] DS-04 Active filter chip — X icon too small and misaligned. Adjust size (13–14px) and vertical alignment in the code.

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
| Dark cream | `#D3D1C7` | `#444441` |

#### With status indicator
- Dot in the bottom-right corner
- Online: `#4A7C7D` · Busy: `#FCC970` · Offline: `#D3D1C7`
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

- [ ] DS-05 Avatar — status indicator does not extend beyond the main circle. Adjust `bottom: -2px; right: -2px` so the dot sits outside the avatar border.
- [ ] DS-01 Navbar — check background colour in the preview, it should be cream `#F4EBD7` not dull yellow. Verify `--color-cream` token in the code.
- [ ] DS-03 Cards — border too thick. Reduce from `1.5px` to `0.5px solid #E0DDD6`.

- [ ] Global — background change. Cream (`#F4EBD7`) is removed as a screen background colour. Replace with:
  - Main background: `#ffffff`
  - Secondary background (surfaces, navbar, alternate sections): `#F5F5F5`
  - Cream is reserved only for very occasional accent elements where warmth is needed (e.g. landing final CTA)

---

## Spec DS-06 — Global Tokens

### Philosophy
A single source of truth for all DS values. Any colour, typography or spacing change is made here and propagates throughout the entire app automatically.

---

### Colours

#### Backgrounds
| Token | Value | Use |
|-------|-------|-----|
| `--color-bg-primary` | `#ffffff` | Main background for screens and cards |
| `--color-bg-secondary` | `#F5F5F5` | Alternate sections, search bar, navbar interior |
| `--color-bg-cream` | `#F4EBD7` | Very occasional use — landing final CTA, warm accent |

#### Primary — teal
| Token | Value | Use |
|-------|-------|-----|
| `--color-primary` | `#4A7C7D` | Primary button, step numbers, main icons |
| `--color-primary-light` | `#699794` | Muted text, specialty label |
| `--color-primary-pale` | `#B3D4D6` | Teal avatar, very soft backgrounds |
| `--color-primary-hover` | `#3A6B6C` | Primary button hover |

#### Accent — violet
| Token | Value | Use |
|-------|-------|-----|
| `--color-accent` | `#776AAA` | Secondary button border, links, FEM in logo |
| `--color-accent-dark` | `#60569C` | Text on lavender, accent hover |
| `--color-accent-light` | `#8D7BB8` | Light variant |
| `--color-lavanda` | `#D0C2E5` | Badge backgrounds, lavender avatar, focus ring |
| `--color-lavanda-pale` | `#EEEDFE` | "New" badge background |

#### Text
| Token | Value | Use |
|-------|-------|-----|
| `--color-text-primary` | `#2C2C2A` | Main text, names, titles |
| `--color-text-muted` | `#699794` | Subtitles, specialty, labels |
| `--color-text-subtle` | `#B4B2A9` | Placeholder, location, tertiary text |

#### Borders
| Token | Value | Use |
|-------|-------|-----|
| `--color-border` | `#E0DDD6` | Neutral card and default input border |
| `--color-border-focus` | `#776AAA` | Input border on focus |
| `--color-border-error` | `#E24B4A` | Input border on error |
| `--color-border-success` | `#4A7C7D` | Input border on success |

#### Semantic
| Token | Value | Use |
|-------|-------|-----|
| `--color-success-bg` | `#E1F5EE` | Verified badge, in-progress |
| `--color-success-text` | `#0F6E56` | Text on success background |
| `--color-warning-bg` | `#FAEEDA` | Pending badge |
| `--color-warning-text` | `#854F0B` | Text on warning background |
| `--color-error-bg` | `#FCEBEB` | Input error background |
| `--color-error-text` | `#A32D2D` | Error text |
| `--color-amber` | `#FCC970` | Rating stars only |

---

### Typography

| Token | Value |
|-------|-------|
| `--font-sans` | `Inter, system-ui, sans-serif` |
| `--font-size-xs` | `11px` |
| `--font-size-sm` | `12px` |
| `--font-size-ui` | `13px` |
| `--font-size-base` | `14px` |
| `--font-size-md` | `15px` |
| `--font-size-lg` | `16px` |
| `--font-size-xl` | `20px` |
| `--font-size-2xl` | `24px` |
| `--font-size-3xl` | `32px` |
| `--font-weight-regular` | `400` |
| `--font-weight-medium` | `500` |
| `--line-height-tight` | `1.3` |
| `--line-height-base` | `1.6` |
| `--letter-spacing-btn` | `0.02em` |
| `--letter-spacing-label` | `0.05em` |

---

### Spacing

4px base system. All values are multiples of 4.

| Token | Value | Use |
|-------|-------|-----|
| `--space-1` | `4px` | Minimum gap between inline elements |
| `--space-2` | `8px` | Gap between icon and text |
| `--space-3` | `12px` | Internal padding of mobile cards |
| `--space-4` | `16px` | Gap between form fields |
| `--space-5` | `20px` | Horizontal padding of desktop cards |
| `--space-6` | `24px` | Gap between field groups |
| `--space-8` | `32px` | Section padding |
| `--space-12` | `48px` | Separation between large sections |

---

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | `6px` | Category badges, chips |
| `--radius-md` | `8px` | Buttons, inputs, avatar photos in cards |
| `--radius-lg` | `12px` | Cards, modals, panels |
| `--radius-xl` | `16px` | Sections, large containers |
| `--radius-pill` | `9999px` | Navbar, status badges, active filter chips |

---

### Shadows

| Token | Value | Use |
|-------|-------|-----|
| `--shadow-card` | `0 2px 12px rgba(0,0,0,0.06)` | Cards at rest |
| `--shadow-card-hover` | `0 8px 24px rgba(74,124,125,0.08)` | Cards on hover |
| `--shadow-nav` | `0 2px 12px rgba(0,0,0,0.06)` | Navbar at rest |
| `--shadow-nav-scroll` | `0 4px 24px rgba(74,124,125,0.12)` | Navbar on scroll |
| `--shadow-focus` | `0 0 0 3px #D0C2E550` | Input and button focus ring |

---

### Transitions

| Token | Value | Use |
|-------|-------|-----|
| `--t-fast` | `150ms ease` | Button hover, colour changes |
| `--t-normal` | `300ms ease` | Card hover, panel transitions |
| `--t-slow` | `600ms ease-out` | Scroll-triggered entry animations |

---

### Breakpoints

| Token | Value | Description |
|-------|-------|-------------|
| `--bp-mobile` | `< 768px` | Mobile — single-column layout |
| `--bp-desktop` | `≥ 768px` | Desktop — grid, full navbar |

No tablet breakpoint — intentional decision, same as Borrissol.

---

### Touch Targets

| Token | Value |
|-------|-------|
| `--min-touch` | `44px` | Minimum on all interactive elements |

---

### Implementation in Next.js + Tailwind

```css
/* globals.css */
:root {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #F5F5F5;
  --color-primary: #4A7C7D;
  --color-accent: #776AAA;
  /* ... rest of tokens */
}
```

```ts
/* tailwind.config.ts */
theme: {
  extend: {
    colors: {
      primary: '#4A7C7D',
      accent: '#776AAA',
      lavanda: '#D0C2E5',
      amber: '#FCC970',
    },
    borderRadius: {
      pill: '9999px',
    }
  }
}
```

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

- Background: `--color-bg-secondary` (`#F5F5F5`)
- Central card: `--color-bg-primary` (`#ffffff`) · `border-radius: 16px` · `border: 0.5px solid #E0DDD6`
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
| Background | `#F5F5F5` |
| Search bar | White background · sticky on scroll · `border-bottom: 0.5px solid #E0DDD6` |
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
- Inactive chip: `#F5F5F5` background · `#E0DDD6` border
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
- `background: linear-gradient(90deg, #F5F5F5 25%, #E8E8E8 50%, #F5F5F5 75%)`
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
| Position | Fixed bottom · full width · padding 12px 16px · white background · `border-top: 0.5px solid #E0DDD6` |
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

- Background: `#F5F5F5`
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
| Background | `#fff` · `border-bottom: 0.5px solid #E0DDD6` |

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

- Height: 60px · white background · `border-top: 0.5px solid #E0DDD6`
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
| Background | `#F5F5F5` |
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
| Background | `#fff` · `border-bottom: 0.5px solid #E0DDD6` |

#### Message Bubbles
| Element | Detail |
|---------|--------|
| Own message | Right · teal background `#4A7C7D` · cream text · `border-radius: 12px 12px 2px 12px` |
| Other's message | Left · `#F5F5F5` background · dark text · `border-radius: 12px 12px 12px 2px` |
| Timestamp | Below the message · `font-size: 11px` · muted colour |
| Attached photo | 200px thumbnail · click opens lightbox |
| Grouping | Consecutive messages from the same sender without repeated avatar |

#### Message Input
| Element | Detail |
|---------|--------|
| Text field | Placeholder "Write a message..." · grows with content · max 4 lines |
| Attach button | `ti-paperclip` · opens photo selector |
| Send button | `ti-send` · teal · disabled if the field is empty |
| Background | `#fff` · `border-top: 0.5px solid #E0DDD6` · padding `8px 16px` |

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
| Headlines (h1, h2, hero) | Plus Jakarta Sans | system-ui |
| Body, UI, components | DM Sans | system-ui |

Both via `next/font/google` — zero layout shift, optimised loading.

```ts
// app/layout.tsx
import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})
```

Tokens:
```css
--font-sans: 'DM Sans', system-ui, sans-serif;
--font-display: 'Plus Jakarta Sans', system-ui, sans-serif;
```

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