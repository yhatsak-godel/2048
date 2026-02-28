<!--
SYNC IMPACT REPORT
==================
Version Change: INITIAL → 1.0.0
Ratification Date: 2026-02-27

Principles Defined:
- I. Code Quality Standards
- II. Testing Standards (80% Coverage Minimum)
- III. Accessibility Standards (WCAG 2.1 AA)

Sections Added:
- Core Principles (3 principles)
- Technology Stack
- Development Workflow
- Governance

Templates Status:
✅ plan-template.md - Constitution Check section aligned
✅ spec-template.md - Requirements section aligned  
✅ tasks-template.md - Test task categories aligned

Follow-up: None required
-->

# 2048 Game Constitution

## Core Principles

### I. Code Quality Standards

**MUST** maintain high code quality through:
- TypeScript strict mode MUST be enabled with no type bypasses (`any`, `@ts-ignore`)
- Components MUST follow single responsibility principle
- Functions MUST be pure where possible; side effects isolated and documented
- ESLint rules MUST pass with zero warnings
- Code duplication MUST be refactored into reusable utilities
- All exports MUST have JSDoc comments explaining purpose and usage

**Rationale**: High-quality code reduces bugs, improves maintainability, and enables confident refactoring. Type safety catches errors at compile time rather than runtime.

### II. Testing Standards (80% Coverage Minimum)

**MUST** maintain comprehensive test coverage:
- Minimum 80% code coverage across lines, branches, functions, and statements
- Every component MUST have corresponding `.test.tsx` file
- Every utility function MUST have unit tests covering edge cases
- Tests MUST follow Arrange-Act-Assert pattern
- Tests MUST be deterministic (no flaky tests)
- Integration tests MUST verify user interactions and state changes
- Coverage reports MUST be generated with every test run

**Rationale**: High test coverage ensures reliability, prevents regressions, and documents expected behavior. The 80% threshold balances thoroughness with pragmatism.

### III. Accessibility Standards (WCAG 2.1 AA)

**MUST** comply with WCAG 2.1 Level AA:
- All interactive elements MUST be keyboard accessible (Enter, Space, Arrow keys)
- Focus indicators MUST be visible and clear
- Color contrast MUST meet 4.5:1 ratio for normal text, 3:1 for large text
- ARIA labels MUST be provided where semantic HTML insufficient
- All content MUST be screen reader compatible
- Modals MUST trap focus and restore focus on close
- Error messages MUST be announced to assistive technology
- Touch targets MUST be minimum 44×44 CSS pixels

**Rationale**: Accessibility is a fundamental right. WCAG 2.1 AA compliance ensures the game is usable by people with visual, motor, cognitive, and auditory disabilities.

## Technology Stack

**Frontend Framework**: Next.js (App Router) with React 18+  
**Language**: TypeScript 5+ (strict mode)  
**Styling**: Tailwind CSS  
**Testing**: Jest + React Testing Library  
**Storage**: Browser localStorage with error-tolerant fallback  
**Deployment**: Static export compatible

**Constraints**:
- No external API dependencies (fully client-side)
- No build-time data fetching (static generation)
- Browser support: Modern evergreen browsers (last 2 versions)

## Development Workflow

**Code Review**:
- All changes MUST pass automated tests before merge
- All changes MUST pass ESLint without warnings
- Coverage MUST not decrease below 80%
- Accessibility violations MUST be resolved before merge

**Quality Gates**:
1. TypeScript compilation succeeds with zero errors
2. All tests pass (`npm test`)
3. ESLint passes (`npm run lint`)
4. Coverage threshold met (visible in `coverage/lcov-report/`)
5. Manual accessibility review for UI changes

**Testing Workflow**:
- Write tests alongside implementation (not after)
- Run tests in watch mode during development (`npm run test:watch`)
- Verify coverage before committing changes
- Integration tests MUST cover end-to-end user flows

## Governance

**Authority**: This constitution supersedes all other development practices and conventions.

**Amendment Process**:
- Amendments require documentation of reason and impact
- Version bumps follow semantic versioning:
  - **MAJOR**: Backward-incompatible principles removed or redefined
  - **MINOR**: New principles added or existing principles materially expanded
  - **PATCH**: Clarifications, wording improvements, typo fixes
- All amendments MUST include updated Sync Impact Report
- Templates and related documents MUST be updated to reflect amendments

**Compliance**:
- All pull requests MUST verify compliance with these principles
- Complexity exceptions MUST be justified in plan.md Complexity Tracking section
- Constitution violations MUST be flagged in code review
- Accessibility audits SHOULD be performed quarterly

**Enforcement**:
- CI/CD pipelines MUST enforce testing and linting standards
- Pre-commit hooks SHOULD validate code quality locally
- Regular reviews MUST verify ongoing compliance

**Version**: 1.0.0 | **Ratified**: 2026-02-27 | **Last Amended**: 2026-02-27
