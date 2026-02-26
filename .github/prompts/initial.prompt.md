```
**Create a complete 2048 Game from scratch using Next.js and TypeScript.**

---

### Technical Requirements

- Next.js (App Router) with latest version
- TypeScript for type safety
- Tailwind CSS for styling
- Node.js server-side implementation
- Responsive design (mobile and desktop)

---

### Project Structure

- `/app` - Next.js App Router structure
- `/components/` - Reusable game components
- `/hooks/` - Custom React hooks (useGameEngine, useGameResults)
- `/utils/gameEngine.ts` - Core game logic (tile movement, merging, scoring)
- `/utils/storage.ts` - LocalStorage utilities for results and best score
- `/types/` folder for TypeScript interfaces

---

### Core Features

#### 1. **Game Board**

- 4x4 grid for tile placement
- Dynamic tile rendering with values (2, 4, 8, 16, ..., 2048, ...)
- Smooth animations for tile movements and merges
- Visual feedback for tile state changes

#### 2. **Game Mechanics**

- Arrow key controls for tile movement (up, down, left, right)
- Tile merging logic: two tiles with same value merge into double value
- Score tracking: updated based on merged tile values
- Move counter: tracks number of moves made
- New tile spawning: random tile (90% = 2, 10% = 4) spawns after valid move
- Win condition: reach 2048 tile (can continue playing)
- Loss condition: no valid moves available

#### 3. **User Interface**

- Clean, modern design with Tailwind CSS
- Game board with 4x4 grid layout
- Current score display
- Best score display (persisted from localStorage)
- New Game button to reset and start fresh
- Game status indicators (Playing, Won, Lost)
- Game instructions/controls display
- Keyboard controls: arrow keys for movement
- Responsive layout that works on mobile and desktop

#### 4. **Advanced Features**

- Result history storage: last 100 games with scores, moves, max tile, date
- Best score persistence across sessions using localStorage
- Game continuation after reaching 2048
- Ability to continue playing or start new game after win/loss

---

### Error Handling

- Handle localStorage quota exceeded with graceful fallback
- Handle private browsing mode where localStorage is unavailable
- Game state recovery if data is lost
- Proper error states for game initialization

---

### Deliverables

#### 1. **Complete application code**

- All source files organized in proper Next.js structure
- Well-commented TypeScript code
- Proper error handling throughout

#### 2. **Documentation**

- README.md with setup instructions and features
- CHANGELOG.md for version history

---


#### 3. **Game Engine** (`/utils/gameEngine.ts`)

Pure functions for game logic:
- `moveLeft(board)` - shift and merge tiles left
- `moveRight(board)` - shift and merge tiles right
- `moveUp(board)` - shift and merge tiles up
- `moveDown(board)` - shift and merge tiles down
- `spawnNewTile(board)` - add random tile to empty position
- `hasValidMoves(board)` - check if game can continue
- Functions return: `{board, changed, scoreGained}`

#### 4. **Custom Hooks**

**`useGameEngine()`**
- Manages game state (board, score, moves, status)
- Handles tile movement and merging
- Detects win/loss conditions
- Returns: `{gameState, move, newGame}`

**`useGameResults()`**
- Loads results history from localStorage
- Saves game results
- Manages best score
- Returns: `{results, addResult, bestScore, clearResults}`

#### 5. **Storage Pattern** (`/utils/storage.ts`)

- Results stored in localStorage with key `2048_results`
- Best score stored with key `2048_bestScore`
- Result entry format: `{score, moves, maxTile, date, duration}`
- Limit to last 100 games (FIFO)
- Error handling for quota exceeded and private mode

#### 6. **Type Definitions** (`/types/index.ts`)

```typescript
interface GameState {
    board: number[][];      // 4x4 grid
    score: number;
    bestScore: number;
    moves: number;
    status: 'playing' | 'won' | 'lost';
}

interface GameResult {
    score: number;
    moves: number;
    maxTile: number;
    date: string;
    duration: number;
}

interface Position {
    row: number;
    col: number;
}
```


### Additional Requirements

 - Uses arrow keys for all game controls
- Persists data to localStorage automatically
- Has smooth animations and good visual feedback
- Works on mobile and desktop devices
- Implements proper game rules (tile merging, spawning, win/loss conditions)
- Has `'use client'` directive on interactive components
- Prevents default browser scrolling for arrow keys
- Properly cleans up keyboard event listeners

---

## Testing Requirements

Add unit tests with Jest + React Testing Library, following best practices for Next.js

### 1. **Testing Framework Preference**

Jest + React Testing Library with keyboard event simulation (`userEvent.keyboard()`)

### 2. **Test Coverage Goals**

- Unit tests for game engine functions
- Component tests for user interactions
- Integration tests for game flow

### 3. **Testing Philosophy**

- Test game mechanics and rules
- Test user interactions (keyboard input, button clicks)
- Test game state transitions
- Don't test animation classes; test state changes instead
- Don't test implementation details; test behavior

### 4. **Test Coverage Areas**

- Game engine logic: tile movement, merging, scoring calculations
- Keyboard input handling with arrow keys
- Result persistence to localStorage
- Component rendering and user interactions
- Edge cases: board boundaries, no valid moves, spawning

### 5. **Mocking Strategy**

- Jest mocks for window.localStorage in `jest.setup.ts`
- Mock random tile spawning for deterministic tests
- `userEvent.keyboard()` for keyboard input simulation

### 6. **Test File Organization**

Tests co-located with source files (component.tsx + component.test.tsx)

---

## Component Architecture

Break down the game into smaller, reusable components following React best practices:

```
GameContainer (orchestrator, 'use client')
├── GameBoard (grid display with tiles, 'use client')
├── ScoreDisplay (current score + best score)
├── Controls (New Game button, instructions)
└── GameStatus (Game Over / Victory display)
```

Each component should:
- Be in a separate file with TypeScript props interface
- Have co-located test file (.test.tsx)
- Use 'use client' where needed for interactivity or state management
- Use Tailwind CSS for styling
- Be properly documented with JSDoc comments
```