# 2048 Game

A modern, responsive 2048 game built with Next.js App Router, TypeScript, and Tailwind CSS. The game includes local result history, best score persistence, and keyboard-only controls.

## Features

- 4x4 grid with smooth movement and merge feedback
- Arrow-key controls with scroll prevention
- Score, best score, and move counter
- Win and loss detection with continued play after 2048
- Result history (last 100 games) and best score stored in localStorage
- Error-tolerant storage with in-memory fallback

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Jest + React Testing Library

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Testing

Run the full test suite:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

Coverage:

```bash
npm run test:coverage
```

## Project Structure

- app/ - Next.js App Router pages and layout
- components/ - Reusable UI components
- hooks/ - Custom hooks for game engine and results
- utils/ - Game logic and storage utilities
- types/ - Shared TypeScript interfaces

## Development Standards

This project follows strict quality standards defined in the [Project Constitution](.specify/memory/constitution.md):

**Code Quality**
- TypeScript strict mode with zero type bypasses
- ESLint passing with zero warnings
- JSDoc comments for all exports

**Testing**
- Minimum 80% code coverage required
- Every component has corresponding `.test.tsx` file
- Tests follow Arrange-Act-Assert pattern

**Accessibility**
- WCAG 2.1 Level AA compliance
- Keyboard navigation for all interactive elements
- ARIA labels where semantic HTML insufficient
- 4.5:1 color contrast ratio

Run quality checks:

```bash
npm run lint         # ESLint verification
npm run test:coverage  # Verify 80% coverage threshold
```

## Notes

- Keyboard controls use ArrowUp, ArrowDown, ArrowLeft, ArrowRight.
- localStorage errors (private mode/quota) fall back to memory and keep the game playable.
