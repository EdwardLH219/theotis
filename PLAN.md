# Build Plan — theotismutemi.com

A sequenced execution plan for rebuilding TMLP's website per the brief.

## Phase 1 — Scaffold
- Next.js 15 (App Router, RSC), React 19, TypeScript strict
- Tailwind v4 with CSS-first `@theme` tokens in `app/globals.css`
- Package manager: pnpm
- ESLint, Prettier, `tsconfig` strict, path alias `@/*`

## Phase 2 — Design system
- Color tokens (ink, paper, bone, line, gold, gold-deep, mute)
- Variable fonts via `next/font`: Fraunces, Inter, JetBrains Mono
- Fluid type scale with `clamp()`
- Container & gutters, 12-col asymmetric grid utilities
- Motion primitives (Reveal, Stagger) honoring `prefers-reduced-motion`

## Phase 3 — Primitives
`Container`, `SectionNumeral`, `Eyebrow`, `DisplayHeading`, `Heading`, `Prose`, `Button`, `ArrowLink`, `MarqueeAffiliations`, `SiteHeader` (with mega-menu), `SiteFooter`, `CommandPalette` (cmdk).

## Phase 4 — Content layer
- `content/site.ts` — firm metadata
- `content/lawyers.ts` — typed array; bios sourced from legacy site (TODO markers where unavailable)
- `content/practices.ts` — three areas + 13 corporate sub-units + 9 litigation sub-areas
- `content/insights/*.mdx` — two seed posts (titles only; bodies TODO)

## Phase 5 — Routes (bottom-up)
Footer → Header → Home → About → Expertise (index + 3 children) → People (index + slug) → Insights (index + slug) → Contact → Legal stubs.

## Phase 6 — SEO & structured data
- `generateMetadata` helpers
- JSON-LD: `LegalService`, `Person`, `Article`, `BreadcrumbList`
- `sitemap.xml`, `robots.txt`
- OG image route via `@vercel/og`

## Phase 7 — Asset pipeline
- `scripts/fetch-assets.ts` to pull from Wix CDN into `public/images/`
- Document running it as a prerequisite

## Phase 8 — Forms
- `react-hook-form` + Zod schema
- Server Action submission; Resend integration stubbed with TODO env wiring

## Phase 9 — A11y, perf, polish
- Skip-link, focus rings, keyboard tour, axe pass
- Lighthouse mobile pass — defer non-critical JS
- Vercel Analytics + Speed Insights

## Phase 10 — Tests & docs
- Playwright smoke suite (home, nav, contact-form validation, lawyer routes)
- `README.md`, `DESIGN_NOTES.md`
- Vercel deploy config notes
