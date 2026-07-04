# StepFlow

A multi-step form builder and runner built with React, TypeScript, and Tailwind CSS. Create, configure, and share interactive multi-step forms — inspired by Typeform and Google Forms.

## Features

- **Form Builder** — drag-and-drop step reordering, 11 step types (text, email, number, select, rating, yes/no, etc.), real-time validation configuration
- **Form Runner** — smooth animated transitions, per-step validation, progress indicator, auto-save, responsive
- **Dashboard** — form list with quick actions, response table, analytics charts (bar/pie), CSV/JSON export
- **Dark Mode** — system-aware with manual toggle
- **Persistence** — all data saved to localStorage via Zustand

## Tech Stack

| Frontend | Tooling | Data |
|----------|---------|------|
| React 19 | Vite 8 | Zustand |
| TypeScript 5.7 | Vitest | Zod |
| Tailwind CSS 3 | Testing Library | Recharts |
| Framer Motion | dnd-kit | PapaParse |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
src/
├── core/
│   ├── types/         # TypeScript types (step, form, response)
│   ├── store/         # Zustand store with persist
│   ├── validation/    # Zod schemas per step type
│   └── utils/         # CSV/JSON export utilities
├── modules/
│   ├── builder/       # Form builder (CRUD, DnD, config)
│   ├── runner/        # Form execution (animations, validation)
│   ├── dashboard/     # Form list, responses, charts
│   └── shared/        # Layout, Header, ThemeToggle, UI components
└── __tests__/         # Vitest test files
```
