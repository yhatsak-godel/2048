```
**Objective**: Create comprehensive unit tests for the `GameBoard` component with 100% coverage.

## Files

- **Component to Test**: `components/GameBoard.tsx`
- **Test File to Update**: `components/GameBoard.test.tsx`

## Testing Stack

- Library: @testing-library/react
- Assertion: @testing-library/jest-dom
- Runner: Jest (already configured)

## What to Test

### 1. Rendering & Structure

- Grid element renders with correct role and aria-label
- Correct number of tiles (4x4 = 16)
- Grid container has correct CSS classes

### 2. Tile Value Rendering

- All tile values display correctly
- Empty tiles (value 0) render without visible text
- Non-empty tiles display their values
- Text opacity is hidden (opacity-0) for empty tiles
- Text opacity is visible (opacity-100) for non-empty tiles

### 3. Styling Based on Tile Values

- Correct Tailwind classes applied for each tile value (2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048)
- Fallback styling (bg-slate-900 text-white) for values > 2048
- Empty tiles (0) get bg-amber-50/60 text-transparent

### 4. Accessibility Attributes

- Grid cells have correct role="gridcell"
- Empty cells have aria-label="empty"
- Non-empty cells have aria-label="tile-{value}"
- Board container has role="grid" and aria-label="2048 board"

### 5. Different Board States

- Full board with mixed values
- Entirely empty board (all zeros)
- Board with maximum tile value (2048)
- Board with values exceeding 2048
- Single tile board (rest zeros)

### 6. Edge Cases

- Large tile values (4096, 8192, 16384+)
- Board with duplicate values
- Flattened board array processing

## Success Criteria

1. All tests pass: `npm test -- GameBoard`
2. Coverage shows 100%: `npm test -- --coverage GameBoard`
3. Follow same code style as existing test files

## Reference Files

Use these as examples:

- `components/GameStatus.test.tsx` - Test structure
- `components/GameContainer.test.tsx` - Component integration
```

---