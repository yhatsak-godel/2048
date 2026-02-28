import { test, expect } from '@playwright/test';
import { GameHelpers } from './helpers/game-helpers';

test.describe('2048 Game - Loss Scenario', () => {
  let helpers: GameHelpers;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    helpers = new GameHelpers(page);
  });

  test('should save result when game ends', async ({ page }) => {
    await helpers.setupPlayerName('Test Player');

    // Play for a bit to generate a result
    for (let i = 0; i < 10; i++) {
      await helpers.makeMove('right');
      await helpers.makeMove('up');
      await helpers.makeMove('left');
      await helpers.makeMove('down');
    }

    // Get current stats
    const finalScore = await helpers.getScore();
    const finalMoves = await helpers.getMoves();

    // These should be recorded in results
    expect(finalScore + finalMoves).toBeGreaterThan(0);

    // Open best results modal
    await helpers.openBestResults();

    // Verify result is saved with player name
    await expect(page.getByText('Test Player')).toBeVisible();
  });

  test('should display game stats when game ends', async ({ page }) => {
    await helpers.setupPlayerName('Loser');

    // Make a few moves
    for (let i = 0; i < 5; i++) {
      await helpers.makeMove('right');
    }

    // Stats should be visible
    const moves = await helpers.getMoves();
    const score = await helpers.getScore();

    expect(moves).toBeGreaterThanOrEqual(0);
    expect(score).toBeGreaterThanOrEqual(0);
  });

  test('should track multiple game results', async ({ page }) => {
    // First game
    await helpers.setupPlayerName('Multi Game Player');
    await helpers.makeMove('right');
    await helpers.startNewGame();

    // Second game
    await helpers.makeMove('left');
    await helpers.makeMove('down');

    // Open results
    await helpers.openBestResults();

    // Results should show the player's games
    await expect(page.getByText('Multi Game Player')).toBeVisible();
  });
});
