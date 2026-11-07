# Arch Studio – Website

Editorial, motion-driven site for an end-to-end architecture studio (design, structure, monitoring). React 19 + Vite, GSAP (ScrollTrigger, SplitText, Flip), Lenis smooth scrolling, React Router view transitions.

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Available Scripts

- `npm run dev` / `npm start` - Start development server
- `npm run build` - Build for production into `build/`
- `npm run preview` - Serve the production build locally
- `npm test` - Run tests (Vitest)

## Project Structure

```
src/
├── components/     # UI building blocks, one .css file per component
├── pages/          # Route pages (code-split, except Home)
├── layouts/        # MainLayout: smooth scroll, cursor, header, footer, intro
├── lib/            # gsap.js (plugins + motion helpers), blobPoses.js, pageTheme.js, intro.js
├── hooks/          # useTranslation, useProjects, useCountUp, useInView, useMagnetic, …
├── utils/          # projectsData, translations (en / shq), images, constants, format
├── context/        # AppContext: theme, language, intro state
└── assets/project_pictures/
```

## Project Data and Images

Projects live in `src/utils/projectsData.js` (copy in `src/utils/translations.js`). Each project has its images, `featured` (home hero), `status`, `services`, `progress` and a five-phase `timeline` that drives the monitoring section of its page.

Add pictures to `src/assets/project_pictures/<project>/` and reference them as `'<project>/<name>'`. At build time they become responsive AVIF/WebP sets with a flat placeholder in the photo's average colour (`src/utils/images.js`).

Images are lazy by default. Anything hidden behind a clip (a reveal wipe, a slider slide) is never fetched by lazy loading, so pass `loading="eager"` to `ResponsiveImage` or wrap it in `RevealImage`, which fetches a screen ahead and only wipes in once the photo has loaded. The current renders carry carousel arrows and dots near their edges, so `vite.config.js` trims a margin off every project picture; adjust `PROJECT_PICTURE_INSET` once clean exports are available.

## Motion Conventions

- **Page color:** wrap content in `<Section theme="paper | stone | green | charcoal | white">`. The whole page tweens to that color while the section is in the middle of the screen. `tint="light | dark"` sets the header color over imagery.
- **Cursor:** the negative dot is the default. Over links and buttons it opens into a transparent ring, so it never covers text. For media, add `data-cursor` with an icon state; the cursor never shows text:
  - `prev` / `next`: switch slides (arrow ← / →)
  - `open`: go to a page (↗)
  - `zoom`: enlarge (+)
  - `ring`: project cards, a larger transparent ring with ↗
  - `hide`: no cursor
- **Email and phone:** render them with `<CopyLink>`. With a mouse it shows a "Copy email" / "Copy number" pill and copies on click; on touch it stays a normal link.
- **Reveals:** `RevealText`, `RevealImage`, `ScrubText`, `Parallax`.
- **Blob:** `GooeyBlob` has three circles whose poses spell D (`design`), O (`structure`) and M (`monitor`); `cycle` loops through them. Poses live in `src/lib/blobPoses.js`; keep resting circles overlapping or 40+ units apart, and at scale 0.3 or more.
- Every effect runs through `withMotion()` (or `gsap.matchMedia`), so `prefers-reduced-motion` gets static versions.

## Adding New Pages

1. Create the page in `src/pages/`
2. Add a route in `routes` in `src/App.jsx`
3. Add a link in `NAV_ITEMS` in `src/components/Nav.jsx`

## Environment Variables

Create a `.env` file in this directory:

```
VITE_API_URL=http://localhost:8000/api
```
