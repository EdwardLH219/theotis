# Theotis Mutemi Legal Practitioners — Website

A rebuild of [theotismutemi.com](https://www.theotismutemi.com) as a Next.js 15
App Router application with React 19, TypeScript strict mode, and Tailwind v4.

## Stack

- **Next.js 15** (App Router, RSC), **React 19**, **TypeScript strict**
- **Tailwind v4** (CSS-first via `@theme` tokens in `app/globals.css`)
- **Motion** (motion.dev) for scroll reveals and micro-interactions
- **next/font** (Fraunces, Inter, JetBrains Mono — self-hosted at build)
- **MDX** for long-form Insights content
- **react-hook-form** + **Zod** for the contact form, submitted via a Server Action
- **Resend** for transactional email (env-driven; stubbed in dev)
- **Vercel Analytics + Speed Insights**
- **Playwright** for the smoke suite

## Quick start

```bash
pnpm install
pnpm fetch-assets   # mirrors photographs and logos from the legacy CDN
pnpm dev            # http://localhost:3000
```

## Scripts

| script               | what it does                                                    |
| -------------------- | --------------------------------------------------------------- |
| `pnpm dev`           | Dev server with Turbopack                                       |
| `pnpm build`         | Production build (28 static routes)                             |
| `pnpm start`         | Serve the production build                                      |
| `pnpm typecheck`     | TypeScript --noEmit                                             |
| `pnpm lint`          | ESLint via `next lint`                                          |
| `pnpm fetch-assets`  | Downloads photographs and logos into `public/`                  |
| `pnpm test`          | Playwright smoke suite                                          |

> The asset fetcher is idempotent — existing files are skipped. Re-run only
> when adding new assets.

## Repository structure

```
app/                  routes (home, about, expertise, people, insights, contact, legal)
  globals.css         Tailwind v4 @theme tokens + base layer
components/
  ui/                 primitives (Container, Eyebrow, Heading, Button, ArrowLink, …)
  site/               SiteHeader (mega-menu), SiteFooter, CommandPalette
  marketing/          Hero, PracticeCard, LawyerCard, InsightCard, MarqueeAffiliations, ContactForm
  motion/             Reveal + Stagger + StaggerItem (motion.dev wrappers)
content/
  site.ts             firm metadata
  lawyers.ts          typed Lawyer[] — bios have TODO markers for the long-form text
  practices.ts        three areas + 13 corporate sub-units + 9 litigation sub-areas
  insights/*.mdx      blog posts (frontmatter + body)
lib/
  fonts.ts            next/font wiring
  seo.ts              buildMetadata() helper
  jsonld.tsx          LegalService / Person / Article / BreadcrumbList builders
  cn.ts               class merging (clsx + tailwind-merge)
  contact-schema.ts   Zod schema shared by the form and Server Action
scripts/
  fetch-assets.ts     mirrors imagery from the legacy Wix CDN
tests/
  smoke.spec.ts       Playwright smoke suite
```

## How to add a lawyer

1. Drop the portrait into `public/images/people/<slug>.jpg` (3:4 aspect ratio).
2. Add an entry to `content/lawyers.ts`:

   ```ts
   {
     slug: "jane-doe",
     name: "Jane Doe",
     role: "Associate",
     department: "Litigation",
     portrait: "/images/people/jane-doe.jpg",
     linkedin: "https://www.linkedin.com/in/...",
     shortBio: "One-sentence bio used on cards and the LinkedIn hover overlay.",
     bio: [
       "Paragraph one of the long-form bio.",
       "Paragraph two…",
     ],
   }
   ```

3. The static route `/people/jane-doe` is generated automatically via
   `generateStaticParams`. No further wiring required.

## How to publish an Insight

1. Add an MDX file in `content/insights/<slug>.mdx` with this frontmatter:

   ```mdx
   ---
   title: "Headline"
   publishedAt: "2026-05-27"
   excerpt: "One-line teaser."
   cover: "/images/insights/<slug>.jpg"
   ---
   ```

2. Add a matching entry in `content/insights/index.ts` with the same `slug`,
   `title`, `excerpt`, `publishedAt`, `cover`, and an estimated
   `readingTimeMinutes`.

The MDX body is compiled with `next-mdx-remote/rsc` at request time; pages
are static-rendered via `generateStaticParams`.

## Contact form / Resend

The form posts to a Server Action in `app/contact/actions.ts`. In production
set the following environment variables in Vercel:

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=info@tmlp.com.zm
CONTACT_FROM_EMAIL=no-reply@tmlp.com.zm
```

If `RESEND_API_KEY` is unset, submissions are accepted and logged with a
warning — useful while the firm provisions a sending domain in Resend.

## Deploy to Vercel

1. Push to GitHub.
2. Import the repo in Vercel; framework auto-detects as Next.js.
3. Add the env vars listed above.
4. Custom domain: `www.theotismutemi.com`.

Speed Insights and Web Analytics are wired in `app/layout.tsx` and activate
automatically on Vercel deployments.

## Accessibility and performance

- Skip-to-content link is first in tab order.
- Focus ring is the gold accent (2px, 4px offset).
- All interactive elements are reachable by keyboard.
- Headings cascade `h1` → `h3` per route; no skipped levels.
- All photographs use `next/image` with width/height descriptors.
- The contact form has a honeypot field; submissions with `website` filled
  silently succeed and are not emailed.

## License & content

Photographs and the TMLP logo are © Theotis Mutemi Legal Practitioners and
used here as part of the production website. Article copy on `/insights` is
the firm's own content; the structure of the codebase is internal.
