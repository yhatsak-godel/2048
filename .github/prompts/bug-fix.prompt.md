# 2048 Game Bug Fixing Prompt (Interactive Workflow)

This prompt provides a **three-stage interactive workflow** for fixing bugs in the 2048 game application:
1. **Stage 1: Gather Information** - Collect problem description and context
2. **Stage 2: Create Plan** - Analyze and propose a fix plan for approval
3. **Stage 3: Execute Fix** - Implement, test, and validate after approval

---

## Stage 1: Gather Information

**Start here when encountering a bug. Ask the user for:**

1. **Problem Description** (Required)
   - What is the issue you're experiencing?
   - What did you expect to happen?
   - What actually happened instead?

2. **Reproduction Steps** (Required)
   - What specific actions trigger the bug?
   - Are there particular input values or conditions that cause it?

3. **Context** (Required)
   - Does the issue occur in development or production?
   - What browser/environment are you using?
   - Any error messages in browser console or terminal?
   - When did this start happening? (After a specific change or update?)

4. **Additional Information** (Optional)
   - Have you tried any workarounds?
   - Does it affect specific board sizes, move sequences, or animations?
   - Is it related to SSR/CSR boundaries, random tile generation, or UI rendering?

**Current Bug Report (Provided):**

**Error Type:** Recoverable Error

**Error Message:**
Hydration failed because the server rendered text didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

https://react.dev/link/hydration-mismatch

Relevant component stack:

- GameBoard (components/GameBoard.tsx:34:21)
- GameContainer (components/GameContainer.tsx:58:9)
- Home (app/page.tsx:7:9)

Code frame:

  41 |           } ${value === 0 ? "" : "scale-100"}`}
  42 |         >
> 43 |           <span className={value === 0 ? "opacity-0" : "opacity-100"}>
     |           ^
  44 |             {value === 0 ? "0" : value}
  45 |           </span>
  46 |         </div>

**Output after gathering information:**
- Summarize the problem clearly
- Note any patterns or affected areas
- Ask for clarification on any missing details
- **Move to Stage 2 once you have complete context**

---

## Stage 2: Create & Propose Fix Plan

**After understanding the bug, create a detailed plan:**

### Analysis Phase

1. **Reproduce & Identify**
   - Analyze which component or hook is likely involved (GameBoard, GameContainer, GameStatus, ScoreDisplay, useGameEngine, useGameResults)
   - Check SSR/CSR boundary: initial board state must match between server and client
   - Review browser console and logs for errors

2. **Trace Root Cause**
   - Trace the data flow: `useGameEngine`/`gameEngine` → components
   - Check for randomness or time-based values during SSR (e.g., `Math.random()`, `Date.now()`)
   - Verify persisted state in `utils/storage.ts` does not diverge during hydration
   - Verify type definitions in `/types/` folder match implementation
   - Check for Common Bug Patterns (see reference section below)

### Fix Plan Structure

Present the plan with:

1. **Root Cause** - Explain what's causing the bug
2. **Affected Files** - List all files that will be modified
3. **Implementation Approach** - Describe changes:
   - Code changes needed (with file paths)
   - Why these changes fix the issue
   - Patterns being maintained
4. **Test Strategy** - Outline:
   - Which tests need updating
   - New test cases for edge cases
   - Manual testing steps
5. **Risk Assessment** - Any potential side effects?

### Present Plan for Approval

Format the plan clearly and ask:
> **Ready to proceed with this plan? Please review and confirm before I implement the fix.**

**Wait for explicit approval before moving to Stage 3.**

---

## Stage 3: Execute Fix (After Approval)

**Only proceed after user approves the plan.**

### 3.1 Implement Changes

- Apply code changes to identified files
- Maintain existing patterns for game state, component structure, and hook composition
- Preserve type safety - ensure TypeScript types are properly maintained
- Keep components focused - don't add mixed responsibilities
- Keep SSR/CSR boundaries stable to avoid hydration mismatches

### 3.2 Update & Run Tests

```bash
npm run test
```

- Update affected tests to reflect changes while maintaining coverage
- Add new tests for specific edge cases that caused the bug
- Verify all tests pass:

```bash
npm run test:watch -- --testPathPattern=FileName
```

### 3.3 Validate in Browser

```bash
npm run dev
```

Then at http://localhost:3000:

- Test in browser with the original problem scenario
- Check responsive layout on mobile and desktop views
- Verify game behavior across refreshes and rapid moves
- Validate initial board tiles match between server and client

### 3.4 Summary Report

Provide a concise explanation of:

1. **Root Cause** - What was causing the bug?
2. **Implementation Changes** - What was fixed and why?
3. **Test Modifications** - What tests were added/updated?
4. **UI Validation** - What was verified in the browser?

---

## Reference: Common Bug Patterns

1. **Hydration mismatches** - Check SSR output vs client render for randomness or time-based values
2. **Random tile generation** - Ensure initial tiles are deterministic during SSR
3. **State persistence drift** - Confirm storage rehydration does not change initial render
4. **Animation state drift** - Verify CSS classes do not diverge between server and client
5. **Component rendering issues** - Check conditional rendering logic in components

---

## Key Points for Planning

- **Maintain patterns** - Follow existing patterns for game state, component structure, and hook composition
- **Preserve type safety** - Ensure TypeScript types are properly maintained
- **Keep components focused** - Don't add mixed responsibilities
- **Maintain SSR/CSR consistency** - Hydration stability is critical
