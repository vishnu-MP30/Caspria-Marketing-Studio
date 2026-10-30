# Caspria Marketing Studio

A high-performance, editorial digital marketing & growth studio web experience built with **Next.js 14 (App Router)**, **TypeScript**, **GSAP**, **Matter.js**, and custom CSS modules.

---

## Features

- **Drifting Showcase Hero**: Interactive physics-like drifting 3D canvas with 3-color ambient glow theme (Lemon, Charcoal Black, Electric Lavender) and interactive card previews.
- **Works & Selected Works**: Comprehensive case studies with responsive grids, category filtering, and modal detail views.
- **Hover-Activated Montage**: Hover-to-play video banner (`View All Projects`).
- **Interactive "About Us" Word Reveal**: Dynamic cursor-tracking popout images revealed on hovering highlighted editorial keywords.
- **Matter.js 2D Rigid-Body Physics**: Falling interactive marketing service bricks that tumble and settle onto an invisible boundary.
- **Paced Services Accordion**: Progressive, scroll-driven expanding service showcase with directional hysteresis.
- **Staircase "Our Process" Framework**: Step-by-step staggered card elevation tracking viewport scroll.
- **Editorial "From The Journal"**: Monospace metadata with full-bleed hover photographic reveal.
- **Slanted "LET'S TALK" Footer**: Scroll-driven angle transition that seamlessly flattens to full-screen solid black at the bottom.

---

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Animation**: [GSAP](https://greensock.com/gsap/) & [Lenis](https://github.com/darkroomengineering/lenis)
- **Physics**: [Matter.js](https://brm.io/matter-js/)
- **Styling**: CSS Modules + Global design tokens
- **Typography**: Google Fonts (`Inter`, `Anton`)

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the home showcase, or [http://localhost:3000/works](http://localhost:3000/works) for the complete experience.

---

## Production Build

```bash
npm run build
npm run start
```

---

## Deploy to Netlify

This project is pre-configured for Netlify deployment via [`netlify.toml`](./netlify.toml) and `@netlify/plugin-nextjs`.

1. Push this repository to GitHub.
2. In the [Netlify Dashboard](https://app.netlify.com/), click **Add new site** > **Import an existing project**.
3. Select GitHub and choose `Caspria-Marketing-Studio`.
4. Build settings will auto-detect:
   - **Base directory**: `.`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. Click **Deploy Site**.
