# 🤖 AGENTS.md — Developer & AI Agent Guide

> **Project Name**: Alireza Abedi Portfolio & Showcase  
> **Repository**: [`github.com/AlirezaAbd-dev/AlirezaAbd-dev.vercel.app`](https://github.com/AlirezaAbd-dev/AlirezaAbd-dev.vercel.app)  
> **Production URL**: [`AlirezaAbd-dev.vercel.app`](https://AlirezaAbd-dev.vercel.app) / [`alireza-abedi.ir`](https://alireza-abedi.ir)  
> **Deployment Platform**: [Vercel](https://vercel.com)  

---

## 📌 1. Project Overview & Owner Information

This repository houses the personal portfolio, engineering showcase, and interactive curriculum vitae of **Alireza Abedi** (علیرضا عابدی).

- **Role**: Frontend Team Lead & Full-Stack Software Engineer
- **Experience**: 3.5+ Years (1 Year Corporate Enterprise + 2.5 Years Freelance)
- **Birth Date**: 1382/03/20 Solar (20 Khordad 1382 / 10 June 2003)
- **Education**: 
  - **M.Sc. Computer Engineering - Software**: Islamic Azad University of Rasht (1404 - Present)
  - **B.Sc. Computer Engineering**: Islamic Azad University of Rasht (1402 - 1404)
  - **Associate Degree in Software**: Shahid Chamran Technical College of Rasht (1400 - 1402)
  - **Technical Diploma**: Shahid Beheshti Technical High School of Rasht (1396 - 1399)
- **Official Domain**: [`https://alireza-abedi.ir`](https://alireza-abedi.ir)
- **Alternate / Vercel Domain**: [`https://portfolio.alireza-abedi.ir`](https://portfolio.alireza-abedi.ir) / [`https://AlirezaAbd-dev.vercel.app`](https://AlirezaAbd-dev.vercel.app)
- **Contact Channels**: 
  - Email: `alireza.abedi9310@gmail.com`
  - Phone: `+98-911-558-4629`
  - Telegram: `@AlirezaAbd_Dev`
  - LinkedIn: [`linkedin.com/in/alireza-abedi-714280235`](https://www.linkedin.com/in/alireza-abedi-714280235)
  - GitHub: [`github.com/AlirezaAbd-dev`](https://github.com/AlirezaAbd-dev)

---

## 🛠️ 2. Technology Stack & AI Readiness

| Layer / Concern | Technologies & Libraries |
| :--- | :--- |
| **Framework & Runtime** | [Next.js 16 (App Router / Turbopack)](https://nextjs.org), [React 19](https://react.dev), [Node.js 22+](https://nodejs.org) |
| **Language & Typing** | [TypeScript 5.9](https://www.typescriptlang.org) (Strict mode, full type-safety) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com), Custom CSS keyframe shaders, Glassmorphism (Obsidian Dark & Pearl Light) |
| **Icons & Media** | [Lucide React](https://lucide.dev), Dedicated official vector SVG component library ([`TechIcons.tsx`](src/components/icons/TechIcons.tsx)) |
| **Form Handling & Validation** | [Formik](https://formik.org), [Zod](https://zod.dev), React Google reCAPTCHA |
| **Optimization & SEO** | Next.js Metadata API, dynamic OpenGraph, structured JSON-LD schemas (`Person`, `Organization`, `WebSite`), `sitemap.ts`, `robots.ts`, Sharp image optimization |
| **AI Agent Readiness & Protocols** | `llms.txt`, `llms-full.txt` (following [llmstxt.org](https://llmstxt.org)), Content Negotiation (`Accept: text/markdown` with `Vary: Accept, Accept-Encoding`), Agent-friendly 404 recovery with markdown fallback, Trust Anchor pages (`/privacy`). |

---

## 📂 3. Directory Structure

```
├── public/                     # Static public assets (avatars, icons, favicon)
│   ├── llms.txt                # Machine-readable AI Agent Guidance (When to use, URLs)
│   └── llms-full.txt           # Extended detailed curriculum vitae & project matrix
├── src/
│   ├── app/                    # Next.js App Router Pages
│   │   ├── layout.tsx          # Root HTML layout with RTL dir="rtl" & Rich JSON-LD Graph
│   │   ├── page.tsx            # Homepage (Hero with Canvas, Bio, CTAs, Semantic SSR text)
│   │   ├── about/page.tsx      # About Me (Avatar, Personal Details, Stats, Skills)
│   │   ├── myProjects/page.tsx # Projects Showcase (Category Filters, Project Cards)
│   │   ├── games/page.tsx      # Cyber Arcade (4 Lightweight Thinking Mini-Games)
│   │   ├── contactUs/page.tsx  # Contact Page (Interactive Form & Quick Contacts)
│   │   ├── privacy/page.tsx    # Privacy Policy & Transparency Trust Anchor Page
│   │   ├── not-found.tsx       # Agent-friendly 404 handler with Markdown Recovery
│   │   ├── robots.ts           # Dynamic SEO robots.txt generator
│   │   └── sitemap.ts          # Dynamic SEO sitemap.xml generator
│   ├── assets/                 # Fonts, styles, and project images
│   │   ├── css/styles.css      # Core Tailwind CSS v4 and animation keyframes
│   │   └── projects/           # High-resolution project mockup visual assets
│   ├── components/
│   │   ├── aboutMe/            # About page modules (Header, Stats, Skills, Badges)
│   │   ├── contact/            # Contact form and direct communication cards
│   │   ├── drawer/             # Mobile responsive navigation drawer
│   │   ├── games/              # Cyber Arcade Mini-Games (GameHub, GameGuideModal, etc.)
│   │   ├── home/               # CanvasParticles, HomeTitle, HomeSubtitle
│   │   ├── icons/              # Official SVG logos (TechIcons, BrandIcons)
│   │   ├── myProjects/         # ProjectCard, MainMyProject with category filter
│   │   ├── sidebar/            # Desktop sidebar (Avatar, Social Links, Navigation, Footer)
│   │   ├── timeline/           # Educational timeline with laser scanner ray
│   │   └── ui/                 # Reusable UI primitives (BorderBeam, SpotlightCard, etc.)
│   ├── constants/              # Data sources (myProjects, skills, education)
│   ├── context/                # Global State & ThemeContext (Dark/Light toggle)
│   ├── hooks/                  # Custom hooks (useDecryptEffect, useRotatingText, useTypewriter)
│   ├── proxy.ts                # Markdown content negotiation (Accept: text/markdown & Vary headers)
│   └── utils/                  # Utilities (audioSynth Web Audio procedural sound engine)
├── .nvmrc                      # Node.js runtime version lock (Node 22)
├── next.config.js              # Rewrites for /.well-known/llms.txt and Turbopack options
├── package.json                # Dependencies, scripts, engines definition
├── tsconfig.json               # TypeScript strict configuration
└── AGENTS.md                   # This instruction and knowledge base for AI agents
```

---

## ✨ 4. AI Readiness & Machine-Readable Interfaces

1. **Content Negotiation (`Accept: text/markdown`)**:
   - Built via [`proxy.ts`](src/proxy.ts) compliant with `acceptmarkdown.com`.
   - Returns clean, structured markdown for routes `/`, `/about`, `/myProjects`, `/games`, `/contactUs`, `/privacy`, and 404 fallbacks.
   - Includes `Vary: Accept, Accept-Encoding` ensuring CDN caches do not mix HTML and Markdown responses.
2. **`llms.txt` & `llms-full.txt` Guidance**:
   - Fully compliant with [llmstxt.org](https://llmstxt.org) standard.
   - Contains an explicit **When to Use This** section defining ideal recruiter/client use cases and boundaries.
3. **Agent-Friendly 404 Recovery**:
   - Implemented in [`src/app/not-found.tsx`](src/app/not-found.tsx) returning valid HTTP 404 status alongside structured machine-readable links pointing agents to index documents.
4. **Rich JSON-LD Multi-Type Knowledge Graph**:
   - Integrated in [`src/app/layout.tsx`](src/app/layout.tsx) with linked `Person`, `Organization`, and `WebSite` nodes.
   - Includes complete `contactPoint`, `address` (`PostalAddress`), `email`, `telephone`, `sameAs`, `knowsAbout`, and brand aliases (`Alireza Abedi Portfolio`).
5. **Trust Anchor (`/privacy`)**:
   - High-character count, transparent privacy policy published at [`/privacy`](src/app/privacy/page.tsx) asserting zero advertising trackers, client-side reCAPTCHA safety, and open crawler accessibility.

---

## 🚀 5. Deployment Pipeline (Vercel)

### Architecture
- **Hosted on**: [Vercel](https://vercel.com)
- **Deployment Trigger**: Automatic continuous deployment on push to `master` branch.
- **Node.js Runtime Requirement**: **Node.js 22.x or 24.x** (Configured via [`.nvmrc`](.nvmrc) and `package.json` `"engines": { "node": ">=20.x" }`).
- **Build Output**: Static HTML pre-rendering with Edge caching (`next build`).

### Local Development Commands
```bash
# Install dependencies
pnpm install # or npm install

# Start development server
pnpm dev

# Typecheck & Lint
pnpm tsc --noEmit
pnpm lint

# Production Build Test
pnpm build
```

---

## 📋 6. Agent Maintenance Rules

When any AI coding assistant or developer makes changes to this project, **adhere to the following rules**:

1. **Update `AGENTS.md`**: Any structural change, new dependencies, page additions, or deployment configuration changes must be reflected in this file.
2. **Preserve Persian RTL First-Class Support**: All layouts must maintain natural Persian Right-to-Left flow (`dir="rtl"`, right-aligned text, right-side image hierarchy where specified).
3. **No Placeholders**: Never introduce empty image placeholders or broken asset paths. Maintain high-resolution visual previews for all showcase cards.
4. **Build Integrity**: Ensure `pnpm tsc --noEmit && pnpm lint && pnpm build` passes with zero errors and zero warnings before concluding any task.
