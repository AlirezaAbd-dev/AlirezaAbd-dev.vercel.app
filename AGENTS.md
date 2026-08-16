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
- **Contact Channels**: 
  - Email: `alireza.abedi9310@gmail.com`
  - Telegram: `@AlirezaAbd_Dev`
  - LinkedIn: [`linkedin.com/in/alireza-abedi-714280235`](https://www.linkedin.com/in/alireza-abedi-714280235)
  - GitHub: [`github.com/AlirezaAbd-dev`](https://github.com/AlirezaAbd-dev)

---

## 🛠️ 2. Technology Stack

| Layer / Concern | Technologies & Libraries |
| :--- | :--- |
| **Framework & Runtime** | [Next.js 16 (App Router / Turbopack)](https://nextjs.org), [React 19](https://react.dev), [Node.js 22+](https://nodejs.org) |
| **Language & Typing** | [TypeScript 5.9](https://www.typescriptlang.org) (Strict mode, full type-safety) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com), Custom CSS keyframe shaders, Glassmorphism (Obsidian Dark & Pearl Light) |
| **Icons & Media** | [Lucide React](https://lucide.dev), Dedicated official vector SVG component library ([`TechIcons.tsx`](src/components/icons/TechIcons.tsx)) |
| **Form Handling & Validation** | [Formik](https://formik.org), [Zod](https://zod.dev), React Google reCAPTCHA |
| **Optimization & SEO** | Next.js Metadata API, dynamic OpenGraph, structured JSON-LD schemas, `sitemap.ts`, `robots.ts`, Sharp image optimization |

---

## 📂 3. Directory Structure

```
├── public/                     # Static public assets (avatars, icons, favicon)
├── src/
│   ├── app/                    # Next.js App Router Pages
│   │   ├── layout.tsx          # Root HTML layout with RTL dir="rtl" & fonts
│   │   ├── page.tsx            # Homepage (Hero with Canvas, Bio, and CTAs)
│   │   ├── about/page.tsx      # About Me (Avatar, Personal Details, Stats, Skills)
│   │   ├── myProjects/page.tsx # Projects Showcase (Category Filters, Project Cards)
│   │   ├── contactUs/page.tsx  # Contact Page (Interactive Form & Quick Contacts)
│   │   ├── robots.ts           # Dynamic SEO robots.txt generator
│   │   └── sitemap.ts          # Dynamic SEO sitemap.xml generator
│   ├── assets/                 # Fonts, styles, and project images
│   │   ├── css/styles.css      # Core Tailwind CSS v4 and animation keyframes
│   │   └── projects/           # High-resolution project mockup visual assets
│   ├── components/
│   │   ├── aboutMe/            # About page modules (Header, Stats, Skills, Badges)
│   │   ├── contact/            # Contact form and direct communication cards
│   │   ├── drawer/             # Mobile responsive navigation drawer
│   │   ├── home/               # CanvasParticles, HomeTitle, HomeSubtitle
│   │   ├── icons/              # Official SVG logos (TechIcons, BrandIcons)
│   │   ├── myProjects/         # ProjectCard, MainMyProject with category filter
│   │   ├── sidebar/            # Desktop sidebar (Avatar, Social Links, Navigation, Footer)
│   │   ├── timeline/           # Educational timeline with laser scanner ray
│   │   └── ui/                 # Reusable UI primitives (BorderBeam, SpotlightCard, InteractiveCursor, AnimatedCounter)
│   ├── constants/              # Data sources (myProjects, skills, education, navbar)
│   ├── context/                # Global State & ThemeContext (Dark/Light toggle)
│   └── hooks/                  # Custom hooks (useDecryptEffect, useRotatingText, useTypewriter)
├── .nvmrc                      # Node.js runtime version lock (Node 22)
├── package.json                # Dependencies, scripts, engines definition
├── tsconfig.json               # TypeScript strict configuration
└── AGENTS.md                   # This instruction and knowledge base for AI agents
```

---

## ✨ 4. Key Visual Systems & Interactive Animations

1. **Quantum Canvas Particles & Cosmic Shockwaves** ([`CanvasParticles.tsx`](src/components/home/CanvasParticles.tsx)):
   - 60fps HTML5 Canvas with shooting meteors, gradient constellations, magnetic gravity pull to cursor, and multi-color chromatic shockwaves on click.
2. **Cyber Interactive Magnetic Cursor Halo** ([`InteractiveCursor.tsx`](src/components/ui/InteractiveCursor.tsx)):
   - Hardware-accelerated trailing light halo with context-aware morphing over clickable elements (`w-12 h-12` emerald spotlight) and click pulses.
3. **Holographic Laser Border Beam** ([`BorderBeam.tsx`](src/components/ui/BorderBeam.tsx)):
   - Traveling neon laser perimeter around flagship project cards, avatar frames, and key achievements using CSS `offset-path` and `mask-composite`.
4. **3D Holographic Spotlight Cards** ([`SpotlightCard.tsx`](src/components/ui/SpotlightCard.tsx)):
   - Dynamic cursor radial spotlight with 3D tilt geometry and iridescent metallic glare sheen.
5. **Live Eased Numerical Counters** ([`AnimatedCounter.tsx`](src/components/ui/AnimatedCounter.tsx)):
   - Smooth cubic-eased counting animation for percentages, years of experience, and project tallies.
6. **Timeline Traveling Laser Ray** ([`EducationTimelineItem.tsx`](src/components/timeline/EducationTimelineItem.tsx)):
   - Continuous laser ray scanner traversing down the education connection timeline.

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
