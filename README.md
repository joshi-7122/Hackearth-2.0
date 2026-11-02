# WIE HackEarth 2.0 · 2026 — Build. Break. Rebuild.

The website for **WIE HackEarth 2026: Reimagined**, a pan-India hackathon organized by the IEEE WIE Affinity Group under the IEEE Galgotias University Student Branch, with IEEE CIS as co-organizer and in collaboration with Medhasphere.

React 19, TypeScript, Vite and Tailwind CSS v4, with no UI or animation libraries.

The brand (colours, typography, artwork, logos, event facts and past-event photos) comes from the official *WIE HackEarth 2026: Reimagined* deck.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
```

## Updating content (organizers start here)

Every fact on the site lives in `src/data/`. You never need to touch a component to change content.

| File | What it controls |
| --- | --- |
| `data/hackathon.ts` | Date, venue, address, team size, prize pool, registration link/status, contact email and phone, theme, organizers and their logos, nav, track-record stats, social links |
| `data/events.ts` | Past events: titles, descriptions, photos and stats |
| `data/rules.ts` | Official eligibility, rules and important notes |
| `data/challenges.ts` | Tracks: title, problem statement, difficulty, tech stack, icon, accent colour |
| `data/prizes.ts` | Top-three prizes and special awards |
| `data/schedule.ts` | Timeline phases and the participant journey |
| `data/people.ts` | Judges, mentors and speakers |
| `data/sponsors.ts` | Community partners (Partners section) |
| `data/faqs.ts` | FAQ questions and answers |

### Placeholders

Any value written in square brackets, such as `[EVENT DATE]` or `₹[XX,XXX]`, is a **placeholder**. The site highlights placeholders in lime with a dashed outline so nothing unfinished slips through, and it never turns them into links. Replace the brackets with real values and the highlighting disappears automatically.

Find everything that still needs filling in:

```bash
grep -rn "\[[A-Z]" src/data
```

### Common edits

- **Registration link**: in `data/hackathon.ts` set `registration.url` to the Unstop page. Every Register button then links there. The open / closed status and countdowns are computed automatically from `registration.opensAt` and `registration.closesAt`.
- **Add a community partner logo**: put the file in `public/sponsors/` and set `{ name: 'Acme Dev Club', tier: 'community', logo: '/sponsors/acme.svg', url: 'https://acme.dev' }`.
- **Add a judge photo**: put a square image (at least 480px) in `public/people/` and add `photo: '/people/name.jpg'`. Without a photo, a generated avatar is used.
- **Social preview**: `public/og.png` (1200×630). Set `og:url` in `index.html` once the domain is live.
- **Logos and photos**: replace the files in `public/logos/` and `public/events/` with the original high-resolution versions when available. The ones currently there were extracted from the deck.

## Architecture

```
src/
  data/        content — the only place facts live
  types/       shared TypeScript types for the data
  sections/    page sections (Hero, About, Challenges, Prizes, …)
  components/  reusable blocks (Navbar, Timeline, PrizeCard, SponsorGrid, FAQ, …)
  components/ui/  primitives (Button, Badge, SectionHeading, Disclosure, Icon, Txt, …)
  hooks/       scroll, reveal, counter, magnetic/spotlight pointer effects
  lib/         helpers (placeholder detection, reveal observer, accent maps)
  index.css    design tokens (@theme) and global utilities
```

### Design system

The tokens live in `src/index.css` under `@theme`:

- **Colour** (sampled from the deck):

  | Token | Hex | Used for |
  | --- | --- | --- |
  | `paper` | `#FCF7EB` | Page background |
  | `indigo` | `#392F73` | Headings |
  | `ink` | `#2A2357` | Body text |
  | `brand` | `#C73A7B` | WIE magenta: CTAs and highlights |
  | `leaf` | `#007A3F` | Sustainability green |
  | `plum` | `#301557` | Deep sections |
  | `rose` | `#B45C81` | Brush stroke |
  | `lavender` | `#E6D2E8` | Atmosphere |
  | `blush` | `#F6C9D0` | Atmosphere |

  Every text and colour pairing passes WCAG AA for its intended use.
- **Plum sections:** `.theme-plum` redefines the colour variables, so any component placed inside the final CTA or the footer re-themes itself automatically.
- **Type:** Abril Fatface for display (the deck's headline face, with one weight only, so hierarchy comes from size and colour), Source Serif 4 for text (a screen-friendly stand-in for the deck's Times and Libra Serif), and JetBrains Mono for small technical labels. All are self-hosted through Fontsource.
- **Brand assets** in `public/`:
  - `brand/`: the globe, the coder illustration and the brush stroke, extracted from the deck and cleaned up
  - `logos/`: the eight organizer and affiliation logos
  - `events/`: the past-event photos
- **Motion:** `--ease-out-expo`, plus `--dur-fast`, `--dur-base` and `--dur-slow`. Every animation respects `prefers-reduced-motion`.

### Signature interaction: the Rebuild Field

`components/HeroField.tsx` is a single-canvas lattice behind the hero:

- The cursor or a finger **breaks** the grid apart, springs **rebuild** it, and wireframe links glow while each region reassembles.
- Ambient shock-waves keep the field alive on touch devices.
- Drawing is batched by colour bucket, device pixel ratio is capped at 2, and the field pauses when it's off-screen or in a background tab.
- With reduced motion it renders a single static frame.

### Accessibility

- Semantic landmarks, a skip link, and one `h1` with an `h2` per section.
- Keyboard-operable tabs (arrow keys, Home and End) and accordions (`aria-expanded`, `aria-controls`).
- The mobile menu closes on Esc and returns focus to the toggle.
- Visible focus rings and inert collapsed panels.
- Reduced-motion support throughout, including skipping the preloader.
