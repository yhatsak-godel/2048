---

description: "Task list for Player Name feature implementation"
---

# Tasks: Player Name

**Input**: Design documents from `/specs/001-player-name/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: Tests are REQUIRED per Constitution II (80% coverage minimum). Each user story includes test tasks.

**Accessibility**: Per Constitution III, all UI features include accessibility verification tasks.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm existing project setup supports new tests and components

- [x] T001 Review Jest config to confirm new component and hook tests are discovered in [jest.config.js](jest.config.js)
- [x] T002 Review Tailwind/global styles for modal and focus ring compatibility in [app/globals.css](app/globals.css)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared data model and storage support required by all stories

- [x] T003 Update `GameResult` type to include `playerName` and add `PlayerName` type in [types/index.ts](types/index.ts)
- [x] T004 Add player name storage helpers, validation, and default handling in [utils/storage.ts](utils/storage.ts)
- [x] T005 Update result persistence to store `playerName` snapshot and handle legacy results in [utils/storage.ts](utils/storage.ts)
- [x] T006 Add storage unit tests for name persistence, validation, and legacy defaults in [utils/storage.test.ts](utils/storage.test.ts)
- [x] T007 Update game results hook to supply `playerName` when saving results in [hooks/useGameResults.ts](hooks/useGameResults.ts)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Name Input on First Visit (Priority: P1) 🎯 MVP

**Goal**: Prompt for player name on first load and store it safely

**Independent Test**: Clear localStorage, load the app, enter a name, refresh, and confirm the prompt does not reappear

### Tests for User Story 1 (REQUIRED)

- [x] T008 [P] [US1] Unit tests for player name hook in [hooks/usePlayerName.test.ts](hooks/usePlayerName.test.ts)
- [x] T009 [P] [US1] Component tests for name prompt modal behavior in [components/PlayerNameModal.test.tsx](components/PlayerNameModal.test.tsx)
- [x] T010 [P] [US1] Integration test for initial prompt flow in [components/GameContainer.test.tsx](components/GameContainer.test.tsx)

### Implementation for User Story 1

- [x] T011 [P] [US1] Implement `usePlayerName` hook with validation and storage integration in [hooks/usePlayerName.ts](hooks/usePlayerName.ts)
- [x] T012 [P] [US1] Create `PlayerNameModal` with input validation and focus management in [components/PlayerNameModal.tsx](components/PlayerNameModal.tsx)
- [x] T013 [US1] Integrate name prompt into game container flow in [components/GameContainer.tsx](components/GameContainer.tsx)
- [x] T014 [US1] Add JSDoc comments for new exports in [hooks/usePlayerName.ts](hooks/usePlayerName.ts) and [components/PlayerNameModal.tsx](components/PlayerNameModal.tsx)

### Accessibility for User Story 1 (REQUIRED)

- [x] T015 [P] [US1] Verify keyboard navigation for modal input and submit button in [components/PlayerNameModal.tsx](components/PlayerNameModal.tsx)
- [x] T016 [P] [US1] Add ARIA labels and descriptive text in [components/PlayerNameModal.tsx](components/PlayerNameModal.tsx)
- [x] T017 [P] [US1] Verify focus trap and focus restoration in [components/PlayerNameModal.tsx](components/PlayerNameModal.tsx)
- [x] T018 [P] [US1] Confirm color contrast and focus ring visibility in [app/globals.css](app/globals.css)

### Quality Gates for User Story 1

- [x] T019 [US1] Verify 80% test coverage is maintained via [coverage/lcov-report/index.html](coverage/lcov-report/index.html)
- [x] T020 [US1] Verify ESLint passes with zero warnings

**Checkpoint**: User Story 1 is functional and testable independently

---

## Phase 4: User Story 2 - Display Name on Game Page (Priority: P2)

**Goal**: Display player name on the game page and allow name changes

**Independent Test**: Set a name, load the game, confirm it is visible, change the name, and confirm it updates

### Tests for User Story 2 (REQUIRED)

- [x] T021 [P] [US2] Unit tests for name display and edit action in [components/GameStatus.test.tsx](components/GameStatus.test.tsx)
- [x] T022 [P] [US2] Integration test for name change persistence in [components/GameContainer.test.tsx](components/GameContainer.test.tsx)

### Implementation for User Story 2

- [x] T023 [US2] Render player name and edit control in [components/GameStatus.tsx](components/GameStatus.tsx)
- [x] T024 [US2] Connect edit action to name prompt flow in [components/GameContainer.tsx](components/GameContainer.tsx)
- [x] T025 [US2] Ensure updated name is persisted and reflected in UI in [hooks/usePlayerName.ts](hooks/usePlayerName.ts)
- [x] T026 [US2] Add JSDoc comments for updated exports in [components/GameStatus.tsx](components/GameStatus.tsx)

### Accessibility for User Story 2 (REQUIRED)

- [x] T027 [P] [US2] Verify keyboard access for name edit control in [components/GameStatus.tsx](components/GameStatus.tsx)
- [x] T028 [P] [US2] Add ARIA labels for name display and edit control in [components/GameStatus.tsx](components/GameStatus.tsx)
- [x] T029 [P] [US2] Verify focus indicators on edit control in [components/GameStatus.tsx](components/GameStatus.tsx)

### Quality Gates for User Story 2

- [x] T030 [US2] Verify 80% test coverage is maintained via [coverage/lcov-report/index.html](coverage/lcov-report/index.html)
- [x] T031 [US2] Verify ESLint passes with zero warnings

**Checkpoint**: User Story 2 is functional and testable independently

---

## Phase 5: User Story 3 - Display Name in Best Results Modal (Priority: P3)

**Goal**: Show player names in the best results list, including legacy defaults

**Independent Test**: Open the best results modal and verify each entry includes a player name

### Tests for User Story 3 (REQUIRED)

- [x] T032 [P] [US3] Unit tests for results name rendering and legacy defaults in [components/BestResultsModal.test.tsx](components/BestResultsModal.test.tsx)
- [x] T033 [P] [US3] Integration test for best results list with player names in [components/GameContainer.test.tsx](components/GameContainer.test.tsx)

### Implementation for User Story 3

- [x] T034 [US3] Render `playerName` for each result entry in [components/BestResultsModal.tsx](components/BestResultsModal.tsx)
- [x] T035 [US3] Ensure modal data passes `playerName` from results hook in [components/GameContainer.tsx](components/GameContainer.tsx)
- [x] T036 [US3] Add JSDoc comments for updated exports in [components/BestResultsModal.tsx](components/BestResultsModal.tsx)

### Accessibility for User Story 3 (REQUIRED)

- [x] T037 [P] [US3] Verify keyboard navigation within results list in [components/BestResultsModal.tsx](components/BestResultsModal.tsx)
- [x] T038 [P] [US3] Add ARIA labels for results table/list in [components/BestResultsModal.tsx](components/BestResultsModal.tsx)
- [x] T039 [P] [US3] Verify focus indicators for modal close button in [components/BestResultsModal.tsx](components/BestResultsModal.tsx)

### Quality Gates for User Story 3

- [x] T040 [US3] Verify 80% test coverage is maintained via [coverage/lcov-report/index.html](coverage/lcov-report/index.html)
- [x] T041 [US3] Verify ESLint passes with zero warnings

**Checkpoint**: User Story 3 is functional and testable independently

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validation and documentation updates

- [x] T042 [P] Validate quickstart steps in [specs/001-player-name/quickstart.md](specs/001-player-name/quickstart.md)
- [x] T043 [P] Confirm data model matches implementation in [specs/001-player-name/data-model.md](specs/001-player-name/data-model.md)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Stories (Phase 3-5)**: Depend on Foundational completion and proceed in priority order
- **Polish (Phase 6)**: Depends on desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Foundational tasks only
- **User Story 2 (P2)**: Depends on User Story 1 (uses stored name and modal integration)
- **User Story 3 (P3)**: Depends on User Story 1 for stored name, and Foundational for result schema

### Dependency Graph

- Setup → Foundational → US1 → US2 → US3 → Polish

---

## Parallel Execution Examples

### User Story 1

- T008 (hook tests) and T009 (modal tests) can run in parallel
- T011 (hook implementation) and T012 (modal implementation) can run in parallel
- T015 (keyboard) and T016 (ARIA) can run in parallel after modal exists

### User Story 2

- T021 (unit tests) and T022 (integration test) can run in parallel
- T023 (display) and T024 (edit action) can run in parallel if coordinated on props

### User Story 3

- T032 (unit tests) and T033 (integration test) can run in parallel
- T037 (keyboard) and T038 (ARIA) can run in parallel after modal updates

---

## Implementation Strategy

- Deliver MVP by completing Foundational tasks and User Story 1 first
- Add game page display and name change flow in User Story 2
- Extend best results modal in User Story 3
- Validate quickstart and data model after functional completion

---

## Task Completeness Validation

- Each user story includes tests, implementation, accessibility checks, and quality gates
- All tasks include explicit file paths and can be executed independently
- Dependencies ensure each story is implementable and testable in isolation
