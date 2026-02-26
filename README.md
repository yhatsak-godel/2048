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

## Notes

- Keyboard controls use ArrowUp, ArrowDown, ArrowLeft, ArrowRight.
- localStorage errors (private mode/quota) fall back to memory and keep the game playable.
