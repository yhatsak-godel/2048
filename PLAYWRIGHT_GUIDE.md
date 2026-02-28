# Playwright E2E Testing Guide

## Overview

This project includes comprehensive end-to-end tests using [Playwright](https://playwright.dev/) to validate the 2048 game functionality, player name feature, and accessibility compliance.

## Setup Status

✅ **Setup Complete**
- Playwright installed and configured
- 60 E2E tests created across 4 test suites
- Tests configured to run on Chromium, Firefox, and WebKit browsers
- Helper utilities for common game interactions
- Accessibility tests with semantic HTML validation

## Test Files

### 1. **gameplay.spec.ts** (5 tests)
Tests core game mechanics:
- Load game and display initial board
- Prompt for player name on first visit
- Increment moves counter on valid moves
- Update score when tiles merge
- Reset game with New Game button

### 2. **player-name.spec.ts** (7 tests)
Tests player name feature:
- Save and display player name
- Prevent name prompt on subsequent visits
- Allow editing player name
- Display player name in best results modal
- Validate name input
- Handle default name scenario

### 3. **loss-scenario.spec.ts** (3 tests)
Tests game end conditions:
- Save result when game ends
- Display game stats when game ends
- Track multiple game results

### 4. **accessibility.spec.ts** (6 tests)
Tests WCAG 2.1 AA compliance:
- Keyboard navigation in name modal
- Focus trap behavior
- Modal Escape key handling
- Semantic HTML structure
- Focus visibility
- Tab key navigation

## Running Tests

### Run All Tests
```bash
npm run test:e2e
```

### Run Tests in UI Mode (Interactive)
Great for debugging and watching tests run:
```bash
npm run test:e2e:ui
```

### Run Tests in Debug Mode
Step through tests with inspector:
```bash
npm run test:e2e:debug
```

### View Test Report
After running tests, view the HTML report:
```bash
npm run test:e2e:report
```

### Run Specific Test File
```bash
npx playwright test tests/e2e/gameplay.spec.ts
```

### Run Specific Test
```bash
npx playwright test -g "should load game"
```

### Run Tests in Single Browser
```bash
npx playwright test --project=chromium
```

### Run Tests with Headed Browser (See UI)
```bash
npx playwright test --headed
```

## Test Statistics

- **Total Tests**: 60
- **Test Suites**: 4
- **Browsers**: 3 (Chromium, Firefox, WebKit)
- **Coverage Areas**:
  - Basic Gameplay (5 tests × 3 browsers = 15 tests)
  - Player Name Feature (7 tests × 3 browsers = 21 tests)
  - Loss Scenarios (3 tests × 3 browsers = 9 tests)
  - Accessibility (6 tests × 3 browsers = 18 tests)

## Helper Utilities

The `tests/e2e/helpers/game-helpers.ts` file provides common game interactions:

```typescript
import { GameHelpers } from './helpers/game-helpers';

// Setup player name
await helpers.setupPlayerName('Player Name');

// Make game moves
await helpers.makeMove('up');    // 'up' | 'down' | 'left' | 'right'

// Get game state
const moves = await helpers.getMoves();
const score = await helpers.getScore();

// Game actions
await helpers.openBestResults();
await helpers.startNewGame();
```

## Configuration

### playwright.config.ts

Key configuration settings:
- **Base URL**: `http://localhost:3000`
- **Test Directory**: `./tests/e2e`
- **Reporters**: HTML report generation
- **Web Server**: Automatically starts `npm run dev` during testing
- **Browsers**: Chrome, Firefox, Safari (WebKit)
- **Retries**: 2 retries on CI, 0 locally
- **Trace**: Recorded on first retry for debugging

## Key Features

### 1. Automatic Dev Server
- Playwright automatically starts the dev server (`npm run dev`)
- Reuses existing server if already running
- Kills server after tests complete

### 2. Test Isolation
- Each test clears localStorage to start fresh
- No test dependencies - any test can run in any order
- Fully isolated browser contexts

### 3. Cross-Browser Testing
- Tests run across Chromium, Firefox, and WebKit
- Detects browser-specific issues
- Ensures broad compatibility

### 4. Accessibility Testing
- Semantic HTML validation
- Keyboard navigation verification
- Focus management testing
- WCAG 2.1 AA compliance checks

## Debugging

### View Trace Files
Trace files are automatically recorded on test failures:
```bash
npx playwright show-trace test-results/path-to-trace.zip
```

### Run with Verbose Output
```bash
npx playwright test --reporter=list
```

### Run with Video Recording
Videos are useful for understanding test flow:
```bash
npx playwright test --record-video=on
```

### Inspect Selectors
Use Playwright Inspector to debug selectors:
```bash
npx playwright codegen http://localhost:3000
```

## CI/CD Integration

### GitHub Actions (if configured)
Tests automatically run on:
- Pull requests
- Commits to main branch
- Manual workflow dispatch

### CI Configuration
- Retries: 2 (automatically retries flaky tests)
- Workers: 1 (sequential on CI for stability)
- Timeout: 30 seconds per test

## Troubleshooting

### Browser Download Fails with TLS Certificate Error

If you see `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` when installing browsers:

**Option 1: Skip SSL Verification (Temporary)**
```bash
npm config set strict-ssl false
npx playwright install
npm config set strict-ssl true
```

**Option 2: Use a Proxy**
```bash
npm config set proxy http://[proxy-address]:[port]
npm config set https-proxy http://[proxy-address]:[port]
npx playwright install
```

**Option 3: Pre-cache Browsers**
If your network doesn't allow direct downloads, download browsers offline and place them in:
```
%LOCALAPPDATA%\ms-playwright
```

**Option 4: Use System Browsers**
Configure Playwright to use system-installed Chrome instead:
```typescript
export const chromium = {
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
};
```

### Tests Not Finding Elements

- Verify selectors match your component structure
- Use `--headed` mode to see what's happening
- Check browser console for errors

### Server Not Starting

- Ensure `npm run dev` works locally first
- Check port 3000 is available
- Verify Next.js build succeeds

### Flaky Tests

- Use `test.setTimeout()` for slow operations
- Add explicit waits for dynamic content
- Check game state is ready before testing

## Best Practices

1. **Use Helpers**: Use `GameHelpers` for common interactions
2. **Clear State**: Always clear localStorage in `beforeEach`
3. **Explicit Waits**: Wait for elements to be visible before interacting
4. **Meaningful Assertions**: Use specific error messages
5. **One Thing Per Test**: Each test should verify one behavior
6. **Descriptive Names**: Test names should describe what they verify

## Example Test Structure

```typescript
import { test, expect } from '@playwright/test';
import { GameHelpers } from './helpers/game-helpers';

test.describe('Feature Name', () => {
  let helpers: GameHelpers;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    helpers = new GameHelpers(page);
  });

  test('should do something specific', async ({ page }) => {
    // Setup
    await helpers.setupPlayerName('Test');
    
    // Action
    await helpers.makeMove('right');
    
    // Verify
    const moves = await helpers.getMoves();
    expect(moves).toBe(1);
  });
});
```

## Next Steps

1. **Run tests locally**: `npm run test:e2e`
2. **Review report**: `npm run test:e2e:report`
3. **Add more tests**: Copy test structure and extend
4. **Monitor CI**: Check test results in GitHub Actions
5. **Iterate**: Fix flaky tests and improve selectors

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Accessibility Testing](https://playwright.dev/docs/accessibility-testing)

## Support

For issues or questions:
1. Check Playwright documentation
2. Review test traces in `test-results/`
3. Run tests in debug mode with `--debug`
4. Check browser console for runtime errors
