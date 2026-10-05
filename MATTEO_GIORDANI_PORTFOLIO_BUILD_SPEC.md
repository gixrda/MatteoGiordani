# Matteo Giordani — Portfolio: Design System & Build Spec

Version 1.0 · October 2026 · Handoff for Claude Code

This file is the single source of truth for building the website. It contains the product brief (condensed), the design system (tokens, type, components, motion), every page and section with its copy, interaction specs, technical requirements, and the list of real content still missing.

The visual reference is the folder "Matteo Giordani - Portfolio-png"

---

## 0. Instructions for Claude Code

1. Read the whole file before writing code. Sections 2 (content integrity) and 11 (placeholders) are non-negotiable.
2. Build with **Next.js (App Router) + React + TypeScript**. Keep dependencies minimal (see §4).
3. Implement the design tokens in §5 exactly as CSS custom properties. Never hard-code colours in components.
4. Build components from §6, then pages from §7–§8.
5. Every `[PLACEHOLDER]` in this file must stay visibly marked in the UI until real content is provided. **Never invent** metrics, clients, testimonials, prices, response times, or results.
6. Italian is the primary language. Copy in this file is English; Italian copy must be written by Matteo (or adapted, not machine-translated). Build i18n from day one (§4.3) and leave Italian strings as `[IT COPY TO WRITE]` where missing.
7. The site itself is proof of competence: hit the performance/SEO/accessibility targets in §10 before calling it done.

---

## 1. Product summary

**What:** Personal portfolio of Matteo Giordani, **SEO Specialist & Front-End Developer**, Italy.

**For whom:** Italian local business owners (restaurants, fitness, local services, B2C) who already have a website, want more visibility on Google, and are willing to invest. Not technical. Their questions: *Why don't people find me on Google? Is my site slow? Is it good on mobile? What should I fix first? Do I need a new website?*

**Not for:** people looking for cheap websites, generic web design, one-off low-cost SEO, "SEO hacks", automated reports.

**Single conversion:** **Book a call.** Secondary: View my work. Other contacts: email, LinkedIn, Instagram.

**Narrative:** Discover → Understand → See proof → Build trust → Book a call.

**Core idea:** Matteo understands how people search *and* how websites are built, and works on both. SEO and front-end are one service: **Website Optimization + SEO**.

**Headline:** "I build websites that rank, perform and convert." Supporting: "I help businesses get found on Google."

**Personality:** Young · Precise · Technical · Human. Copy tone: technical, minimal, smart; human, confident, young. No agency clichés, no guru language, no buzzwords, no generic AI copy.

**Emotional sequence:** "This looks different" → "I understand what Matteo does" → "He actually understands websites" → "He has worked on real projects" → "I could trust him with my website" → **Book a call**.

---

## 2. Content integrity (mandatory)

Never invent: clients, testimonials, rankings, traffic, revenue, conversions, awards, certifications, SEO results, Lighthouse scores, Core Web Vitals values, prices, response times, availability ("1 project available"), counters ("+26 projects").

- Missing data → visible placeholder, e.g. `[REAL DATA]`, `[PLACEHOLDER]`.
- **The Butcher Ristomacelleria** is always labelled **REDESIGN CONCEPT**. Never imply it was commissioned.
- The "Trattoria Esempio" site used in demos is **fictional** and must always carry the label "Example site" / "Example business · illustrative, not a client".
- Demo charts may show Google's **real public thresholds** (LCP ≤ 2.5 s good / ≤ 4 s needs improvement; INP ≤ 200 ms; CLS ≤ 0.1). They must not show invented measurements presented as real.

---

## 3. Facts on hand

| Item | Value |
|---|---|
| Name | Matteo Giordani |
| Title | SEO Specialist & Front-End Developer |
| Market | Italy (primary language Italian, secondary English) |
| Email | mattegiordani02@gmail.com |
| LinkedIn | https://www.linkedin.com/in/matteogiordani02/ |
| Instagram | `[ADD INSTAGRAM URL]` |
| GitHub | `[ADD GITHUB URL IF NEEDED]` |
| Domain | `[ADD WHEN AVAILABLE]` |
| Education | Bachelor's Degree in Communication & Marketing, University of Pavia · Technical Diploma in Computer Science |
| Interests (secondary) | Running, sport, design, digital products |
| Tools | SEOzen, Google Search Console, Lighthouse (+ HTML, CSS, JavaScript) |

**Projects**

| Project | Type | Role / categories | Facts | Route |
|---|---|---|---|---|
| ezdirect.it | Client project | Front-End Developer & SEO Specialist | New website launched **September 2026**. Front-end development, design implementation, interface work, CRM modifications, debugging; meta titles & descriptions, technical SEO, Core Web Vitals, Lighthouse, Search Console. Tools: SEOzen, Search Console, Lighthouse. CWV before/after: `[REAL DATA]` | `/work/ezdirect` |
| Trainly | Personal project | Product · UX · Front-End · Mobile | A product for runners, designed and built mobile-first. Screenshots Trainly1, Trainly2 (+ others) in iPhone mockups, never distorted | `/work/trainly` |
| The Butcher Ristomacelleria | **Redesign concept** | Web design · Local SEO · UX | Current vs proposed experience, desktop + mobile mockups | `/work/the-butcher` |

---

## 4. Technical direction

### 4.1 Stack
- Next.js (App Router), React, TypeScript, static generation (SSG) for every page.
- Styling: plain CSS with custom properties + CSS Modules (or a single global stylesheet for tokens + modules per component). **No Tailwind, no UI kit, no animation library.** Motion is CSS transitions + a tiny `IntersectionObserver` hook; scroll-driven scenes use CSS `animation-timeline: view()` with a JS fallback (§9.4).
- Fonts via `next/font/google` (self-hosted, `display: swap`, subset `latin`, `latin-ext` for Italian).
- Images via `next/image` (AVIF/WebP, explicit `width`/`height`, `sizes`, `priority` only on the LCP image).
- Forms: server action or API route that emails Matteo (provider `[CHOOSE: Resend / Formspree / other]`). Booking link `[CALENDLY / CAL.COM URL OR FORM-ONLY — TO DECIDE]`.
- No analytics script that hurts CWV; if needed, a lightweight privacy-friendly one `[TO DECIDE]`, loaded after consent per Italian/GDPR requirements.

### 4.2 Folder sketch
```
app/
  [locale]/
    layout.tsx            # nav, footer, theme, lang
    page.tsx              # Home
    servizi/[slug]/page.tsx   (it)  | services/[slug] (en) — see 4.3
    work/[slug]/page.tsx
    about/page.tsx
    insights/page.tsx, insights/[slug]/page.tsx
    contact/page.tsx
components/   # one folder per component in §6
content/      # typed content objects (services.ts, projects.ts, faq.ts), it + en
styles/tokens.css, globals.css
```
Keep content in typed objects (`content/*.ts`) so copy edits never touch components.

### 4.3 i18n & routes
- Italian default at `/` (or `/it`), English at `/en`. Localised slugs:
  - IT: `/servizi/seo`, `/servizi/performance`, `/servizi/front-end`, `/lavori/…` `[confirm IT slugs]`
  - EN: `/en/services/seo`, `/en/services/performance`, `/en/services/front-end`, `/en/work/ezdirect`, `/en/work/trainly`, `/en/work/the-butcher`
- `hreflang` alternates on every page, `x-default` → Italian.
- Language switch in the nav keeps the user on the equivalent page.

---

## 5. Design system

### 5.1 Concept
Dark, quiet, editorial product surface. One ink (**#323bc2**, the blue of a link you click) and one paper (**#fdfeeb**), on a near-black navy ground. Condensed serif display with one italic accent per headline; tight grotesk body; mono only for code and measurements. Interface objects (browser windows, search results, code, phones) are the imagery. A light theme (paper ground) is one toggle away.

### 5.2 Colour tokens

Brand constants (never change):
```css
--brand-ink:   #323bc2;  /* primary accent, fills, primary buttons */
--brand-paper: #fdfeeb;  /* paper, text on ink, example-site surfaces */
--ink-hover:   #3c46d6;  /* primary button hover */
--on-ink-muted:#cacde1;  /* secondary text on #323bc2 (5.25:1) */
--phone-bezel: #0d1033;
```

Theme tokens:
```css
:root, [data-theme="dark"] {
  --bg:   #0b0c1c;              /* page ground */
  --bg2:  #101227;              /* alternate band */
  --sf:   #14162e;              /* card / surface */
  --sf2:  #1b1e3d;              /* raised surface, inputs focus */
  --ln:   rgba(253,254,235,.10);/* hairline */
  --ln2:  rgba(253,254,235,.18);/* stronger border */
  --tx:   #fdfeeb;              /* text (18.97:1 on bg) */
  --mu:   #b4b6c9;              /* secondary text (9.67:1) */
  --mu2:  #8d90a8;              /* tertiary text (5.65:1 on sf) */
  --act:  #9aa0ff;              /* accent TEXT on dark (8.16:1) — never use #323bc2 as text on dark */
  --sh:   0 30px 60px -30px rgba(0,0,0,.6);
}
[data-theme="light"] {
  --bg:   #fdfeeb;
  --bg2:  #f6f7e2;
  --sf:   #f3f4dc;
  --sf2:  #eaecd0;
  --ln:   rgba(50,59,194,.13);
  --ln2:  rgba(50,59,194,.24);
  --tx:   #1a1d4a;              /* 15.59:1 */
  --mu:   #4a4e7a;              /* 7.06:1 */
  --mu2:  #4a4e7a;
  --act:  #323bc2;              /* 8.09:1 */
  --sh:   0 30px 60px -34px rgba(26,29,74,.35);
}
```
Rules:
- Default theme: dark. Respect `prefers-color-scheme` on first visit `[confirm: or always dark]`, persist the choice in `localStorage`, set `data-theme` before paint (inline script in `<head>`) to avoid a flash.
- Primary buttons are always `--brand-ink` fill + `--brand-paper` text in both themes.
- Text selection: background `#323bc2`, colour `#fdfeeb`.
- Only one gradient exists: project/feature bands `linear-gradient(135deg, #323bc2 0%, var(--sf2) 72%)`, and the portrait placeholder `linear-gradient(160deg, #323bc2, #14162e 75%)`. No other gradients, no glows, no glassmorphism.

### 5.3 Typography

| Role | Family | Weights | Notes |
|---|---|---|---|
| Display / headings | **Instrument Serif** | 400 + italic | Condensed serif; one italic (often `--act`) phrase per headline |
| Body / UI | **Hanken Grotesk** | 400, 500, 600, 700 | `letter-spacing: -0.01em` on body |
| Data / code | **Geist Mono** | 400, 500 | Only for URLs, code, metrics, labels like "Example site" |

Fallbacks: `Georgia, serif` · `system-ui, sans-serif` · `ui-monospace, monospace`.

Scale (desktop → mobile via `clamp`):

| Token | Size | Line-height | Use |
|---|---|---|---|
| `display-xl` | `clamp(48px, 6vw, 84px)` | .95 | Final CTA band |
| `display-l` (H1) | `clamp(48px, 5.6vw, 76px)` | .98 | Home & service hero H1 |
| `display-m` (H2) | `clamp(40px, 4.6vw, 60px)` | 1.0 | Section titles |
| `serif-l` | 34–40px | 1.0 | Card titles, project names |
| `serif-m` | 26–30px | 1.05 | List titles, step names, insight titles |
| `lead` | 18–21px / 500 | 1.35–1.5 | Hero lead |
| `body` | 16–17px | 1.5–1.6 | Paragraphs, max 56–58ch |
| `small` | 14–15px | 1.5 | Card text |
| `caption` | 12.5–13px | 1.4 | Notes |
| `cap` | 11px / 600 / uppercase / `letter-spacing: .08em` | 1 | Category labels, meta |
| `nav` | 12px / 600 / uppercase / `.04em` | 1 | Nav links |
| `button` | 12.5px / 700 / uppercase / `.06em` | 1 | Buttons |
| `mono` | 11–13px / 500 | 1.4–1.75 | URLs, code, metrics |

Rules: `text-wrap: balance` on headings, `pretty` on paragraphs. Minimum functional text 11px. Headlines: a roman line + an italic accent phrase (e.g. "Website optimization *and* SEO", "Every check, *on the page it touches.*").

### 5.4 Spacing, layout, radii

- Container: `max-width: 1120px`, side padding `clamp(20px, 4vw, 40px)`.
- Section rhythm: `120px` top padding between sections on desktop (`72px` mobile). Header block to content: `40–52px`. More space above a heading than below.
- Gaps: 8 / 10 / 12 / 14 / 16 / 18 / 20 / 22 / 24 / 28 / 32 / 40 / 48 / 56 / 64 / 72 px (use the closest).
- Grids: `repeat(auto-fit, minmax(min(<min>px, 100%), 1fr))` or explicit fr columns collapsing to one column ≤ 900px.
- Radii: pills 999px · buttons 23–25px (height/2) · cards 18px · large media/feature 20–26px · inputs 10px · small chips 8–13px.
- Borders: 1px `--ln` (hairline) / `--ln2` (component edge). Never coloured side borders.

### 5.5 Elevation
- `--sh` for floating elements (nav pill, chips, windows, search bar).
- Button hover: `0 14px 30px -14px rgba(0,0,0,.55)`.
- Media inside bands: `0 30px 50px -20px rgba(0,0,0,.6)`.
- No coloured shadows or zero-offset glows.

### 5.6 Motion tokens
```css
--e: cubic-bezier(.16, 1, .3, 1);   /* the only easing: exponential ease-out */
--t-fast: 350ms;  /* hover, press, colour */
--t-mid:  550ms;  /* reveals, expand/collapse */
--t-slow: 800–900ms; /* layer lifts, media scale, stage changes */
```
- Hover lift: `translateY(-2px)`; press: `scale(.98)`; arrow nudge 3px.
- Stagger: 90ms between layers in the Build object.
- No bounce, no constant parallax, no random floating, no scroll-jacking.
- `prefers-reduced-motion: reduce` → transitions/animations off, no tilt, no marquee, no autoplay, instant state swaps; every state still reachable by controls.

### 5.7 Iconography
Inline stroke SVG, 1.5–1.6px stroke, round caps, `currentColor`, sizes 12–20px. Decorative icons `aria-hidden="true"`. No emoji, no icon fonts. Set needed: magnifier, calendar, arrow-right, arrow-up-right, arrow-down, chevron, plus, check, x, person, code `</>`, moon, eye, desktop, mobile, chat, pin, image, gauge, chart, link, layers, pen, type, bug, accessibility, database, document.

### 5.8 Browser surfaces
Theme the focus ring (`2px solid var(--act)`, offset 3px, radius 6px), selection, scrollbars (thin, thumb `#323bc2`), caret, `accent-color: #323bc2` for checkbox/range. Tabular numerals in data.

---

## 6. Components

Each component: semantic HTML, keyboard reachable, visible focus, works in both themes.

### 6.1 NavPill (sticky)
- Floating, centred, `max-width: 760px`, height 56px, radius 28px, `--sf` at 92% + `--ln2` border + `--sh`; sticky `top: 16px`.
- Left: monogram link "MG" (36px circle, ink fill, Instrument Serif 18px) → home; ThemeToggle.
- Centre: Home · Services · Work · About · Insights · `IT · EN`. Current page in `--act` + `aria-current="page"`.
- Right: primary small button **Book a call** (calendar icon).
- ≤ 900px: links collapse into a menu button (44px target) opening a full-width sheet; Book a call stays visible.

### 6.2 ThemeToggle
`<button role="switch" aria-checked>` 44×26 track, 18px ink knob with moon icon, slides 18px. Label "Light theme".

### 6.3 LanguageSwitch
`IT · EN`, current in `--tx`, other in `--mu2`. Links to equivalent localised page.

### 6.4 Button
| Variant | Style |
|---|---|
| Primary | ink fill, paper text, uppercase 12.5px/700, height 46–50px, radius = h/2, padding 0 22px; hover `#3c46d6` + lift + shadow; arrow icon nudges |
| Secondary | transparent, `--tx` text, 1px `--ln2` border; hover border `--tx` |
| On-ink | paper fill, ink text (inside ink bands) |
| Small | height 40px, padding 0 16px, 11.5px |
| Text link | `--act`, 15px/600, icon that moves 2–3px on hover |
States: rest / hover / focus-visible / pressed / disabled (50% opacity, no lift) / loading (spinner replaces icon, `aria-busy`).

### 6.5 HeroSearchBar (signature component)
A search field that starts the booking.
- Pill, height 66px, radius 33px, `--sf`, `--ln2` border, `--sh`, `max-width: 560px`.
- Content: magnifier (accent) · mono "https://" (muted, hidden ≤ 520px) · `<input>` (Geist Mono 17px, `inputmode="url"`, `autocomplete="url"`, visually hidden `<label>` "Your website address") · primary button **Book a call** inside the pill.
- Placeholder cycles every 2.6s while empty: `yourbusiness.it` → `trattoria-esempio.it` → `palestra-esempio.it` → `studio-esempio.it` (off with reduced motion).
- Focus-within: border `--act` + 4px ring at 18% accent.
- Submit: bar becomes a status row — check icon + "I'll look at **{site}** before we talk." + primary button **Pick a time** → booking (`[BOOKING URL]`) or contact form with the URL prefilled.
- Validation: empty allowed (goes straight to booking); otherwise normalise (strip protocol), no blocking errors.

### 6.6 SuggestionChips ("Owners usually ask me")
Label in `cap` style, then links styled as search suggestions: 13.5px, padding 9px 14px, radius 18px, **dashed** `--ln2` border; hover solid `--act` border + `--sf` fill. Each links to the relevant service page.

### 6.7 TrustLine
Horizontal list above a hairline: icon + 14px/600 text, wraps; last item a text link "or view my work ↓".

### 6.8 FloatingChip
Small card on top of media: `--sf` 94%, `--ln2`, radius 14px, `--sh`. Variants: identity (monogram + "Ciao, I'm Matteo Giordani" / title) and fact ("ezdirect.it" serif accent + cap "New site live · Sept 2026").

### 6.9 ToolMarquee
Label "Tools I use every day" + infinite horizontal scroll of tool names in Instrument Serif 30px, `--mu`, separated by an accent ✳-style SVG mark (use an SVG, not a glyph), edges masked. 34s loop, pauses on hover, off with reduced motion (render static, wrapping).

### 6.10 BuildObject (signature component)
The fictional "Trattoria Esempio" website in a browser window, with 6 states. Used in: hero (state 1, tilted), home process scene (all states), home layer stack (inspiration), service CTA (state 5), service page cards (state 4).
- Frame 680×460 (scale with CSS `zoom`/transform for smaller contexts), paper `#fdfeeb`, ink `#323bc2`, 1.5px ink border, radius 14px. Chrome: three outline dots, centred URL pill (mono 11.5px), right label "Example site".
- States (crossfade + 8–16px translate, 90ms stagger, `--e`):
  0. **Discover** — search field "trattoria pavia"; 3 abstract results (bars); our result faded at the bottom: url `trattoria-esempio.it/index.php?id=1`, title "Home". URL bar: `search?q=trattoria+pavia`.
  1. **Understand** — raw unstyled page (Times serif, underlined links "Home | Chi siamo | Menu | Contatti", hatched image "foto_sala_DEFINITIVA.jpg", "Benvenuti nel nostro sito!!", "Chiamaci"). Four numbered pins with labels: "Uncompressed photo, slow to load", "No H1: Google can't tell what this is", "Title tag: “Home”", "Breaks on mobile".
  2. **Optimize** — raw page dimmed; pins become checks; ink side panel (mono): `<title>` "Trattoria Esempio — Cucina pavese in centro a Pavia", `<meta name="description">` "Piatti della tradizione pavese, a pranzo e a cena. Prenota un tavolo online.", headings tree H1/H2. URL becomes `trattoria-esempio.it` with lock.
  3. **Build** — polished site: nav (logo, Menu, Dove siamo, Prenota), H1 "Cucina pavese in centro a Pavia", sub "Piatti della tradizione, a pranzo e a cena.", button "Prenota un tavolo", ink image block with plate line-art, 3 info columns (Orari, Dove siamo, Telefono). 12-column dashed guides fade in then out.
  4. **Perform** — Core Web Vitals card ("illustrative"): LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1; markers travel from poor zone to good zone (1.1s).
  5. **Convert** — search snippet card (query "trattoria pavia", proper title + description) overlaid; booking button gets a 4px paper + ink ring; cursor arrow on it.
- Root has `role="img"` and `aria-label="Example website, stage: {name}"`.

### 6.11 LayerStack (home services)
Exploded isometric view of one web page in three planes.
- Stage 600px tall, `perspective: 1800px`; inner `rotateX(56deg) rotateZ(-34deg)`, `transform-style: preserve-3d`.
- Planes 400×280, radius 18px, stacked with `translateZ(0 / 120 / 240px)` bottom→top:
  - **03 · Code** (bottom): ink fill, mono code: `<header> <h1>Cucina pavese</h1> <img width height alt> <a href="/prenota"> </header>`.
  - **02 · Speed** (middle): `--sf`, three bars LCP/INP/CLS with "good ≤ …" thresholds.
  - **01 · Search** (top): paper fill, search result card (url, underlined title, description) + two bars.
- Active plane lifts +30–50px Z and gets a 2px `--act` outline (offset 6px); others drop to 32% opacity. 900ms `--e`.
- Controlled by the list on the left (hover, focus or click). Default: layer 01.
- ≤ 900px: no 3D — planes become a vertical stack, all opaque.
- Entire stage `aria-hidden`; the list carries the meaning.

### 6.12 ExpandList (layers list, checks list)
`<ol>` of `<button aria-pressed>` rows: grid `44–48px | 1fr`; mono index (`--mu2`, active `--act`); serif title (inactive 50–55% opacity, hover shifts 6px); description collapses to 0 height and expands on active (max-height + opacity, 550–600ms). Hairline dividers. Activation on hover, focus and click (click/keyboard always works on touch).

### 6.13 Timeline stepper (home process)
Six buttons on a 1px line: 12px dots (done/active filled `--act`, active scaled 1.25), labels 12px/600. A filled line overlays the base using `transform: scaleX(step/5)` (no width animation). Horizontal scroll on narrow screens.

### 6.14 StepCard + BuildObject panel (home process)
Card split `.8fr | 1.2fr`: left — serif number (56px, accent), step name (36px), kicker (accent, 14px/600), description, play/pause button (40px circle) + mono "Example business · illustrative, not a client"; right — `--sf2` panel with the BuildObject at the current stage. Autoplay every 3.4s, stops when the user picks a step or on reduced motion. On the live site the scene is pinned and scrubbed by scroll (§9.4).

### 6.15 ComparisonPair
Two cards with a vertical "vs" divider (36px circle, italic serif). Left card transparent, muted text, x icon. Right card `--sf`, border `rgba(154,160,255,.45)`, check icon on ink, accent descriptions. Rows: 5px bullet + bold line + small description. Divider hidden on mobile. *(Flagged as still close to the inspiration site — see §12.)*

### 6.16 ProjectCard
Link card (`--sf`, 18px radius). Top band 330–380px with the brand gradient; media sits at the bottom edge (browser frame or phone frames), rises 10px + scale 1.02 on hover. Body: `cap` category in accent, serif title with a ↗ icon that fades in on hover, description in `--mu`, tags. Filter pills above the grid: All / Website / Mobile app / Concept (`aria-pressed`). ezdirect spans two columns and includes the CWV table.

### 6.17 BrowserFrame, PhoneFrame, MediaSlot
- BrowserFrame: paper body, 24–30px bar with three dots and centred mono URL; radius 10px top.
- PhoneFrame: bezel `#0d1033`, radius 30–42px, 6–8px padding, screen radius 24–34px, 1179×2556 aspect. Screenshots never stretched: `object-fit: cover` with correct aspect.
- MediaSlot (until real assets exist): hatched paper `repeating-linear-gradient(135deg, rgba(50,59,194,.05) 0 1px, transparent 1px 10px)`, bold label + mono "screenshot to add". Replace with `next/image`.

### 6.18 CWVTable
`<table>` with caption "Core Web Vitals · before → after", headers Metric / Before / After (cap style), rows LCP, INP, CLS (+ optional Lighthouse performance), values in Geist Mono accent with tabular numerals. Values `[REAL DATA]` until provided.

### 6.19 LighthouseRing
72px ring, 4px border, mono value centred, label below. "This website · Lighthouse, mobile" — values `[—]` until measured at launch. Colour by Lighthouse bands only once real values exist.

### 6.20 Card / Tag
Card: `--sf`, 1px `--ln`, radius 18px, hover border `--ln2`. Tag: 26px pill, `--sf2`, `--ln` border, 11px/600 `--mu`.

### 6.21 PageAnatomy (service page signature)
Annotated example page, 560×610, sticky on desktop.
- Visitor view (paper ground): browser tab with title, URL bar, nav, H1, intro text bars, booking button, main photo, two H2 sections, address block, chat-widget bubble, footer.
- Google view (toggle "What visitors see / What Google reads", segmented control): ground switches to `#14162e`, every region becomes a dashed box showing its code in mono: `<title>…`, `https://… · index, follow`, `<nav> 4 × <a href>`, `<h1>…</h1>`, `<p> what, where, for whom`, `<a href="/prenota"> · 48px tap`, `<img src="sala.avif" width height alt fetchpriority="high">`, `<h2>Il menu</h2> · <h2>Dove siamo</h2>`, `<address> name · address · phone`, `<script>`, `<footer> legal · links · contacts`.
- The active check (from the list on the right) outlines its region (2px currentColor, offset 4px); other regions fade to 28%. "Whole page" checks outline the frame instead. Caption below: "{nn} {Check title} → {where on the page}".
- Region mapping per service: see §8.3.
- Root `role="img"` with the caption as `aria-label`.

### 6.22 StepChain (service page)
One row of four columns separated by vertical hairlines, top border `--ln2`: serif word (44–64px) followed by an accent arrow (except last), mono accent "01 · Getting to know you", description. Stacks with horizontal rules on mobile.

### 6.23 ScopeColumns (service page pricing)
Four columns separated by vertical `--ln2` rules: serif factor title (30px) + description. No cards.

### 6.24 SearchFAQ ("What business owners search for")
One bordered panel (`--sf`, radius 18px); each question is a `<details>` row with a magnifier icon, the question (16px/600) and a chevron that rotates 180° when open; rows divided by hairlines; hover fill `--sf2`. Answer indented under the text.

### 6.25 ServiceToolWindow (service hero)
Window card (`--sf`, `--ln2`, radius 20px, `--sh`) with header (icon tile, title, subtitle, cap "Try it") and dotted-grid body (`radial-gradient(var(--ln) 1px, transparent 1px)` 14px). Three variants:
- **SEO — Search result preview:** Desktop/Mobile segmented control; paper snippet card (favicon, site name, breadcrumb URL, underlined title, description) that narrows to 300px on mobile; inputs "Meta title" (limit 60 desktop / 55 mobile) and "Meta description" (155 / 120) with live counters; over-limit counters get a wavy underline; preview truncates with "…". Note: "Rule of thumb: about 60 characters for titles, 155 for descriptions. Google cuts by pixel width, so it's a guide, not a law."
- **Performance — LCP slider:** range 0.5–6.0 s (default 3.8); big serif value + zone label (Good / Needs improvement / Poor); zone bar 2.5 / 1.5 / 2 fr (ink / accent 45% / line) with a marker; thresholds row; footer row LCP / INP ≤ 200 ms / CLS ≤ 0.1 with plain-language meaning.
- **Front-End — Before/After code:** segmented Before/After; Before: `<div class="hero"><img src="foto_sala_DEFINITIVA.jpg"><div class="title">Benvenuti!!</div></div>`; After: `<header class="hero"><img src="sala-1200.avif" width="1200" height="800" alt="Sala della trattoria a pranzo" fetchpriority="high"><h1>Cucina pavese in centro a Pavia</h1></header>` with changed parts in accent; notes list explaining each change.

### 6.26 Forms
Labels always visible (14px/600, optional marked "(optional)"); inputs `--sf`, `--ln2`, radius 10px, padding 13px 14px; hover border `--mu2`; focus border `--act` + `--sf2`. Errors inline under the field, naming problem + fix. Success replaces the form with a `role="status"` message. Privacy checkbox required (Italian GDPR), link to `/privacy`.

### 6.27 Breadcrumb, CTA band, Footer
- Breadcrumb: 14px/500 `--mu2`, current in `--tx` with `aria-current`, `›` separators `aria-hidden`; emit `BreadcrumbList` JSON-LD.
- CTA band (home): full-width ink band, serif display-xl "Let's make your website *work harder.*" + on-ink button.
- CTA panel (service): ink panel radius 26px, headline + text + two buttons; BuildObject state 5 tilted -4° bleeding off the right edge.
- Footer: four link columns (Services, Work, Resources, Contact) with `cap` headings, then a hairline row: serif name + title · © 2026 · `[P.IVA if applicable]`.

---

## 7. Home page (`/`)

Order and copy. All sections use the container unless noted.

### 7.1 Nav — §6.1

### 7.2 Hero
Grid `1.05fr | .95fr`, gap 56px, padding-top 104px.
- **H1:** "I build websites that *rank, perform* and *convert.*" ("convert." in `--act` italic).
- **Lead:** "I help businesses get found on Google. SEO and front-end development in one place, from the first check to the code."
- **HeroSearchBar** (§6.5).
- **SuggestionChips** — label "Owners usually ask me": "Why can't customers find me on Google?" → SEO service · "Is my site slow on phones?" → Performance · "Do I need a new website?" → Front-End.
- **TrustLine:** "You talk to the person doing the work" · "Fixes made in the code" · "First call, no commitment" · link "or view my work ↓".
- **Right:** portrait card (aspect 4/4.6, radius 22px, `[PORTRAIT OF MATTEO — 4:5, warm light]`) tilting with the cursor (±8° Y, ±6° X, 500ms ease; off with reduced motion and on touch). FloatingChips: identity chip top-left (overlapping the edge by 28px), fact chip bottom-right ("ezdirect.it" / "New site live · Sept 2026").
- Below the grid: ToolMarquee "Tools I use every day": SEOzen · Google Search Console · Lighthouse · HTML · CSS · JavaScript · `[add tool]`.
- The hero image is the LCP element: preload it, `priority`.

### 7.3 Services — "One website, three layers."
Grid `.9fr | 1.1fr`.
- **H2:** "One website, *three layers.*"
- **Text:** "Website optimization and SEO are one job. What people find on Google, how fast the page feels and the code underneath depend on each other, so I work on all three at once."
- **ExpandList** (layers):
  1. **Found** — SEO & Technical SEO — "What people see on Google, and what Google can read on your pages: titles, descriptions, structure, indexing."
  2. **Fast** — Performance & Core Web Vitals — "How quickly the page shows up and responds on a phone, measured with Google's own signals."
  3. **Built right** — Front-End development — "The code underneath: where the fixes for the first two layers actually happen."
- Secondary button "How I work on each layer →" → services.
- Right: LayerStack (§6.11), synced to the list.

### 7.4 Comparison — "Why a report *isn't enough*"
- Text: "Most businesses get a list of problems, then need someone else to fix them. Two suppliers, and nobody owns the result."
- Left "SEO report only": A list of problems — Someone else has to fix them · SEO and developer are two suppliers — Responsibility gets lost in between · Generic checklists — The same advice for every business · Results judged by feel — No before, no after.
- Right "SEO + Front-End, one person": Problems fixed in the code — I work directly on your website · One person, one responsibility — From the first check to the launch · Explained in plain language — You understand why, not only what · Measured before and after — Lighthouse and Search Console.

### 7.5 Process — "Watch a website *get better*"
- Text: "One example site, six steps. This is the whole job, start to finish."
- Timeline + StepCard + BuildObject (§6.13–6.14). Step copy:

| # | Name | Kicker | Description |
|---|---|---|---|
| 01 | Discover | Where you stand | Customers search for what you offer. Your site is there, but nobody picks it. |
| 02 | Understand | Analysis | I find what's holding it back: slow images, missing titles, pages Google can't read. |
| 03 | Optimize | SEO | Titles, descriptions and headings that tell Google, and people, what you do. |
| 04 | Build | Front-End | I work directly on the code: layout, mobile, the details. |
| 05 | Perform | Core Web Vitals | Fast where it counts, on a phone. Measured, not promised. |
| 06 | Convert | Results | Found, opened, booked. Then measured again in Search Console. |

### 7.6 Selected work — "Selected *work*"
- Text: "A selection of things I've built, optimized and explored." Filter pills. Grid of ProjectCards:
  - **ezdirect.it** (2 columns) — cap "Client project · Website · SEO"; text "Front-End Developer & SEO Specialist on the new website, live since September 2026: development, CRM changes, metadata, Core Web Vitals."; tags SEOzen, Search Console, Lighthouse; CWVTable `[REAL DATA]`; media `[ezdirect.it homepage screenshot, desktop 1440]`.
  - **Trainly** — cap "Personal project · Mobile app"; "A product for runners, designed and built mobile-first."; tags Product, UX, Front-End; two PhoneFrames `[Trainly1]`, `[Trainly2]` tilted ∓3°.
  - **The Butcher Ristomacelleria** — badge **REDESIGN CONCEPT**; cap "Concept · Local business"; "How a local restaurant-butcher could turn searches into tables."; tags Web design, Local SEO, UX; media `[proposed homepage desktop]` + `[mobile]`.
- Secondary button "All projects".

### 7.7 Proof — "Less *talk*, more *measurements*"
- Text: "Before and after, with the tools Google itself uses. Including on this website."
- Bento (3 columns): "ezdirect.it — Sept *2026* — New website goes live" · (2 cols) "This website · Lighthouse, mobile" four rings Performance / Accessibility / Best practices / SEO `[—]` "measured at launch" · (2 cols) "Where I studied": Computer Science (Technical Diploma) + Communication & Marketing (Bachelor's Degree · University of Pavia) · ink card "Testimonials" `[Client quote to add, with name and business]` — **remove the card entirely if no real testimonial exists at launch.**

### 7.8 About — "Technology first. *Then* communication. Now *both.*"
- "I started with technology, studied Communication & Marketing, and eventually found the intersection between the two in websites and search."
- "Today, I work across SEO and Front-End development, combining the way people search with the way websites are built."
- "Off-screen:" tags Running · Sport · Design · Digital products.
- Photo `[Matteo, running or at the desk — 5:4]`.

### 7.9 Insights — "Insights, *in plain words*"
- Text: "Short notes on search, speed and websites, for people who run a business." Button "All insights".
- Three cards (tag + serif title), all `[DRAFT]` until written: SEO — "Your meta title is your shop sign on Google" · Performance — "Core Web Vitals, explained for restaurant owners" · Optimization — "New website or better website? How to tell". Hide the section if no article is published at launch.

### 7.10 Contact — "Tell me about *your website*"
- Left: photo `[Matteo on a call — 4:5]`. Right: text "A few details and I'll reply to set up the call. `[Reply time to confirm]`".
- Form: What do you need? (select: Get found on Google / A faster website / Fix or rebuild my website / Not sure yet) · Name · Email · Website (optional, prefilled from the hero search bar) · Anything else? (optional, placeholder "My site doesn't bring in bookings, it's slow on phones, I don't know where to start…") · privacy checkbox · **Book a call**.
- Under the form: "Or write directly: mattegiordani02@gmail.com · LinkedIn · Instagram `[to add]`".

### 7.11 CTA band — "Let's make your website *work harder.*" + Book a call.
### 7.12 Footer — §6.27.

---

## 8. Service pages (`/services/[slug]`)

Three pages from one template: `seo`, `performance`, `front-end`. A pill switcher next to the breadcrumb links between them.

### 8.1 Template
1. NavPill (Services active).
2. Breadcrumb "Home › Services › {name}" + service switcher pills (SEO · Performance · Front-End).
3. **Hero** (grid 1fr | 1fr): H1 `{h1a}` + italic accent `{h1b}` on its own line · lead · paragraph · Book a call (↗) + text link "See what's included ↓" · note "A first look at your site, no commitment." · right: ServiceToolWindow (§6.25).
4. **Included** — band `--bg2`: H2 "Every check, *on the page it touches.*" + `{incPara}` + view toggle; PageAnatomy (sticky) + ExpandList of 8 checks.
5. **How** — H2 "Four steps. *No surprises.*" + "The same for every project, so you always know what's happening and why." + StepChain:
   - 01 Call · Getting to know you — "We look at your site together. You tell me about the business; I ask the questions that matter."
   - 02 Analysis · Measure first — "I measure and find what's holding the site back, in order of impact."
   - 03 Work · On the site — "I fix it directly in the code, explaining every change in plain words."
   - 04 Measure · Before and after — "Same tools, same pages, compared honestly. Then we decide what comes next."
6. **Related work** — H2 "The work speaks. *See it take shape.*" + "Projects where this service did the heavy lifting, with the context behind each choice." + "All projects ↗" + two project cards (gradient band, badge, round ↗ button that rotates 45° on hover, cap, serif name, text, "Explore →").
7. **Scope** — band `--bg2`: H2 "The price follows *your website.*" + "No price list by page count: what matters is what each page has to do. Four things shape the scope. `[Confirm your pricing approach]`" + "Tell me about your site ↗" + ScopeColumns:
   - How big the site is — "Ten pages built on one template are not the same job as ten pages that are all different."
   - Where it starts from — "A site with a few fixable issues needs less work than one built on a shaky foundation."
   - What matters first — "Visibility, speed or both: we choose the priorities together."
   - One-off or ongoing — "A focused intervention, or a monthly follow-up with Search Console checks and fixes." `[confirm Matteo offers ongoing work]`
8. **FAQ** — H2 "What business owners *search for.*" + "The questions I hear most, answered the way I'd answer them on a call." + "Ask your own question" (mail) + SearchFAQ (emit `FAQPage` JSON-LD).
9. **CTA panel** — "The next step *starts with your website.*" + "Send me your site's address, or tell me what isn't working. I'll reply with what I'd look at first. `[Reply time to confirm]`" + Book a call / Email me.
10. Footer.

### 8.2 Content per service

**SEO & Technical SEO** (`seo`, switcher "SEO")
- H1: "Get found by the people" / *"already searching for you."*
- Lead: "Clear titles, readable pages, a structure Google understands."
- Paragraph: "I look at how people search for businesses like yours, then make sure your pages answer them: what Google reads, what people click, and what stops either from happening. Checked in Search Console, explained in plain words."
- Tool window: "Your result on Google" / "Write it, see it as people will." Default title "Trattoria Esempio — Cucina pavese in centro a Pavia"; default description "Piatti della tradizione pavese, a pranzo e a cena, a due passi dal centro. Prenota un tavolo online in pochi secondi."
- incPara: "I start from your business and the people you want to reach. Then I connect search, content and the website itself, so every page has a job and Google can tell what it is."
- Checks (title — description — anatomy region):
  1. Your business first — What you sell, to whom, and where. The searches worth winning start there. — `text`
  2. Search analysis — The words your customers actually use, and which page should answer each of them. — `h2`
  3. Meta titles & descriptions — The two lines people read before they choose who to click. Written for them first. — `tab`
  4. Headings & content structure — One clear H1 per page and sections that answer real questions. — `h1`
  5. Indexability — Pages Google can reach and index. The ones it shouldn't see, kept out. — `url`
  6. Internal links & architecture — A structure that leads people, and Google, to the pages that matter. — `nav`
  7. Local search — Pages that make sense to people searching near you. — `local`
  8. Search Console, explained — Set up, read and translated: what's improving, what isn't, and why. — `page`
- Related: ezdirect.it (Client · "Website · SEO" · "Metadata, technical SEO and Search Console on the new site.") · The Butcher (Concept · "Local SEO · Redesign" · "A local restaurant-butcher, rethought for local search.")
- FAQ:
  - How long before I see results on Google? — It depends on your site and your competitors. Technical fixes can be picked up within weeks; rankings usually move over months. You'll see progress in Search Console along the way, not a promise of positions.
  - Can you guarantee first place on Google? — No, and nobody honestly can. What I can do is remove what's holding your site back and measure what changes.
  - Will changing my site hurt my current rankings? — Not if the change is planned: useful content kept, old addresses redirected, nothing important lost. That's part of the job.
  - Do I have to write the texts myself? — You know your business; I know how people search for it. We work on the texts together, and I take care of titles, descriptions and structure. `[Confirm copywriting scope]`

**Performance & Core Web Vitals** (`performance`, switcher "Performance")
- H1: "A website that feels" / *"fast on a phone."*
- Lead: "Measured with the signals Google uses, fixed in the code, measured again."
- Paragraph: "Core Web Vitals are Google's measures of how quickly a page shows its content, how fast it reacts and how stable it stays while loading. I find what slows yours down (images, scripts, fonts, layout) and fix it directly on the site."
- Tool window: "Where does your page land?" / "Google's thresholds for loading speed."
- incPara: "Speed is not one number. I look at what your visitors actually wait for, on the phones they actually use, and fix the causes rather than the score."
- Checks:
  1. Lighthouse analysis — Repeated lab tests on your key pages, mobile first, to find the real bottlenecks. — `page`
  2. Core Web Vitals — LCP, INP and CLS: loading, responsiveness and visual stability, measured and explained. — `h1`
  3. Images — The right size, modern formats, loaded when needed. Often the biggest win. — `img`
  4. Scripts & third parties — Chat widgets, trackers and plugins that slow everything down, tamed or removed. — `widget`
  5. Fonts & layout stability — Text that shows immediately and pages that don't jump while loading. — `text`
  6. Real mobile testing — Checked on slower phones and connections, where your customers are. — `cta`
  7. Before and after — Same pages, same tools, compared honestly. — `page`
  8. Field data in Search Console — What real visitors experience over time, not just one test. — `page`
- Related: ezdirect.it ("Performance · Core Web Vitals" · "Core Web Vitals and Lighthouse on the new site. Before/after: [REAL DATA].") · The Butcher ("Performance · Mobile UX" · "A redesign planned around mobile speed from the start.")
- FAQ:
  - Why does speed matter for a small business? — People often look up a local business on their phone, on the move. A slow page loses them before they read what you offer.
  - My Lighthouse score changes every time. Why? — Lab tests vary with network and device. That's why I compare several runs and also look at real-visitor data in Search Console.
  - When will Search Console show the improvement? — Real-visitor data is collected over a rolling 28-day window, so improvements show up gradually over about a month.
  - Do I need a new website to be fast? — Usually not. Many sites get much faster with targeted fixes. If the foundation is the problem, I'll tell you.

**Front-End development** (`front-end`, switcher "Front-End")
- H1: "The fixes land" / *"in the code."*
- Lead: "Not a list of problems: changes made directly on your website."
- Paragraph: "I build and fix the part of your website people actually see and use: layout, mobile, forms, the details. Every change is made with search and speed in mind, because the code is where SEO and performance really happen."
- Tool window: "Same image, better code" / "What a front-end fix looks like." Notes — After: "avif, 1200w — A fraction of the weight, same look." · "width/height — Space reserved: the page doesn't jump (CLS)." · "h1 + alt — Google and screen readers know what this is." Before: "raw .jpg — Full-size photo straight from the camera." · "no size — Text jumps when the image arrives." · "div title — No heading: the page has no clear topic."
- incPara: "From a single broken form to whole new sections: I work on the site you have, with the tools it already uses, and leave it easier to maintain than I found it."
- Checks:
  1. New pages & sections — Built to fit your site, structured for search from the first line. — `h2`
  2. Responsive layout — Phone, tablet and desktop, tested on real devices, not just resized. — `nav`
  3. Design implementation — From a design file to working pages, faithfully. — `text`
  4. Debugging — Broken layouts, forms that fail, things that only break on one phone. — `cta`
  5. CMS & CRM changes — Adjustments to the systems behind your site, like the CRM work on ezdirect.it. — `footer`
  6. Accessibility basics — Keyboard use, contrast, labels and alt text, so everyone can use the site. — `img`
  7. Semantic HTML — A structure both Google and screen readers understand. — `h1`
  8. Clean handover — Changes explained, so you know what was done and why. — `page`
- Related: ezdirect.it ("Front-End · CRM" · "Development of the new website, design implementation and CRM changes.") · Trainly (Personal · "Product · UX · Front-End" · "A product for runners, designed and built mobile-first.")
- FAQ:
  - Can you work on my existing website? — Yes, that's most of the work. I start from what you have and change what's needed. `[Confirm platforms: WordPress, Shopify, custom…]`
  - Will I still be able to update the site myself? — That is the goal: I keep your editing workflow where possible and explain anything that changes.
  - Do you also design? — Yes, for websites and interfaces: Trainly and The Butcher concept are examples. `[Confirm design scope]`
  - Do you build new websites from scratch? — I contributed to building the new ezdirect.it. `[Confirm the project sizes you take on]`

### 8.3 Anatomy region keys
`tab` browser tab/title · `url` address · `nav` menu · `h1` main heading · `text` opening text · `cta` booking button · `img` main photo · `h2` section headings · `local` address & contacts · `widget` third-party chat widget · `footer` footer · `page` whole page. Captions: "the title in the browser tab and on Google", "the page address", "the menu", "the main heading", "the opening text", "the booking button", "the main photo", "the section headings", "the address and contact details", "a third-party chat widget", "the footer", "the whole page".

---

## 9. Pages not yet designed (build from the system)

### 9.1 Project pages (`/work/[slug]`)
Structure (adapt per project, never three identical case studies): Project hero → Overview → Challenge → Approach → Process → Visuals → Technical work → Results / Evidence → Key learnings → Conclusion → CTA.
- **ezdirect**: lead with the real website; Technical work lists front-end, CRM, metadata, CWV, Lighthouse, Search Console with SEOzen; Evidence = CWVTable + Lighthouse before/after `[REAL DATA]`; screenshots desktop + mobile.
- **Trainly**: product story; iPhone mockups dominate; UX decisions; front-end notes; sport as context, not the point.
- **The Butcher**: REDESIGN CONCEPT label in the hero; current → proposed comparison (use the PageAnatomy pattern for the proposed homepage); local SEO and page structure reasoning; desktop + mobile mockups.
Shared: breadcrumb, `CreativeWork` JSON-LD, next/previous project, CTA panel.

### 9.2 About, Insights, Contact
- About: expand §7.8; education as the "Computer Science + Communication & Marketing = Search + websites" equation, no CV timeline.
- Insights index + article template: Read mode — 65–75ch measure, serif H1, Hanken body 18px/1.7, `Article` JSON-LD, author box, CTA panel at the end.
- Contact: §7.10 as a standalone page.

### 9.3 Mobile (390px) direction
From the mobile artboard: compact nav pill (monogram + Book a call + menu); hero H1 50px; search bar full width (button can drop below the input at ≤ 360px); portrait card below; services as the layer list with flat planes; process with horizontally scrolling step chips above a scaled BuildObject; projects stacked; ink CTA; **sticky bottom bar** "Questions about your site? · Book a call" appearing after the hero.

### 9.4 Scroll-driven scenes (live site)
- Home process: pinned section (`position: sticky` inside a ~300vh wrapper); scroll progress maps to stages 0–5. Use CSS scroll-driven animations where supported, otherwise one `IntersectionObserver`/scroll listener with `requestAnimationFrame`. Never hijack scrolling; step buttons still work. Mobile: no pinning, chips + tap.
- Section reveals: one subtle fade/translate (12px) per section header on first view; content visible by default if JS fails.

---

## 10. Quality targets

### 10.1 Performance (priority 5/5)
- Lighthouse mobile ≥ 95 on every page `[target, verify]`; LCP < 2.5 s, INP < 200 ms, CLS < 0.1 on a mid-range phone.
- JS budget: aim ≤ 90 KB gzipped first load for Home. Interactive parts (search bar, layer stack, process scene, tool windows, filters, anatomy) are small client components; everything else server-rendered.
- Fonts: 3 families max, only the weights listed, preloaded via `next/font`.
- Images: AVIF/WebP, correct `sizes`, lazy below the fold, explicit dimensions.
- No third-party widgets on load (no WhatsApp/chat widgets).

### 10.2 SEO (priority 5/5)
- Unique `<title>` and meta description per page and locale; canonical; `hreflang`; Open Graph + Twitter images (designed from the system: ink ground, serif title).
- JSON-LD: `Person` (Matteo) + `ProfessionalService` on Home; `Service` on service pages; `FAQPage` on service FAQs; `BreadcrumbList`; `CreativeWork` on projects; `Article` on insights.
- `sitemap.xml`, `robots.txt`, clean URLs, one H1 per page, logical H2/H3.
- Suggested home title: "Matteo Giordani — SEO Specialist & Front-End Developer" `[IT version to write]`.

### 10.3 Accessibility (4/5, aim higher)
Semantic landmarks, logical headings, skip link, keyboard for every control (layers, checks, steps, filters, toggles), visible focus, contrast per §5.2, `aria-pressed` on toggle buttons, `role="switch"` on theme toggle, labels on all inputs, alt text on all real images, decorative SVG hidden, reduced motion honoured, touch targets ≥ 44px, form errors announced.

### 10.4 Responsive
Test 1440, 1280, 1024, 768, 430, 390, 360. Single column ≤ 900px. Simplify, don't shrink: no 3D, no pinning, no tilt on mobile; keep hierarchy and the search bar first.

---

## 11. Placeholders & open decisions

Content Matteo must supply:
- [ ] Portrait (hero, 4:5), About photo (5:4), Contact photo (4:5)
- [ ] ezdirect.it screenshots (desktop 1440, mobile) + **real** Core Web Vitals and Lighthouse before/after
- [ ] Trainly screenshots (Trainly1, Trainly2 + others, 1179×2556)
- [ ] The Butcher: current site screenshot + proposed desktop and mobile mockups
- [ ] Instagram URL, GitHub URL (optional), domain
- [ ] Booking method: calendar link or form-only
- [ ] Reply time to promise (if any)
- [ ] Pricing approach and whether ongoing/monthly work is offered
- [ ] Copywriting scope, platforms supported (WordPress, Shopify, custom…), design scope, project sizes
- [ ] Any real client testimonial (name + business, with permission) — otherwise remove the testimonial card
- [ ] Insights articles (or hide the section)
- [ ] Italian copy for every string (not machine-translated)
- [ ] P.IVA / legal footer, privacy policy, cookie policy
- [ ] Lighthouse scores of the finished site (fill the rings after launch)

Fictional demo content that must stay labelled: "Trattoria Esempio" (all BuildObject states, SEO tool window, anatomy page), sample addresses in the search bar placeholder.

---

## 12. Known open design points
- The comparison section (§7.4), the two-column project grid (§7.6) and the photo + form contact (§7.10) still follow the inspiration site closely; consider redesigning them in the same spirit as the layer stack and page anatomy before launch.
- The mobile artboard predates the hero search bar and layer stack; follow §9.3 for mobile.

---

## 13. Definition of done
- [ ] All pages in §7–§9 built, IT + EN routes, language switch keeps context
- [ ] Tokens implemented exactly; both themes pass contrast
- [ ] Every interaction in §6 works with mouse, touch and keyboard, and with reduced motion
- [ ] No invented data anywhere; all placeholders visible and listed
- [ ] Lighthouse mobile ≥ 95 performance, 100 SEO, ≥ 95 accessibility on Home, a service page and a project page
- [ ] CWV within "good" thresholds in lab tests
- [ ] JSON-LD validates (Rich Results Test), sitemap + robots + hreflang correct
- [ ] Tested at 1440 / 1280 / 1024 / 768 / 430 / 390 / 360
