# Master Prompt: Rebuild theotismutemi.com — A Modern, Editorial Law Firm Website

> **How to use this file:** Open a fresh Claude Code session inside an empty repository, then paste the contents below as your first message. Claude Code will scaffold, design, and ship the site end-to-end. Reference content and image URLs are already embedded — you should not need to gather anything else from the legacy site.

---

## ROLE

You are a senior product engineer + design technologist with deep taste. You build websites that win Awwwards SOTD, but for serious professional-services clients. You ship production-grade Next.js, you know modern type, motion, and accessibility cold, and you understand the difference between "looks designed" and "looks generated." You write opinionated code with strict TypeScript, you use shadcn/ui as a base but customize aggressively, and you never leave default Tailwind colors in a finished file.

You are rebuilding the website for **Theotis Mutemi Legal Practitioners (TMLP)** — Zambia's premier Lusaka law firm. The current site is a generic Wix template circa 2018. Your job is to replace it with a confident, editorial, internationally-credible website that signals "this is the firm corporate clients in Lusaka, Johannesburg, and London hire when something serious is happening."

---

## NORTH-STAR REFERENCES (study before you start)

Match this tier of polish:

- **Sullivan & Cromwell** (sullcrom.com) — institutional gravitas, restrained color
- **Slaughter and May** (slaughterandmay.com) — generous whitespace, editorial typography
- **Bredin Prat** (bredinprat.com) — bold serif, asymmetric grid, French-luxury restraint
- **Webb Henderson** (webbhenderson.com) — modern monochrome, confident motion
- **Linklaters' Insights hub** — magazine-quality article cards

Do NOT reference: any Wix/Squarespace template, "law firm template" Dribbble shots, AI hero gradients, glassmorphism.

The visual register is **editorial, architectural, quietly confident**. Not "techy," not "luxury hotel," not "startup."

---

## TECH STACK (non-negotiable unless you have a strong reason)

- **Next.js 15** (App Router, React Server Components, Partial Prerendering enabled)
- **React 19** + **TypeScript** in strict mode (no `any`, no `@ts-ignore`)
- **Tailwind CSS v4** (CSS-first config via `@theme`, no `tailwind.config.ts`)
- **shadcn/ui** as base primitives — but restyle them to match the brand, do not ship default look
- **Motion** (motion.dev, formerly Framer Motion) for animation — use sparingly and only for scroll-reveal, page transitions, and hover micro-interactions
- **next/font** with variable fonts loaded locally (no Google Fonts CDN at runtime)
- **next/image** for every image, with `placeholder="blur"` for hero shots
- **MDX** + `@next/mdx` for the Insights/blog section so the firm can write articles in markdown
- **Lucide React** for icons (no emoji icons, no Font Awesome)
- **react-hook-form** + **Zod** for the contact form, with server actions for submission
- **Resend** (or a TODO comment with the SMTP integration point) for contact-form delivery
- **next-sitemap** for sitemap.xml + robots.txt
- **JSON-LD structured data**: `LegalService`, `Person` (for each lawyer), `BreadcrumbList`, `Article` (for blog posts)
- **Vercel Analytics + Speed Insights** wired in
- **pnpm** as package manager
- Deploy target: **Vercel**

Lighthouse targets on the deployed build: **Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100** on mobile.

---

## DESIGN SYSTEM

### Palette (define in `app/globals.css` via `@theme`)

A duotone foundation with one accent — no rainbow.

```
--color-ink:         #0B1220   /* near-black, primary text & dark sections */
--color-paper:       #F7F4EE   /* warm off-white, primary background */
--color-bone:        #EDE7DA   /* secondary surface */
--color-line:        #1B2433   /* hairlines on dark, used at 12% opacity on light */
--color-gold:        #B08D57   /* single accent — buttons, underlines, numerals */
--color-gold-deep:   #8C6E40   /* hover state */
--color-mute:        #5B6472   /* secondary text */
```

Dark mode: invert ink/paper, keep gold the same. Implement with `next-themes`, default to light.

### Typography

Use variable fonts, loaded locally via `next/font/local`. Pair:

- **Display / Headlines:** *Fraunces* (variable, opsz + wght + soft + WONK axes) — set `font-variation-settings` to lean slightly editorial (`"opsz" 144, "SOFT" 50, "WONK" 1`) at large sizes. Use for H1–H3 and pull quotes.
- **Body / UI:** *Inter* (variable) at `font-feature-settings: "ss01", "cv11"` — for everything else.
- **Numerals & section labels:** *JetBrains Mono* (variable) — for the "01. / 02. / 03." section numerals and metadata (dates, locations).

Type scale (fluid, using `clamp()`):

```
display:  clamp(3.5rem, 7vw, 7.5rem)   /* hero H1 */
h1:       clamp(2.5rem, 5vw, 4.5rem)
h2:       clamp(2rem, 3.5vw, 3rem)
h3:       clamp(1.5rem, 2vw, 1.875rem)
body-lg:  1.1875rem / 1.65
body:     1.0625rem / 1.7
small:    0.875rem  / 1.5
label:    0.75rem   / 1   uppercase, tracking-[0.18em]
```

Headlines are set tight (`leading-[0.95]`) with `text-balance`. Body copy is `text-pretty` and capped at `max-w-[65ch]`.

### Layout & grid

- **12-column grid**, `max-w-[1440px]`, `px-6 md:px-12 lg:px-20`.
- Use **asymmetric layouts** — never center everything. Headlines often span 8–10 columns with the body offset 4 columns to the right; section numerals sit in the left gutter.
- Generous vertical rhythm: `py-24 md:py-32 lg:py-40` between major sections.
- Hairline dividers (`border-ink/12`), not thick rules. No drop shadows on cards in light mode; use subtle borders + hover lift instead.

### Motion principles

- **Scroll reveals:** subtle (8–16px translateY, opacity 0 → 1, 600ms, custom cubic-bezier `[0.22, 1, 0.36, 1]`). Stagger by 60ms for lists.
- **Page transitions:** view-transitions API where supported, fallback to a 200ms fade.
- **Hover:** underlines draw in left-to-right; image cards zoom 1.03 over 700ms; the gold accent line on buttons grows from 0 → 100% width.
- **No parallax** on hero images. No looping background videos. No "AI gradient mesh."
- Respect `prefers-reduced-motion` — disable all reveals, keep state changes.

### Components (build these, in this order)

1. `<Container>` — applies the page gutters.
2. `<SectionNumeral n="01" label="Practice" />` — left-gutter numeral + uppercase label.
3. `<Eyebrow>` — small uppercase label, mono font, gold accent dot.
4. `<DisplayHeading>` and `<Heading level={2|3}>` — typed component, never raw `<h1>` in pages.
5. `<Prose>` — wraps long-form copy with the right line-length + spacing rules.
6. `<Button variant="primary|ghost|link">` — primary is ink-on-paper with a gold underline that grows on hover; no rounded-full pill buttons.
7. `<ArrowLink href>` — link with an animated arrow that translates on hover.
8. `<PracticeCard>` — used on home + practice index. Number, title, 2-line description, ArrowLink.
9. `<LawyerCard>` — portrait, name, role, 1-sentence bio, LinkedIn icon. Hover reveals a longer bio overlay.
10. `<InsightCard>` — article card with image, date, title, 2-line excerpt.
11. `<MarqueeAffiliations>` — slow horizontal scroll of affiliation logos, pauses on hover.
12. `<ContactForm>` — react-hook-form + Zod, inline validation, success state with a serif "Thank you" message.
13. `<SiteHeader>` — sticky, translucent on scroll, with a magnetic mega-menu for "Expertise" that opens to a 3-column panel listing all corporate sub-units.
14. `<SiteFooter>` — multi-column, includes office address, hours (Mon–Fri 08:00–17:00 CAT), contact lines, social, affiliations, fine print.
15. `<CommandPalette>` (Cmd/Ctrl+K) — searches lawyers, practice areas, and insights. Built with `cmdk`.

---

## INFORMATION ARCHITECTURE

Routes (App Router):

```
/                           Home
/about                      About the firm (vision, mission, values, legacy)
/expertise                  Practice index — all three areas + corporate sub-units
/expertise/litigation       Business & Corporate Litigation (9 sub-areas)
/expertise/corporate        Corporate (13 sub-units)
/expertise/adr              Alternative Dispute Resolution
/people                     Our Team (partners, then by department)
/people/[slug]              Individual lawyer profile pages (generated from data file)
/insights                   Blog / Stay Informed (MDX-backed)
/insights/[slug]            Individual article
/contact                    Contact (form + map + office details)
/legal/privacy              Privacy policy (stub, marked TODO)
/legal/terms                Terms of use (stub, marked TODO)
```

Header nav: **Home · About · Expertise · People · Insights · Contact**. The "Expertise" item opens a mega-menu, not a dropdown list — show all 3 areas as columns with the 13 sub-units listed under "Corporate".

---

## CONTENT (verbatim from the existing site — use as-is unless polishing for grammar/flow)

### Firm identity

- **Name:** Theotis Mutemi Legal Practitioners (TMLP)
- **Tagline options to consider** (write 3 of your own based on the content): one editorial, one operational, one aspirational. Examples to beat: *"Counsel for what comes next."* / *"Corporate law, practiced with precision."* / *"Lusaka's quiet powerhouse for commercial disputes."*
- **Address:** No. 13 Benakale Road, Northmead, P.O. Box 36125, Lusaka, Zambia
- **Email:** info@tmlp.com.zm
- **Phone:** +260 211 222 511 / +260 211 222 512
- **Socials:** X — https://x.com/TheotisMutemi · LinkedIn — https://www.linkedin.com/company/theotis-mutemi-legal-practitioners/

### Home page sections (in order)

1. **Hero.** Display headline (write a fresh one — something like *"Counsel for Zambia's most consequential matters."*). Sub-line drawn from: *"A Lusaka-based firm uniting nearly four decades of partner experience across business litigation, corporate advisory, and alternative dispute resolution."* Two CTAs: *Explore our expertise* (primary) → /expertise · *Speak with us* (ghost) → /contact. Right side: the partners group portrait (use the `_FFM7051-Edit.jpg` asset listed below), cropped tall, with a thin gold rule at the bottom carrying the firm's establishment year ("Est. — Lusaka") and a "Recognized in Chambers & Partners 2026" badge.

2. **Eyebrow + intro paragraph.** Eyebrow: `INTRODUCING THE FIRM`. Heading: *"At Theotis Mutemi Legal Practitioners, we epitomize legal excellence, offering a comprehensive suite of services tailored to meet the intricate needs of businesses."* Body: *"With a focus on precision, expertise, and unwavering dedication, we are your premier partner in navigating the complex legal landscape."* ArrowLink to /about.

3. **Practice areas.** Eyebrow `OUR EXPERTISE`. Three numbered cards (01/02/03) — see content below.

4. **Why partner with us.** Two-column: left has the heading + body verbatim ("At Theotis Mutemi Legal Practitioners, we understand the corporate world's demands and complexities. Our team of seasoned professionals combines legal expertise with a corporate mindset to deliver results that align with your business objectives. Whether you seek proactive legal advice or robust representation in litigation, we are committed to exceeding your expectations."). Right side: a stat strip — *28+ years* lead partner experience · *Chambers & Partners 2026* ranked · *13 corporate units* · *International affiliations*.

5. **Featured lawyers.** Three partner cards (Anne Desiree Armanda Theotis, Joy Rachel Mutemi Mondoka, Natasha Mutambo). ArrowLink to /people.

6. **Latest insights.** Three most-recent blog cards.

7. **Affiliations marquee.** Europlaw Group · Global Law Experts · Association of European Attorneys.

8. **Contact CTA strip.** Single line on a dark band: *"Ready to elevate your business with top-tier legal solutions?"* + ArrowLink to /contact.

### Practice area summaries (use on home + practice index cards)

01. **Business & Corporate Litigation** — *Strategically resolving legal disputes to safeguard your business interests.*
02. **Corporate** — *Meticulous legal guidance across 13 specialized units, ensuring compliance and unlocking growth.*
03. **Alternative Dispute Resolution** — *Arbitration, mediation, and adjudication that protect relationships and preserve value.*

### Litigation sub-areas (full content on /expertise/litigation)

I. Commercial Litigation · II. Family Law · III. Labour & Employment · IV. Intellectual Property · V. Real Estate Litigation · VI. Environmental Law · VII. Consumer Law · VIII. Banking & Finance Litigation · IX. Mining Law Disputes. Use the descriptive copy already on the legacy site (pull verbatim from the source URLs at the bottom of this prompt — they're listed under "Source URLs to scrape for full body copy").

### Corporate sub-units (13, full content on /expertise/corporate)

I. Corporate & Commercial Advisory · II. Conveyance & Land Transactions · III. Licensing & Compliance (Energy/Petroleum/Local Government/Trade/Health/Investment/Mining/Trademarks) · IV. Mining & Construction · V. Mergers & Acquisitions · VI. Immigration & Citizenship · VII. Intellectual Property & Patents · VIII. Banking & Finance · IX. Employment & Labour · X. Wills, Probate, Intestacy & Trusts · XI. Tax Advisory · XII. Insurance, Pensions & Securities Advisory · XIII. Investment & International Trade Advisory.

### ADR page

Full body copy:

> Our Alternative Dispute Resolution Department helps clients resolve disputes quickly, privately, and cost-effectively without going through lengthy court proceedings. We focus on arbitration, mediation, and adjudication, offering clients practical options that save time and preserve relationships.
>
> We represent clients in a wide range of commercial, employment, family, and investment disputes, and our team includes accredited arbitrators, mediators, and adjudicators registered with both the Chartered Institute of Arbitrators (CIArb) and the Lusaka International Arbitration Centre (LIAC).
>
> The Department is led by our Managing Partner, a Fellow of the CIArb, and a trained Commercial Mediator and Adjudicator, who also serves on both the domestic and international panels of LIAC.

### About page content

- **Intro:** *"Theotis Mutemi Legal Practitioners is a premier law firm in Zambia, recognized for exceptional legal and consultancy services. With nearly four decades of combined experience among our partners, we excel in delivering tailored solutions across various areas of law. Under the visionary leadership of our Managing Partner, Anne Desiree Armanda Theotis, we are dedicated to achieving optimal outcomes for our clients while upholding the highest standards of professionalism and integrity."*
- **Legacy section, Vision, Mission, Values** — pull verbatim from the legacy /about-us page.
- **Values** (four pillars, render as a 2×2 grid with serif numerals):
  - Tenacity & Teamwork
  - Mastery
  - Leadership
  - Precision & Principle
- **Affiliations & Partnerships** with a write-up for Global Law Experts (verbatim from legacy).

### People (data file: `content/lawyers.ts`)

Create a typed array with these nine lawyers. Use the bios verbatim from the legacy site (scrape from /our-team). Generate slugs from names.

| Name | Role | Department | Slug |
|---|---|---|---|
| Anne Desiree Armanda Theotis | Managing Partner | Leadership | anne-desiree-armanda-theotis |
| Joy Rachel Mutemi Mondoka | Partner, Head of Litigation & Dispute Resolution | Litigation | joy-rachel-mutemi-mondoka |
| Natasha Mutambo | Associate Partner, Head of Corporate | Corporate | natasha-mutambo |
| Ethel Thelma Z Changufu | Associate | Litigation | ethel-thelma-changufu |
| Melissa Phiri | Senior Associate | Litigation | melissa-phiri |
| Nandi Lourna Moyo | Associate | Litigation | nandi-lourna-moyo |
| Thokozile Neeta | Advocate | Litigation | thokozile-neeta |
| Francis Mwewa | Associate | Corporate & Conveyancing | francis-mwewa |
| Esther Nyirenda | Advocate | Corporate | esther-nyirenda |

LinkedIn URLs for each are in the legacy /our-team page — scrape them into the data file. Render /people grouped by Department, partners first.

### Insights / blog

Seed `content/insights/` with two MDX files matching the existing posts. Pull body content from the live blog if accessible; otherwise stub with the title + a placeholder excerpt and a TODO note.

1. `zambias-draft-adr-bill-2026.mdx` — *"Zambia's Draft ADR Bill 2026 – What It Means for Businesses"*
2. `road-traffic-offences-zambia-vehicle-impound.mdx` — *"Road Traffic Offences in Zambia: When Can Your Vehicle Be Impounded?"*

---

## IMAGE ASSETS (pull from the existing Wix CDN)

Download these into `public/images/` at build-time using a `scripts/fetch-assets.ts` Node script (so they're served from your own domain, not Wix). Strip Wix transform params; keep original filenames where sensible.

**Brand:**
- Logo: `https://static.wixstatic.com/media/c24933_c39516dfbd6143c898ba04bd09be4737~mv2.png/v1/fill/w_400,h_400/TMLP%20Print%20LOGO%202025.png` → `public/brand/tmlp-logo.png` (also create an SVG version if you can vectorize it cleanly; otherwise keep PNG and add a `<link rel="icon">` favicon.)

**Hero & partners:**
- Partners group: `https://static.wixstatic.com/media/c24933_1d4aa78a0846483699f3239e2e9c8114~mv2.jpg/v1/fill/w_2400,h_2500/_FFM7051-Edit.jpg`
- Office candid: `https://static.wixstatic.com/media/c24933_62456a1395ca46a38cd78b18825847c9~mv2.jpg/v1/fill/w_2000,h_1500/_FFM7070-Edit.jpg`
- Team meeting: `https://static.wixstatic.com/media/c24933_b38dfffb52924aeda1db0d391ae24d6f~mv2.jpg/v1/fill/w_2000,h_1500/_FFM6996-Edit.jpg`
- ADR feature: `https://static.wixstatic.com/media/c24933_0eb216a60d214e9d968878785f7fc0d9~mv2.jpg/v1/fill/w_2000,h_1500/_FFM7033-Edit.jpg`

**Lawyer portraits** (request the largest available — drop the `fill/` resize):
- Anne Desiree Armanda Theotis: `https://static.wixstatic.com/media/c24933_29e5c1f5ea274bf1a8cc6937e22f001a~mv2.jpg/v1/fill/w_1200,h_1600/_FFM6904-Edit.jpg`
- Joy Rachel Mutemi Mondoka: `https://static.wixstatic.com/media/c24933_6b8b80b8a7184a5e99985ecb5a189021~mv2.jpg/v1/fill/w_1200,h_1600/Joy.jpg`
- Natasha Mutambo: `https://static.wixstatic.com/media/c24933_33421e99c3ad4e71bf3266c7680fd45a~mv2.jpg/v1/fill/w_1200,h_1600/Natasha.jpg`
- Ethel Thelma Changufu: `https://static.wixstatic.com/media/c24933_1112974de09c40dfb99c7598147121c2~mv2.jpg/v1/fill/w_1200,h_1600/_FFM6464-Edit.jpg`
- Melissa Phiri: `https://static.wixstatic.com/media/c24933_556e71b2be714c3b9968462618a26cdb~mv2.jpg/v1/fill/w_1200,h_1600/_FFM6345-Edit.jpg`
- Nandi Lourna Moyo: `https://static.wixstatic.com/media/c24933_db5f61512c604e6a95387c1ae498f357~mv2.jpg/v1/fill/w_1200,h_1600/_FFM6385-Edit.jpg`
- Thokozile Neeta: `https://static.wixstatic.com/media/c24933_499ac74de4eb4a7ab1c14c504aea0778~mv2.png/v1/fill/w_1200,h_1600/Thokozile.png`
- Francis Mwewa: `https://static.wixstatic.com/media/c24933_6d906e8b7c824f68ae495897f37c883d~mv2.jpg/v1/fill/w_1200,h_1600/DSC_4546.jpg`
- Esther Nyirenda: `https://static.wixstatic.com/media/c24933_453761f152c244f19e8372af4da48db1~mv2.jpg/v1/fill/w_1200,h_1600/_FFM6589-Edit.jpg`

**Practice area imagery** (litigation page — already keyed in legacy site):
- Commercial litigation (Book of Laws), Family law (Father and Son), Labour (Dusty Gloves), IP (Musical Notes), Real Estate (Modern House), Environmental (Cheetah), Consumer (Fruit Stand), Banking (Bank Notes), Mining (Mining Plant). Source URLs are in the legacy /business-corporate-litigation page — grab them all.

**Affiliation logos:**
- Europlaw Group: `https://static.wixstatic.com/media/c24933_45382df5162b438cb6b1a9405374bce7~mv2.png/v1/fill/w_400,h_200/c24933_45382df5162b438cb6b1a9405374bce7~mv2.png`
- Global Law Experts: `https://static.wixstatic.com/media/c24933_bb045da3ad834ba79d2910c3bb5cc6fa~mv2.jpeg/v1/fill/w_400,h_200/c24933_bb045da3ad834ba79d2910c3bb5cc6fa~mv2.jpeg`
- Association of European Attorneys: `https://static.wixstatic.com/media/c24933_ed874e007631449cb14fa42f5c492f9d~mv2.png/v1/fill/w_400,h_200/c24933_ed874e007631449cb14fa42f5c492f9d~mv2.png`

**Insight covers:**
- ADR Bill 2026: `https://static.wixstatic.com/media/c24933_b82fe38c2c834c18b7082210248c1af4~mv2.jpg/v1/fill/w_1600,h_900/c24933_b82fe38c2c834c18b7082210248c1af4~mv2.jpg`
- Road Traffic: `https://static.wixstatic.com/media/c24933_2d2e49ac483240d3b888e5461b6d751b~mv2.jpg/v1/fill/w_1600,h_900/c24933_2d2e49ac483240d3b888e5461b6d751b~mv2.jpg`

Run all photographs through `sharp` at build to produce AVIF + WebP variants; keep originals as JPEG fallback.

---

## SOURCE URLS to scrape for full body copy (use `fetch` in a Node script, parse HTML)

- https://www.theotismutemi.com/
- https://www.theotismutemi.com/about-us
- https://www.theotismutemi.com/our-team
- https://www.theotismutemi.com/business-corporate-litigation
- https://www.theotismutemi.com/corporate
- https://www.theotismutemi.com/alternative-dispute-resolution
- https://www.theotismutemi.com/contact-us
- https://www.theotismutemi.com/stayinformed (and individual /post/ URLs)

---

## ACCESSIBILITY & PERFORMANCE — non-negotiable

- Every interactive element reachable by keyboard, visible focus rings (gold, 2px, offset 4px).
- Color contrast WCAG 2.2 AA at minimum on all text — gold accent only used at 18px+/bold or as a non-textual accent.
- `aria-current="page"` on the active nav link. Mega-menu uses `aria-haspopup`/`aria-expanded` correctly.
- All images have meaningful `alt` (lawyer name + role, not "image"). Decorative imagery uses `alt=""`.
- Skip-to-content link first in tab order.
- Forms: labels associated, errors announced via `aria-live="polite"`, success state focuses the confirmation message.
- Lighthouse mobile **performance ≥ 95**: ship < 100KB initial JS, defer everything non-critical, use RSC for all data fetching, no client-side data fetching for first paint.
- Self-host fonts; preconnect only to domains you actually hit.

---

## SEO & STRUCTURED DATA

- `LegalService` JSON-LD on the homepage with address, geo, opening hours, areaServed (Zambia), serviceType list.
- `Person` JSON-LD on each lawyer page (jobTitle, alumniOf if known, sameAs LinkedIn URL).
- `Article` JSON-LD on each insight (headline, datePublished, author, image).
- Open Graph + Twitter cards for every route — generate OG images on the fly with `@vercel/og` using the firm logo + page title in Fraunces.
- `sitemap.xml` auto-generated. `robots.txt` allows everything.
- Canonical URLs use `https://www.theotismutemi.com` (preserve the current canonical convention).

---

## REPO STRUCTURE (suggested)

```
.
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                # home
│   │   ├── about/page.tsx
│   │   ├── expertise/page.tsx
│   │   ├── expertise/litigation/page.tsx
│   │   ├── expertise/corporate/page.tsx
│   │   ├── expertise/adr/page.tsx
│   │   ├── people/page.tsx
│   │   ├── people/[slug]/page.tsx
│   │   ├── insights/page.tsx
│   │   ├── insights/[slug]/page.tsx
│   │   └── contact/page.tsx
│   ├── legal/{privacy,terms}/page.tsx
│   ├── api/contact/route.ts        # server action target
│   ├── opengraph-image.tsx         # generated OG
│   ├── layout.tsx
│   └── globals.css                 # Tailwind v4 @theme tokens
├── components/
│   ├── ui/                         # shadcn primitives (restyled)
│   ├── site/                       # SiteHeader, SiteFooter, MegaMenu, CommandPalette
│   ├── marketing/                  # Hero, PracticeCard, LawyerCard, InsightCard, etc.
│   └── motion/                     # Reveal, Stagger, ArrowLink
├── content/
│   ├── lawyers.ts                  # typed array
│   ├── practices.ts                # typed array
│   ├── insights/*.mdx
│   └── site.ts                     # firm metadata, contact info
├── lib/
│   ├── seo.ts                      # generateMetadata helpers
│   ├── jsonld.ts                   # structured-data builders
│   └── analytics.ts
├── public/
│   ├── brand/
│   ├── images/                     # fetched from Wix at build
│   └── fonts/
├── scripts/
│   └── fetch-assets.ts             # downloads images from Wix CDN
└── ...
```

---

## DELIVERABLES & ACCEPTANCE CRITERIA

You are done when **all** of the following are true:

1. `pnpm install && pnpm dev` boots a working site on `localhost:3000`.
2. `pnpm build` succeeds with zero TypeScript errors, zero ESLint errors, zero `console.log`.
3. Every route listed in the IA renders with real content from the legacy site (no Lorem Ipsum).
4. The site is fully responsive at 360 / 768 / 1024 / 1440 / 1920 — no horizontal scroll, no broken layouts, the mega-menu collapses to an animated full-screen drawer on mobile.
5. Lighthouse mobile (run via `pnpm lighthouse`) ≥ 95 / 100 / 100 / 100.
6. `pnpm exec playwright test` passes a smoke suite you wrote covering: home renders hero, nav opens, contact form validates required fields, each lawyer page resolves.
7. A `README.md` documents: how to run, how to add a lawyer, how to publish an insight (drop an MDX file), how to deploy to Vercel, and where to plug in Resend for the contact form.
8. A `DESIGN_NOTES.md` documents the type scale, color tokens, motion timings, and component inventory.
9. Final commit is clean and conventional (`feat:`, `chore:` etc.). No commented-out code. No unused imports.

---

## WORKING METHOD (how to approach this)

1. **Plan first.** Write `PLAN.md` listing the sequence of work in 5–10 phases (scaffold → assets → design system → components → routes → content → SEO → polish → tests → deploy). Get the plan visible before writing code.
2. **Scaffold in one pass.** `pnpm create next-app@latest` with App Router + TS + Tailwind + ESLint, then add the rest.
3. **Build the design system before any page.** Tokens, typography, primitive components, in Storybook-less isolation pages under `app/(dev)/preview/page.tsx` (delete before ship).
4. **Pull all content + assets next.** Run the scrape script, commit the structured data files, commit the images. Once content is in the repo, page-building is trivial.
5. **Build pages bottom-up.** Footer → Header → Home → About → Expertise pages → People → Insights → Contact. Iterate visually at each stage.
6. **Then performance + a11y + SEO pass.** Lighthouse, axe-core, manual keyboard tour.
7. **Then tests + docs + deploy config.**
8. **At every stage, prefer fewer, better files over many tiny ones.** A 200-line component is fine if it reads cleanly.

---

## FINAL TASTE GUARDRAILS

- **No gradients** as primary surfaces. Solid ink, solid paper, solid bone.
- **No glassmorphism.** No blurred translucent cards.
- **No emoji** anywhere on the rendered site.
- **No "AI-generated" anything** — no synthetic hero images, no abstract gradient meshes, no orb backgrounds.
- **No carousels** on desktop (the only acceptable one is the affiliations marquee, and even that pauses on hover).
- **No "Lorem ipsum"** in shipped code — if content is missing, leave a `// TODO(content)` comment with a clear note, never invent fake bios or fake quotes for real people.
- **No fabricated case results, no fabricated client logos, no fabricated awards** — only Chambers & Partners 2026 (verified) and the three named affiliations.
- When in doubt, **remove an element**. The legacy site fails by addition; the new one should win by subtraction.

Build something the partners will be proud to email a London magic-circle counterpart on day one.
