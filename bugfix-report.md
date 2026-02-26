# Bug Fix Report: Hydration Mismatch on Initial Load

## Summary
A hydration mismatch occurred on the initial page load because the server and client rendered different board values. The server rendered empty cells, while the client rendered a seeded tile value, causing React to regenerate the tree on the client.

## Root Cause
Random tile seeding ran during the initial render via a `useState(seedBoard)` initializer. Since `seedBoard` uses `Math.random()`, the server and client produced different markup during hydration.

## Fix
- Initialize the board with a deterministic empty grid for the first render.
- Seed the initial random tiles in a `useEffect` so it runs only after hydration on the client.

## Files Changed
- hooks/useGameEngine.ts

## Testing
- Not run (not requested).

## Expected Outcome
- Server and client markup match during hydration.
- The initial seeded tiles appear immediately after hydration without warnings.
