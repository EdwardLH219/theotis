# Design Notes — TMLP

The brief: editorial, architectural, quietly confident. Not luxury hotel, not
startup, not Wix. The references the site is aimed at — Sullivan & Cromwell,
Slaughter and May, Bredin Prat, Webb Henderson, Linklaters Insights — share
one thing: they look like institutions, not like landing pages. This document
captures the tokens and conventions that hold the rebuild together.

## Palette

| token              | hex       | use                                          |
| ------------------ | --------- | -------------------------------------------- |
| `--color-ink`      | `#0B1220` | primary text, dark sections                  |
| `--color-paper`    | `#F7F4EE` | primary background                           |
| `--color-bone`     | `#EDE7DA` | secondary surface (image fallbacks, panels)  |
| `--color-line`     | `#1B2433` | dark hairlines / hover state on ink          |
| `--color-gold`     | `#B08D57` | single accent — focus, links, numerals       |
| `--color-gold-deep`| `#8C6E40` | gold hover                                   |
| `--color-mute`     | `#5B6472` | secondary text, captions, metadata           |

Used at 12% opacity over paper for hairlines (`border-ink/12` in JSX,
`hairline` in CSS). Gold is reserved for the focus ring, link underlines,
the single dot in `Eyebrow`, the numerals in `SectionNumeral`, and the
animated underline on `Button` and `ArrowLink`. No gradients anywhere.

## Typography

Three variable fonts, self-hosted via `next/font/google` (the `google` loader
self-hosts at build — no runtime CDN call):

- **Fraunces** (display) — opsz + SOFT + WONK axes; pulled toward editorial
  via `font-variation-settings: "opsz" 144, "SOFT" 50, "WONK" 1` on `h1–h4`.
- **Inter** (body & UI) — with `ss01`, `cv11` enabled in CSS for the rounder
  single-storey `a` and disambiguated `1`/`l`/`I`.
- **JetBrains Mono** (numerals & section labels) — exposed as the `--font-mono`
  CSS var and used by the `.label-mono` utility for the `01. / 02.` markers
  and any uppercase metadata.

### Type scale (fluid)

| token            | value                                  | use                  |
| ---------------- | -------------------------------------- | -------------------- |
| `--text-display` | `clamp(3.5rem, 7vw, 7.5rem)` / 0.95 lh | hero H1              |
| `--text-h1`      | `clamp(2.5rem, 5vw, 4.5rem)`           | page H1              |
| `--text-h2`      | `clamp(2rem, 3.5vw, 3rem)`             | section H2           |
| `--text-h3`      | `clamp(1.5rem, 2vw, 1.875rem)`         | sub-section H3       |
| `--text-body-lg` | `1.1875rem` / 1.65 lh                  | hero sub, intro copy |
| `--text-body`    | `1.0625rem` / 1.7 lh                   | body copy            |
| `--text-small`   | `0.875rem` / 1.5 lh                    | captions             |
| `--text-label`   | `0.75rem`, tracking `0.18em`, uppercase| eyebrows, metadata   |

Headlines are `text-balance` with tight leading (~0.95–1.05). Body is
`text-pretty` and capped at `max-w-[65ch]` via the `.prose-editorial` utility.

## Layout

- 12-column grid inside `<Container>`, capped at `max-w-[1440px]`.
- Page gutters: `px-6 md:px-12 lg:px-20`.
- Vertical rhythm: `py-24 md:py-32 lg:py-40` between major sections.
- Asymmetric: section labels live in the left 3 cols, content in the right 9.
- Hairlines are 1px at 12% ink. No drop shadows in light mode.

## Motion

`components/motion/Reveal.tsx` is the only motion abstraction. All scroll
reveals fade and lift 12px with a 600ms `[0.22, 1, 0.36, 1]` ease, triggered
once per element via `viewport={{ once: true, margin: "-80px" }}`. Stagger
defaults to 60ms (configurable via the `step` prop). `useReducedMotion()` is
honored — the abstraction renders the unwrapped element when reduced motion
is on, and CSS in `globals.css` collapses any remaining transitions to 0.01ms.

Hover micro-interactions live in CSS: the `.gold-underline` utility grows a
1px gold line from `0%` → `100%` width on hover/group-hover. Arrow links
translate the `ArrowUpRight` icon `0.5px` up-and-right over 300ms.

## Components inventory

| component                   | file                                        |
| --------------------------- | ------------------------------------------- |
| `Container`                 | `components/ui/Container.tsx`               |
| `Eyebrow`                   | `components/ui/Eyebrow.tsx`                 |
| `SectionNumeral`            | `components/ui/SectionNumeral.tsx`          |
| `DisplayHeading`, `Heading` | `components/ui/Heading.tsx`                 |
| `Prose`                     | `components/ui/Prose.tsx`                   |
| `Button`                    | `components/ui/Button.tsx`                  |
| `ArrowLink`                 | `components/ui/ArrowLink.tsx`               |
| `Reveal`, `Stagger`         | `components/motion/Reveal.tsx`              |
| `SiteHeader`                | `components/site/SiteHeader.tsx`            |
| `SiteFooter`                | `components/site/SiteFooter.tsx`            |
| `CommandPalette`            | `components/site/CommandPalette.tsx`        |
| `Hero`                      | `components/marketing/Hero.tsx`             |
| `PracticeCard`              | `components/marketing/PracticeCard.tsx`     |
| `LawyerCard`                | `components/marketing/LawyerCard.tsx`       |
| `InsightCard`               | `components/marketing/InsightCard.tsx`      |
| `MarqueeAffiliations`       | `components/marketing/MarqueeAffiliations.tsx` |
| `ContactForm`               | `components/marketing/ContactForm.tsx`      |

## Conventions

- No `<h1>` written directly in pages — use `DisplayHeading` or `Heading`.
- No raw Tailwind colors — only the `--color-*` tokens.
- No `console.log` in committed code; `console.warn` / `console.error` are
  the allowed escape hatches (and used only in the asset script and the
  contact action's degraded path).
- Long-form copy that would otherwise overflow gets the `.prose-editorial`
  utility for the 65ch cap and pretty wrapping.
- `next/image` for every image — `fill` with a containing `relative aspect-*`
  wrapper, or `width`/`height` for portraits and covers.
- Decorative imagery uses `alt=""`; meaningful imagery uses `alt={…}` (e.g.
  `"${name}, ${role}"`).

## Open follow-ups

- Replace `bio: []` entries in `content/lawyers.ts` with verbatim long-form
  text from `theotismutemi.com/our-team`.
- Replace the two MDX insight bodies with verbatim text from the legacy blog.
- Replace the four `TODO(content)` markers in `app/about/page.tsx` (Vision,
  Mission, Legacy, Global Law Experts write-up) with verbatim copy.
- Replace the two `TODO(legal)` markers in `app/legal/{privacy,terms}/page.tsx`
  with approved policy copy before launch.
- Provision Resend domain and set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
  `CONTACT_FROM_EMAIL` in Vercel.
