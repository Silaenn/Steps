<div align="center">

<img src="https://raw.githubusercontent.com/Silaenn/Steps/main/public/logo.png" alt="StepFlow logo" width="64" height="64">

# StepFlow

**A modern multi-step form builder that puts you in control.**

Create, configure, and deploy interactive multi-step forms with drag-and-drop ease. Built for developers who want Typeform-like experiences without the overhead.

<p>
  <a href="https://github.com/Silaenn/Steps/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React">
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS">
  </a>
  <a href="https://vite.dev/">
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite" alt="Vite">
  </a>
  <a href="https://vercel.com">
    <img src="https://img.shields.io/badge/deployed_on-Vercel-000000?style=flat-square&logo=vercel" alt="Vercel">
  </a>
</p>

</div>

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Author](#author)

---

## About

StepFlow is a client-side multi-step form builder that lives entirely in the browser. It was designed for teams and individuals who need to prototype, build, and share multi-step forms without provisioning a backend or paying for a third-party service.

Every form you build is persisted locally via Zustand and can be previewed, shared, and analyzed — all from a single page application. Eleven distinct step types give you the flexibility to collect anything from plain text to star ratings, with Zod-powered validation at every turn.

---

## Features

- **Drag-and-drop builder** — Reorder steps visually using dnd-kit. Pick from 11 step types and configure each one inline.
- **Form runner with validation** — Smooth animated transitions between steps with per-field validation via Zod schemas.
- **Analytics dashboard** — View responses in a sortable table and visualize data with bar charts and pie charts powered by Recharts.
- **Export** — Download responses as CSV or JSON with one click.
- **Dark mode** — System-aware with a manual toggle. Warm-toned palette that respects your preference.
- **Zero backend** — Everything is persisted to localStorage. Refresh the page and your forms are still there.
- **Fully responsive** — Works on desktop, tablet, and mobile. The builder sidebar collapses to a slide-over drawer on small screens.

---

## Tech Stack

| Category | Libraries |
|----------|-----------|
| **Framework** | React 19, TypeScript 5.7 |
| **Bundler** | Vite 6 |
| **Styling** | Tailwind CSS 3.4, clsx |
| **State** | Zustand 5 (with localStorage persist) |
| **Routing** | React Router 7 |
| **Validation** | Zod 3 |
| **Drag & Drop** | dnd-kit |
| **Animations** | Framer Motion 11 |
| **Charts** | Recharts 2 |
| **Icons** | Lucide React |
| **Testing** | Vitest 4, Testing Library, jsdom |
| **Deployment** | Vercel |

---

## Screenshots
<img width="1920" height="964" alt="StepFlow(2)" src="https://github.com/user-attachments/assets/799ff022-bf2f-4501-a2b7-560b08902ed6" />


---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
git clone https://github.com/Silaenn/Steps.git
cd Steps
npm install
```

### Environment

No environment variables are required. The application runs entirely client-side with localStorage persistence.

---

## Usage

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173` (or the next available port).

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run test suite (vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint the project with ESLint |

### Seeding Sample Data

Open the browser console and run:

```js
seedForms()
```

This populates your dashboard with 5 sample forms so you can immediately explore the builder, runner, and analytics features.

---

## Project Structure

```
src/
├── core/
│   ├── types/            # TypeScript interfaces (Step, Form, FormTheme, etc.)
│   ├── store/            # Zustand store with localStorage persistence
│   ├── validation/       # Zod schemas per step type
│   └── utils/            # CSV/JSON export utilities
├── modules/
│   ├── builder/          # Step list, sortable items, inline config
│   ├── runner/           # Form execution with animated transitions
│   ├── dashboard/        # Form grid, response table, analytics charts
│   └── shared/           # Layout shell, header, theme toggle, UI primitives
├── components/           # Reusable leaf components
├── __tests__/            # Vitest test files
├── App.tsx               # Route definitions
├── main.tsx              # Application entry point
└── index.css             # Tailwind directives and custom properties
```

Key architectural decisions:

- **Module-based layout** — Each feature (builder, runner, dashboard) lives in its own directory with co-located components.
- **CSS custom properties** — The brand color is defined once as `--primary` in `index.css` and consumed across all components via `bg-[var(--primary)]`, making theme changes a single-line edit.
- **Zustand persist** — All form and response data is serialized to localStorage under the `stepflow-storage` key.

---

## Deployment

The project includes a `vercel.json` configuration for zero-config deployment:

```bash
npx vercel deploy
```

The build command runs `tsc -b && vite build` which ensures type safety before producing the production bundle. Static files are output to `dist/`.

---

## Author

Built by [Silaenn](https://github.com/Silaenn).

- GitHub: [@Silaenn](https://github.com/Silaenn)
- Project: [StepFlow](https://github.com/Silaenn/Steps)

---

<div align="center">
  <sub>Licensed under the MIT License.</sub>
</div>
